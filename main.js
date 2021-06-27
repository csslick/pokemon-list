const API_URL = 'https://pokeapi.co/api/v2/pokemon/'

function getPokemon(num) {
  fetch(API_URL + num) 
    .then(function(res){
    return res.json();
  })
    .then(function(data){
    console.log(data)
    const id = data.id;
    const name = data.name;
    const imgUrl =  data.sprites.other.dream_world.
    front_default;
    const types = data.types;
    displayPokemon(id, name, imgUrl, types);
  })
}

// default param = 1
function getPokemonList(start_num = 1) {
  for(var i = start_num; i <= start_num + 11; i++){
    getPokemon(i);
  }
}

function displayPokemon(id, name, imgUrl, types) {
  // 속성
  const typeName = [];
  
  for(var i = 0; i < types.length; i++) {
    typeName[i] = types[i].type.name;
  }

  const html = `
    <figure>
      <a href='#'>
        <img src='${imgUrl}' alt='${imgUrl}'>
      </a>  
      <figcaption>
        <span class="id">#${('00'+id).slice(-3)}</span>
        <h4>name: ${name}</h4>
        <span 
          class="type" data-bg='${typeName[0]}'>${typeName[0]}</span>
        ${typeName[1] ? 
          '<span class="type" data-bg="' + typeName[1] + '">' + typeName[1] + '</span>' : ''}
      </figcaption>
    </figure>
  `
  const main = document.querySelector('main');
  main.innerHTML += html;
}

getPokemonList();