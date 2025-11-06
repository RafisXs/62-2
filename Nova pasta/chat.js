// Script específico para a página de chat
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se estamos na página de chat
    if (window.location.pathname.includes('chat.html')) {
        // Verificar se o usuário está logado
        const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
        if (!usuarioLogado) {
            window.location.href = 'login.html';
            return;
        }
        
        inicializarChat();
    }
});

function inicializarChat() {
    // Elementos do chat
    const listaConversas = document.getElementById('lista-conversas');
    const areaChat = document.getElementById('area-chat');
    const inputMensagem = document.getElementById('input-mensagem');
    const btnEnviar = document.getElementById('btn-enviar');
    
    // Carregar conversas do localStorage
    const conversas = JSON.parse(localStorage.getItem('conversas')) || [];
    
    // Renderizar lista de conversas
    function renderizarConversas() {
        listaConversas.innerHTML = '';
        
        conversas.forEach(conversa => {
            const itemConversa = document.createElement('div');
            itemConversa.className = 'conversa-item';
            itemConversa.innerHTML = `
                <div class="conversa-avatar">${conversa.nome.charAt(0)}</div>
                <div class="conversa-info">
                    <div class="conversa-nome">${conversa.nome}</div>
                    <div class="conversa-ultima-msg">${conversa.mensagens[conversa.mensagens.length - 1].texto}</div>
                </div>
            `;
            
            itemConversa.addEventListener('click', function() {
                abrirConversa(conversa.id);
            });
            
            listaConversas.appendChild(itemConversa);
        });
    }
    
    // Abrir uma conversa específica
    function abrirConversa(idConversa) {
        const conversa = conversas.find(c => c.id === idConversa);
        if (!conversa) return;
        
        areaChat.innerHTML = `
            <div class="chat-header">
                <h3>${conversa.nome}</h3>
            </div>
            <div class="mensagens-container" id="mensagens-container">
                ${conversa.mensagens.map(mensagem => `
                    <div class="mensagem ${mensagem.remetente === 'eu' ? 'minha-mensagem' : 'outra-mensagem'}">
                        <div class="mensagem-texto">${mensagem.texto}</div>
                        <div class="mensagem-hora">${mensagem.hora}</div>
                    </div>
                `).join('')}
            </div>
        `;
        
        // Rolar para a última mensagem
        const mensagensContainer = document.getElementById('mensagens-container');
        mensagensContainer.scrollTop = mensagensContainer.scrollHeight;
        
        // Configurar envio de mensagens
        btnEnviar.onclick = function() {
            enviarMensagem(idConversa);
        };
        
        inputMensagem.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                enviarMensagem(idConversa);
            }
        });
    }
    
    // Enviar uma mensagem
    function enviarMensagem(idConversa) {
        const texto = inputMensagem.value.trim();
        if (!texto) return;
        
        const conversa = conversas.find(c => c.id === idConversa);
        if (!conversa) return;
        
        const novaMensagem = {
            texto,
            remetente: 'eu',
            hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        conversa.mensagens.push(novaMensagem);
        localStorage.setItem('conversas', JSON.stringify(conversas));
        
        // Limpar input
        inputMensagem.value = '';
        
        // Atualizar chat
        abrirConversa(idConversa);
    }
    
    // Inicializar com dados de exemplo se não houver conversas
    if (conversas.length === 0) {
        const conversasExemplo = [
            {
                id: 1,
                nome: 'Maria Silva',
                mensagens: [
                    { texto: 'Olá! Vi que você também vai para Florianópolis em julho', remetente: 'outro', hora: '10:30' },
                    { texto: 'Sim! Estou planejando ficar 10 dias. E você?', remetente: 'eu', hora: '10:32' },
                    { texto: 'Vou ficar 15 dias. Talvez possamos combinar algum passeio juntos!', remetente: 'outro', hora: '10:35' }
                ]
            },
            {
                id: 2,
                nome: 'João Santos',
                mensagens: [
                    { texto: 'Oi! Você já foi para Bonito?', remetente: 'outro', hora: '09:15' },
                    { texto: 'Ainda não, mas está na minha lista!', remetente: 'eu', hora: '09:20' }
                ]
            }
        ];
        
        localStorage.setItem('conversas', JSON.stringify(conversasExemplo));
        location.reload(); // Recarregar para mostrar as conversas
    } else {
        renderizarConversas();
        
        // Abrir a primeira conversa por padrão
        if (conversas.length > 0) {
            abrirConversa(conversas[0].id);
        }
    }
}