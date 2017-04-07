/**
 * Created by DIMITRIOS on 4/7/2016.
 */


// Shoulder
Mousetrap.bind('a', function() { musclesBonesConstraints.objShoulder.rotation.x += 0.05; });
Mousetrap.bind('d', function() { musclesBonesConstraints.objShoulder.rotation.x -= 0.05; });
Mousetrap.bind('w', function() { musclesBonesConstraints.objShoulder.rotation.y += 0.1; });
Mousetrap.bind('s', function() { musclesBonesConstraints.objShoulder.rotation.y -= 0.1; });
Mousetrap.bind('e', function() { musclesBonesConstraints.objShoulder.rotation.z += 0.05; });
Mousetrap.bind('q', function() { musclesBonesConstraints.objShoulder.rotation.z -= 0.05; });
// Fingers Flex
Mousetrap.bind(']', function() {if (activLevel_FingersFlex < 1)
        activLevel_FingersFlex += 0.01;
    }
);
// Fingers De-Flex
Mousetrap.bind('[', function() { if (activLevel_FingersFlex>=0.01)
        activLevel_FingersFlex -= 0.01;
    else
        activLevel_FingersFlex = 0;
    }
);

// Fingers Extent
Mousetrap.bind('\'', function() {if (activLevel_FingersExtent < 1)
        activLevel_FingersExtent += 0.01;
    }
);
// Fingers De-extent
Mousetrap.bind(';', function() {
    if (activLevel_FingersExtent >= 0.01)
        activLevel_FingersExtent -= 0.01;
    else
        activLevel_FingersExtent = 0;

});


//Carpi Flex
Mousetrap.bind('>', function() {
    if (activLevel_CarpiFlex < 1)
        activLevel_CarpiFlex += 0.01;
});

//Carpi De-Flex
Mousetrap.bind('<', function() {
    if (activLevel_CarpiFlex > 0)
        activLevel_CarpiFlex -= 0.01;
});

//Carpi Extent
Mousetrap.bind('n', function() {
    if (activLevel_CarpiExtent < 1)
        activLevel_CarpiExtent += 0.01;}
);

//Carpi  DeExtent
Mousetrap.bind('b', function() {
    if (activLevel_CarpiExtent > 0)
        activLevel_CarpiExtent -= 0.01;
});




// '6'    DeExtent
Mousetrap.bind('6', function() {
    if (activLevel_UlnarDeviation > 0)
        activLevel_UlnarDeviation -= 0.01;
});

// '7'    Extent
Mousetrap.bind('7', function() {
    if (activLevel_UlnarDeviation < 1)
        activLevel_UlnarDeviation += 0.01;
});

// '8'    DeExtent
Mousetrap.bind('8', function() {
    if (activLevel_RadialDeviation > 0)
        activLevel_RadialDeviation -= 0.01;
});

// '9'    Extent
Mousetrap.bind('9', function() {
    if (activLevel_RadialDeviation < 1)
        activLevel_RadialDeviation += 0.01;
});



// '2'    De-pronation
Mousetrap.bind('2', function() {
    if (activLevel_Pronation > 0)
        activLevel_Pronation -= 0.01;}
);

// '3'    Pronation
Mousetrap.bind('3', function() {
    if (activLevel_Pronation < 1)
        activLevel_Pronation += 0.01;
});

// '4'    De-supination
Mousetrap.bind('4', function() {
    if (activLevel_Supination > 0)
        activLevel_Supination -= 0.01;
});

// '5'    Supination
Mousetrap.bind('5', function() {
    if (activLevel_Supination < 1)
        activLevel_Supination += 0.01;
});


document.addEventListener(
    'keydown',
    function (ev) {
        console.log("FF FE CF CE UD RD PR SU", activLevel_FingersFlex, activLevel_FingersExtent, activLevel_CarpiFlex, activLevel_CarpiExtent,
            activLevel_UlnarDeviation, activLevel_RadialDeviation, activLevel_Pronation, activLevel_Supination);
        musclesBonesConstraints.objShoulder.__dirtyRotation = true;
    }
);