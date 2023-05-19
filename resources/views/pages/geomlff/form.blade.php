@if (isset($d))
@section('page_title')
    {{ $d->ftname }}
@endsection
@else
@section('page_title')
    {{ "Add Gate Declaration" }}
@endsection
@endif
<x-default>
    @push('isstyles')
    <link rel="stylesheet" href="{{ asset('leaflet/leaflet.css') }}" />
    <link rel="stylesheet" href="{{ asset('leaflet/draw/leaflet.draw.css')}}" />
    <link rel="stylesheet" href="{{ asset('leaflet/fullscreen/leaflet.fullscreen.css')}}" />
    <link rel="stylesheet" href="{{ asset('global/vendor/ladda/ladda.css')}}">
    <link rel="stylesheet" href="{{ asset('global/vendor/bootstrap-sweetalert/sweetalert.css')}}">
    <link rel="stylesheet" href="{{ asset('global/vendor/select2/select2.css')}}">
    <link rel="stylesheet" href="{{ asset('global/vendor/bootstrap-select/bootstrap-select.css')}}">
    <link rel="stylesheet" href="https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.css" />
    @endpush
    <div class="page-header page-header-bordered">
        <h1 class="page-title">{{ $cfg['title'] }}</h1>
        <p class="page-description">
            Expand the area with approximately 10 meter on all sides to ensure we capture your asset in or out of this geozone.
        </p>
        <div class="page-header-actions">
            <a href="#" type="button" class="btn btn-sm btn-outline btn-primary btn-round waves-effect waves-classic">
                <span class="text hidden-sm-down">Geo List</span>
                <i class="icon md-chevron-right" aria-hidden="true"></i>
            </a>
        </div>
    </div>
    <form method="POST" id="formGeo" enctype="multipart/form-data" autocomplete="off">
        @csrf
        <input type="hidden" name="_id" value="{{ $cfg['id'] }}">
        <input type="hidden" name="_backurl" value="{{ route('geomlff_list') }}">
        <div class="container-fluid">
            <div class="page-content">
                <div class="panel">
                    <div class="panel-body">
                        <div class="row" data-plugin="matchHeight" data-by-row="true">
                            <div class="col-xxl-7 col-lg-7">
                                <div class="card card-shadow">
                                    <div class="card-block p-0">
                                        <div id="objmap" class="h-450"></div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-xxl-5 col-lg-5">
                                <div class="card card-shadow">
                                    <div class="card-block p-0">
                                        <div class="row row-lg">

                                            <div class="col">
                                                <div class="m-lg-0">
                                                    <label class="floating-label">Toll Section</label>
                                                    <div class="form-group">
                                                        @if (isset($d))
                                                        <input type="text" id="sel_toll_section" name="sel_toll_section" style="width: 100%" value="{{ isset($d) ? $d->ftsection : '0' }}" readonly disabled/>
                                                        @else
                                                        <input type="text" id="sel_toll_section" name="sel_toll_section" data-plugin="ionRangeSlider" style="width:100%"/>
                                                        @endif
                                                    </div>
                                                </div>
                                                <div class="m-lg-0">
                                                    <label class="floating-label">Toll Gate Name</label>
                                                    <div class="form-group">
                                                        @if (isset($d))
                                                        <input type="text" id="sel_toll_gate" name="sel_toll_gate" style="width: 100%" value="{{ isset($d) ? $d->uuid_x_gate_point_id : '0' }}" readonly disabled/>
                                                        @else
                                                        <input type="text" id="sel_toll_gate" name="sel_toll_gate" data-plugin="ionRangeSlider" style="width:100%"/>
                                                        @endif
                                                    </div>
                                                </div>
                                                <div class="m-lg-0">
                                                    <select class="form-control" id="gate_declare" name="gate_declare" data-plugin="selectpicker" data-style="btn-info" required="">
                                                        <option value="0">Gate Declaration</option>
                                                        <option value="1">Entry</option>
                                                        <option value="2">Exit</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="form-group form-material col-xl-12 text-right mt-4">
                                                <button type="submit" class="btn btn-info ladda-button" data-style="expand-left" data-plugin="ladda">
                                                    <span class="ladda-label"><i class="icon md-arrows mr-10" aria-hidden="true"></i>
                                                        Submit
                                                    </span>
                                                </button>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
    @push('isscript')
    <script src="{{ asset('global/vendor/jquery-placeholder/jquery.placeholder.min.js')}}"></script>
    <script src="{{ asset('global/js/Plugin/jquery-placeholder.js')}}"></script>
    <script src="{{ asset('global/js/Plugin/material.js')}}"></script>
    <script src="{{ asset('global/vendor/ladda/spin.min.js')}}"></script>
    <script src="{{ asset('global/vendor/ladda/ladda.min.js')}}"></script>
    <script src="{{ asset('global/js/Plugin/ladda.js')}}"></script>
    <script src="{{ asset('global/vendor/bootstrap-sweetalert/sweetalert.js')}}"></script>
    <script src="{{ asset('global/js/Plugin/bootstrap-sweetalert.js')}}"></script>
    <script src="{{ asset('global/vendor/select2/select2.full.min.js')}}"></script>
    <script src="{{ asset('global/js/Plugin/select2.js')}}"></script>
    <script src="{{ asset('global/vendor/bootstrap-select/bootstrap-select.js')}}"></script>
    <script src="{{ asset('global/js/Plugin/bootstrap-select.js')}}"></script>

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
    <script src="https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.js"></script>
    <script>
        $("select[name=gate_declare]").val(`{{ isset($d) ? $d->fntype : 0 }}`);
    </script>
    @vite([
    'resources/js/pages/geomlff.js',
    ])
    @endpush
</x-default>
