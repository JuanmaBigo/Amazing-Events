const btnForm = document.getElementsByClassName('btn-submit-form')[0];
const formContainer = document.getElementsByClassName('form-container')[0];

btnForm.addEventListener('click', (e) => {
    e.preventDefault();
    showAlert();
})

function showAlert(){
    formContainer.innerHTML = `<div class="contact">
    Your message has been sent!
    </div>`
}