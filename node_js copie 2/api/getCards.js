function fetchCard() { // Fetch les cartes de personnages de l'API
  const apiUrl = 'https://hp-api.lainocs.fr/characters';
  return fetch(apiUrl).then((response) => response.json()); // Récupère les données de l'API
}

async function displayCard() { // Affiche les cartes de personnages
  const data = await fetchCard(); // Récupère les données de l'API
  console.log(data);
  let gallery = document.querySelector(".cards_container_gallery");

  for (let i = 0; i < data.length; i++) { // Boucle pour afficher les cartes
    gallery.innerHTML +=
      `
      <div class="card" data-house="${data[i].house}" data-id="${data[i].slug}">
        <div class="card_image_container">
          <img
            class="card_image"
            src="${data[i].image}"
            alt="${data[i].name}"
          />
        </div>
        <h2 class="card_title">${data[i].name}</h2>
        <div class="card_buttons">
          <div class="card_button_readmore">En savoir plus</div>
        </div>
      </div>
    `;
  }
}

displayCard(); // Appel de la fonction pour afficher les cartes
