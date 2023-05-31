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
    <div class="container">
        <div class="page-content">
            <div class="panel">
                <form method="POST" id="formSection" enctype="multipart/form-data" autocomplete="off">
                    @csrf
                    <div class="panel-body container-fluid">
                        {{-- <div class="py-4"></div> --}}
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="btn-group btn-group-toggle" data-toggle="buttons" role="group">
                                    <label class="btn btn-info active">
                                        <input type="radio" id="ckScanPoints" name="ckScanPoints" autocomplete="off" value="0" checked />
                                        <i class="icon md-apps" aria-hidden="true"></i>Scan Points
                                    </label>
                                    <label class="btn btn-info">
                                        <input type="radio" id="ckAddPoints" name="ckAddPoints" autocomplete="off" value="1" />
                                        <i class="icon md-pin text-active" aria-hidden="true"></i>Add Points
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
    </div>
    @push('isscript')
    <script src="{{ asset('leaflet/leaflet.js')}}"></script>
    <script src="{{ asset('leaflet/fullscreen/Leaflet.fullscreen.min.js')}}"></script>
    <script src="{{ asset('global/vendor/ladda/spin.min.js')}}"></script>
    <script src="{{ asset('global/vendor/ladda/ladda.min.js')}}"></script>
    <script src="{{ asset('global/js/Plugin/ladda.js')}}"></script>
    <script src="{{ asset('leaflet/geocoder/Control.Geocoder.min.js')}}"></script>
    @endpush
    @vite([
    'resources/js/pages/section_map.js',
    ])
</x-default>
