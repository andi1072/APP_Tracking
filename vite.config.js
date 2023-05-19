import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/js/app.js',
                'resources/js/ts/dashboardmaps.js',
                // 'resources/js/sio/socket.io.min.js',
                
                'resources/js/pages/device.js',
                // 'resources/js/pages/geo.js',
                'resources/js/pages/tracking_map.js',
                'resources/js/pages/tracking_status.js',
                'resources/js/pages/tracking_geo.js',
                'resources/js/pages/resource_monitor.js',
                'resources/js/pages/tracking_live.js',
                'resources/js/pages/live_all_devices.js',
                'resources/js/pages/geomlff.js',
                'resources/js/pages/tollroute.js',
                'resources/js/pages/toll_map.js',
                'resources/js/pages/tracking_mlff.js',
                'resources/js/pages/customer.js',
                'resources/js/pages/tollgate.js',
                'resources/js/pages/dev_tracking_map.js',
                // 'resources/js/pages/restarea.js',
            ],
            refresh: true,
        }),
    ],
    // resolve: {
    //     alias: {
    //         'sio': 'resources/js/sio/socket.io.min.js',
    //     },
    // },
});
