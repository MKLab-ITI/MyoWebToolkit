class MuscleBonesConstraints {

    contructor(){ }

    /**
     * Async load muscles
     *
     * @param loader
     * @param nMuscles
     * @param myModelMuscles
     */
    asyncLoadMuscles(loader, nMuscles, myModelMuscles) {


        for (var i = 0; i < nMuscles; i++) { //

            if (!cachedMuscles) {
                loader.load("leftForearm/auto_selected_muscles_n_bones/muscles/" + myModelMuscles[i], function (object) {

                        object.children[0].material = materialMuscles08;
                        //object.rotation.set(1.5 * M_PI, 0, 1 * M_PI);
                        object.children[0].geometry.rotateX( 0.08* M_PI  );//-10*2*M_PI/360);
                        object.children[0].geometry.rotateY( 0.05* M_PI   );//-10*2*M_PI/360);
                        object.children[0].geometry.translate(-390, 320, -850);
                        //object.children[0].geometry.applyMatrix(new THREE.Matrix4().setPosition(-390, 320, -850));
                        //object.children[0].geometry.verticesNeedUpdate = true;

                        object.updateMatrixWorld();

                        //    object.    new THREE.Vector3(500, 1000, 1000)
                        var radi = musclesBonesConstraints.getBone('radius');
                        radi.add(object);

                        //-- Calculate the intersection of the muscle with the box ------
                        var geometryMuscle = new THREE.Geometry().fromBufferGeometry(object.children[0].geometry);


                        var humanpartBSPmuscle = new ThreeBSP(geometryMuscle);

                        //console.log("Plane:", crossBoxBSP);
                        //console.log("Muscle:", humanpartBSPmuscle);

                        var geometryResMuscle = crossBoxBSP.intersect(humanpartBSPmuscle);

                        var meshRes = geometryResMuscle.toMesh(mshColor[i]);
                        meshRes.geometry.computeVertexNormals();



                        var muscleCrossPhy = new Physijs.BoxMesh( meshRes.geometry, mshColor[i], 0);

                        // --------- Save for fast mode ------------
                        var exporter = new THREE.OBJExporter();
                        var resultOBJstr = exporter.parse(meshRes);
                        //console.log(resultOBJstr);
                        resultOBJstr = resultOBJstr.substring(resultOBJstr.indexOf("\n") + 1); // remove o\n

                        resultOBJstr = "o " + object.children[0].name + "\n" + resultOBJstr;

                        console.log(object.children[0].name);

                        //writeTextToFile(object.children[0].name + ".obj", resultOBJstr);
                        //------------ Add to-------------------------
                        //scene.add(meshRes);

                        radi.add(muscleCrossPhy);

                        //-------- Calculate Vol and Center ----------------------------
                        var volume = calculateVolume(meshRes.geometry);
                        var meshCentroid = calculateCenterOfMass(meshRes.geometry);

                        // Show Label -------------------------------
                        var sprite_and_label = showMuscleLabelSprite(object, meshCentroid, volume);

                        //----------Archive for calculating distances ----
                        musclesInterCentroidsGlobal[sprite_and_label[1]] = meshCentroid;
                        musclesInterVolumeGlobal[sprite_and_label[1]] = volume;

                        muscleCrossPhy.add(sprite_and_label[0]);

                    }, // Progress
                    function ( xhr ) {
                        if ( xhr.lengthComputable ) {
                            //var percentComplete = xhr.loaded / xhr.total * 100;
                        }
                    }
                    , //Error
                    function ( xhr ) {});
            } else {

                loader.load("leftForearm/auto_selected_muscles_n_bones/cache_intersections/" + myModelMuscles[i], function (meshRes) {

                        // Make geometry from BufferedGeometry
                        meshRes.children[0].geometry = new THREE.Geometry().fromBufferGeometry(meshRes.children[0].geometry);

                        // Move muscles from local position to world position
                        meshRes.children[0].geometry.applyMatrix( new THREE.Matrix4().makeTranslation(-247, 95, -930) );

                        // Rotate muscles from local rotation to world rotation
                        meshRes.children[0].geometry.applyMatrix( new THREE.Matrix4().makeRotationFromEuler( new THREE.Euler(.15, .2 , 0.1, 'XYZ' )) );

                        // Give to muscles randomly generated colors
                        meshRes.children[0].material = mshColor[Math.floor(15 * Math.random())];

                        // Calculate volume and center of mass of each muscle
                        var volume = calculateVolume(meshRes.children[0].geometry);
                        var meshCentroid = calculateCenterOfMass(meshRes.children[0].geometry);

                        // Make the physics object of the muscle
                        var musclePhy = new Physijs.BoxMesh(meshRes.children[0].geometry, meshRes.children[0].material, 0);

                        var sprite_and_label = showMuscleLabelSprite(meshRes, meshCentroid, volume);

                        musclePhy.add(sprite_and_label[0]);

                        console.log(sprite_and_label[1]);

                        //---------- Store centroids and volumes to a global variable ----------------------------------
                        musclesInterCentroidsGlobal[sprite_and_label[1]] = meshCentroid;
                        musclesInterVolumeGlobal[sprite_and_label[1]] = volume;

                        // ---- Add all phy muscles object to radius phy object ---------------------------
                        var radi = musclesBonesConstraints.getBone('radius');
                        radi.add(musclePhy);

                        // ----- Activation indicator outline of muscles -----------------
                        var outlineMaterial = new THREE.MeshBasicMaterial({color: 0x000000, side: THREE.BackSide});
                        //var outlineMesh = new THREE.Mesh(meshRes.children[0].geometry, outlineMaterial);
                        //outlineMesh.position.set( meshRes.children[0].geometry.position );

                        var outlineMusclePhy = new Physijs.BoxMesh(meshRes.children[0].geometry, outlineMaterial, 0);
                        outlineMusclePhy.scale.multiplyScalar(1.005);
                        outlineMusclePhy.name = "outline_" + label;

                        // Add also the outline to radius phy bone
                        radi.add(outlineMusclePhy);
                        //--------------------------------------------

                    }, // Progress
                    function ( xhr ) {
                        if ( xhr.lengthComputable ) {
                            var percentComplete = xhr.loaded / xhr.total * 100;
                        }
                    }
                    , //Error
                    function ( xhr ) {});

            }

        }


    }


    /**
     *
     * Asynchronoysly load the bones
     *
     *
     * @param loader
     * @param nBones
     * @param myModelBones
     */
    asyncLoadBones(loader, nBones, myModelBones) {

        var spriteLabelBones = [];

        for (var i = 0; i < nBones; i++) {  //
            loader.load("leftForearm/auto_selected_muscles_n_bones/bones_centered/" + myModelBones[i], function (object) { //

                    var v = StorageData.getBoneVol(object.children[0].name);
                    // v = 0;

                    var bonematerial = Physijs.createMaterial(
                        new THREE.MeshLambertMaterial({color: new THREE.Color(0xaaaaaa), transparent: false, opacity: 0.5}), 0.5, 0);

                    bonematerial.visible = true;



                    var objectPh = new Physijs.BoxMesh(new THREE.Geometry().fromBufferGeometry(object.children[0].geometry),
                        bonematerial, v);

                    var diminishFactorDepth = 0.7;
                    var diminishFactorHeight = 0.4;
                    var diminishFactorWidth = 0.7;

                    objectPh._physijs.depth *= diminishFactorDepth;
                    objectPh._physijs.height *= diminishFactorHeight;
                    objectPh._physijs.width *= diminishFactorWidth;

                    objectPh.name = object.children[0].name;


                    if (objectPh.name=='palmcubein' || objectPh.name=='palmcubeout')
                        bonematerial.visible = false;


                    var bbox = new THREE.BoundingBoxHelper(objectPh, 0x000000);

                    bbox.name = 'bb'+objectPh.name;

                    console.log(objectPh.name);

                    bbox.update();

                    bbox.scale.z *= diminishFactorDepth;
                    bbox.scale.y *= diminishFactorHeight;
                    bbox.scale.x *= diminishFactorWidth;


                    //objectPh.add(bbox);

//            var geometryBone = new THREE.Geometry().fromBufferGeometry( object.children[0].geometry);
//
//            object.children[0] = new Physijs.BoxMesh( geometryBone, bonematerial );

                    rbonesObjs.push(objectPh);
                    //rbonesObjs.push(objectArt);


//            // Intersecting Bones with Plane
//
//
//            var humanpartBSP   = new ThreeBSP(geometryBone);
//            var geometryRes = crossBoxBSP.intersect(humanpartBSP);
//
//            var meshRes = geometryRes.toMesh( bonematerial  );
//		    //meshRes.geometry.computeVertexNormals();
//
//            scene.add(meshRes);
//
//            showBonesAnnotation(object, meshRes, scene, spriteLabelBones);

                }, // Progress
                function ( xhr ) {
                    if ( xhr.lengthComputable ) {
                        var percentComplete = xhr.loaded / xhr.total * 100;
                    }
                }
                , //Error
                function ( xhr ) {});
        }
    }


    getBone(bname){
        return getObjByNameB(rbonesObjs, bname);
    }


    /** =======================================================
     *  Place bone to the correct position and rotation
     *
     * @param bname
     * @param pos
     * @param rot
     * @returns {*} the bonePhysicis mesh
     */
    setBonePosAndRot(bname, pos) {
        var meshPhy = getObjByNameB(rbonesObjs, bname);

        // Do not modify this // Originally the skeleton was layed down
        var rot = new THREE.Vector3(1.5 * M_PI, 0, 1 * M_PI);

        meshPhy.rotation.set(rot.x, rot.y, rot.z);
        meshPhy.position.set(pos.x, pos.y, pos.z);
        meshPhy.__dirtyRotation = true;
        meshPhy.__dirtyPosition = true;

        // You may also want to cancel the object's velocity
        meshPhy.setLinearVelocity(new THREE.Vector3(0, 0, 0));
        meshPhy.setAngularVelocity(new THREE.Vector3(0, 0, 0));

        scene.add(meshPhy);

        meshPhy.setDamping(0.99, 0.99);
        return meshPhy
    }

    /** ==============================
     * Add a sphere
     * Representing the constraint
     *
     * @param objA        The first object where constraint is placed
     * @param pos         Position with respect to global world
     * @param colorBall   Color of the ball 0xFFFFFF format
     */
    addSphere(objA, pos, colorBall) {
        var sphereJoint = new THREE.Mesh(new THREE.SphereGeometry(6, 8, 8), new THREE.MeshBasicMaterial({color: colorBall}));
        var sphpos = new THREE.Vector3().subVectors(pos, objA.position);

        /* 1.5   0   1
         10 150   0
         -10   0   150
         */

        // Do not modify this. Originally the skeleton was layed down
        sphereJoint.position.copy(new THREE.Vector3(-sphpos.x, sphpos.z, sphpos.y));
        objA.add(sphereJoint);

        return sphereJoint;
    }

    /**
     *   Set Hinge constraint between objA and objB
     *
     * @param objA
     * @param objB
     * @param constraintPos
     * @param constraintLimitsUpper
     * @param constraintLimitsLower
     * @param constraintAxes
     */
    setHingeConstraint(objA, objB, constraintPos, constraintLimitsUpper, constraintLimitsLower, constraintAxes) {


        if (constraintAxes == 'x')
            constraintAxes = new THREE.Vector3(1,0,0);
        else if (constraintAxes == 'y')
            constraintAxes = new THREE.Vector3(0,1,0);
        else if (constraintAxes == 'z')
            constraintAxes = new THREE.Vector3(0,0,1);
        else if (constraintAxes == 'xz')
            constraintAxes = new THREE.Vector3(1,0,1);

        var constraint = new Physijs.HingeConstraint(objA, objB, constraintPos, constraintAxes);
        var sphereJoint = this.addSphere(objA, constraintPos, 0xff00ff);

        scene.addConstraint(constraint);
        constraint.setLimits(constraintLimitsLower, constraintLimitsUpper, 0.2, 0);

        return sphereJoint;
    }


    /**
     * ConeTwist
     *
     * @param objA
     * @param objB
     * @param constraintPos
     * @param constraintLimit
     * @returns {*}
     */
    setConeTwistConstraint(objA, objB, constraintPos, constraintLimit) {

        var constraint = new Physijs.ConeTwistConstraint(objA, objB, constraintPos);

        var sphereJoint = this.addSphere(objA, constraintPos, 0x88ff00);

        scene.addConstraint(constraint);

        constraint.setLimit(constraintLimit.x, constraintLimit.y, constraintLimit.z);

        return sphereJoint;
    }


    /**
     * Set DOF constraint between objA and objB
     *
     * @param objA
     * @param objB
     * @param constraintPos
     * @param constraintLimitsUpper
     * @param constraintLimitsLower
     * @param colorBall
     * @returns {Window.Physijs.DOFConstraint}
     */
    setDoFConstraint(objA, objB, constraintPos, constraintLimitsUpper, constraintLimitsLower, colorBall) {

        var constraint = new Physijs.DOFConstraint(objA, objB, constraintPos);
        var sphereJoint = this.addSphere(objA, constraintPos, 0, 0x0000ff);

        scene.addConstraint(constraint);
        constraint.setLinearLowerLimit(new THREE.Vector3(0, 0, 0)); // sets the lower end of the linear movement along the x, y, and z axes.
        constraint.setLinearUpperLimit(new THREE.Vector3(0, 0, 0)); // sets the upper end of the linear movement along the x, y, and z axes.
        constraint.setAngularUpperLimit({
            x: constraintLimitsUpper.x,
            y: constraintLimitsUpper.y,
            z: constraintLimitsUpper.z
        });
        constraint.setAngularLowerLimit({
            x: constraintLimitsLower.x,
            y: constraintLimitsLower.y,
            z: constraintLimitsLower.z
        });

        return sphereJoint;
    }


    /**
     *
     * Main function to construct left arm bone skeleton
     *
     * @constructor
     */
    loadBoneConstraints() {

        this.objShoulder = myEnv.shoulder();

        this.objShoulder.position.copy(new THREE.Vector3(530, 1150, 1000));
        this.objShoulder.__dirtyPosition = true;
        scene.add(this.objShoulder);

        //ShoulderHangerConstraint = setBoneToPosAndConstraint(objShoulder, hanger, new THREE.Vector3(530, 1200, 1000),  // Position
        //    new THREE.Vector3(1.5 * M_PI, 0, M_PI),//   Rotation
        //    new THREE.Vector3(530, 1200, 1000), //   Constraint
        //    0,0,'pp'
        //);

        //------------------- Humerus -------------------------------------
        this.objHumerus = this.setBonePosAndRot('humerus', new THREE.Vector3(520, 1000, 1000));

        var humerusShoulderConstraint = this.setDoFConstraint(this.objHumerus, this.objShoulder,
            new THREE.Vector3(530, 1150, 1000), //   Constraint
            new THREE.Vector3(0 * M_PI, 0 * M_PI, 0 * M_PI),//   ConstraintLimitsUpper
            new THREE.Vector3(0, 0 * M_PI, 0 * M_PI),//   ConstraintLimitsLower
            0x0000ff);

        ////----------------------- Radius ----------------------------------------
        var sv = 1;
        var svu = 1;
        var svl = 0;
        var svc = 1;
        this.objRadius = this.setBonePosAndRot('radius', new THREE.Vector3(510, 730, 995));
        this.jRadius = this.setHingeConstraint(this.objRadius, this.objHumerus, new THREE.Vector3(510, 850, 985), 0, - M_PI, 'x');

        //this.jRadius = this.setConeTwistConstraint(this.objRadius, this.objHumerus, new THREE.Vector3(510, 850, 995), new THREE.Vector3(svc *M_PI, svc *M_PI, svc *M_PI));

        //this.jRadius = this.setDoFConstraint(this.objRadius, this.objHumerus,
        //        new THREE.Vector3(510, 850, 995),
        //        new THREE.Vector3( svu * M_PI, svu * M_PI, svu * M_PI),//   ConstraintLimitsUpper
        //        new THREE.Vector3( svl * M_PI,  svl * M_PI, svl * M_PI),//   ConstraintLimitsLower
        //        0x0000ff);

        // ---------------------- Ulna --------------------------------------
        this.objUlna = this.setBonePosAndRot('ulna', new THREE.Vector3(535, 745, 1010));
        this.jUlna = this.setHingeConstraint(this.objUlna, this.objHumerus, new THREE.Vector3(535, 860, 1010), M_PI/4, - M_PI/4, 'xz');

        // ---------------------- Carpi ------------------------------------
        this.objCarpi = this.setBonePosAndRot('carpi', new THREE.Vector3(525, 585, 1000));

        this.jCarpiR = this.setHingeConstraint(this.objRadius, this.objCarpi,  new THREE.Vector3(515, 605, 1000), M_PI/2 , - M_PI/3, 'x');
        this.jCarpiU = this.setHingeConstraint(this.objUlna, this.objCarpi,  new THREE.Vector3(532, 610, 1000),   M_PI/2, - M_PI/3, 'x');




        //this.jCarpiR = this.setDoFConstraint(this.objCarpi, this.objRadius, new THREE.Vector3(515, 605, 1010),new THREE.Vector3(sv * M_PI, sv * M_PI, sv * M_PI),//   ConstraintLimitsUpper
        //    new THREE.Vector3(-sv * M_PI, -sv * M_PI, -sv * M_PI),//   ConstraintLimitsLower
        //    0x0000ff);
        //this.jCarpiU = this.setDoFConstraint(this.objCarpi, this.objUlna, new THREE.Vector3(532, 610, 1010),   new THREE.Vector3(sv * M_PI, sv * M_PI, sv * M_PI),//   ConstraintLimitsUpper
        //    new THREE.Vector3(-sv * M_PI, -sv * M_PI, -sv * M_PI),//   ConstraintLimitsLower
        //    0x0000ff);

        //this.jCarpiR = this.setConeTwistConstraint(this.objCarpi, this.objRadius, new THREE.Vector3(515, 605, 1000), new THREE.Vector3(svc *M_PI, svc *M_PI, svc *M_PI));
        //this.jCarpiU = this.setConeTwistConstraint(this.objCarpi, this.objUlna, new THREE.Vector3(532, 610, 1000),   new THREE.Vector3(svc *M_PI, svc *M_PI, svc *M_PI));

        // ========== 3      METACARPAL AND MIDDLE FINGER ============
        this.objThirdmetacarpal = this.setBonePosAndRot('thirdmetacarpal', new THREE.Vector3(525, 550, 1000));
        this.jThirdmeta = this.setHingeConstraint(this.objCarpi, this.objThirdmetacarpal,  new THREE.Vector3(525, 583, 1000),
            M_PI/8, -M_PI/8, 'x');

        //---------- Middle Finger proximal phalanx  -------------------------------
        this.objMiddleFproximal = this.setBonePosAndRot('middleFproximal', new THREE.Vector3(525, 494, 1000));
        this.jMFp = this.setHingeConstraint(this.objMiddleFproximal, this.objThirdmetacarpal, new THREE.Vector3(525, 517, 1000),
            0, -M_PI/2, 'x');

        //---------- Middle Finger middle phalanx  -------------------------------
        this.objMiddleFmiddle = this.setBonePosAndRot('middleFmiddle', new THREE.Vector3(525, 444, 1000));
        this.jMFm = this.setHingeConstraint(this.objMiddleFmiddle, this.objMiddleFproximal, new THREE.Vector3(525, 465, 1000),
            0, - 1.1*M_PI/2, 'x');

        //---------- Middle Finger distal phalanx  -------------------------------
        this.objMiddleFdistal = this.setBonePosAndRot('middleFdistal', new THREE.Vector3(525, 410, 1000));
        this.jMFd = this.setHingeConstraint(this.objMiddleFdistal, this.objMiddleFmiddle, new THREE.Vector3(525, 425, 1000),
            0, -M_PI/4, 'x');


        //// ========  2     METACARPAL AND INDEX FINGER =================
        this.objSecondmetacarpal = this.setBonePosAndRot('secondmetacarpal', new THREE.Vector3(508, 552, 1000));
        this.jSecondmeta = this.setHingeConstraint(this.objCarpi, this.objSecondmetacarpal,  new THREE.Vector3(508, 590, 1000),
            M_PI/8, -M_PI/4, 'x');

        //---------- Index Finger proximal phalanx  -------------------------------
        this.objIndexFproximal = this.setBonePosAndRot('indexFproximal', new THREE.Vector3(510, 495, 1000));
        this.jIFp = this.setHingeConstraint(this.objIndexFproximal, this.objSecondmetacarpal, new THREE.Vector3(510, 517, 1000),
            0, -M_PI/2, 'x');

        ////////---------- Index Finger middle phalanx  -------------------------------
        this.objIndexFmiddle = this.setBonePosAndRot('indexFmiddle', new THREE.Vector3(510, 460, 1000));
        this.jIFm = this.setHingeConstraint(this.objIndexFmiddle, this.objIndexFproximal, new THREE.Vector3(510, 474, 1000),
            0, - 0.8*M_PI/2, 'x');

        ////////---------- Index Finger distal phalanx  -------------------------------
        this.objIndexFdistal = this.setBonePosAndRot('indexFdistal', new THREE.Vector3(510, 437, 1000));
        this.jIFd = this.setHingeConstraint(this.objIndexFdistal, this.objIndexFmiddle, new THREE.Vector3(510, 447, 1000),
            0, -M_PI/4, 'x');

        //  ======      1       METACARPAL AND THUMB FINGER ========
        this.objFirstmetacarpal = this.setBonePosAndRot('firstmetacarpal', new THREE.Vector3(492, 570, 1000));
        this.jFirstmeta = this.setHingeConstraint(this.objCarpi, this.objFirstmetacarpal,  new THREE.Vector3(495, 588, 1000),
            0, -M_PI/4, 'x');

        // ---------- Middle Finger proximal phalanx  -------------------------------
        this.objThumbFproximal = this.setBonePosAndRot('thumbFproximal', new THREE.Vector3(495, 530, 1000));
        this.jTFp =  this.setHingeConstraint(this.objThumbFproximal, this.objFirstmetacarpal, new THREE.Vector3(495, 548, 1000),
            0, -M_PI/2, 'x' );

        // ---------- Middle Finger distal phalanx  -------------------------------
        this.objThumbFdistal = this.setBonePosAndRot('thumbFdistal', new THREE.Vector3(495, 495, 1000));
        this.jTFd = this.setHingeConstraint(this.objThumbFdistal, this.objThumbFproximal, new THREE.Vector3(495, 510, 1000),
            0, -M_PI/4, 'x');


        // ============= 4      METACARPAL AND RING FINGER ==========
        this.objFourthmetacarpal = this.setBonePosAndRot('fourthmetacarpal', new THREE.Vector3(537, 555, 1000));
        this.jFourthmeta = this.setHingeConstraint(this.objCarpi, this.objFourthmetacarpal,  new THREE.Vector3(537, 585, 1000),
            M_PI/8, -M_PI/4, 'x');

        //---------- Ring Finger proximal phalanx  -------------------------------
        this.objRingFproximal = this.setBonePosAndRot('ringFproximal', new THREE.Vector3(539, 502, 1000));
        this.jRFp = this.setHingeConstraint(this.objRingFproximal, this.objFourthmetacarpal, new THREE.Vector3(539, 525, 1000),
            0, -M_PI/2, 'x');

        //---------- Ring Finger middle phalanx  -------------------------------
        this.objRingFmiddle = this.setBonePosAndRot('ringFmiddle', new THREE.Vector3(539, 465, 1000));
        this.jRFm = this.setHingeConstraint(this.objRingFmiddle, this.objRingFproximal, new THREE.Vector3(539, 479, 1000),
            0, - 0.8*M_PI/2, 'x');

        //---------- Ring Finger distal phalanx  -------------------------------
        this.objRingFdistal = this.setBonePosAndRot('ringFdistal', new THREE.Vector3(539, 440, 1000));
        this.jRFd = this.setHingeConstraint(this.objRingFdistal, this.objRingFmiddle, new THREE.Vector3(539, 448, 1000),
            0, -M_PI/4, 'x');

        // =========     5      METACARPAL AND LITTLE FINGER     =========
        this.objFifthmetacarpal = this.setBonePosAndRot('fifthmetacarpal', new THREE.Vector3(548, 561, 1000));
        this.jFifthmeta = this.setHingeConstraint(this.objCarpi, this.objFifthmetacarpal,  new THREE.Vector3(548, 589, 1000),
            0, -M_PI/4,  'x' );

        //---------- Ring Finger proximal phalanx  -------------------------------
        this.objLittleFproximal = this.setBonePosAndRot('littleFproximal', new THREE.Vector3(549, 515, 1000));
        this.jLFp = this.setHingeConstraint(this.objLittleFproximal, this.objFifthmetacarpal, new THREE.Vector3(549, 533, 1000),
            0, -M_PI/2, 'x');

        //---------- Ring Finger middle phalanx  -------------------------------
        this.objLittleFmiddle = this.setBonePosAndRot('littleFmiddle', new THREE.Vector3(549, 482, 1000));
        this.jLFm = this.setHingeConstraint(this.objLittleFmiddle, this.objLittleFproximal, new THREE.Vector3(549, 497, 1000),
            0, - 0.8*M_PI/2, 'x');

        //---------- Ring Finger distal phalanx  -------------------------------
        this.objLittleFdistal = this.setBonePosAndRot('littleFdistal', new THREE.Vector3(549, 461, 1000));
        this.jLFd = this.setHingeConstraint(this.objLittleFdistal, this.objLittleFmiddle, new THREE.Vector3(549, 471, 1000),
            0, -M_PI/4, 'x');

        ////============== INTER-FINGER CONSTRAINTS ================================
        this.setHingeConstraint( this.objSecondmetacarpal, this.objThirdmetacarpal, new THREE.Vector3(515, 523, 1000), 0, 0, 'y' );
        this.setHingeConstraint( this.objThirdmetacarpal, this.objFourthmetacarpal, new THREE.Vector3(530, 523, 1000), 0, 0, 'y' );
        this.setHingeConstraint( this.objFourthmetacarpal, this.objFifthmetacarpal, new THREE.Vector3(544, 528, 1000), 0, 0, 'y' );

        ////====================================================================
        ////objThirdmetacarpal.applyImpulse(new THREE.Vector3(0,0,-5), new THREE.Vector3(0,0,0));

        this.objPalmReflectorIn = this.setBonePosAndRot('palmcubein', new THREE.Vector3(0, -10, 10));
        this.objThirdmetacarpal.add(this.objPalmReflectorIn);

        this.objPalmReflectorOut = this.setBonePosAndRot('palmcubeout', new THREE.Vector3(0, 12, 10));
        this.objThirdmetacarpal.add(this.objPalmReflectorOut);
    }
}