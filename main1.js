const prompt = require('prompt-sync')({ sigint: true });
const clear = require('clear-screen');


const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const height = 10;
const width = 10;
const field = [[]];

let currCharRow = 0;
let currCharCol = 0;

function generateField() {


    for (let row = 0; row < height; row++) {
        field[row] = [];

        for (let col = 0; col < width; col++){
            // Default is all field
            // Check for probability to either generate a field or hole
            // Math.Random()
            /*
            1) Generate a random number between 0-9
            2) Check if the random number <2  then we will display a hole (+/-30%)
            3) Check if the random number is >=2 then we generate a field (+/- 70%)
            */

            let prob = Math.floor(Math.random() * 10);

        if (prob < 1) {
            field[row][col] = hole;
        }
        else {
            field[row][col] = fieldCharacter;
        }

    }
}
    // Display the character to (0 0)
    field[currCharRow][currCharCol] = pathCharacter;

    // Display the hat in random position
    let row1 = (Math.floor(Math.random() * 10));
    let col1 = (Math.floor(Math.random() * 10));
    field[row1][col1] = hat;
}

function print() {

    clear();

    const displayString = field.map(row => {

        return row.join('');

    }).join('\n');

    console.log(displayString);



}

function askQuestion() {

    const getInput = prompt('Which way? (u,d,r,l): ').
        toLowerCase();

    switch (getInput) {
        case 'u':
            currCharRow--;
            break;
        case 'd':
            currCharRow++;
            break;
        case 'l':
            currCharCol--;
            break;
        case 'r':
            currCharCol++;
            break;
        default:
            console.log("Invalid Entry, Try Again");
            askQuestion();
            break;
    }
}

function startGame() {

    let isPlaying = true;


    while (isPlaying) {

        print();

        askQuestion();

        if (field[currCharRow][currCharCol] == hole) {
         console.log('Sorry, you fell down a hole!');
        isPlaying = false;
        }
        else if (currCharRow < 0 || currCharRow > height || currCharCol < 0 || currCharCol > width) {
            console.log("Out of bounds - Game End!");
            isPlaying = false;
        }
        else if (field[currCharRow][currCharCol] == hat) {
            console.log("Congratulations, you found your hat!");
            isPlaying = false;
        }
        
        
       
        field[currCharRow][currCharCol] = pathCharacter;
        

    }

}

generateField()
startGame()
