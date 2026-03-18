let numeroAtual = null

const grid = document.getElementById("grid")

function carregarMapa(){

db.ref("rifa").on("value",(snapshot)=>{

grid.innerHTML=""

let vendidos = 0
let total = 200

let dadosBanco = snapshot.val() || {}

for(let i=1;i<=200;i++){

let numero = i.toString().padStart(3,"0")

let dados = dadosBanco[numero]

let div = document.createElement("div")

div.classList.add("numero")

if(!dados){

div.classList.add("disponivel")

}else{

div.classList.add(dados.status)

/* CONTAGEM */
if(dados.status === "reservado" || dados.status === "pago"){
    vendidos++
}

}

div.innerText = numero

div.onclick = ()=>abrir(numero,dados)

grid.appendChild(div)

}

/* ATUALIZA PROGRESSO */
atualizarProgresso(total, vendidos)

})

}

function abrir(numero,dados){

if(dados) return

numeroAtual = numero

document.getElementById("numero").innerText="Número "+numero

/* LIMPAR CAMPOS */
document.getElementById("nome").value = ""
document.getElementById("telefone").value = ""

document.getElementById("modal").style.display="flex"

}

function fechar(){

document.getElementById("modal").style.display="none"

document.getElementById("nome").value = ""
document.getElementById("telefone").value = ""

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

/* FUNÇÃO DA BARRA (PROTEGIDA) */
function atualizarProgresso(total, vendidos){

let barra = document.getElementById("barra")
let contador = document.getElementById("contador")

if(!barra || !contador) return // evita quebrar o site

let porcentagem = (vendidos / total) * 100

barra.style.width = porcentagem + "%"
contador.innerText = vendidos + " de " + total + " números vendidos"

}

carregarMapa()

window.addEventListener("scroll", function () {
    let header = document.getElementById("header");

    if (window.scrollY > 50) {
        header.classList.add("ativo");
    } else {
        header.classList.remove("ativo");
    }
});