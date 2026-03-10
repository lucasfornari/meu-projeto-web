/**
 * @param {Array} dados
 */
export function renderizarDepoimentos(dados) {
    const lista = document.getElementById("lista-depoimentos");
    if (!lista) return;

    lista.innerHTML = dados.map(item => `
        <div class="col-md-4 mb-4">
            <div class="card h-100 shadow-sm">
                <div class="card-body">
                    <h5 class="card-title text-primary">${item.name}</h5>
                    <p class="card-text text-muted">${item.body}</p>
                    <small class="text-secondary"><em>Por: ${item.email}</em></small>
                </div>
            </div>
        </div>
    `).join("");
}

/**
 * @param {string} mensagem
 * @param {string} tipo
 * @param {string} containerId
 */
export function mostrarAlerta(mensagem, tipo, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const alertDiv = document.createElement("div");
    alertDiv.className = `alert alert-${tipo} alert-dismissible fade show`;
    alertDiv.setAttribute("role", "alert");
    alertDiv.innerHTML = `
        ${mensagem}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    container.innerHTML = "";
    container.appendChild(alertDiv);

    setTimeout(() => alertDiv.remove(), 6000);
}
