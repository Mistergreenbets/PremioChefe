let numeroAtual = null

const grid = document.getElementById("grid")

function carregarMapa(){

db.ref("rifa").on("value",(snapshot)=>{

grid.innerHTML=""

for(let i=1;i<=200;i++){

let numero = i.toString().padStart(3,"0")

let dados = snapshot.val()?.[numero]

let div = document.createElement("div")

div.classList.add("numero")

if(!dados){

div.classList.add("disponivel")

}else{

div.classList.add(dados.status)

}

div.innerText = numero

div.onclick = ()=>abrir(numero,dados)

grid.appendChild(div)

}

})

}

function abrir(numero,dados){

if(dados) return

numeroAtual = numero

document.getElementById("numero").innerText="Número "+numero

document.getElementById("modal").style.display="flex"

}

function fechar(){

document.getElementById("modal").style.display="none"

}

function reservar(){

let nome = document.getElementById("nome").value

let telefone = document.getElementById("telefone").value

if(!nome || !telefone) return

db.ref("rifa/"+numeroAtual).set({

nome:nome,
telefone:telefone,
status:"reservado"

})

fechar()

}

carregarMapa()