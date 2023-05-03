<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Hlp;
use Illuminate\Support\Facades\Validator;
class GeoMlffController extends Controller
{
    public function list_js() {
        $res = Hlp::apiGet('/geomlff');
        if (!$res) {
            return response()->json([], 404);
        }
        return response()->json([
            'data' => $res->data
        ], 200);
    }

    public function create_update(Request $request) {
        $validator = Validator::make($request->all(), [
            // 'txtName' => 'required',
            // 'txtAddress' => 'required',
            'polygon_point' => 'required',
            'geo_type' => 'required',
            'gate_id' => 'required'
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
            // 'msg' => $request->all()
        ]);
    }

    function create($re) {
        $body = [
            'id' => $re->input('id'),
            // 'geo_name' => $re->input('txtName'),
            // 'geo_address' => $re->input('txtAddress'),
            'geo_type' => $re->input('geo_type'),
            'polygon_point' => $re->input('polygon_point'),
            'gate_id' => $re->input('gate_id'),
            'status' => 1
        ];
        $flag = $re->input('_isEdit');
        if ($flag) {
            $r = Hlp::apiPut('/geomlff', $body);
        }else{
            $r = Hlp::apiPost('/geomlff', $body);
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
            'code' => $r->getStatusCode(),
        ];
    }

    public function detail_point($geoid) {
        $res = Hlp::apiGet('/geomlff/d/'. $geoid .'/point');
        return response()->json([
            'dataHead' => $res->dataHead,
            'dataPoint' => $res->data
        ], 200);
    }

    public function list() {
        return view('pages.geomlff.list');
    }

    public function detail($geoid) {
        $res = Hlp::apiGet('/geomlff/d/'. $geoid);
        // dd($res);
        return view('pages.geomlff.form', [
            'cfg' => [
                'id' => $res->data->id,
                'title' => $res->data->ftname
            ],
            'd' => $res->data
        ]);
    }

    public function formindex() {
        return view('pages.geomlff.form', [
            'cfg' => [
                'id' => Str::uuid(),
                'title' => 'Add Gate Declaration'
            ],
        ]);
    }

    public function tollmapindex_js() {
        $res = Hlp::apiGet('/geomlff/gate/point');
        return response()->json([
            'gatePoint' => $res->data
        ], 200);
    }

    public function tollmapsection_js() {
        $res = Hlp::apiGet('/geomlff/gate/section');
        return response()->json([
            'sectionName' => $res->data
        ], 200);
    }

    public function tollmapsection_map_js($section_name) {
        $res = Hlp::apiGet('/geomlff/gate/section/'.$section_name);
        return response()->json([
            'gatePoint' => $res->data
        ], 200);
    }
    public function tollmapsection_map_det_js($id) {
        $res = Hlp::apiGet('/geomlff/gate/point/det/'.$id);
        return response()->json([
            'gatePoint' => $res->data
        ], 200);
    }

    public function tollmapindex() {
        return view('pages.mlff.toll_map');
    }
}
