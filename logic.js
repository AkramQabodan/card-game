"use strict";
const cardsContainer = document.getElementById("cards-container");
const hint = document.getElementById("hint");
const playAgain = document.getElementById("play-again");
const playAgain2 = document.getElementById("play-again2");
const count = document.getElementById("count");
const win = document.getElementById("win");
const playAgainButtons = document.querySelectorAll(".play-again");

//duation of the flip
let duration = 500;
//duration of no clicking
let noClickDuration = 1000;
//displaying hint counter
let hintCount = 3;
count.innerText = hintCount;
let numberOfCards = 12;
let won = false;
console.log(count);

//select cards
let cards = [...cardsContainer.children];
console.log(cards);
//shuffle function
const shuffle = (originalArray) => {
  let array = [...originalArray];
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

//disable clicking function
const disableClicking = () => {
  cardsContainer.classList.add("no-clicking");
  hint.classList.add("no-clicking");
  playAgain.classList.add("no-clicking");
  setTimeout(() => {
    hint.classList.remove("no-clicking");
    playAgain.classList.remove("no-clicking");
    cardsContainer.classList.remove("no-clicking");
  }, noClickDuration);
};

//check match function
const checkMatch = (card1, card2) => {
  if (card1.dataset.number === card2.dataset.number) {
    card1.classList.remove("is-flipped");
    card2.classList.remove("is-flipped");
    card1.classList.add("perma-flipped");
    card2.classList.add("perma-flipped");
    let permaCardsNumber = [...document.getElementsByClassName("perma-flipped")]
      .length;
    if (permaCardsNumber === numberOfCards) {
      console.log("hi");
      win.style.display = "flex";
      won = true;
    }
  } else {
    setTimeout(() => {
      card1.classList.remove("is-flipped");
      card2.classList.remove("is-flipped");
    }, duration);
  }
};
console.log([...cards.keys()]);
//add random order to cards
cards.forEach((card, index) => {
  //select range of keys
  let orderRange = [...cards.keys()];
  let shuffled_order = shuffle(orderRange);
  //adding the card randomly
  card.style.order = shuffled_order[index];
  //adding event onclick to flip
  card.addEventListener("click", () => {
    flipCard(card);
  });
});

//flip card
const flipCard = (card) => {
  //add class is-filpped
  card.classList.add("is-flipped");

  //select all flipped cards
  let allFlippedCards = [...document.getElementsByClassName("is-flipped")];
  console.log(allFlippedCards);
  //if 2 or more selected
  if (allFlippedCards.length === 2) {
    console.log("2 card and selected");
    //disable clicking
    disableClicking();
    //check matching
    // console.log(...allFlippedCards);
    checkMatch(...allFlippedCards);
  }
};
// hint button event listner
hint.addEventListener("click", () => {
  disableClicking();
  let allFlippedCards = [...document.getElementsByClassName("is-flipped")];
  let allNotFlippedCards = [...document.getElementsByClassName("card")];
  allFlippedCards.forEach((el) => {
    el.classList.remove("is-flipped");
  });
  allNotFlippedCards.forEach((el) => {
    if (hintCount > 0) {
      el.classList.add("is-flipped");
      setTimeout(() => {
        el.classList.remove("is-flipped");

        console.log(hintCount);
      }, duration);
    }
  });
  hintCount--;
  if (hintCount >= 0) {
    count.innerText = hintCount;
  }
});

// Play again button

playAgainButtons.forEach((el) => {
  el.addEventListener("click", () => {
    hintCount = 3;
    count.innerText = hintCount;
    let allFlippedCards = [...document.getElementsByClassName("perma-flipped")];
    allFlippedCards.forEach((el) => {
      el.classList.remove("perma-flipped");
    });
    disableClicking();
    setTimeout(() => {
      cards.forEach((card, index) => {
        //select range of keys
        let orderRange = [...cards.keys()];
        let shuffled_order = shuffle(orderRange);
        //adding the card randomly
        card.style.order = shuffled_order[index];
      });
    }, duration);
    if (won) {
      win.style.display = "none";
    }
  });
});
