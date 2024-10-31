const MAX_POKEMON = 500;
const listWrapper =document.querySelector('.list-wrapper');
const searchInput =document.querySelector('#search-input');
const numberFilter =document.querySelector('#number');
const nameFilter =document.querySelector('#name');
const notFoundMessage =document.querySelector('#not-found-message');


let allPokemons = [];
fetch(`http://pokeapi.co/api/v2/pokemon?limit=${MAX_POKEMON}`)
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
        const listItem= document.createElement('div');
        listItem.className='list-item';
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
        
        listItem.addEventListener('click', ()=>{
            window.location.href=`./detail.html?id=${pokemonID}`})
        
        listWrapper.appendChild(listItem)
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

