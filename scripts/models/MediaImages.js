// Le Parent
class MediaImages {
  constructor (data) {
    this._id = data.id
    this._photographerId = data.photographerId
    this._title = data.title
    this._likes = data.likes
    this._date = data.date
    this._price = data.price
    this._image = data.image
  }

  get getId () {
    return this._id
  }

  get getPhotographerId () {
    return this._photographerId
  }

  get getTitle () {
    return this._title
  }

  get getLikes () {
    return this._likes
  }

  get getDate () {
    return this._date
  }

  get getPrice () {
    return this._price
  }

  get getImage () {
    return this._image
  }

  setLike (ev) {
    const focus = document.getElementById('media-' + this._id)
    if (Number(focus.childNodes[1].childNodes[1].childNodes[0].textContent) === this._likes) {
      focus.childNodes[1].childNodes[1].childNodes[0].textContent = this._likes + 1
      document.getElementsByClassName('container_price-absolute')[0].childNodes[0].childNodes[0].textContent = Number(document.getElementsByClassName('container_price-absolute')[0].childNodes[0].childNodes[0].textContent) + 1
      const target = ev.target.localName === 'svg' ? ev.target.childNodes[1] : ev.target
      target.setAttribute('class', 'animheartlike')
      const interval = setInterval(function () {
        clearInterval(interval)
      }, 1000)
    } else {
      focus.childNodes[1].childNodes[1].childNodes[0].textContent = this._likes
      document.getElementsByClassName('container_price-absolute')[0].childNodes[0].childNodes[0].textContent = Number(document.getElementsByClassName('container_price-absolute')[0].childNodes[0].childNodes[0].textContent) - 1
      const target = ev.target.localName === 'svg' ? ev.target.childNodes[1] : ev.target
      target.setAttribute('class', 'animheartdislike')
      const interval = setInterval(function () {
        clearInterval(interval)
      }, 1000)
    }
  }

  get getMediaCard () {
    const block = document.createElement('div')
    const blockBottom = document.createElement('div')
    block.className += 'gallery_media'
    block.id = 'media-' + this._id
    const media = document.createElement('img')
    media.src = '/../assets/photograhersPhotos/' + this._photographerId + '/' + this._image
    media.tabIndex = '1'
    media.setAttribute('alt', this._title)
    block.appendChild(media)
    const blockRight = document.createElement('div')
    const title = document.createElement('p')
    title.textContent = this._title
    title.tabIndex = '1'
    blockBottom.appendChild(title)
    const likes = document.createElement('p')
    const logolikes = document.createElement('div')
    logolikes.innerHTML = '<svg alt="icone like" class="logoheart" width="20px" height="100%" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><title>heart</title><path alt="icone like" tabindex = "1" d="M0.256 12.16q0.544 2.080 2.080 3.616l13.664 14.144 13.664-14.144q1.536-1.536 2.080-3.616t0-4.128-2.080-3.584-3.584-2.080-4.16 0-3.584 2.080l-2.336 2.816-2.336-2.816q-1.536-1.536-3.584-2.080t-4.128 0-3.616 2.080-2.080 3.584 0 4.128z"></path></svg>'
    const pointer = this
    logolikes.addEventListener('click', function (ev) { pointer.setLike(ev) })
    logolikes.addEventListener('keyup', function (ev) { if (ev.keyCode === 13) pointer.setLike(ev) })
    likes.textContent = this._likes
    likes.tabIndex = '1'
    blockRight.appendChild(likes)
    blockRight.appendChild(logolikes)
    blockBottom.appendChild(blockRight)
    block.appendChild(blockBottom)
    return block
  }
}
