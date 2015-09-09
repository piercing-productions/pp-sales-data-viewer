// Chart-Years module
'use strict';

(function(){

  var $el = document.getElementById('chart-years');
  var selectedCustomer = '';

  google.load('visualization', '1', {packages: ['corechart', 'bar']});

  // dynamically get array of current year + 5 previous calendar years
  var year = new Date().getFullYear(), years = [], timePeriod = 5;
  for (var i = timePeriod; i >= 0; i--) {
    if (i > 0) {
      years.push((year - i).toString());
    } else {
      years.push((year - i).toString() + ' YTD');
    }
  }

  // chart options/styles
  var options = {
      height: 425,
      titleTextStyle: {fontSize: 24},
      colors: ['#1b9e77'],
      chartArea: {width: '85%'},
      bar: { groupWidth: '75%' },
      legend: { position: 'none' },
      vAxis: { minValue: 0 }
  };

  // bind events
  events.on('customerChanged', render);
  events.on('pickingCustomer', hide);

  //google.setOnLoadCallback(render);

  function render(d) {
    if ( d ) {

      var selectedCustomer = d[0];
      var selectedCustomerName = toTitleCase(d[1]);
      var newTons = d[2];

      options.title = 'Annual Tons Invoiced for '
        + selectedCustomerName + ' (' + selectedCustomer + ')';

      // the data
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Year');
      data.addColumn('number', 'Tons');
      data.addColumn({type: 'string', role: 'annotation'});
      for (var i = 0; i < years.length; i++) {
        data.addRows([
          [years[i], newTons[i], numberWithCommas(newTons[i])]
        ]);
      }

      var chart = new google.visualization.ColumnChart($el);

      // define handler for user selection
      function selectHandler() {
        var selectedItem = chart.getSelection()[0];
        if (selectedItem) {
          //
          var label = data.getValue(selectedItem.row, 0);
          events.emit('getMonthChart', [selectedCustomer, label]);
        }
      }
      // add the selection handler
      google.visualization.events.addListener(chart, 'select', selectHandler);

      show();

      // draw the chart
      chart.draw(data, options);
    }

  }

  // ideally, these util functions would be in a separate file... alas:
  function show() {
    $el.style.display = '';
  }

  function hide() {
  	$el.style.display = 'none';
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function toTitleCase(str)  {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }

})();
