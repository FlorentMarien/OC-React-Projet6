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
}