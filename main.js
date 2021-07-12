const whichChart =() => {
	//Decides which chart function to use based on chartMode input (either Current and Archive)
	let decidingInfo =  document.querySelector('input[name="chartMode"]:checked').value
	if (decidingInfo == 'Current'){
		chartBuilder()
	}else if (decidingInfo == 'Archive'){
		chartBuilderArchive()
	}
}

const chartBuilder = () => {
	//Grab current time
	const startTime = new Date().toLocaleString()

	//Grab essential info and build HTTPRequest to return station data
	document.getElementById( 'archiveInputDiv' ).style.display = 'none';
	let name = document.getElementById('variableForm').value
	let variable
	let fullName
	if(name == 'Temperature'){
		variable = 'airtemp2m'
		fullName = 'Temperature'
	}else if(name == 'Humidity'){
		variable = 'rh2m'
		fullName = 'Relative Humidity'
	}else if(name == 'Dew'){
		variable = 'dewtemp2m'
		fullName = 'Dew Point'
	}else if(name == 'WB'){
		variable = 'wetbulbtemp2m'
		fullName = 'Wet Bulb Temperature'
	}else if(name == 'Soil'){
		variable = 'soiltemp10cm'
		fullName = 'Soil Temperature'
	}
	
	//let url = `https://api.climate.ncsu.edu/data?loc=MITC,FRYI,JEFF,BEAR,LAUR,UNCA&var=${variable}&start=2020-01-21%2005:00&end=2020-01-21%2005:59&obtype=O&output=json&attr=location,datetime,var,value,value_accum,unit,score,nettype,paramtype,obtype,obnum,obtime&hash=8de315acb7cf795cf0e5a4b9d351caa2efd2a922`
	let url = `https://api.climate.ncsu.edu/data?loc=MITC,FRYI,JEFF,BEAR,LAUR,UNCA&var=${variable}&start=-60%20minutes&end=now&obtype=O&output=json&attr=location,datetime,var,value,value_accum,unit,score,nettype,paramtype,obtype,obnum,obtime&hash=8de315acb7cf795cf0e5a4b9d351caa2efd2a922`
	console.log(url)
				
	const xhr = new XMLHttpRequest();
											
	xhr.responseType = 'json';
	
	xhr.onreadystatechange = function() {
		if(xhr.readyState === XMLHttpRequest.DONE){
			//Station Data Objects
			console.log(xhr.response.data.MITC)
			const stationList = ['MITC','FRYI','JEFF','BEAR','LAUR','UNCA']
			let dataList = []
			let timeList = []
			let missingStations = []
			let station
			for(i in stationList){
				station = stationList[i]
				const stationObj = xhr.response.data[station]
				const stationLength = Object.keys(stationObj).length
				let stationCount = 2
				let stationTemp
				let stationObTime
				if (stationLength == 1){
					for(let key in stationObj){
						const stationTempHold = stationObj[key][variable].value
						if (stationTempHold == 'NA' || stationTempHold == 'QCF' || stationTempHold == 'MV'){
							console.log('NA')
							stationTemp = null
						}else {
							stationTemp = stationTempHold
						}
					}
				}else {
					for (let key in stationObj){
						if (stationCount == stationLength-1){
							const stationTempHold = stationObj[key][variable].value
							stationObTime = stationObj[key][variable].obtime
							console.log(stationObTime)
							if (stationTempHold == 'NA' || stationTempHold == 'QCF' || stationTempHold == 'MV'){
								console.log('NA')
								stationTemp = null
							}else {
								stationTemp = stationTempHold
							}
						}
						stationCount = stationCount + 1
					}
				}
				if(stationTemp == null){
					missingStations.push(stationList[i])
				}else{
					dataList.push(eval(stationTemp))
					timeList.push(stationObTime)
				}
				
			}
			console.log(missingStations)
			buildBarChart(dataList,timeList,variable,fullName,missingStations,startTime)
			}
		}					
	xhr.open("GET",url)
	xhr.send()
}

