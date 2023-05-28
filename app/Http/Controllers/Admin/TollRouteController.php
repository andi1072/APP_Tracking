<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Hlp;
use Illuminate\Support\Facades\Validator;
class TollRouteController extends Controller
{
    public function list_js() {
        $res = Hlp::apiGet('/tollroute');
        if (!$res) {
            return response()->json([], 404);
        }
        return response()->json([
            'data' => $res->data
        ], 200);
    }

    public function _create_update(Request $request) {
        $validator = Validator::make($request->all(), [
            'txtName' => 'required',
            'txtAddress' => 'required',
            'polygon_point' => 'required',
            'geo_type' => 'required',
            // 'status' => 'required|numeric'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'code' => 442,
                'msg' => $validator->messages()->first(),
            ]);
        }

        $res = $this->create($request);

        return response()->json([
            'msg' => $res
        ]);
    }

    function create($re) {
        // _token', $("input[name=_token]").val());
        // fd.append('txtName', $("input[name=txtName]").val());
        // fd.append('txtaddress'
        // $txtName = $request->input('txtName');
        // $txtAddress = $request->input('txtAddress');
        // $polygon_point = $request->input('polygon_point');
        $body = [
            'id' => $re->input('id'),
            'geo_name' => $re->input('txtName'),
            'geo_address' => $re->input('txtAddress'),
            'geo_type' => $re->input('geo_type'),
            'polygon_point' => $re->input('polygon_point'),
            'status' => 1
        ];
        $flag = $re->input('_isEdit');
        if ($flag) {
            $r = Hlp::apiPut('/tollroute', $body);
        }else{
            $r = Hlp::apiPost('/tollroute', $body);
        }
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
            'code' => $r->getStatusCode()
        ];
    }

    public function detail_point($geoid) {
        $res = Hlp::apiGet('/tollroute/d/'. $geoid .'/point');
        return response()->json([
            'dataPoint' => $res->data
        ], 200);
    }

    public function list() {
        return view('pages.tollroute.list');
    }

    public function detail($geoid) {
        $res = Hlp::apiGet('/tollroute/d/'. $geoid);
        return view('pages.tollroute.form', [
            'cfg' => [
                'id' => $res->data->id,
                'title' => $res->data->ftsection_name
            ],
            'd' => $res->data
        ]);
    }

    public function formindex() {
        return view('pages.tollroute.form', [
            'cfg' => [
                'id' => Str::uuid(),
                'title' => 'Add Toll Route'
            ],
        ]);
    }
    
    // ######### SECTION MAP ##########

    public function create_update(Request $request) {
        $validator = Validator::make($request->all(), [
            'latlng' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'code' => 442,
                'msg' => $validator->messages()->first(),
            ]);
        }

        $res = $this->updateSection($request);

        return response()->json([
            'msg' => $res
        ]);
    }

    function updateSection($re) {
        $body = [
            'latlng' => $re->input('latlng'),
        ];
        $r = Hlp::apiPost('/tollroute', $body);
        $res = $r->object();
        if (isset($res->error)) {
            if ($res->error == "Unauthorized") {
                return 'Unauthorized.';
            } else {
                return [
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

    public function section_form_index() {
        return view('pages.tollroute.form_section');
    }

    // ################################

}
