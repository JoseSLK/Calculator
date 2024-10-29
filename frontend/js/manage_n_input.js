import { METHODS } from "./constants.js";

const MQ = MathQuill.getInterface(2);

document.getElementById("s_method").addEventListener("change", function(){
    const id_method = document.getElementById("s_method").value
    console.log(id_method) 

    const methodInfo = METHODS[id_method];

    if(methodInfo) {
        const form_eq = document.getElementById("equation_form");
        form_eq.innerHTML = '';

        const form_inp = document.createElement("div");

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