function customAxisHelper(pos, axlength){
    var gO = new THREE.SphereGeometry( 5, 32, 32 );
    var mO = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    var sphereO = new THREE.Mesh( gO, mO );

    var gX = new THREE.BoxGeometry( axlength.x*10, 5, 5, 32 );
    var mX = new THREE.MeshBasicMaterial( {color: 0xff0000} );
    var boxX = new THREE.Mesh( gX, mX);
    sphereO.add( boxX );

    var gY = new THREE.BoxGeometry( 5, axlength.y*10, 5, 32 );
    var mY = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    var boxY = new THREE.Mesh( gY, mY);
    sphereO.add( boxY );

    var gZ = new THREE.BoxGeometry( 5, 5, axlength.z*10, 32 );
    var mZ = new THREE.MeshBasicMaterial( {color: 0x0000ff} );
    var boxZ = new THREE.Mesh( gZ, mZ);
    sphereO.add( boxZ );

    sphereO.position.copy(pos);
    return sphereO;
}


function addBoxes(scene){

    for ( i = 0; i < 5; i++ ) {
        
        var size = Math.random() * 10 + 10;
        
        var box = new Physijs.BoxMesh(
            new THREE.BoxGeometry( size, size, size ),
            box_material
        );
        box.castShadow = box.receiveShadow = true;
        
        box.position.set(
            Math.random() * 125 +500,
            200,
            Math.random() * 25 + 500
        );
        
        scene.add( box );
    }
}

function makeCrossBox(){

    var crossBox = new THREE.BoxGeometry(200,5,200);
    //crossBox.rotateX(-15*2*Math.PI/360);
    //crossBox.rotateY(-10*2*Math.PI/360);
    crossBox.translate(520, 767, 1000);
    var crossBoxMesh = new THREE.Mesh(crossBox, planematerial);
    scene.add(crossBoxMesh);

    return new ThreeBSP(crossBox);
}

function getObjSize(object){

    var min = (new THREE.Box3().setFromObject(object)).min;
    var max = (new THREE.Box3().setFromObject(object)).max;

    return new THREE.Vector3(max.x - min.x, max.y - min.y, max.z - min.z);

}

function representWithSphere(object){
}

function getObjByNameB(arrObjs, name){

    for (var io = 0 ; io < arrObjs.length; io++)
        if (arrObjs[io].name == name)
            return arrObjs[io];
}

function getObjByName(arrObjs, name){

    for (var io = 0 ; io < arrObjs.length; io++) {

        console.log(arrObjs[io]);
        //console.log(getObjLabel(arrObjs[io]) == name);

        if (getObjLabel(arrObjs[io]) == name) {

            //console.log(arrObjs[io]);

            return arrObjs[io];
        }
    }
    
}

function getObjLabel(object){
    
    // Add a Label (Sprite)
    var label = object.children[0].name;

    var label = label.substring(label.lastIndexOf("_")+1);

    if (label.substring(0,4) == "Left")
        label = label.substring(5);
    else
        label = label.substring(0);

    if (label.length > 15){
        labelsplit = label.split(' ');

        if (labelsplit.length > 1){
            label = "";
            for (var i=0; i < labelsplit.length; i++)
                if (labelsplit[i].length > 2)
                    label += labelsplit[i].substring(0,3)+". ";
        }
    }
    label = label.trim();

    // Find very abbreviated muscle name
    var shnames = StorageData.getMuscleShortNames();
    var i = shnames[0].indexOf(label);

    var label_out = i ? shnames[1][i] : label;

    return label_out;
}


function writeTextToFile(filename, str){
    var blob = new Blob([str], {type: "text/plain;charset=utf-8"});
    saveAs(blob, filename);
}


function shw(myVariable){
    console.log(myVariable);
}
    
function shwMat(M){
    
    var nRows = M.length;

    for (var i = 0; i<nRows ; i++)
            console.log(M[i]);
    
    
}


function normalizeRows(A, l){
    var Anorm = [];
    var rowsSum = [];
    
    for (var i=0; i<l; i++){
        Anorm.push([]);
        rowsSum.push(math.sum(A[i]));
    }

    
    for (var i=0; i<l; i++)    
        for (var j=0; j<A[i].length; j++)    
            Anorm[i].push( Math.round(A[i][j]/rowsSum[i]*100)/100);
 
    return Anorm;
}


//function transpose(A){
//    var Atranspose = [];
//
//    var r = A.length; // i        15
//    var c = A[0].length; // j      8
//
//    for (var j =0; j < c; j++)    // 8
//        Atranspose.push([]);
//
//    for (var j=0; j<c; j++)       // 8
//        for (var i=0; i<r; i++)   // 15
//            Atranspose[j].push(A[i][j]);
//
//    return Atranspose;
//}


