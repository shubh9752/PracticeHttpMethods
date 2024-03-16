const apiEndpoint = "https://crudcrud.com/api/04fe2d13a6ca4618901d2fc7b2bc082c";
const ul = document.getElementsByTagName("ul")[0]; // Assuming there's only one ul element
const searchInput = document.getElementById("searchInput");

// Function to fetch and display users
async function displayUsers1() {
    ul.innerHTML = ''; // Clear the existing list
    const response = await axios.get(`${apiEndpoint}/passkeeper`);
    const users = response.data;
    const searchTerm = searchInput.value.toLowerCase().trim(); // Get the search term
    users.forEach(user => {
        const username = user.username.toLowerCase();
        const password = user.password.toLowerCase();
        if (username.includes(searchTerm) || password.includes(searchTerm)) {
            const li = document.createElement('li');
            li.innerHTML = `
                <h3>Username: ${user.username} | Password: ${user.password}</h3>
                <button class="edit-btn" onclick="editUser('${user._id}')">Edit</button>
                <button class="dlt-btn" onclick="deleteUser('${user._id}')">Delete</button>
            `;
            ul.appendChild(li);
        }
    });
}

// Add an event listener to the search input field
searchInput.addEventListener('input', displayUsers1);

// Function to fetch and display users
async function handleInfoForm(event) {
    event.preventDefault();
    const userDetails = {
        username: event.target.username.value,
        password: event.target.password.value,
    };
    const { username, password } = userDetails;
    await saveUser(username, password);
    await displayUsers();
}

async function saveUser(username, password) {
    await axios.post(`${apiEndpoint}/passkeeper`, { username, password });
}

async function displayUsers() {
    ul.innerHTML = ''; // Clear the existing list
    const response = await axios.get(`${apiEndpoint}/passkeeper`);
    const users = response.data;
    users.forEach(user => {
        const li = document.createElement('li');
        li.innerHTML = `
            <h3>Username: ${user.username} | Password: ${user.password}</h3>
            <button class="edit-btn" onclick="editUser('${user._id}')">Edit</button>
            <button class="dlt-btn" onclick="deleteUser('${user._id}')">Delete</button>
        `;
        ul.appendChild(li);
    });
}

async function editUser(userId) {
    const newName = prompt("Enter new username:");
    const newPassword = prompt("Enter new password:");
    await axios.put(`${apiEndpoint}/passkeeper/${userId}`, { username: newName, password: newPassword });
    await displayUsers();
}

async function deleteUser(userId) {
    await axios.delete(`${apiEndpoint}/passkeeper/${userId}`);
    await displayUsers();
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', handleInfoForm);
    displayUsers();
});
