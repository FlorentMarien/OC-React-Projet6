//Mettre le code JavaScript lié à la page photographer.html
async function getPhotographers(id){
    const response = await fetch('/../data/photographers.json');
    const photographers = await response.json();
    let savephotographer = undefined;
    photographers.photographers.forEach((element)=>{
        if(element.id==id) {
            savephotographer=element;
        }
    });
    if(savephotographer != undefined) return savephotographer;
    else return "id not found";
    //return "id not found";
}
async function init(){
    const url = new URL(window.location);
    const searchParam = new URLSearchParams(url.search);
    if(searchParam.get("id") == null || searchParam.get("id")== undefined || searchParam.get("id") == ""){
        //Securité
        window.location = "index.html";
    }else{
        const photographer = await getPhotographers(searchParam.get("id"));
        if(photographer == "id not found") window.location = "index.html";
        else{
            console.log(photographer);
            const photographeInformation=document.getElementById("photographe-information");
            const photographePdp=document.getElementById("photographe-pdp");
            const containerinformation=document.createElement("div");
            const name=document.createElement("h1");
            name.textContent=photographer.name;
            const cityPhotographer=document.createElement("p");
            cityPhotographer.textContent=photographer.city+", "+photographer.country;
            const informationPhotographer=document.createElement("p");
            informationPhotographer.textContent=photographer.tagline;
            containerinformation.appendChild(name);
            containerinformation.appendChild(cityPhotographer);
            containerinformation.appendChild(informationPhotographer);
            photographeInformation.appendChild(containerinformation);

            let photographeImage=document.createElement("img");
            photographeImage.setAttribute("src", "/assets/photographers/"+photographer.portrait);
            photographePdp.appendChild(photographeImage);
        }
    }
}
init();