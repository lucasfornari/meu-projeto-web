export async function carregarDepoimentos() {
    const response = await fetch("https://jsonplaceholder.typicode.com/comments?_limit=6");
    if (!response.ok) throw new Error("Falha ao buscar depoimentos");
    return await response.json();
}

/**
 * @param {string} nome
 * @param {string} email
 * @param {string} mensagem
 * @returns {Response}
 */
export async function enviarFormulario(nome, email, mensagem) {
    const dados = { nome, email, mensagem };
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(dados)
    });
    return response;
}
