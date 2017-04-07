<h1>MyoWebToolkit</h1>

[![Data Recording Video](https://img.youtube.com/vi/l4TJm5KGKdI/maxresdefault.jpg)](https://www.youtube.com/watch?v=l4TJm5KGKdI)


1. What is it?
 
    This is a series of tools for Myo to do the following: 
    
    - Remote data recording
    - Visualization of data 
    - Simulation of hand gestures
    - A toolkit to do research on EMG, Muscles, Forces, Bone movements, Hand gestures
    
    - and more at: <br />
        Dimitrios Ververidis, Sotirios Karavarsamis, Spiros Nikolopoulos, and Ioannis Kompatsiaris. 2016. Pottery gestures style comparison by exploiting Myo sensor and forearm anatomy. In Proceedings of the 3rd International Symposium on Movement and Computing (MOCO '16). ACM, New York, NY, USA, , Article 3 , 8 pages. DOI: https://doi.org/10.1145/2948910.2948924
    
    
    
    
    
    
    
2. Requirements

    - Server
         You need both Apache server and Node.js server
         - Download XAMPP
         - Download Node.js

    - Client
         - You need a Chrome browser
         - You need a Myo device


2. How to install?

    Server:
    - Copy everything to a path visible to web or your local client
    - Install Apache server and run it
    - Install Node.js server and run "StartNodeServer.bat"

     

    
3. How to use?

    - Simulation
        - Wear Myo 
        - Open Chrome browser and type: <br />
          <b>http://serverurl/index.html</b> <br />
          where serverurl is your server path.
        - Make hand gestures
            
    - Data Recording
        - Wear Myo
        - Open Chrome browser and type:<br />
          <b>http://serverurl:3000/indexRecording.html</b> <br />
         where serverurl is your server path.
        - Write a nickname <br /> 
        - Make hand gestures <br />
        - Find your data at recordings/data_[mynickname].txt

4. How to extend?
    
    - Use phpstorm and connect to this repo at github
    - Upload your modifications
    - Follow any tasks assigned here


5. Contact 

    Dimitrios Ververidis,<br />
    ververid@iti.gr, <br />
    Centre for Research and Technology Hellas <br />
    Information Technologies Institute <br />
    Multimedia, Knowledge and Social Media analytics lab <br />
    http://mklab.iti.gr


<b>Release Notes</b>  

* 0.7 Publish at Github : 06/04/2017 
* 0.61 DB recorder : 05/04/2017
* 0.6 Code tide up : 19/02/2016
* 0.5 Joints added : 18/02/2016
* 0.4 Integrated with Myo : 02/02/2016


<b>Acknowledgements</b>

Bones models are retrieved from: 

Mitsuhashi, N., Fujieda, K., Tamura, T.,
Kawamoto, S., Takagi, T., and Okubo, K.
BodyParts3D: 3D structure database for
anatomical concepts. Nucleic acids research 37,
suppl 1 (2009), D782–D785.

<br />

The research leading to these results has received funding
from the:
 
European Union 7th Framework Programme
(FP7/2011-9) under grant agreement 600676
corresponding to project i-Treasures, “Intangible Treasures
\- Capturing the Intangible Cultural Heritage and
Learning the Rare Know-How of Living Human Treasures”,
http://i-treasures.eu.

