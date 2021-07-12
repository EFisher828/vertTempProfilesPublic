const testDisplay = () => {
	document.getElementById( 'archiveInputDiv' ).style.display = 'block';
}

const addHour = (startTime) => {
	let hour = eval(startTime.substring(11,13))
	let firstHalf = startTime.substring(0,11)
	let secondHalf = startTime.substring(13,16)
	console.log(firstHalf)
	console.log(secondHalf)
	let plusHour = hour - 1
	let plusHourStr = plusHour.toString()
	let endHour
	let fullEndHour
	if (plusHourStr.length == 1){
		endHour = '0'+plusHourStr
		fullEndHour = firstHalf + endHour + secondHalf
		return fullEndHour
	}else {
		endHour = plusHourStr
		fullEndHour = firstHalf + endHour + secondHalf
		return fullEndHour
	}
	
}
