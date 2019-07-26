// import fetchJsonp from "fetch-jsonp";
import { isValidZip, showAlert } from "./validate.js";
// import { showAlert } from "./validate.js";

const petForm = document.querySelector("#pet-form");
const accessToken =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImE4NGEyMGVlMTQxNDQ1Mjc1ZmY2YjQyOTVmN2U5Nzk0ZGMxNGMxNDlhMjI3MDQ5NGE0NDAxZDgxM2I3NmFkMDE5MjVhMGE5NzhlOTJlZjcyIn0.eyJhdWQiOiIxbE5XZ1BHaWV6WkNlaWZjd0l6RFVTNTMxS0M3bzNRelg2a3JHMk5YVTlJbGdUYlNWayIsImp0aSI6ImE4NGEyMGVlMTQxNDQ1Mjc1ZmY2YjQyOTVmN2U5Nzk0ZGMxNGMxNDlhMjI3MDQ5NGE0NDAxZDgxM2I3NmFkMDE5MjVhMGE5NzhlOTJlZjcyIiwiaWF0IjoxNTY0MTY4MTc0LCJuYmYiOjE1NjQxNjgxNzQsImV4cCI6MTU2NDE3MTc3NCwic3ViIjoiIiwic2NvcGVzIjpbXX0.IVcViSkWk7-Z_l5I_CUYAPsVkJnEn_V3Vcj6G5_IzTu48178fi4q6fq8hht4k3Tg0x0fPKqx__mPO4CER7WxV_9E7Jj11JwuJ0sbc8_pEi8aUAeXMSdIV30PE2cQn894CXHLIX8eUNlYkWGWbohUESqTKyN5o66mP-kMW3qlGmiQNv7xC5BmJoDBbH5LT9ni1rdhs1wTx9WCe_sX-ggl8Duie7tsENoplIKKBS4NbgdqM-bnIQyufBvBu9Yb1vFBtN9rNIY7Awwgpcy3r3vlF5MZeoPnwvtK-95J3LEPSahkgpR879LRz25GOwaCidRC1QaosMn3_xlt5MwK7PGvLg";

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
                    <h4>${pet.name} (${pet.age})</h4>
                    <p class="text-secondary">${pet.breeds.primary} (${
      pet.gender
    })</p>
                    <p>${pet.contact.address.address1}, ${
      pet.contact.address.city
    }, ${pet.contact.address.state} ${pet.contact.address.postcode}</p>
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
