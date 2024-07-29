// DOCUMENT VARIABLES
const oneNoteButton = document.getElementById("one-note")
const commentBox = document.getElementById("comment-box")
const commentSubmit = document.getElementById("comment-submit")
const schedulesButton = document.querySelector("#schedules")
const terminalRoomButton = document.getElementById("terminal-room")
const commentDiv = document.getElementById("comments")
const commentName = document.querySelector("#comment-name")
const createButton = document.querySelector('#create-account')
const projectDropdown = document.querySelector('#projects-dd')
const projectName = document.querySelector('#project-name')
const projectsButton = document.getElementById('projects-button')
const projectDisplay = document.getElementById('project-display')
const modifyProjects = document.querySelector('#modify-projects')
const fileInput = document.getElementById('fileInput');
const previewImage = document.getElementById('previewImage');
const imageUpload = document.getElementById('image-upload')
const newsDiv = document.querySelector('#news-div')
const testSchedBtn = document.querySelector('#test-scheds')

// JS VARIABLES
const sched = 'https://blueorigins.sharepoint.us/:x:/r/sites/TFO/_layouts/15/doc2.aspx?sourcedoc=%7BA2A542F7-A160-42C7-A50E-9C6F0F2FBA2D%7D&file=Shift%20Schedules%2C%20PTO%20%26%20Travel%20Calendar.xlsx&action=default&mobileredirect=true';
const cookies = document.cookie
const decoded = cookies.split(';')
const testSched = 'https://blueorigins-my.sharepoint.us/:x:/g/personal/brandels_blueorigin_com/EWF4BG6YgDJKvFi7rrgepwYBDS1JwYd2GoBI72tkZuGTDQ?clickparams=eyJBcHBOYW1lIjoiVGVhbXMtRGVza3RvcCIsIkFwcFZlcnNpb24iOiI0OS8yNDAyMDIwNTUxNSIsIkhhc0ZlZGVyYXRlZFVzZXIiOmZhbHNlfQ%3D%3D';
let admin = false;
// getReq('auth/user').then((data) => {
//     console.log(data.role)
//     console.log(typeof data.role)
//     const status = data.role;
//     console.log(status)
//     if (admin) { fileInput.style.display = 'block'; imageUpload.style.display = "block"; }
//     else { fileInput.style.display = 'none'; imageUpload.style.display = 'none' }
//     return admin = true;
//     if (status) { console.log(admin); return admin = true; }
// })
for (let i=0; i< decoded.length; i++){
  if (decoded[i].includes('role')) {
    if (decoded[i].includes('admin')) {
      admin = true;
      console.log(admin)
    }
  }
}
let file;

// Define button clicks
projectsButton.addEventListener('click', function() {
    window.open('https://shorturl.at/fosG8', '_blank')
})

projectDropdown.addEventListener('change', function() {
    if (this.value === 'Overview') projectInfo(0)
    else{
        return getReq(`api/projects/veex`).then((data) => {
            //console.log(data.length)
            let id = -1;
            for (let i  = 0; i < data.length; i++) {
                if (data[i].name == this.value) {
                    id = data[i].id
                }
            }
            projectInfo(id)
            projectComments(id, this.value)
        })
    }
})

function renameImage() {
    getReq(`comments/image-name/${projectDropdown.value}`)
}

imageUpload.addEventListener('click', function() {
    window.location.href = 'veex'
})

oneNoteButton.addEventListener('click', function() {
    window.open('https://blueorigins-my.sharepoint.us/:o:/g/personal/skennedy3_blueorigin_com/Ego1odq3ygJDg92rOmz7os4BO7NQnRhMtorzYdHwAsw-DA', '_blank');
})

testSchedBtn.addEventListener('click', function() {
    window.open(testSched ,'_blank')
})

schedulesButton.addEventListener('click', function() {
    window.open(sched, '_blank');
})

terminalRoomButton.addEventListener('click', function() {
    window.location.href = 'veexTR';
})

modifyProjects.addEventListener('click', function() {
    window.location.href = 'projects'
})

// Opening section
veexButton.style.color = 'red';
veexButton.style.backgroundColor = 'blue';
getProjects()
projectInfo(0)



// if (admin) { fileInput.style.display = 'block'; imageUpload.style.display = "block"; }
// else { fileInput.style.display = 'none'; imageUpload.style.display = 'none' }

function autoExpand(box) {
    box.style.height = 'auto';
    box.style.height = box.scrollHeight + 'px'
}

// Quote Section


// Image Section
// function uploadImage() {
//     newImage = 
// postReq(newImage, 'comments/image')
// }



// Comments section
fileInput.addEventListener('click', function() {
    handleImageUpload()
    getReq(`comments/image-name/${projectDropdown.value}`)
})
function handleImageUpload() {
   
    fileInput.onchange = function () {
        file = fileInput.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            previewImage.src = e.target.result;
            previewImage.style.display = 'block';
        }
        reader.readAsDataURL(file)
    }
    // postReq(file, 'comments/image')
}

