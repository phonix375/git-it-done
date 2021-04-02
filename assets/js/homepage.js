var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");
var languageButtonsEl = document.querySelector('#language-buttons');

var getFeaturedRepos = function(language){
    console.log('this is working');
    var apiUrl = "https://api.github.com/search/repositories?q=" + language + "+is:featured&sort=help-wanted-issues";
    console.log(apiUrl);

    fetch(apiUrl).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                displayRepos(data.items, language);
            })
        }
        else{
            alert("Error: " + response.statusText);
        }

    })
};

var getUserRepos = function(user){
// format the github api url
var apiUrl = `https://api.github.com/users/${user}/repos`;

//make a requerst to the url
fetch(apiUrl).then(function(response) {
    if (response.ok) {
      response.json().then(function(data) {
        displayRepos(data, user);
      });
    } else {
      alert("Error: " + response.statusText);
    }
  })
  .catch(function(error){
      //catch other errors
      alert("Unable to connect to GitHub");
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
var displayRepos = function(repos, searchTerm){
    //check if api retured an repos
    if(repos.length === 0){
        repoContainerEl.textContent = "No repositories found.";
        return;
    }
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;
    console.log(repos);
    console.log(searchTerm);

    //loop over repos
    for (var i = 0; i < repos.length; i++) {
        // format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;
      
        // create a container for each repo
        var repoEl = document.createElement("a");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        repoEl.setAttribute('href',"./single-repo.html?repo="+repoName);
      
        // create a span element to hold repository name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;
      
        // append to container
        repoEl.appendChild(titleEl);
      
        //create status element
        var statusEl = document.createElement('span');
        statusEl.classList = "flex-row align-center";

        //check if current repo has issues or not
        if(repos[i].open_issues_count > 0){
            statusEl.innerHTML = "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        }
        else{
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
            }

        //append to container
        repoEl.appendChild(statusEl);

        // append container to the dom
        repoContainerEl.appendChild(repoEl);
      
    }
}
var buttonClickHandler = function(event){
    var language = event.target.dataset.language ;
    console.log(language);
    getFeaturedRepos(language);
    repoContainerEl.textContent = '';
}
languageButtonsEl.addEventListener("click", buttonClickHandler);
userFormEl.addEventListener("submit", formSubmitHandler);
