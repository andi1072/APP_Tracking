<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Hlp;
use Illuminate\Support\Facades\Validator;
class DeviceController extends Controller
{
    public function list_js() {
        $res = Hlp::apiGet('/device');
        if (!$res) {
            return response()->json([], 404);
        }
        if (\Cookie::get('USRID') === '72252c8a-8947-4300-b933-90609c37a55d') {
            $isroot = true;
        }else{
            $isroot = false;
        }
        return response()->json([
            'data' => $res->data,
            'isroot' => $isroot
        ], 200);
    }

    public function create_update(Request $request) {
        $validator = Validator::make($request->all(), [
            'seltrackcategory' => 'required',
            'txtdevice_id' => 'required|max:100',
            'txtdevicename' => 'required|max:100',
            'txtassetid' => 'required|max:50',
            'txtassetname' => 'required|max:100',
            'txtassettype' => 'required|max:100',
            'txtcustomername' => 'required|max:100',
            'txtassetdescription' => 'max:255',
            // 'status' => 'required|numeric'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'code' => 442,
                'msg' => $validator->messages()->first(),
            ]);
        }else if ($request->input('seltrackcategory') == '0') {
            return response()->json([
                'code' => 442,
                'msg' => 'Please select category.',
            ]);
        }
        $_id = $request->input('_id');
        if (!$_id) {
            $res = $this->create($request);
        }else{
            $res = $this->update($request);
        }

        return response()->json([
            'msg' => $res,
        ]);
    }

    function create($re) {
        $body = [
            'device_type' => (int)$re->input('seltrackcategory'),
            'device_id' => $re->input('txtdevice_id'),
            'device_name' => $re->input('txtdevicename'),
            'asset_id' => $re->input('txtassetid'),
            'asset_name' => $re->input('txtassetname'),
            'asset_type' => $re->input('txtassettype'),
            'customer_name' => $re->input('txtcustomername'),
            'description' => $re->input('txtassetdescription'),
            'status' => 1
        ];
        $r = Hlp::apiPost('/device', $body);
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

    function update($re) {
        $did = $re->input('txtdevice_id');
        $body = [
            'device_type' => (int)$re->input('seltrackcategory'),
            'device_id' => $did,
            'device_name' => $re->input('txtdevicename'),
            'asset_id' => $re->input('txtassetid'),
            'asset_name' => $re->input('txtassetname'),
            'asset_type' => $re->input('txtassettype'),
            'customer_name' => $re->input('txtcustomername'),
            'description' => $re->input('txtassetdescription'),
            'status' => 1
        ];
        $r = Hlp::apiPut('/device', $body);
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
    // End JS

    public function list() {
        if (\Cookie::get('USRID') === '72252c8a-8947-4300-b933-90609c37a55d') {
            $isroot = true;
        }else{
            $isroot = false;
        }
        return view('pages.devices.list',[
            'cfg' => [
                'isroot' => $isroot
            ]
        ]);
    }

    public function createIndex() {
        return view('pages.devices.form',[
            'cfg' => [
                'title' => 'Add New Device'
            ],
        ]);
    }

    public function detail($deviceid) {
        $res = Hlp::apiGet('/device/d/'. $deviceid);
        // dd($res->data);
        return view('pages.devices.form',[
            'cfg' => [
                'title' => 'Device Detail',
            ],
            'd' => $res->data
        ]);
    }
}
