const pokemonOL = document.getElementById(`pokemonList`)
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecord = 1279
const limit = 12
let offset = 0;

function loadPokemonItens() {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) =>{
        const newHTML = pokemons.map((pokemon) => `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) =>`<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>

        </li>
    `).join(``)

    const pokemonItens = document.querySelectorAll('.pokemon');
    pokemonItens.forEach((item) => {
        item.addEventListener('click',() => {
            item.classList.toggle('active');
        });
    });

        pokemonOL.innerHTML += newHTML
    })
}




loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordNextPage = offset + limit
    
    if(qtdRecordNextPage >= maxRecord) {
        const newlimit = maxRecord - offset
        loadPokemonItens(offset, newlimit)
        
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else{
        loadPokemonItens(offset, limit)
    }
})