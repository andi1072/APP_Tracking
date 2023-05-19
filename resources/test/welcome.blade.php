<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>TRANSDIGI ADMINISTRATOR</title>

        <!-- Fonts -->
        {{-- <link href="https://fonts.bunny.net/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet"> --}}

        @vite([
            'resources/css/app.css',
            'resources/js/app.js',
            'resources/js/ts/maps.js',
            'resources/js/sio/socket.io.min.js'
        ])
    </head>
    <body>
        <div id="map"></div>
    </body>
</html>
