export async function carregarDepoimentos() {
    var resposta = await fetch("https://jsonplaceholder.typicode.com/comments?_limit=3");
    var dados = await resposta.json();
    return dados;
}

export async function enviarFormulario(nome, email, mensagem) {
    var resposta = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ nome: nome, email: email, mensagem: mensagem })
    });
    return resposta;
}

export async function buscarCep(cep) {
    var resposta = await fetch("https://viacep.com.br/ws/" + cep + "/json/");
    var dados = await resposta.json();
    return dados;
}