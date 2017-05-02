

//===============  MUSCLES SPRITES ================
function showMuscleLabelSprite(object, meshCentroid, volume){

    label = getObjLabel(object);

    var spriteLabelMuscle = makeTextSpriteSingleLine( " "  + label +  " ",
        {fontsize: 10, borderColor: {r:0, g:0, b:0, a:1.0}, backgroundColor: {r:250, g:250, b:250, a:0.8}});

    // var spriteLabelMuscle = makeTextSprite( " "  + label +  " ",
    //                                         volume/1000 + " cm" + "\u00B3 " ,
    //     {fontsize: 10, borderColor: {r:0, g:0, b:0, a:1.0}, backgroundColor: {r:250, g:250, b:250, a:0.8}} );

    spriteLabelMuscle.position.set(meshCentroid.x,
                                   meshCentroid.y,
                                   meshCentroid.z + 10);

    return [spriteLabelMuscle, label];
}

// ================ Bones ===================================
function showBonesAnnotation(object, meshRes, scene, spriteLabel){
    
    //            var bbox = new THREE.BoundingBoxHelper( meshRes, 0x00ff00 );
//            bbox.update();
//            scene.add( bbox );
            
            // Add a Label (Sprite) 
    var label = object.urlme.substring(object.urlme.lastIndexOf("_")+5);
    label = label.substring(0,label.length - 4);
    spriteLabel[i] = makeTextSprite( " "  + label +  " " , "",
        { fontsize: 14, borderColor: {r:200, g:200, b:200, a:1.0}, backgroundColor: {r:200, g:200, b:200, a:0.8} } );

    var centroid = calculateCenterOfMass(meshRes.geometry);    
    // Calculate Intersections('2');

    spriteLabel[i].position.set(centroid.x, centroid.y, centroid.z+10);
    scene.add( spriteLabel[i] );
            
            //------ Connection line ---------------
//            var geometry = new THREE.Geometry();
//            geometry.vertices.push(
//	           spriteLabel[i].positioscene.add(meshRes);('2');n,
//	           centroid
//            );
//            
//            var line = new THREE.Line( geometry, new THREE.LineBasicMaterial({color: 0x000000}) );
//            scene.add( line );
            
            ///////////////////////// Calculate Intersections('3');
            // Save to an obj file
            ///////////////////////
            
//            var exporter = new THREE.OBJExporter();
//            var res = exporter.parse(meshRes);
//            
//            saveTextAsFile(res);
            
            //	           spriteLabel[i].positioscene.add(meshRes);('2'3;n,
}

// ================ Distances ============================
function showMusclesToMyoDistances(scene, myoPodPosition, musclesInterCentroidsGlobal, muscleDistArr, j, muscleName){
    
    // Connection line 
    
    var geometry = new THREE.Geometry();
    geometry.vertices.push(
       myoPodPosition[j],
       musclesInterCentroidsGlobal[muscleName]
    );

    var line = new THREE.Line( geometry, new THREE.LineBasicMaterial({color: 0x00ff00}) );

    scene.add( line );

    // Sprite label 
    
    distSpriteLabel = makeTextSpriteSingleLine( muscleDistArr[muscleDistArr.length-1] + "", {fontsize: 14, borderColor: {r:0, g:0, b:0, a:1.0}, backgroundColor:{r:250, g:250, b:250, a:0.8}});


    distSpriteLabel.position.set( myoPodPosition[j].x/2 + musclesInterCentroidsGlobal[muscleName].x/2,
                                  myoPodPosition[j].y/2 + musclesInterCentroidsGlobal[muscleName].y/2, 
                                  myoPodPosition[j].z/2 + musclesInterCentroidsGlobal[muscleName].z/2 + 30); 

    scene.add( distSpriteLabel );
}

