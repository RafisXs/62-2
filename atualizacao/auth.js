
document.addEventListener('DOMContentLoaded', function() {
  
    if (window.location.pathname.includes('login.html') || 
        window.location.pathname.includes('cadastro.html')) {
        
       
        const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
        if (usuarioLogado) {
            window.location.href = 'perfil.html';
        }
        
        
        inicializarFormularios();
    }
});

function inicializarFormularios() {
 
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;
            
        
            const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
            const usuario = usuarios.find(u => u.email === email && u.senha === senha);
            
            if (usuario) {
                
                localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
                window.location.href = 'perfil.html';
            } else {
                alert('E-mail ou senha incorretos!');
            }
        });
    }
    
    
    const cadastroForm = document.getElementById('cadastro-form');
    if (cadastroForm) {
        cadastroForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;
            const confirmarSenha = document.getElementById('confirmar-senha').value;
            
            
            if (senha !== confirmarSenha) {
                alert('As senhas não coincidem!');
                return;
            }
            
           
            const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
            const usuarioExistente = usuarios.find(u => u.email === email);
            
            if (usuarioExistente) {
                alert('Já existe um usuário com este e-mail!');
                return;
            }
            
           
            const novoUsuario = {
                id: Date.now(),
                nome,
                email,
                senha,
                foto: 'https://via.placeholder.com/150',
                bio: 'Viajante apaixonado por novas experiências!',
                viagens: [],
                destinosDesejados: []
            };
            
            usuarios.push(novoUsuario);
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
            localStorage.setItem('usuarioLogado', JSON.stringify(novoUsuario));
            
            alert('Cadastro realizado com sucesso!');
            window.location.href = 'perfil.html';
        });
    }
    
  
    const socialButtons = document.querySelectorAll('.social-login');
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            alert('Funcionalidade de login com redes sociais seria implementada aqui!');
        });
    });
}