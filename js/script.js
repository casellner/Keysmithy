// Elements on page
const welcomeArticle = document.getElementById('welcome-article');
const rockArticle = document.getElementById('rock-article');
const woodArticle = document.getElementById('wood-article');
const rockImg = document.getElementById('rock-img');
const woodImg = document.getElementById('wood-img');
const rockLabel = document.getElementById('rock-input-label');
const woodLabel = document.getElementById('wood-input-label');
const welcomeInput = document.getElementById('welcome-input');
const rockInput = document.getElementById('rock-input');
const woodInput = document.getElementById('wood-input');

const shop = document.getElementById('div-shop');


// Define random words to type
let randomWord;
const words = [
    [
        "a", "b", "c", "d", "e", "f", "g",
        "h", "i", "j", "k", "l", "m", "n",
        "o", "p", "q", "r", "s", "t", "u",
        "v", "w", "x", "y", "z"
    ],
    [
        "am", "an", "as", "at", "be", "by", "do", "go", "he", "if",
        "in", "is", "it", "me", "my", "no", "of", "on", "or", "so",
        "to", "up", "us", "we"
    ],
    [
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
    ]
];

let activeResource = "rock";

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
        document.getElementById(`${this.name}-resource-div`).style.setProperty('display', 'block'); // remove display: none;
        document.getElementById(`${this.name}-resource-div`).style.setProperty('animation', '3s fade-in'); // play fade-in animation
        
        if (this.#amount >= 10) {
            shop.hidden = false;
            shop.style.setProperty('animation', '3s fade-in');
        }
    }

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

    getGatherRate() {
        return this.#gatherRate;
    }
}

let rock = new Resource("rock");
let wood = new Resource("wood");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function generateRandomWord() {
    let wordIndex
    if (activeResource === "rock") {
        wordIndex = Math.min(rock.getGatherRate() - 1, words.length - 1); // access word subarray at gatherRate - 1, but not past the length of the array
    } else if (activeResource === "wood") {
        wordIndex = Math.min(wood.getGatherRate() - 1, words.length - 1); // access word subarray at gatherRate - 1, but not past the length of the array
    }
    
    let rand = Math.floor(Math.random() * words[wordIndex].length); // generate a random integer from 0 to words[wordIndex].length (a valid element of words array)
    randomWord = words[wordIndex][rand];

    rockLabel.innerHTML = randomWord;
    woodLabel.innerHTML = randomWord;
}

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

function upgradePick() {
    rock.increaseGatherRate();
}

function upgradeAxe() {
    wood.increaseGatherRate();
}

// prepare game environment
generateRandomWord(); // generate first word

// event listeners for detecting correct input and keystrokes

welcomeInput.addEventListener('input', function () {
    if (this.value === "I love typing!") {
        hideWelcomeArticle();
    }
})

rockInput.addEventListener('input', function () {
    if (this.value === randomWord) { // if the user typed the word correctly
        console.log("Nice! You typed:", this.value);
        this.value = ''; // Reset input
        rock.collectResource();
        generateRandomWord();
    }
});

woodInput.addEventListener('input', function () {
    if (this.value === randomWord) { // if the user typed the word correctly
        console.log("Nice! You typed:", this.value);
        this.value = ''; // Reset input
        wood.collectResource();
        generateRandomWord();
    }
});

window.addEventListener("keydown", () => {
    if (rockInput === document.activeElement) {
        rockImg.src = "./public/rock_pressed.png";
    } else if (woodInput == document.activeElement) {
        woodImg.src = "./public/rock_pressed.png";
    }
});

window.addEventListener("keyup", () => {
    rockImg.src = "./public/rock_idle.png";
    woodImg.src = "./public/rock_idle.png"
});
