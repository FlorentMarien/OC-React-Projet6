function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "flex";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}
function verifForm(e){
    e.preventDefault();
    console.log(document.getElementById("prenom").value);
    if(document.getElementById("prenom").value.length < 2 && document.getElementById("nom").value.length < 2 && document.getElementById("email").value != "" && document.getElementById("message").value.length < 10){
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
    console.log("ok");
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
        if(document.getElementById("email").value == ""){
            document.getElementById("error-email").textContent = "Vous n'avez rien saisi";
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