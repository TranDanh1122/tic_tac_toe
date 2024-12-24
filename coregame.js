let player1 = {
    mark: 'x',
    type: "player",
    win: 0
}
let player2 = {
    mark: 'o',
    type: "player" || "cpu",
    win: 0
}
window.coreGame = {
    p1: player1,
    p2: player2,
    tie: 0,
    turn: 1, //1 for player x
    roundData: [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ],
    setMark: (mark) => {
        coreGame.p1.mark = mark
        coreGame.p2.mark = mark == "x" ? "o" : "x"
    },
    setType: (type) => {
        coreGame.p2.type = type
    },
    getUserWithMark: (mark) => {
        return coreGame.p1.mark == mark ? coreGame.p1 : coreGame.p2
    },
    tick: (x, y) => {
        let mark = coreGame.turn ? "x" : "o"
        coreGame.roundData[x][y] = mark
        coreGame.turn = !coreGame.turn
        return mark
    },
    checkTie: () => {
        let tie = coreGame.roundData.every(row => row.every(cell => cell !== ''));
        if (tie) coreGame.tie = coreGame.tie + 1
        return tie
    },
    checkWinner: () => { //this function copy from chatgpt (sorry im so bad at algo) and have some update, return x or o if someone win, null if noone win
        const size = coreGame.roundData.length;
        let winnerMark = null
        for (let row = 0; row < size; row++) {
            if (coreGame.roundData[row][0] !== '' && coreGame.roundData[row][0] === coreGame.roundData[row][1] && coreGame.roundData[row][1] === coreGame.roundData[row][2]) {
                winnerMark = coreGame.roundData[row][0];
                coreGame.getUserWithMark(winnerMark).win++
                return winnerMark
            }
        }

        for (let col = 0; col < size; col++) {
            if (coreGame.roundData[0][col] !== '' && coreGame.roundData[0][col] === coreGame.roundData[1][col] && coreGame.roundData[1][col] === coreGame.roundData[2][col]) {
                winnerMark = coreGame.roundData[0][col];
                coreGame.getUserWithMark(winnerMark).win++
                return winnerMark
            }
        }

        if (coreGame.roundData[0][0] !== '' && coreGame.roundData[0][0] === coreGame.roundData[1][1] && coreGame.roundData[1][1] === coreGame.roundData[2][2]) {
            winnerMark = coreGame.roundData[0][0];
            coreGame.getUserWithMark(winnerMark).win++
            return winnerMark
        }

        if (coreGame.roundData[0][2] !== '' && coreGame.roundData[0][2] === coreGame.roundData[1][1] && coreGame.roundData[1][1] === coreGame.roundData[2][0]) {
            winnerMark = coreGame.roundData[0][2];
            coreGame.getUserWithMark(winnerMark).win++
            return winnerMark
        }
        return winnerMark;
    }
}