var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var getUserRepos = function(user){
// format the github api url
var apiUrl = `https://api.github.com/users/${user}/repos`;

//make a requerst to the url
fetch(apiUrl).then(function(response){
    response.json().then(function(data){
        console.log(data);
    })
})
};

var formSubmitHandler = function(event){
    event.preventDefault();

    //get the value from the input element
    var username = nameInputEl.value.trim();

    if(username){
        getUserRepos(username);
        nameInputEl.nodeValue = '';

    }
    else{
        alert("please enter a github username");
    }
};

userFormEl.addEventListener("submit", formSubmitHandler);
