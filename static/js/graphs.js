// Retrive Data from API

async function getData() {
    const url = "/countries"
    const response = await fetch(url);
    console.log(response);
    const countrydata = await response.json();
    console.log(countrydata);
    return countrydata;
}

// Create Data Points for Charts

getData().then(datapoints => {

    // Set Country Data Points
    const country = datapoints.map(datapoint => {
        return datapoint.country;
    })

    // Set Unemployment Rate Data Points
    const unemploymentRate = datapoints.map(datapoint => {

        return datapoint.unemployment_rate;
    })

    // Set Beer Servings Data Points
    const beer = datapoints.map(datapoint => {
        return datapoint.beer_servings;
    })

    // Set Spirit Servings Data Points
    const spirit = datapoints.map(datapoint => {
        return datapoint.spirit_servings;
    })

    // Set wine Servings Data Points
    const wine = datapoints.map(datapoint => {
        return datapoint.wine_servings;
    })

    // Set Total Liters of Pure Alcohol Data Points
    const total = datapoints.map(datapoint => {
        return datapoint.total_litres_of_pure_alcohol;
    })

    // Get worldwide Beer Servings
    const beerSum = beer.reduce((accumulator, value) => {
        return accumulator + value;
    }, 0);

    // Get worldwide Spirit Servings
    const spiritSum = spirit.reduce((accumulator, value) => {
        return accumulator + value;
    }, 0);
    
    // Get worldwide Wine Servings
    const wineSum = wine.reduce((accumulator, value) => {
        return accumulator + value;
    }, 0);

    // Get worldwide Alcohol Consumption
    const alcoholSum = total.reduce((accumulator, value) => {
        return accumulator + value;
    }, 0);

    // Sum of World Wide Servings
    servingSum = beerSum + spiritSum + wineSum;

    // Determing Serving size in Liters
    servingSize = alcoholSum / servingSum;

    // Determine Percentage of Beer Serving to total World Wode Serving
    beerPercentage = beerSum / servingSum * 100

    // Determine Percentage of Spirit Serving to total World Wode Serving
    spiritPercentage = spiritSum / servingSum * 100

    // Determine Percentage of Wine Serving to total World Wode Serving
    winePercentage = wineSum / servingSum * 100

    // Random Color Generator
    function getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    // Assign Randomize Color
    beercolor = getRandomColor()
    spiritcolor = getRandomColor()
    winecolor = getRandomColor()
    alcoholcolor = getRandomColor()
    unemploymentcolor = getRandomColor()


    // Element Id Assign

    let beerctx = document.getElementById('beer').getContext('2d');
    let alcoholctx = document.getElementById('Alcohol').getContext('2d');
    let stackctx = document.getElementById('stacked').getContext('2d');
    let comboctx = document.getElementById('Combo').getContext('2d');
    let worldctx = document.getElementById('World').getContext('2d');
    let percentctx = document.getElementById('Percent').getContext('2d');
    

    //Beer, Spirit, and Wine comparison Chart setup

    let beerChart = new Chart(beerctx, {
        type: 'line',
        data: {
            labels: country,
            datasets: [{
                label: 'Beer',
                fill: false,
                backgroundColor: beercolor,
                borderColor: beercolor,
                data: beer,
                },
                {
                    label: 'Spirit',
                    fill: false,
                    backgroundColor: spiritcolor,
                    borderColor: spiritcolor,
                    data: spirit,
                },
                {
                    label: 'Wine',
                    fill: false,
                    backgroundColor: winecolor,
                    borderColor: winecolor,
                    data: wine,
                }
            ]
            
        },
        options: {
            animations: {
                tension: {
                    duration: 1000,
                    easing: 'linear',
                    from: 1,
                    to: 0,
                    loop: true
                }
            },
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Average Serving Size Per Person'
                }
            }
            
        }
    })

    // Stacked Chart Setup

    let stackChart = new Chart(stackctx, {
        type: 'bar',
        data: {
            labels: country,
            datasets: [{
                label: 'Beer',
                fill: false,
                backgroundColor: beercolor,
                borderColor: beercolor,
                data: beer,
                },
                {
                    label: 'Spirit',
                    fill: false,
                    backgroundColor: spiritcolor,
                    borderColor: spiritcolor,
                    data: spirit,
                },
                {
                    label: 'Wine',
                    fill: false,
                    backgroundColor: winecolor,
                    borderColor: winecolor,
                    data: wine,
                }
            ]
            
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Total Average Serving Size Per Person'
                }
            },
            scales: {
                x: {
                    stacked: true,
                },
                y: {
                    stacked: true
                }
            }
            
        }
    })

    // Total Alcohol Chart Setup

    let alcoholChart = new Chart(alcoholctx, {
        type: 'bar',
        data: {
            labels: country,
            datasets: [{
                label: 'Alcohol',
                fillColor: false,
                backgroundColor: getRandomColor,
                data: total,
                }
            ]
            
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            plugins: {
                legend: {
                    position: false,
                },
                title: {
                    display: true,
                    text: 'Total Liters of Pure Alcohol'
                }
            }
            
        }
    })
    
    // Combo Chart of Total Alcohol and Unemploymate Rate Setup

    let comboChart = new Chart(comboctx, {
        type: 'bar',
        data: {
            labels: country,
            datasets: [{
                label: 'Alcohol',
                fill: false,
                backgroundColor: getRandomColor,
                order: 1,
                data: total,
                },
                {
                    label: 'Unemploymate Rate',
                    fill: false,
                    backgroundColor: unemploymentcolor,
                    borderColor: unemploymentcolor,
                    data: unemploymentRate,
                    type: 'line',
                    order: 0
                }
            ]
            
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Unemploymate Rate vs Total Alcohol Consumption in Liters'
                }
            }
            
        }
    })

    // Worldwide Chart Setup

    let wolrdChart = new Chart(worldctx, {
        type: 'polarArea',
        data: {
            labels: ['Beer', 'Spirit', 'Wine'],
            datasets: [{
                label: 'Alcohol',
                fillColor: false,
                backgroundColor: [beercolor, spiritcolor, winecolor],
                borderColor: [beercolor, spiritcolor, winecolor],
                data: [beerSum, spiritSum, wineSum],
                }
            ]
            
        },
        options: {
            responsive: true,
            scales: {
                r: {
                    pointLabels: {
                        display: true,
                        centerPointLabels: true,
                        font: {
                            size: 28
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Total Servings World Wide'
                }
            }
            
        }
    })

    // Worldwide Percentage Chart Setup

    let percentChart = new Chart(percentctx, {
        type: 'polarArea',
        data: {
            labels: ['Beer', 'Spirit', 'Wine'],
            datasets: [{
                label: 'Alcohol',
                fillColor: false,
                backgroundColor: [beercolor, spiritcolor, winecolor],
                borderColor: [beercolor, spiritcolor, winecolor],
                data: [beerPercentage, spiritPercentage, winePercentage],
                }
            ]
            
        },
        options: {
            responsive: true,
            scales: {
                r: {
                    pointLabels: {
                        display: true,
                        centerPointLabels: true,
                        font: {
                            size: 28
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Percentage of World Wide Servings'
                }
            }
            
        }
    })

   
})