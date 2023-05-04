<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Hlp;
use Illuminate\Support\Facades\Validator;
use Cookie;
class DashboardController extends Controller
{

    public function divice_map() {
        $res = Hlp::apiGet('/dashboard');
        return response()->json([
            'data' => $res,
        ]);
    }

    public function index(Request $request) {
        return view('pages.dashboard');
    }

    public function test() {
        return view('pages.welcome');
    }
    // public function test_gate_import(Request $request) {
    //     $validator = Validator::make($request->all(), [
    //         'gate_name' => 'required|max:100',
    //         'type' => 'required',
    //         'description' => 'max:255',
    //         'point_lat' => 'required',
    //         'point_lon' => 'required',
    //     ]);
    //     $gate_name = $request->input('gate_name');
    //     $type = $request->input('type');
    //     $description = $request->input('description');
    //     $point_lat = $request->input('point_lat');
    //     $point_lon = $request->input('point_lon');
    //     try {
    //         $res = Hlp::apiGet('/dashboard/test?gate_name='. $gate_name .'&type='. $type .'&point_lat='. $point_lat .'&point_lon='. $point_lon .'&description='. $description);
    //         return response()->json([
    //             'data' => $res,
    //         ]);
    //     } catch (\Throwable $th) {
    //         return response()->json([
    //             'msg' => 'Internal Error',
    //         ]);
    //     }
    // }
    // public function import_section(Request $request) {
        
    //     $validator = Validator::make($request->all(), [
    //         'id' => 'required',
    //         'section_name' => 'required',
    //         'address' => 'required',
    //         'type' => 'required',
    //         'island' => 'required',
    //         'length' => 'required',
    //         'manager' => 'required',
    //         'status' => 'required',
    //     ]);
    //     $id = $request->input('id');
    //     $section_name = $request->input('section_name');
    //     $address = $request->input('address');
    //     $type = $request->input('type');
    //     $island = $request->input('island');
    //     $length = $request->input('length');
    //     $manager = $request->input('manager');
    //     $status = $request->input('status');
    //     try {
    //         $res = Hlp::apiGet('/dashboard/test/section?id='.$id.'&section_name='. $section_name .'&address='.$address.'&type='.$type.'&island='.$island.'&length='.$length.'&manager='.$manager.'&status='. $status);
    //         return response()->json([
    //             'data' => $res,
    //         ]);
    //     } catch (\Throwable $th) {
    //         return response()->json([
    //             'msg' => 'Internal Error',
    //         ]);
    //     }
    // }
    
    // public function import_section_latlng(Request $request) {
    //     $this->validate($request, [
    //         'x_geo_toll_route_id' => 'required',
    //         'lat' => 'required',
    //         'lon' => 'required',
    //         'checkpoint' => 'required',
    //         'index' => 'required',
    //     ]);
    //     $x_geo_toll_route_id = $request->input('x_geo_toll_route_id');
    //     $lat = $request->input('lat');
    //     $lon = $request->input('lon');
    //     $checkpoint = $request->input('checkpoint');
    //     $index = $request->input('index');
    //     try {
    //         $res = Hlp::apiGet('/dashboard/test/sectionlatlng?x_geo_toll_route_id='. $x_geo_toll_route_id .'&lat='. $lat .'&lon='. $lon .'&checkpoint='. $checkpoint .'&index='. $index);
    //         return response()->json([
    //             'data' => $res,
    //         ]);
    //     } catch (\Throwable $th) {
    //         return response()->json([
    //             'msg' => 'Internal Error',
    //         ]);
    //     }
    // }
}
