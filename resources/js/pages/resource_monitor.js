var sio = window.sio;

sio.on("trx_resources_monitor_rcv", (data) => {
    var gsm = data.search("Tracking ON.");
    var _sigfox = data.search("Sigfox ON.");
    
    if (_sigfox >= 0) {
        console.log(`gsm ${gsm}`,`sigfox ${_sigfox}`)
        $('#service_sigfox').text('🟢');
        var sigfox_timeout = setTimeout(function() {
            $('#service_sigfox').text('🔴');
        }, 3000);
    }
    if  (gsm < 0 && _sigfox < 0) {
        var v = JSON.parse(data);
        // console.log("o",v)
        if (v.app_name === 'SRCM-2654322') {
            $('#svr_2654322_cpu_value').text(`${v.data.CPU}%`);
            $('#svr_2654322_cpu').css('width', `${v.data.CPU}%`);
            $('#svr_2654322_mem_value').text(`${v.data.MEM}%`);
            $('#svr_2654322_mem').css('width', `${v.data.MEM}%`);
        }else if (v.app_name === 'SRCM-2654324') {
            $('#svr_2654324_cpu_value').text(`${v.data.CPU}%`);
            $('#svr_2654324_cpu').css('width', `${v.data.CPU}%`);
            $('#svr_2654324_mem_value').text(`${v.data.MEM}%`);
            $('#svr_2654324_mem').css('width', `${v.data.MEM}%`);
        }

    }else if (gsm => 0) {
        $('#service_gsm').text('🟢');
        var gsm_timeout = setTimeout(function() {
            $('#service_gsm').text('🔴');
        }, 3000);
    }
});
