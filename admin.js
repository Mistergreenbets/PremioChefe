const tabela = document.getElementById("tabela")

db.ref("rifa").on("value",(snapshot)=>{

tabela.innerHTML=""

snapshot.forEach((item)=>{

let numero = item.key

let dados = item.val()

let tr = document.createElement("tr")

tr.innerHTML=`

<td>${numero}</td>
<td>${dados.nome}</td>
<td>${dados.telefone}</td>
<td>${dados.status}</td>

<td>

<button onclick="pagar('${numero}')">Pago</button>

<button onclick="excluir('${numero}')">Excluir</button>

</td>

`

tabela.appendChild(tr)

})

})

function pagar(numero){

db.ref("rifa/"+numero+"/status").set("pago")

}

function excluir(numero){

db.ref("rifa/"+numero).remove()

}