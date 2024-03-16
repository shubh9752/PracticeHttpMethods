const apiEndpoint = "https://crudcrud.com/api/04fe2d13a6ca4618901d2fc7b2bc082c";

// Function to fetch and display users
const ul=document.getElementsByTagName("ul");

function handleInfoForm(event){

    event.preventDefault();
    
    const userDetails = {
      username: event.target.username.value, 
      password: event.target.password.value,
    };
    const {username,password}=userDetails
    showLi(username,password);

}

async function showLi(username,password){
    let res= await axios.post(`${apiEndpoint}/passkeeper`,{
        username,
        password,
    })
    let getRequest=await axios.get(`${apiEndpoint}/passkeeper`);
 
    for(var i=0; i<getRequest.data.length; i++){
        const li=document.createElement('li');
        li.innerHTML=`<h3>username:${getRequest.data[i].username}  Password:${getRequest.data[i].password}  <button class="edit-btn">edit</button><button class="dlt-btn">delete</button></h3>`
        ul[0].appendChild(li);
    }



}