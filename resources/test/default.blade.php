<!doctype html>

<html lang="en-US">

    <head>

        @include('includes.head')
        <link rel='stylesheet' href='http://fonts.googleapis.com/css?family=Roboto:300,400,500,300italic'>
    </head>

    <body class="animsition">

        @include('includes.nav')
        @include('includes.header')
        @include('includes.footer')
        
        <script>
            (function(document, window, $){
              'use strict';
          
              var Site = window.Site;
              $(document).ready(function(){
                Site.run();
              });
            })(document, window, jQuery);
        </script>
    </body>

</html>
