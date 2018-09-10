import fetchJsonp from "fetch-jsonp";
import { isValidZip } from "./validate";
import { showAlert } from "./validate";

const petForm = document.querySelector("#pet-form");

petForm.addEventListener("submit", fetchAnimals);

//Fetch Animals from API.
function fetchAnimals(e) {
  e.preventDefault();
  //Get User Input
  const animal = document.querySelector("#animal").value;
  const zip = document.querySelector("#zip").value;
  //Validate zipcode
  if (!isValidZip(zip)) {
    showAlert("Please Enter a Valid Zipcode");
  }
  //Fetch Pets
  fetchJsonp(
    `http://api.petfinder.com/pet.find?format=json&key=d4507af808a734b446dd5ac5dc43321b&animal=${animal}&location=${zip}&callback=callback`,
    {
      jsonpCallbackFunction: "callback"
    }
  )
    .then(res => res.json())
    .then(data => showAnimals(data.petfinder.pets.pet))
    .catch(err => console.log(err));
}

//Show List of Pets.
function showAnimals(pets) {
  console.log(pets);
  const results = document.querySelector("#results");
  //clear first results.
  results.innerHTML = "";
  //Loop Through Pets
  pets.forEach(pet => {
    //creates a element which later will be added to the page.
    const div = document.createElement("div");
    //adds following bootstrap classes to the created element.
    div.classList.add("card", "card-body", "mb-3");
    //adds content to the created element.
    div.innerHTML = `
            <div class='row>
                <div class='col-sm-6'>
                    <h4>${pet.name.$t} (${pet.age.$t})</h4>
                    <p class="text-secondary">${pet.breeds.breed.$t} (${
      pet.sex.$t
    })</p>
                    <p>${pet.contact.address1.$t}, ${pet.contact.city.$t}, ${
      pet.contact.state.$t
    } ${pet.contact.zip.$t}</p>
                    <ul class="list-group">
                       <li class='list-group-item'>Phone: ${
                         pet.contact.phone.$t
                       }</li>
                       ${
                         pet.contact.email.$t
                           ? `<li class='list-group-item'>Email: ${
                               pet.contact.email.$t
                             }</li>`
                           : ``
                       }
                       <li class='list-group-item'>Shelter ID: ${
                         pet.shelterId.$t
                       }</li>
                    </ul>
                </div>
                <div class='col-sm-6 text-center'>
                    <img class='img-fluid rounded-circle mt-2' src='${
                      pet.media.photos.photo[3].$t
                    }'
                </div>
            </div>
        `;
    //finally adds created element to the page.
    results.appendChild(div);
  });
}
