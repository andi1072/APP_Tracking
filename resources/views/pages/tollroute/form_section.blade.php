@section('page_title')
{{ "Toll Section" }}
@endsection
@push('isstyles')
<link rel="stylesheet" href="{{ asset('global/vendor/ladda/ladda.css')}}">
<link rel="stylesheet" href="{{ asset('global/vendor/bootstrap-sweetalert/sweetalert.css')}}">
<link rel="stylesheet" href="{{ asset('global/vendor/select2/select2.css')}}">
<link rel="stylesheet" href="{{ asset('global/vendor/bootstrap-select/bootstrap-select.css')}}">
<link rel="stylesheet" href="{{ asset('leaflet/leaflet.css') }}" />
<link rel="stylesheet" href="{{ asset('leaflet/fullscreen/leaflet.fullscreen.css')}}" />
<link rel="stylesheet" href="{{ asset('leaflet/geocoder/Control.Geocoder.css')}}" />
<link rel="stylesheet" href="{{ asset('leaflet/draw/leaflet.draw.css')}}" />
<link rel="stylesheet" href="{{ asset('leaflet/elevation/Leaflet.Elevation-0.0.1.css')}}" />

<style>
    /* #crosshair-button {
  position: absolute;
  top: 18px;
  left: 70px;
} */

    .leaflet-container.crosshair-cursor-enabled {
        cursor: crosshair;
    }

</style>
@endpush
<x-default>
    <div class="page-header page-header-bordered">
        <h1 class="page-title">Toll Section Editor</h1>
    </div>
    <div class="page-content">
        <div class="panel">
            <form method="POST" id="formSection" enctype="multipart/form-data" autocomplete="off">
                @csrf
                <div class="panel-body">
                    {{-- <div class="py-4"></div> --}}
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="btn-group btn-group-toggle" data-toggle="buttons" role="group">
                                <label class="btn btn-info btn-sm active">
                                    <input type="radio" id="ckScanPoints" name="ckScanPoints" autocomplete="off" value="0" checked />
                                    <i class="icon md-apps" aria-hidden="true"></i>Scan Points
                                </label>
                                <label class="btn btn-info btn-sm">
                                    <input type="radio" id="ckAddPoints" name="ckAddPoints" autocomplete="off" value="1" />
                                    <i class="icon md-pin text-active" aria-hidden="true"></i>Add Points
                                </label>
                                <label class="btn btn-info btn-sm">
                                    <input type="radio" id="ckAddTollSection" name="ckAddTollSection" autocomplete="off" value="3" />
                                    <i class="icon md-camera-front text-active" aria-hidden="true"></i>Set Toll Section Name
                                </label>
                                <label class="btn btn-info btn-sm">
                                    <input type="radio" id="ckFlyOverLocation" name="ckFlyOverLocation" autocomplete="off" value="4" />
                                    <i class="icon md-sort-amount-asc text-active" aria-hidden="true"></i>Set Flyover Location
                                </label>
                                
                                <label class="btn btn-danger btn-sm">
                                    <input type="radio" id="ckDelPoints" name="ckDelPoints" autocomplete="off" value="2" />
                                    <i class="icon md-delete text-active" aria-hidden="true"></i>Delete
                                </label>
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="row py-4">
                                <div class="col">
                                    <div id="sectionmap"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
    @push('isscript')
    <script src="{{ asset('global/vendor/ladda/spin.min.js')}}"></script>
    <script src="{{ asset('global/vendor/ladda/ladda.min.js')}}"></script>
    <script src="{{ asset('global/js/Plugin/ladda.js')}}"></script>

    <script src="{{ asset('leaflet/leaflet.js')}}"></script>
    <script src="{{ asset('leaflet/draw/Leaflet.draw.js')}}"></script>
    <script src="{{ asset('leaflet/draw/Leaflet.Draw.Event.js')}}"></script>
    <script src="{{ asset('leaflet/draw/Toolbar.js')}}"></script>
    <script src="{{ asset('leaflet/draw/Tooltip.js')}}"></script>
    <script src="{{ asset('leaflet/draw/ext/GeometryUtil.js')}}"></script>
    <script src="{{ asset('leaflet/draw/ext/LatLngUtil.js')}}"></script>
    <script src="{{ asset('leaflet/draw/ext/LineUtil.Intersect.js')}}"></script>
    <script src="{{ asset('leaflet/draw/ext/Polygon.Intersect.js')}}"></script>
    <script src="{{ asset('leaflet/draw/ext/Polyline.Intersect.js')}}"></script>
    <script src="{{ asset('leaflet/draw/ext/TouchEvents.js')}}"></script>
    <script src="{{ asset('leaflet/draw/draw/DrawToolbar.js')}}"></script>
    <script src="{{ asset('leaflet/draw/draw/handler/Draw.Feature.js')}}"></script>
    <script src="{{ asset('leaflet/draw/draw/handler/Draw.SimpleShape.js')}}"></script>
    <script src="{{ asset('leaflet/draw/draw/handler/Draw.Polyline.js')}}"></script>
    <script src="{{ asset('leaflet/draw/draw/handler/Draw.Marker.js')}}"></script>
    <script src="{{ asset('leaflet/draw/draw/handler/Draw.Circle.js')}}"></script>
    <script src="{{ asset('leaflet/draw/draw/handler/Draw.CircleMarker.js')}}"></script>
    <script src="{{ asset('leaflet/draw/draw/handler/Draw.Polygon.js')}}"></script>
    <script src="{{ asset('leaflet/draw/draw/handler/Draw.Rectangle.js')}}"></script>
    <script src="{{ asset('leaflet/draw/edit/EditToolbar.js')}}"></script>
    <script src="{{ asset('leaflet/draw/edit/handler/EditToolbar.Edit.js')}}"></script>
    <script src="{{ asset('leaflet/draw/edit/handler/EditToolbar.Delete.js')}}"></script>
    <script src="{{ asset('leaflet/draw/Control.Draw.js')}}"></script>
    <script src="{{ asset('leaflet/draw/edit/handler/Edit.Poly.js')}}"></script>
    <script src="{{ asset('leaflet/draw/edit/handler/Edit.SimpleShape.js')}}"></script>
    <script src="{{ asset('leaflet/draw/edit/handler/Edit.Rectangle.js')}}"></script>
    <script src="{{ asset('leaflet/draw/edit/handler/Edit.Marker.js')}}"></script>
    <script src="{{ asset('leaflet/draw/edit/handler/Edit.CircleMarker.js')}}"></script>
    <script src="{{ asset('leaflet/draw/edit/handler/Edit.Circle.js')}}"></script>
    <script src="{{ asset('leaflet/fullscreen/Leaflet.fullscreen.min.js')}}"></script>
    <script src="{{ asset('leaflet/geocoder/Control.Geocoder.min.js')}}"></script>
    {{-- <script src="https://cdn.jsdelivr.net/npm/turf/turf.min.js"></script> --}}

    @endpush
    @vite([
    'resources/js/pages/section_map.js',
    ])
</x-default>
