function photographerTemplate (data) {
  const { name, portrait, id, city, country, tagline, price } = data

  const picture = `assets/photographers/${portrait}`

  function getUserCardDOM () {
    const article = document.createElement('article')
    const blockhigh = document.createElement('div')
    const blockbottom = document.createElement('div')
    blockhigh.setAttribute('onclick', "location.href = 'photographer.html?id=" + id + "'")
    article.onkeyup = function (e) {
      if (e.keyCode === 13) location.href = 'photographer.html?id=' + id
    }
    const img = document.createElement('img')
    img.setAttribute('src', picture)
    img.alt = name
    img.tabIndex = 1
    const h2 = document.createElement('h2')
    h2.textContent = name
    h2.tabIndex = 1
    blockhigh.appendChild(img)
    blockhigh.appendChild(h2)

    const textlocation = document.createElement('p')
    textlocation.className += 'information-photographer-city'
    textlocation.textContent = city + ', ' + country
    textlocation.tabIndex = 1
    const text = document.createElement('p')
    text.textContent = tagline
    text.tabIndex = 1
    text.className += 'information-photographer-text'
    const textprice = document.createElement('p')
    textprice.textContent = price + '€/jour'
    textprice.tabIndex = 1
    textprice.className += 'information-photographer-textprice'
    blockbottom.appendChild(textlocation)
    blockbottom.appendChild(text)
    blockbottom.appendChild(textprice)
    article.appendChild(blockhigh)
    article.appendChild(blockbottom)
    return (article)
  }
  return { name, picture, getUserCardDOM }
}
