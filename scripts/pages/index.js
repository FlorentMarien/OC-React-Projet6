async function getPhotographers () {
  const response = await fetch('/data/photographers.json')
  const photographers = await response.json()
  // et bien retourner le tableau photographers seulement une fois récupéré
  return ({ photographers: [...photographers.photographers] })
}

async function displayData (photographers) {
  const photographersSection = document.querySelector('.photographer_section')
  const x = 1
  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer)
    const userCardDOM = photographerModel.getUserCardDOM()
    userCardDOM.tabIndex = x
    photographersSection.appendChild(userCardDOM)
  })
}

async function init () {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers()
  displayData(photographers)
}

init()
