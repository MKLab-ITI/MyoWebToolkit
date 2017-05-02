//--------------------- ToDos: Put 8 carpial bones if you find good constraints  ------------------------------------
// The behaviour of physijs was not good at 2016.

//////-------- Scaphoid -------
////var objScaphoid = getObjByNameB(rbonesObjs, 'scaphoid');
////scene.add(objScaphoid);
////
////setBoneToPosAndConstraint(objScaphoid, objRadius, new THREE.Vector3(515, 611, 998), // Position
////                                new THREE.Vector3(1.5 * M_PI, -0.2*M_PI , M_PI), // Rotation
////                                new THREE.Vector3(515, 615, 998), //   Constraint
////                                carpialHingeL,  //   ConstraintLimitsUpper
////                                -carpialHingeL,  //   ConstraintLimitsLower
////                                'hinge', new THREE.Vector3(1,0,0), 0x0000ff
////);
////
////////-------- lunate -------
////var objLunate = getObjByNameB(rbonesObjs, 'lunate');
////scene.add(objLunate);
////
////setBoneToPosAndConstraint(objLunate, objUlna, new THREE.Vector3(535, 612, 1000), // Position
////    new THREE.Vector3(1.5 * M_PI, -0.2*M_PI , M_PI), // Rotation
////    new THREE.Vector3(535, 617, 1000), //   Constraint
////    carpialHingeL, -carpialHingeL, 'hinge', new THREE.Vector3(1,0,0), 0x0000ff);
////
////////////------------- Lunate with Scaphoid constraint --------------
////plainHingeConstraint(objLunate, objScaphoid,
////    new THREE.Vector3(525, 610, 1000), //   Constraint
////    carpialHingeL, -carpialHingeL, 0x0000ff, new THREE.Vector3(0, 1, 0));
////
////plainHingeConstraint(objUlna, objRadius,
////    new THREE.Vector3(525, 630, 1000), //   Constraint
////    carpialHingeL*4, -carpialHingeL*4, 0x0000ff, new THREE.Vector3(0, 1, 0));
////
//////////////------- Capitate -------------------------------
////var objCapitate = getObjByNameB(rbonesObjs, 'capitate');
////scene.add(objCapitate);
////
////setBoneToPosAndConstraint(objCapitate, objScaphoid, new THREE.Vector3(523, 600, 1000), // Position
////    new THREE.Vector3(1.5 * M_PI, 0 , M_PI), // Rotation
////    new THREE.Vector3(531, 603, 1000), //   Constraint
////    carpialHingeL,  //   ConstraintLimitsUpper
////    -carpialHingeL,  //   ConstraintLimitsUpper
////    'hinge', new THREE.Vector3(1,0,0), 0x0000ff
////);
////
////////------------ Capitate to Lunate constraint --------------------------------------
////plainHingeConstraint(objCapitate, objLunate,
////    new THREE.Vector3(515, 603, 1000), //   Constraint
////    carpialHingeL,  //   ConstraintLimitsUpper
////    -carpialHingeL,  //   ConstraintLimitsUpper
////    0x0000ff, new THREE.Vector3(1, 0, 0)
////);
////
//////////------- Trapezoid -------------------------------
////var objTrapezoid = getObjByNameB(rbonesObjs, 'trapezoid');
////scene.add(objTrapezoid);
////
////setBoneToPosAndConstraint(objTrapezoid, objScaphoid, new THREE.Vector3(510, 595, 1000), // Position
////    new THREE.Vector3(1.5 * M_PI, 0 , M_PI), // Rotation
////    new THREE.Vector3(512, 598, 1000), 0, 0, 'hinge', new THREE.Vector3(1,0,0), 0x0000ff
////);
////
//////
////////------------ Trapezoid to Capitate constraint ------------------
////plainHingeConstraint( objTrapezoid, objCapitate ,
////    new THREE.Vector3(517, 593, 1000), //   Constraint
////    carpialHingeL, -carpialHingeL, 0x0000ff, new THREE.Vector3(0, 1, 0)
////);
////
////
////
////
////
//////////------- Trapezium -------------------------------ssss
////var objTrapezium = getObjByNameB(rbonesObjs, 'trapezium');
////scene.add(objTrapezium);
////
////setBoneToPosAndConstraint(objTrapezium, objScaphoid, new THREE.Vector3(490, 585, 1000), // Position
////    new THREE.Vector3(1.5 * M_PI,  0, 0*M_PI), // Rotation
////    new THREE.Vector3(500, 600, 1000), 0, 0, 'hinge', new THREE.Vector3(1, 1, 1), 0x00ffff
////);
////
////////------ Trapezium to Trapezoid constraint ------------
////plainHingeConstraint( objTrapezoid, objTrapezium ,
////    new THREE.Vector3(501, 589, 1000), 0, 0, 0xff00ff, new THREE.Vector3(0, 1, 0)
////);
////
////
////
////////////---------- Hamate -------------------------------
////var objHamate = getObjByNameB(rbonesObjs, 'hamate');
////scene.add(objHamate);
////
////setBoneToPosAndConstraint(objHamate, objLunate, new THREE.Vector3(537, 595, 1000), // Position
////    new THREE.Vector3(1.5 * M_PI, 0 , M_PI), // Rotation
////    new THREE.Vector3(538, 605, 1000), //   Constraint
////    carpialHingeL,
////    -carpialHingeL,
////    'hinge', new THREE.Vector3(1,0,0), 0x0000ff
////);
////
////////-------- Hamate to Capitate constraint ------------------
////plainHingeConstraint( objHamate, objCapitate,
////    new THREE.Vector3(530, 593, 1000), //   Constraint
////    0.1,
////    -0.1,
////    0x0000ff, new THREE.Vector3(0, 1, 0)
////);
////
////////
//////////---------- Triquetral  -------------------------------
////var objTriquetral = getObjByNameB(rbonesObjs, 'triquetral');
////scene.add(objTriquetral);
////
////setBoneToPosAndConstraint(objTriquetral, objLunate, new THREE.Vector3(545, 602, 1000), // Position
////    new THREE.Vector3(1.5 * M_PI, 0 , M_PI), // Rotation
////    new THREE.Vector3(542, 609, 1000), //   Constraint
////    carpialHingeL,
////    -carpialHingeL,
////    'hinge', new THREE.Vector3(1,0,0), 0x0000ff
////);
////
////////-------- Triquetral to Hamate constraint ------------------
////plainHingeConstraint( objTriquetral, objHamate,
////    new THREE.Vector3(542, 597, 1000), //   Constraint
////    carpialHingeL,
////    -carpialHingeL,
////    0x0000ff, new THREE.Vector3(0, 1, 0)
////);
////
//////
//////////---------- Pisiform  -------------------------------
////var objPisiform = getObjByNameB(rbonesObjs, 'pisiform');
////scene.add(objPisiform);
////
////setBoneToPosAndConstraint(objPisiform, objTriquetral, new THREE.Vector3(545, 600, 988), // Position
////    new THREE.Vector3(1.5 * M_PI, 0 , M_PI), // Rotation
////    new THREE.Vector3(542, 600, 992), //   Constraint
////    carpialHingeL,
////    -carpialHingeL,
////    'hinge', new THREE.Vector3(1,0,0), 0x0000ff
////);
////


