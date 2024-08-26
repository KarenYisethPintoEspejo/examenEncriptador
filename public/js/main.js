document.addEventListener('DOMContentLoaded', () => {
    let myForm = document.querySelector("#myForm");
    let form_ouput = document.querySelector(".form-ouput");
    let form_ouput__menssage = document.querySelector(".form-ouput__menssage");
    let p = document.querySelector(".form-ouput__menssage p");
    let btn_copy = document.querySelector("#copy");
    let error_message = document.querySelector(".form-input__menssage small");

    function validateInput(input) {
        const regex = /^[a-z\s]+$/;
        return regex.test(input);
    }

    myForm.addEventListener("submit", function(e) {
        let btn = e.submitter.dataset.accion;
        let data = Object.fromEntries(new FormData(e.target));
        let inputText = data.chain.trim();

        if (!validateInput(inputText)) {
            error_message.textContent = "Solo debe contener letras minúsculas y espacios.";
            form_ouput.classList.remove("active");
            form_ouput__menssage.classList.remove("active");
            e.preventDefault();
            return;
        } else {
            error_message.textContent = "";
        }

        if (btn == "encrypt") {
            form_ouput.classList.remove("active");
            form_ouput__menssage.classList.add("active");
            p.innerHTML = encrypt(data);
        } else if (btn == "decrypt") {
            form_ouput.classList.remove("active");
            form_ouput__menssage.classList.add("active");
            p.innerHTML = decrypt(data);
        }
        e.preventDefault();
    });

    btn_copy.addEventListener("click", function(e) {
        let range = document.createRange();
        range.selectNode(p);
        let selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand('copy');
        selection.removeAllRanges();

        p.innerHTML = "Elemento copiado";
        setTimeout(() => {
            p.innerHTML = ""; 
            form_ouput__menssage.classList.remove("active");
            form_ouput.classList.add("active");
        }, 100000); 

    });

    function encrypt(object) {
        let word = object.chain.split(" ");
        let convertion = word.map((value) => {
            value = value.split('');
            return value.map((caracter) => {
                if (caracter == "e") return "enter";
                else if (caracter == "i") return "imes";
                else if (caracter == "a") return "ai";
                else if (caracter == "o") return "ober";
                else if (caracter == "u") return "ufat";
                else return caracter;
            }).join("");
        }).join(" ");
        return convertion;
    }

    // Función para descifrar
    function decrypt(object) {
        let word = object.chain.split(" ");
        let convertion = word.map((value) => {
            value = value.replace(/enter/gi, "e");
            value = value.replace(/imes/gi, "i");
            value = value.replace(/ai/gi, "a");
            value = value.replace(/ober/gi, "o");
            value = value.replace(/ufat/gi, "u");
            return value;
        }).join(" ");
        return convertion;
    }
});
