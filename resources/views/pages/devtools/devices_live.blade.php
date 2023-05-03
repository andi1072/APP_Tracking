<x-default>
    @push('isstyles')
        {{-- <link rel="stylesheet" href="{{ asset('global/vendor/chartist/chartist.css')}}">
        <link rel="stylesheet" href="{{ asset('global/vendor/chartist-plugin-tooltip/chartist-plugin-tooltip.css')}}"> --}}
        {{-- <link rel="stylesheet" href="{{ asset('global/vendor/mapbox-js/mapbox.css')}}"> --}}
        <link rel="stylesheet" href="{{ asset('leaflet/leaflet.css') }}"/>
        <link rel="stylesheet" href="{{ asset('leaflet/fullscreen/leaflet.fullscreen.css')}}" />
    @endpush
    <div class="page-content container-fluid">
        <div class="row" data-plugin="matchHeight" data-by-row="true">
            <div class="col-xxl-12 col-lg-12">
                <!-- Widget Jvmap -->
                <div class="card card-shadow">
                    <div class="card-block p-0">
                        <div id="devicesmap"></div>
                    </div>
                </div>
                <!-- End Widget Jvmap -->
            </div>
        </div>
    </div>
    @push('isscript')
        <script src="{{ asset('global/vendor/mapbox-js/mapbox.js')}}"></script>
        <script src="{{ asset('global/vendor/mapbox-js/leaflet.markercluster.js')}}"></script>
        <script src="{{ asset('leaflet/leaflet.js')}}"></script>
        <script src="{{ asset('leaflet/fullscreen/Leaflet.fullscreen.min.js')}}"></script>
    @endpush
    @vite([
        'resources/js/pages/live_all_devices.js',
    ])
</x-default>