///////////////////////////////////
// initComments()

// function initComments() {
//     return getReq(`comments`).then((data) => {
//         displayComments(data)
//     })
// }


commentSubmit.addEventListener('click', function() {
    commentDiv.innerHTML = "" 
    // console.log(newCom)
    getReq(`api/comments/getid/${projectDropdown.value}`).then((data) => {
        const pid = data[0].id;
        // console.log(data)
        // console.log(pid)
        let newCom = { name:'', msg:commentBox.value, PID:pid }
        newComment(newCom)
        projectComments(pid, projectDropdown.value)
        // commentBox.value = '';
    })
    
})

// function showComment(id = 5) {
//     return getReq(`comments/${id}`).then((data) => {
//         let com = data;
//         console.log(com)
//     })
// }

function displayComments(com) {
    commentDiv.innerHTML = ''
    for (let i = 0; i < com.length; i++){
        
        commentDiv.innerHTML += `
        <span class='comment-span'><p class='white-text'>
        ${com[i].msg}
        </p>
        <p class='gold-text'> ~ ${com[i].name}
        </p></span>`
    }
}




//HTTP POST request to the Node.js API
function newComment(dataToSend) {
    return fetch(`comments/post`, {
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

// Project Section Handling

function getProjects() {
    return getReq(`api/projects/veex`).then((data) => {
      //  console.log(data)
      projectDropdown.innerHTML = `<option value = 'Overview'>Overview</option>`
        for (let i = 0; i < data.length; i++) {
            projectDropdown.innerHTML += `
            <option value ='${data[i].name}'>${data[i].name}</option>
            `
        }
    })
}

function projectComments(id, name) {
    // Set Image
        previewImage.src = 'images/' + name + '.jpg';
        previewImage.style.display = 'block'
    // Get Comments
    getReq(`api/projects/veex/comments/${id}`).then((data) => {
        displayComments(data)
    })
}

function projectInfo(id) {
    projOver = document.getElementById('project-overview')
    projDisp = document.getElementById('project-display')
    if (id === 0) {
        getReq('api/projects/veex').then((data) => {
            allUsers = data;
            projDisp.style.display = 'none'
            projOver.style.display = 'block'
            newsDiv.style.display = 'none'
            tableOver = document.getElementById('table-overview')
            tableOver.innerHTML = '';
            // tableHead = document.getElementById('table-head')
            tableHead = '<tr>';
            // tableOver.innerHTML = '<tr id="table-head"></tr>';
            //  keys = Object.keys(data[0]) // This has to be made static in order not to edit the names in all other fiends :(
            keys = ['Name', 'Manager', 'A', 'A', 'A', 'B', 'B', 'B', 'DS', 'DS', 'DS', 'DS', 'Active']
            keynums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14]
            let dtest = data[0];
            let keysTest = Object.values(dtest)
            let keysNew = keynums.map(index => keysTest[index])
            let newTable = '';

            for (i = 0; i < keys.length; i++) {
                tableHead += `
                <th>${keys[i]}</th>
                `
                // console.log(keys[i]) Object.keys(data[0]).length-3
            }
            tableHead += '</tr>'
            for (i = 0; i < data.length; i++) {
                projVals = Object.values(data[i])
                valsNew = keynums.map(index => projVals[index])
                newTable += '<tr>'
                for (j = 0; j < valsNew.length; j++) {
                    newTable += `<td>${valsNew[j]}</td>`
                }
                newTable += '</tr>'
            }
            const newTableFixed = newTable.replace(/null+/g, '');
            tableOver.innerHTML += tableHead + newTableFixed
        })
    } else {  
            projDisp.style.display = 'block'
            projOver.style.display = 'none'
            newsDiv.style.display = 'block'
            getReq(`api/projects/veex/${id}`).then((data) => {
        // console.log(Object.values(data))
        // keys = Object.keys(data)
        // values = Object.values(data)
            Object.keys(data).forEach(key => {
                if (data[key] === null) {
                    data[key] = '';
                }
            })
            // Project Info
            document.getElementById('project-name').textContent = data.name;
            document.getElementById('project-manager').textContent = data.manager;
            document.getElementById('eng-a').textContent = data.shiftA1 + ' - ' + data.shiftA2 + ' - ' + data.shiftA3 
            document.getElementById('eng-b').textContent = data.shiftB1 + ' - ' + data.shiftB2 + ' - ' + data.shiftB3 
            document.getElementById('dsce').textContent = data.dsceA1 + ' - ' + data.dsceB1 + ' - ' + data.dsceA2 + ' - ' + data.dsceB2
            document.getElementById('summary').textContent = data.summary
            isActive = document.getElementById('is-active')
            if (data.active === '1' || data.active == 'true') { isActive.textContent = 'ACTIVE'; isActive.style.color='green' }
            else { { isActive.textContent = 'INACTIVE'; isActive.style.color='red' }}
            isActive.style.marginBottom='10px'
        })
    }
}

//projectComments(1, 'GS2 Recirculation Pump')
