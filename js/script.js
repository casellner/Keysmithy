let roundTime = 5; // Time to type words. Set to 60 when done debugging.
let roundStarted = false;
let activeResource = "rock"; // Resource selected to gather.

// Elements on page
const timeElement = document.getElementById('time-element');
const rockImg = document.getElementById('rock-img');
const inputLabel = document.getElementById('input-label');
const mainInput = document.getElementById('main-input');

// Define random words to type
let randomWord;
const words = [
    "and", "are", "for", "you", "not", "the", "all", "new", "was", "can",
    "has", "but", "our", "one", "may", "out", "use", "any", "see", "his",
    "who", "now", "get", "how", "its", "top", "had", "day", "two", "buy",
    "her", "add", "jan", "she", "set", "map", "way", "off", "did", "car",
    "own", "end", "him", "per", "big", "law", "art", "usa", "old", "non",
    "why", "low", "man", "job", "too", "men", "box", "air", "yes", "hot",
    "say", "dec", "san", "tax", "got", "let", "act", "red", "key", "few",
    "age", "oct", "pay", "war", "nov", "fax", "yet", "sun", "run", "net",
    "put", "try", "god", "log", "faq", "fun", "sep", "lot", "ask", "due",
    "mar", "pro", "aug", "ago", "apr", "via", "bad", "far", "jun", "oil"
];

class Resource {
    #amount = 0;       // start with 0 of each resource
    #gatherRate = 1;   // initially, collect 1 at a time
    #upgradeCost = 10; // cost to upgrade pick or axe

    constructor(name) {
        this.name = name; // resource name
    }

    collectResource() {
        this.#amount += this.#gatherRate;
        document.getElementById(`num-${this.name}`).innerHTML = this.#amount; // update HTML counter
        showElement(document.getElementById(`${this.name}-resource-div`)) // Show resource if hidden
    }

    /*
    increaseGatherRate() {
        if (this.#amount >= this.#upgradeCost) {
            this.#amount -= this.#upgradeCost; // spend resources
            this.#gatherRate += 1;             // increase gather rate
            this.#upgradeCost += 10;           // next upgrade costs more
            document.getElementById(`${this.name}-cost`).innerHTML = this.#upgradeCost;
            document.getElementById(`num-${this.name}`).innerHTML = this.#amount;
            generateRandomWord(); // generate new, longer word
        }
    }
        */

    getGatherRate() {
        return this.#gatherRate;
    }
}

let rock = new Resource("rock");
let wood = new Resource("wood");

/**
 * Wait for a period of time.
 *
 * @param {number} ms - Time to wait in milliseconds.
 *
 * @example
 * await sleep(2000);
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function generateRandomWord() {
    let rand = Math.floor(Math.random() * words.length); // generate a random integer from 0 to words.length (a valid element of words array)
    randomWord = words[rand];

    inputLabel.innerHTML = randomWord;
}

async function timer() {
    for (let i = roundTime; i > 0; i--) {
        console.log(i);
        timeElement.innerHTML = i;
        await sleep(1000);
    }
    timeElement.innerHTML = 0; // Show that time is out
    showElement(modal);
}

function showElement(element) {
    element.classList.remove("hidden");
    element.style.setProperty('animation', '2s fade-in');
}

async function hideElement(element) {
    element.style.setProperty('animation', '2s fade-out');
    await sleep(2000);
    element.classList.add("hidden");
}

/*
async function hideWelcomeArticle() {
    // hide welcome article
    welcomeArticle.style.setProperty('animation', '2s fade-out');
    await sleep(2000);
    welcomeArticle.hidden = true;

    // show rock article
    rockArticle.hidden = false;
    rockArticle.style.setProperty('animation', '2s fade-in')
    rockInput.focus();
}
    */

/*
function toggleResource() {
    if (activeResource === "rock") {
        activeResource = "wood";
        woodArticle.hidden = false;
        rockArticle.hidden = true;
        woodInput.focus();
    } else {
        activeResource = "rock";
        rockArticle.hidden = false;
        woodArticle.hidden = true;
        rockInput.focus();
    }

    generateRandomWord();
    //console.log(activeResource);
}
    */

/*
function upgradePick() {
    rock.increaseGatherRate();
}

function upgradeAxe() {
    wood.increaseGatherRate();
}
    */

// prepare game environment
generateRandomWord(); // generate first word

// event listeners for detecting correct input and keystrokes

/*
welcomeInput.addEventListener('input', function () {
    if (this.value === "I love typing!") {
        hideWelcomeArticle();
    }
})
    */

mainInput.addEventListener('input', function () {
    if (this.value === randomWord) { // if the user typed the word correctly
        console.log("Nice! You typed:", this.value);
        this.value = ''; // Reset input
        rock.collectResource();
        generateRandomWord();
    }
});

/*
woodInput.addEventListener('input', function () {
    if (this.value === randomWord) { // if the user typed the word correctly
        console.log("Nice! You typed:", this.value);
        this.value = ''; // Reset input
        wood.collectResource();
        generateRandomWord();
    }
});
*/

window.addEventListener("keydown", () => {
    /*
    if (rockInput === document.activeElement) {
        rockImg.src = "./public/rock_pressed.png";
    } else if (woodInput == document.activeElement) {
        woodImg.src = "./public/rock_pressed.png";
    }
        */
    rockImg.src = "./public/rock_pressed.png";
    
    // If the round hasn't started (timer isn't counting down), start it
    if (!roundStarted) {
        roundStarted = true;
        timer();
    }
});

window.addEventListener("keyup", () => {
    rockImg.src = "./public/rock_idle.png";
    //woodImg.src = "./public/rock_idle.png"
});

// TODO: focus trap modal
// Logic for modals
const modal = document.getElementById("modal");
const ContinueBtn = document.getElementById("continue-btn");

ContinueBtn.addEventListener("click", () => {
    hideElement(modal);
    roundStarted = false;
});

// Close when clicking outside the modal content
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.add("hidden");
    }
});
