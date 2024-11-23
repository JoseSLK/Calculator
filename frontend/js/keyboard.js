    let activeMathField = null;

    // Configuración del teclado
    const keyboard_keys = [
        [
            {"key":"AC", "print_value": 'AC'},
            {"key":"^2", "print_value": '\\^2'},
            {"key":"^{", "print_value": '\\^{}'},
            {"key":"\\sqrt{}", "print_value": '\\sqrt{ }'},
            {"key":"x", "print_value": 'x'},
            {"key":"7", "print_value": '7'},
            {"key":"8", "print_value": '8'},
            {"key":"9", "print_value": '9'},
            {"key":"+","print_value": '+'},
            {"key":"-","print_value": '-'},
        ],
        [
            {"key":"csc()", "print_value": 'csc'},
            {"key":"sin()", "print_value": 'sin'},
            {"key":"**-1", "print_value": '\\^{-1}'},
            {"key":'\\frac{}{}', "print_value": '\\frac{}{}'},
            {"key":"y", "print_value": 'y'},
            {"key":"4", "print_value": '4'},
            {"key":"5", "print_value": '5'},
            {"key":"6", "print_value": '6'},
            {"key":"*","print_value": '\\times'},
            {"key":'\\frac{}{}',"print_value": '\\frac{}{}' }
        ],
        [
            {"key":"sec()", "print_value": 'sec'},
            {"key":"cos()", "print_value": 'cos'},
            {"key":"ln()", "print_value": 'ln'},
            {"key":"log()", "print_value": 'log'},
            {"key":"e", "print_value": 'e'},
            {"key":"1", "print_value": '1'},
            {"key":"2", "print_value": '2'},
            {"key":"3", "print_value": '3'}
        ],
        [
            {"key":"cot()", "print_value": 'cot'},
            {"key":"tan()", "print_value": 'tan'},
            {"key":"(", "print_value": '('},
            {"key":")", "print_value": ')'},
            {"key":"pi", "print_value": '\\pi'},
            {"key":"0", "print_value": '0'},
            {"key":".", "print_value": '.'}
        ]
    ];

    // Evento que maneja el clic en un campo de MathQuill
    document.addEventListener('focusin', (event) => {
        const targetElement = event.target;
        
        const mathFieldContainer = targetElement.closest('.mathquill-editable');
        
        if (mathFieldContainer) {
            const mathField = mathFieldContainer.mathFieldInstance;
            if (mathField) {
                activeMathField = mathField;
                console.log("Campo MathQuill activo:", mathField.latex());
            } else {
                console.error("mathFieldInstance no encontrado en el contenedor MathQuill.");
            }
        } else {
            console.log("El elemento con foco no es un campo MathQuill:", targetElement);
        }
    });
    

    // Cargar el teclado en el contenedor
    function loadKeyboard() {
        const keyboardContainer = document.querySelector('.keyboard');
        keyboardContainer.innerHTML = '';
        console.log("Cargando teclado...");

        // Crear las filas del teclado
        keyboard_keys.forEach(rows => {
            const rowDiv = document.createElement('div');
            rowDiv.classList.add('keyboard-row'); 

            rows.forEach(key => {
                const keyButton = document.createElement('button');
                keyButton.classList.add('keyboard-key', 'btn', 'btn-light');

                if (key.key === "del") {
                    keyButton.innerHTML = `<img src="${key.print_value}" alt="Backspace"/>`;
                } else {
                    const katexSpan = document.createElement('span');
                    katex.render(key.print_value, katexSpan);
                    keyButton.appendChild(katexSpan);
                }

                // Agregar evento de clic para insertar el valor
                keyButton.addEventListener('click', (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    handleKeyPress(key.print_value);
                });
                rowDiv.appendChild(keyButton);
            });
            
            keyboardContainer.appendChild(rowDiv);
        });
        console.log("Teclado cargado con éxito");
    }

    // Maneja la acción de presionar una tecla en el teclado
    function handleKeyPress(value) {
        console.log("Tecla presionada: " + value);
        if (activeMathField) {
            if (value === "del") {
                console.log("Borrando último carácter");
                activeMathField.keystroke('Backspace');
            } else {
                console.log("Escribiendo en el campo MathQuill: " + value);
                activeMathField.write(value);
            }
    
            // Enfocar manualmente el campo MathQuill
            activeMathField.focus();
        } else {
            console.log("No hay un campo MathQuill activo para escribir");
        }
    }

    // Iniciar el teclado al cargar el documento
    document.addEventListener("DOMContentLoaded", loadKeyboard);
