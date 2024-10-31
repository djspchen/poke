const MAX_POKEMON = 500;
const typeColors = {
    normal: "#A8A878",
    fire: "#F08030",
    water: "#6890F0",
    electric: "#F8D030",
    grass: "#78C850",
    ice: "#98D8D8",
    fighting: "#C03028",
    poison: "#A040A0",
    ground: "#E0C068",
    flying: "#A890F0",
    psychic: "#F85888",
    bug: "#A8B820",
    rock: "#B8A038",
    ghost: "#705898",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    dark: "#EE99AC",
  };


//箭頭
const arrow=document.querySelector('.arrow');
arrow.addEventListener('click',ckarrow)
function ckarrow(){
    // console.log('yes')
    window.location.href=`./`  
}

//索取資料
// id從網址拿取取得ID 
const pokemonID=new URLSearchParams(window.location.search).get("id")
console.log(pokemonID)

// 左右箭頭跳轉
document.querySelector('#rightArrow').addEventListener('click',clickRightArrow)
function clickRightArrow(){
    if(pokemonID>=1 && pokemonID<MAX_POKEMON){
        const tem=parseInt(pokemonID)+1
        console.log(tem);
        
        window.location.href=`./detail.html?id=${tem}`
        
    }else{
        window.location.href=`./detail.html?id=1`
    }
}


document.querySelector('#leftArrow').addEventListener('click',clickLeftArrow)
function clickLeftArrow(){
    console.log(pokemonID>=1 ||pokemonID<MAX_POKEMON)
    if(pokemonID>1 && pokemonID<=MAX_POKEMON){
        const tem=parseInt(pokemonID)-1
        console.log(tem);
        
        window.location.href=`./detail.html?id=${tem}`
        // console.log(pokemonID)
    }else{
        window.location.href=`./detail.html?id=${MAX_POKEMON}`
    }
}
//API 名字、編號、圖片
let allPokemonsName=[];
fetch(`http://pokeapi.co/api/v2/pokemon?limit=${MAX_POKEMON}`)
.then((res)=>res.json())
.then((data)=>{
    allPokemonsName=data.results;
    // console.log(data.results)
    let pokename=(allPokemonsName[pokemonID-1].name).toUpperCase()
    // console.log(pokename)
    document.querySelector('.pokename').innerHTML=`${pokename}`
    document.querySelector('.number').innerHTML=`#${pokemonID}`

    
    
    let pokePic=document.querySelector('#pokePic')
    pokePic.src=`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemonID}.gif`;
   

    // console.log(document.querySelector('#pokePic').getAttribute('src'));
    

})
// API 描述、背景顏色
fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonID}`)
.then((res) =>res.json())
.then((data)=>{
    // console.log(data)
    //中文名字資料
    // console.log(data.names[3].name)
    // allPokemonsName=data.names[3].name;
    // document.querySelector('.pokename').innerHTML=`${allPokemonsName}`
    // console.log(data.flavor_text_entries[66].flavor_text)
    let pokeTextDescript=data.flavor_text_entries[1].flavor_text
    document.querySelector('.pokeTextDescript').innerHTML=`${pokeTextDescript}`

    // console.log(data.color.name)
    if(data.color.name=='white'){
        document.querySelector('.main-center').style=`background-color:#8c8c8c`
    }else{
        document.querySelector('.main-center').style=`background-color:${data.color.name}`
    }

  
    document.body.style=`background-color:${data.color.name}`

    

    
})

// API 屬性標籤、BAR
fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`)
.then((res) =>res.json())
.then((data)=>{
    console.log(data)
    
    // console.log(data.types.length)//類型
    // console.log(data.types[0].type.name)//類型
    // console.log(data.types[1].type.name)//類型

    for(i=0;i<data.types.length;i++){
        let pokeTypeRaw=data.types[i].type.name
        let pokeType=pokeTypeRaw.slice(0,1).toUpperCase()+pokeTypeRaw.slice(1)
        const addEle=document.createElement('li');
        let colarr=typeColors[pokeTypeRaw]
        addEle.style=`background-color:${colarr}`;

        const typeTag=document.createTextNode(pokeType)
        addEle.appendChild(typeTag)
        // console.log(addEle);
        document.querySelector('.descript-list').appendChild(addEle)

    }
    
    console.log(data.stats[1].stat.name)//hp
    console.log(data.stats[1].base_stat)//hp值
    
    // console.log(document.querySelector('#pokeHp').style=`width:${hp}%`)
    const hp=data.stats[0].base_stat/2
    document.querySelector('#pokeHp').style=`width:${hp}%`

    const atk=data.stats[1].base_stat/2
    document.querySelector('#pokeAtk').style=`width:${atk}%`

    const def=data.stats[2].base_stat/2
    document.querySelector('#pokeDef').style=`width:${def}%`

    const satk=data.stats[3].base_stat/2
    document.querySelector('#pokeSatk').style=`width:${satk}%`

    const sdef=data.stats[4].base_stat/2
    document.querySelector('#pokeSdef').style=`width:${sdef}%`

    const speed=data.stats[5].base_stat/2
    document.querySelector('#pokeSpeed').style=`width:${speed}%`

   
})
