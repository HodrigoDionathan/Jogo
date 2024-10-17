const components = document.querySelectorAll('.component');

// Função para definir a posição de cada componente
const componentPositions = {
    'battery': 'battery-slot',
    'transformer': 'transformer-slot',
    'capacitor': 'capacitor-slot',
    'motor': 'motor-slot',
    'axis': 'axis-slot',
    'stator': 'stator-slot',
    'transistor': 'transistor-slot'
};

// Adiciona evento de clique para cada componente
components.forEach(component => {
    component.addEventListener('click', () => {
        moveToSlot(component.id);
    });
});

// Função para mover o componente para o slot designado
function moveToSlot(componentId) {
    const slotId = componentPositions[componentId]; // Obter o ID do slot
    const slot = document.getElementById(slotId);

    // Procura um slot vazio ou qualquer slot (permite sobrepor)
    const allSlots = document.querySelectorAll('.slot');
    for (let i = 0; i < allSlots.length; i++) {
        const currentSlot = allSlots[i];
        if (!currentSlot.classList.contains('occupied')) {
            // Remove qualquer imagem do slot anterior, se houver
            currentSlot.innerHTML = '';
            currentSlot.classList.add('occupied'); // Marca o slot como ocupado
            
            const img = document.createElement('img'); // Cria um novo elemento de imagem
            img.src = document.querySelector(`#${componentId} img`).src; // Copia a imagem do componente
            img.alt = componentId; // Define o texto alternativo
            img.style.width = '100%'; // Faz a imagem ocupar toda a largura do slot
            currentSlot.appendChild(img); // Adiciona a imagem ao slot
            currentSlot.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'; // Muda a cor de fundo para indicar ocupação
            break; // Sai do loop após colocar o componente
        }
    }

    checkCompletion(); // Verifica se a montagem foi concluída
}

// Função para verificar se a montagem foi concluída corretamente
function checkCompletion() {
    const slots = document.querySelectorAll('.slot');
    const requiredSlots = ['battery-slot', 'transformer-slot', 'capacitor-slot', 'motor-slot', 'axis-slot', 'stator-slot', 'transistor-slot'];
    let allOccupied = true;
    let correctOrder = true;

    // Ordem correta dos componentes
    const correctOrderComponents = ['battery', 'transformer', 'capacitor', 'motor', 'axis', 'stator', 'transistor'];

    requiredSlots.forEach((slotId, index) => {
        const slot = document.getElementById(slotId);
        const componentImg = slot.querySelector('img');
        if (!slot.classList.contains('occupied') || (componentImg && componentImg.alt !== correctOrderComponents[index])) {
            correctOrder = false;
            allOccupied = false;
        }
    });

    // Se todos os slots necessários estiverem ocupados e na ordem correta, troca a imagem e mostra a lâmpada acesa
    if (correctOrder) {
        document.getElementById('lamp').style.display = 'block'; // Mostra a lâmpada acesa
        document.getElementById('lamp-off').style.display = 'none'; // Esconde a lâmpada apagada
        const statusImg = document.getElementById('project-status-img');
        statusImg.src = 'imagens/cerejinhafeliz.png'; // Troca para a imagem de sucesso
        statusImg.classList.add('zoom'); // Adiciona o efeito de zoom
        
        // Mostra os balões
        document.getElementById('balloons').style.display = 'flex'; 

    } else {
        // Mostra a lâmpada apagada e a imagem de projeto incompleto se a montagem não estiver correta
        document.getElementById('lamp').style.display = 'none';
        document.getElementById('lamp-off').style.display = 'block';
        const statusImg = document.getElementById('project-status-img');
        statusImg.src = 'imagens/cerejinhaduvida.png'; // Troca para a imagem de projeto incompleto
        statusImg.classList.remove('zoom'); // Remove o zoom se estiver errado

        // Esconde os balões
        document.getElementById('balloons').style.display = 'none'; 
    }
}

// Função para resetar a montagem e reiniciar o jogo
document.getElementById('reset-button').addEventListener('click', function() {
    const slots = document.querySelectorAll('.slot');
    slots.forEach(slot => {
        slot.innerHTML = ''; // Limpa o conteúdo do slot
        slot.classList.remove('occupied'); // Marca o slot como não ocupado
        slot.style.backgroundColor = ''; // Reseta a cor de fundo
    });

    // Esconde as lâmpadas, reseta a imagem e balões
    document.getElementById('lamp').style.display = 'none';
    document.getElementById('lamp-off').style.display = 'block';
    document.getElementById('project-status-img').src = 'imagens/cerejinhaduvida.png'; // Reseta a imagem para o estado inicial
    document.getElementById('project-status-img').classList.remove('zoom'); // Remove o efeito de zoom
    document.getElementById('balloons').style.display = 'none'; // Esconde os balões
});
