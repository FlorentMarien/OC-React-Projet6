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
async function displayDataMedia() {
    const photographersSection = document.getElementById("section_gallery");
    let arrayMedia = await getMediaPhotographers(id);
    filterDataMedia(document.getElementById("filtergallery").value,arrayMedia);
    // Gallery
    document.getElementById("section_gallery").textContent="";
    let totallike = 0;
    arrayMedia.forEach((element)=>{
        totallike+=element.likes;
        let block = document.createElement("div");
        block.addEventListener("click",function(ev){ openLightboxModal(arrayMedia, element.id)});
        let block_bottom = document.createElement("div");
        block.className+="gallery_media";
        let media;
        if(element.video != undefined){
            media = document.createElement("video");
            media.src = "/../assets/photograhersPhotos/"+element.photographerId+"/"+element.video;
            media.type = "video/mp4";       
        }else{
            media = document.createElement("img");
            media.src = "/../assets/photograhersPhotos/"+element.photographerId+"/"+element.image;
        }
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
    //Affichage information
    await displayDataInformation(totallike);
}
async function displayDataInformation(totallike){
    // Block postion absolute prix
    let photographeInfo = await getPhotographers(id);
    let block = document.createElement("div");
    let block_left = document.createElement("div");
    block.className += "container_price-absolute";
    let block_nbrlikes = document.createElement("p");
    block_nbrlikes.textContent=totallike;
    let block_hearticone = document.createElement("img");
    block_hearticone.className+="container_price-absolute_logoheart";
    block_hearticone.src = "/../assets/icons/heart.svg";
    block_left.appendChild(block_nbrlikes);
    block_left.appendChild(block_hearticone);
    let block_prices = document.createElement("p");
    block_prices.textContent = photographeInfo.price+"e/jour";
    block.appendChild(block_left);
    block.appendChild(block_prices);
    document.getElementById("main").appendChild(block);
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
                    if(media[x].likes >= media[x+1].likes){
                        x++;
                    }else{
                        let tamponreverse = media[x+1];
                        media[x+1] = media[x];
                        media[x] = tamponreverse;
                        x=0;
                    }
                }
            }
            return media;
        case 'Date':
            /* Verif ordre media base
            media.forEach((element)=>{
                console.log(element.date);
            })*/
            while(x<media.length){
                nbrverif++;
                if(media[x+1]==undefined){
                    x+=2;
                }else{
                    if(isNaN(Date.parse(media[x].date))){
                        let tamponreverse = media[x];
                        media[x] = media[x+1];
                        media[x+1] = tamponreverse;
                        x=0;
                    }else if(isNaN(Date.parse(media[x+1].date))){
                        x++;
                    }else{
                        if(Date.parse(media[x].date) >= Date.parse(media[x+1].date)){
                            x++;
                        }else{            
                            let tamponreverse = media[x];
                            media[x] = media[x+1];
                            media[x+1] = tamponreverse;
                            x=0;
                        }
                    }
                }
            }
            /* Verif ordre media filtrer
            media.forEach((element)=>{
                console.log(" / "+element.date);
            }) */
            return media;
            break;
        case 'Titre':
            while(x<media.length){
                nbrverif++;
                if(media[x+1] == undefined){
                    x+=2;
                }else{
                    let z=0;
                    if(media[x].title.charCodeAt(z)==media[x+1].title.charCodeAt(z)){
                        while(media[x].title.charCodeAt(z) == media[x].title.charCodeAt(z)){ 
                            if(media[x].title.charCodeAt(z) < media[x+1].title.charCodeAt(z)){
                                x++;
                                break;
                            }
                            if((media[x].title.charCodeAt(z) > media[x+1].title.charCodeAt(z)) || media[x+1].title.charCodeAt(z) == NaN ){
                                let tamponreverse = media[x+1];
                                media[x+1] = media[x];
                                media[x] = tamponreverse;
                                x=0;
                                break;
                            }
                            if(media[x].title.charCodeAt(z) == media[x+1].title.charCodeAt(z)){
                                z++;
                            }
                        }
                    }else if(String(media[x].title).charCodeAt(z) < String(media[x+1].title).charCodeAt(z)){
                        x++;
                    }else{
                        let tamponreverse = media[x+1];
                        media[x+1] = media[x];
                        media[x] = tamponreverse;
                        x=0;
                    }
                    
                }
            }            
            return media;
        default:
            break;
    }
}
function openLightboxModal(arrayMedia,id){
    document.getElementById("lightbox-modal").style.display = "block";
    //document.getElementById("btn-closeLightboxModal").addEventListener("click",closeLightboxModal);
    arrayMedia.forEach((element)=>{
        if(element.id == id){
            /*
            <header>
                <img src="assets/icons/close.svg" id="btn-closeLightboxModal" onclick="closeLightboxModal()"/>
            </header>
            */
            let container_back = document.createElement("div");
            let container_middle = document.createElement("div");
            let container_forward = document.createElement("div");
            let back=document.createElement("img");
            let forward=document.createElement("img");
            let btnquit=document.createElement("img");
            back.addEventListener("click",function(){lightboxBack(arrayMedia);});
            forward.addEventListener("click",function(){lightboxForward(arrayMedia);});
            btnquit.addEventListener("click",closeLightboxModal);
            back.src="/../assets/icons/back.svg";
            forward.src="/../assets/icons/forward.svg";
            btnquit.src="assets/icons/close.svg";
            btnquit.id="btn-closeLightboxModal";
            container_back.className = "lightbox-back";
            container_middle.id = "lightbox-middle";
            container_forward.className = "lightbox-forward";
            container_back.appendChild(back);
            container_forward.appendChild(btnquit);
            container_forward.appendChild(forward);
            document.getElementById("lightbox-modal-container").appendChild(container_back);
            let media;
            if(element.image == undefined){
                videocontrol = document.createElement("video");
                videocontrol.className = "videolightbox";
                videocontrol.controls = " ";
                video = document.createElement("source");
                video.id = "lightbox-video";
                video.src = "/../assets/photograhersPhotos/"+element.photographerId+"/"+element.video;
                video.type = "video/mp4";
                video.name = element.id;
                videocontrol.appendChild(video);
                media=videocontrol;
            }else{
                img = document.createElement("img");
                img.className = "imgLightbox";
                img.id = "lightbox-image";
                img.name = element.id;
                img.src = "/../assets/photograhersPhotos/"+element.photographerId+"/"+element.image;  
                media=img;
            }
            container_middle.appendChild(media);
            document.getElementById("lightbox-modal-container").appendChild(container_middle);
            document.getElementById("lightbox-modal-container").appendChild(container_forward);
        }
    });
}
function lightboxBack(arrayMedia){
    let pointer = 0; 
    let photoId = document.getElementById("lightbox-image") != undefined ? document.getElementById("lightbox-image").name : document.getElementById("lightbox-video").name;
    arrayMedia.every((element)=>{
        if(element.id == photoId){
            document.getElementById("lightbox-middle").textContent = "";
            if(pointer == 0) pointer=arrayMedia.length-1;
            else pointer-=1;
            if(arrayMedia[pointer].hasOwnProperty("image") == true){
                image = document.createElement("img");
                image.src = "/../assets/photograhersPhotos/"+id+"/"+arrayMedia[pointer].image;
                image.className = "imgLightbox";
                image.id = "lightbox-image";
                image.name = arrayMedia[pointer].id;
                document.getElementById("lightbox-middle").appendChild(image);
            }else{
                videocontrol = document.createElement("video");
                videocontrol.className = "videolightbox";
                videocontrol.controls = " ";
                video = document.createElement("source");
                video.id = "lightbox-video";
                video.src = "/../assets/photograhersPhotos/"+id+"/"+arrayMedia[pointer].video; 
                video.type = "video/mp4";
                video.name = arrayMedia[pointer].id;
                videocontrol.appendChild(video);
                document.getElementById("lightbox-middle").appendChild(videocontrol);
            }
            return false;
        }
        pointer++;
        return true;
    });
}
function lightboxForward(arrayMedia){
    let pointer = 0; 
    let photoId = document.getElementById("lightbox-image") != undefined ? document.getElementById("lightbox-image").name : document.getElementById("lightbox-video").name;
    arrayMedia.every((element)=>{
        if(element.id == photoId){
            if(pointer >= arrayMedia.length-1) pointer=0;
            else pointer+=1;
            document.getElementById("lightbox-middle").textContent = "";
            if((arrayMedia[pointer].hasOwnProperty("image") == true)){
                let image = document.createElement("img");
                image.src = "/../assets/photograhersPhotos/"+id+"/"+arrayMedia[pointer].image;
                image.className = "imgLightbox";
                image.id = "lightbox-image";
                image.name = arrayMedia[pointer].id;
                document.getElementById("lightbox-middle").appendChild(image);
            }else{
                let videocontrol = document.createElement("video");
                videocontrol.className = "videolightbox";
                videocontrol.controls = " ";
                let video = document.createElement("source");
                video.id = "lightbox-video";
                video.src = "/../assets/photograhersPhotos/"+id+"/"+arrayMedia[pointer].video; 
                video.type = "video/mp4";
                video.name = arrayMedia[pointer].id;
                videocontrol.appendChild(video);
                document.getElementById("lightbox-middle").appendChild(videocontrol);
            }
            return false;
        }
        pointer++;
        return true;
    });
}
function closeLightboxModal(){
    document.getElementById("lightbox-modal").style.display = "none";
    document.getElementById("lightbox-modal-container").textContent = "";
}
async function init(){
    const url = new URL(window.location);
    const searchParam = new URLSearchParams(url.search);
    id = searchParam.get("id"); 
    if(id == null || id == undefined || id == ""){
        //Securité
        window.location = "index.html";
    }else{
        const photographer = await getPhotographers(id);
        if(photographer == "id not found") window.location = "index.html";
        else{
            // Modif modal form
            document.getElementById("form-namephotographer").textContent = photographer.name;
            document.getElementsByClassName("contact_button")[1].addEventListener("click",function(e){verifForm(e);});
            // Block information photographes
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
            
            // Affichage gallery
            document.getElementById("filtergallery").addEventListener("change",displayDataMedia);
            await displayDataMedia();

        }
    }
}
let id = null;
init();