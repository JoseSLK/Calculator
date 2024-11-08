import { METHODS } from "./constants.js";

const MQ = MathQuill.getInterface(2);

document.getElementById("s_method").addEventListener("change", function(){
    const id_method = document.getElementById("s_method").value
    console.log(id_method) 

    const methodInfo = METHODS[id_method];
    const form_eq = document.getElementById("equation_form");
    form_eq.innerHTML = "";
    let input_var;

    if (id_method === "5" || id_method === "6" || id_method === "7" || id_method === "8"){
        console.log("ENTRO")
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
            } else if (id_method === "7" || id_method === "8") {
                numVar = numEquations;
            }

            form_eq.querySelectorAll(".dynamic-fields").forEach(el => el.remove());
            if (numEquations > 1 && numEquations <= 8){ 
                const form_inp = document.createElement("div");
                form_inp.classList.add("dynamic-fields");

                for(let i = 1; i <= numEquations; i++){
                    const label = document.createElement("label");
                    label.textContent = `Ecuacion ${i}`;
                    label.classList.add("form-label", "label-eq");
        
                    const mathquillContainer = document.createElement("span");
                    mathquillContainer.classList.add("mathquill-input", "input-equations-w", "mathquill-editable")
                    mathquillContainer.setAttribute("tabindex", "0");
        
                    MQ.MathField(mathquillContainer, {
                        placeholder: "Escribe aquí tu ecuación"
                    });
        
                    form_inp.appendChild(label)
                    form_inp.appendChild(mathquillContainer)
                }

                if (numVar > 1 && numVar <= 5){
                        for(let j = 1; j <= numVar; j++){
                        const input_Li = document.createElement("input");
                        const label_li = document.createElement("label");
            
                        label_li.textContent = `Var ${j} punto inicial`;
                        label_li.classList.add("form-label", "label-eq");
            
                        input_Li.type = "number";
                        input_Li.name = `limit${j}`
                        input_Li.required = true;
                        input_Li.classList.add("form-control", "input-limits");
            
                        form_inp.appendChild(label_li);
                        form_inp.appendChild(input_Li);
                    }
                }
                

                form_eq.appendChild(form_inp);
            }
        }

        input_ne.addEventListener("input", updateFields);
        if (id_method === "5" || id_method === "6") {
            input_var.addEventListener("input", updateFields);
        }
    }else if(methodInfo) {

        const form_inp = document.createElement("div");

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

        for(let i =1; i <= methodInfo.equations; i++){
            const label = document.createElement("label");
            label.textContent = `Ecuacion ${i}`;
            label.classList.add("form-label", "label-eq");

            const mathquillContainer = document.createElement("span");
            mathquillContainer.classList.add("mathquill-input", "input-equations-w", "mathquill-editable")
            mathquillContainer.setAttribute("tabindex", "0");

            MQ.MathField(mathquillContainer, {
                placeholder: "Escribe aquí tu ecuación"
            });

            form_inp.appendChild(label)
            form_inp.appendChild(mathquillContainer)
        }

        for(let j = 1; j <= methodInfo.points; j++){
            const input_Li = document.createElement("input");
            const label_li = document.createElement("label");

            label_li.textContent = `Limite ${j}`;
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