const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field) {
        this.field = field;
        this.playerPos = this.firstPlayerPos(field);
        this.score = 0;
        this.startGame();
    }

    startGame() {
        if (this.score === 1) {
            console.log('You Win!');
        } else if (this.score === -1) {
            console.log('You Fail!');
        } else if (this.score === 0) {
            let inputValue = this.playerInput();
            this.playerMove(inputValue);
            this.startGame();
        };
    }

    firstPlayerPos(field) {
        for (let i = 0; i < field.length; i++) {
            for (let j = 0; j < field[i].length; j++) {
                if (field[i][j] === pathCharacter) {
                    let firstPosition = [i, j];
                    return firstPosition;
                }
            }
        }
    }

    playerMove(input) {
        if (this.outsideCheck(this.playerPos, input)) {
            this.playerPos[0] += input[0];
            this.playerPos[1] += input[1];
            let i = this.playerPos[0];
            let j = this.playerPos[1];
            if (this.field[i][j] === fieldCharacter || this.field[i][j] === pathCharacter) {
                this.field[i][j] = pathCharacter;
                console.log(this.print());
            } else if (this.field[i][j] === hat) {
                this.field[i][j] = pathCharacter;
                console.log(this.print());
                this.score = 1;
            } else if (this.field[i][j] === hole) {
                this.field[i][j] = pathCharacter;
                console.log(this.print());
                this.score = -1;
            }
        } else {
            console.log("Input is outside!");
        }
    }

    outsideCheck(position, move) {
        if (position[0] + move[0] >= 0 && position[0] + move[0] < this.field.length && position[1] + move[1] >= 0 && position[1] + move[1] < this.field[0].length) {
            return true;
        } else {
            return false;
        }
    }

    print() {
        let result = '';
        for (let row of this.field) {
            result += row.join("");
            result += "\n";
        }
        result = result.substring(0, result.length - 1);
        return result;
    }

    playerInput() {
        console.log(this.print())
        let input = prompt("Move using WASD : ");
        if (input === "w" || input === "W") {
            return [-1, 0];
        } else if (input === "a" || input === "A") {
            return [0, -1];
        } else if (input === "s" || input === "S") {
            return [1, 0];
        } else if (input === "d" || input === "D") {
            return [0, 1];
        } else {
            console.log("Input correct value!");
            return [0, 0];
        }
    }

    static generateField(height, width, percentage) {
        let newField = new Array(height);
        let noUser = true;
        let noHat = true;
        for (let i = 0; i < height; i++) {
            newField[i] = new Array(width);
        }
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                let randomValue = Math.random() * 100;
                if (randomValue < percentage) {
                    newField[i][j] = hole;
                } else {
                    newField[i][j] = fieldCharacter;
                }
            }
        }
        while (noUser || noHat) {
            let randomheight = Math.floor(Math.random() * height);
            let randomwidth = Math.floor(Math.random() * width);
            if (noUser) {
                newField[randomheight][randomwidth] = pathCharacter;
                noUser = false;
            }
            if (newField[randomheight][randomwidth] !== pathCharacter) {
                newField[randomheight][randomwidth] = hat;
                noHat = false;
            }
        }
        return newField;
    }
}

let mine = Field.generateField(10, 20, 40);
const myField = new Field(mine);
