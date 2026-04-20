let produtos = [];

function carregarProdutos(){
    fetch("http://localhost:3000/produtos")
    .then(res => res.json())
    .then(data => {
        produtos = data;
        renderizarProdutos();
    });
}

carregarProdutos();
const lista = document.getElementById("listaProdutos");
const totalProdutos = document.getElementById("totalProdutos");

fetch("http://localhost:3000/produtos",{
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body: JSON.stringify({
        nome,
        quantidade,
        minimo
    })
});

function renderizarProdutos() {
    if (!lista) return;

    lista.innerHTML = "";

    produtos.forEach((produto, index) => {

        let alertaClasse = produto.quantidade <= produto.minimo ? "alerta" : "";

        lista.innerHTML += `
            <tr class="${alertaClasse}">
                <td>${produto.nome}</td>
                <td>${produto.quantidade}</td>
                <td>${produto.minimo}</td>
                <td>
                    <button class="excluir" onclick="excluirProduto(${index})">Excluir</button>
                </td>
            </tr>
        `;
    });

    if (totalProdutos) {
        totalProdutos.innerText = produtos.length;
    }
}

function excluirProduto(index) {
    produtos.splice(index, 1);
    salvar();
    renderizarProdutos();
}

const form = document.getElementById("produtoForm");

if (form) {
    form.addEventListener("submit", function(e){
        e.preventDefault();

        let nome = document.getElementById("nome").value;
        let quantidade = parseInt(document.getElementById("quantidade").value);
        let minimo = parseInt(document.getElementById("minimo").value);

        produtos.push({nome, quantidade, minimo});
        salvar();
        form.reset();
        renderizarProdutos();
    });
}

/* MOVIMENTAÇÃO */
const movForm = document.getElementById("movForm");

if (movForm) {
    movForm.addEventListener("submit", function(e){
        e.preventDefault();

        let nome = document.getElementById("movNome").value;
        let tipo = document.getElementById("movTipo").value;
        let quantidade = parseInt(document.getElementById("movQtd").value);

        let produto = produtos.find(p => 
            p.nome.toLowerCase().trim() === nome.toLowerCase().trim()
        );

        if (!produto) {
            alert("Produto não encontrado!");
            return;
        }

        if (tipo === "Entrada") {
            produto.quantidade += quantidade;
        } else {
            if (produto.quantidade < quantidade) {
                alert("Estoque insuficiente!");
                return;
            }
            produto.quantidade -= quantidade;
        }

        salvar();
        renderizarProdutos();
        movForm.reset();
    });
}

        if (!produto) {
            alert("Produto não encontrado!");
            return;
        }

        if (tipo === "Entrada") {
            produto.quantidade += quantidade;
        } else {
            produto.quantidade -= quantidade;
        }

        salvar();
        renderizarProdutos();
        movForm.reset();
    


renderizarProdutos();