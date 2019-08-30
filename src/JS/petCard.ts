import "../main.css";

export interface IPet {
  organization_id: string;
  name: string;
  age: string;
  breeds: {
    primary: string;
  };
  gender: string;
  contact: {
    address: {
      address1: string | null;
      city: string;
      state: string;
      postcode: string;
    };
    phone: string;
    email: string;
  };
}

export function petCard(pet: IPet) {
  const { name, age, breeds, gender, contact, organization_id } = pet;
  return `
                <div class="content">
                    <p>Name: ${name}</p>
                    <p>Age: ${age}</p>
                    <p>Breed: ${breeds.primary}</p>
                    <p>Gender: ${gender}</p>
                    <p>Address: ${
                      contact.address.address1 === null
                        ? "Street Address Unavailable"
                        : contact.address.address1
                    }, ${contact.address.city}, ${contact.address.state} ${
    contact.address.postcode
  }</p>
                    <ul>
                       <li>Phone: ${
                         contact.phone === null ? "Unavailable" : contact.phone
                       }</li>
                       ${
                         contact.email ? `<li>Email: ${contact.email}</li>` : ``
                       }
                       <li>Shelter ID: ${organization_id}</li>
                    </ul>
                </div>
        `;
}
