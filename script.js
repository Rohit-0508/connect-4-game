const columns = document.querySelectorAll('.column');
const resetButton = document.getElementById('reset-button');
let currentPlayer = 'red';
const board = Array.from({ length: 7 }, () => Array(6).fill(null));

columns.forEach((column, colIndex) => {
    column.addEventListener('click', () => {
        const columnCells = column.querySelectorAll('.cell');
        for (let rowIndex = columnCells.length - 1; rowIndex >= 0; rowIndex--) {
            if (!board[colIndex][rowIndex]) {
                board[colIndex][rowIndex] = currentPlayer;
                columnCells[rowIndex].classList.add(currentPlayer);
                if (checkWin(colIndex, rowIndex)) {
                    alert(`${currentPlayer} wins!`);
                    disableBoard();
                } else {
                    currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
                }
                break;
            }
        }
    });
});

resetButton.addEventListener('click', resetGame);

function checkWin(col, row) {
    return (
        checkDirection(col, row, 1, 0) ||
        checkDirection(col, row, 0, 1) ||
        checkDirection(col, row, 1, 1) ||
        checkDirection(col, row, 1, -1)
    );
}

function checkDirection(col, row, colOffset, rowOffset) {
    let count = 0;
    for (let i = -3; i <= 3; i++) {
        const c = col + i * colOffset;
        const r = row + i * rowOffset;
        if (c >= 0 && c < 7 && r >= 0 && r < 6 && board[c][r] === currentPlayer) {
            count++;
            if (count === 4) return true;
        } else {
            count = 0;
        }
    }
    return false;
}

function disableBoard() {
    columns.forEach(column => column.style.pointerEvents = 'none');
}

function resetGame() {
    board.forEach(column => column.fill(null));
    columns.forEach(column => {
        const columnCells = column.querySelectorAll('.cell');
        columnCells.forEach(cell => cell.className = 'cell');
        column.style.pointerEvents = 'auto';
    });
    currentPlayer = 'red';
}

// Initialize cells
columns.forEach(column => {
    for (let i = 0; i < 6; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        column.appendChild(cell);
    }
});
