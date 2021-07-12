const colorZoneDecider = (variable) => {
	//Return color ramp for temperature-related variables and humidity
	console.log(variable)
	let colorZones
	if (variable == 'airtemp2m' || variable == 'dewtemp2m' || variable == 'wetbulbtemp2m' || variable == 'soiltemp10cm' || variable == 'windchill'){
		colorZones = [{
					value: -50,
					color: '#CE0A55'
				},{
					value: -45,
					color: '#E7248A'
				},{
					value: -40,
					color: '#DF65B1'
				},{
					value: -35,
					color: '#FE74DF'
				},{
					value: -30,
					color: '#FEBEE8'
				},{
					value: -25,
					color: '#D9DCEB'
				},{
					value: -20,
					color: '#BCBEDC'
				},{
					value: -15,
					color: '#9C9DC8'
				},{
					value: -10,
					color: '#766BB2'
				},{
					value: -5,
					color: '#53228F'
				},{
	            	value: 0,
	            	color: '#05007E'
	            },{
	            	value: 5,
	            	color: '#053A9C'
	            },{
	            	value: 10,
	            	color: '#0066C2'
	            },{
	            	value: 15,
	            	color: '#249EFE'
	            },{
	            	value: 20,
	            	color: '#48C7FE'
	            },{
	            	value: 25,
	            	color: '#74D7FE'
	            },{
	            	value: 30,
	            	color: '#ADFEFE'
	            },{
	            	value: 35,
	            	color: '#2CCFC2'
	            },{
	            	value: 40,
	            	color: '#009996'
	            },{
	            	value: 45,
	            	color: '#0A5656'
	            },{
	            	value: 50,
	            	color: '#016D28'
	            },{
	            	value: 55,
	            	color: '#2DA353'
	            },{
	            	value: 60,
	            	color: '#75C477'
	            },{
	            	value: 65,
	            	color: '#A1D99B'
	            },{
	            	value: 70,
	            	color: '#D3FEBE'
	            },{
	            	value: 75,
	            	color: '#FEFEB4'
	            },{
	            	value: 80,
	            	color: '#FEEDA0'
	            },{
	            	value: 85,
	            	color: '#FDD177'
	            },{
	            	value: 90,
	            	color: '#FDAF26'
	            },{
	            	value: 95,
	            	color: '#FC8D39'
	            },{
	            	value: 100,
	            	color: '#FC4C27'
	            },{
	            	color: '#B10021'
	            }]
		return colorZones
	}else if(variable == 'rh2m'){
		colorZones = [{
	            	value: 0,
	            	color: '#ffe497'
	            },{
	            	value: 5,
	            	color: '#f2e08f'
	            },{
	            	value: 10,
	            	color: '#e5dc87'
	            },{
	            	value: 15,
	            	color: '#d7d87f'
	            },{
	            	value: 20,
	            	color: '#cad477'
	            },{
	            	value: 25,
	            	color: '#bcd06f'
	            },{
	            	value: 30,
	            	color: '#afcc67'
	            },{
	            	value: 35,
	            	color: '#a1c85f'
	            },{
	            	value: 40,
	            	color: '#94c457'
	            },{
	            	value: 45,
	            	color: '#86c04f'
	            },{
	            	value: 50,
	            	color: '#79bc47'
	            },{
	            	value: 55,
	            	color: '#6bb83f'
	            },{
	            	value: 60,
	            	color: '#5eb437'
	            },{
	            	value: 65,
	            	color: '#50b02f'
	            },{
	            	value: 70,
	            	color: '#43ab27'
	            },{
	            	value: 75,
	            	color: '#35a71f'
	            },{
	            	value: 80,
	            	color: '#28a317'
	            },{
	            	value: 85,
	            	color: '#1a9f0f'
	            },{
	            	value: 90,
	            	color: '#0d9b07'
	            },{
	            	value: 95,
	            	color: '#009700'
	            },{
	            	value: 100,
	            	color: '#008700'
	            },{
	            	color: '#007800'
	            }]
		return colorZones           
	}
}

const units = (variable) => {
	//Returns units based on variable input
	if (variable == 'airtemp2m' || variable == 'dewtemp2m' || variable == 'wetbulbtemp2m' || variable == 'soiltemp10cm' || variable == 'windchill'){
		return '°F'
	}else if (variable == 'rh2m'){
		return '%'
	}
}

const buildBarChart = (dataList,timeList,variable,fullName,missingStations,startTime) => {
	//Build main bar chart using HighCharts
	//X is Y, Y is X (rotated plot)
	let stationCategories = ['Mt. Mitchell<br/>6215 ft','Frying Pan Tower<br/>5320 ft', 'Mt. Jefferson<br/>4608 ft', 'Bearwallow Mtn<br/>4219 ft', 'Laurel Springs<br/>3009 ft', 'Asheville<br/>2222 ft']
	let index
	for (q in missingStations){
		if(missingStations[q] == 'MITC'){
			index = 0
			stationCatergories.splice(index,1)
		}else if(missingStations[q] == 'FRYI'){
			index = 1
			stationCatergories.splice(index,1)
		}else if(missingStations[q] == 'JEFF'){
			index = 2
			stationCategories.splice(index,1)
		}else if(missingStations[q] == 'BEAR'){
			index = 3
			stationCategories.splice(index,1)
		}else if(missingStations[q] == 'LAUR'){
			index = 4
			stationCategories.splice(index,1)
		}else if(missingStations[q] == 'UNCA'){
			index = 5
			stationCategories.splice(index,1)
		}
		
	}
	let MITC = (dataList[0]-32)*(5/9)
	let FRYI = (dataList[1]-32)*(5/9)
	let JEFF = (dataList[2]-32)*(5/9)
	let BEAR = (dataList[3]-32)*(5/9)
	let LAUR = (dataList[4]-32)*(5/9)
	let UNCA = (dataList[5]-32)*(5/9)
	let LLRC = ((LAUR-UNCA)+(BEAR-LAUR)+(JEFF-BEAR)+(FRYI-JEFF)+(MITC-FRYI))/1.22 //Unhappy with this calculation
	//document.getElementById('LLR').innerHTML = `Low-Level Lapse Rate: ${LLRC.toFixed(1)}°C/km`
	let yMin = Math.min.apply(Math,dataList) - 3
	let yMax = Math.max.apply(Math,dataList) + 3
	Highcharts.chart('container', {
	    chart: {
	        type: 'bar',
	    },
	    title: {
	        text: `Vertical ${fullName} Profile: Western NC`
	    },
	    subtitle: {
	        text: `Valid: ${startTime}<br />Source: <a href="https://products.climate.ncsu.edu/">NCSCO</a>`
	    },
	    xAxis: {
	        categories: stationCategories,
	        title: {
	            text: null
	        },
	        labels: {
	        	align: 'center'
	        }
	    },
	    yAxis: {
	        min: yMin,
	        max: yMax,
	        title: {
	            text: 'Temperature (°F)',
	            align: 'high'
	        },
	        labels: {
	            overflow: 'justify'
	        }
	    },
	    tooltip: {
			formatter: function() {
				console.log(this)
				return 'Temperature: '+this.y+units(variable)
			}
	    },
	    plotOptions: {
	        bar: {
	            dataLabels: {
	                enabled: true
	            },
	            zones: colorZoneDecider(variable)
	        }
	    },
	    legend: {
	    	enabled: false
	    },
	    credits: {
	        enabled: false
	    },
	    series: [{
	        name: 'Temperature',
	        data: dataList,
	        timeStamp: timeList
	    }]
	});
	
}
