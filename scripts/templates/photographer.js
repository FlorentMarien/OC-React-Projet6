function photographerTemplate (data) {
  const { name, portrait, id, city, country, tagline, price } = data

  const picture = `assets/photographers/${portrait}`

  function getUserCardDOM () {
    const article = document.createElement('article')
    const blockhigh = document.createElement('div')
    const blockbottom = document.createElement('div')
    blockhigh.setAttribute('onclick', "location.href = 'photographer.html?id=" + id + "'")
    const img = document.createElement('img')
    img.setAttribute('src', picture)
    img.alt = name
    const h2 = document.createElement('h2')
    h2.textContent = name
    blockhigh.appendChild(img)
    blockhigh.appendChild(h2)

    const location = document.createElement('p')
    location.className += 'information-photographer-city'
    location.textContent = city + ', ' + country
    const text = document.createElement('p')
    text.textContent = tagline
    text.className += 'information-photographer-text'
    const textprice = document.createElement('p')
    textprice.textContent = price + '€/jour'
    textprice.className += 'information-photographer-textprice'
    blockbottom.appendChild(location)
    blockbottom.appendChild(text)
    blockbottom.appendChild(textprice)
    article.appendChild(blockhigh)
    article.appendChild(blockbottom)
    return (article)
  }
  return { name, picture, getUserCardDOM }
}
