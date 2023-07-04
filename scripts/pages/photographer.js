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
async function getMediaPhotographers(id){
    const response = await fetch('/../data/photographers.json');
    const photographers = await response.json();
    let savephotographer = [];
    photographers.media.forEach((element)=>{
        if(element.photographerId==id) {
            savephotographer.push(element);
        }
    });
    if(savephotographer != undefined) return savephotographer;
    else return "id not found";
    //return "id not found";
}
async function displayDataMedia(id, filter) {
    const photographersSection = document.getElementById("section_gallery");
    let arrayMedia = await getMediaPhotographers(id);
    filterDataMedia('Popularité',arrayMedia);
    console.log(arrayMedia);
    arrayMedia.forEach((element)=>{
        let block = document.createElement("div");
        let block_bottom = document.createElement("div");
        block.className+="gallery_media";
        let media = document.createElement("img");
        media.src = "/../assets/photograhersPhotos/"+element.photographerId+"/"+element.image;
        block.appendChild(media);
        let title = document.createElement("p");
        title.textContent = element.title;
        block_bottom.appendChild(title);
        let likes = document.createElement("p");
        let logolikes = document.createElement("img");
        logolikes.className+="logoheart";
        logolikes.src="/../assets/icons/heart.svg";
        likes.textContent=element.likes;
        block_bottom.appendChild(likes);
        block_bottom.appendChild(logolikes);
        block.appendChild(block_bottom);
        photographersSection.appendChild(block);
    });
}
function filterDataMedia(filter, media){
    //Filter = Popularité / Date / Titre
    //Media = Array[array[img,title,like,date...],array[vid,title...]]
    let x=0;
    let nbrverif=0
    switch (filter){
        case 'Popularité':
            while(x<media.length){
                nbrverif++;
                if(media[x+1]==undefined){
                    x+=2;
                }else{
                    if(media[x].likes > media[x+1].likes){
                        x++;
                    }else{
                        let tamponreverse = media[x+1].likes;
                        media[x+1].likes = media[x].likes;
                        media[x].likes = tamponreverse;
                        x=0;
                    }
                }
            }
            return media;
        case 'Date':
            break
        case 'Titre':
            break;
    }
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

           await displayDataMedia(searchParam.get("id"));

        }
    }
}
init();