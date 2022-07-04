// Charcters and DOM Elements
const hero = document.querySelector('.hero')
const villian = document.querySelector('.villian')
const gameOver = document.getElementById('gameOver')
const scoreElement = document.getElementById('score')
const btn = document.getElementById('btn')
const restartBtn = document.getElementById('restart')
const newLevel = document.getElementById('new-level')
const pauseBtn = document.getElementById('pause')

// Audios 
const backgroundAudio = new Audio('./assets/background.mp3')
const gameOverAudio = new Audio('/assets/game-over.wav')

// Initial variables
let score = 0
let cross = true

// Event 
btn.addEventListener('click', () => {
    // play the audio
    backgroundAudio.play()

    // pause the game over audio
    gameOverAudio.pause()

    btn.style.display = 'none'
    document.onkeydown = (e) => {
        // Move the hero upwards
        if (e.keyCode === 38) {
            hero.classList.add('animateHero')
            setTimeout(() => {
                hero.classList.remove('animateHero')
            }, 800);
        }

        // Move the hero to right
        if (e.keyCode === 39) {
            hX = parseInt(window.getComputedStyle(hero, null).getPropertyValue('left'))
            hero.style.left = hX + 112 + 'px'
        }

        // Move the hero to left
        if (e.keyCode === 37) {
            hX = parseInt(window.getComputedStyle(hero, null).getPropertyValue('left'))
            hero.style.left = (hX - 105) + 'px'
        }
    }

    villian.classList.add('animateVillian')
    // Detect collision
    setInterval(() => {
        // Left and top values of the hero
        let heroX = parseInt(window.getComputedStyle(hero, null).getPropertyValue('left'))
        let heroY = parseInt(window.getComputedStyle(hero, null).getPropertyValue('top'))

        // Left and top values of the villian
        let villianX = parseInt(window.getComputedStyle(villian, null).getPropertyValue('left'))
        let villianY = parseInt(window.getComputedStyle(villian, null).getPropertyValue('top'))

        // Calculate the offsets 
        let offsetX = Math.abs(heroX - villianX)
        let offsetY = Math.abs(heroY - villianY)

        // Detecting the collision
        if (offsetX < 90 && offsetY < 70) {
            villian.classList.remove('animateVillian')
            // show the game over message
            gameOver.style.display = 'block'
            // pause the audio
            backgroundAudio.pause()
            // play the game over audio
            gameOverAudio.play()
            // show the resart button
            restartBtn.style.display = 'block'
            // Due to collision, the game is over and set the score to zero
            score = 0
            scoreElement.innerHTML = `Your Score: ${score}`
            // hide the pause button when game is over
            pauseBtn.style.display = 'none'

        } else if (offsetX < 130 && cross) {
            // update score
            score++
            updateScore(score)
            cross = false
            setTimeout(() => {
                cross = true
            }, 1000)

            // Setting the animation duration and substracting .1 from that to make the game harder
            setTimeout(() => {
                let animationDuration = parseFloat(window.getComputedStyle(villian, null).getPropertyValue('animation-duration'))
                let newAnimationDuration = animationDuration - 0.1
                villian.style.animationDuration = newAnimationDuration + 's'

                // When the animation duration is 2, we would want to make the duration constant to make the game easier and make score higher
                if (animationDuration === 2) {
                    newAnimationDuration = animationDuration
                    villian.style.animationDuration = newAnimationDuration + 's'
                }
            }, 500);
        }
    }, 100);

    // Add new level
    function addNewLevel() {
        if (score == parseInt(15)) {
            document.body.style.background = 'url(./assets/background-level-2.jpg)'
            document.body.style.backgroundPosition = 'center'
            document.body.style.backgroundSize = 'cover'
            document.body.style.backgroundRepeat = 'no-repeat'

            // Show a new level
            newLevel.style.opacity = 1
            newLevel.style.transform = 'translateY(50px)'

            setTimeout(() => {
                newLevel.style.opacity = 0
                newLevel.style.transform = 'translateY(50px)'
            }, 3000);
        }

        if (score == parseInt(30)) {
            document.body.style.background = 'url(./assets/background-level-3.jpg)'
            document.body.style.backgroundPosition = 'center'
            document.body.style.backgroundSize = 'cover'
            document.body.style.backgroundRepeat = 'no-repeat'
            document.body.style.backgroundColor = 'rgba(0,0,255,0.2)'
            document.body.style.backgroundBlendMode = 'darken'

            // Show a new level
            newLevel.style.opacity = 1
            newLevel.innerHTML = 'You have reached level 3'
            newLevel.style.transform = 'translateY(50px)'

            setTimeout(() => {
                newLevel.style.opacity = 0
                newLevel.style.transform = 'translateY(50px)'
            }, 3000);
        }

        if (score == parseInt(50)) {
            document.body.style.background = 'url(./assets/background-level-4.webp)'
            document.body.style.backgroundPosition = 'center'
            document.body.style.backgroundSize = 'cover'
            document.body.style.backgroundRepeat = 'no-repeat'

            // Show a new level
            newLevel.style.opacity = 1
            newLevel.innerHTML = 'You have reached level 4'
            newLevel.style.transform = 'translateY(50px)'

            setTimeout(() => {
                newLevel.style.opacity = 0
                newLevel.style.transform = 'translateY(50px)'
            }, 3000);
        }

        if (score == parseInt(100)) {
            document.body.style.background = 'url(./assets/background-leve-5.webp)'
            document.body.style.backgroundPosition = 'center'
            document.body.style.backgroundSize = 'cover'
            document.body.style.backgroundRepeat = 'no-repeat'
            // show the main villian and continue the game
            villian.style.background = 'url(./assets/main-villian.png)'
            villian.style.backgroundPosition = 'center'
            villian.style.backgroundSize = 'contain'
            villian.style.backgroundRepeat = 'no-repeat'

            // Show a new level
            newLevel.style.opacity = 1
            newLevel.style.transform = 'translateY(50px)'
            newLevel.innerHTML = 'You have reached the max level'

            setTimeout(() => {
                newLevel.style.opacity = 0
                newLevel.style.transform = 'translateY(50px)'
            }, 3000);
        }
    }

    // Function to update score
    function updateScore(score) {
        scoreElement.innerHTML = `Your Score: ${score}`
        addNewLevel()
    }
})

// Function to restart the game
function restartGame() {
    document.location.reload()
}

restartBtn.addEventListener('click', restartGame)

// Function to pause the game
function pauseGame() {
    villian.classList.toggle('animateVillian')
    backgroundAudio.pause()

    btn.style.display = 'block'

    if (btn.style.display = 'block') {
        pauseBtn.style.display = 'block'
    }
}

pauseBtn.addEventListener('click', pauseGame)