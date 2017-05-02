class MyoArmband{

    contructor(){ }

    /**
     * 3D
     * Create Myo sensor as a sum of 8 pods in 3D space
     */
    loadMyoPods() {

        // create a 3D objects constituting of 8 pods
        var myos = this.createMyo();

        // Get radius bone
        var phy_mesh_radius = musclesBonesConstraints.getBone('radius');

        // Add myo around radius bone
        phy_mesh_radius.add(myos[1]); // at 1 is the Myo pod object

        this.nPods = myos[0]; // number of pods
        this.myoSensor = myos[1];
        this.myoPodPositions = myos[3]; // position of each pod
        //scene.add(myoSensor);
    }

    /**
     *
     * Create 8 Myo pods in 3D space
     *
     * @returns {[nPods, myoSensor, myoPods, myoPodPositions]}
     */
    createMyo(){

        var nPods = 8;
        var myoPods = new Array(nPods);

        // Myo is elliptical
        var radiusAroundArmX = 50;
        var radiusAroundArmY = 37;

        // each myo pod has dimensions 35 mill x 15 mill x 5 mill
        var myoSingleGeometry =  new THREE.BoxGeometry(35, 15, 5);

        // Optional: Sprites are labels that face at you so that you know which pod is 1, 2, 3
        var myoSpriteLabel = new Array(nPods);
        var myoPodPositions = new Array(nPods);

        // Set Myo as empty 3D object.
        var myoSensor = new THREE.Object3D();

        // Myo position at forearm. Position is in local coordinates.
        myoSensor.position.set(-12, 5, 40);

        // Myo rotation
        myoSensor.rotateX(-5*2*Math.PI/360);

        // These will translate relative position to absolute
        //myoSensor.updateMatrixWorld();

        for (var i = 0; i < nPods; i++) {

            // Pod 3D box
            myoPods[i] = new Physijs.BoxMesh(myoSingleGeometry, myoMaterial, 0);

            // Pod position
            myoPods[i].position.set(radiusAroundArmX*Math.cos(2*Math.PI*i/nPods - Math.PI/4),
                radiusAroundArmY*Math.sin(2*Math.PI*i/nPods - Math.PI/4),0);

            // Name each pod
            myoPods[i].name = "pod"+i;

            // Rotate so as to look Myo center.
            myoPods[i].lookAt(new THREE.Vector3(0,0,0));

            // Add each Pod to Myo empty object
            myoSensor.add(myoPods[i]);

            // Update myo pod positions to absolute positions
            myoPodPositions[i] = new THREE.Vector3();
            myoPodPositions[i] = myoPods[i].position; //.setFromMatrixPosition( myoPods[i].matrixWorld );

            var strS = " s" + unicodeSubscripts(i+1) + "(t)";
            myoSpriteLabel[i] = makeTextSpriteSingleLine( strS, {fontsize: 24, borderColor: {r:0, g:0, b:0, a:1.0}, backgroundColor:{r:200, g:200, b:200, a:0.5}});

            myoPods[i].add( myoSpriteLabel[i]  );
        }

        return [nPods, myoSensor, myoPods, myoPodPositions];
    }


}