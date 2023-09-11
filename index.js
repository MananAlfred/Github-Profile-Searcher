const url = "https://api.github.com/users/";

const searchInputElement = document.getElementById('searchInput');
const searchButtonElement = document.getElementById('searchButton');
const profileContainerElement = document.getElementById('profileContainer');
const loadingElement = document.getElementById('loading');

const performSearch = () =>{
  fetchProfile(searchInputElement.value);
};

const generateProfile = (profile) => {
  return `
  <div class="profile-box">
  <div class="top-section">
    <div class="left">
      <div class="avatar">
        <img 
        src="${profile.avatar_url}" 
        alt="avatar">
      </div>
      <div class="self">
        <h1>${profile.name}</h1>
        <h2>${profile.login}</h2>
      </div>
    </div>
      
    <button class="primaryButton">
    <a href = "${profile.html_url}" target = "_blank"> 
      Check Profile
    </a>  
    </button>
  </div>
  <div class="about-section">
    <h2>About</h2>
    <p>${profile.bio}</p>
  </div>
  <div class="status">
    <div class="status-item">
      <h3>Followers</h3>
      <p>${profile.followers}</p>
    </div>  
    <div class="status-item">
      <h3>Followings</h3>
      <p>${profile.following}</p>
    </div>
    <div class="status-item">
      <h3>Repos</h3>
      <p>${profile.public_repos}</p>
    </div>
  </div>
</div>
`
};


const fetchProfile = async (username) =>{
  profileContainerElement.innerText = "";
  loadingElement.innerText = "Loading....";
  loadingElement.style.color = "black";
  
  try {
    const response = await fetch(`${url}${username}`);
    const data = await response.json();
    
    if(data.login){
      loadingElement.innerText = "";
      profileContainerElement.innerHTML = generateProfile(data);
    }
    else{
      loadingElement.innerHTML = data.message;
      loadingElement.style.color = "red";
      profileContainerElement.innerText = "";
    }
    
  } catch (error) {
    
    console.log({ error });
    loadingElement.innerText = "";
  }
};

searchInputElement.addEventListener('keydown', (event) =>{
  if(event.key === 'Enter'){
    performSearch();
  }
} );

searchButtonElement.addEventListener('click',performSearch);
