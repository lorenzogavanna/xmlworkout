let str;
let str1 = `\n` + '<row ';

function startIntervals(){
	log(document.getElementById("startInterval").textContent);
	if(document.getElementById("startInterval").textContent=="Start Interval"){
		document.getElementById("startInterval").style.animation = "blink 2s infinite";
		document.getElementById("startInterval").style.backgroundColor  = "#F67280";
		document.getElementById("startInterval").textContent="Close Interval";
		document.getElementById('result').innerText += `\n` + '<repeat times="'+ document.getElementById("repeats").value +'">';
	} else {
		document.getElementById("startInterval").style.animation = "none";
		document.getElementById("startInterval").textContent="Start Interval";
		document.getElementById("startInterval").style.backgroundColor  = "";				
		document.getElementById('result').innerText += `\n` + '</repeat>';
	}
}

function downloadXML() {
	if(document.getElementById("startInterval").textContent!="Start Interval"){
		alert('Close the repeat before the download!');
	} else {
		const str0 = '<?xml version="1.0" encoding="UTF-8"?>' + `\n` + '<rows>'+ `\n`;
		const xmlContent = str0 + document.getElementById('result').innerText + `\n` + `\n`+'</rows>';
		const blob = new Blob([xmlContent], { type: 'application/xml' });
		const a = document.createElement('a');
		a.href = URL.createObjectURL(blob);
		if (document.getElementById("title").value){
			a.download = document.getElementById("title").value +'.xml';
		} else {
			a.download = 'workout.xml'; // Default file name	
		}
		a.click();
		URL.revokeObjectURL(a.href);
	}
}

function resetRow(){
	str="";
	document.getElementById('result').innerText="";
}

function tgHide(idTg1,idTg2,idTg3){
	let myEl1 = document.getElementById(idTg1);
  let myEl2 = document.getElementById(idTg2);
  let myEl3 = document.getElementById(idTg3);
	if(myEl1.style.visibility=="hidden"){
		myEl1.style.visibility="visible";
	} else {
		myEl1.style.visibility="hidden";
	}
  if(myEl2.style.visibility=="hidden"){
		myEl2.style.visibility="visible";
	} else {
		myEl2.style.visibility="hidden";
	}
    if(myEl3.style.visibility=="hidden"){
		myEl3.style.visibility="visible";
	} else {
		myEl3.style.visibility="hidden";
	}
	
}
function changeType(idShow,idHide){
	let myElShow = document.getElementById(idShow);
	let myElHide = document.getElementById(idHide);
	if(myElShow.style.display=="none"){
		myElShow.style.display="";
		myElHide.style.display="none";
	}
}

function populateSelect(id, max) { 
	const select = document.getElementById(id); 
	for (let i = 0; i <= max; i++) { 
		const option = document.createElement('option'); 
		option.value = i; 
		option.textContent = i.toString().padStart(2, '0'); 
		select.appendChild(option); 
	}
}
populateSelect('hours', 8);    // Hours: 0-8
populateSelect('minutes', 59);  // Minutes: 0-59
populateSelect('seconds', 59); // Seconds: 0-59
populateSelect('distance', 100); // Distance km: 0-100
	
function addRow() {
	//str += document.getElementById('result').innerText;
	if(document.getElementById("durationType").checked){ //duration type
		const hours = document.getElementById('hours').value;
		const minutes = document.getElementById('minutes').value;
		const seconds = document.getElementById('seconds').value;

		if (hours && minutes && seconds) {

		str = str1 + 'duration="' + `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`+'"';
		} else {
			alert('Please select hours, minutes, and seconds.');
		}
	} else { //distance type
		const distance = document.getElementById('distance').value;
		str="";
		str = str1 + 'distance="' + distance +'"';
	}
	if (document.getElementById('ckPid').checked){
		str += ' zonehr="' + document.getElementById('pid').value + '"';
	} 
	if (document.getElementById('ckSpeed').checked){
		str += ' speed="' + document.getElementById('speed').value + '"';
	} 
	if (document.getElementById('ckMaxSpeed').checked){
		str += ' maxspeed="' + document.getElementById('maxspeed').value + '"';
	} 
	if (document.getElementById('ckInclination').checked){
		str += ' inclination="' + document.getElementById('inclination').value + '"';
	}
	if (document.getElementById('ckFanspeed').checked){
		str += ' fanspeed="' + document.getElementById('fanspeed').value + '"';
	}
	if (document.getElementById('ckCadence').checked){
		str += ' cadence="' + document.getElementById('cadence').value + '"';
	}
	if (document.getElementById('ckResistance').checked){
		str += ' resistance="' + document.getElementById('resistance').value + '"';
	}
	if (document.getElementById('ckPelotonResistance').checked){
		str += ' requested_peloton_resistance="' + document.getElementById('requested_peloton_resistance').value + '"';
	} 
	if (document.getElementById('ckRamp').checked){
		if(document.getElementById('powerzoneramp').checked){
    	str += ' powerzonefrom="' + document.getElementById('rampfrom').value + '"' + ' powerzoneto="' + document.getElementById('rampto').value + '"';
    } else if(document.getElementById('speedramp').checked){ 
      str += ' speedfrom="' + document.getElementById('rampfrom').value + '"' + ' speedto="' + document.getElementById('rampto').value + '"';
    }
    
	}
  
	if (document.getElementById('ckPowerzone').checked){
		document.getElementById('powerzone').value;

		const powerZones = {
			1: [0.40, 0.59],
			2: [0.60, 0.75],
			3: [0.76, 0.89],
			4: [0.90, 1.04],
			5: [1.05, 1.18],
			6: [1.19, 1.30]
		};
		const lastZone=document.getElementById("powerzone").value;
		const pzone=randomInRange(powerZones[lastZone]);
		str += ' powerzone="' + pzone + '"';
	}
	str += ' forcespeed="1"/>';		
	document.getElementById('result').innerText += str;
}
function randomInRange([min, max]) {
	return (Math.random() * (max - min) + min).toFixed(2);
}
                                         
function ckMax(id,max){
	if(document.getElementById(id).value>max){		
		document.getElementById(id).value=max;
	}
}

function undoLastRow(){
	let currentText = document.getElementById('result').innerText;
	let lines = currentText.split('\n');
	let lastLine = lines[lines.length - 1];
	lines.pop();
	let updatedText = lines.join('\n');
	document.getElementById('result').innerText = updatedText;	
	if(lastLine=="</repeat>"){		
		document.getElementById("startInterval").style.animation = "blink 2s infinite";
		document.getElementById("startInterval").style.backgroundColor  = "#F67280";
		document.getElementById("startInterval").textContent="Close Interval";	
	} else {
		document.getElementById("startInterval").style.animation = "none";
		document.getElementById("startInterval").style.backgroundColor  = "";
		document.getElementById("startInterval").textContent="Start Interval";
	}
}

function log(a,b,c,d,e,f,g,h,i) { //for 9 log prints
	console.log(...[a,b,c,d,e,f,g,h,i].filter(value => value !== undefined));
}
