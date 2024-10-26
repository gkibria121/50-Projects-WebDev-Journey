const main = document.querySelector(".main")
const form =  document.getElementById('from');
const searchInput = document.querySelector('.search')
const API_URL = 'https://api.github.com/users/'

 

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const username = searchInput.value;
    getUserProfile(username)
    
})


async function getUserProfile(userName){
    try{
        const {data} = await axios.get(API_URL+userName)
        createUserCard(data)
        getRepos(userName)
    }
    catch (e){
        createError("No Profile found with this username")
    } 
}


function createUserCard(user){
    const card = `<div class="card">     
            <img class="profile-img" src="${user.avatar_url}" alt="${user.name??user.login}">
            <div class="user-info">
                <h4>${user.name??user.login}</h4>
                <p>${user.bio??""}</p>
                <ul class="user-info-list">
                    <li>${user.followers} <strong>Followers</strong></li>
                    <li>${user.following} <strong>Following</strong></li>
                    <li>${user.public_repos} <strong>Repos</strong></li>
                </ul>
                <div class="repos">
                     
                </div>
            </div>
        </div>`
    main.innerHTML = card;
}

async function getRepos(userName){
    try{
        const {data} = await axios.get(API_URL+userName+"/repos")
        console.log(data);
        
        addReposToCard(data)
    }
    catch (e){
        createError("Problem fetching repos.");
        
    } 
}

function addReposToCard(repos){
    const reposEl = main.querySelector('.repos')

    repos.slice(0,5).forEach((repo)=>{
        const repoEl = document.createElement('a')
        repoEl.classList.add('repo')
        repoEl.href = repo.html_url
        repoEl.innerText  = repo.name
        reposEl.appendChild(repoEl)
        
    })
}

function createError(msg){
    const errorEl = `<div class="card">
    <h2>${msg}</h2>
    </div>`
    main.innerHTML = errorEl;
}