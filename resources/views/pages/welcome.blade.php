<x-default>
    <button onclick="importGate()">IMPORT GATE</button>
    <button onclick="importSection()">IMPORT SECTION</button>
    @push('isscript')
    <script src="{{ asset('gt_220121_REV2_2.js')}}"></script>
    <script src="{{ asset('tol_operasi_260121_REV_1.js') }}"></script>
    <script>
        console.log(json_tol_operasi_260121_REV_1.features)
        var _tmpLatLng = {};
        const url = location.protocol + '//' + window.location.host;
        function importSection() {
            $.each(json_tol_operasi_260121_REV_1.features, function(i, v) {
                // console.log(i,v.properties,v.geometry.coordinates)
                var _prop = v.properties, _latLng = v.geometry.coordinates
                _id = uuidv4();
                if (_prop.NAMA) {
                    // $.get(url + `/test/section/js?id=${_id}&section_name=${_prop.NAMA}&address=${_prop.PROPINSI},${_prop.KABUPATEN}&type=${_prop.Type}&island=${_prop.Island}&length=${_prop.PANJANG}&manager=${_prop.PENGELOLA}&status=${_prop.STATUS}`, function (r) {
                    //     console.log('SECTION',r)
                    // });
                    console.log(`INSERT INTO public.x_geo_toll_route(` +
	                `id, ftsection_name, ftaddress, fttype, ftisland, ftlength, ftmanager, ftstatus, created_at, updated_at) ` +
	                `VALUES ('${_id}', '${_prop.NAMA}', '${_prop.PROPINSI},${_prop.KABUPATEN}', '${_prop.Type}', '${_prop.Island}', '${_prop.PANJANG}', '${_prop.PENGELOLA}', '${_prop.STATUS}', NOW(), NOW());`)
                    // console.log(
                    //     _prop.NAMA,
                    //     _prop.PANJANG,
                    //     _prop.PENGELOLA,
                    //     _prop.STATUS,
                    //     _prop.Type,
                    //     _prop.PROPINSI,
                    //     _prop.KABUPATEN,
                    //     _prop.Island
                    // )
                    $.each(_latLng, function( i, v ) {
                        // console.log("CHECK POINT",i, v)
                        $.each(v, function( ii, vv ) {
                            console.log(`INSERT INTO public.x_geo_toll_route_det(` +
                                `id, x_geo_toll_route_id, fflat, fflon, fnindex, fnchkpoint) ` +
                                `VALUES ('${uuidv4()}', '${_id}', '${vv[1]}', '${vv[0]}', '${ii}', '${i}');`)
                            // $.get(url + `/test/sectionlatlng/js?x_geo_toll_route_id=${_id}&lat=${vv[1]}&lon=${vv[0]}&checkpoint=${i}&index=${ii}`, function (r) {
                            //     console.log('SECTION_LATLNG',r)
                            // });
                            // console.log("INDEX",i,ii, vv)
                        });
                    });
                }
                // console.log('stop')
            });
            
        }
        function importGate() {
            $.each(json_gt_220121_REV2_2.features, function(i, v) {
                // console.log(i,v.properties,v.geometry.coordinates)
                var _prop = v.properties, _latLng = v.geometry.coordinates;
                $.get(url + `/test/js?gate_name=${_prop.nama}&type=${_prop.layer}&point_lat=${_latLng[1]}&point_lon=${_latLng[0]}&description=${_prop.keterangan}`, function (r) {
                    console.log(r)
                });
            });
        }
        function uuidv4() {
                return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
                    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
                );
            }
            console.log(uuidv4());
    </script>
    @endpush
</x-default>
