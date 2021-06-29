const API_URL = 'https://pokeapi.co/api/v2/pokemon/'

// 이름으로 조회
function getPokemonByName(name) {
  fetch(API_URL + name) 
    .then(function(res){
      return res.json();
    })
    .then(function(data){
      console.log(data)
      const id = data.id;
      const name = data.name;
      const imgUrl = data.sprites.other.dream_world.front_default;
      const types = data.types;
      const abilities = data.abilities;
      const weight = data.weight;
      const height = data.height;
      displayPokemonDetail(id, name, imgUrl, types, abilities, weight, height);
    })  
}

function displayPokemonDetail(id, name, imgUrl, types, abilities, weight, height) {
  const typeName = [];
  for(var i = 0; i < types.length; i++) {
    typeName[i] = types[i].type.name;
  }
  const popupContent = `
      <p class='no'>No.${id}</p>
      <h4 class='name'>${name}</h4>
      타입: <span class="type" data-bg='${typeName[0]}'>${typeName[0]}</span>
        ${typeName[1] ? 
          '<span class="type" data-bg="' + typeName[1] + '">' + typeName[1] + '</span>' : ''}
      <p class='ability'>기술1: ${abilities[0].ability.name}</p>
      <p class='ability'>기술2: ${abilities[1] ? abilities[1].ability.name : ''}</p>
      <p class='height'>키: ${height}</p>
      <p class='weight'>무게: ${weight}</p>
  `
  const popup = document.querySelector('#popup');
  const popupArticle = document.querySelector('#popup article');
  const popupFigure = document.querySelector('#popup figure');
  popupFigure.innerHTML = `<img src='${imgUrl}'>`;
  popupArticle.innerHTML = popupContent;
  popup.classList.add('show')
}

// 번호로 조회
function getPokemonByNumber(num) {
  fetch(API_URL + num) 
    .then(function(res){
      return res.json();
    })
    .then(function(data){
      // console.log(data)
      const id = data.id;
      const name = data.name;
      const imgUrl = data.sprites.other.dream_world.front_default;
      const types = data.types;
      displayPokemon(id, name, imgUrl, types);
    })
}

// default param = 1
function getPokemonList(start_num = 1) {
  for(let i = start_num; i <= start_num + 11; i++){
    getPokemonByNumber(i);
  }
}

// pokemon 상세정보
function detailPokemon() {
  console.log('detailPokemon')
}

function displayPokemon(id, name, imgUrl, types) {
  // 속성
  const typeName = [];
  
  for(var i = 0; i < types.length; i++) {
    typeName[i] = types[i].type.name;
  }

  const html = `
    <figure>
      <a href='#${name}'>
        <img src='${imgUrl}' alt='${imgUrl}'>
      </a>  
      <figcaption>
        <span class="id">#${('00'+id).slice(-3)}</span>
        <h4>${name}</h4>
        <span 
          class="type" data-bg='${typeName[0]}'>${typeName[0]}</span>
        ${typeName[1] ? 
          '<span class="type" data-bg="' + typeName[1] + '">' + typeName[1] + '</span>' : ''}
      </figcaption>
    </figure>
  `
  const main = document.querySelector('main > section');
  main.innerHTML += html;
}

// 더보기
let pokemonIdx = 1;
const nextBtn = document.getElementById('nextBtn');

nextBtn.addEventListener('click', function(){
  pokemonIdx += 12;
  getPokemonList(pokemonIdx);
  console.log(pokemonIdx)
})


// 클릭시 팝업 정보창 출력
const section = document.querySelector('main section');
// 클릭한 요소가 a이면 #값(이름) 가져오기
section.addEventListener('click', function(e){
  var name = '';
  if(e.target.parentElement.nodeName.toLowerCase() == 'a') {
    name = e.target.parentElement.hash.slice(1);
    console.log(name)
    getPokemonByName(name)
  }
})

// 팝업창 닫기
const popupCloseBtn = document.querySelector('#popup button')

popupCloseBtn.addEventListener('click', function(){
  document.querySelector('#popup').classList.remove('show')
})


/*** main start ***/
getPokemonList();

