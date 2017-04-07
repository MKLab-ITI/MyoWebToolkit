class FlexorsGroup {


    constructor(){

        // FINGERS FLEX
        this.musclesForces_3F_m_d_f = new MusclesForces('force_middleFinger_middlePhalanx_distalPhalanx_flexor', 2);
        this.musclesForces_3F_p_m_f = new MusclesForces('force_middleFinger_proximalPhalanx_middlePhalanx_flexor', 8);
        this.musclesForces_3F_mc_p_f = new MusclesForces('force_middleFinger_thirdmetacarpal_proximalPhalanx_flexor', 16);

        this.musclesForces_2F_m_d_f = new MusclesForces('force_indexFinger_middlePhalanx_distalPhalanx_flexor', 2);
        this.musclesForces_2F_p_m_f = new MusclesForces('force_indexFinger_proximalPhalanx_middlePhalanx_flexor', 8);
        this.musclesForces_2F_mc_p_f = new MusclesForces('force_indexFinger_secondmetacarpal_proximalPhalanx_flexor', 16);


        this.musclesForces_4F_m_d_f = new MusclesForces('force_ringFinger_middlePhalanx_distalPhalanx_flexor', 2);
        this.musclesForces_4F_p_m_f = new MusclesForces('force_ringFinger_proximalPhalanx_middlePhalanx_flexor', 8);
        this.musclesForces_4F_mc_p_f = new MusclesForces('force_ringFinger_fourthmetacarpal_proximalPhalanx_flexor', 16);


        this.musclesForces_5F_m_d_f = new MusclesForces('force_littleFinger_middlePhalanx_distalPhalanx_flexor', 1);
        this.musclesForces_5F_p_m_f = new MusclesForces('force_littleFinger_proximalPhalanx_middlePhalanx_flexor', 5);
        this.musclesForces_5F_mc_p_f = new MusclesForces('force_littleFinger_fifthmetacarpal_proximalPhalanx_flexor', 11);


        this.musclesForces_1F_p_d_f = new MusclesForces('force_thumbFinger_proximalPhalanx_distalPhalanx_flexor', 5);
        this.musclesForces_1F_mc_p_f = new MusclesForces('force_thumbFinger_firstmetacarpal_proximalPhalanx_flexor', 15);

        // CARPI FLEX
        this.musclesForces_Carpi_f_R = new MusclesForces('force_Carpi_Radius', 20);
        this.musclesForces_Carpi_f_U = new MusclesForces('force_Carpi_Ulna', 20);

        this.musclesForces_Carpi_f_1 = new MusclesForces('force_Carpi_Flexor_1', 30);
        this.musclesForces_Carpi_f_2 = new MusclesForces('force_Carpi_Flexor_2', 30);
        this.musclesForces_Carpi_f_3 = new MusclesForces('force_Carpi_Flexor_3', 30);
        this.musclesForces_Carpi_f_4 = new MusclesForces('force_Carpi_Flexor_4', 30);


    }


    addFlexorsToScene(mscene){

        // Fingers Flex
        this.musclesForces_3F_m_d_f.addHelpers(mscene);
        this.musclesForces_3F_p_m_f.addHelpers(mscene);
        this.musclesForces_3F_mc_p_f.addHelpers(mscene);

        this.musclesForces_2F_m_d_f.addHelpers(mscene);
        this.musclesForces_2F_p_m_f.addHelpers(mscene);
        this.musclesForces_2F_mc_p_f.addHelpers(mscene);


        this.musclesForces_4F_m_d_f.addHelpers(mscene);
        this.musclesForces_4F_p_m_f.addHelpers(mscene);
        this.musclesForces_4F_mc_p_f.addHelpers(mscene);


        this.musclesForces_5F_m_d_f.addHelpers(mscene);
        this.musclesForces_5F_p_m_f.addHelpers(mscene);
        this.musclesForces_5F_mc_p_f.addHelpers(mscene);

        this.musclesForces_1F_p_d_f.addHelpers(mscene);
        this.musclesForces_1F_mc_p_f.addHelpers(mscene);

        // Carpi Flex
        this.musclesForces_Carpi_f_R.addHelpers(mscene);
        this.musclesForces_Carpi_f_U.addHelpers(mscene);

        this.musclesForces_Carpi_f_1.addHelpers(mscene);
        this.musclesForces_Carpi_f_2.addHelpers(mscene);
        this.musclesForces_Carpi_f_3.addHelpers(mscene);
        this.musclesForces_Carpi_f_4.addHelpers(mscene);

    }


    applyForces_CarpiFlex(activationLevel, musclesBonesConstraints){

        this.musclesForces_Carpi_f_R.applyForcesToBones(musclesBonesConstraints.objRadius,
                musclesBonesConstraints.objCarpi,
                new THREE.Vector3(0, -25, 0),
                new THREE.Vector3(0, -25, 0),
                activationLevel,
                musclesBonesConstraints.jCarpiR
        )


        this.musclesForces_Carpi_f_U.applyForcesToBones(musclesBonesConstraints.objUlna,
            musclesBonesConstraints.objCarpi,
            new THREE.Vector3(0, -25, 0),
            new THREE.Vector3(0, -25, 0),
            activationLevel,
            musclesBonesConstraints.jCarpiU
        )


        this.musclesForces_Carpi_f_3.applyForcesToBones(musclesBonesConstraints.objRadius,
            musclesBonesConstraints.objThirdmetacarpal,
            new THREE.Vector3(0, -25, 0),
            new THREE.Vector3(0, -25, 0),
            activationLevel,
            musclesBonesConstraints.jThirdmeta
        )

        this.musclesForces_Carpi_f_2.applyForcesToBones(musclesBonesConstraints.objRadius,
            musclesBonesConstraints.objSecondmetacarpal,
            new THREE.Vector3(0, -25, -50),
            new THREE.Vector3(0, -25,  20),
            activationLevel,
            musclesBonesConstraints.jSecondmeta
        )

        this.musclesForces_Carpi_f_4.applyForcesToBones(musclesBonesConstraints.objRadius,
            musclesBonesConstraints.objFourthmetacarpal,
            new THREE.Vector3(0, -25, -50),
            new THREE.Vector3(0, -25,  20),
            activationLevel,
            musclesBonesConstraints.jFourthmeta
        )

        this.musclesForces_Carpi_f_1.applyForcesToBones(musclesBonesConstraints.objRadius,
            musclesBonesConstraints.objFifthmetacarpal,
            new THREE.Vector3(0, -25, -50),
            new THREE.Vector3(0, -25,  20),
            activationLevel,
            musclesBonesConstraints.jFifthmeta
        )
    }


    applyForces_FingersFlex(activationLevel, musclesBonesConstraints){

        // 3rd finger
        this.musclesForces_3F_mc_p_f.applyForcesToBones(musclesBonesConstraints.objThirdmetacarpal,
            musclesBonesConstraints.objMiddleFproximal,
            new THREE.Vector3(0, - 8, 0),
            new THREE.Vector3( 0, - 8, 0),
            activationLevel,
            musclesBonesConstraints.jMFp);


        this.musclesForces_3F_p_m_f.applyForcesToBones(musclesBonesConstraints.objMiddleFproximal,
            musclesBonesConstraints.objMiddleFmiddle,
            new THREE.Vector3(0, - 5,  0),
            new THREE.Vector3( 0, - 5,  0),
            activationLevel,
            musclesBonesConstraints.jMFm);


        this.musclesForces_3F_m_d_f.applyForcesToBones(musclesBonesConstraints.objMiddleFmiddle,
            musclesBonesConstraints.objMiddleFdistal,
            new THREE.Vector3( 0, - 3, 0),
            new THREE.Vector3( 0, - 3, 0),
            activationLevel,
            musclesBonesConstraints.jMFd);

        // ======== 2nd finger ======================

        this.musclesForces_2F_mc_p_f.applyForcesToBones(musclesBonesConstraints.objSecondmetacarpal,
            musclesBonesConstraints.objIndexFproximal,
            new THREE.Vector3(0, - 8, 0),
            new THREE.Vector3( 0, - 8, 0),
            activationLevel,
            musclesBonesConstraints.jIFp);


        this.musclesForces_2F_p_m_f.applyForcesToBones(musclesBonesConstraints.objIndexFproximal,
            musclesBonesConstraints.objIndexFmiddle,
            new THREE.Vector3(0, - 5, 0),
            new THREE.Vector3( 0, - 5, 0),
            activationLevel,
            musclesBonesConstraints.jIFm);


        this.musclesForces_2F_m_d_f.applyForcesToBones(musclesBonesConstraints.objIndexFmiddle,
            musclesBonesConstraints.objIndexFdistal,
            new THREE.Vector3( 0, - 3, 0),
            new THREE.Vector3( 0, - 3, 0),
            activationLevel,
            musclesBonesConstraints.jIFd);


        // ======== 4nd finger ======================

        this.musclesForces_4F_mc_p_f.applyForcesToBones(musclesBonesConstraints.objFourthmetacarpal,
            musclesBonesConstraints.objRingFproximal,
            new THREE.Vector3(0, - 8, 0),
            new THREE.Vector3( 0, - 8, 0),
            activationLevel,
            musclesBonesConstraints.jRFp);


        this.musclesForces_4F_p_m_f.applyForcesToBones(musclesBonesConstraints.objRingFproximal,
            musclesBonesConstraints.objRingFmiddle,
            new THREE.Vector3(0, - 5, 0),
            new THREE.Vector3( 0, - 5, 0),
            activationLevel,
            musclesBonesConstraints.jRFm);


        this.musclesForces_4F_m_d_f.applyForcesToBones(musclesBonesConstraints.objRingFmiddle,
            musclesBonesConstraints.objRingFdistal,
            new THREE.Vector3( 0, - 3, 0),
            new THREE.Vector3( 0, - 3, 0),
            activationLevel,
            musclesBonesConstraints.jRFd);

    // ======== 5th finger ======================

        this.musclesForces_5F_mc_p_f.applyForcesToBones(musclesBonesConstraints.objFifthmetacarpal,
            musclesBonesConstraints.objLittleFproximal,
            new THREE.Vector3(0, - 8, 0),
            new THREE.Vector3( 0, - 8,  0),
            activationLevel,
            musclesBonesConstraints.jLFp);


        this.musclesForces_5F_p_m_f.applyForcesToBones(musclesBonesConstraints.objLittleFproximal,
            musclesBonesConstraints.objLittleFmiddle,
            new THREE.Vector3(0, - 7, 0),
            new THREE.Vector3( 0, - 7, 0),
            activationLevel,
            musclesBonesConstraints.jLFm);


        this.musclesForces_5F_m_d_f.applyForcesToBones(musclesBonesConstraints.objLittleFmiddle,
            musclesBonesConstraints.objLittleFdistal,
            new THREE.Vector3( 0, - 3, 0),
            new THREE.Vector3( 0, - 3, 0),
            activationLevel,
            musclesBonesConstraints.jLFd);


        //=============== 1st Finger ===========================
        this.musclesForces_1F_mc_p_f.applyForcesToBones(musclesBonesConstraints.objFirstmetacarpal,
            musclesBonesConstraints.objThumbFproximal,
            new THREE.Vector3(0, - 8, 0),
            new THREE.Vector3( 0, - 8, 0),
            activationLevel,
            musclesBonesConstraints.jTFp);


        this.musclesForces_1F_p_d_f.applyForcesToBones(musclesBonesConstraints.objThumbFproximal,
            musclesBonesConstraints.objThumbFdistal,
            new THREE.Vector3( 0, - 5, 0),
            new THREE.Vector3( 0, - 5, 0),
            activationLevel,
            musclesBonesConstraints.jTFd);

    }

}