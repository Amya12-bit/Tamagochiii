//https://github.com/tugcecerit/Tamagotchi-Game game van tugcecerit
//https://www.w3schools.com/js/js_whereto.asp


class Tamagotchi {
  constructor(name) {
    this.name = name; //houdt dingen georganiseerd per object
    this.hunger = 100;
    this.sleepiness = 100;
    this.boredom = 100;
    this.age = 0;
  }

  decreaseStats() {
    this.hunger -= 5;
    this.sleepiness -= 5;
    this.boredom -= 5;
    updateBars(this.hunger, this.sleepiness, this.boredom);
    checkGameOver();
  }

  increaseHunger() {
    this.hunger = Math.min(100, this.hunger + 10);
    updateBars(this.hunger, this.sleepiness, this.boredom);  
  }

  increaseSleepiness() {
    this.sleepiness = Math.min(100, this.sleepiness + 10);
    updateBars(this.hunger, this.sleepiness, this.boredom);
  }

  increaseBoredom() {
    this.boredom = Math.min(100, this.boredom + 10);
    updateBars(this.hunger, this.sleepiness, this.boredom);
  }

  ageUp() {
    this.age++;
    document.getElementById("age").textContent = this.age;
  }
} //https://developer.mozilla.org/fr/docs/Learn_web_development/Core/Scripting/Math

let pet; //Variabele die kan veranderen (zoals leeftijd)
const pic = document.getElementById("greeting"); //Variabele die nooit verandert (zoals je naam)
const hungerBar = document.getElementById("hungerlevel");
const sleepinessBar = document.getElementById("sleepinesslevel");
const boredomBar = document.getElementById("boredomlevel");
const nameShow = document.querySelector(".nameclass");
const dogLeaves = document.querySelector(".dogleavesyou");
const byeImg = document.querySelector(".bye");
const happyAudio = document.getElementById("audio");
const sadAudio = document.getElementById("audio2");

let intervalStats;
let intervalAge;


document.querySelector(".start").addEventListener("click", () => {  //HTML element pakken om mee te werken
  const name = prompt("Name your dog:");                            //Luisteren naar clicks, toetsaanslagen, etc.
  pet = new Tamagotchi(name);
  document.querySelector(".start").remove();
  nameShow.textContent = `${name}'s World!`;
 
  document.querySelector(".sleep").style.display = "inline-block";
  document.querySelector(".eat").style.display = "inline-block";
  document.querySelector(".play").style.display = "inline-block";

  document.querySelector(".hungerbar").style.display = "block";
  document.querySelector(".sleepinessbar").style.display = "block";
  document.querySelector(".boredombar").style.display = "block";
  document.querySelector(".hungerbarname").style.display = "block";
  document.querySelector(".sleepinessbarname").style.display = "block";
  document.querySelector(".boredombarname").style.display = "block";
  document.querySelector(".ageclass").style.display = "block";

  intervalStats = setInterval(() => pet.decreaseStats(), 5000);
  intervalAge = setInterval(() => pet.ageUp(), 20000);
});


document.querySelector(".eat").addEventListener("click", () => {
  pet.increaseHunger();
  pic.src = "image/fooddog.png";
});

document.querySelector(".sleep").addEventListener("click", () => {
  pet.increaseSleepiness();
  pic.src = "image/sleepydog.png";
});

document.querySelector(".play").addEventListener("click", () => {  //dit is ook een korte version en sneller
  pet.increaseBoredom();
  pic.src = "image/speeldog.png";
});

//Groep instructies met een naam, voorkomen herhaling van code
function updateBars(hunger, sleepiness, boredom) {
  hungerBar.style.width = `${hunger}%`;  // Claude heeft hiermee laten zien hoe je dit korter kan schrijven
  sleepinessBar.style.width = `${sleepiness}%`;
  boredomBar.style.width = `${boredom}%`;

  setBarColor(hungerBar, hunger);
  setBarColor(sleepinessBar, sleepiness);
  setBarColor(boredomBar, boredom);
}

function setBarColor(bar, value) {
  if (value > 50) {
    bar.style.backgroundColor = "#2BC253";
  } else if (value > 30) {    //Meerdere keuzes maken (als dit, anders als dat...)
    bar.style.backgroundColor = "orange";
  } else {
    bar.style.backgroundColor = "red";
  }
}

function checkGameOver() {
  if (pet.hunger <= 0 || pet.sleepiness <= 0 || pet.boredom <= 0) {
    clearInterval(intervalStats);
    clearInterval(intervalAge);

  dogLeaves.style.display = "block"; // zorgt dat de tekst verschijnt
  dogLeaves.textContent = "Game Over, Your dog left!";

  byeImg.style.display = "block"; 
  pic.src = "image/dogleaves.png";

  document.body.classList.add("gameover");

  document.querySelector(".sleep").disabled = true;
  document.querySelector(".eat").disabled = true;
  document.querySelector(".play").disabled = true;
  }
}



