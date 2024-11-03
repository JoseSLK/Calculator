let lastFocusedElement = null;

// Evento para guardar el último input/textarea activo
document.addEventListener('focusin', (event) => {
    if (event.target.tagName === 'SPAN' || event.target.tagName === 'TEXTAREA') {
        lastFocusedElement = event.target;
    }
});

function insertValue(value) {
    if (lastFocusedElement) {
        if (lastFocusedElement.value !== undefined) {
            console.log("entro")
            lastFocusedElement.value += value;
            lastFocusedElement.focus();
        }
    }
}

// Evento para cada botón del teclado
document.querySelectorAll('.keyboard-button').forEach(button => {
    if (button.dataset && button.dataset.value) {
        button.addEventListener('click', function() {
            insertValue(button.dataset.value);
        });
    }
});