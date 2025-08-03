const pokemonContainer = document.querySelector('.container')

const POKEMON_COUNT = 100;


loadPokemons()

 

async function getPokemon(api){
    const resp = await fetch(api)

    if(!resp.ok){
        console.error("Something went wrong!");
    }

    const data = await resp.json()
    console.log(data);
    
    return data

}


function formatPokemonData(data){
    return{
        id : data.id,
        name :  data.name,
        image :  "",
        type : data.types[0].type.name
    }
}

async function loadPokemons(){
    
    for (let index = 1; index < POKEMON_COUNT; index++) {
        const pokemon = await getPokemon( `https://pokeapi.co/api/v2/pokemon/${index}`) 
        const pokeData = formatPokemonData(pokemon);


        const pokemonEl =  createPokemonEl(pokeData)
        pokemonContainer.appendChild(pokemonEl)
        
    }
    
 
   
    
    
    function createPokemonEl(data){
        const pokemonEl = document.createElement('div')
        pokemonEl.classList.add('pokemon')
        pokemonEl.classList.add(data.type)
        pokemonEl.innerHTML = `
         <div class="pokemon__img-container">
              <img
                class="pokemon__img"
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png"
                alt=""
              />
            </div>
    
            <div class="pokemon__info">
              <p class="pokemon__id">#${getFormatedId(data.id) }</p>
              <h2 class="pokemon__name">${getFormatedName(data.name)}</h2>
               
                
              <h2 class="pokemon__type">Type : <span>${getFormatedName(data.type)}</span> </h2> 
               
            </div>`
            return pokemonEl;
    }
    
}

function getFormatedId(id){
    const idStr = id.toString().padStart(3,'0')
    return idStr;
}

function getFormatedName(name){
    return name.replace(/^(.)/, (match, p1) => p1.toUpperCase());
}