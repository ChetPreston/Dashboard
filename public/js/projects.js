const mainForm = document.getElementById("main-form")
const veexButtonP = document.getElementById("veex")
const geexButtonP = document.getElementById("geex")
const xeexButtonP = document.getElementById("xeex")
const alabamaButtonP = document.getElementById("4670")
const addProjectButton = document.querySelector('#add-project')
const removeProjectButton = document.querySelector('#remove-project')
const projectDropdown = document.querySelector('#projects-dd')
const projectName  = document.getElementById('project-name')
const projectManager = document.getElementById('manager')
const shiftA1 = document.getElementById('a1')
const shiftA2 = document.getElementById('a2')
const shiftA3 = document.getElementById('a3')
const shiftB1 = document.getElementById('b1')
const shiftB2 = document.getElementById('b2')
const shiftB3 = document.getElementById('b3')
const dsceA1 = document.getElementById('dsce-a1')
const dsceA2= document.getElementById('dsce-a2')
const dsceB1 = document.getElementById('dsce-b1')
const dsceB2 = document.getElementById('dsce-b2')
const projectSummary = document.getElementById('sum-box')
const projectActive = document.getElementById('active')
const modNote = document.getElementById('mod-note')

// Modifying header buttons
// homeButton.addEventListener('click', function() {
//     window.location.href = '../blue.html';
//   })
// veexButton.addEventListener('click', function() {
// window.location.href = '../veex.html'
// })

displayForm('veex')
let site = 'veex'

removeProjectButton.addEventListener('click', removeProject)
addProjectButton.addEventListener('click', addProject)

document.querySelectorAll('input[type=radio]').forEach(function(radio) {
    radio.addEventListener('change', function() {
        console.log(`Value has been changed to ${radio.value}`)
        displayForm(radio.value)
        site = radio.value
        projectDropdown.addEventListener('change', function() {
            return getReq(`api/projects/${site}`).then((data) => {
                //console.log(data.length)
                let id = -1;
                for (let i  = 0; i < data.length; i++) {
                    if (data[i].name == this.value) {
                        id = data[i].id
                    }
                }
                projectInfo(site, id)
            })
        })
        return site
    })
})

getProjects('veex')
projectInfo(site, 1)

projectDropdown.addEventListener('change', function() {
    if (this.value == 'new') {
        resetForm()
    }
    else {
        return getReq(`api/projects/${site}`).then((data) => {
            //console.log(data.length)
            let id = -1;
            for (let i  = 0; i < data.length; i++) {
                if (data[i].name == this.value) {
                    id = data[i].id
                }
            }
            projectInfo(site, id)
        })
    }
})

function displayForm(site) {
    // addProjectButton.removeEventListener('click', addProject) 
    // addProjectButton.addEventListener('click', addProject)

    switch(site) {
        case 'veex':
            console.log('1')
            break;
        case 'geex': 
            console.log('2')
            break
        case 'xeex':
            console.log('3')
            break;
        case '4670':
            console.log('4')
            break;
    }
}

function expandBorders(box) {
    box.style.height = 'auto';
    box.style.height = box.scrollHeight + 'px'
}

function addProject() {
    if (projectDropdown.value == 'new') url = `api/projects/${site}/add` 
    else url = `api/projects/${site}/edit/${projectDropdown.value}` 

    // console.log(url)
    newProject = {
            name:projectName.value,
            manager:projectManager.value,
            shiftA1:shiftA1.value,
            shiftA2:shiftA2.value,
            shiftA3:shiftA3.value,
            shiftB1:shiftB1.value,
            shiftB2:shiftB2.value,
            shiftB3:shiftB3.value,
            dsceA1:dsceA1.value,
            dsceB1:dsceB1.value,
            dsceA2:dsceA2.value,
            dsceB2:dsceB2.value,
            summary:projectSummary.value,
            active:projectActive.checked,
    }
    console.log(newProject)
    postReq(newProject, url).then((data) => {
        modNote.textContent = data.msg
    })
}

function removeProject() {
    url = `api/projects/${site}/delete/${projectName.value}`
    getReq(url).then((data) => {
        console.log(data.msg)
    }) 
}

function projectInfo(site, id) {
    getReq(`api/projects/${site}/${id}`).then((data) => {
        Object.keys(data).forEach(key => {
            if (data[key] === null) {
                data[key] = '';
            }
        })
        projectName.value = data.name;
        projectManager.value = data.manager;
        shiftA1.value = data.shiftA1;
        shiftA2.value = data.shiftA2;
        shiftA3.value = data.shiftA3;
        shiftB1.value = data.shiftB1;
        shiftB2.value = data.shiftB2;
        shiftB3.value = data.shiftB3;
        dsceA1.value = data.dsceA1;
        dsceB1.value = data.dsceB1;
        projectSummary.value = data.summary;
        if (data.active == 'true' || data.active == '1') { projectActive.checked = true; }
        else {projectActive.checked = false }
        // projectActive.ariaChecked = data.active;
        // console.log(projectActive)
    })

}

function resetForm() {
    projectName.value = ''
    projectManager.value = ''
    shiftA1.value = ''
    shiftA2.value = ''
    shiftA3.value = ''
    shiftB1.value = ''
    shiftB2.value = ''
    shiftB3.value = ''
    dsceA1.value = ''
    dsceB1.value = ''
    projectSummary.value = ''
    projectActive.checked = false
}



function getProjects(site) {
    return getReq(`api/projects/${site}`).then((data) => {
      //  console.log(data)
        for (let i = 0; i < data.length; i++) {
            projectDropdown.innerHTML += `
            <option value ='${data[i].name}'>${data[i].name}</option>
            `
        }
        projectDropdown.innerHTML += '<option value="new">New Project</option>'
    })
}
