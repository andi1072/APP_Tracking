<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Hlp;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
class CustomerController extends Controller
{

    public function list_js() {
        $res = Hlp::apiGet('/user');
        if (!$res) {
            return response()->json([], 404);
        }
        return response()->json([
            'data' => $res->data
        ], 200);
    }

    public function addedit_js(Request $request) {
        $validator = Validator::make($request->all(), [
            'selstatus' => 'required',
            'txtemail' => 'required|max:100',
            'txtfirstname' => 'required|max:100',
            'txtlastname' => 'required|max:50',
            'txtpassword' => 'required|max:100',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'code' => 442,
                'msg' => $validator->messages()->first(),
            ]);
        }

        if ($request->input('_isEdit') === '0') {
            $res = $this->create_js($request);
        }else{
            $res = $this->update_js($request);
        }

        return response()->json([
            'msg' => $res,
            // 'msg' => $request->all()
        ]);
    }

    function create_js($re) {
        $body = [
            'id' => $re->input('_id'),
            'email' => $re->input('txtemail'),
            'password' => $re->input('txtpassword'),
            'first_name' => $re->input('txtfirstname'),
            'last_name' => $re->input('txtlastname'),
            'status' => (int)$re->input('selstatus'),
            'tlp' => $re->input('txttelephone'),
            'address' => $re->input('txtaddress')
        ];
        $r = Hlp::apiPost('/user', $body);
        $res = $r->object();
        if (isset($res->error)) {
            if ($res->error == "Unauthorized") { // Check Auth
                return 'Sesi login telah habis, mohon untuk login kembali.';
            } else {
                return [
                    'id' => 'new',
                    'obj' => $res->error,
                    'code' => 404
                ];
            }
        }
        return [
            'obj' => $r->object(),
            'code' => $r->getStatusCode()
        ];
    }

    function update_js($re) {
        $did = $re->input('_id');
        $body = [
            'id' => $did,
            'password' => $re->input('txtpassword'),
            'first_name' => $re->input('txtfirstname'),
            'last_name' => $re->input('txtlastname'),
            'status' => (int)$re->input('selstatus'),
            'tlp' => $re->input('txttelephone'),
            'address' => $re->input('txtaddress')
        ];
        $r = Hlp::apiPut('/user', $body);
        $res = $r->object();
        if (isset($res->error)) {
            if ($res->error == "Unauthorized") {
                return 'Sesi login telah habis, mohon untuk login kembali.';
            } else {
                return [
                    'id' => $did,
                    'obj' => $res->error,
                    'code' => 404
                ];
            }
        }
        return [
            'obj' => $r->object(),
            'code' => $r->getStatusCode()
        ];
    }

    public function list() {
        return view('pages.customer.list');
    }

    public function create(Request $request) {
        return view('pages.customer.form',[
            'cfg' => [
                'title' => 'Add New User',
                'uid' => Str::uuid()
            ],
        ]);
    }

    public function detail($uid) {
        $res = Hlp::apiGet('/user/d/'. $uid);
        return view('pages.customer.form',[
            'cfg' => [
                'title' => 'User Detail',
                'uid' => $res->data->uid
            ],
            'd' => $res->data
        ]);
    }
}
