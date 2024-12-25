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
    saveData: () => {
        let data = {
            p1: coreGame.p1,
            p2: coreGame.p2,
            tie: coreGame.tie,
            turn: coreGame.turn,
            roundData: coreGame.roundData,
        }
        window.storage.save('game', data)
    },
    removeData: () => {
        window.storage.remove('game')
    },
    getData: () => {
        return window.storage.get('game')
    },
    syncData: () => {
        let data = coreGame.getData()        
        if (!data) return false        
        if (data?.roundData.every(row => row.every(cell => cell == ''))) return false
        coreGame.p1 = data.p1
        coreGame.p2 = data.p2
        coreGame.tie = data.tie
        coreGame.turn = data.turn
        coreGame.roundData = data.roundData
        return true
    },
    next: () => {
        coreGame.roundData = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ]
        coreGame.turn = 1
        coreGame.saveData()
    },
    reset: () => {
        coreGame.p1.win = 0
        coreGame.p2.win = 0
        coreGame.removeData()
    },

    setMark: (mark) => {
        coreGame.p1.mark = mark
        coreGame.p2.mark = mark == "x" ? "o" : "x"
        coreGame.saveData()
    },
    setType: (type) => {
        coreGame.p2.type = type
        coreGame.saveData()
    },
    getUserWithMark: (mark) => {
        return coreGame.p1.mark == mark ? coreGame.p1 : coreGame.p2

    },
    tick: (x, y) => {
        let mark = coreGame.turn ? "x" : "o"
        coreGame.roundData[x][y] = mark
        coreGame.turn = !coreGame.turn
        coreGame.saveData()
        return mark
    },
    cpuTick: () => { //this  function copy from chatgpt (sorry im so bad at algo) and have some update, return x,y of cpu choosen box, or false if no box available
        const emptyCells = [];
        for (let i = 0; i < coreGame.roundData.length; i++) {
            for (let j = 0; j < coreGame.roundData[i].length; j++) {
                if (coreGame.roundData[i][j] === '') { // null đại diện cho ô trống
                    emptyCells.push({ row: i, col: j });
                }
            }
        }
        if (emptyCells.length === 0) {
            return false;
        }
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const cpuMove = emptyCells[randomIndex];
        coreGame.roundData[cpuMove.row][cpuMove.col] = coreGame.p2.mark;
        coreGame.turn = !coreGame.turn
        coreGame.saveData()
        return { cpuX: cpuMove.row, cpuY: cpuMove.col }
    },
    checkTie: () => {
        let tie = coreGame.roundData.every(row => row.every(cell => cell !== ''));
        if (tie) coreGame.tie = coreGame.tie + 1
        coreGame.saveData()
        return tie
    },
    checkWinner: () => { //this function copy from chatgpt (sorry im so bad at algo) and have some update, return x or o if someone win, null if noone win
        const size = coreGame.roundData.length;

        let winnerMark = null
        for (let row = 0; row < size; row++) {
            if (coreGame.roundData[row][0] !== '' && coreGame.roundData[row][0] === coreGame.roundData[row][1] && coreGame.roundData[row][1] === coreGame.roundData[row][2]) {
                winnerMark = coreGame.roundData[row][0];
                coreGame.getUserWithMark(winnerMark).win++
                coreGame.saveData()
                return winnerMark
            }
        }

        for (let col = 0; col < size; col++) {
            if (coreGame.roundData[0][col] !== '' && coreGame.roundData[0][col] === coreGame.roundData[1][col] && coreGame.roundData[1][col] === coreGame.roundData[2][col]) {
                winnerMark = coreGame.roundData[0][col];
                coreGame.getUserWithMark(winnerMark).win++
                coreGame.saveData()
                return winnerMark
            }
        }

        if (coreGame.roundData[0][0] !== '' && coreGame.roundData[0][0] === coreGame.roundData[1][1] && coreGame.roundData[1][1] === coreGame.roundData[2][2]) {
            winnerMark = coreGame.roundData[0][0];
            coreGame.getUserWithMark(winnerMark).win++
            coreGame.saveData()
            return winnerMark
        }

        if (coreGame.roundData[0][2] !== '' && coreGame.roundData[0][2] === coreGame.roundData[1][1] && coreGame.roundData[1][1] === coreGame.roundData[2][0]) {
            winnerMark = coreGame.roundData[0][2];
            coreGame.getUserWithMark(winnerMark).win++
            coreGame.saveData()
            return winnerMark
        }
        return winnerMark;
    }
}