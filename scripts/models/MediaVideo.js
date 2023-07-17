// Le Parent
class MediaVideo {
    constructor(data) {
        this._id = data.id
        this._photographerId = data.photographerId
        this._title = data.title
        this._likes = data.likes
        this._date = data.date
        this._price = data.price
        this._video = data.video
    }
    get getId() {
        return this._id
    }
    get getPhotographerId() {
        return this._photographerId
    }
    get getTitle() {
        return this._title
    }
    get getLikes() {
        return this._likes
    }
    get getDate() {
        return this._date
    }
    get getPrice() {
        return this._price
    }
    get getVideo() {
        return this._video
    }
    setLike(ev) {
        console.log(this._id);
        let focus = document.getElementById("media-"+this._id);
        if(Number(focus.childNodes[1].childNodes[1].textContent) == this._likes){ 
            focus.childNodes[1].childNodes[1].textContent = this._likes+1;
            document.getElementsByClassName("container_price-absolute")[0].childNodes[0].childNodes[0].textContent = Number(document.getElementsByClassName("container_price-absolute")[0].childNodes[0].childNodes[0].textContent)+1;
            let target = ev.target.localName == "svg" ? ev.target.childNodes[1] : ev.target;
            target.setAttribute("class","animheartlike");
            let interval = setInterval(function(){
                console.log("del timer");
                //target.removeAttribute("class");
                clearInterval(interval);
            }, 3000);
        }
        else{
            focus.childNodes[1].childNodes[1].textContent = this._likes;
            document.getElementsByClassName("container_price-absolute")[0].childNodes[0].childNodes[0].textContent = Number(document.getElementsByClassName("container_price-absolute")[0].childNodes[0].childNodes[0].textContent)-1;
            let target = ev.target.localName == "svg" ? ev.target.childNodes[1] : ev.target;
            target.setAttribute("class","animheartdislike");
            let interval = setInterval(function(){
                console.log("del timer");
                //target.removeAttribute("class");
                clearInterval(interval);
            }, 3000);
        }
    }
    get getMediaCard(){
        let block = document.createElement("div");
        let block_bottom = document.createElement("div");
        block.className+="gallery_media";
        block.id="media-"+this._id;
        let media;
        media = document.createElement("video");
        media.src = "/../assets/photograhersPhotos/"+this._photographerId+"/"+this._video;
        media.type = "video/mp4";       
        block.appendChild(media);
        let title = document.createElement("p");
        title.textContent = this._title;
        block_bottom.appendChild(title);
        let likes = document.createElement("p");
        let logolikes = document.createElement("div");
        logolikes.innerHTML = '<svg class="logoheart" width="20px" height="100%" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><title>heart</title><path d="M0.256 12.16q0.544 2.080 2.080 3.616l13.664 14.144 13.664-14.144q1.536-1.536 2.080-3.616t0-4.128-2.080-3.584-3.584-2.080-4.16 0-3.584 2.080l-2.336 2.816-2.336-2.816q-1.536-1.536-3.584-2.080t-4.128 0-3.616 2.080-2.080 3.584 0 4.128z"></path></svg>';
        let pointer = this; 
        logolikes.addEventListener("click",function(ev){pointer.setLike(ev)});
        likes.textContent=this._likes;
        block_bottom.appendChild(likes);
        block_bottom.appendChild(logolikes);
        block.appendChild(block_bottom);
        return block;
    }
}