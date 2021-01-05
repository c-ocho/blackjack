//randomcard function
var randomCard = function(decklength) {
  return Math.floor(Math.random() * decklength);  // returns a random integer from 0 to decklength not inclusive
}

//pick a card out of the deck function
var pickaCard = function(deckofcards) {
  var cardIndex = randomCard(deckofcards.length); // get a random card index
  var strCard = deckofcards[cardIndex]; //store the random card
  deckofcards.splice(cardIndex, 1); //remove the card from the deck
  return strCard; //return the card string
}

//calculate hand score
var addHand = function(playercards) {
  var numAces = 0;
  var handSum = 0;


  //sum up hand without ace correction
  for (var i = 0; i < playercards.length; i++) {
    var currentcard = 0;
    if (playercards[i].length == 3) {
      currentcard = parseInt(playercards[i][1] + playercards[i][2], 10);
    } else if (playercards[i][1] == "A") {
      currentcard = 11;
      numAces += 1;
    } else {
      currentcard = 10;
    };

    handSum += currentcard;
  };

  //correct for aces
  for (var i = 0; i < numAces; i++) {
    if (handSum > 21) {
      handSum -= 10;
    };
  };

  return handSum;

};


//input function
var promptUserHit = function() {
//return true if user hits. return flase if user holds

  //loop until valid response is returned
  while (true) {
    var strInput = prompt("Would you like to 'hold' or 'hit'?", "Type 'hold' or 'hit'.");

    //process response
    if ( (strInput == null || strInput == "") ) { //invalid response
      alert("Invalid response. Please try again.");
    } else if ((strInput.toLowerCase() != "hold" && strInput.toLowerCase() != "hit")) {
      alert("Invalid response. Please try again.");
    } else if (strInput.toLowerCase() == "hit") {
      return true;
    } else {
      return false;
    };
  }
}

var game = function(){
  //initialize variables
  var deckofcards = ["C02", "C03", "C04", "C05", "C06", "C07", "C08", "C09", "C10", "CJ", "CQ", "CK", "CA","S02", "S03", "S04", "S05", "S06", "S07", "S08", "S09", "S10", "SJ", "SQ", "SK", "SA", "D02", "D03", "D04", "D05", "D06", "D07", "D08", "D09", "D10", "DJ", "DQ", "DK", "DA", "H02", "H03", "H04", "H05", "H06", "H07", "H08", "H09", "H10", "HJ", "HQ", "HK", "HA"];

  var playercards = [pickaCard(deckofcards), pickaCard(deckofcards)];

  alert("Welcome to black jack!");
  alert("You were delt a " + playercards[0] + " and a " + playercards[1]);

  if (addHand(playercards) == 21) {
    alert("That's 21. Congrats! You won the game.");
    return;
  }

  //loop while until user holds or busts
  while (true) {
    if (promptUserHit()) {
      var deltcard = pickaCard(deckofcards);
      alert("You were delt a " + deltcard);
      playercards.push(deltcard);
      if (addHand(playercards) == 21) {
        alert("That's 21. Congrats! You won the game.");
        return;
      } else if (addHand(playercards) > 21) {
        alert("You bust. You lose the game.");
        return;
      } else {
        alert("Your hand is worth " + addHand(playercards));
      };
    } else {
      alert("Restarting game.");
      return;
    };
  };

  alert("Game restarting.");
  return;

};//end of game

function main(){
  while(true) {
    game();
  };
};

//run the main function on window open
var main = main();
window.onload = main;
