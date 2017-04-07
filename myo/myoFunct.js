// Here you can process myo signals EMG before visualization
function MyoActivationFunctions(nPods, Anorm, my_nnls){

    var nBufferS = 25; // Memory size of averaging filter to smooth Myo signals   
    var inits  = new Array(15).fill(5);
    
    // -- Initiate buffer ----- 
    var rawDataArch = new Array(nPods);
        
    for (var i = 0; i < nPods ; i++)
        rawDataArch[i] = new Array(nBufferS);
    
    Myo.on('emg', function(data){
            // Do not rename rawData
    
            // -- Filter negative values --
            var dataPos = new Array(nPods);
                        
            for (var i = 0; i<nPods ; i++){
                dataPos[i] = data[i] > 0 ? data[i] : 0 ;
            }
            
            rawData = dataPos;
            
            //----- Push values to buffer ------
            for (var i = 0; i<nPods ; i++){
                rawDataArch[i].shift();
                rawDataArch[i].push(rawData[i]);
            }

            // -- Average filter -----------
            var ave_d = new Array(nPods);
            
            for (var i = 0; i<nPods ; i++){
                ave_d[i] = 0;
                for (var j = 0; j<nBufferS ; j++){
                    ave_d[i] = ave_d[i] + rawDataArch[i][j];
                }
                ave_d[i] = ave_d[i]/ nBufferS;
            }
            
            //-------------------------------------------------
            //rawData = [100, 0, 0, 0, 0 , 0, 0, 0 ];
            
            var myoSignals = ave_d;

            //var muscleActivityPrevious = muscleActivity;
            //inits = muscleActivity;
            //console.log(numeric.prettyPrint(Anorm));

            var muscleActivityObj = my_nnls.run(Anorm, myoSignals, inits);
            muscleActivity = muscleActivityObj[0];

            // Old method
            //muscleActivity = math.multiply(Anorm, myoSignals);
            //
            //var muscleOrderByMyoStart = StorageData.getMuscleShortNames();
            //
            //for (var j = 0; j < nMuscles; j++)
            //    muscleActivity[j] = muscleActivity[j] * musclesInterVolumeGlobal[muscleOrderByMyoStart[j]] / 1000;

            // -------- MUSCLES Update GUI variables and outline materials -----------
            for (var j = 0; j < muscleActivity.length; j++){

                // Change dat.gui
                eval("gui_controls.muscle_activation_"+j+" = muscleActivity[j]");

                // Change muscle outline
                var str = dg_controller[j].domElement.parentElement.outerText;
                str = str.substring(0, str.length - 2);
                var strName = "outline_" + str;
                var myMuscle = scene.getObjectByName( strName  );

                if (typeof myMuscle != 'undefined'){
                    var outlineMaterialMuscle = new THREE.MeshBasicMaterial( { color:  new THREE.Color(muscleActivity[j]/50, muscleActivity[j]/50, 0), side: THREE.BackSide } );
                    myMuscle.material = outlineMaterialMuscle;
                }
            }

            //---------- Myo update Pods outline materials ----------------------------
            for (var j = 0; j < nPods; j++){
                var myPod = scene.getObjectByName( "pod"+j  );

                if (typeof myPod != 'undefined'){
                    var outlineMaterialPod = new THREE.MeshBasicMaterial( { color:  new THREE.Color(myoSignals[j]/70, myoSignals[j]/70, 0), side: THREE.BackSide } );
                    myPod.material = outlineMaterialPod;
                }
            }
        
    }); // End of Myo.on
    
}