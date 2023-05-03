<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Hlp;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;
class GateSectionController extends Controller
{
    public function formindex() {
        return view('pages.gatesection.form', [
            'cfg' => [
                'id' => Str::uuid(),
                'title' => 'Add Toll Gate'
            ],
        ]);
    }

    public function create_update(Request $request) {
        $validator = Validator::make($request->all(), [
            'txtsection' => 'required',
            'txtgatename' => 'required',
            'lat' => 'required',
            'lon' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'code' => 442,
                'msg' => $validator->messages()->first(),
            ]);
        }

        $res = $this->create($request);

        return response()->json([
            'msg' => $res,
            'tes' => $request->all()
        ]);
    }

    function create($re) {
        $body = [
            'section' => $re->input('txtsection'),
            'name' => $re->input('txtgatename'),
            'lat' => $re->input('lat'),
            'lon' => $re->input('lon'),
            'payment_type' => 0
        ];
        // $flag = $re->input('_isEdit');
        // if ($flag) {
            // $r = Hlp::apiPut('/geomlff', $body);
        // }else{
        $r = Hlp::apiPost('/gate/create', $body);
        // }
        $res = $r->object();
        if (isset($res->error)) {
            if ($res->error == "Unauthorized") { // Check Auth
                return 'Sesi login telah habis, mohon untuk login kembali.';
            } else {
                return [
                    'id' => $flag,
                    'obj' => $res->error,
                    'code' => 404
                ];
            }
        }
        return [
            'obj' => $r->object(),
            'code' => $r->getStatusCode(),
        ];
    }
}