//function transposeB(Atranspose, l){
//    var A = [];
//    for (var i=0; i<l; i++)
//        A.push([]);
//
//    for (var i=0; i<l; i++)
//        for (var j=0; j<l; j++)
//            A[i].push(Atranspose[j][i]);
//
//    return A;
//}

function unicodeSubscripts(i){
    
    switch (i){
        case 0:
            return '\u2080';
            break;
        case 1:
            return '\u2081';
            break;
        case 2:
            return '\u2082';
            break;
        case 3:
            return '\u2083';
            break;
        case 4:
            return '\u2084';
            break;
        case 5:
            return '\u2085';
            break;
        case 6:
            return '\u2086';
            break;
        case 7:
            return '\u2087';
            break;
        case 8:
            return '\u2088';
            break;
        case 9:
            return '\u2089';
            break;
        default:
            return 'out of range char';
    }
        
            
    
}

//------------------- Calculate volume of mesh -----------------------------------------------
function calculateVolume(mygeometry){
    var volumeTotal = 0;
    
    //console.log(mesh);
    
    for(var i = 0; i < mygeometry.faces.length; i++){
        var Pi = mygeometry.faces[i].a;
        var Qi = mygeometry.faces[i].b;
        var Ri = mygeometry.faces[i].c;

        var P = new THREE.Vector3(mygeometry.vertices[Pi].x, mygeometry.vertices[Pi].y, mygeometry.vertices[Pi].z);
        var Q = new THREE.Vector3(mygeometry.vertices[Qi].x, mygeometry.vertices[Qi].y, mygeometry.vertices[Qi].z);
        var R = new THREE.Vector3(mygeometry.vertices[Ri].x, mygeometry.vertices[Ri].y, mygeometry.vertices[Ri].z);
        volumeTotal += this.signedVolumeOfTriangle(P, Q, R);
    }
    
    
    //var vols = from t in mesh.Triangles select SignedVolumeOfTriangle(t.P1, t.P2, t.P3);
    
    volumeTotal = Math.round(Math.abs(volumeTotal));
    
    return volumeTotal;
}

function signedVolumeOfTriangle(p1, p2, p3) {
    var v321 = p3.x*p2.y*p1.z;
    var v231 = p2.x*p3.y*p1.z;
    var v312 = p3.x*p1.y*p2.z;
    var v132 = p1.x*p3.y*p2.z;
    var v213 = p2.x*p1.y*p3.z;
    var v123 = p1.x*p2.y*p3.z;
    return (-v321 + v231 + v312 - v132 - v213 + v123)/6;
}


//---------------------- Save text to file ---------------------------------------------------
function saveTextAsFile( textToWrite )
{
	
	var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
	var fileNameToSaveAs = "temp.obj";

	var downloadLink = document.createElement("a");
	downloadLink.download = fileNameToSaveAs;
	downloadLink.innerHTML = "Download File";
	if (window.webkitURL != null)
	{
		// Chrome allows the link to be clicked
		// without actually adding it to the DOM.
		downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
	}
	else
	{
		// Firefox requires the link to be added to the DOM
		// before it can be clicked.
		downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
		downloadLink.onclick = destroyClickedElement;
		downloadLink.style.display = "none";
		document.body.appendChild(downloadLink);
	}

	downloadLink.click();
}



function makeTextSpriteSingleLine( messageA, parameters )
{
	if ( parameters === undefined ) parameters = {};
	
	var fontface = parameters.hasOwnProperty("fontface") ? 
		parameters["fontface"] : "Arial";
	
	var fontsize = parameters.hasOwnProperty("fontsize") ? 
		parameters["fontsize"] : 14;
	
	var borderThickness = parameters.hasOwnProperty("borderThickness") ? 
		parameters["borderThickness"] : 1;
	
	var borderColor = parameters.hasOwnProperty("borderColor") ?
		parameters["borderColor"] : { r:0, g:0, b:0, a:1.0 };
	
	var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?
		parameters["backgroundColor"] : { r:255, g:255, b:255, a:0.0 };
	
	var canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 32;
        
	var context = canvas.getContext('2d');
	context.font = "Bold " + fontsize + "px " + fontface;
    
	// get size data (height depends only on font size)
	var metrics = context.measureText( messageA );
	var textWidth = metrics.width;

    if (textWidth>=128)
        canvas.width = 256;


    // if (textWidth<=64)
    //     textWidth = 64;
    //
    // if (textWidth<=32)
    //     textWidth = metrics.width;


	// background color
	context.fillStyle   = "rgba(" + backgroundColor.r + "," + backgroundColor.g + ","
								  + backgroundColor.b + "," + backgroundColor.a + ")";
	// border color
	context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + ","
								  + borderColor.b + "," + borderColor.a + ")";

	context.lineWidth = borderThickness;


	var w = textWidth + borderThickness;
    var h  =  (fontsize * 1.4 + borderThickness)*1; // 1.4 is extra height factor for text below baseline (sub-script).

	roundRect(context, borderThickness/2 + w, // x
                       borderThickness/2 + h, //y
                       w, h, 6);
	// text color
	context.fillStyle = "rgba(0, 0, 0, 1.0)";

	context.fillText( messageA, borderThickness + w, fontsize + borderThickness + h);

	// canvas contents will be used for a texture
	var texture = new THREE.Texture(canvas);
	texture.needsUpdate = true;

	var spriteMaterial = new THREE.SpriteMaterial( { map: texture } );

	var sprite = new THREE.Sprite( spriteMaterial );
	
    if (textWidth>=128)
        sprite.scale.set(40, 5, 0.0);
    else if (textWidth <= 64)
        sprite.scale.set(20, 5, 0.0);
    else    
        sprite.scale.set(20, 5, 0.0);

	return sprite;	
}


