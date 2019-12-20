import { isValidZip, showAlert } from "./validate";
import { petCard, IPet } from "./petCard";
import { petFinderApiKey } from "../../constant";

const petForm = document.querySelector("#pet-form");
const loadingSpinner = document.querySelector(".loader") as HTMLElement;
const results = document.querySelector(".results");
const zipInputField = document.querySelector("#zip") as HTMLInputElement;
loadingSpinner.style.display = "none";
let accessToken: string;

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
function fetchAnimals(e: { preventDefault: () => void }) {
  e.preventDefault();
  //Clear results if changing zip code
  results.innerHTML = "";
  //Get User Input
  const animal: string = (document.querySelector("#animal") as HTMLInputElement)
    .value;
  const zipCode: string = zipInputField.value;
  //Validate zipcode
  if (!isValidZip(zipCode)) {
    zipInputField.value = "";
    return showAlert("Please Enter a Valid Zipcode", "danger");
  }
  loadingSpinner.style.display = "block";
  //Fetch Pets
  fetch(
    `https://api.petfinder.com/v2/animals?location=${zipCode}&type=${animal}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  )
    .then(res => res.json())
    .then(data => {
      loadingSpinner.style.display = "none";
      zipInputField.value = "";
      showAnimals(data.animals);
    })
    .catch(err => console.log(err));
}

//Show List of Pets.
function showAnimals(pets: object[]) {
  //clear first results.
  results.innerHTML = "";
  //Loop Through Pets
  pets.forEach((pet: IPet) => {
    console.log(pet);
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
