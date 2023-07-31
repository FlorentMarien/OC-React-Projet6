// Mettre le code JavaScript lié à la page photographer.html
async function getPhotographers (id) {
  const response = await fetch('/../data/photographers.json')
  const photographers = await response.json()
  let savephotographer
  photographers.photographers.forEach((element) => {
    if (element.id === Number(id)) {
      savephotographer = element
    }
  })
  if (savephotographer !== undefined) return savephotographer
  else return 'id not found'
}
async function getMediaPhotographers (id) {
  const response = await fetch('/../data/photographers.json')
  const photographers = await response.json()
  const savephotographer = []
  photographers.media.forEach((element) => {
    if (element.photographerId === Number(id)) {
      savephotographer.push(element)
    }
  })
  if (savephotographer !== undefined) return savephotographer
  else return 'id not found'
}
async function displayDataMedia () {
  const photographersSection = document.getElementById('section_gallery')
  const arrayMedia = await getMediaPhotographers(id)
  filterDataMedia(document.getElementById('filtergallery').value, arrayMedia)
  // Gallery
  document.getElementById('section_gallery').textContent = ''
  let totallike = 0
  arrayMedia.forEach((element) => {
    const objMedia = new MediaFactory(element)
    totallike += objMedia.getLikes
    objMedia.setLike
    const block = objMedia.getMediaCard
    block.childNodes[0].addEventListener('click', function (ev) { openLightboxModal(arrayMedia, objMedia.getId) })
    photographersSection.appendChild(block)
  })
  // Affichage information
  await displayDataInformation(totallike)
}
async function displayDataInformation (totallike) {
  // Block postion absolute prix
  const photographeInfo = await getPhotographers(id)
  const block = document.createElement('div')
  const blockLeft = document.createElement('div')
  block.className += 'container_price-absolute'
  const blockNbrlikes = document.createElement('p')
  blockNbrlikes.textContent = totallike
  const blockHearticone = document.createElement('img')
  blockHearticone.className += 'container_price-absolute_logoheart'
  blockHearticone.src = '/../assets/icons/heart-black.svg'
  blockHearticone.alt = 'logo coeur'
  blockLeft.appendChild(blockNbrlikes)
  blockLeft.appendChild(blockHearticone)
  const blockPrices = document.createElement('p')
  blockPrices.textContent = photographeInfo.price + 'e/jour'
  block.appendChild(blockLeft)
  block.appendChild(blockPrices)
  document.getElementById('main').appendChild(block)
}
function filterDataMedia (filter, media) {
  // Filter = Popularité / Date / Titre
  // Media = Array[array[img,title,like,date...],array[vid,title...]]
  let x
  x = 0
  let pointerz = 0
  let pointery = 0
  switch (filter) {
    case 'Popularité':
      while (x < media.length) {
        if (media[x + 1] === undefined) {
          x = x + 2
        } else {
          if (media[x].likes >= media[x + 1].likes) {
            x = x + 1
          } else {
            const tamponreverse = media[x + 1]
            media[x + 1] = media[x]
            media[x] = tamponreverse
            x = 0
          }
        }
      }
      return media
    case 'Date':
      while (x < media.length) {
        if (media[x + 1] === undefined) {
          x += 2
        } else {
          if (isNaN(Date.parse(media[x].date))) {
            const tamponreverse = media[x]
            media[x] = media[x + 1]
            media[x + 1] = tamponreverse
            x = 0
          } else if (isNaN(Date.parse(media[x + 1].date))) {
            x++
          } else {
            if (Date.parse(media[x].date) >= Date.parse(media[x + 1].date)) {
              x++
            } else {
              const tamponreverse = media[x]
              media[x] = media[x + 1]
              media[x + 1] = tamponreverse
              x = 0
            }
          }
        }
      }
      return media
    case 'Titre':
      // z = pointerarray / y = pointerchar
      while (pointerz < media.length - 1) {
        const a = media[pointerz].title
        const b = media[pointerz + 1].title
        if (a.charCodeAt(pointery) === b.charCodeAt(pointery)) {
          if (a === b) {
            pointerz = pointerz + 1
            pointery = 0
          } else {
            pointery = pointery + 1
          }
        } else if (a.charCodeAt(pointery) < b.charCodeAt(pointery)) {
          pointerz = pointerz + 1
          pointery = 0
        } else if (a.charCodeAt(pointery) > b.charCodeAt(pointery)) {
          const tampon = media[pointerz]
          media[pointerz] = media[pointerz + 1]
          media[pointerz + 1] = tampon
          pointerz = 0
          pointery = 0
        }
      }
      return media
    default:
      break
  }
}
function openLightboxModal (arrayMedia, id) {
  document.getElementById('lightbox-modal').style.display = 'block'
  arrayMedia.forEach((element) => {
    if (element.id === id) {
      const containerBack = document.createElement('div')
      const containerMiddle = document.createElement('div')
      const containerForward = document.createElement('div')
      const back = document.createElement('img')
      const forward = document.createElement('img')
      const btnquit = document.createElement('img')
      back.name = 'Gauche'
      forward.name = 'Droite'
      btnquit.name = 'Fermer'
      back.addEventListener('click', function () { lightboxBack(arrayMedia) })
      forward.addEventListener('click', function () { lightboxForward(arrayMedia) })
      btnquit.addEventListener('click', closeLightboxModal)
      back.src = '/../assets/icons/back.svg'
      back.alt = 'Retour'
      forward.src = '/../assets/icons/forward.svg'
      forward.alt = 'Avancer'
      btnquit.src = 'assets/icons/close.svg'
      btnquit.alt = 'Quitter'
      btnquit.id = 'btn-closeLightboxModal'
      containerBack.className = 'lightbox-back'
      containerMiddle.id = 'lightbox-middle'
      containerForward.className = 'lightbox-forward'
      containerBack.appendChild(back)
      containerForward.appendChild(btnquit)
      containerForward.appendChild(forward)
      document.getElementById('lightbox-modal-container').appendChild(containerBack)
      let media
      if (element.image === undefined) {
        const videocontrol = document.createElement('video')
        videocontrol.className = 'videolightbox'
        videocontrol.controls = ' '
        const video = document.createElement('source')
        video.id = 'lightbox-video'
        video.src = '/../assets/photograhersPhotos/' + element.photographerId + '/' + element.video
        video.type = 'video/mp4'
        video.name = element.id
        video.alt = element.title
        videocontrol.appendChild(video)
        media = videocontrol
      } else {
        const img = document.createElement('img')
        img.className = 'imgLightbox'
        img.id = 'lightbox-image'
        img.name = element.id
        img.src = '/../assets/photograhersPhotos/' + element.photographerId + '/' + element.image
        img.alt = element.title
        media = img
      }
      containerMiddle.appendChild(media)
      document.getElementById('lightbox-modal-container').appendChild(containerMiddle)
      document.getElementById('lightbox-modal-container').appendChild(containerForward)
      document.getElementsByTagName('body')[0].onkeyup = function (e) {
        if (e.keyCode === 27) btnquit.click()
        if (e.keyCode === 37) back.click()
        if (e.keyCode === 39) forward.click()
      }
    }
  })
}
function lightboxBack (arrayMedia) {
  let pointer = 0
  const photoId = document.getElementById('lightbox-image') !== null ? document.getElementById('lightbox-image').name : document.getElementById('lightbox-video').name
  arrayMedia.every((element) => {
    if (element.id === Number(photoId)) {
      document.getElementById('lightbox-middle').textContent = ''
      if (pointer === 0) pointer = arrayMedia.length - 1
      else pointer -= 1
      if (arrayMedia[pointer].image !== undefined) {
        const image = document.createElement('img')
        image.src = '/../assets/photograhersPhotos/' + id + '/' + arrayMedia[pointer].image
        image.className = 'imgLightbox'
        image.id = 'lightbox-image'
        image.name = arrayMedia[pointer].id
        document.getElementById('lightbox-middle').appendChild(image)
      } else {
        const videocontrol = document.createElement('video')
        videocontrol.className = 'videolightbox'
        videocontrol.controls = ' '
        const video = document.createElement('source')
        video.id = 'lightbox-video'
        video.src = '/../assets/photograhersPhotos/' + id + '/' + arrayMedia[pointer].video
        video.type = 'video/mp4'
        video.name = arrayMedia[pointer].id
        videocontrol.appendChild(video)
        document.getElementById('lightbox-middle').appendChild(videocontrol)
      }
      return false
    }
    pointer++
    return true
  })
}
function lightboxForward (arrayMedia) {
  let pointer = 0
  const photoId = document.getElementById('lightbox-image') !== null ? document.getElementById('lightbox-image').name : document.getElementById('lightbox-video').name
  arrayMedia.every((element) => {
    if (element.id === Number(photoId)) {
      if (pointer >= arrayMedia.length - 1) pointer = 0
      else pointer += 1
      document.getElementById('lightbox-middle').textContent = ''
      if ((arrayMedia[pointer].image !== undefined)) {
        const image = document.createElement('img')
        image.src = '/../assets/photograhersPhotos/' + id + '/' + arrayMedia[pointer].image
        image.className = 'imgLightbox'
        image.id = 'lightbox-image'
        image.name = arrayMedia[pointer].id
        document.getElementById('lightbox-middle').appendChild(image)
      } else {
        const videocontrol = document.createElement('video')
        videocontrol.className = 'videolightbox'
        videocontrol.controls = ' '
        const video = document.createElement('source')
        video.id = 'lightbox-video'
        video.src = '/../assets/photograhersPhotos/' + id + '/' + arrayMedia[pointer].video
        video.type = 'video/mp4'
        video.name = arrayMedia[pointer].id
        videocontrol.appendChild(video)
        document.getElementById('lightbox-middle').appendChild(videocontrol)
      }
      return false
    }
    pointer++
    return true
  })
}
function closeLightboxModal () {
  document.getElementsByTagName('body')[0].onkeyup = ''
  document.getElementById('lightbox-modal').style.display = 'none'
  document.getElementById('lightbox-modal-container').textContent = ''
}
async function init () {
  const url = new URL(window.location)
  const searchParam = new URLSearchParams(url.search)
  id = searchParam.get('id')
  if (id === null || id === undefined || id === '') {
    // Securité
    window.location = 'index.html'
  } else {
    const photographer = await getPhotographers(id)
    if (photographer === 'id not found') window.location = 'index.html'
    else {
      document.getElementById('form-namephotographer').textContent = photographer.name
      document.getElementsByClassName('contact_button')[1].addEventListener('click', function (e) { verifForm(e) })
      // Block information photographes
      const photographeInformation = document.getElementById('photographe-information')
      const photographePdp = document.getElementById('photographe-pdp')
      const containerinformation = document.createElement('div')
      const name = document.createElement('h1')
      name.textContent = photographer.name
      const cityPhotographer = document.createElement('p')
      cityPhotographer.className += 'information-photographer-city'
      cityPhotographer.textContent = photographer.city + ', ' + photographer.country
      const informationPhotographer = document.createElement('p')
      informationPhotographer.textContent = photographer.tagline
      containerinformation.appendChild(name)
      containerinformation.appendChild(cityPhotographer)
      containerinformation.appendChild(informationPhotographer)
      photographeInformation.appendChild(containerinformation)

      const photographeImage = document.createElement('img')
      photographeImage.setAttribute('src', '/assets/photographers/' + photographer.portrait)
      photographeImage.alt = photographer.name
      photographePdp.appendChild(photographeImage)

      // Affichage gallery
      document.getElementById('filtergallery').addEventListener('change', displayDataMedia)
      await displayDataMedia()
    }
  }
}
let id = null
init()
