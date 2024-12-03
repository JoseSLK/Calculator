import { METHODS, NAMEPOINT } from "./constants.js";

const MQ = MathQuill.getInterface(2);


document.getElementById("s_method").addEventListener("change", function(){
    const id_method = document.getElementById("s_method").value
    // console.log(id_method) 

    const methodInfo = METHODS[id_method];
    const form_eq = document.getElementById("equation_form");
    form_eq.innerHTML = "";
    let input_var;

    if (id_method === "5" || id_method === "6" || id_method === "7" || id_method === "8"){
        // console.log("ENTRO")
        const hr = document.createElement("hr")
        hr.classList.add("humble-hr")

        const div_in = document.createElement("div");

        const tolerance_label = document.createElement("label");
        tolerance_label.textContent = "Tolerancia (%Error)";
        tolerance_label.classList.add("form-label", "label-eq");

        const tolerance = document.createElement("input");
        tolerance.type = "number";
        tolerance.name = "tolerance";
        tolerance.id = "tolerance";
        tolerance.required = true;
        tolerance.classList.add("form-control", "input-limits")

        div_in.appendChild(tolerance_label)
        div_in.appendChild(tolerance)

        const label_ne = document.createElement("label");
        label_ne.textContent = `Numero de ecuaciones`;
        label_ne.classList.add("form-label", "label-eq");

        const input_ne = document.createElement("input");
        input_ne.type = "number";
        input_ne.name = `nequations`
        input_ne.required = true;
        input_ne.min = 1;
        input_ne.max = 8;
        input_ne.classList.add("form-control", "input-neq");

        form_eq.appendChild(hr);
        div_in.appendChild(label_ne);
        div_in.appendChild(input_ne);

        if (id_method === "5" || id_method === "6") {
            const label_nvar = document.createElement("label");
            label_nvar.textContent = "Numero de variables";
            label_nvar.classList.add("form-label", "label-eq");
    
            input_var = document.createElement("input");
            input_var.type = "number"
            input_var.name = 'nvar'
            input_var.required = true
            input_var.min = 1;
            input_var.max = 5;
            input_var.classList.add("form-control", "input-nlimits")
    
            div_in.appendChild(label_nvar);
            div_in.appendChild(input_var);
        }
        
        form_eq.appendChild(div_in)

        function updateFields() {
            const numEquations = parseInt(input_ne.value, 10);
            let numVar = 0;
        
            if (id_method === "5" || id_method === "6") {
                numVar = parseInt(input_var.value, 10);
            }

            form_eq.querySelectorAll(".dynamic-fields").forEach(el => el.remove());
        
            const form_inp = document.createElement("div");
            form_inp.classList.add("dynamic-fields");
        
            // Lógica para Jacobi o Gauss-Seidel
            if (id_method === "7" || id_method === "8") {
                if (numEquations > 1 && numEquations <= 8) {

                    for (let i = 1; i <= numEquations; i++) {
                        const row = document.createElement("div");
                        row.classList.add("matrix-row");
        
                        // Crear entradas para coeficientes
                        for (let j = 1; j <= numEquations; j++) {
                            const label = document.createElement("label");
                            label.textContent = `x${j}`;
                            label.classList.add("form-label", "label-coeff");
        
                            const input = document.createElement("input");
                            input.type = "number";
                            input.name = `coef_${i}_${j}`;
                            input.required = true;
                            input.classList.add("form-control", "input-coeff");
                            
                            row.appendChild(input);
                            row.appendChild(label);
                        }
        
                        // Entrada para el término independiente
                        const labelIndependent = document.createElement("label");
                        labelIndependent.textContent = `=`;
                        labelIndependent.classList.add("form-label", "label-independent");
        
                        const inputIndependent = document.createElement("input");
                        inputIndependent.type = "number";
                        inputIndependent.name = `independent_${i}`;
                        inputIndependent.required = true;
                        inputIndependent.classList.add("form-control", "input-independent");
        
                        row.appendChild(labelIndependent);
                        row.appendChild(inputIndependent);
                        let hr = document.createElement('hr')
        
                        form_inp.appendChild(row);
                        form_inp.appendChild(hr);
                    }

                    // Crear entradas para el vector inicial
                    const initialVectorContainer = document.createElement("div");
                    initialVectorContainer.classList.add("initial-vector");

                    const vectorLabel = document.createElement("label");
                    vectorLabel.textContent = "Vector inicial:";
                    vectorLabel.classList.add("form-label", "label-vector");
                    initialVectorContainer.appendChild(vectorLabel);

                    for (let k = 1; k <= numEquations; k++) {
                        const vectorInputLabel = document.createElement("label");
                        vectorInputLabel.textContent = `x${k}`;
                        vectorInputLabel.classList.add("form-label", "label-vector-input");

                        const vectorInput = document.createElement("input");
                        vectorInput.type = "number";
                        vectorInput.name = `initial_vector_${k}`;
                        vectorInput.required = true;
                        vectorInput.classList.add("form-control", "input-vector");

                        initialVectorContainer.appendChild(vectorInputLabel);
                        initialVectorContainer.appendChild(vectorInput);
                    }
                    form_inp.appendChild(initialVectorContainer);

                    //Numero de iteraciones que quiere el usuario
                    const iteration_label = document.createElement("label");
                    iteration_label.textContent = "Numero de iteraciones:";
                    iteration_label.classList.add("form-label");

                    const iteration = document.createElement("input")
                    iteration.type = "number";
                    iteration.name = `iterations`;
                    iteration.id = "iterations";
                    iteration.required = true;
                    iteration.classList.add("form-control", "input-vector");

                    let hr = document.createElement('hr')
                    form_inp.appendChild(hr);
                    form_inp.appendChild(iteration_label);
                    form_inp.appendChild(iteration);
                }
            } 
            // Lógica para otros métodos (id_method === "5" || id_method === "6")
            else if (numEquations > 1 && numEquations <= 8) {
                for (let i = 1; i <= numEquations; i++) {
                    const label = document.createElement("label");
                    label.textContent = `Ecuacion ${i}`;
                    label.classList.add("form-label", "label-eq");
        
                    const mathquillContainer = document.createElement("span");
                    mathquillContainer.classList.add("mathquill-input", "input-equations-w", "mathquill-editable");
                    mathquillContainer.setAttribute("tabindex", "0");
        
                    const mathField = MQ.MathField(mathquillContainer, {
                        handlers: {
                            edit: () => {
                                // console.log("Edición en MathField: " + mathField.latex());
                            }
                        },
                        placeholder: "Escribe aquí tu ecuación"
                    });
                    mathquillContainer.mathFieldInstance = mathField;
        
                    form_inp.appendChild(label);
                    form_inp.appendChild(mathquillContainer);
                }
        
                if (numVar > 1 && numVar <= 5) {
                    for (let j = 1; j <= numVar; j++) {
                        const input_Li = document.createElement("input");
                        const label_li = document.createElement("label");
        
                        label_li.textContent = `Var ${j} punto inicial`;
                        label_li.classList.add("form-label", "label-eq");
        
                        input_Li.type = "number";
                        input_Li.name = `limit${j}`;
                        input_Li.required = true;
                        input_Li.classList.add("form-control", "input-limits");
        
                        form_inp.appendChild(label_li);
                        form_inp.appendChild(input_Li);
                    }
                }
            }
        
            if (form_inp.childElementCount > 0) {
                form_eq.appendChild(form_inp);
            }
        }
        

        input_ne.addEventListener("input", updateFields);
        if (id_method === "5" || id_method === "6") {
            input_var.addEventListener("input", updateFields);
        }
    }else if(methodInfo) {

        const form_inp = document.createElement("div");

        if(id_method !== "9" && id_method !== "10"){
            const tolerance_label = document.createElement("label");
            tolerance_label.textContent = "Tolerancia (%Error)"; 
            tolerance_label.classList.add("form-label", "label-eq");

            const tolerance = document.createElement("input");
            tolerance.type = "number";
            tolerance.name = "tolerance";
            tolerance.id = "tolerance";
            tolerance.required = true;
            tolerance.classList.add("form-control", "input-limits")

            form_inp.appendChild(tolerance_label)
            form_inp.appendChild(tolerance)
        }

        for(let i =1; i <= methodInfo.equations; i++){
            const label = document.createElement("label");
            label.textContent = `Ecuacion ${i}`;
            label.classList.add("form-label", "label-eq");

            const mathquillContainer = document.createElement("span");
            mathquillContainer.classList.add("mathquill-input", "input-equations-w", "mathquill-editable")
            mathquillContainer.setAttribute("tabindex", "0");

            const mathField = MQ.MathField(mathquillContainer, {
                handlers: {
                    edit: () => {
                        // console.log("Edición en MathField: " + mathField.latex());
                    }
                },
                placeholder: "Escribe aquí tu ecuación"
            });
            mathquillContainer.mathFieldInstance = mathField;

            form_inp.appendChild(label)
            form_inp.appendChild(mathquillContainer)

            form_inp.querySelectorAll(".mathquill-input").forEach((element, index) => {
                const mathField = MQ.MathField(element, {
                    handlers: {
                        edit: () => {
                            // console.log("Edición en MathField: " + mathField.latex());
                        }
                    },
                    placeholder: "Escribe aquí tu ecuación"
                });
                element.mathFieldInstance = mathField;
            });
        }

        const pointLabels = NAMEPOINT[id_method] || [];
        for(let j = 1; j <= methodInfo.points; j++){
            const input_Li = document.createElement("input");
            const label_li = document.createElement("label");

            label_li.textContent = pointLabels[j - 1] || `Límite ${j + 1}`;
            label_li.classList.add("form-label", "label-eq");

            input_Li.type = "number";
            input_Li.name = `limit${j}`
            input_Li.required = true;
            input_Li.classList.add("form-control", "input-limits");

            form_inp.appendChild(label_li);
            form_inp.appendChild(input_Li);
        }

        form_eq.appendChild(form_inp)
    }
    
})

document.addEventListener('focusin', (event) => {
    if (event.target.classList.contains('mathquill-editable')) {
        const mathField = event.target.mathFieldInstance;
        if (mathField) {
            activeMathField = mathField;
        }
    }
});
