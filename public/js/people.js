const peopleHomepage = () => /*html*/`
<html>
    <head>
        <title>People of Blue</title>
        <link rel='stylesheet' href='css/people.css'>
        <script src="https://unpkg.com/htmx.org@1.7.0/dist/htmx.min.js"></script>
    </head>
    <body>
        <h2>People of Blue</h2>
        <div id='search-box'>
            <input type='search'
                name = 'search'
                placeholder = 'search by name or tags'
                hx-post='/people/search'
                hx-trigger='keyup changed delay:500ms'
                hx-target='#search-list'
                hx-swap='inner-html'>
        </div>
        <form hx-on:click='/people/user'
            hx-on:htmx:after-request='document.querySelector("form").reset()'
            hx-post='/people/user'
            hx-swap='innerHTML' hx-target='#you'>
            <input type='text' name='id' placeholder='username'>
            <button>Find Person</button>
        </form>
        <div id='search-list'>
        </div>
        <div id='you'>
        </div>
    </body>
</html> `

const showPeople = (people) => /*html*/`
<ul>
    <li>${people}</li>
</ul>`

const showPerson = (person) => /*html*/`
  <h2 id="person-name">${person.name}</h2>
    <div id="att-div">
        <h3 id="att-pos"></h3>
        <ul id="att-list">${person.tags}</ul>
    </div>
`

module.exports = { peopleHomepage, showPeople, showPerson }
// exports.peopleHomepage = peopleHomepage()
// exports.showPeople = showPeople()