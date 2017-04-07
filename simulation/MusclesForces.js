/**
 * Created by DIMITRIOS on 9/6/2016.
 */
class MusclesForces {

    /**
     *
     * forceHelper
     *
     * Constract visualization of a force vector as a line
     *
     * @param forceName
     * @returns {THREE.Line}
     */
    constructor(muscle_name, muscle_strength){

        var fmaterial_distal = new THREE.LineBasicMaterial({color: 0x000000});
        var fgeometry_distal = new THREE.Geometry();

        fgeometry_distal.vertices.push(new THREE.Vector3(0,0,0), new THREE.Vector3(0,0,0));
        this.forceHelperLine_distal = new THREE.Line( fgeometry_distal, fmaterial_distal );
        this.forceHelperLine_distal.name = muscle_name + "_distal";

        var fmaterial_proximal = new THREE.LineBasicMaterial({color: 0x000000});
        var fgeometry_proximal = new THREE.Geometry();

        fgeometry_proximal.vertices.push(new THREE.Vector3(0,0,0), new THREE.Vector3(0,0,0));
        this.forceHelperLine_proximal = new THREE.Line( fgeometry_proximal, fmaterial_proximal );
        this.forceHelperLine_proximal.name = muscle_name + "_proximal" ;


        var fmaterial_distal_r = new THREE.LineBasicMaterial({color: 0x000000});
        var fgeometry_distal_r = new THREE.Geometry();

        fgeometry_distal_r.vertices.push(new THREE.Vector3(0,0,0), new THREE.Vector3(0,0,0));
        this.forceHelperLine_distal_r = new THREE.Line( fgeometry_distal_r, fmaterial_distal_r );
        this.forceHelperLine_distal_r.name = muscle_name + "_distal_r";

        var fmaterial_proximal_r = new THREE.LineBasicMaterial({color: 0x000000});
        var fgeometry_proximal_r = new THREE.Geometry();

        fgeometry_proximal_r.vertices.push(new THREE.Vector3(0,0,0), new THREE.Vector3(0,0,0));
        this.forceHelperLine_proximal_r = new THREE.Line( fgeometry_proximal_r, fmaterial_proximal_r );
        this.forceHelperLine_proximal_r.name = muscle_name + "_proximal_r" ;

        this.muscle_strength = muscle_strength;
    }


    /**
     *
     * Position and rotation update force helper vector
     *
     * @param bone
     * @param force_vector_rotated
     * @param offset_vector_rotated
     */
    updateForceHelper(bone, force_vector, offset_vector, activationLevel, forceHelperLine){

        forceHelperLine.geometry = new THREE.Geometry();

        // START
        var start_Vec = new THREE.Vector3().addVectors(offset_vector, bone.position);

        // END
        var end_Vec = new THREE.Vector3().addVectors(force_vector, start_Vec);

        var end_VecArrow1 = new THREE.Vector3(end_Vec.x -5, end_Vec.y, end_Vec.z);
        var end_VecArrow2 = new THREE.Vector3(end_Vec.x +5, end_Vec.y, end_Vec.z);

        // Make the geometry+
        forceHelperLine.geometry.vertices.push(start_Vec, end_Vec, end_VecArrow1, end_VecArrow2);
        forceHelperLine.material.color = new THREE.Color(this.heatMapColorforValue(Math.abs(activationLevel)));
        forceHelperLine.verticesNeedUpdate = true;


        return forceHelperLine;
    }


