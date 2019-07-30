import "../main.css";
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
                       <li>Phone: ${
                         pet.contact.phone === null
                           ? "Unavailable"
                           : pet.contact.phone
                       }</li>
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

export default petCard;
