const testButtonGeex = document.getElementById('test-geex')
const divFVC = document.getElementById('fvc-div')
const divFVCDI = document.getElementById('fvc-div-di')
const divDAS = document.querySelector('#das-div-geex')



// const screenW = window.screen.width;

const btnW = screenW * 0.9 / 49

openingFnc()
testButtonGeex.style.display = 'none'

testButtonGeex.addEventListener('mouseover', function() {
    testButtonGeex.style.background = 'red'
})
testButtonGeex.addEventListener('mouseout', function() {
    testButtonGeex.style.background = ''
})

function openingFnc() {
    // FVC
    getReq(`api/tr/geex/fvc/BE-3PM_Test_Article_Valve_Configuration/105`).then((data) => {
        getFVC(data, 'BE-3 PM')
    })
    getReq(`api/tr/geex/fvc/Facility_Valves_Configuration/78`).then((data) => {
        getFVC(data, 'Facility')
    })
    getReq(`api/tr/geex/fvc/FVC4_Valves_Configuration/78`).then((data) => {
        getFVC(data, 'FVC4')
    })
    getReq(`api/tr/geex/fvc/GEEx_FVC1_DI/1`).then((data) => {
        getFVC_DI(data, 'FVC1')
    })
    getReq(`api/tr/geex/fvc/GEEx_FVC2_DI/1`).then((data) => {
        getFVC_DI(data, 'FVC2')
    })
    getReq(`api/tr/geex/fvc/GEEx_FVC3_DI/1`).then((data) => {
        getFVC_DI(data, 'FVC3')
    })
    getReq(`api/tr/geex/fvc/GEEx_FVC4_DI/1`).then((data) => {
        getFVC_DI(data, 'FVC4')
    })
    // DAS
    getReq('api/tr/geex/das/GEExDAS1').then((data) => {
        jsonData = data.TAGs;
        getDAS(jsonData, 'DAS1')
    })
    getReq('api/tr/geex/das/GEExDAS2').then((data) => {
        jsonData = data.TAGs;
        getDAS(jsonData, 'DAS2')
    })
    getReq('api/tr/geex/das/GEExDAS3').then((data) => {
        jsonData = data.TAGs;
        getDAS(jsonData, 'DAS3')
    })
    getReq('api/tr/geex/das/GEExDAS4').then((data) => {
        jsonData = data.TAGs;
        getDAS(jsonData, 'DAS4')
    })
    getReq('api/tr/geex/das/GEExDAS5').then((data) => {
        jsonData = data.TAGs;
        getDAS(jsonData, 'DAS5')
    })
}

testButtonGeex.addEventListener('click', function() {
    getReq('api/tr/geex/das/GEExDAS2').then((data) => {
        jsonData = data.TAGs;
        getDAS(jsonData, 'DAS2')
    })
})

function getFVC(data, name) {
    const readIP = document.getElementById("read-ip")
    const readName = document.getElementById("read-name")
    const readChan = document.getElementById("read-chan")
    const readDevice = document.getElementById('read-device')
    const arrayL = data.length
    for (let i = 0; i < arrayL; i++) {
        let b = document.createElement('button')
        b.title = data[i][0]
        b.textContent = i
        b.addEventListener('click', function() {
            readDevice.textContent = `Device = ${name}`
            readIP.textContent = `Name = ${data[i][0]}`
            readName.textContent = `Port = ${data[i][3]}`
            readChan.textContent = `Channel = ${data[i][4]}`
        })
        b.style.width = btnW + 'px'
        b.style.height = btnW + 'px'
        divFVC.appendChild(b)
    }
    // divFVC.innerHTML += '<br>'
    const br = document.createElement('br')
    divFVC.appendChild(br)
}

function getFVC_DI(data, name) {
    const readIP = document.getElementById("read-ip2")
    const readName = document.getElementById("read-name2")
    const readChan = document.getElementById("read-chan2")
    const readDevice = document.getElementById('read-device2')
    const arrayL = data.length
    for (let i = 0; i < arrayL; i++) {
        let b = document.createElement('button')
        b.title = data[i][0]
        b.textContent = i
        b.style.width = btnW + 'px'
        b.style.height = btnW + 'px'
        b.addEventListener('click', function() {
            readDevice.textContent = `Device = ${name}`
            readIP.textContent = `Name = ${data[i][0]}`
            readName.textContent = `Card and Port = ${data[i][1]}, ${data[i][2]}`
            readChan.textContent = `Channel = ${data[i][3]}`
        })
        divFVCDI.appendChild(b)
    }
    const br = document.createElement('br')
    divFVCDI.appendChild(br)
}

function getDAS(data, name) {
    const readIP = document.getElementById("read-ip3")
    const readName = document.getElementById("read-name3")
    const readChan = document.getElementById("read-chan3")
    const readDevice = document.getElementById('read-device3')
    const arrayL = data.length
    for (let i = 0; i < arrayL; i++) {
        let b = document.createElement('button')
        b.title = data[i].Name
        b.textContent = i
        b.style.width = btnW + 'px'
        b.style.height = btnW + 'px'
        b.addEventListener('click', function() {
            readDevice.textContent = `Device = ${name}`
            readIP.textContent = `IP = ${data[i].IP}`
            readName.textContent = `Name = ${data[i].Name}`
            readChan.textContent = `Channel = ${data[i].Channel}`
        })
        divDAS.appendChild(b)
    }
    const br = document.createElement('br')
    divDAS.appendChild(br)
}