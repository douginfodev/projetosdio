const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const pokemonDetails = document.getElementById('card')

const maxRecords = 151
const limit = 10
let offset = 0;
let start = true;
let details; 

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" onclick="findPokemon(${pokemon.number})">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
       
    `
}

function displayPokemonDetails(pokemon) {
    return `
    <div id="card">
    <div id="pokemon-display" class="${pokemon.type}">
      <div class="pokemon-title">
      <h1>#${pokemon.number} - ${pokemon.name}</h1>
      </div>

       <div class="pokemon-types">
         ${pokemon.types.map((type) => `<span>${type}</span>`)}
       </div>

      <div class="pokemon-image">
      <img src="${pokemon.photo}"
      alt="${pokemon.name}">
      </div>
    </div>   

    <div class="pokemon-details">
      DETAILS
    </div> 
    </div>
    `
}

function findPokemon(id){
    loadPokemonItens(offset, limit,id) 
}

function loadPokemonItens(offset, limit,indice) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        pokemonList.innerHTML = "";
        let idpokemon = (indice - 1);
        let newHtml = ''

        if (indice < 0)
          newHtml = pokemons.map(convertPokemonToLi).join('');
        else
          newHtml = displayPokemonDetails(pokemons[idpokemon])       
       
        pokemonList.innerHTML += newHtml
    })
}

window.onload = init();

function init(){
       loadPokemonItens(offset, limit,-1)
}


loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})