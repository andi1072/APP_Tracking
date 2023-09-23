<div class="site-menubar">
    <div class="site-menubar-body">
        <div>
            <ul class="site-menu" data-plugin="menu">
                <li class="site-menu-category">General</li>
                {{-- <li class="site-menu-item active"> --}}
                <li class="site-menu-item {{ \Hlp::chkActive(route('dashboard')) }}">
                    <a class="animsition-link" href="{{ route('dashboard') }}">
                        <i class="site-menu-icon md-view-dashboard" aria-hidden="true"></i>
                        <span class="site-menu-title">Dashboard</span>
                    </a>
                </li>
                <li class="site-menu-category">Menu</li>
                <li class="site-menu-item {{ \Hlp::chkActive(route('tracking_list')) }}">
                    <a class="animsition-link" href="{{ route('tracking_list') }}">
                        <i class="site-menu-icon md-view-dashboard" aria-hidden="true"></i>
                        <span class="site-menu-title">Tracking</span>
                    </a>
                </li>
                @if (Cookie::get('USRID') == '72252c8a-8947-4300-b933-90609c37a55d')
                <li class="site-menu-item {{ \Hlp::chkActive(route('tollmapindex')) }}">
                    <a class="animsition-link" href="{{ route('tollmapindex') }}">
                        <i class="site-menu-icon md-view-dashboard" aria-hidden="true"></i>
                        <span class="site-menu-title">Toll Map</span>
                    </a>
                </li>
                
                @if (\Hlp::chkActive(route('customer_list')) || \Hlp::chkActive(route('customer_create_index')))
                    <li class="site-menu-item has-sub active open">
                @else
                    <li class="site-menu-item has-sub">
                @endif
                    <a href="javascript:void(0)">
                        <i class="site-menu-icon md-google-pages" aria-hidden="true"></i>
                        <span class="site-menu-title">User Management</span>
                        <span class="site-menu-arrow"></span>
                    </a>
                    <ul class="site-menu-sub">
                        <li class="site-menu-item {{ \Hlp::chkActive(route('customer_list')) }}">
                            <a class="animsition-link" href="{{ route('customer_list') }}">
                                <span class="site-menu-title">User List</span>
                            </a>
                        </li>
                        <li class="site-menu-item {{ \Hlp::chkActive(route('customer_create_index')) }}">
                            <a class="animsition-link" href="{{ route('customer_create_index') }}">
                                <span class="site-menu-title">Add New user</span>
                            </a>
                        </li>
                    </ul>
                </li>
                @endif
                @if (\Hlp::chkActive(route('device_list')) || \Hlp::chkActive(route('device_create_index')))
                    <li class="site-menu-item has-sub active open">
                @else
                    <li class="site-menu-item has-sub">
                @endif
                    <a href="javascript:void(0)">
                        <i class="site-menu-icon md-google-pages" aria-hidden="true"></i>
                        <span class="site-menu-title">Device Management</span>
                        <span class="site-menu-arrow"></span>
                    </a>
                    <ul class="site-menu-sub">
                        <li class="site-menu-item {{ \Hlp::chkActive(route('device_list')) }}">
                            <a class="animsition-link" href="{{ route('device_list') }}">
                                <span class="site-menu-title">Device List</span>
                            </a>
                        </li>
                        @if (Cookie::get('USRID') == '72252c8a-8947-4300-b933-90609c37a55d')
                        <li class="site-menu-item {{ \Hlp::chkActive(route('device_create_index')) }}">
                            <a class="animsition-link" href="{{ route('device_create_index') }}">
                                <span class="site-menu-title">Add New Device</span>
                            </a>
                        </li>
                        @endif
                    </ul>
                </li>
                <li class="site-menu-category">Configuration</li>
                @if (\Hlp::chkActive(route('geo_create_index')) || \Hlp::chkActive(route('geo_list')))
                    <li class="site-menu-item has-sub active open">
                @else
                    <li class="site-menu-item has-sub">
                @endif
                    <a href="javascript:void(0)">
                        <i class="site-menu-icon md-view-compact" aria-hidden="true"></i>
                        <span class="site-menu-title">Geo Zone</span>
                        <span class="site-menu-arrow"></span>
                    </a>
                    <ul class="site-menu-sub">
                        <li class="site-menu-item {{ \Hlp::chkActive(route('geo_list')) }}">
                            <a class="animsition-link" href="{{ route('geo_list') }}">
                                <span class="site-menu-title">Geo List</span>
                            </a>
                        </li>
                        <li class="site-menu-item {{ \Hlp::chkActive(route('geo_create_index')) }}">
                            <a class="animsition-link" href="{{ route('geo_create_index') }}">
                                <span class="site-menu-title">Add Geo-Location</span>
                            </a>
                        </li>
                    </ul>
                </li>
                @if (Cookie::get('USRID') == '72252c8a-8947-4300-b933-90609c37a55d')
                
                    <li class="site-menu-item {{ \Hlp::chkActive(route('section_form_index')) }}">
                        <a class="animsition-link" href="{{ route('section_form_index') }}">
                            <i class="site-menu-icon md-view-dashboard" aria-hidden="true"></i>
                            <span class="site-menu-title">Toll Section Editor</span>
                        </a>
                    </li>
                    @if (\Hlp::chkActive(route('geomlff_create_index')) || \Hlp::chkActive(route('geomlff_list')) || \Hlp::chkActive(route('gate_create')))
                        <li class="site-menu-item has-sub active open">
                    @else
                        <li class="site-menu-item has-sub">
                    @endif
                        <a href="javascript:void(0)">
                            <i class="site-menu-icon md-view-compact" aria-hidden="true"></i>
                            <span class="site-menu-title">Toll Gate</span>
                            <span class="site-menu-arrow"></span>
                        </a>
                        <ul class="site-menu-sub">
                            <li class="site-menu-item {{ \Hlp::chkActive(route('geomlff_list')) }}">
                                <a class="animsition-link" href="{{ route('geomlff_list') }}">
                                    <span class="site-menu-title">Gate List</span>
                                </a>
                            </li>
                            <li class="site-menu-item {{ \Hlp::chkActive(route('gate_create')) }}">
                                <a class="animsition-link" href="{{ route('gate_create') }}">
                                    <span class="site-menu-title">Add Toll Gate</span>
                                </a>
                            </li>
                            <li class="site-menu-item {{ \Hlp::chkActive(route('geomlff_create_index')) }}">
                                <a class="animsition-link" href="{{ route('geomlff_create_index') }}">
                                    <span class="site-menu-title">Add Gate Declaration</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    @if (\Hlp::chkActive(route('restarea_create_index')) || \Hlp::chkActive(route('restarea_list')))
                        <li class="site-menu-item has-sub active open">
                    @else
                        <li class="site-menu-item has-sub">
                    @endif
                        <a href="javascript:void(0)">
                            <i class="site-menu-icon md-view-compact" aria-hidden="true"></i>
                            <span class="site-menu-title">Rest Area</span>
                            <span class="site-menu-arrow"></span>
                        </a>
                        <ul class="site-menu-sub">
                            <li class="site-menu-item {{ \Hlp::chkActive(route('restarea_list')) }}">
                                <a class="animsition-link" href="{{ route('restarea_list') }}">
                                    <span class="site-menu-title">Rest Area List</span>
                                </a>
                            </li>
                            <li class="site-menu-item {{ \Hlp::chkActive(route('restarea_create_index')) }}">
                                <a class="animsition-link" href="{{ route('restarea_create_index') }}">
                                    <span class="site-menu-title">Add Rest Area</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                @endif

                @if (Cookie::get('USRID') == '72252c8a-8947-4300-b933-90609c37a55d')
                <li class="site-menu-category">Engineer Tools</li>
                <li class="site-menu-item {{ \Hlp::chkActive(route('dev_src_monitor')) }}">
                    <a class="animsition-link" href="{{ route('dev_src_monitor') }}">
                        <i class="site-menu-icon md-view-dashboard" aria-hidden="true"></i>
                        <span class="site-menu-title">Resource Monitor</span>
                    </a>
                </li>
                <li class="site-menu-item {{ \Hlp::chkActive(route('devices_live')) }}">
                    <a class="animsition-link" href="{{ route('devices_live') }}">
                        <i class="site-menu-icon md-view-dashboard" aria-hidden="true"></i>
                        <span class="site-menu-title">Live All Devices</span>
                    </a>
                </li>
                <li class="site-menu-item {{ \Hlp::chkActive(route('dev_tracking_map')) }}">
                    <a class="animsition-link" href="{{ route('dev_tracking_map') }}">
                        <i class="site-menu-icon md-view-dashboard" aria-hidden="true"></i>
                        <span class="site-menu-title">Tracking Map</span>
                    </a>
                </li>
                <li class="site-menu-item {{ \Hlp::chkActive(route('mlff_history_section')) }}">
                    <a class="animsition-link" href="{{ route('mlff_history_section') }}">
                        <i class="site-menu-icon md-view-dashboard" aria-hidden="true"></i>
                        <span class="site-menu-title">MLFF History Toll Section</span>
                    </a>
                </li>
                @endif
            </ul>
            {{-- <div class="site-menubar-section">
                <h5>
                    Server CPU
                    <span class="float-right">30%</span>
                </h5>
                <div class="progress progress-xs">
                    <div class="progress-bar active" style="width: 30%;" role="progressbar"></div>
                </div>
                <h5>
                    Server Memory
                    <span class="float-right">60%</span>
                </h5>
                <div class="progress progress-xs">
                    <div class="progress-bar progress-bar-warning" style="width: 60%;" role="progressbar"></div>
                </div>
            </div> --}}
        </div>
    </div>

    {{-- <div class="site-menubar-footer"></div> --}}
</div>
