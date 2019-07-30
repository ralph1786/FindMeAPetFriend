import { isValidZip, showAlert } from "./validate";
import petCard from "./petCard";
import { petFinderApiKey } from "../../constant";

const petForm = document.querySelector("#pet-form");
const loadingSpinner = document.querySelector(".loader");
const results = document.querySelector(".results");
loadingSpinner.style.display = "none";
let accessToken;

window.addEventListener("DOMContentLoaded", () => {
  fetch("https://api.petfinder.com/v2/oauth2/token", {
    body: `grant_type=client_credentials&client_id=${petFinderApiKey}`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "POST"
  })
    .then(res => res.json())
    .then(data => {
      accessToken = data.access_token;
    })
    .catch(err => console.log(err));
});

petForm.addEventListener("submit", fetchAnimals);

//Fetch Animals from API.
function fetchAnimals(e) {
  e.preventDefault();
  //Clear results if changing zip code
  results.innerHTML = "";
  //Get User Input
  const animal = document.querySelector("#animal").value;
  const zip = document.querySelector("#zip").value;
  //Validate zipcode
  if (!isValidZip(zip)) {
    return showAlert("Please Enter a Valid Zipcode", "danger");
  }
  loadingSpinner.style.display = "block";
  //Fetch Pets
  fetch(`https://api.petfinder.com/v2/animals?location=${zip}&type=${animal}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
    .then(res => res.json())
    .then(data => {
      loadingSpinner.style.display = "none";
      showAnimals(data.animals);
    })
    .catch(err => console.log(err));
}

//Show List of Pets.
function showAnimals(pets) {
  //clear first results.
  results.innerHTML = "";
  //Loop Through Pets
  pets.forEach(pet => {
    //creates a element which later will be added to the page.
    const div = document.createElement("div");
    //adds following class to the created element.
    div.classList.add("card");
    //adds content to the created element.
    div.innerHTML = petCard(pet);
    //finally adds created element to the page.
    results.appendChild(div);
  });
}
