var counter = 0; // counts how many times the button has been pressed correctly 
var time = 1200;
var currentIndex = -1;
var newCall = true;

function checkTime() {
    // ---- For Counter > 5
    if(i > 5){
    time = 1000;
    }
    // ---- For Counter > 9
    if(i > 9){
    time = 500;   
    }
    // ---- For Counter > 13
    if(i > 13){
    time = 300;
    }
} // not used, but updates time

var arrFunc = [green, red, yellow, blue]; // holds the four functions

var sequence = []; // array which will store sequence of colors user will click

var started = false; // allows us to run the start button

if(started == false) {
 $("#button1").css("pointer-events", "none");
 $("#button2").css("pointer-events", "none"); 
 $("#button3").css("pointer-events", "none");
 $("#button4").css("pointer-events", "none");
}

$("#start").click(function() {
  if(started == false){
  
    $("#message").html("");
    changePointersAuto();
    playSequence(); 
    started = true;
   $("#startlabel").html("Restart");
    
  } else if(started == true){
    
        i = 0; // we reset the index of the sequence
        sequence = []; // clear the sequence array
        newCall = true;
        
        
        setTimeout(playSequence, 500);
     
  }
 
    
  
  
});
  

// ------------------ Strict Mode

var strictMode = false;

$("#strict").click(function (){
  
  if(strictMode == false){
    strictMode = true;
    $("#strict").css("background-color", "red");
    console.log("Strict Mode On");
  } else if (strictMode == true){
    strictMode = false;
    $("#strict").css("background-color", "yellow");
    console.log("Strict Mode Off");
  }
  
});

// ------------------ Main Functionality

// adds a step a.k.a. a color
function addColor() {
  
            newCall = false; 
            counter = 0; // resets the counter so that when clicking occurs, it can count up correctly
            currentIndex = -1; // reset the current index, we check from the beginning
            var random = Math.floor(Math.random() * (4 - 0)) + 0; // finds random number from [0, 4)
            sequence.push(arrFunc[random]); // adds that function to our tracker sequence
     
}

var i = 0;   

// runs when starting or adding a new step
function playSequence(){ // should start playing back the sequence
    
      checkTime(); // checks and updates time, but it doesn't work. not sure why.  
      
      if(newCall == true){
        addColor();      
      }          
  
      currentIndex++; // the index that we are currently checking to be correct at the button press
      i++; // increments i
     
      setTimeout(function(){
        if(newCall == false){   
          replay();
        }
      }, time/2);
  
      updateAndCheckWinner(); 
}
   
// updates the level display & checks if i == 20, which is when there is a winner, and resets everything
function updateAndCheckWinner(){   
  
  $("#level").html(i);
  
  if(i == 20){
    if(strictMode == true){
    $("#message").html("You won on Strict Mode! What a pro! <br> Hit Start to play again.");
    } else {
    $("#message").html("You won! Good job!<br> Hit Start to play again.<br> Try Strict Mode for more of a challenge.");
    }
    $("#startlabel").html("Start");
    
    winnerSound();
    setTimeout(function(){
        
        changePointersAuto();
        i = 0; // we reset the index of the sequence
        sequence = []; // clear the sequence array
        newCall = true;
        started = false; // allows start to be pressed again and begin the sequence
    
      
    }, 300)
    
  } 
 
  
} 
 
var j = 0;

function replay(){
  
            // adjust time based on current level  
            // ---- For Counter > 5
            if(i > 5){
            time = 800;
            }
            // ---- For Counter > 9
            if(i > 9){
            time = 600;   
            }
            // ---- For Counter > 13
            if(i > 13){
            time = 400;
            }

            changePointersNone(); // disable clicking
  
            counter = 0; // resets the counter so that when clicking occurs, it can count up correctly
  
            sequence[j](); // runs the function at index j
          
            j++; // increments j
  
            if(j < sequence.length){ // keeps going until the sequence runs out of functions
            
            setTimeout(replay, time); // calls itself again

          } else if( j == sequence.length){
            changePointersAuto(); // enable clicking 
            return j = 0;
          }  
  
}    
 
// ---------------- Pointer Events

function changePointersNone(){
  
 $("#button1").css("pointer-events", "none");
 $("#button2").css("pointer-events", "none"); 
 $("#button3").css("pointer-events", "none");
 $("#button4").css("pointer-events", "none");
 $("#start").css("pointer-events", "none");
 $("#strict").css("pointer-events", "none");

 
   
} //disables clicking on the colors