//this.setHingeConstraint(objThirdmetacarpal, objCapitate, new THREE.Vector3(525, 586, 1000), 0, 0, new THREE.Vector3(1,0,0));
//setBoneToPosAndConstraint(objSecondmetacarpal, objTrapezoid, new THREE.Vector3(510, 552, 1000), // Position
//    new THREE.Vector3(1.5 * M_PI, 0 , M_PI), // Rotation
//    new THREE.Vector3(510, 590, 1000), 0, 0, 'hinge', 'x', 0x0000ff);
////setBoneToPosAndConstraint(objFirstmetacarpal, objTrapezium, new THREE.Vector3(490, 560, 1000), // Position
////    new THREE.Vector3(1.5 * M_PI, 0 , M_PI), // Rotation
////    new THREE.Vector3(490, 588, 1000), //   Constraint
////    0, 0, 'hinge', 'x', 0x0000ff
//setBoneToPosAndConstraint(objFourthmetacarpal, objHamate, new THREE.Vector3(537, 555, 1000), // Position
//    new THREE.Vector3(1.5 * M_PI, 0 , M_PI), // Rotation
//    new THREE.Vector3(537, 585, 1000), //   Constraint
//    0, 0, 'hinge', 'x', 0x0000ff
//);

//setBoneToPosAndConstraint(objFifthmetacarpal, objHamate, new THREE.Vector3(548, 561, 1000), // Position
//    new THREE.Vector3(1.5 * M_PI, 0 , M_PI), // Rotation
//    new THREE.Vector3(548, 589, 1000), //   Constraint
//    0, 0, 'hinge', 'x', 0x0000ff
//);