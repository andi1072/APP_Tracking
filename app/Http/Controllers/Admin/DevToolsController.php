<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Hlp;
class DevToolsController extends Controller
{
    public function divice_live_js() {
        $res = Hlp::apiGet('/dashboard');
        return response()->json([
            'data' => $res,
        ]);
    }

    public function gatezone_js() {
        $resGeo = Hlp::apiGet('/info/gatezone');
        return response()->json([
            'data' => $resGeo->data,
        ], 200);
    }

    public function tollsectionpoint_js(Request $request) {
        $data = Hlp::apiGet('/info/tollsectionpoint?latlng=' . $request->input('latlng'));
        return response()->json([
            'data' => $data->data,
        ], 200);
    }

    public function device_select_js() {
        $res = Hlp::apiGet('/devtools/device_select');
        return response()->json([
            'devices' => $res->data
        ], 200);
    }
    
    public function index() {
        return view("pages.devtools.resource_monitor");
    }

    public function devices_live() {
        return view("pages.devtools.devices_live");
    }

    public function tracking_map() {
        return view("pages.devtools.tracking_map");
    }

    public function mlff_history_section_js(Request $request) {
        $did = $request->input('did');
        $res = Hlp::apiGet('/devtools/mlff/section/history/' . $did);
        return response()->json([
            'data' => $res->data
        ], 200);
    }

    public function mlff_history_section_log_js(Request $request) {
        $section_history = $request->input('section_history');
        $res = Hlp::apiGet('/devtools/mlff/section/history/log/' . $section_history);
        return response()->json([
            'data' => $res
        ], 200);
    }

    public function mlff_history_section() {
        return view("pages.devtools.mlff_history_section");
    }
}
