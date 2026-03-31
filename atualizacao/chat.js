document.addEventListener('DOMContentLoaded', function() {
 
    if (window.location.pathname.includes('chat.html')) {
       
        const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
        if (!usuarioLogado) {
            window.location.href = 'login.html';
            return;
        }
        
        inicializarChat();
    }
});

function inicializarChat() {
   
    const listaConversas = document.getElementById('lista-conversas');
    const areaChat = document.getElementById('area-chat');
    const inputMensagem = document.getElementById('input-mensagem');
    const btnEnviar = document.getElementById('btn-enviar');
  
const fileInput = document.getElementById('fileInput');
const attachButton = document.getElementById('attachButton');
const mediaPreview = document.getElementById('mediaPreview');
const previewImage = document.getElementById('previewImage');
const previewVideo = document.getElementById('previewVideo');
const fileName = document.getElementById('fileName');
const messageInput = document.getElementById('messageInput');


let currentFile = null;


attachButton.addEventListener('click', () => {
    fileInput.click();
});


fileInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
      
        if (file.size > 10 * 1024 * 1024) {
            alert('Arquivo muito grande. Tamanho máximo: 10MB');
            return;
        }
        
        currentFile = file;
        showMediaPreview(file);
    }
});


function showMediaPreview(file) {
    fileName.textContent = file.name;
    
    if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
            previewImage.src = e.target.result;
            previewImage.style.display = 'block';
            previewVideo.style.display = 'none';
        }
        reader.readAsDataURL(file);
    } 
    else if (file.type.startsWith('video/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
            previewVideo.src = e.target.result;
            previewVideo.style.display = 'block';
            previewImage.style.display = 'none';
        }
        reader.readAsDataURL(file);
    }
    
    mediaPreview.style.display = 'block';
}


function cancelMedia() {
    fileInput.value = '';
    currentFile = null;
    mediaPreview.style.display = 'none';
    previewImage.style.display = 'none';
    previewVideo.style.display = 'none';
    previewImage.src = '#';
    previewVideo.src = '';
}


function sendMessage() {
    const messageText = messageInput.value.trim();
    
    if (currentFile) {
     
        sendMediaMessage(currentFile, messageText);
    } else if (messageText) {
      
        sendTextMessage(messageText);
    } else {
       
        return;
    }
    
  
    messageInput.value = '';
    cancelMedia();
}


function sendMediaMessage(file, caption = '') {

    console.log('Enviando mídia:', file.name, 'Legenda:', caption);
    
   
    simulateUpload(file, caption);
}


function sendTextMessage(text) {
    
    console.log('Enviando texto:', text);
    addMessageToChat('text', text, null);
}


function simulateUpload(file, caption) {

    const tempId = 'temp-' + Date.now();
    addMessageToChat('uploading', caption, file, tempId);
    
 
    setTimeout(() => {
     
        const reader = new FileReader();
        reader.onload = (e) => {
        
            const tempElement = document.getElementById(tempId);
            if (tempElement) {
                tempElement.remove();
            }
            
           
            if (file.type.startsWith('image/')) {
                addMessageToChat('image', caption, file, null, e.target.result);
            } else if (file.type.startsWith('video/')) {
                addMessageToChat('video', caption, file, null, e.target.result);
            }
        };
        reader.readAsDataURL(file);
    }, 1500);
}


function addMessageToChat(type, text, file, tempId = null, dataUrl = null) {
    const chatContainer = document.getElementById('chatMessages'); 
    
    const messageElement = document.createElement('div');
    messageElement.className = 'message';
    if (tempId) messageElement.id = tempId;
    
    const timestamp = new Date().toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    
    let content = '';
    
    switch (type) {
        case 'text':
            content = `
                <div class="message-bubble">
                    <p>${escapeHtml(text)}</p>
                    <span class="timestamp">${timestamp}</span>
                </div>
            `;
            break;
            
        case 'uploading':
            content = `
                <div class="message-bubble">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <div class="loading-spinner"></div>
                        <span>Enviando ${file.name}...</span>
                    </div>
                </div>
            `;
            break;
            
        case 'image':
            content = `
                <div class="message-bubble">
                    <img src="${dataUrl}" alt="${escapeHtml(text)}" class="chat-image">
                    ${text ? `<p class="media-caption">${escapeHtml(text)}</p>` : ''}
                    <span class="timestamp">${timestamp}</span>
                </div>
            `;
            break;
            
        case 'video':
            content = `
                <div class="message-bubble">
                    <video controls class="chat-video">
                        <source src="${dataUrl}" type="${file.type}">
                    </video>
                    ${text ? `<p class="media-caption">${escapeHtml(text)}</p>` : ''}
                    <span class="timestamp">${timestamp}</span>
                </div>
            `;
            break;
    }
    
    messageElement.innerHTML = content;
    chatContainer.appendChild(messageElement);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}


function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
   
    const conversas = JSON.parse(localStorage.getItem('conversas')) || [];
    
   
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
        
        
        const mensagensContainer = document.getElementById('mensagens-container');
        mensagensContainer.scrollTop = mensagensContainer.scrollHeight;
        
     
        btnEnviar.onclick = function() {
            enviarMensagem(idConversa);
        };
        
        inputMensagem.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                enviarMensagem(idConversa);
            }
        });
    }
    
   
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
        
       
        inputMensagem.value = '';
        
      
        abrirConversa(idConversa);
    }
    
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
        location.reload(); 
    } else {
        renderizarConversas();
        
      
        if (conversas.length > 0) {
            abrirConversa(conversas[0].id);
        }
    }
}