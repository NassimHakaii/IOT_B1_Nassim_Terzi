function fetchCharacters() {
  return fetch("https://hp-api.lainocs.fr/characters").then((response) =>
    response.json()
  );
}

async function displayCharacters() {
  const data = await fetchCharacters();
  data.forEach((character) => {
    document.querySelector("#characters").innerHTML += `
                    <a href="cardinfo.html?slug=${character.slug}">
                        <div class="character">
                            <h2>${character.name}</h2>
                            <img src="${character.image}" alt="${character.name}">
                        </div>
                    </a>
                `;
  });
}

displayCharacters();

function fetchCharacter() {
  let url = window.location.search;
  let slug = new URLSearchParams(url).get("slug");

  let datafetch = fetch("https://hp-api.lainocs.fr/characters/" + slug)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const postData = {
        house: data.house,
      };
      try {
        // Envoie de la requête POST avec les données au serveur
        fetch("http://172.20.10.5:3000/lastHouseVisited", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData), // Convertit l'objet en format JSON
        }).then;
      } catch (error) {}
      return data;
    })
    .catch((e) => {
      console.log(e);
    });
  console.log("datafetch", datafetch);
  return datafetch;
}

async function displayCharacter() {
  const data = await fetchCharacter();
  document.querySelector("#character").innerHTML = `
                <h1 style="color: white;">${data.name}</h1>
                <img src="${data.image}" alt="${data.name}">
                <p style="color: white;">${data.house}</p> 
                 <p style="color: white;">${data.actor}</p> 
                  <a href="perso.html">Back</a>
            `;
}

displayCharacter();
