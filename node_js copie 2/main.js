document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".mon-slider", {
    // Optional parameters

    loop: true,

    // If we need pagination
    pagination: {
      el: ".swiper-pagination",
    },

    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    autoplay: {
      delay: 3000,
    },
  });
});

//TABS
function changeTab(event, tabId) {
  const tabs = document.getElementsByClassName("tab");
  const contents = document.getElementsByClassName("content");
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove("tab-active");
  }
  for (let i = 0; i < contents.length; i++) {
    contents[i].classList.remove("content-active");
  }
  event.target.classList.add("tab-active");
  document.getElementById(tabId).classList.add("content-active");
}

//formulaire newsletter

let form = document.querySelector("form");

form.addEventListener("submit", function (event) {
  // Annule le comportement âr défaut (envoie du formulaire)
  event.preventDefault();

  // Conteneur des erreurs
  let errorContainer = document.querySelector(".message-error");
  // Liste des erreurs
  let errorList = document.querySelector(".message-error ul");

  //On vide les erreurs et on cache le conteneur
  errorList.innerHTML = "";
  errorContainer.classList.remove("visible");

  //On récupère le champ email
  let email = document.querySelector("#email");

  // Si l'email est vide
  if (email.value === "") {
    // On affiche le conteneur des erreurs et supprime le succès
    errorContainer.classList.add("visible");
    email.classList.remove("success");

    //créer un <li></li> dans le HTML
    let err = document.createElement("li");
    err.innerText = "Le champ email ne peut pas être vide";

    // On ajoute le li dans la liste des erreurs
    errorList.appendChild(err);
  } else {
    email.classList.add("success");
  }

  //On récupère le champ email
  let pseudo = document.querySelector("#pseudo");

  // Si l'email est vide
  if (pseudo.value.length < 6) {
    // On affiche le conteneur des erreurs et supprime le succès
    errorContainer.classList.add("visible");
    pseudo.classList.remove("success");

    //créer un <li></li> dans le HTML
    let err = document.createElement("li");
    err.innerText = "Le champ pseudo ne peut pas être vide";

    // On ajoute le li dans la liste des erreurs
    errorList.appendChild(err);
  } else {
    pseudo.classList.add("success");
  }
  let passCheck = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"
  );
  //On récupère le champ email
  let password = document.querySelector("#password");

  // Si l'email est vide
  if (password.value.length < 10 || passCheck.test(password.value) === false) {
    // On affiche le conteneur des erreurs et supprime le succès
    errorContainer.classList.add("visible");
    password.classList.remove("success");

    //créer un <li></li> dans le HTML
    let err = document.createElement("li");
    err.innerText =
      "Le champ mot de passe ne peut pas être inférieur  à 10 caractères et doit contenir une majuscule, un chiffre, et un caractère spécial.";

    // On ajoute le li dans la liste des erreurs
    errorList.appendChild(err);
  } else {
    password.classList.add("success");
  }
  let passwordConfirm = document.querySelector("#password2");

  if (
    passwordConfirm.value !== password.value ||
    passwordConfirm.value === ""
  ) {
    errorContainer.classList.add("visible");
    passwordConfirm.classList.remove("success");

    let err = document.createElement("li");
    err.innerText = "Les deux mots de passe doivent être identique ";

    errorList.appendChild(err);
  } else {
    passwordConfirm.classList.add("success");
  }
  let successContainer = document.querySelector(".message-success");
  successContainer.classList.remove("visible");

  if (
    email.classList.contains("success") &&
    pseudo.classList.contains("success") &&
    password.classList.contains("success") &&
    passwordConfirm.classList.contains("success")
  ) {
    successContainer.classList.add("visible");
  }
});

//dark-mode

document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelector(".dark-mode-toggle")
    .addEventListener("click", function () {
      document.body.classList.toggle("dark");
    });
});
