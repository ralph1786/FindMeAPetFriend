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

export function petCard<T extends IPet>(pet: T) {
  const {
    name,
    age,
    breeds: { primary },
    gender,
    contact: { address, phone, email },
    organization_id
  } = pet;
  return `
                <div class="content">
                    <p>Name: ${name}</p>
                    <p>Age: ${age}</p>
                    <p>Breed: ${primary}</p>
                    <p>Gender: ${gender}</p>
                    <p>Address: ${
                      address.address1 === null
                        ? "Street Address Unavailable"
                        : address.address1
                    }, ${address.city}, ${address.state} ${address.postcode}</p>
                    <ul>
                       <li>Phone: ${phone === null ? "Unavailable" : phone}</li>
                       ${email ? `<li>Email: ${email}</li>` : ``}
                       <li>Shelter ID: ${organization_id}</li>
                    </ul>
                </div>
        `;
}
