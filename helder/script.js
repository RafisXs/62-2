
document.addEventListener('DOMContentLoaded', function() {
  
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    
    if (usuarioLogado) {
       
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
    
  
    const searchBox = document.querySelector('.search-box');
    if (searchBox) {
        const searchInput = searchBox.querySelector('input');
        const searchButton = searchBox.querySelector('button');
        
        searchButton.addEventListener('click', function() {
            const termo = searchInput.value.trim();
            if (termo) {
              
                alert(`Buscando por: ${termo}`);
                
            }
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchButton.click();
            }
        });
    }
    
    
    inicializarComponentes();
});

function inicializarComponentes() {
  
    console.log('Componentes inicializados');
}