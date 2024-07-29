const createButton = document.querySelector('#create-button')
const usernameBox = document.querySelector('#username')
const passwordBox = document.querySelector('#password')
const loginButton = document.getElementById('login-button')
const logoutButton = document.getElementById('logout-button')
const msg = document.getElementById('msg')
const emailBox = document.getElementById('email')
const forgotPassword = document.getElementById('forgot-password')


// Initialize
msg.textContent = ''
const myIP = '10.80.130.91'

// Create button functions


createButton.addEventListener('click', function(){
    if (!emailBox.value || !passwordBox.value || !usernameBox.value) {
        msg.textContent = "email, name and password are required"
    }
    else if (passwordBox.value.length < 6) msg.textContent = "password must be at least 6 characters long"
    else createUser()
})

loginButton.addEventListener('click', function(){ 
    if (!emailBox.value || !passwordBox.value) {
        msg.textContent = "email and password are required"
    }
    else loginUser()
})

logoutButton.addEventListener('click', function() {
    logoutUser()
})

forgotPassword.addEventListener('click', function() {
    findPassword()
})

// User creation function
function createUser() {
    const api = 'auth'
    const data = {
        email: emailBox.value,
        username: usernameBox.value,
        pw: passwordBox.value,
    }
    postReq(data, api).then((res) => {
        msg.textContent = res.msg + '   -   Redirecting to main page....'
        if (res.success) {
            setTimeout(() => {
                window.location.href = '/';
            }, 3000);
        }
    })
}
    

function loginUser () {
    const api = 'login'
    const data = {
        email: emailBox.value,
        password: passwordBox.value,
    }
    postReq(data, api).then((res) => {
        console.log(res)
        msg.textContent = res.msg
        if (res.status) {
            window.location.href = '/';
        }
    })
}

function logoutUser() {
    fetch('logout')
    window.location.href = '/';
}

function findPassword() {
    window.location.href = '/auth/fp';
}
// Server function

function getReq(req) {
    return fetch(req)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json().then((data) => {
        output.appendChild(p);
        // });
        return data;
      }).catch(error => {
        console.error("Error loading the JSON file", error);
        })
    });
}

//HTTP POST request to the Node.js API
function postReq(dataToSend, api) {
    return fetch(`http://${myIP}:3000/${api}`, {
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
    //console.log('Response from the API:', data);
    return data;
    })
    .catch(error => {
    console.error('Error sending object to API:', error);
    });
}