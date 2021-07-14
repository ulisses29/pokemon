const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';

const getElement = document.querySelector.bind(document);
const searchInput = getElement('.search-input'),
      searchButton = getElement('.search-button'),
      container = getElement('.pokemon'),
      erroMessage = getElement('.error');

var pokeName,
    pokemon,
    card,
    location_area;

async function requestPokeInfo(url, name) {
  await fetch(url + name)
    .then(response => response.json())
    .then(data => {
      pokemon = data;
    })
    .catch(err => console.log(err));
}

function createCard () {
  card = `
    <div class="pokemon-picture">
      <img src="${pokemon.sprites.front_default}" alt="Sprite of ${pokemon.name}">
    </div>
    <div class="pokemon-info">
        <h1 class="name">${pokemon.name}</h1>
        <font class="number">Nº ${pokemon.id} 
        Type: ${pokemon.types.map(item => item.type.name).toString()}</font>
        <h3 class="weight">Weight: ${pokemon.weight  / 10} kg</h3>
        <h3 class="height">Height: ${pokemon.height  / 10} m</h3>
        <h3 class="location">Location: ${pokemon.types.map(item => 
          item.type.location_area).toString()}</h3>
    </div>`;
  return card;
}

async function startApp(pokeName) {

  await requestPokeInfo(baseUrl, pokeName);
    
    if(pokemon.detail) {
      erroMessage.style.display = 'block';
      container.style.display = 'none';
    }else{
      erroMessage.style.display = 'none';
      container.style.display = 'flex';
      container.innerHTML = createCard();
    }
}

searchButton.addEventListener('click', event => {
  event.preventDefault();
  pokeName = searchInput.value.toLowerCase();
  searchInput.value = '';
  startApp(pokeName);
  container.classList.add('fade');

  setTimeout(() => {
    container.classList.remove('fade');
  }, 3000);
});