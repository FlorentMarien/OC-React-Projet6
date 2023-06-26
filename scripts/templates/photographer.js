function photographerTemplate(data) {
    const { name, portrait, id, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const blockhigh = document.createElement('div');
        const blockbottom = document.createElement('div');
        blockhigh.setAttribute("onclick", "location.href = 'photographer.html?id="+id+"'");
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        blockhigh.appendChild(img);
        blockhigh.appendChild(h2);

        const location = document.createElement("p");
        location.textContent = city + ", " + country;
        const text = document.createElement("p");
        text.textContent = tagline;
        const textprice = document.createElement("p");
        textprice.textContent = price;
        blockbottom.appendChild(location);
        blockbottom.appendChild(text);
        blockbottom.appendChild(textprice);
        article.appendChild(blockhigh);
        article.appendChild(blockbottom);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}

/*let photographers = [
            {
                "name": "Ma data test",
                "id": 1,
                "city": "Paris",
                "country": "France",
                "tagline": "Ceci est ma data test",
                "price": 400,
                "portrait": "account.png"
            },
            {
                "name": "Autre data test",
                "id": 2,
                "city": "Londres",
                "country": "UK",
                "tagline": "Ceci est ma data test 2",
                "price": 500,
                "portrait": "account.png"
            },
        ]*/