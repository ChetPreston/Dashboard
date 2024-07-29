const mainDiv = document.getElementById('main-div')
const screenH = window.innerHeight;
const mainButtons = document.getElementsByClassName('main-button')
const xeexImp = document.getElementById('xeex-imp')
const geexImp = document.getElementById('geex-imp')
const veexImp = document.getElementById('veex-imp')
const alabamaImp = document.getElementById('alabama-imp')

mainDiv.style.width = screenW + 'px'
// mainDiv.style.marginLeft = (screenW / 5) +'px'
// mainDiv.style.marginRight = (screenW / 5) +'px'
// mainDiv.style.margin = (screenH * 0.95 / 4) + 'px ' + (screenW / 4) + 'px'
// mainDiv.style.marginBottom = screenH/5 + 'px'
mainDiv.style.height = (screenH *0.8) +'px';


const buttonHeight = screenH * 0.6 / 4;
const buttonWidth = screenW * 0.15
// const footerWidth = screenW * 0.07


for (let i = 0; i < mainButtons.length; i++) {
    mainButtons[i].style.height = buttonHeight + 'px'
    mainButtons[i].style.width = buttonWidth + 'px'
}

xeexImp.addEventListener('click', function() {
    window.open("https://xeex.blueorigin.com")
})

veexImp.addEventListener('click', function() {
    window.open("https://veex.blueorigin.com")
})

geexImp.addEventListener('click', function() {
    window.open("https://geex.blueorigin.com")
})