function changePointersAuto(){
  
 $("#button1").css("pointer-events", "auto");
 $("#button2").css("pointer-events", "auto"); 
 $("#button3").css("pointer-events", "auto");
 $("#button4").css("pointer-events", "auto");  
 $("#start").css("pointer-events", "auto");
 $("#strict").css("pointer-events", "auto"); 
} //restores clicking on the colors

// ----------------- User Clicks
       
$("#button1").click(function () {
  
  if(sequence[currentIndex] == green){
       
    green(); // plays the animation to give user visual confirmation that they clicked 
    counter++; //increments tracking counter
    currentIndex++; //increments the index at which to check, usually the final item in sequence array
    
    if(counter == sequence.length){ // we can add another step to the game
    newCall = true;
    setTimeout(playSequence, 500);
    }
    
  } else if(sequence[currentIndex] != green && strictMode == false){
    
    wrongSound(); // plays error sound
    currentIndex = 0; //resets index
    counter = 0; // resets counter
    setTimeout(replay, 1500); // replays sequence after 100 milliseconds
   
    
  } else if(sequence[currentIndex] != green && strictMode == true){
    
    wrongSound();
    i = 0; // we reset the index of the sequence
    sequence = []; // clear the sequence array
    newCall = true;
    setTimeout(playSequence, 100); // go to beginning as when start button is pressed
    
    
  }

  j = 0;
  
});

$("#button2").click(function () {

 if(sequence[currentIndex] == red){
   
    red();
   
    counter++;
    currentIndex++;
   
    if(counter == sequence.length){
    newCall = true;
    setTimeout(playSequence, 500);
    }
   
  } else if(sequence[currentIndex] != red && strictMode == false){
    
    wrongSound();
    
    currentIndex = 0;
    counter = 0;
    setTimeout(replay, 1500);
   
  } else if(sequence[currentIndex] != red && strictMode == true){
    
    wrongSound();
    i = 0;
    sequence = [];     
    newCall = true;
    setTimeout(playSequence, 100);
    
    
  }

  j = 0;

});

$("#button3").click(function () {
  
   if(sequence[currentIndex] == yellow){
     
    yellow();
       
    counter++;
    currentIndex++;

    if(counter == sequence.length){
    newCall = true;
    setTimeout(playSequence, 500);
    }
     
  } else if(sequence[currentIndex] != yellow && strictMode == false){
    
    wrongSound();
    
    currentIndex = 0;
    counter = 0;
    setTimeout(replay, 1500);
    
  } else if(sequence[currentIndex] != yellow && strictMode == true){
    
    wrongSound();
    i = 0;
    sequence = [];     
    newCall = true;
    setTimeout(playSequence, 100);   
  }

  j = 0;
 
});

$("#button4").click(function () {
 
  
  if(sequence[currentIndex] == blue){
    
   blue();
        
    counter++;
    currentIndex++;

    if(counter == sequence.length){
    newCall = true;
    setTimeout(playSequence, 500);
    }
    
  } else if(sequence[currentIndex] != blue && strictMode == false){
    
    wrongSound();
    
    currentIndex = 0;
    counter = 0;
    setTimeout(replay, 1500);
    
  } else if(sequence[currentIndex] != blue && strictMode == true){
    
    wrongSound();
    i = 0;
    sequence = [];     
    newCall = true;
    setTimeout(playSequence, 100);
    
  }

  j = 0;

});

//------------------------ Color Animation Functions

function green(){
  $("#button1").css("opacity","1.0");
  greenSound();
  
  setTimeout(function (){
    $("#button1").css("opacity","0.5");
  }, 300);
  
}

function red(){
  $("#button2").css("opacity","1.0");
  redSound();
  setTimeout(function (){
    $("#button2").css("opacity","0.5");
  }, 300);
  
}

function yellow(){
  $("#button3").css("opacity","1.0");
  yellowSound();
  setTimeout(function (){
    $("#button3").css("opacity","0.5");
  }, 300);
  
}

function blue(){
  $("#button4").css("opacity","1.0");
  blueSound();
  setTimeout(function (){
    $("#button4").css("opacity","0.5");
  }, 300);
  
}


// ------------- Sounds



function greenSound() {
var audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
audio.play();
}

function redSound() {
var audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
audio.play();
}

function yellowSound() {
var audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
audio.play();
}

function blueSound() {
var audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
audio.play();
}

function wrongSound() {
var audio = new Audio('http://danielbonnells.com/wrongbuzzer.mp3');
audio.play();
}

function winnerSound() {
var audio = new Audio('http://danielbonnells.com/winding.mp3');
audio.play();
}

// -------------- Testing
function testing(){
  strictMode = false;
  i = 20;
  setTimeout(
  updateAndCheckWinner, 100);
  
}
//testing();