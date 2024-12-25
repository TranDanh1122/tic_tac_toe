let marks = document.querySelectorAll('.mark')
let startGame = document.querySelectorAll('.start_game')
let main = document.querySelector('main')
let boxs = document.querySelectorAll('.box')
let turns = document.querySelectorAll('.turn')
let next = document.querySelector('.next')
let quit = document.querySelector('.quit')
let restart = document.querySelector('.restart')
let confirmRestart = document.querySelectorAll('button[res]')
let handleChoseMark = (e) => {
    marks.forEach(el => el.removeAttribute('picked'))
    let element = e.target
    if (!element.classList.contains('.mark')) element = element.closest('.mark')
    element.toggleAttribute('picked', true)
    if (element.classList.contains('o-mark')) {
        window.coreGame.setMark("o")
        return false
    }
    window.coreGame.setMark("x")
}
let cpuTick = () => {
    let { cpuX, cpuY } = coreGame.cpuTick()
    let cpuTickBox = document.querySelector('.boxs').querySelector(`[data-x="${cpuX}"][data-y="${cpuY}"]`)
    let cpuMark = window.coreGame.p2.mark
    cpuTickBox?.toggleAttribute(`${cpuMark}`, true)
    return cpuMark
}
let handleStartGame = (e) => {
    let type = e.target.classList.contains('multi') ? 'player' : 'cpu';
    window.coreGame.setType(type);
    main.toggleAttribute('play', true)
    main.toggleAttribute('new', false)
    main.setAttribute('play_type', type == "cpu" ? "solo" : 'multi')
    if (type == 'cpu' && window.coreGame.p1.mark == "o") cpuTick

}

let handleTie = () => {
    main.toggleAttribute('end', true)
    main.setAttribute('winner', 'tie')
    main.toggleAttribute('winsym', false)
    document.querySelector(`.count_ties`).textContent = window.coreGame.tie

}
let handleWinner = () => {
    let winnerMark = window.coreGame.checkWinner()
    if (!winnerMark) {
        if (window.coreGame.checkTie()) return handleTie()
        return null
    }
    let winner = window.coreGame.p1.mark == winnerMark ? "p1" : 'p2'
    main.toggleAttribute('end', true)
    main.setAttribute('winner', winner)
    main.setAttribute('winsym', winnerMark)
    document.querySelector(`.win_count_${winner}`).textContent = window.coreGame[`${winner}`].win

}
let rollTurn = (tick) => {
    turns.forEach(el => {
        el.style.display = 'none';
        if (!el.hasAttribute(`${tick}`)) el.style.display = 'inline-block'
    })
}

let handleTick = (e) => {
    let el = e.target.classList.contains('box') ? e.target : e.target.closest('.box')
    if (el.hasAttribute("x") || el.hasAttribute('o')) {
        return false
    }
    let x = el.getAttribute('data-x')
    let y = el.getAttribute('data-y')
    let tick = window.coreGame.tick(x, y)
    el.toggleAttribute(`${tick}`, true)
    rollTurn(tick)
    if (window.coreGame.p2.type === "cpu") {
        if (
            (window.coreGame.p2.mark === 'x' && window.coreGame.turn) ||
            (window.coreGame.p2.mark === 'o' && !window.coreGame.turn)
        ) {
            let cpuMark = cpuTick();
            rollTurn(cpuMark);
        }
    }

    handleWinner()
}
let handleNext = (e) => {
    boxs.forEach(el => {
        el.removeAttribute("x")
        el.removeAttribute("o")
    })
    window.coreGame.next()
    main.toggleAttribute('end', false)
    main.toggleAttribute('winner', false)
    main.toggleAttribute('winsym', false)
    if (window.coreGame.p2.type == 'cpu' && window.coreGame.p1.mark == "o") cpuTick()

}
let handleQuit = (e) => {
    window.coreGame.reset()
    main.toggleAttribute('end', false)
    main.toggleAttribute('winner', false)
    main.toggleAttribute('winsym', false)
    main.toggleAttribute('play', false)
    main.toggleAttribute('new', true)
    handleNext()
}
let toggleRestart = (e) => {
    main.toggleAttribute('end', false)
    main.toggleAttribute('restart', false)
    if (e.target.classList.contains('yes')) {
        handleNext()
        return false
    }

}
let handleRestart = () => {
    main.toggleAttribute('end', true)
    main.toggleAttribute('restart', true)
}
boxs.forEach(el => el.addEventListener('click', handleTick))
startGame.forEach(el => el.addEventListener('click', handleStartGame))
marks.forEach(el => el.addEventListener('click', handleChoseMark))
next.addEventListener('click', handleNext)
quit.addEventListener('click', handleQuit)
restart.addEventListener('click', handleRestart)
confirmRestart.forEach(el => el.addEventListener('click', toggleRestart))

function syncData () {
    if (!coreGame.syncData()) return false;
    main.toggleAttribute('play', true)
    main.toggleAttribute('new', false)
    main.setAttribute('play_type', coreGame.p2.type == "cpu" ? "solo" : 'multi')
    if (window.coreGame.p2.type == 'cpu' && window.coreGame.p1.mark == "o" && window.coreGame.turn == 1) cpuTick()
    window.coreGame.roundData.forEach((items, index) => {
        items.forEach((item , idx) => {
            if(item == '') return false
            let tickBox = document.querySelector('.boxs').querySelector(`[data-x="${index}"][data-y="${idx}"]`)
            tickBox?.toggleAttribute(`${item}`, true)
        })
    })
    handleWinner()

}
syncData ()