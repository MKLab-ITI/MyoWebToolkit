class DeviatorsGroup {


    constructor(){

        // FINGERS FLEX
        this.musclesForces_Uln_dev = new MusclesForces('force_ulnar_deviation', 20);
        this.musclesForces_Rad_dev = new MusclesForces('force_radial_deviation', 30);
    }


    addDeviatorsToScene(mscene){

        // Fingers Flex
        this.musclesForces_Uln_dev.addHelpers(mscene);
        this.musclesForces_Rad_dev.addHelpers(mscene);
    }


    applyForces_RadialDeviation(activationLevel, musclesBonesConstraints) {
        this.musclesForces_Rad_dev.applyForcesToBones(musclesBonesConstraints.objRadius,
            musclesBonesConstraints.objCarpi,
            new THREE.Vector3(40, 0, 0),
            new THREE.Vector3(40, 0, 0),
            activationLevel,
            musclesBonesConstraints.jCarpiR
        )
    }


    applyForces_UlnarDeviation(activationLevel, musclesBonesConstraints){
        this.musclesForces_Uln_dev.applyForcesToBones(musclesBonesConstraints.objUlna,
            musclesBonesConstraints.objCarpi,
            new THREE.Vector3(-40, 0, 0),
            new THREE.Vector3(-40, 0, 0),
            activationLevel,
            musclesBonesConstraints.jCarpiU
        )
    }




}