// import fetchJsonp from "fetch-jsonp";
import { isValidZip, showAlert } from "./validate.js";
import petCard from "./petCard.js";

const petForm = document.querySelector("#pet-form");
let accessToken;

window.addEventListener("DOMContentLoaded", () => {
  fetch("https://api.petfinder.com/v2/oauth2/token", {
    body:
      "grant_type=client_credentials&client_id=1lNWgPGiezZCeifcwIzDUS531KC7o3QzX6krG2NXU9IlgTbSVk&client_secret=OhgLYXbM38W35CyuJas3bHV2MI8X2sYyobVi4PUK",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "POST"
  })
    .then(res => res.json())
    .then(data => {
      accessToken = data.access_token;
    });
});

petForm.addEventListener("submit", fetchAnimals);

//Fetch Animals from API.
function fetchAnimals(e) {
  e.preventDefault();
  //Get User Input
  const animal = document.querySelector("#animal").value;
  const zip = document.querySelector("#zip").value;
  //Validate zipcode
  if (!isValidZip(zip)) {
    showAlert("Please Enter a Valid Zipcode", "danger");
  }
  //Fetch Pets
  fetch(`https://api.petfinder.com/v2/animals?location=${zip}&type=${animal}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      showAnimals(data.animals);
    })
    .catch(err => console.log(err));
}

//Show List of Pets.
function showAnimals(pets) {
  console.log(pets);
  const results = document.querySelector(".results");
  //clear first results.
  results.innerHTML = "";
  //Loop Through Pets
  pets.forEach(pet => {
    //creates a element which later will be added to the page.
    const div = document.createElement("div");
    //adds following bootstrap classes to the created element.
    div.classList.add("card");
    //adds content to the created element.
    div.innerHTML = petCard(pet);
    //finally adds created element to the page.
    results.appendChild(div);
  });
}