    /**
     *
     * applyForcesToBones
     *
     * This applies a force from distal towards proximal bone with offsets
     *
     *
     * @param bone_proximal
     * @param bone_distal
     * @param activationlevel
     * @param offset_vector_proximal
     * @param offset_vector_distal
     */
    applyForcesToBones(bone_proximal, bone_distal, offset_vector_proximal, offset_vector_distal, activationLevel, jointSphere){

        // Calcualate rotation matrices for each bone for correctly setting offset positions
        var rotation_matrix_proximal = new THREE.Matrix4().extractRotation(bone_proximal.matrix);
        var rotation_matrix_distal = new THREE.Matrix4().extractRotation(bone_distal.matrix);

        // Fix offset positions to the correct rotation of the mesh
        var offset_vector_rotated_proximal = offset_vector_proximal.clone().applyMatrix4( rotation_matrix_proximal );
        var offset_vector_rotated_distal = offset_vector_distal.clone().applyMatrix4( rotation_matrix_distal );

        if (!jointSphere) {
            // force is starting by definition from the offset of the distal. So cancel it.
            var force_vector = new THREE.Vector3().addVectors(bone_distal.position,
                offset_vector_rotated_distal);

            force_vector = force_vector.negate();

            // Now that force is starting from offset of distal and pointing always to 0,0,0. We can now point it to proximal
            force_vector = force_vector.add(bone_proximal.position);

            // Proximal has also an offset
            force_vector = force_vector.add(offset_vector_rotated_proximal);

            force_vector = force_vector.normalize().multiplyScalar(activationLevel * this.muscle_strength);
        }

        if (jointSphere) {
            var force_vector = new THREE.Vector3(0, 0, activationLevel * this.muscle_strength);
            var force_vector_distal = force_vector.clone().applyMatrix4(rotation_matrix_distal);
            var force_vector_proximal = force_vector.clone().negate().applyMatrix4(rotation_matrix_proximal);
        } else {
            var force_vector_distal = force_vector.clone();
            var force_vector_proximal = force_vector.clone().negate();
        }

        // Action distal
        bone_distal.applyForce( force_vector_distal, offset_vector_rotated_distal );
        this.updateForceHelper(bone_distal, force_vector_distal, offset_vector_rotated_distal, activationLevel, this.forceHelperLine_distal );

        // Action proximal
        bone_proximal.applyForce( force_vector_proximal, offset_vector_rotated_proximal );
        this.updateForceHelper(bone_proximal, force_vector_proximal, offset_vector_rotated_proximal, activationLevel, this.forceHelperLine_proximal );

        // if joint Sphere is null there is no sheath, the muscle directly connects two bones
        if (jointSphere) {
            var offset_vector_r = new THREE.Vector3();
            offset_vector_r.setFromMatrixPosition(jointSphere.matrixWorld);
            var averVec = new THREE.Vector3().addVectors(offset_vector_rotated_proximal, offset_vector_rotated_distal);
            offset_vector_r.add(averVec.divideScalar(2));
            //sphereInter.position.copy(offset_vector_r);
            //sphereInter.__dirtyPosition = true;

            // Reaction distal
            var force_vector_distal_r = force_vector_distal.negate();
            bone_proximal.applyForce(force_vector_distal_r, offset_vector_r.clone().sub(bone_proximal.position));
            this.updateForceHelper(bone_proximal, force_vector_distal_r, offset_vector_r.clone().sub(bone_proximal.position), activationLevel, this.forceHelperLine_distal_r);

            // Re-action proximal
            var force_vector_proximal_r = force_vector.clone().applyMatrix4(rotation_matrix_proximal);
            bone_distal.applyForce(force_vector_proximal_r, offset_vector_r.clone().sub(bone_distal.position));
            this.updateForceHelper(bone_distal, force_vector_proximal_r, offset_vector_r.clone().sub(bone_distal.position), activationLevel, this.forceHelperLine_proximal_r);
        }
    }

    /**
     *
     * Add helper force line to scene
     *
     * @param scene
     */

    addHelpers(scene){

        scene.add(this.forceHelperLine_distal);
        scene.add(this.forceHelperLine_proximal);

        scene.add(this.forceHelperLine_distal_r);
        scene.add(this.forceHelperLine_proximal_r);

    }


    /**
     *
     *  heatMapColorforValue
     *
     *  Calculate heat mappped color from a value
     *  @param value    (float from 0 to 1)
     *  @returns string
     */
    heatMapColorforValue(value){



        if (value < 0.01)
            value = 0;

        if (value > 0.99)
            value = 1;

        var h = (1.0 - value) * 240;

        return "hsl(" + h + ", 100%, 50%)";
    }
}