// Set IMU on off
var imuSW = false;

var resolution = 100;

var rangeA = 2;
var rangeG = 250;
var rangeO = 2;
var rangeEMG = 150;

var graphA;
var graphO;
var graphG;
var emgGraphs;

Myo.on('connected', function(){
	console.log('EMG graphs: Myo is connected');
	this.streamEMG(true);

	setInterval(function(){
		//console.log(rawData);
		updateGraphEMG(rawData);
	}, 10);
});


//Myo.connect('com.myojs.emgGraphs');
//This tells Myo.js to create the web sockets needed to communnicate with Myo Connect
//Myo.connect('com.myojs.deviceGraphs');
Myo.connect('com.myojs.imu_emg_Graphs');

if (imuSW){
    Myo.on('imu', function(quant){
        updateGraphIMU(quant);
    })
}

var rawData = [0,0,0,0,0,0,0,0];


var arrayOfZeros = Array.apply(null, Array(resolution)).map(Number.prototype.valueOf,0);

var graphDataA = {
	w : arrayOfZeros.slice(0),
	x : arrayOfZeros.slice(0),
	y : arrayOfZeros.slice(0),
	z : arrayOfZeros.slice(0)
}

var graphDataO = {
	w : arrayOfZeros.slice(0),
	x : arrayOfZeros.slice(0),
	y : arrayOfZeros.slice(0),
	z : arrayOfZeros.slice(0)
}

var graphDataG = {
	w : arrayOfZeros.slice(0),
	x : arrayOfZeros.slice(0),
	y : arrayOfZeros.slice(0),
	z : arrayOfZeros.slice(0)
}

var graphDataEMG= [arrayOfZeros, arrayOfZeros,	arrayOfZeros, arrayOfZeros, arrayOfZeros, arrayOfZeros, arrayOfZeros, arrayOfZeros]


var formatFlotDataA = function(){
	return Object.keys(graphDataA).map(function(axis){
		return {
			
			label : axis + ' axis',
			data : graphDataA[axis].map(function(val, index){
				return [index, val]
			})
		}
	});
}

var formatFlotDataG = function(){
	return Object.keys(graphDataG).map(function(axis){
		return {
			
			label : axis + ' axis',
			data : graphDataG[axis].map(function(val, index){
				return [index, val]
			})
		}
	});
}

var formatFlotDataO = function(){
	return Object.keys(graphDataO).map(function(axis){
		return {
			
			label : axis + ' axis',
			data : graphDataO[axis].map(function(val, index){
				return [index, val]
			})
		}
	});
}

var formatFlotDataEMG = function(data){
		return [data.map(function(val, index){
				return [index, val]
			})]
}



$(document).ready(function(){
	
	
	graphA = $('.accelerationGraph').plot(formatFlotDataA(), {
		colors: [ '#04fbec', '#ebf1be', '#c14b2a', '#8aceb5'],
		xaxis: {
			show: true,
			min : 0,
			max : resolution
		},
		yaxis : {
			min : -rangeA,
			max : rangeA,
		},
		grid : {
			borderColor : "#427F78",
			borderWidth : 1
		}
	}).data("plot");
	
	
	
	graphG = $('.gyroscopeGraph').plot(formatFlotDataG(), {
		colors: [ '#04fbec', '#ebf1be', '#c14b2a', '#8aceb5'],
		xaxis: {
			show: true,
			min : 0,
			max : resolution
		},
		yaxis : {
			min : -rangeG,
			max : rangeG,
		},
		grid : {
			borderColor : "#427F78",
			borderWidth : 1
		}
	}).data("plot");

	
	graphO = $('.orientationGraph').plot(formatFlotDataO(), {
		colors: [ '#04fbec', '#ebf1be', '#c14b2a', '#8aceb5'],
		xaxis: {
			show: true,
			min : 0,
			max : resolution,
		},
		yaxis : {
			min : -rangeO,
			max : rangeO,
		},
		grid : {
			borderColor : "#427F78",
			borderWidth : 1
		}
	}).data("plot");
	
	emgGraphs = graphDataEMG.map(function(podData, podIndex){
		return $('#pod' + podIndex).plot(formatFlotDataEMG(podData), {
			colors: ['#000'],
			xaxis: {
				show: true,
				min : 0,
				max : resolution,
                tickLength:0,
			},
			yaxis : {
				min : -rangeEMG,
				max : rangeEMG,
                tickLength:0, 
			},
			grid : {
				borderColor : "#fff",
				borderWidth : 0
			}
		}).data("plot");
	});
	


});





var updateGraphIMU = function(imuData){
	
	
	// gyro
	gyroscopeData = imuData['gyroscope'];
	Object.keys(graphDataG).map(function(axis){
		graphDataG[axis] = graphDataG[axis].slice(1);
		graphDataG[axis].push(gyroscopeData[axis]);
	});
	
	graphG.setData(formatFlotDataG());
	graphG.draw();

	// acc
	accelerometerData = imuData['accelerometer'];
	Object.keys(accelerometerData).map(function(axis){
		graphDataA[axis] = graphDataA[axis].slice(1);
		graphDataA[axis].push(accelerometerData[axis]);
	});
	
	graphA.setData(formatFlotDataA());
	graphA.draw();

	// orie
	orientationData = imuData['orientation'];
	Object.keys(orientationData).map(function(axis){
		graphDataO[axis] = graphDataO[axis].slice(1);
		graphDataO[axis].push(orientationData[axis]);
	});
	
	graphO.setData(formatFlotDataO());
	graphO.draw();
}


var updateGraphEMG = function(emgData){

	graphDataEMG.map(function(data, index){
		graphDataEMG[index] = graphDataEMG[index].slice(1);
		graphDataEMG[index].push(emgData[index]);

		emgGraphs[index].setData(formatFlotDataEMG(graphDataEMG[index]));
		emgGraphs[index].draw();

	})
}