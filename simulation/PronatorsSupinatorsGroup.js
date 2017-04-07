class PronatorsSupinatorsGroup {


    constructor(){

        // FINGERS FLEX
        this.musclesForces_Supination = new MusclesForces('force_supination', 30);
        this.musclesForces_PronationHigh = new MusclesForces('force_pronation_high', 30);
        this.musclesForces_PronationLow = new MusclesForces('force_pronation_low', 250);
    }


    addSupinatorsPronatorsToScene(mscene){

        // Fingers Flex
        this.musclesForces_Supination.addHelpers(mscene);
        this.musclesForces_PronationHigh.addHelpers(mscene);
        this.musclesForces_PronationLow.addHelpers(mscene);
    }


    applyForces_Pronation(activationLevel, musclesBonesConstraints){
        this.musclesForces_PronationHigh.applyForcesToBones(musclesBonesConstraints.objHumerus,
            musclesBonesConstraints.objRadius,
            new THREE.Vector3(-40, -20, -70),
            new THREE.Vector3(40, 0, 0),
            activationLevel,
            null
        )


        this.musclesForces_PronationLow.applyForcesToBones(musclesBonesConstraints.objRadius,
            musclesBonesConstraints.objUlna,
            new THREE.Vector3(   0,     -20, -80),
            new THREE.Vector3(  -50,    -20, -90),
            activationLevel,
            null
        )
    }



    applyForces_Supination(activationLevel, musclesBonesConstraints) {
        this.musclesForces_Supination.applyForcesToBones(musclesBonesConstraints.objHumerus,
            musclesBonesConstraints.objRadius,
            new THREE.Vector3( 40,  -10, -110),
            new THREE.Vector3(-10,   0,    50),
            activationLevel,
            null
        )
    }







}