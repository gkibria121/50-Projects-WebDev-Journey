// DOM Elements
const input = document.getElementById('search');
const userContainer = document.querySelector('.user-list');

// Global variable to hold user data
let users = [];

// Event listener for input
input.addEventListener('input', handleInput);

// Initial call to display users
showUsers();
 


function handleInput(event) {
    const query = event.target.value.toLowerCase();
    const filteredUsers = users.filter(user => filterUser(user, query));
    updateDOM(filteredUsers);
}

 
async function showUsers() {
    try {
        users = await getUsers("https://randomuser.me/api/?results=10");
        updateDOM(users);
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}

 
async function getUsers(url) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.status}`);
    }

    const data = await response.json();
    return data.results.map(user => ({
        name: `${user.name.title} ${user.name.first} ${user.name.last}`,
        location: `${user.location.state}, ${user.location.country}`,
        image: user.picture.large,
    }));
}

 
function updateDOM(users) {
    userContainer.innerHTML = ''; // Clear existing content
    users.forEach(user => userContainer.appendChild(createUserElement(user)));
}

 
 
function createUserElement(user) {
    const userEl = document.createElement('li');
    userEl.classList.add('user');
    userEl.innerHTML = `
        <img src="${user.image}" class="profile_image" alt="${user.name}" />
        <div class="info">
            <h5 class="name">${user.name}</h5>
            <small>${user.location}</small>
        </div>
    `;
    return userEl;
}

 
function filterUser(user, query) {
    return user.name.toLowerCase().includes(query) || user.location.toLowerCase().includes(query);
}
