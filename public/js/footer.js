const blueGPT = document.getElementById('blue-gpt')
const julesdbButton = document.getElementById('jules-page')
const airtableButton = document.getElementById('airtable')
const neuroButton = document.getElementById('neuro')
const bdmsButton = document.getElementById('bdms')
const julesButton = document.getElementById('jules')
const imperioButton = document.getElementById('imperio')
const testButton = document.getElementById('test')
const screenW = window.innerWidth;
const footerButtons = document.getElementsByClassName('footer-button')
const libraryButton = document.getElementById('library-page')
const consoleButton = document.querySelector('#consoles-page')
const cameraButton = document.getElementById('cameras-page')
const WFM = document.getElementById('wfm')

const footerWidth = screenW * 0.07

julesdbButton.addEventListener('click', function() {
    window.location.href = '/julesdb';
})

blueGPT.addEventListener('click', function() {
    window.open('https://bluegpt.blueorigin.com/chat', '_blank')
})

airtableButton.addEventListener('click', function() {
    window.open('https://airtable.com', '_blank')
})

julesButton.addEventListener('click', function() {
    window.open('https://jules.blueorigin.com', '_blank')
})

bdmsButton.addEventListener('click', function() {
    window.open('https://bdms2.blueorigin.com/', '_blank')
})

neuroButton.addEventListener('click', function() {
    window.open('https://neuro.blueorigin.com/', '_blank')
})

imperioButton.addEventListener('click', function() {
    window.location.href = '/imperio';
})

libraryButton.addEventListener('click', function() {
    window.location.href = '/library';
})

consoleButton.addEventListener('click', function() {
    window.location.href = '/consoles';
})

cameraButton.addEventListener('click', function() {
    window.location.href = '/cameras';
})

imperioButton.addEventListener('click', function() {
    window.location.href = 'imperio'
})

WFM.addEventListener('click', function() {
    window.open('https://odoo.blueorigin.com/web#cids=1&action=880&model=blue.wfm.meeting&view_type=list&menu_id=644', '_blank')
})

testButton.addEventListener('click', function() {
    // getReq('test')
    window.location.href = '/test'
})

for (let i = 0; i < footerButtons.length; i++) {
    footerButtons[i].style.width = footerWidth + 'px'
}
