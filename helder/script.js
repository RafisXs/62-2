// Script principal do Caroneiro
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se o usuário está logado
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    
    if (usuarioLogado) {
        // Atualizar botões de autenticação
        const authButtons = document.querySelector('.auth-buttons');
        if (authButtons) {
            authButtons.innerHTML = `
                <a href="perfil.html" class="btn btn-secondary">Meu Perfil</a>
                <a href="#" class="btn btn-primary" id="logout-btn">Sair</a>
            `;
            
            document.getElementById('logout-btn').addEventListener('click', function(e) {
                e.preventDefault();
                localStorage.removeItem('usuarioLogado');
                window.location.href = 'index.html';
            });
        }
    }
    
    // Funcionalidade de busca
    const searchBox = document.querySelector('.search-box');
    if (searchBox) {
        const searchInput = searchBox.querySelector('input');
        const searchButton = searchBox.querySelector('button');
        
        searchButton.addEventListener('click', function() {
            const termo = searchInput.value.trim();
            if (termo) {
                // Em uma implementação completa, isso redirecionaria para uma página de resultados
                alert(`Buscando por: ${termo}`);
                // Aqui você implementaria a lógica de busca real
            }
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchButton.click();
            }
        });
    }
    
    // Inicialização de componentes comuns
    inicializarComponentes();
});

function inicializarComponentes() {
    // Inicializar tooltips, modais, etc.
    console.log('Componentes inicializados');
}