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
let score = 0;
let pickPower = 1;
let pickUpgradeCost = 10;

function generateRandomWord() {
    const wordIndex = Math.min(pickPower - 1, words.length - 1); // access word subarray at pickPower - 1, but not past the length of the array
    let rand = Math.floor(Math.random() * words[wordIndex].length); // generate a random integer from 0 to words[wordIndex].length (a valid element of words array)
    randomWord = words[wordIndex][rand];
    document.getElementById('inputLabel').innerHTML = randomWord;
}

function increaseScore(amount) {
    score += amount;
    document.getElementById('score').innerHTML = score;
}

function updateShopPrices() {
    document.getElementById('pickCost').innerHTML = pickUpgradeCost;
}

function upgradePick() {
    console.log("upgradePick called");
    if (score >= pickUpgradeCost) { // if the player has enough to spend
        increaseScore(-pickUpgradeCost);
        pickPower += 1;

        pickUpgradeCost += 10;
        updateShopPrices();

        generateRandomWord(); // reset the word now that it is longer
    }
}

// prepare game environment
generateRandomWord(); // generate first word
updateShopPrices();

// event listeners for detecting correct input and keystrokes
const input = document.getElementById('myInput');
const rock = document.getElementById("rock");

input.addEventListener('input', function () {
    if (this.value === randomWord) { // if the user typed the word correctly
        console.log("Nice! You typed:", this.value);
        this.value = ''; // Reset input
        increaseScore(pickPower);
        generateRandomWord();
    }
});

window.addEventListener("keydown", () => {
    if (input === document.activeElement) {
        rock.src = "./public/rock_pressed.png";
    }
});

window.addEventListener("keyup", () => {
    if (input === document.activeElement) {
        rock.src = "./public/rock_idle.png";
    }
});
