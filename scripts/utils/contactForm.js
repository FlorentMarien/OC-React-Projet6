function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "flex";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    // Reset form succes
    if(document.getElementById("modal-container-form-succes").style.display == "block"){
        document.getElementById("modal-container-form-succes").style.display = "none";
        document.getElementById("modal-container-form").style.display = "block";

    }
}
function verifForm(e){
    e.preventDefault();
    
    if(document.getElementById("prenom").value.length >= 2 && document.getElementById("nom").value.length >= 2 && ((!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(document.getElementById("email").value))) != true) && document.getElementById("message").value.length >= 10){
    document.getElementById("error-prenom").style.display = "none";
    document.getElementById("error-nom").style.display = "none";
    document.getElementById("error-email").style.display = "none";
    document.getElementById("error-message").style.display = "none";
    let form = {
        prenom:document.getElementById("prenom"),
        nom:document.getElementById("nom"),
        email:document.getElementById("email"),
        message:document.getElementById("message")
    };
    document.getElementById("modal-container-form").style.display = "none";
    document.getElementById("modal-container-form-succes").textContent = "Merci pour votre message "+form.nom.value+" "+form.prenom.value;
    console.log(form);
    document.getElementById("modal-container-form-succes").style.display = "block";
    // Reset formulaire
    form.nom.value = "";
    form.prenom.value = "";
    form.email.value = "";
    form.message.value = "";
    }else{
        if(document.getElementById("prenom").value.length < 2){
            document.getElementById("error-prenom").style.display = "block";
            document.getElementById("error-prenom").textContent = "Vous n'avez pas saisi assez de caractère";
        }else{
            document.getElementById("error-prenom").style.display = "none";
        }
        if(document.getElementById("nom").value.length < 2){
            document.getElementById("error-nom").textContent = "Vous n'avez pas saisi assez de caractère";
            document.getElementById("error-nom").style.display = "block";
        }else{
            document.getElementById("error-nom").style.display = "none";
        }
        if((/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(document.getElementById("email").value)) == false){
            document.getElementById("error-email").textContent = "Vous n'avez pas saisi une adresse mail correct";
            document.getElementById("error-email").style.display = "block";
        }else{
            document.getElementById("error-email").style.display = "none";
        }
        if(document.getElementById("message").value.length < 10){
            document.getElementById("error-message").textContent = "Vous n'avez pas saisi assez de caractère";
            document.getElementById("error-message").style.display = "block";
        }else{
            document.getElementById("error-message").style.display = "none";
        }
    }
}