function makeTextSprite( messageA, messageB, parameters )
{
	if ( parameters === undefined ) parameters = {};
	
	var fontface = parameters.hasOwnProperty("fontface") ? 
		parameters["fontface"] : "Arial";
	
	var fontsize = parameters.hasOwnProperty("fontsize") ? 
		parameters["fontsize"] : 14;
	
	var borderThickness = parameters.hasOwnProperty("borderThickness") ? 
		parameters["borderThickness"] : 1;
	
	var borderColor = parameters.hasOwnProperty("borderColor") ?
		parameters["borderColor"] : { r:0, g:0, b:0, a:1.0 };
	
	var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?
		parameters["backgroundColor"] : { r:255, g:255, b:255, a:0.0 };
	
	var canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 32;
        
	var context = canvas.getContext('2d');
	context.font = "Bold " + fontsize + "px " + fontface;
    
	// get size data (height depends only on font size)
	var metrics = context.measureText( messageA );
	var textWidth = metrics.width;
    


    if (textWidth>=128)
        canvas.width = 256;
    
    if (textWidth<=64)
        textWidth = 64;
    
    
	// background color
	context.fillStyle   = "rgba(" + backgroundColor.r + "," + backgroundColor.g + ","
								  + backgroundColor.b + "," + backgroundColor.a + ")";
	// border color
	context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + ","
								  + borderColor.b + "," + borderColor.a + ")";

	context.lineWidth = borderThickness;
	roundRect(context, borderThickness/2, borderThickness/2, textWidth + borderThickness, (fontsize * 1.4 + borderThickness)*2.1, 6);
	// 1.4 is extra height factor for text below baseline: g,j,p,q.
	
	// text color
	context.fillStyle = "rgba(0, 0, 0, 1.0)";

	context.fillText( messageA, borderThickness, fontsize + borderThickness);
    
    
    context.fillText( "  " + messageB, borderThickness, 2*fontsize + 4*borderThickness);
	
	// canvas contents will be used for a texture
	var texture = new THREE.Texture(canvas) 
	texture.needsUpdate = true;

	var spriteMaterial = new THREE.SpriteMaterial( { map: texture } );
    
    
	var sprite = new THREE.Sprite( spriteMaterial );
	
    if (textWidth>=128)
        sprite.scale.set(40, 5, 0.0);
    else if (textWidth <= 64)
        sprite.scale.set(20, 5, 0.0);
    else    
        sprite.scale.set(20, 5, 0.0);
    
    
    
    
	return sprite;	
}


// function for drawing rounded rectangles
function roundRect(ctx, x, y, w, h, r) 
{
    ctx.beginPath();
    ctx.moveTo(x+r, y);
    ctx.lineTo(x+w-r, y);
    ctx.quadraticCurveTo(x+w, y, x+w, y+r);
    ctx.lineTo(x+w, y+h-r);
    ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
    ctx.lineTo(x+r, y+h);
    ctx.quadraticCurveTo(x, y+h, x, y+h-r);
    ctx.lineTo(x, y+r);
    ctx.quadraticCurveTo(x, y, x+r, y);
    ctx.closePath();
    ctx.fill();
	ctx.stroke();   
}


