@section('page_title')
    {{ "Dashboard" }}
@endsection
<x-default>
    @push('isstyles')
        <link rel="stylesheet" href="{{ asset('leaflet/leaflet.css') }}"/>
    @endpush
    <div class="page-content container-fluid">
        <div class="row" data-plugin="matchHeight" data-by-row="true">
            <div class="col-xxl-12 col-lg-12">
                <!-- Widget Jvmap -->
                <div class="card card-shadow">
                    <div class="card-block p-0">
                        <div id="dashboardmap"></div>
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
    @endpush
    @vite([
        'resources/js/ts/dashboardmaps.js',
    ])
</x-default>
