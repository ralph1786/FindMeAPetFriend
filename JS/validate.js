//Validate a zipcode.
export function isValidZip(zip){
    return /^\d{5}(-\d{4})?$/.test(zip);
}

//Display alert message if not a correct zipcode format is used.
export function showAlert(message, className) {
    //create div
    const div = document.createElement('div');
    //add classes
    div.className = `alert alert-danger`;
    //add text
    div.appendChild(document.createTextNode(message));
    //get container
    const container = document.querySelector('.container');
    //get form
    const form = document.querySelector('#pet-form');
    //insert alert message
    container.insertBefore(div, form);
    //Remove alert after 3 seconds.
    setTimeout(() => {
        document.querySelector('.alert').remove()
    }, 3000);
}