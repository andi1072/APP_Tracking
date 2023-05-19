@section('page_title')
    {{ "Geo Location Listed" }}
@endsection
<x-default>

    @push('isstyles')
    <link rel="stylesheet" href="{{ asset('global/vendor/datatables.net-bs4/dataTables.bootstrap4.min.css')}}">
    @endpush

    <div class="page-header page-header-bordered">
        <h1 class="page-title">Geo Location Listed</h1>
        <div class="page-header-actions">
            <a href="{{ route('geo_create_index') }}" class="btn btn-sm btn-outline btn-primary btn-round waves-effect waves-classic">
                <span class="text hidden-sm-down">Add New</span>
                <i class="icon md-chevron-right" aria-hidden="true"></i>
            </a>
        </div>
    </div>
    <div class="page-content">
        <!-- Panel Basic -->
        <div class="panel">
            <header class="panel-heading">
                <div class="panel-actions"></div>
                <h3 class="panel-title"></h3>
            </header>
            <div class="panel-body">
                <table class="table table-hover dataTable table-striped w-full" id="tblgeofence">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Geo Location Name</th>
                            <th>Geo Location Address</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
    </div>
    @push('isscript')
    <script src="{{ asset('global/vendor/datatables.net/jquery.dataTables.min.js')}}"></script>
    <script src="{{ asset('global/vendor/datatables.net-bs4/dataTables.bootstrap4.min.js')}}"></script>
    <script src="{{ asset('global/vendor/bootbox/bootbox.js')}}"></script>
    <script src="{{ asset('global/js/Plugin/datatables.js')}}"></script>
    <script>
        var tblgeofence = $('#tblgeofence').DataTable({
            "lengthChange": false
            , order: [
                [1, 'asc']
            ],
            scrollX: true,
            "columnDefs": [
                { 'visible': false, 'targets': [0] },
                {
                    // <button class="btn btn-info waves-effect waves-classic" data-content="And here's some amazing content. It's very engaging. Right?" data-trigger="hover" data-toggle="popover" data-original-title="Hover to trigger" tabindex="0" title="" type="button">Hover to trigger</button>
                    targets: -1, 
                    "defaultContent": '<button class="btnedit btn btn-pure btn-primary icon md-edit waves-effect waves-classic"></button><button class="btndel btn btn-pure btn-danger icon icon md-delete waves-effect waves-classic"></button>'
                },
            ], fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                // if (aData[0] == "Done") {
                //     $('td', nRow).css('background-color', '#d1e7dd');
                // }
            },

        });
        $('#tblgeofence tbody').on( 'click', 'button.btnedit', function () {
            var data = tblgeofence.row($(this).parents('tr')).data(), sURL;
            console.log(data)
            sURL = `{{ route('geo_detail', ':id') }}`;
            window.location.href = sURL.replace(":id", data[0]);
        });
        $('#tblgeofence tbody').on( 'click', 'button.btndel', function () {
            var data = tblgeofence.row($(this).parents('tr')).data(), sURL;
            console.log(data)
            sURL = `{{ route('geo_detail', ':id') }}`;
            // window.location.href = sURL.replace(":id", data[0]);
        });
        
        // created_at
        // fnstatus
        // fntype
        // ftaddress
        // ftgeo_name
        // id
        // updated_at


        $.get("{{ route('geo_list_js') }}", function(res) {
            $.each(res.data, function(k, v) {
                tblgeofence.row.add([
                    v.id,v.ftgeo_name, v.ftaddress
                ]).draw(true);
            });
        });
    </script>
    @endpush
</x-default>
