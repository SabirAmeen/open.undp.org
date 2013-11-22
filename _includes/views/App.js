<div class='tab-content col col-540 col-mar-10'>
  <ul class='nav nav-tabs'>
    <li class='active'><a data-toggle='tab' href='#summary-tab'>Summary</a></li>
    <li><a data-toggle='tab' class='projects-tab' href='#projects-tab'>Project Listing</a></li>
  </ul>
  <div id='summary-tab' class='summary tab-pane active'>
    <div class='clearfix row-fluid' id='main-container'>
      <!--beigin of upper-->
      <div id='map-view'>
        <!--Layer Switcher on the Map-->
        <ul class='layers clearfix'>
          <li>
            <a href='#' class='map-btn budget active' data-value='budget'>
              <span id='total-budget' class='total'></span>
              <span class='total-caption'><%= year %> Budget</span>
            </a>
          </li>
          <li>
            <a href='#' class='map-btn' data-value='expenditure'>
              <span id='total-expenditure' class='total'></span>
              <span class='total-caption'><%= year %> Expenditure</span>
            </a>
          </li>
          <li>
            <a href='#' class='map-btn' data-value='count'>
              <span id='total-count' class='total'></span>
              <span class='total-caption'>Projects</span>
            </a>
          </li>
          <li>
            <a href='#' class='map-btn' data-value='sources'>
              <span id='total-donors' class='total'></span>
              <span class='total-caption'>Budget Sources</span>
            </a>
          </li>
          <li class='hdi'>
            <a href='#' class='map-btn' data-value='hdi'>
              <span id='hdi' class='total'>0.682</span>
              <span class='total-caption'>HDI Global</span>
              <span class='graph'>Graph</span>
            </a>
          </li>
        </ul>
        <!--/ .layers -->

        <!--The Map-->
        <div class='map-container'>
          <div id='homemap' class='map inner-shadow'></div>
          <div id='map-filters' class='disabled'>
            <ul>
              <li>Filter on precision:</li>
              <li><a id='type-10' class='map-filter active' href='#'>All</a></li>
              <li><a id='type-4' class='map-filter' href='#'>Country</a></li>
              <li><a id='type-3' class='map-filter' href='#'>Subnational</a></li>
              <li><a id='type-1' class='map-filter' href='#'>Street</a></li>
          <!--<li><a id='type-2' class='map-filter' href='#'>Near exact location</a></li>-->
          <!--<li><a id='type-5' class='map-filter' href='#'>Estimated coordinates</a></li>-->
          <!--<li><a id='type-6' class='map-filter' href='#'>Independent political entity</a></li>-->
          <!--<li><a id='type-7' class='map-filter' href='#'>Unclear - capital</a></li>-->
          <!--<li><a id='type-8' class='map-filter' href='#'>Local or national capital</a></li>-->
          <!--<li><a id='type-9' class='map-filter' href='#'>Unclear</a></li>-->
            </ul>
          </div>
          <div class='span12 chart' id='chart-hdi'>
            <div class='label'>
              <h3>Human Development Index</h3>
              <span class='chart-legend'>
                <div class='thick-bar clearfix'><span></span>Country</div>
                <div class='thin-bar'><span></span>Global Avg</div>
              </span>
            </div>
            <div class='hdic'>
              <div class='caption'>
                <div>HDI</div>
                <div>Health</div>
                <div>Education</div>
                <div>Income</div>
              </div>
              <div class='data'> </div>
              <div class='details'>
                <div class='clearfix rankchange'>
                  <div class='ranking'></div>
                  <div class='change'></div>
                </div>
                <div id='sparkline'></div>
                <div id='xlabel' style='font-size:9px;'>
                  <span class='beginyear'>1980</span>
                  <span class='endyear' style='float:right;'>2011</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--Description-->
      <div class='row-fluid separator'>
        <div class='span12'>
          <div id='description'>
            {% for intro in site.categories.intro %}
            {{intro.content}}
            {% endfor %}
            <p class='desc'></p>
            <p class='geography'></p>
          </div>
        </div>
      </div>
    </div>
    <!--end of main-container-->
    <!--Chart View-->
    <div class='row-fluid' id='charts'>
      <div class='span12'>
        <!--Chart Three-->
        <div class='row-fluid'>
          <ul id='chart-focus_area' class='chart stat-chart clearfix'></ul>
        </div>
        <div class='row-fluid'>
          <!--Chart Four -->
          <div class='span6 chart stat-chart' id='chart-operating_unit'>
            <h3>Top Recipient Offices</h3>
            <span class='chart-legend'>
              <div class='thick-bar clearfix'><span></span>Budget</div>
              <div class='thin-bar'><span></span>Expenditure</div>
            </span>
            <table class='table table-unstyled'>
              <tbody class='rows'></tbody>
            </table>
          </div>
          <div class='span6 chart stat-chart' id='chart-donors'>
            <h3>Top Budget Sources</h3>
            <span class='chart-legend'>
              <div class='thick-bar clearfix'><span></span>Budget</div>
              <div class='thin-bar'><span></span>Expenditure</div>
            </span>
            <table class='table table-unstyled'>
              <tbody class='rows'></tbody>
            </table>
          </div>
          <!--/ #chart-operating_unit -->
        </div>
      </div>
      <!--/ .span12 -->
    </div>
    <!--/ #charts -->
  </div>
  <!--/ #summary-tab -->
  <div class='tab-pane' id='projects-tab'>
    <div class='row-fluid'>
      <div id='projects' class='span12'>
        <div class='row-fluid'>
          <div class='span12'>
            <form class='form-search'>
              <strong>Search for projects by title or ID:</strong>
              <input id='projects-search' type='search' class='input-xlarge' placeholder='Search projects' />
              <a href='#' class='icon reset hidden' title='Reset filter'>&times;</a>
            </form>
          </div>
        </div>
        <div class='row-fluid'>
          <div class='span12'>
            <div id='project-items'></div>
          </div>
        </div>
      </div>
      <!--/ #projects -->
    </div>
    <!--/ .row-fluid -->
  </div>
  <!--/ #projects-tab -->
</div>
<!-- / .tab-content -->
<div class='col col-240 col-end col-filter hidden-phone'>
  <div id='siderail'>
    <div id='yearselect'>
      <h3>Fiscal Year</h3>
      <ul class='nav nav-pills'>
        <li class='dropdown'>
          <a class="dropdown-toggle" data-toggle="dropdown" href="#"><%= year %> <b class="caret"></b></a>
          <ul class='dropdown-menu'>
      <% _.each(FISCALYEARS, function(y) { %>
        <li><a href="#" data-value='<%= y %>'<% if (y === year) { %> class='active'<% } %>><%= y %></a></li>
      <% }); %>
          </ul>
        </li>
      </ul>
    </div>
    <div id='filters'>
      <div class='inner'>
        <div class='row-fluid'>
          <div class='span12'>
            <form class='form-search'>
              <input id='filters-search' type='search' id='filter-field' class='input' placeholder='Find a filter' />
              <a href='#' class='icon reset hidden' title='Reset filter'>&times;</a>
            </form>
          </div>
        </div>
        <div class='row-fluid'>
          <div id='filter-items' class='span12'> </div>
        </div>
      </div>
      <% if (window.self === window.top) {  %>   
      <a href='#widget' class='widget-config' data-toggle='modal'>Embed<span class='icon embed'></span></a>
      <% } %>
    </div>
  </div>
  <!--/ #filters -->
</div>
<!-- / .col-240 -->
