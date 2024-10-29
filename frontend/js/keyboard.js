let lastFocusedElement = null;

// Evento para guardar el último input/textarea activo
document.addEventListener('focusin', (event) => {
    if (event.target.tagName === 'SPAN' || event.target.tagName === 'TEXTAREA') {
        lastFocusedElement = event.target;
    }
});

function insertValue(value) {
    if (lastFocusedElement) {
        if(lastFocusedElement.classList.contains("mathquill-input")){
            const mathField = MQ.MathField(lastFocusedElement);

            if(value === '\\sqrt{}'){
                mathField.write('\\sqrt{}'); // Inserta el comando de raíz cuadrada
                lastFocusedElement.focus();

                const cursorPos = mathField.selection.end;
                mathField.selection.end = cursorPos - 1;
            }else{
                mathField.write(value); 
                lastFocusedElement.focus();  
            }      
        }else{
            lastFocusedElement.textContent += value;
        }
        lastFocusedElement.value += value; 
        lastFocusedElement.focus(); 
    }else {
        console.log('No hay un elemento enfocado para insertar el valor');
    }
}

// Evento para cada botón del teclado
document.querySelectorAll('.keyboard-button').forEach(button => {
    button.addEventListener('click', function() {
        insertValue(button.dataset.value);
    });
});
