<x-default>
    @push('isstyles')

    @endpush
    <div class="page-header page-header-bordered">
        <h1 class="page-title">Resource Monitor</h1>
    </div>

    <div class="container-fluid">
        <div class="page-content container-fluid">
            <div class="row" data-plugin="matchHeight" data-by-row="true">
                <div class="col-xl-3 col-md-6">
                    <div class="card card-shadow card-completed-options">
                        <div class="card-block p-30">
                            <div class="row">
                                <div class="col-12">
                                    <label>SERVER 2654322</label>
                                    <h5>
                                        CPU
                                        <span id="svr_2654322_cpu_value" class="float-right">0%</span>
                                    </h5>
                                    <div class="progress progress-xs">
                                        <div id="svr_2654322_cpu" class="progress-bar progress-bar-danger" style="width:0%;" role="progressbar"></div>
                                    </div>
                                    <h5>
                                        RAM
                                        <span id="svr_2654322_mem_value" class="float-right">0%</span>
                                    </h5>
                                    <div class="progress progress-xs">
                                        <div id="svr_2654322_mem" class="progress-bar progress-bar-warning" style="width: 0%;" role="progressbar"></div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-md-6">
                    <div class="card card-shadow card-completed-options">
                        <div class="card-block p-30">
                            <div class="row">
                                <div class="col-12">
                                    <label>SERVER 2654324</label>
                                    <h5>
                                        CPU
                                        <span id="svr_2654324_cpu_value" class="float-right">0%</span>
                                    </h5>
                                    <div class="progress progress-xs">
                                        <div id="svr_2654324_cpu" class="progress-bar progress-bar-danger" style="width: 0%;" role="progressbar"></div>
                                    </div>
                                    <h5>
                                        RAM
                                        <span id="svr_2654324_mem_value" class="float-right">0%</span>
                                    </h5>
                                    <div class="progress progress-xs">
                                        <div id="svr_2654324_mem" class="progress-bar progress-bar-warning" style="width: 0%;" role="progressbar"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-md-6">
                    <div class="card card-shadow card-completed-options">
                        <div class="card-block p-30">
                            <div class="row">
                                <div class="col-12">
                                    <label>Server Not Registered</label>
                                    <h5>
                                        CPU
                                        <span class="float-right">0%</span>
                                    </h5>
                                    <div class="progress progress-xs">
                                        <div class="progress-bar progress-bar-danger" style="width: 0%;" role="progressbar"></div>
                                    </div>
                                    <h5>
                                        RAM
                                        <span class="float-right">0%</span>
                                    </h5>
                                    <div class="progress progress-xs">
                                        <div class="progress-bar progress-bar-warning" style="width: 0%;" role="progressbar"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-md-6">
                    <div class="card card-shadow card-completed-options">
                        <div class="card-block p-30">
                            <div class="row">
                                <div class="col-12">
                                    <label>Server Not Registered</label>
                                    <h5>
                                        CPU
                                        <span class="float-right">0%</span>
                                    </h5>
                                    <div class="progress progress-xs">
                                        <div class="progress-bar progress-bar-danger" style="width: 0%;" role="progressbar"></div>
                                    </div>
                                    <h5>
                                        RAM
                                        <span class="float-right">0%</span>
                                    </h5>
                                    <div class="progress progress-xs">
                                        <div class="progress-bar progress-bar-warning" style="width: 0%;" role="progressbar"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-6 col-md-6">
                    <div class="card card-shadow ">
                        <div class="panel-heading">
                            <h3 class="panel-title">SERVICES</h3>
                        </div>
                        <div class="panel-body">
                            <ul class="list-group">
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    GSM Services
                                    <span id="service_gsm" class="text">🔴</span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    SIGFOX Services
                                    <span id="service_sigfox" class="text">🔴</span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    ALPS Services
                                    <span class="text">Not Registered</span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    TELTONIKA Services
                                    <span class="text">Not Registered</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
    </div>

    @push('isscript')
    <script src="{{ asset('global/vendor/asprogress/jquery-asProgress.js')}}"></script>
    <script src="{{ asset('global/js/Plugin/asprogress.js')}}"></script>
    @endpush
    @vite([
    'resources/js/pages/resource_monitor.js'
    ])
</x-default>
