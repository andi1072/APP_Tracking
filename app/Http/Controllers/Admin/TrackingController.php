<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Hlp;
use Carbon\Carbon;
class TrackingController extends Controller
{
    public function device_list_js(Request $request) {
        $draw = $request->get('draw');
        $start = $request->get('start');
        $length = $request->get('length');
        $filter = $request->get('search');
        $humanTz = $request->input('humanTz');
        // dd($request->all(),$filter);
        $search = (isset($filter['value']))? $filter['value'] : null;
        $res = Hlp::apiGet('/tracking?draw='.$draw.'&start='.$start.'&length='.$length.'&filter='.$search.'&humanTz='.$humanTz);
        if (!$res) {
            return response()->json([], 404);
        }

        return response()->json([
            'data' => $res->data,
            'draw' => $draw,
            'recordsTotal' => $res->total,
            'recordsFiltered' => $res->total,
        ], 200);
    }

    public function detail_js_map(Request $request) {
        $did = $request->input('did');
        $from = str_replace('T',' ', $request->input('from'));
        $to = str_replace('T',' ', $request->input('to'));
        $humanTz = $request->input('humanTz');
        $res = Hlp::apiGet('/tracking/d/map/relay?did='. $did .'&from='. Hlp::dtHumanToUTC($from, $humanTz) .'&to='. Hlp::dtHumanToUTC($to, $humanTz));
        if ($res) {
            return response()->json([
                'relay' => $res
            ], 200);
        }else{
            return response()->json([
                'relay' => null
            ], 200);
        }
    }

    public function detail_js_geo($device_id) {
        $resGeoHistory = Hlp::apiGet('/tracking/d/'. $device_id . '/geo');
        return response()->json([
            'geoData' => $resGeoHistory
        ], 200);
    }
    
    public function list() {
        return view('pages.tracking.list');
    }

    // Route::get('detail/{deviceid}/status', 'detail_status')->name('tracking_status');
    // Route::get('detail/{deviceid}/map', 'detail_map')->name('tracking_map');
    // Route::get('detail/{deviceid}/geofence', 'detail_geo')->name('tracking_geo');

    public function detail_status($device_id) {
        $resDvStatus = Hlp::apiGet('/tracking/d/'. $device_id);
        $resLocation = Hlp::apiGetExt("https://nominatim.openstreetmap.org/search?q=". $resDvStatus->deviceRelay->fflat .",". $resDvStatus->deviceRelay->fflon ."&format=json");
        
        if ($resLocation->status() === 200) {
            $resLocationAddr = $resLocation->object()[0]->display_name;
            // dd($resLocationAddr[0]->display_name);
        }else{
            $resLocationAddr = 'n/a';
        }
        // dd($resDvStatus,$resLocation->object());
        // https://nominatim.openstreetmap.org/search?q=indonesia&format=json
        return view('pages.tracking.form_status',[
            'cfg' => [
                'title' => $resDvStatus->deviceRelay->ftdevice_name,
                'deviceid' => $resDvStatus->deviceRelay->ftdevice_id,
                'locationAddr' => $resLocationAddr
            ],
            'deviceData' => $resDvStatus
        ]);
    }

    public function detail_map($device_id) {
        $resDvStatus = Hlp::apiGet('/tracking/d/'. $device_id);
        return view('pages.tracking.form_map',[
            'cfg' => [
                'title' => $resDvStatus->deviceRelay->ftdevice_name
            ],
            'deviceData' => $resDvStatus,
            // 'curStartDate' => 
        ]);
    }

    public function detail_geo($device_id) {
        $resDvStatus = Hlp::apiGet('/tracking/d/'. $device_id);
        return view('pages.tracking.form_geo',[
            'cfg' => [
                'title' => $resDvStatus->deviceRelay->ftdevice_name
            ],
            'deviceData' => $resDvStatus,
        ]);
    }

    public function detail_live($device_id) {
        $resDvStatus = Hlp::apiGet('/tracking/d/'. $device_id);
        return view('pages.tracking.form_live',[
            'cfg' => [
                'title' => $resDvStatus->deviceRelay->ftdevice_name
            ],
            'deviceData' => $resDvStatus,
        ]);
    }
    
    public function detail_mlff($device_id) {
        $resDvStatus = Hlp::apiGet('/tracking/d/'. $device_id);
        return view('pages.tracking.form_mlff',[
            'cfg' => [
                'title' => $resDvStatus->deviceRelay->ftdevice_name
            ],
            'deviceData' => $resDvStatus,
        ]);
    }

    public function detail_mlff_history_js($device_id) {
        $resDvMLFFHistory = Hlp::apiGet('/tracking/d/mlff/log/'.$device_id);
        return response()->json([
            'mlffHistoryData' => $resDvMLFFHistory
        ], 200);
    }

    public function detail_mlff_history_log_js($mlff_history_id) {
        $data = Hlp::apiGet('/tracking/d/mlff/log/gate/'.$mlff_history_id);
        return response()->json([
            'data' => $data
        ], 200);
    }
}
