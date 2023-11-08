let board = ["", "", "", "","", "", "","",""];
function checkWin(player) {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]            // Diagonals
    ];

    for (const combination of winningCombinations) {
        if (combination.every(index => board[index] === player)) {
            return combination; // Return the winning combination
        }
    }

    return null; // Return null if no win is found
}


function checkTie() {
    if (board.indexOf("") === -1) {
        return true;
    } else {
        return false;
    }
}

let cells = document.querySelectorAll(".cell");
let action = document.getElementsByClassName("action")[0];
let clear = () =>{
    board = ["", "", "", "", "", "", "" ,"", ""];
    cells.forEach((ele) =>{
        ele.innerText = "";
    })
}

let turn =  document.getElementsByClassName("turn")[0];
let move = "❌";
turn.innerText = `${move}'s move`
let a =  document.getElementsByClassName("action")[0];


let gameWon = false; // Initialize a variable to track whether the game has been won

// ...

cells.forEach((cell, index) => {

    cell.addEventListener("click", () => {

        if (cell.innerText === "" && !gameWon) {
            cell.innerText = move;
            cell.style.scale = "0.5";
            // cell.style.border = "2px solid green";

            setTimeout(()=> {
                cell.style.scale = "1"


            },500)

            a.innerText = `${move} wins !`;
            board[index] = move;
            const winningCombination = checkWin(move);

            if (winningCombination) {
                gameWon = true; // Set the game as won
                a.innerText = `${move} wins !`;

                // Highlight the winning cells
                winningCombination.forEach(winningIndex => {
                    cells[winningIndex].classList.add("winning-cell");
                });


                setTimeout(() => {

                    clear();
                    action.style.display = "block";
                    // Remove the winning-cell class from all cells
                    cells.forEach(cell => cell.classList.remove("winning-cell"));
                    gameWon = false; // Reset the game state
                }, 1500);
            } else if (checkTie()) {
                gameWon = true; // Set the game as won
                a.innerText = "Tie";
                setTimeout(() => {

                    clear();
                    action.style.display = "block";
                    // Remove the winning-cell class from all cells
                    cells.forEach(cell => cell.classList.remove("winning-cell"));
                    gameWon = false; // Reset the game state
                }, 1500);
                gameWon = false; // Reset the game state
            } else {
                move = move === "❌" ? "⚫" : "❌";
            }
            turn.innerText = `${move}'s move`
        }
    });
});

let bd = document.getElementsByTagName("body")[0];
bd.addEventListener("click", ()=>{
    action.style.display = "none";
})
