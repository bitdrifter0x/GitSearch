let searchBtn = document.getElementById('searchBtn')
let searchInput = document.getElementById('searchInput')
let profileContainer = document.getElementById('profileContainer')
let profileCard = document.getElementsByClassName('profileCard')

async function getUser(username) {
    try {
        let response = await fetch(`https://api.github.com/users/${username}`)
    let data = await response.json()
    if (data.message === 'Not Found') {
    profileContainer.innerHTML = `<p>User not found</p>`
    return
}
    getuserRepos(username)
    renderProfile(data)
    } catch (error) {
        profileContainer.innerHTML = `<p>Something went wrong. Please try again.</p>`
        console.log(error)
    }
}

function renderProfile(data) {

    let joinedDate = new Date(data.created_at).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })

    profileContainer.innerHTML = `
    <div class="profileCard">
        <div class = "cardTop">
        <div class = "profileImg">
        <img src="${data.avatar_url}" alt="${data.name}">
        </div>
        <div class = "profileDetails">
        <h2>${data.name}</h2>
        <p>${data.bio || 'No bio available'}</p>
        <p>Joined: ${joinedDate}</p>
        </div>
        </div>
        <div class = "KPI">
        <p>Repos: ${data.public_repos}</p>
        <p>Followers: ${data.followers}</p>
        <p>Following: ${data.following}</p>
        </div>
        <h4>User Repositories:</h4>
        <div id="repoContainer"></div>
    </div>`
    

    
}

function renderRepos(repos) {
    let repoContainer = document.getElementById('repoContainer')
    repos.forEach(repo => {
        let div = document.createElement('div')
        div.innerHTML = `<div class = "repoItem"><a href="${repo.html_url}" target="_blank">${repo.name}</a></div>`
        repoContainer.appendChild(div)
    })
}


async function getuserRepos(username) {
    let response = await fetch(`https://api.github.com/users/${username}/repos`)
    let data2 = await response.json()
    console.log(data2)
    renderRepos(data2)
}

searchBtn.addEventListener('click', (e) => {
    e.preventDefault()

    let username = searchInput.value.trim()
    
    if (!username) return

    profileContainer.innerHTML = `<p>Loading...</p>`
    getUser(username)
    searchInput.value = ''
})

let debounceTimer

// searchInput.addEventListener('input', () => {
//     clearTimeout(debounceTimer)
//     debounceTimer = setTimeout(() => {
//         let username = searchInput.value.trim()
//         if (!username) return
//         profileContainer.innerHTML = `<p>Loading...</p>`
//         getUser(username)
//     }, 800)
// })

