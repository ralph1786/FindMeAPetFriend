// import fetchJsonp from "fetch-jsonp";
import { isValidZip, showAlert } from "./validate.js";
// import { showAlert } from "./validate.js";

const petForm = document.querySelector("#pet-form");
const accessToken =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImI2YzE0YjNlMGQ1MDIwNDMyMGFiYTUxNTBkY2Y2ZTA1ZDhmMmFkMWE4NzZhM2M4NmU0ODYyMmYzYWE5MzY3NzM5NzlhOTM4Yzc4MmFmN2UxIn0.eyJhdWQiOiIxbE5XZ1BHaWV6WkNlaWZjd0l6RFVTNTMxS0M3bzNRelg2a3JHMk5YVTlJbGdUYlNWayIsImp0aSI6ImI2YzE0YjNlMGQ1MDIwNDMyMGFiYTUxNTBkY2Y2ZTA1ZDhmMmFkMWE4NzZhM2M4NmU0ODYyMmYzYWE5MzY3NzM5NzlhOTM4Yzc4MmFmN2UxIiwiaWF0IjoxNTY0MTcyMTA2LCJuYmYiOjE1NjQxNzIxMDYsImV4cCI6MTU2NDE3NTcwNSwic3ViIjoiIiwic2NvcGVzIjpbXX0.SAhluzuiiPOBzhHEg6eoCA6ysMLs82rckTUwrL1Ft-vQxeAJkbU5RDr4rVPJ6Hq86QtdYCEi2FyOyZ8BdLKcd36nqPevfIBbzetSnpUNdMpEeJHpK4H5-lNjYZb9ltS_1rgo7P4wLJudZ-SH3bw6DXBY8cby5hnX_QPU8R1k6luv2kV4iZkCjcpXm-xZdHWm5uIVgDSdI9yppa9tm2R5CnGkjF48iYxXoBTP8EmiEf3_4f-xkNfRWJhuKyimbtSJrlS13XNq0JXUkDboRiW2b_WjaEf4t6bo5N9EWHsxXrzv0ubzBSKbmImJOM9IzmK2LBOkbF7dNyn6ox5k5FgM9w";

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

function petCard(pet) {
  return `
                <div class="content">
                    <p>Name: ${pet.name}</p>
                    <p>Age: ${pet.age}</p>
                    <p>Breed: ${pet.breeds.primary}</p>
                    <p>Gender: ${pet.gender}</p>
                    <p>Address: ${
                      pet.contact.address.address1 === null
                        ? "Street Address Unavailable"
                        : pet.contact.address.address1
                    }, ${pet.contact.address.city}, ${
    pet.contact.address.state
  } ${pet.contact.address.postcode}</p>
                    <ul>
                       <li>Phone: ${pet.contact.phone}</li>
                       ${
                         pet.contact.email
                           ? `<li>Email: ${pet.contact.email}</li>`
                           : ``
                       }
                       <li>Shelter ID: ${pet.organization_id}</li>
                    </ul>
                </div>
        `;
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
