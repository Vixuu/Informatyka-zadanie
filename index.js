let chartData = [];
const cantComeUpWithFuncName = (cities = 100000000,suburbs = 100000000,villages = 100000000,years = 100) => {
  chartData.push({
    year: 0,
    citiesPop: cities,
    suburbsPop: suburbs,
    villagesPop: villages,
  });

  i = 0;
  while (i < years) {
    // city -> somewhere else
    suburbs = suburbs + cities * 0.04;
    villages = villages + cities * 0.01;
    cities = cities - cities * 0.05;

    // villages -> somewhere else
    cities = cities + villages * 0.05;
    suburbs = suburbs + villages * 0.02;
    villages = villages - villages * 0.07;

    // suburbs -> somewhere else
    cities = cities + suburbs * 0.02;
    villages = villages + suburbs * 0.01;
    suburbs = suburbs - suburbs * 0.03;

    chartData.push({
      year: i + 1,
      citiesPop: Math.round(cities),
      suburbsPop: Math.round(suburbs),
      villagesPop: Math.round(villages),
    });

    i++;
  }

  console.log(`cities: ${Math.round(cities)}`);
  console.log(`suburbs: ${Math.round(suburbs)}`);
  console.log(`villages: ${Math.round(villages)}`);
};

// Chart
let ctx1 = document.getElementById("myChart1").getContext("2d");
let myChart1 = new Chart(ctx1, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "Cities Population",
        data: [],
        backgroundColor: "rgba(8, 160, 201, 0.25)",
        borderColor: "rgb(8, 160, 201)",
      },
    ],
  },
});

// Chart
let ctx2 = document.getElementById("myChart2").getContext("2d");
let myChart2 = new Chart(ctx2, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "Subrubs Population",
        data: [],
        backgroundColor: "rgba(194, 37, 37, 0.25)",
        borderColor: "rgb(194, 37, 37)",
      },
    ],
  },
});

// Chart
let ctx3 = document.getElementById("myChart3").getContext("2d");
let myChart3 = new Chart(ctx3, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "Villages Population",
        data: [],
        backgroundColor: "rgba(255, 202, 10, 0.25)",
        borderColor: "rgb(255, 202, 10)",
      },
    ],
  },
});

function addData(array) {
  for (i in array) {
    // Chart1
    myChart1.data.labels.push(`${i}th year`);
    myChart1.data.datasets.forEach((dataset) => {
      dataset.data.push(chartData[i].citiesPop);
    });

    // Chart2
    myChart2.data.labels.push(`${i}th year`);
    myChart2.data.datasets.forEach((dataset) => {
      dataset.data.push(chartData[i].suburbsPop);
    });

    // Chart3
    myChart3.data.labels.push(`${i}th year`);
    myChart3.data.datasets.forEach((dataset) => {
      dataset.data.push(chartData[i].villagesPop);
    });
  }
  myChart1.update();
  myChart2.update();
  myChart3.update();
}
cantComeUpWithFuncName();
addData(chartData);
console.log(chartData);

document.getElementById("city").innerHTML = chartData.slice(-1)[0].citiesPop;
document.getElementById("suburb").innerHTML = chartData.slice(-1)[0].suburbsPop;
document.getElementById("village").innerHTML = chartData.slice(-1)[0].villagesPop;

// const insertData = () => {
//   let cities = document.getElementById('cities').value
//   let suburbs = document.getElementById('suburbs').value
//   let villages = document.getElementById('villages').value
//   let years = document.getElementById('years').value

//   console.log(cities)

//   cantComeUpWithFuncName(cities, suburbs, villages, years)
//   addData(chartData)
// }
