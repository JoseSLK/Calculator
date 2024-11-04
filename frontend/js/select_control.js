import { METHODS } from "./constants.js";

function fillSelect() {
    console.log("ayda")
    const select = document.getElementById("s_method");
    const info = Object.entries(METHODS);

    info.forEach(([id, method]) => {
        const opt = document.createElement("option");
        opt.text = method.name;
        opt.value = id;
        select.add(opt);
    });
}

fillSelect();