const chartBuilderArchive = () => {

	let name = document.getElementById('variableForm').value
	let startTime = document.querySelector('input[name="textInput"]').value
	let endTime = addHour(startTime)
	let variable
	let fullName
	if(name == 'Temperature'){
		variable = 'airtemp2m'
		fullName = 'Temperature'
	}else if(name == 'Humidity'){
		variable = 'rh2m'
		fullName = 'Relative Humidity'
	}else if(name == 'Dew'){
		variable = 'dewtemp2m'
		fullName = 'Dew Point'
	}else if(name == 'WB'){
		variable = 'wetbulbtemp2m'
		fullName = 'Wet Bulb Temperature'
	}else if(name == 'Soil'){
		variable = 'soiltemp10cm'
		fullName = 'Soil Temperature'
	}else if(name == 'Chill'){
		variable = 'windchill'
		fullName = 'Wind Chill'
	}
	
	let url = `https://api.climate.ncsu.edu/data?loc=MITC,FRYI,JEFF,BEAR,LAUR,UNCA&var=${variable}&start=${endTime}&end=${startTime}&obtype=O&output=json&attr=location,datetime,var,value,value_accum,unit,score,nettype,paramtype,obtype,obnum,obtime&hash=8de315acb7cf795cf0e5a4b9d351caa2efd2a922`
	//let url = `https://api.climate.ncsu.edu/data?loc=MITC,FRYI,JEFF,BEAR,LAUR,UNCA&var=${variable}&start=-60%20minutes&end=now&obtype=O&output=json&attr=location,datetime,var,value,value_accum,unit,score,nettype,paramtype,obtype,obnum,obtime&hash=8de315acb7cf795cf0e5a4b9d351caa2efd2a922`
	console.log(url)
				
	const xhr = new XMLHttpRequest();
											
	xhr.responseType = 'json';
	
	xhr.onreadystatechange = function() {
		if(xhr.readyState === XMLHttpRequest.DONE){
			//Station Data Objects
			const stationList = ['MITC','FRYI','JEFF','BEAR','LAUR','UNCA']
			let dataList = []
			let timeList = []
			let missingStations = []
			let station
			for(i in stationList){
				try {
					station = stationList[i]
					const stationObj = xhr.response.data[station]
					const stationLength = Object.keys(stationObj).length
					let stationCount = 2
					let stationTemp
					let stationObTime
					if (stationLength == 1){
						for(let key in stationObj){
							const stationTempHold = stationObj[key][variable].value
							if (stationTempHold == 'NA' || stationTempHold == 'QCF' || stationTempHold == 'MV'){
								stationTemp = null
							}else {
								stationTemp = stationTempHold
							}
						}
					}else {
						for (let key in stationObj){
							if (stationCount == stationLength-1){
								const stationTempHold = stationObj[key][variable].value
								stationObTime = stationObj[key][variable].obtime
								if (stationTempHold == 'NA' || stationTempHold == 'QCF' || stationTempHold == 'MV'){
									stationTemp = null
								}else {
									stationTemp = stationTempHold
								}
							}
							stationCount = stationCount + 1
						}
					}
					if(stationTemp == null){
						missingStations.push(stationList[i])
					}else{
						dataList.push(eval(stationTemp))
						timeList.push(stationObTime)
					}
				}
			catch(err) {}
				
			}
			console.log(missingStations)
			buildBarChart(dataList,timeList,variable,fullName,missingStations,startTime)
			}
		}					
	xhr.open("GET",url)
	xhr.send()
	
	return false
}

const chartBuilderOnLoad = () => {
	//Grab current time
	const startTime = new Date().toLocaleString()
	
	//Grab essential info and build HTTPRequest to return station data
	document.getElementById( 'archiveInputDiv' ).style.display = 'none';
	let name = "Temperature"
	let variable
	let fullName
	if(name == 'Temperature'){
		variable = 'airtemp2m'
		fullName = 'Temperature'
	}else if(name == 'Humidity'){
		variable = 'rh2m'
		fullName = 'Relative Humidity'
	}else if(name == 'Dew'){
		variable = 'dewtemp2m'
		fullName = 'Dew Point'
	}else if(name == 'WB'){
		variable = 'wetbulbtemp2m'
		fullName = 'Wet Bulb Temperature'
	}else if(name == 'Soil'){
		variable = 'soiltemp10cm'
		fullName = 'Soil Temperature'
	}
	
	//let url = `https://api.climate.ncsu.edu/data?loc=MITC,FRYI,JEFF,BEAR,LAUR,UNCA&var=${variable}&start=2020-01-21%2005:00&end=2020-01-21%2005:59&obtype=O&output=json&attr=location,datetime,var,value,value_accum,unit,score,nettype,paramtype,obtype,obnum,obtime&hash=8de315acb7cf795cf0e5a4b9d351caa2efd2a922`
	let url = `https://api.climate.ncsu.edu/data?loc=MITC,FRYI,JEFF,BEAR,LAUR,UNCA&var=${variable}&start=-60%20minutes&end=now&obtype=O&output=json&attr=location,datetime,var,value,value_accum,unit,score,nettype,paramtype,obtype,obnum,obtime&hash=8de315acb7cf795cf0e5a4b9d351caa2efd2a922`
	console.log(url)
				
	const xhr = new XMLHttpRequest();
											
	xhr.responseType = 'json';
	
	xhr.onreadystatechange = function() {
		if(xhr.readyState === XMLHttpRequest.DONE){
			//Station Data Objects
			console.log(xhr.response.data.MITC)
			const stationList = ['MITC','FRYI','JEFF','BEAR','LAUR','UNCA']
			let dataList = []
			let timeList = []
			let missingStations = []
			let station
			for(i in stationList){
				station = stationList[i]
				const stationObj = xhr.response.data[station]
				const stationLength = Object.keys(stationObj).length
				let stationCount = 2
				let stationTemp
				let stationObTime
				if (stationLength == 1){
					for(let key in stationObj){
						const stationTempHold = stationObj[key][variable].value
						if (stationTempHold == 'NA' || stationTempHold == 'QCF' || stationTempHold == 'MV'){
							console.log('NA')
							stationTemp = null
						}else {
							stationTemp = stationTempHold
						}
					}
				}else {
					for (let key in stationObj){
						if (stationCount == stationLength-1){
							const stationTempHold = stationObj[key][variable].value
							stationObTime = stationObj[key][variable].obtime
							console.log(stationObTime)
							if (stationTempHold == 'NA' || stationTempHold == 'QCF' || stationTempHold == 'MV'){
								console.log('NA')
								stationTemp = null
							}else {
								stationTemp = stationTempHold
							}
						}
						stationCount = stationCount + 1
					}
				}
				if(stationTemp == null){
					missingStations.push(stationList[i])
				}else{
					dataList.push(eval(stationTemp))
					timeList.push(stationObTime)
				}
				
			}
			console.log(missingStations)
			buildBarChart(dataList,timeList,variable,fullName,missingStations,startTime)
			}
		}					
	xhr.open("GET",url)
	xhr.send()
}

chartBuilderOnLoad()
