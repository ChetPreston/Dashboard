const cow1 = document.getElementById('cow1')
const cow2 = document.getElementById('cow2')
const displayData = document.querySelector('#ewo-table')
const ewoID = document.getElementById('id-input')
const deleteButton = document.getElementById('delete-button')
const refreshButton = document.getElementById('refresh-button')
const oktaButton = document.querySelector('#okta-button')
const updateButton = document.getElementById('update-button')
const errorMsg = document.getElementById('input-error')
const runButton = document.getElementById('run-button')
const addButton = document.getElementById('add-button')


// Add functions to buttons and images
deleteButton.addEventListener('click', function() {
  let x = ewoID.value
  deleteRow(x)
})

refreshButton.addEventListener('click', function() {
  
})

oktaButton.addEventListener('click', function() {
  oktaVerify()
})

updateButton.addEventListener('click', function() {
  julesUpdate()
})

runButton.addEventListener('click', function() {
  runAll()
})

addButton.addEventListener('click', function() {
  window.location.href = 'ewo'
})

// Add other functions
function displayEwos() {
  return getReq(`api/jules`).then((data) => {
        displayTable(data)
    })
}

function deleteRow(x) {
  getReq(`api/jules/delete/${x}`)
  //displayEwos()
}

function applyCSS() {
    var element = document.getElementById("excel-data");
    element.classList.add("excel-borders");
    }

function julesModify() {
  return getReq(`jules`).then((data) => {
    let x = ewoID.value;
    let y = 0;
    for (let i  = 0; i < data.length; i++) {
      if (x == data[i].id) return y = data[i].number
    }
    if (!y) return console.log('No eWo found by that ID')
    y.toString()
  }).then((y) => {
    getReq(`api/jules/modify/${y}`)
  })
}

function julesModify2() {
  let y = '1236889'
    getReq(`api/jules/modify/${y}`)
}

function julesRefresh() {
  getReq(`api/jules/status`)
}

function oktaVerify() {
  getReq(`api/okta`)
}

function runAll() {
  x = ewoID.value
  const role = document.cookie.role
  const decoded = document.cookie
  const decoded2 = decoded.split(';')
  let admin = false;
  for (let i=0; i< decoded2.length; i++){

    if (decoded2[i].includes('role')) {
      console.log('role')
      if (decoded2[i].includes('admin')) {
    
        admin = true;
      }
    }
  }
  if (admin) getReq(`api/jules/create`)
  else errorMsg.textContent = 'Sorry, you do not have access to run the script :( contact an admin'
}
    


function julesUpdate(x) {
  if (x) getReq(`api/jules/status/${x}`)
  else errorMsg.textContent = 'Enter an ID in the box to the left before updating'
}

// function getReq(req) {
//   return fetch(req)
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Sorry, Network response was not ok');
//     }
//     return response.json().then((data) => {
//       return data;
//     }).catch(error => {
//       console.error("Error loading the JSON file", error);
//       })
//   });
// }

function getSTM(req) {
  return fetch(req, {
      method: 'GET',
      mode: 'no-cors'
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Sorry, Network response was not ok');
    }
    return response.json().then((data) => {
      return data;
    }).catch(error => {
      console.error("Error loading the JSON file", error);
      })
  });
}

function getText(req) {
  return fetch(req)
  .then(response => {
      if (!response.ok) {
          throw new Error('Network no good bro :(');
      }
      return response.text();
  })
  .then(data => {
      console.log('Test from API:', data)
      return data
  })
  .catch(error => {
      console.error('Error:', error)
  })
}

function displayTable(com) {
  displayData.innerHTML += "<tbody>"
  for (let i = 0; i < com.length; i++){
      displayData.innerHTML += `
      <tr class='data-row'>
        <td>${com[i].id}</td>
        <td>${com[i].site}
        <td>${com[i].project}</td>
        <td>${com[i].description}</td>
        <td>${com[i].quantity}</td>
        <td>${com[i].material}</td>
        <td>${com[i].duedate}</td>
        <td>${com[i].chargecode}</td>
        <td>${com[i].cleaning}</td>
        <td>${com[i].template}</td>
        <td>${com[i].notes}</td>
        <td>${com[i].name}</td>
        <td>${com[i].re}</td>
        <td>${com[i].spec}</td>
        <td>${com[i].number}</td>
        <td>${com[i].status}</td>
      </tr>
      `
  }
  displayData.innerHTML += '</tbody>'
}

window.onload = displayEwos();