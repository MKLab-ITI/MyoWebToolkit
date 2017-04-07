class ExtensorsGroup {


    constructor(){

        // Fingers extent
        this.musclesForces_3F_m_d_e = new MusclesForces('force_middleFinger_middlePhalanx_distalPhalanx_extensor', 3);
        this.musclesForces_3F_p_m_e = new MusclesForces('force_middleFinger_proximalPhalanx_middlePhalanx_extensor', 4);
        this.musclesForces_3F_mc_p_e = new MusclesForces('force_middleFinger_thirdmetacarpal_proximalPhalanx_extensor', 12);

        this.musclesForces_2F_m_d_e = new MusclesForces('force_indexFinger_middlePhalanx_distalPhalanx_extensor', 3);
        this.musclesForces_2F_p_m_e = new MusclesForces('force_indexFinger_proximalPhalanx_middlePhalanx_extensor', 4);
        this.musclesForces_2F_mc_p_e = new MusclesForces('force_indexFinger_secondmetacarpal_proximalPhalanx_extensor', 12);


        this.musclesForces_4F_m_d_e = new MusclesForces('force_ringFinger_middlePhalanx_distalPhalanx_extensor', 3);
        this.musclesForces_4F_p_m_e = new MusclesForces('force_ringFinger_proximalPhalanx_middlePhalanx_extensor', 4);
        this.musclesForces_4F_mc_p_e = new MusclesForces('force_ringFinger_fourthmetacarpal_proximalPhalanx_extensor', 12);


        this.musclesForces_5F_m_d_e = new MusclesForces('force_littleFinger_middlePhalanx_distalPhalanx_extensor', 2);
        this.musclesForces_5F_p_m_e = new MusclesForces('force_littleFinger_proximalPhalanx_middlePhalanx_extensor', 2);
        this.musclesForces_5F_mc_p_e = new MusclesForces('force_littleFinger_fifthmetacarpal_proximalPhalanx_extensor', 6);


        this.musclesForces_1F_p_d_e = new MusclesForces('force_thumbFinger_proximalPhalanx_distalPhalanx_extensor', 4);
        this.musclesForces_1F_mc_p_e = new MusclesForces('force_thumbFinger_firstmetacarpal_proximalPhalanx_extensor', 12);


        // CARPI Extent
        this.musclesForces_Carpi_e_R = new MusclesForces('force_Carpi_Radius_extensor', 30);
        this.musclesForces_Carpi_e_U = new MusclesForces('force_Carpi_Ulna_extensor', 30);

        this.musclesForces_Carpi_e_1 = new MusclesForces('force_Carpi_Extensor_1', 40);
        this.musclesForces_Carpi_e_2 = new MusclesForces('force_Carpi_Extensor_2', 40);
        this.musclesForces_Carpi_e_3 = new MusclesForces('force_Carpi_Extensor_3', 40);
        this.musclesForces_Carpi_e_4 = new MusclesForces('force_Carpi_Extensor_4', 40);




    }


    addExtensorsToScene(mscene){

        this.musclesForces_3F_m_d_e.addHelpers(mscene);
        this.musclesForces_3F_p_m_e.addHelpers(mscene);
        this.musclesForces_3F_mc_p_e.addHelpers(mscene);

        this.musclesForces_2F_m_d_e.addHelpers(mscene);
        this.musclesForces_2F_p_m_e.addHelpers(mscene);
        this.musclesForces_2F_mc_p_e.addHelpers(mscene);


        this.musclesForces_4F_m_d_e.addHelpers(mscene);
        this.musclesForces_4F_p_m_e.addHelpers(mscene);
        this.musclesForces_4F_mc_p_e.addHelpers(mscene);


        this.musclesForces_5F_m_d_e.addHelpers(mscene);
        this.musclesForces_5F_p_m_e.addHelpers(mscene);
        this.musclesForces_5F_mc_p_e.addHelpers(mscene);

        this.musclesForces_1F_p_d_e.addHelpers(mscene);
        this.musclesForces_1F_mc_p_e.addHelpers(mscene);

        // Carpi Extent
        this.musclesForces_Carpi_e_R.addHelpers(mscene);
        this.musclesForces_Carpi_e_U.addHelpers(mscene);

        this.musclesForces_Carpi_e_1.addHelpers(mscene);
        this.musclesForces_Carpi_e_2.addHelpers(mscene);
        this.musclesForces_Carpi_e_3.addHelpers(mscene);
        this.musclesForces_Carpi_e_4.addHelpers(mscene);
    }

    /**
     * Carpi Extent
     *
     * @param activationLevel
     * @param musclesBonesConstraints
     */
    applyForces_CarpiExtent(activationLevel, musclesBonesConstraints){


        // Radius and Ulna to metacarpal
        this.musclesForces_Carpi_e_R.applyForcesToBones(musclesBonesConstraints.objRadius,
            musclesBonesConstraints.objCarpi,
            new THREE.Vector3(0, 25, 0),
            new THREE.Vector3(0, 25, 0),
            activationLevel,
            musclesBonesConstraints.jCarpiR
        )

        this.musclesForces_Carpi_e_U.applyForcesToBones(musclesBonesConstraints.objUlna,
            musclesBonesConstraints.objCarpi,
            new THREE.Vector3(0, 25, 0),
            new THREE.Vector3(0, 25, 0),
            activationLevel,
            musclesBonesConstraints.jCarpiU
        )



        // Carpi to metacarpal

        this.musclesForces_Carpi_e_3.applyForcesToBones(musclesBonesConstraints.objRadius,
            musclesBonesConstraints.objThirdmetacarpal,
            new THREE.Vector3(0, 25, -50),
            new THREE.Vector3(0, 25,  20),
            activationLevel,
            musclesBonesConstraints.jThirdmeta

        )


        this.musclesForces_Carpi_e_2.applyForcesToBones(musclesBonesConstraints.objRadius,
            musclesBonesConstraints.objSecondmetacarpal,
            new THREE.Vector3(0, 25, -50),
            new THREE.Vector3(0, 25,  20),
            activationLevel,
            musclesBonesConstraints.jSecondmeta
        )

        this.musclesForces_Carpi_e_4.applyForcesToBones(musclesBonesConstraints.objRadius,
            musclesBonesConstraints.objFourthmetacarpal,
            new THREE.Vector3(0, 25, -50),
            new THREE.Vector3(0, 25,  20),
            activationLevel,
            musclesBonesConstraints.jFourthmeta
        )

        this.musclesForces_Carpi_e_1.applyForcesToBones(musclesBonesConstraints.objRadius,
            musclesBonesConstraints.objFifthmetacarpal,
            new THREE.Vector3(0, 25, -50),
            new THREE.Vector3(0, 25,  20),
            activationLevel,
            musclesBonesConstraints.jFifthmeta
        )

    }


    /**
     * Extensors Apply Forces
     *
     *
     * @param activationLevel
     * @param musclesBonesConstraints
     */
     applyForces_FingersExtent(activationLevel, activationLevelSmallF, musclesBonesConstraints){

        // --------------- FINGERS EXTENSORS  ------

        // 3rd finger
        this.musclesForces_3F_mc_p_e.applyForcesToBones(musclesBonesConstraints.objThirdmetacarpal,
            musclesBonesConstraints.objMiddleFproximal,
            new THREE.Vector3(0, 8, 0),
            new THREE.Vector3( 0, 8, 0),
            activationLevel,
            musclesBonesConstraints.jMFp);


        this.musclesForces_3F_p_m_e.applyForcesToBones(musclesBonesConstraints.objMiddleFproximal,
            musclesBonesConstraints.objMiddleFmiddle,
            new THREE.Vector3(0, 5, 0),
            new THREE.Vector3( 0, 5, 0),
            activationLevel,
            musclesBonesConstraints.jMFm);


        this.musclesForces_3F_m_d_e.applyForcesToBones(musclesBonesConstraints.objMiddleFmiddle,
            musclesBonesConstraints.objMiddleFdistal,
            new THREE.Vector3( 0, 3, 0),
            new THREE.Vector3( 0, 3, 0),
            activationLevel,
            musclesBonesConstraints.jMFd);

        // 2nd
        this.musclesForces_2F_mc_p_e.applyForcesToBones(musclesBonesConstraints.objSecondmetacarpal,
            musclesBonesConstraints.objIndexFproximal,
            new THREE.Vector3(0, 8, 0),
            new THREE.Vector3( 0, 8, 0),
            activationLevel,
            musclesBonesConstraints.jIFp);


        this.musclesForces_2F_p_m_e.applyForcesToBones(musclesBonesConstraints.objIndexFproximal,
            musclesBonesConstraints.objIndexFmiddle,
            new THREE.Vector3(0, 5, 0),
            new THREE.Vector3( 0, 5, 0),
            activationLevel,
            musclesBonesConstraints.jIFm);


        this.musclesForces_2F_m_d_e.applyForcesToBones(musclesBonesConstraints.objIndexFmiddle,
            musclesBonesConstraints.objIndexFdistal,
            new THREE.Vector3( 0, 3, 0),
            new THREE.Vector3( 0, 3, 0),
            activationLevel,
            musclesBonesConstraints.jIFd);


        // ======== 4nd finger ======================

        this.musclesForces_4F_mc_p_e.applyForcesToBones(musclesBonesConstraints.objFourthmetacarpal,
            musclesBonesConstraints.objRingFproximal,
            new THREE.Vector3(0, 8,  0),
            new THREE.Vector3( 0, 8, 0),
            activationLevel,
            musclesBonesConstraints.jRFp);


        this.musclesForces_4F_p_m_e.applyForcesToBones(musclesBonesConstraints.objRingFproximal,
            musclesBonesConstraints.objRingFmiddle,
            new THREE.Vector3(0, 5, 0),
            new THREE.Vector3( 0, 5, 0),
            activationLevel,
            musclesBonesConstraints.jRFd);


        this.musclesForces_4F_m_d_e.applyForcesToBones(musclesBonesConstraints.objRingFmiddle,
            musclesBonesConstraints.objRingFdistal,
            new THREE.Vector3( 0, 3, 0),
            new THREE.Vector3( 0, 3, 0),
            activationLevel,
            musclesBonesConstraints.jRFd);

//    // ======== 5th finger ======================

        this.musclesForces_5F_mc_p_e.applyForcesToBones(musclesBonesConstraints.objFifthmetacarpal,
            musclesBonesConstraints.objLittleFproximal,
            new THREE.Vector3(0, 8, 0),
            new THREE.Vector3( 0, 8, 0),
            activationLevelSmallF,
            musclesBonesConstraints.jLFp);


        this.musclesForces_5F_p_m_e.applyForcesToBones(musclesBonesConstraints.objLittleFproximal,
            musclesBonesConstraints.objLittleFmiddle,
            new THREE.Vector3(0, 5, 0),
            new THREE.Vector3( 0, 5, 0),
            activationLevelSmallF,
            musclesBonesConstraints.jLFm);


        this.musclesForces_5F_m_d_e.applyForcesToBones(musclesBonesConstraints.objLittleFmiddle,
            musclesBonesConstraints.objLittleFdistal,
            new THREE.Vector3( 0, 3, 0),
            new THREE.Vector3( 0, 3, 0),
            activationLevelSmallF,
            musclesBonesConstraints.jLFd);


        ////=============== 1st Finger ===========================
        this.musclesForces_1F_mc_p_e.applyForcesToBones(musclesBonesConstraints.objFirstmetacarpal,
            musclesBonesConstraints.objThumbFproximal,
            new THREE.Vector3(0, 8, 0),
            new THREE.Vector3( 0, 8, 0),
            activationLevel,
            musclesBonesConstraints.jTFp);


        this.musclesForces_1F_p_d_e.applyForcesToBones(musclesBonesConstraints.objThumbFproximal,
            musclesBonesConstraints.objThumbFdistal,
            new THREE.Vector3( 0, 6, 0),
            new THREE.Vector3( 0, 6, 0),
            activationLevel,
            musclesBonesConstraints.jTFd);


    }

}