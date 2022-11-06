const overview = document.querySelector(".overview");
const repoList = document.querySelector(".repo-list");
const repoData = document.querySelector(".repo-data");
const backButton = document.querySelector(".view-repos");
// this class is added through javascript in a function below called displayRepo
const repo = document.querySelector(".repo");


// Display personal data
const username = "rafia-farooq";


const personalData = async function () {
    const response = await fetch (`https://api.github.com/users/${username}`);
    const data = await response.json();
    // console.log(data);
    
    displayData(data);
};

personalData();

const displayData = function (data) {
    // fetch data
    const name = data.name;
    const bio = data.bio;
    const location = data.location;
    const numOfRepos = data.public_repos;
    const imageURL = data.avatar_url;

    // create a div tag
    const userInfo = document.createElement("div");
    userInfo.classList.add("user-info");
    overview.append(userInfo);

    // create figure tag
    const figure = document.createElement("figure");
    figure.classList.add("figure");
    userInfo.append(figure);

    // create image tag
    const image = document.createElement("img");
    image.src = imageURL;
    image.classList.add("img");
    figure.append(image);

    // create a div tag for information of user
    const info = document.createElement("div");
    userInfo.append(info);

    // get individual data
    info.innerHTML = 
    `<p> <strong>Name: </strong> ${name}</p>
    <p> <strong>Bio: </strong> ${bio}</p>
    <p> <strong>Location: </strong> ${location}</p>
    <p> <strong>Number of Public Repos: </strong> ${numOfRepos}</p>`;

    // fetch repo data
    repos();
    
};

// or a shorter way:
// 
// const displayUserInfo = function (data) {
//     const div = document.createElement("div");
//     div.classList.add("user-info");
//     div.innerHTML = `
//       <figure>
//         <img alt="user avatar" src=${data.avatar_url} />
//       </figure>
//       <div>
//         <p><strong>Name:</strong> ${data.name}</p>
//         <p><strong>Bio:</strong> ${data.bio}</p>
//         <p><strong>Location:</strong> ${data.location}</p>
//         <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
//       </div>
//     `;
//     overview.append(div);
//   };


// Display repos

// fetch repo data
const repos = async function () {
    const response = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&&per_page=100`);
    const data = await response.json();
    console.log(data);
    displayRepo(data);
};



// show repo names on website
const displayRepo = function(data) {
    for (let repo of data) {
        const list = document.createElement("li");
        list.innerHTML = `<h3 class="repo">${repo.name}</h3>`;
        repoList.append(list);
    }
};



 // click event 
 repoList.addEventListener("click", function(e){

    if (e.target.matches("h3")){
        // console.log(e.target);

        repoName = e.target.innerText;
        // console.log(repoName);

        singleRepo(repoName);
    }
    // else {
    //     console.log("hey! not a button")
    // }
});


// fetch single repo data
const singleRepo = async function (repoName) {
    const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const data = await response.json();
    console.log(data);

    // fetch languages
    // const languages = await fetch(`https://api.github.com/repos/${username}/${repoName}/languages`);
    const languageObject = await fetch(data.languages_url);
    const languageData = await languageObject.json();
    // console.log(languageData);

    // add languages to an array
    const allLanguages = getLanguages(languageData);

    // ghpages
    let ghPages = "";
    if(data.has_pages){
         ghPages = "Yes"
    }
    else {
         ghPages = "No"
    }

    // show single repo data
    eachRepo(data, allLanguages, ghPages);
};

const getLanguages = function (languages) {
    let listOfLanguages = [];

    for(let l in languages) {  
        listOfLanguages.push(l);
    }

    return listOfLanguages;
};


// show individual repo data on click
const eachRepo = function (repo, allLanguages, ghPages) {
    repoData.innerHTML = "";

    // show/hide elements
    repoData.classList.remove("hide");
    repoList.classList.add("hide");
    backButton.classList.remove("hide");

    // display data
    repoData.innerHTML = `
    <div>
        <h3>Name: ${repo.name}</h3>
        <p><strong>Description:</strong> ${repo.description}</p>
        <p><strong>Default Branch:</strong> ${repo.default_branch}</p>
        <p><strong>Languages:</strong> ${allLanguages.join(", ")}</p>
        <p><strong>Has hosted page:</strong> ${ghPages}</p>
        <a class="visit" href="${repo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub</a>
    </div>`
    // or create a new div with all these elements and then append it to repoData

};


// back button to list of all repos
backButton.addEventListener("click", function(){
    repoData.classList.add("hide");
    repoList.classList.remove("hide");
    backButton.classList.add("hide");
});



