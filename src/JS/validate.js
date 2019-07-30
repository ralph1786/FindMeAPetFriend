const zipInput = document.querySelector("#zip");

//Validate a zipcode.
export function isValidZip(zip) {
  return /^\d{5}(-\d{4})?$/.test(zip);
}

//Display alert message if not a correct zipcode format is used.
export function showAlert(message, className) {
  //create div
  const div = document.createElement("div");
  //add classes
  div.className = `alert alert-${className}`;
  //add text
  div.appendChild(document.createTextNode(message));
  //get container
  const container = document.querySelector(".container");
  //get form
  const form = document.querySelector("#pet-form");
  //insert alert message
  container.insertBefore(div, form);
  zipInput.focus();
  zipInput.style.backgroundColor = "#fcb8b9";
  //Remove alert and color of input field after 2.5 seconds.
  setTimeout(() => {
    document.querySelector(".alert").remove();
    zipInput.style.backgroundColor = "white";
  }, 2500);
}
