const MAX_POKEMON = 500;
const listWrapper =document.querySelector('.list-wrapper');
const searchInput =document.querySelector('#search-input');
const numberFilter =document.querySelector('#number');
const nameFilter =document.querySelector('#name');
const notFoundMessage =document.querySelector('#not-found-message');


let allPokemons = [];
fetch(`https://pokeapi.co/api/v2/pokemon?limit=${MAX_POKEMON}`)
.then((response) => response.json())
.then((data) =>{
    allPokemons =data.results;
    // console.log(data.results[0].url)
    displayPoke(allPokemons) 
} )


function displayPoke(pokemon){
    listWrapper.innerHTML='';
    pokemon.forEach((pokemon)=>{
        // console.log(pokemon);
        let pokeRaw=pokemon.name
        let pokeName=pokeRaw.slice(0,1).toUpperCase()+pokeRaw.slice(1)
        const pokemonID= pokemon.url.split('/')[6];

        const listItemWrap= document.createElement('div');
        listItemWrap.className='list-item-warp';

        const listItem= document.createElement('div');
        listItem.className='list-item';
//卡牌
        listItem.innerHTML=`
        <div class='number-wrap'>
            <p class='font2'>#${pokemonID}
            </p>
        </div>
        
        <div class='img-wrap'>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemonID}.gif">
        </div>
        <div class='name-wrap'>
            <p class='font2'>${pokeName}
            </p>
        </div>
        `
        listItemWrap.appendChild(listItem)

//星星及Checkbox
        const starItem= document.createElement('div');
        starItem.className='star-item';
        starItem.innerHTML=
        `<div class='check-wrap'>
        <input type="checkbox"id="poke${pokemonID}" name="ckbox"class="ckbox">
            <label for="poke${pokemonID}"class="star${pokemonID}">
            <img src="pic/star-regular.svg"class="star">
            </label></div>`
        listItemWrap.appendChild(starItem)
    
        
        listWrapper.appendChild(listItemWrap)

        
  //跳轉      
        listItem.addEventListener('click', ()=>{
            window.location.href=`./detail.html?id=${pokemonID}`})

            
    })
    
    
}

searchInput.addEventListener('keyup',handleSearch);

function handleSearch(){
    const searchTerm=searchInput.value.toLowerCase();
    let filteredPoke;

    if(numberFilter.checked){
        filteredPoke=allPokemons.filter((pokemon) => {
            const pokemonID= pokemon.url.split('/')[6];
            return pokemonID.startsWith(searchTerm)
        })
    }else if(nameFilter.checked){
        filteredPoke=allPokemons.filter((pokemon) => 
           pokemon.name.toLowerCase().startsWith(searchTerm)
            
        )  
    }else{
        filteredPoke=allPokemons
    }

    displayPoke(filteredPoke)

    //沒搜到的話
    if(filteredPoke.length===0){
        notFoundMessage.style.display="block"
    }else{
        notFoundMessage.style.display="none"
    }
}

// 全取消
const closeButton=document.querySelector('#search-close')
closeButton.addEventListener('click',clearSearch)

function clearSearch(){
    searchInput.value='';
    displayPoke(allPokemons)
    notFoundMessage.style.display="none"
}

//點開關索引
document.querySelector('#search-sort').addEventListener('click',close)
function close(){
    let ds=window.getComputedStyle(document.querySelector('.close')).getPropertyValue('display')
    console.log(window.getComputedStyle(document.querySelector('.close')).getPropertyValue('display'));
    // console.log()

    if(ds == 'none'){
        document.querySelector('.close').style="display:block"
        // console.log(typeof(ds))
         
    }else {
       document.querySelector('.close').style="display:none"
        
    }
    
}
// console.log(document.querySelectorAll('.check-wrap>.star'));

// document.querySelectorAll('star')