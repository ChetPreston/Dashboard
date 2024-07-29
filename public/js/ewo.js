const addEwo = document.querySelector('#create-ewo-button')
const project = document.getElementById('cc')
const desc = document.getElementById('description')
const qty = document.getElementById('qty')
const mats = document.getElementById('materials')
const due = document.getElementById('dueDate')
const cc = document.getElementById('chargeCode')
const clean = document.getElementById('cleaningSteps')
const template= document.getElementById('templateEwo')
const notes = document.getElementById('notesCPV')
const yourName = document.getElementById('yourName')
const re = document.getElementById('eng2')
const specialist = document.getElementById('eng3')

// Modifying header buttons
// homeButton.addEventListener('click', function() {
//     window.location.href = '../blue.html';
//   })
// veexButton.addEventListener('click', function() {
// window.location.href = '../veex.html'
// })

// Default function calls
let site = 'veex'
ewoDefaults(site)

document.querySelectorAll('input[type=radio]').forEach(function(radio) {
    radio.addEventListener('change', function() {
        console.log(`Value has been changed to ${radio.value}`)
        // displayForm(radio.value)
        site = radio.value
        ewoDefaults(site)
        // projectDropdown.addEventListener('change', function() {
        //     return getReq(`api/projects/${site}`).then((data) => {
        //         //console.log(data.length)
        //         let id = -1;
        //         for (let i  = 0; i < data.length; i++) {
        //             if (data[i].name == this.value) {
        //                 id = data[i].id
        //             }
        //         }
        //         projectInfo(site, id)
        //     })
        // })
        return site
    })
})



// Test vars
function logtest() {
    console.log(project.value)
    console.log(desc.value)
    console.log(qty.value)
    console.log(mats.value)
    console.log(due.value)
    console.log(cc.value)
    console.log(clean[clean.value-1].textContent)
    console.log(template.value)
    console.log(notes.value)
    console.log(identify.value)
}

addEwo.addEventListener('click', function() {
    let x = { 
        id: 0,
        project:project.value, 
        description:desc.value,
        quantity:qty.value,
        material:mats.value,
        duedate:due.value,
        chargecode:cc.value,
        cleaning:clean[clean.value-1].textContent,
        template:template.value,
        notes:notes.value,
        name:yourName.value,
        reng:re.value,
        specialist:specialist.value,
        site:site,
     }
        // displayComments()
        // return getReq('http://localhost:3000/comments').then((data) => {
            return newComment(x).then((data) => {
        // displayComments(data)
    // console.log(doodo)
    })
})

function ewoDefaults(site) {
    switch(site) {
        case 'veex':
            console.log('1')
            specialist.value = 'Pamela Ammons'
            break;
        case 'geex': 
            console.log('2')
            specialist.value = ''
            break
        case 'xeex':
            console.log('3')
            specialist.value = ''
            break;
        case '4670':
            console.log('4')
            specialist.value = ''
            break;
    }
}

function updateClean() {
    const sv = document.getElementById("cleaningSteps").value;
    const resultTemp = document.getElementById("templateEwo");
    const mat = document.getElementById("materials").value;
    
    if (mat == "Stainless Steel" || mat == "Inconel") {
        if (sv == "1") {
            resultTemp.value = "1193122";
        } else if (sv == "2") {
            resultTemp.value = "1193121";
        } else if (sv == "5") {
            resultTemp.value = "1193112";
        } else if (sv == "7") {
            resultTemp.value = "1193097";
        } else {
            resultTemp.value = "";
        }
    } else {
        resultTemp.value = "";
    }
}

function updateChargeCode() {
    const selectedValue = document.getElementById("cc").value;
    const resultTextbox = document.getElementById("chargeCode");

    if (selectedValue === "ADP Rigel") {
      resultTextbox.value = "202R021.0011.0002.0001";
       } else if (selectedValue === "BE-3U Chill-in") {
          resultTextbox.value = "204CF22.TEST.0001.0000";
       } else if (selectedValue === "BE-3U DSI Cryo") {
          resultTextbox.value = "1050014.001.0007.0031.00";
       } else if (selectedValue === "BE-3U Vacuum Start") {
      resultTextbox.value = "205CF23.TEST.8330.2020";
       } else if (selectedValue === "BE-4 1N STI") {
      resultTextbox.value = "105RBE4.001N.VLVS.IVT2";
       } else if (selectedValue === "Fuel Cell") {
      resultTextbox.value = "1020023.001.0001.0001.00";
       } else if (selectedValue === "GS2 Re-Circ Pump") {
      resultTextbox.value = "104R018.0001.0004.0011";
       } else if (selectedValue === "GS2 Re-Fueler") {
      resultTextbox.value = "104R022.0018.0001.0000";
       } else if (selectedValue === "Hydrogen Valve Embrittlement") {
      resultTextbox.value = "102R021.0011.0006.0005";
       } else if (selectedValue === "ISS") {
      resultTextbox.value = "104R008.0001.0003.1106";
       } else if (selectedValue === "Lunar Lander Thruster") {
      resultTextbox.value = "205R020.0001.0003.0000";
       } else if (selectedValue === "NGS1 Hydraulic Hex") {
      resultTextbox.value = "204CF19.MAEQ.0001.0000";
       } else if (selectedValue === "NGS2 APU") {
      resultTextbox.value = "204R018.0001.0005.0000";
       } else if (selectedValue === "NGS2 H2 Diffuser") {
      resultTextbox.value = "104R018.0001.0004.0004";
       } else if (selectedValue === "VEEx Improvements") {
      resultTextbox.value = "201H406.4022.4000.0008";
       } else if (selectedValue === "VEEx Spares") {
      resultTextbox.value = "201H406.4022.4000.0013";
       } else if (selectedValue === "VEEx Maintenance") {
      resultTextbox.value = "201H406.4022.4000.0001";
       } else if (selectedValue === "Other") {
      resultTextbox.value = "";
      }
    }

function makeDataTable() {
    const dataProject = document.getElementById('cc').value;
    const dataDescription = document.getElementById('description').value;
    const dataQty = document.getElementById('qty').value;
    const dataMaterial = document.getElementById('materials').value;
    const dataDue = document.getElementById('dueDate').value;
    const dataCharge = document.getElementById('chargeCode').value;
    const dataClean = document.getElementById('cleaningSteps').value;
    const dataTemplate = document.getElementById('templateEwo').value;
    const dataNotes = document.getElementById('notesCPV').value;
    const dataIdentifier = document.getElementById('identifier').value;
    
    if (dataMaterial == 'Stainless Steel') {
        document.getElementById('identifier').value = dataProject;
    }
}

    //HTTP POST request to the Node.js API
function newComment(dataToSend) {
    return fetch(`${myIP}jules/makeewo`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataToSend)
    })
    .then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json()
    })
    .then(data => {
    console.log('Response from the API:', data);
    return data;
    })
    .catch(error => {
    console.error('Error sending object to API:', error);
    });
}