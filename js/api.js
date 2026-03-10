export async function carregarDepoimentos() {
    var response = await fetch("https://jsonplaceholder.typicode.com/comments?_limit=3");
    var dados = await response.json();
    return dados;
}

export async function enviarFormulario(nome, email, mensagem) {
    var response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ nome: nome, email: email, mensagem: mensagem })
    });
    return response;
}
