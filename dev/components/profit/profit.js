const gcCoeff = 1;
const gcPrice = 5;
const elseCoeff = 0.35;
const elsePrice = 1;
const getProfit = (term, trafic, coeff, price) => parseInt(term * trafic * coeff * price);

$('.js-range').each((i, el) => {
  const $this = $(el);
  const $tabContent = $this.closest('.js-tab-content');

  $this.ionRangeSlider({
    type: 'single',
    max: $this.attr('data-max'),
    min: $this.attr('data-min'),
    from: $this.attr('value'),
    step: 1,
    onChange: data => {
      if ($('.js-tab[data-tab="1"]').hasClass('profit__tabs-item--active')) {
        const val = +data.input[0].value;
        const profit = getProfit($tabContent.find('.js-range[name="term"]').val(), $tabContent.find('.js-range[name="trafic"]').val(), gcCoeff, gcPrice);
  
        $this.parent().find('.js-range-value').text(JSON.parse($this.attr('data-keys')).decline(val, true));
        $tabContent.find('.js-profit').text(profit);

        if ($this.attr('name') === 'trafic') {
          const dataset = [];
  
          for (let i = 1; i <= 12; i++) {
            dataset.push(getProfit(i, val, gcCoeff, gcPrice));
          }
  
          chart_gc.chart.data.datasets[0].data = dataset;
          chart_gc.update();
        }
      } else {
        const val = +data.input[0].value;
        const profit = getProfit($tabContent.find('.js-range[name="term"]').val(), $tabContent.find('.js-range[name="trafic"]').val(), elseCoeff, elsePrice);
  
        $this.parent().find('.js-range-value').text(JSON.parse($this.attr('data-keys')).decline(val, true));
        $tabContent.find('.js-profit').text(profit);

        if ($this.attr('name') === 'trafic') {
          const dataset = [];
  
          for (let i = 1; i <= 12; i++) {
            dataset.push(getProfit(i, val, elseCoeff, elsePrice));
          }
  
          chart_else.chart.data.datasets[0].data = dataset;
          chart_else.update();
        }
      }
    }
  });
});

const charts = document.querySelectorAll('.js-chart');

const GC_DATA = {
  labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
  values: []
};

const ELSE_DATA = {
  labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
  values: []
};

for (let i = 1; i <= 12; i++) {
  GC_DATA.values.push(getProfit(i, 1000, gcCoeff, gcPrice));
  ELSE_DATA.values.push(getProfit(i, 1000, elseCoeff, elsePrice));
}

const options = {
  legend: {
      display: false
  },
  elements: {
    point: {
      radius: 0,
      backgroundColor: '#0090FF'
    }
  },
  hover: {
    mode: 'index',
    intersect: false
  },
  tooltips: {
    mode: 'index',
    intersect: false,
    enabled: false,
    custom: function(tooltipModel) {
      // Tooltip Element
      var tooltipEl = document.getElementById('chartjs-tooltip');

      // Create element on first render
      if (!tooltipEl) {
          tooltipEl = document.createElement('div');
          tooltipEl.id = 'chartjs-tooltip';
          tooltipEl.innerHTML = '<div></div>';
          document.body.appendChild(tooltipEl);
      }

      // Hide if no tooltip
      if (tooltipModel.opacity === 0) {
          tooltipEl.style.opacity = 0;
          return;
      }

      // Set caret Position
      tooltipEl.classList.remove('above', 'below', 'no-transform');
      if (tooltipModel.yAlign) {
          tooltipEl.classList.add(tooltipModel.yAlign);
      } else {
          tooltipEl.classList.add('no-transform');
      }

      function getBody(bodyItem) {
          return bodyItem.lines;
      }

      // Set Text
      if (tooltipModel.body) {
          var titleLines = tooltipModel.title || [];
          var bodyLines = tooltipModel.body.map(getBody);

          var innerHtml = '<div>';

          bodyLines.forEach(function(body, i) {
              innerHtml += '<p><span>$</span>' + body + '/мес</p>';
              innerHtml += '<p>' + ["игрок", "игрока", "игроков"].decline(+$('input[name="trafic"]').val(), true) + '</p>';
          });

          innerHtml += '</div>';

          var tableRoot = tooltipEl;
          tableRoot.innerHTML = innerHtml;
      }

      // `this` will be the overall tooltip
      var position = this._chart.canvas.getBoundingClientRect();

      // Display, position, and set styles for font
      tooltipEl.style.opacity = 1;
      tooltipEl.style.position = 'absolute';
      tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
      tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
      tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
      tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
      tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
      tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
      tooltipEl.style.pointerEvents = 'none';
    }
  },
  scales: {
    yAxes: [{
      gridLines: {
        zeroLineColor: 'rgba(157, 175, 193, 0.2)',
        color: 'rgba(157, 175, 193, 0.2)',
        drawBorder: false
      },
      ticks: {
        beginAtZero: true,
        fontColor: 'rgba(157, 175, 193, 0.5)',
        fontFamily: 'Gilroy, Helvetica, sans-serif',
        fontSize: 14,
        padding: window.innerWidth < 1200 ? 5 : 10,
        // stepSize: Math.max(...PROFIT_DATA.values) / 5
      }
    }],
    xAxes: [{
      gridLines: {
        display: false,
      },
      ticks: {
        fontColor: '#96A1AD',
        fontFamily: 'Gilroy, Helvetica, sans-serif',
        fontSize: 14,
        stepSize: 7,
        autoSkip: false,
        maxRotation: 0,
        minRotation: 0
      }
    }]
  }
};

Array.from(charts).map((el, i) => {
  const chartElement = el.getContext("2d");
  const id = el.getAttribute('data-chart');
  const DATA = eval(`${id.toUpperCase()}_DATA`);
  const chartOptions = options;
  const gradient = chartElement.createLinearGradient(260, -80, 350, 350);
  gradient.addColorStop(0, 'rgba(0, 0, 0, 1)');   
  gradient.addColorStop(1, 'rgba(180, 215, 255, 0)');  

  chartOptions.scales.yAxes[0].ticks.stepSize = Math.max(...DATA.values) / 5

  window[`chart_${el.getAttribute('data-chart')}`] = new Chart(chartElement, {
    type: 'line',
    data: {
      labels: DATA.labels,
      datasets: [
        {
          backgroundColor: gradient,
          pointBackgroundColor: '#9DAFC1',
          pointHoverRadius: 0,
          data: DATA.values,
          borderColor: '#0177FC'
        }
      ]
    },
    options: chartOptions
  });
});

$('.profit__tabs-content.js-tab-content').not('[data-tab="1"]').hide(0);