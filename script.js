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
let numRock = 0;
let numWood = 0;
let pickPower = 1;
let axePower = 1;
let pickUpgradeCost = 10;
let axeUpgradeCost = 10;
let activeResource = "rock";

function generateRandomWord() {
    let wordIndex
    if (activeResource === "rock") {
        wordIndex = Math.min(pickPower - 1, words.length - 1); // access word subarray at pickPower - 1, but not past the length of the array
    } else if (activeResource === "wood") {
        wordIndex = Math.min(axePower - 1, words.length - 1); // access word subarray at axePower - 1, but not past the length of the array
    }
    
    let rand = Math.floor(Math.random() * words[wordIndex].length); // generate a random integer from 0 to words[wordIndex].length (a valid element of words array)
    randomWord = words[wordIndex][rand];

    document.getElementById('rock-input-label').innerHTML = randomWord;
    document.getElementById('wood-input-label').innerHTML = randomWord;
}

function increaseRock(amount) {
    numRock += amount;
    document.getElementById('num-rock').innerHTML = numRock;
}

function increaseWood(amount) {
    numWood += amount;
    document.getElementById('num-wood').innerHTML = numWood;
}

function updateShopPrices() {
    document.getElementById('pick-cost').innerHTML = pickUpgradeCost;
    document.getElementById('axe-cost').innerHTML = axeUpgradeCost;
}

function toggleResource() {
    if (activeResource === "rock") {
        activeResource = "wood";
        document.getElementById('wood-article').hidden = false;
        document.getElementById('rock-article').hidden = true;
    } else {
        activeResource = "rock";
        document.getElementById('rock-article').hidden = false;
        document.getElementById('wood-article').hidden = true;
    }

    generateRandomWord();
    //console.log(activeResource);
}

function upgradePick() {
    if (numRock >= pickUpgradeCost) { // if the player has enough to spend
        increaseRock(-pickUpgradeCost);
        pickPower += 1;

        pickUpgradeCost += 10;
        updateShopPrices();

        generateRandomWord(); // reset the word now that it is longer
    }
}

function upgradeAxe() {
    if (numWood >= axeUpgradeCost) { // if the player has enough to spend
        increaseWood(-axeUpgradeCost);
        axePower += 1;

        axeUpgradeCost += 10;
        updateShopPrices();

        generateRandomWord(); // reset the word now that it is longer
    }
}

// prepare game environment
generateRandomWord(); // generate first word
updateShopPrices();

// event listeners for detecting correct input and keystrokes
const rockInput = document.getElementById('rock-input');
const woodInput = document.getElementById('wood-input');
const rockImg = document.getElementById("rock-img");
const woodImg = document.getElementById("wood-img");

rockInput.addEventListener('input', function () {
    if (this.value === randomWord) { // if the user typed the word correctly
        console.log("Nice! You typed:", this.value);
        this.value = ''; // Reset input
        increaseRock(pickPower);
        generateRandomWord();
    }
});

woodInput.addEventListener('input', function () {
    if (this.value === randomWord) { // if the user typed the word correctly
        console.log("Nice! You typed:", this.value);
        this.value = ''; // Reset input
        increaseWood(axePower);
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
