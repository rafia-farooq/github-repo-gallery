const overview = document.querySelector(".overview");
const repoList = document.querySelector(".repo-list");
const repoData = document.querySelector(".repo-data");
const backButton = document.querySelector(".view-repos");


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



