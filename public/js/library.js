const testButtonLibrary = document.getElementById('test-button')
const videoDiv = document.querySelector('#video-div')
const wikiDiv = document.querySelector('#wiki-div')
const docDiv = document.querySelector('#document-div')
const wikiBox = document.querySelector('#wiki-box')
const docBox = document.querySelector('#document-box')
const videoBox = document.querySelector('#video-box')
const gitDiv = document.querySelector('#git-div')
const gitBox = document.querySelector('#git-box')

testButtonLibrary.addEventListener('click', function() {
    data = { file:'S:/ICE/Videos/DSCE Intro Videos/DSCE Intro - ETS (Engine Test Stand) - Tuesday, September 15, 2020 12.04.16 PM.mp4'}
    // window.location.href = 'library/test.pdf'
    getReq('library/video')
})

//Initialize

wikiBox.addEventListener('click', function() {
    if (this.checked) wikiDiv.style.display = 'block'
    else wikiDiv.style.display = 'none'
})

videoBox.addEventListener('click', function() {
    if (this.checked) videoDiv.style.display = 'block'
    else videoDiv.style.display = 'none'
})

docBox.addEventListener('click', function() {
    if (this.checked) docDiv.style.display = 'block'
    else docDiv.style.display = 'none'
})

gitBox.addEventListener('click', function() {
    if (this.checked) gitDiv.style.display = 'block'
    else gitDiv.style.display = 'none'
})


