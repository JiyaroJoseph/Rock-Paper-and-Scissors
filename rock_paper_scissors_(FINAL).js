

let score = JSON.parse(localStorage.getItem('score')) || { wins: 0, losses: 0, draws: 0 };
updated_score();



function playgame(playerMove){
  let result= " ";
  let computer= computer_move();

  if (playerMove === "rock"){
    if (computer === "rock"){
      result= "It's a Draw"
    }

    else if (computer === "paper"){
      result= 'You Lost'
    }
    
    else if (computer === "scissors"){
      result= 'You Won'
    }
  }


  else if (playerMove === "paper"){
    if (computer === "rock"){
      result= 'You Won'
    }

    else if (computer === "paper"){
      result= "It's a Draw"
    }
    
    else if (computer === "scissors"){
      result= 'You Lost'
    }
  }


  if (playerMove === "scissors"){
    if (computer === "rock"){
      result= 'You Lost'
    }

    else if (computer === "paper"){
      result= 'You Won'
    }
    
    else if (computer === "scissors"){
      result= "It's a Draw"
    } 
  }




if (result=== 'You Won'){
  score.wins += 1
}
else if (result=== 'You Lost'){
  score.losses += 1
}
else if (result=== "It's a Draw"){
  score.ties += 1
}

localStorage.setItem('score', JSON.stringify(score));
updated_score();





// #### HOW TO SUBSTITUTE VALUES ( ${ } ) FOR IMAGES   #####    
document.querySelector('.outcome').innerHTML = result;
document.querySelector('.moves').innerHTML = `You picked:- <img src="images/${playerMove}-emoji.png" 
  class="playerMove-img">   Computer picked:- <img src="images/${computer}-emoji.png"
  class="computerMove-img"> `;
}





function updated_score(){
  document.querySelector('.current-scores')
    .innerHTML= `Wins: ${score.wins} <br> Draws: ${score.draws} <br> Losses: ${score.losses}`;
}





function computer_move(){
  const no= Math.random()
  let comp = " "

  if ( no>= 0 && no< 1/3 ){
    comp = 'rock'
  }

  else if ( no>= 1/3 && no< 2/3 ){
    comp = 'scissors'
  }

  else if ( no>= 2/3 && no< 1 ){
    comp = 'paper'
  }

  return comp
}





let isautoplaying= false;            // VARIABLE TO CHECK IF AUTO PLAY IS ON...INITIALLY WE GIVE IT FALSE 

let interval_ID;         // DECLARING A VARIABLE FOR ID....setInterval provides an ID every time it runs

function autoplay(){

  if (!isautoplaying){                      // i.e. !False= True.....SO BELOW STATEMENTS WILL RUN
    interval_ID= setInterval( function(){

    const playerMove= computer_move();
    playgame(playerMove);

    }, 800);
    isautoplaying= true;                  // NOW AUTO PLAY IS ON
  } 

  /*###########  HERE FN STOPS AND RETURNS TO THE FUNCTION CALL IN HTML....BUT IN BACKGROUND 
  /############  THE AUTO PLAY IS STILL RUNNING....AND SECOND TIME WHEN U ONCLICK THE BUTTON,
  /############  THE FN IS CALLED AGAIN BUT THIS TIME isautoplaying variable is true (FROM THE LAST TIME)
  /############  SO THE ELSE BLOCK WILL RUN AND THE WHOLE SYSTEM STOPS  */


  else{        
    clearInterval(interval_ID);         // THIS WILL STOP THE AUTO PLAY
    isautoplaying= false; 
  }

}




document.body.addEventListener('keydown', (event)=> {    // addEventListener in JS is same as 
                                                  // onclick in HTML....1st value is fn, 2nd is fn (here arrowfn) 
if (event.key === 'r' || event.key === 'R'){
playgame('rock');
}
else if (event.key === 'p' || event.key === 'P'){
playgame('paper');
}
else if (event.key === 's' || event.key === 'S'){
playgame('scissors');
}
else if (event.key === 'a' || event.key === 'A'){
autoplay();
}

})




const rst= document.querySelector(".reset-button");
rst.addEventListener('click', ()=> {
  clearInterval(interval_ID);         // THIS WILL STOP THE AUTO PLAY IF RESET BUTTON PRESSED IN BETWEEN
  isautoplaying= false;

});