function calculateCenterOfMass( mgeometry ){
    
    var centroid = new THREE.Vector3();
    
    // centroid = centroidNominator / centroidDenominator;
    var centroidNominator = new THREE.Vector3(); 
    var centroidDenominator = 0;
    
    
    
    for(var i = 0; i < mgeometry.faces.length; i++){
        
        var Pi = mgeometry.faces[i].a;
        var Qi = mgeometry.faces[i].b;
        var Ri = mgeometry.faces[i].c;

        var a = new THREE.Vector3(mgeometry.vertices[Pi].x, mgeometry.vertices[Pi].y, mgeometry.vertices[Pi].z);
        var b = new THREE.Vector3(mgeometry.vertices[Qi].x, mgeometry.vertices[Qi].y, mgeometry.vertices[Qi].z);
        var c = new THREE.Vector3(mgeometry.vertices[Ri].x, mgeometry.vertices[Ri].y, mgeometry.vertices[Ri].z);

        var ab = b.clone().sub(a);
        var ac = c.clone().sub(a);
        
        var cross = new THREE.Vector3();
        cross.crossVectors( ab, ac );
        
        var faceArea = cross.lengthSq() / 2;
        
        var faceCentroid = new THREE.Vector3( (a.x + b.x + c.x)/3, (a.y + b.y + c.y)/3, (a.z + b.z + c.z)/3 );
        
        if (!isNaN(faceArea)){
            centroidNominator.add(faceCentroid.multiplyScalar(faceArea));
            centroidDenominator += faceArea;
        }
    }

    
    centroid = centroidNominator.divideScalar(centroidDenominator);
    
    return centroid;
}



function getCentroidVertices( mesh ) {

    mesh.geometry.centroid = new THREE.Vector3(0, 0, 0);

    for ( var i = 0, l = mesh.geometry.vertices.length; i <  l; i++ ) {
        mesh.geometry.centroid.add( mesh.geometry.vertices[ i ] );

    } 

    mesh.geometry.centroid.divideScalar( mesh.geometry.vertices.length );
 
    return mesh.geometry.centroid;
}



function getCentroidBoundingBox( mesh ) {

    mesh.geometry.computeBoundingBox();
    boundingBox = mesh.geometry.boundingBox;

    var x0 = boundingBox.max.x;
    var x1 = boundingBox.min.x;
    var y0 = boundingBox.max.y;
    var y1 = boundingBox.min.y;
    var z0 = boundingBox.max.z;
    var z1 = boundingBox.min.z;


    var bWidth = ( x0 > x1 ) ? x0 - x1 : x1 - x0;
    var bHeight = ( y0 > y1 ) ? y0 - y1 : y1 - y0;
    var bDepth = ( z0 > z1 ) ? z0 - z1 : z1 - z0;

    var centroidX = x1 + ( bWidth / 2 );  + mesh.position.x;
    var centroidY = y1 + ( bHeight / 2 ); + mesh.position.y;
    var centroidZ = z1 + ( bDepth / 2 ); + mesh.position.z;

    return mesh.geometry.centroid = { x : centroidX, y : centroidY, z : centroidZ };

}

function getLeftBottomCorner( mesh ){
    
    mesh.geometry.computeBoundingBox();
    boundingBox = mesh.geometry.boundingBox;

    
    var x1 = boundingBox.min.x;
    var y1 = boundingBox.min.y;
    var z1 = boundingBox.min.z;
    
    
    return mesh.geometry.centroid = { x : x1, y : y1, z : z1 };

    
    
}


function randomColors(total)
{
    var i = 360 / (total - 1); // distribute the colors evenly on the hue range
    var r = []; // hold the generated colors
    for (var x=0; x<total; x++)
    {
        r.push( hsv2rgb(i*x, 0, 0.5) ); // you can also alternate the saturation and value for even more contrast between the colors
    }
    return r;
}


function hsv2rgb(h, s, v) {
        var r, g, b;
        var i;
        var f, p, q, t;
 
        // Make sure our arguments stay in-range
    s= s*100;
    v= v*100;
        h = Math.max(0, Math.min(360, h));
        s = Math.max(0, Math.min(100, s));
        v = Math.max(0, Math.min(100, v));
 
        // We accept saturation and value arguments from 0 to 100 because that's
        // how Photoshop represents those values. Internally, however, the
        // saturation and value are calculated from a range of 0 to 1. We make
        // That conversion here.
        s /= 100;
        v /= 100;
 
        if(s == 0) {
                // Achromatic (grey)
                r = g = b = v;
                return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
        }
 
        h /= 60; // sector 0 to 5
        i = Math.floor(h);
        f = h - i; // factorial part of h
        p = v * (1 - s);
        q = v * (1 - s * f);
        t = v * (1 - s * (1 - f));
 
        switch(i) {
                case 0:
                        r = v;
                        g = t;
                        b = p;
                        break;
 
                case 1:
                        r = q;
                        g = v;
                        b = p;
                        break;
 
                case 2:
                        r = p;
                        g = v;
                        b = t;
                        break;
 
                case 3:
                        r = p;
                        g = q;
                        b = v;
                        break;
 
                case 4:
                        r = t;
                        g = p;
                        b = v;
                        break;
 
                default: // case 5:
                        r = v;
                        g = p;
                        b = q;
        }
 
    //r= Math.round(r * 255);
    //r= r.toString(16);

//    g= Math.round(g * 255);
//    g= g.toString(16);
//
//    b= Math.round(b * 255);
//    b= b.toString(16);

    
    return new THREE.Color(r,g,b);
        
}
