class Game {
    constructor() {
        this.words = [];
        this.randomWord = "";
        this.guesses = [];
        this.failedAttempts = 0;
    }

    initialize() {
        const alphabet = []; 
        for (let code = "a".charCodeAt(); code <= "z".charCodeAt(); code++) {
            alphabet.push(String.fromCharCode(code));
        }
        this.createButtons(alphabet);
        this.initializeWords();
        this.setGuessedWord();
        this.showWord();
        this.showCurrentTriesLeft();
        this.initializeHint();
        this.initializeRestart();
        document.onkeydown = this.onKeyDown.bind(this);
    }

    createButtons(letters) {
        const wrapper = document.getElementById("alphabet");
        for (let letter of letters) {
            const button = document.createElement("button");
            button.innerText = letter;
            button.onclick = this.onButtonClick.bind(this);
            wrapper.append(button);
        }
    }

    onKeyDown(e) {
        this.makeGuess(e.key.toString().toLowerCase());
    }

    onButtonClick(e) {
        this.makeGuess(e.target.innerText);
    }

    makeGuess(letter) {

        if (this.randomWord.text.indexOf(letter) === -1 && !this.guesses.includes(letter)) {
            this.failedAttempts++;
        }
        this.guesses.push(letter);
        this.showWord();
        if (this.isWordGuessed()) {
            let wrapper = document.getElementById("tries");
            wrapper.parentNode.innerText = "You won!";
            return;
        }
        this.showCurrentTriesLeft();
        for (let button of document.querySelectorAll("#alphabet > button")) {
            if (button.innerText === letter) {
                button.disabled = true;
                break;
            }
        }
    }

    initializeWords() {
        Object.keys(resources).forEach(category => {
            for (let item of resources[category]) {
                this.words.push({...item, category});
            } 
        });
    }

    setGuessedWord() {
        this.randomWord = this.words[Math.floor(Math.random()*this.words.length)];
        this.showCurrentCategory();
    }

    isLetterGuessed(letter) {
        return this.guesses.includes(letter) || /[^a-z]/.test(letter);
    }

    isWordGuessed() {
        return this.randomWord.text.split("").every(x => this.isLetterGuessed(x));
    }

    showWord() {
        let solution = this.randomWord.text.split("").map(x => this.isLetterGuessed(x) ? x : "_").join("&nbsp;");
        let wrapper = document.getElementById("word");
        wrapper.innerHTML = solution;
    }

    showCurrentCategory() {
        let wrapper = document.getElementById("category");
        wrapper.innerText = this.randomWord.category;
    }

    showCurrentTriesLeft() {
        let triesLeft = 10 - this.failedAttempts;
        let wrapper = document.getElementById("tries");
        wrapper.innerText = (triesLeft > 0) ? triesLeft : wrapper.parentNode.innerText = "Game Over";
    }

    initializeHint() {
        let button = document.getElementById("hintButton");
        button.onclick = (e) => {
            e.target.parentNode.innerText = this.randomWord.hint;
        }
    }

    initializeRestart() {
        let button = document.getElementById("restartButton");
        button.onclick = () => {
            window.location.reload();
        }
    }
}

window.onload = function() {
    new Game().initialize();
}

const resources = {
    "Football teams": [
        {
            "text": "everton",
            "hint": "Based in Mersyside"
        },
        {
            "text": "liverpool",
            "hint": "Based in Mersyside"
        },
        {
            "text": "swansea",
            "hint": "First Welsh team to reach the Premier Leauge"
        },
        {
            "text": "chelsea",
            "hint": "Owned by A russian Billionaire"
        },
        {
            "text": "hull",
            "hint": "Once managed by Phil Brown"
        },
        {
            "text": "manchester-city",
            "hint": "2013 FA Cup runners up"
        },
        {
            "text": "newcastle-united",
            "hint": "Gazza's first club"
        }
    ],
    "Movies": [
        {
            "text": "alien",
            "hint": "Science-Fiction horror film"
        },
        {
            "text": "dirty-harry",
            "hint": "1971 American action film"
        },
        {
            "text": "gladiator",
            "hint": "Historical drama"
        },
        {
            "text": "finding-nemo",
            "hint": "Anamated Fish"
        },
        {
            "text": "jaws",
            "hint": "Giant great white shark"
        }
    ],
    "Cities": [
        {
            "text": "manchester",
            "hint": "Northern city in the UK"
        },
        {
            "text": "milan",
            "hint": "Home of AC and Inter"
        },
        {
            "text": "madrid",
            "hint": "Spanish capital"
        },
        {
            "text": "amsterdam",
            "hint": "Netherlands capital"
        },
        {
            "text": "prague",
            "hint": "Czech Republic capital"
        }
    ]
}

