/**
 * Created by DIMITRIOS on 9/6/2016.
 */
class StorageData {


    static getMuscleShortNames () {

        var muscleOrderByMyoStart = ['brachioradialis',
                                     'Hum. hea. lef. pro. ter.',
                                     'Uln. hea. lef. pro. ter.',
                                     'ext. car. rad. lon.',
                                     'supinator',
                                     'ext. car. rad. bre.',
                                     'ext. dig.',
                                     'ext. dig. min.',
                                     'ext. car. uln.',
                                     'Uln. hea. lef. fle. car. uln.',
                                     'Hum. hea. lef. fle. car. uln.',
                                     'fle. dig. pro.',
                                     'palmaris longus',
                                     'fle. dig. sup.',
                                     'fle. car. rad.'];


        return muscleOrderByMyoStart;
    }


    static fmuscle(mname){
        return this.getMuscleShortNames().indexOf(mname);
    }

    static getBonesFNs() {

        var bonesFNs = [
            "FJ6373_BP21817_FMA23131_Left humerus_c.obj",
            "FJ6396_BP21809_FMA23468_Left ulna_c.obj",
            "FJ6349_BP21750_FMA23465_Left radius_c.obj",

            "FJ3299_BP22657_FMA23940_Middle phalanx of left middle finger_c.obj",
            "FJ3313_BP20245_FMA71915_Proximal phalanx of left index finger_c.obj",
            "FJ3317_BP21939_FMA71916_Proximal phalanx of left ring finger_c.obj",
            "FJ3291_BP23924_FMA23942_Middle phalanx of left ring finger_c.obj",
            "FJ3318_BP21907_FMA65470_Proximal phalanx of left thumb_c.obj",
            "FJ3183_BP19564_FMA23953_Distal phalanx of left index finger_c.obj",
            "FJ3296_BP23918_FMA23938_Middle phalanx of left index finger_c.obj",
            "FJ3188_BP21923_FMA23951_Distal phalanx of left thumb_c.obj",
            "FJ3297_BP20201_FMA23944_Middle phalanx of left little finger_c.obj",
            "FJ3186_BP23915_FMA23955_Distal phalanx of left middle finger_c.obj",
            "FJ3314_BP23837_FMA66791_Proximal phalanx of left little finger_c.obj",
            "FJ3184_BP20191_FMA23959_Distal phalanx of left little finger_c.obj",
            "FJ3187_BP19712_FMA23957_Distal phalanx of left ring finger_c.obj",
            //"FJ3276_BP21678_FMA24442_Left pisiform_c.obj",
            //"FJ3261_BP21667_FMA24449_Left hamate_c.obj",
            //"FJ3285_BP21671_FMA24440_Left triquetral_c.obj",
            //"FJ3278_BP19645_FMA24436_Left scaphoid_c.obj",
            //"FJ6379_BP21780_FMA24438_Left lunate_c.obj",
            //"FJ6393_BP21682_FMA24444_Left trapezium_c.obj",
            //"FJ3284_BP21753_FMA24445_Left trapezoid_c.obj",
            "FJ3316_BP20067_FMA71908_Proximal phalanx of left middle finger_c.obj",
            "FJ3240_BP47306_FMA24465_Left first metacarpal bone_c.obj",
            "FJ3243_BP47313_FMA24467_Left second metacarpal bone_c.obj",
            "FJ3246_BP47367_FMA24469_Left third metacarpal bone_c.obj",
            "FJ3249_BP47352_FMA24471_Left fourth metacarpal bone_c.obj",
            "FJ3252_BP47203_FMA24473_Left fifth metacarpal bone_c.obj",
            //"FJ6368_BP46719_FMA24447_Left capitate_c.obj"
            "palmcubein.obj",
            "palmcubeout.obj",
            "carpi.obj"
        ];

        return bonesFNs;
    }


