
// Loader
var texture_loader = new THREE.TextureLoader();

// --- Ground Material Physics ----
// var ground_material = Physijs.createMaterial(
// 			new THREE.MeshLambertMaterial({ map: texture_loader.load( 'img/rocks.jpg' ) }),
// 			.8, // high friction
// 			.4 // low restitution
// 		);

// ground_material.map.wrapS = ground_material.map.wrapT = THREE.RepeatWrapping;
// ground_material.map.repeat.set( 3, 3 );


//------- Box Material Physics --------
// var box_material = Physijs.createMaterial(
// 			new THREE.MeshLambertMaterial({ map: texture_loader.load( 'img/plywood.jpg' ) }),
// 			.4, // low friction
// 			.6 // high restitution
// 		);

// box_material.map.wrapS = ground_material.map.wrapT = THREE.RepeatWrapping;
// box_material.map.repeat.set( .25, .25 );




// Material for the Intersection plane
var planematerial =  new THREE.MeshLambertMaterial( {color: 0xbbbbbb, transparent: true, opacity: 0.25, side: THREE.DoubleSide, depthWrite: false} );


var bonematerial =  new THREE.MeshLambertMaterial( {color: 0xffffff, transparent: true, opacity: 0.5, side: THREE.DoubleSide, depthWrite: false} );
var materialMuscles03 = new THREE.MeshLambertMaterial({color: 0xff0000, transparent: true, opacity: 0.3,  side: THREE.DoubleSide, depthWrite: false});
var materialMuscles08 = new THREE.MeshLambertMaterial({color: 0xff0000, transparent: true, opacity: 0.2,  side: THREE.DoubleSide, depthWrite: false});
var myoMaterial =  new THREE.MeshLambertMaterial({color: 0x000000, transparent: true, opacity: 0.4,  side: THREE.DoubleSide, depthWrite: false});
var myoMaterialInterpolated =  new THREE.MeshLambertMaterial({color: 0x000000, transparent: true, opacity: 0.05,  side: THREE.DoubleSide, depthWrite: false});




