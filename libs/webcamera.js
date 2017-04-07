function setOnOffCameraSwitch(show_video_controller){
    show_video_controller.onChange(function(value) { 
    
        var options_camera = { 
            video:true, 
            audio:false 
        };    


        if(navigator.webkitGetUserMedia!=null) { 

            navigator.webkitGetUserMedia(options_camera, 
                function(stream) { 
                    var video = document.querySelector('video'); 
                    video.src = window.URL.createObjectURL(stream); 

                    if (value){

                    } else{
                        video.pause();
                        video.src="";
                    }

                }, 
                function(e) { 
                    alert("You need to allow webcam access for this page");
                    console.log("There was a problem with webkitGetUserMedia"); 
                } 
            ); 

        }
    }); 
}