    static getBoneVol(boneName) {


        var bonesVols =
        {
            "humerus": 155.67,
            "ulna": 38.31,
            "radius": 39.70,
            "scaphoid": 1.59,
            "lunate": 1.24,
            "capitate": 2.37,
            "trapezoid": 0.81,
            "trapezium": 1.51,
            "hamate": 1.79,
            "triquetral": 1.00,
            "pisiform": 0.44,
            "thirdmetacarpal": 5.55,
            "middleFproximal": 3.06,
            "middleFmiddle": 1.14,
            "middleFdistal": 0.35,
            "secondmetacarpal": 5.76,
            "indexFproximal": 2.06,
            "indexFmiddle": 0.83,
            "indexFdistal": 0.36,
            "firstmetacarpal": 4.18,
            "thumbFproximal": 1.78,
            "thumbFdistal": 0.71,
            "fourthmetacarpal": 3.61,
            "ringFproximal": 2.29,
            "ringFmiddle": 0.99,
            "ringFdistal": 0.22,
            "fifthmetacarpal": 3.37,
            "littleFproximal": 1.50,
            "littleFmiddle": 0.55,
            "littleFdistal": 0.22,
            "carpi": 20,
            "palmcubein":0.1,
            "palmcubeout":0.1
        };


        for (var key in bonesVols) {
            bonesVols[key] = bonesVols[key] / 1000;
        }

        return bonesVols[boneName];
    }


    static getMusclesFNs() {

        var musclesFNs = [
            "FJ1475M_BP21034_FMA38471_Left flexor digitorum superficialis.obj",      //1
            "FJ1487M_BP22692_FMA38487_Left brachioradialis.obj",                     //2
            "FJ1489M_BP21466_FMA38499_Left extensor carpi radialis brevis3.obj",     //3
            "FJ1490M_BP21025_FMA38496_Left extensor carpi radialis longus.obj",      //4
            "FJ1491M_BP20761_FMA38505_Left extensor digiti minimi.obj",              //5
            "FJ1492M_BP20968_FMA38502_Left extensor digitorum.obj",                  //6
            "FJ1496M_BP21056_FMA38461_Left flexor carpi radialis.obj",               //7
            "FJ1497M_BP20781_FMA38480_Left flexor digitorum profundus.obj",          //8
            "FJ1502M_BP20803_FMA38464_Left palmaris longus.obj",                     //9
            "FJ1516M_BP23252_FMA38563_Ulnar head of left pronator teres.obj",        //10
            "FJ1518M_BP23310_FMA38620_Ulnar head of left flexor carpi ulnaris.obj", // prob rotate  //11
            "FJ1472M_BP21003_FMA38508_Left extensor carpi ulnaris2.obj",                  //12
            "FJ1473M_BP23267_FMA38618_Humeral head of left flexor carpi ulnaris.obj",  //13
            "FJ1474M_BP23211_FMA38561_Humeral head of left pronator teres.obj",        //14
            "FJ1505M_BP20882_FMA38514_Left supinator.obj"                              //15
        ];

        return musclesFNs;
    }


    static getMuscleVol(muscleName) {

        var musclesVols =
        {
            "brachioradialis": 78.83,              // 0
            "Hum. hea. lef. pro. ter.": 12.20,     // 1
            "Uln. hea. lef. pro. ter.": 5.56,      // 2
            "ext. car. rad. lon.": 24.62,          // 3
            "supinator": 11.22,                    // 4
            "ext. car. rad. bre.": 20.01,          // 5
            "ext. dig.": 29.84,                    // 6
            "ext. dig. min.": 7.8,                 // 7
            "ext. car. uln.": 10.65,               // 8
            "Uln. hea. lef. fle. car. uln.": 20.11,// 9
            "Hum. hea. lef. fle. car. uln.": 25.73,// 10
            "fle. dig. pro.": 53.48,               // 11
            "palmaris longus": 16.88,              // 12
            "fle. dig. sup.": 16.21,               // 13
            "fle. car. rad.": 20.98                // 14
        };


        //for (var key in musclesVols) {
        //    musclesVols[key] = musclesVols[key] / 1000;
        //}

        return muscleVols[boneName];
    }


    getMusclesToForcesCorrelation(){







    }
}