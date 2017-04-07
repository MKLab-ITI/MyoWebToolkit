class Enviromentals {

	constructor(){

	}


	//---------- Set renderer -----------------
	setRenderer(renderer) {

		// create and start the renderer; choose antialias setting.
		renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.shadowMap.enabled = true;
		renderer.shadowMapSoft = true;
		return renderer;
	}

	setScene(scene) {

		//var scene = new THREE.Scene();
		scene = new Physijs.Scene({reportsize: 70, fixedTimeStep: 1 / 25});
		scene.add(new THREE.AxisHelper(1500));
		scene.setGravity(new THREE.Vector3(0, -500, 0));

		var gridHelper = new THREE.GridHelper( 2000, 200, new THREE.Color(0.5,0.5,0.5) );
		scene.add( gridHelper );

		//var skyBoxG = new THREE.BoxGeometry( 100000, 100000, 3000);
		//
		//var skyboxMesh    = new Physijs.BoxMesh(skyBoxG ,
		//	Physijs.createMaterial(
		//		new THREE.MeshLambertMaterial({ color: 0xffffff}),
		//		.8, // high friction
		//		.4 // low restitution
		//	), 0);
		//
		//
		//skyboxMesh.position.set(0,0,-50000);
		//
		//
		//// add it to the scene
		//scene.add( skyboxMesh );

//	scene.addEventListener(
//		'update',
//		function() {
//
////				if ( input && vehicle ) {
////					if ( input.direction !== null ) {
////						input.steering += input.direction / 50;
////						if ( input.steering < -.6 ) input.steering = -.6;
////						if ( input.steering > .6 ) input.steering = .6;
////					}
////					vehicle.setSteering( input.steering, 0 );
////					vehicle.setSteering( input.steering, 1 );
////
////					if ( input.power === true ) {
////						vehicle.applyEngineForce( 300 );
////					} else if ( input.power === false ) {
////						vehicle.setBrake( 20, 2 );
////						vehicle.setBrake( 20, 3 );
////					} else {
////						vehicle.applyEngineForce( 0 );
////					}
////				}
//
//
//			scene.simulate( undefined, 2 );
//			physics_stats.update();
//		}
//	);


		//addFloor('checkerboard.jpg'); // In Enviromentals.js


//    var size = 2000;
//    var step = 10;
//    var gridHelper = new THREE.GridHelper( size, step );
//    gridHelper.setColors(new THREE.Color(0,0,0), new THREE.Color(1,0,0))
//    scene.add( gridHelper );

		return scene;

	}

	//--------- Light ----------
	makeLights(x, y, z, light_intensity) {

		var light = new THREE.DirectionalLight(0xFFFFFF, light_intensity);
		light.position.set(x, y, z);
		//light.target.position.copy( scene.position );
		light.target.position.set(1000, 0, 1000);
		light.castShadow = true;
		light.shadow.camera.left = -1500;
		light.shadow.camera.top = -1500;
		light.shadow.camera.right = 1500;
		light.shadow.camera.bottom = 1500;
		light.shadow.camera.near = 20;
		light.shadow.camera.far = 4000;
		light.shadow.bias = -.0001
		light.shadow.mapSize.width = light.shadow.mapSize.height = 2048;
		//light.shadowDarkness = .7;

		return light
	}

	//-------- Point light -----
	makePointLight(x, y, z, light_intensity) {
		var light = new THREE.PointLight(0xff0000, light_intensity, 0);
		light.position.set(50, 50, 50);
		return light;
	}

	//-------- LightHelper -----------
	makeLightHelper(light) {
		var lH = new THREE.DirectionalLightHelper(light, 100);
		return lH;
	}

	//---------- Statistics Rendering and Physics ----------
	setStats(container) {

		render_stats = new Stats();
		render_stats.domElement.id = 'render_stats';
		container.appendChild(render_stats.domElement);

		physics_stats = new Stats('Physics');
		physics_stats.domElement.id = 'physics_stats';
		container.appendChild(physics_stats.domElement);
		physics_stats.domElement.style.top = '50px';
	}

	/**
	 * Set 3D camera
	 *
	 * @param camera
	 * @returns {THREE.PerspectiveCamera|*}
     */
	setCamera(camera) {

		var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
		// camera attributes
		var VIEW_ANGLE = 90, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 10000; //NEAR = 190, FAR = 250;

		// set up camera
		camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);

		// In-muscles view
		//camera.position.set(220, -85, 1075);

		// Pendulum view
		camera.position.set(500, 1000, 1600);


		//camera.position.set(100, 285, 500);
		return camera;
	}


	//---------- Ground with Physics ------------
	setGround(ground) {

		var ground_geometry = new THREE.PlaneGeometry(4000, 4000, 10, 10);
//		for ( var i = 0; i < ground_geometry.vertices.length; i++ ) {
//			var vertex = ground_geometry.vertices[i];
//			//vertex.y = 10; //0 - NoiseGen.noise( 0.5 ) * 0.01;
//		}
		ground_geometry.computeFaceNormals();
		ground_geometry.computeVertexNormals();

		// If your plane is not square as far as face count then the HeightfieldMesh
		// takes two more arguments at the end: # of x faces and # of z faces that were passed to THREE.PlaneMaterial
		var rockMaterial = Physijs.createMaterial(
			new THREE.MeshLambertMaterial({color: 0x005500, opacity: 0.5, transparent: true}),
			.8, // high friction
			.4 // low restitution
		);

		ground = new Physijs.HeightfieldMesh(
			ground_geometry,
			rockMaterial,
			0 // mass
		);

		ground.rotation.x = -Math.PI / 2;
		ground.receiveShadow = true;
		ground.position.set(0, 0, 1000);


		return ground;

	}

	/**
	 * Set shoulder 3D object
	 *
	 * @returns {Window.Physijs.SphereMesh}
     */
	shoulder() {

		var hanger_material = Physijs.createMaterial(
			new THREE.MeshLambertMaterial({color: 0x00ff00}),
			.4, // low friction
			.6 // high restitution
		);

		var shoulder = new Physijs.SphereMesh(
			new THREE.SphereGeometry(3, 8, 8),
			hanger_material, 0
		);


		shoulder.name = "shoulder";

		return shoulder;
	}


	hanger() {


		hanger_material = Physijs.createMaterial(
			new THREE.MeshLambertMaterial({color: 0xeeffcc}),
			.4, // low friction
			.6 // high restitution
		);

		var verticalStick = new Physijs.BoxMesh(
			new THREE.BoxGeometry(50, 1200, 50),
			hanger_material
		);

		verticalStick.position.set(500, 625, 0);


		var horizontalStick = new Physijs.BoxMesh(
			new THREE.BoxGeometry(500, 50, 50),
			hanger_material
		);

		horizontalStick.position.set(-130, 555, 0);
		horizontalStick.__dirtyPosition = true;


		var base = new Physijs.BoxMesh(
			new THREE.BoxGeometry(1000, 50, 1000),
			hanger_material
		);

		base.position.set(200, -575, 0);

		verticalStick.add(horizontalStick);
		verticalStick.add(base);


		verticalStick.position.set(1000, 600, 1000);

		verticalStick.name = "hanger";

		return verticalStick;

	}


////----- Normal floor (no physics) ----
//function addFloor(filepath){
//    var textureloader = new THREE.TextureLoader();
//    
//    // load a resource
//    textureloader.load(filepath,
//        // Function when resource is loaded
//        function ( texture ) {
//        
//            texture.wrapS = THREE.RepeatWrapping;
//            texture.wrapT = THREE.RepeatWrapping;
//            texture.repeat.set( 10, 10 );
//        
//            // do something with the texture
//            var floorMaterial = new THREE.MeshBasicMaterial( { map: texture, side: THREE.DoubleSide, opacity: 0.5, reflectivity:0.5});
//	        var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 1, 1);
//	        var floor = new THREE.Mesh(floorGeometry, floorMaterial);
//	        floor.position.y = -0.5;
//	        floor.rotation.x = Math.PI / 2;
//	        scene.add(floor);
//        
//        },
//        
//        // Function called when download progresses
//        function ( xhr ) {
//            //console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
//        },
//            // Function called when download errors
//        function ( xhr ) {
//            console.log( 'An error happened' );
//        }
//    );
//}

}