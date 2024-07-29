const msgFP = document.getElementById('msg-fp')
const emailFP = document.getElementById('email-fp')
const helpBtn = document.getElementById('help-login')
const myIP = 'http://10.80.130.91:3000/'

helpBtn.addEventListener('click', function() {
    // console.log(emailFP)
    if (!emailFP.value) {
        // console.log(emailFP.value)
        msgFP.textContent = 'Enter email address'
    } 
    else {
        console.log(emailFP.value)
        sendPassword()
    }
})

function sendPassword() {
    const emailAdd = {
        email: emailFP.value
    }
    postReq(emailAdd, 'auth/forgot').then((data) => {
        msgFP.textContent = data.msg;
    })
}

function postReq(dataToSend, api) {
    return fetch(`${myIP}${api}`, {
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