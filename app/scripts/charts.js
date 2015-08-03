// Charts module
'use strict';

(function(){

  google.load('visualization', '1', {packages: ['corechart', 'bar']});

  // dynamically get array of current year + 5 previous calendar years
  var year = new Date().getFullYear(), years = [], timePeriod = 5;
  for (var i = timePeriod; i >= 0; i--) {
    years.push((year - i).toString());
  }

  // chart options/styles
  var options = {
      height: 300,
      colors: ['#1b9e77'],
      chartArea: {width: '80%'},
      bar: { groupWidth: '75%' },
      legend: { position: 'none' },
      vAxis: { minValue: 0 }
  };

  // bind events
  events.on('customerChanged', render);
  //google.setOnLoadCallback(render);

  function render(newTons) {
    if ( newTons ) {

      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Year');
      data.addColumn('number', 'Tons');

      for (var i = 0; i < years.length; i++) {
        data.addRows([
          [years[i], newTons[i]]
        ]);
      }

      var chart = new google.visualization.ColumnChart(document.getElementById('chart'));
      chart.draw(data, options);
    }

  }

})();
