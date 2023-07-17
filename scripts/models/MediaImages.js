// Le Parent
class MediaImages{
    constructor(data) {
        this._id = data.id;
        this._photographerId = data.photographerId;
        this._title = data.title;
        this._likes = data.likes;
        this._date = data.date;
        this._price = data.price;
        this._image = data.image;
    }
    get getId() {
        return this._id;
    }
    get getPhotographerId() {
        return this._photographerId;
    }
    get getTitle() {
        return this._title;
    }
    get getLikes() {
        return this._likes;
    }
    get getDate() {
        return this._date;
    }
    get getPrice() {
        return this._price;
    }
    get getImage() {
        return this._image;
    }
    setLike() {
        let focus = document.getElementById("media-"+this._id);
        if(Number(focus.childNodes[1].childNodes[1].textContent) == this._likes){ 
            focus.childNodes[1].childNodes[1].textContent = this._likes+1;
            document.getElementsByClassName("container_price-absolute")[0].childNodes[0].childNodes[0].textContent = Number(document.getElementsByClassName("container_price-absolute")[0].childNodes[0].childNodes[0].textContent)+1;
        }
        else{
            focus.childNodes[1].childNodes[1].textContent = this._likes;
            document.getElementsByClassName("container_price-absolute")[0].childNodes[0].childNodes[0].textContent = Number(document.getElementsByClassName("container_price-absolute")[0].childNodes[0].childNodes[0].textContent)-1;
        }
    }
    get getMediaCard(){
        let block = document.createElement("div");
        let block_bottom = document.createElement("div");
        block.className+="gallery_media";
        block.id="media-"+this._id;
        let media;
        media = document.createElement("img");
        media.src = "/../assets/photograhersPhotos/"+this._photographerId+"/"+this._image;
        block.appendChild(media);
        let title = document.createElement("p");
        title.textContent = this._title;
        block_bottom.appendChild(title);
        let likes = document.createElement("p");
        let logolikes = document.createElement("img");
        logolikes.className+="logoheart";
        logolikes.src="/../assets/icons/heart.svg";
        let pointer = this; 
        logolikes.addEventListener("click",function(ev){pointer.setLike(pointer)});
        likes.textContent=this._likes;
        block_bottom.appendChild(likes);
        block_bottom.appendChild(logolikes);
        block.appendChild(block_bottom);
        return block;
    }
}