const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score")
    },
    values: {
        gameSpeed: 700,
        enemyPosition: 0,
        result: 0,
        currentTime: 60
    },
    actions: {
        timerId: setInterval(randomSquare, 600),
        countDownTimerId: setInterval(countDown, 1000)
    }
}

function countDown() {
    state.values.currentTime--
    state.view.timeLeft.textContent = state.values.currentTime

    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.countDownTimerId)
        clearInterval(state.actions.timerId)
        playSound('game-over')
        alert(`Game Over! Sua pontuação foi: ${state.values.result}`)
    }
}

function playSound(soundName) {
    let audio = new Audio(`./src/sounds/${soundName}.m4a`)
    audio.volume = 0.2
    audio.play()
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy")
    })

    let randomNumber = Math.floor(Math.random() * 9)
    let randomSquare = state.view.squares[randomNumber]
    randomSquare.classList.add("enemy")
    state.values.enemyPosition = randomSquare.id
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.enemyPosition) {
                state.values.result++
                state.view.score.textContent = state.values.result
                state.values.enemyPosition = null
                playSound('hit')
            }
        })
    })
}

function initialize() {
    addListenerHitBox()
}

initialize()