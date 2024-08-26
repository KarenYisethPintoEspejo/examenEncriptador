document.addEventListener('DOMContentLoaded', () => {
    let myForm = document.querySelector("#myForm");
    let form_ouput = document.querySelector(".form-ouput");
    let form_ouput__menssage = document.querySelector(".form-ouput__menssage");
    let p = document.querySelector(".form-ouput__menssage p");
    let btn_copy = document.querySelector("#copy");
    let error_message = document.querySelector(".form-input__menssage small");

    async function processFormData(action, chain) {
        try {
            const response = await fetch('/process', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ chain, accion: action })
            });

            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }

            const result = await response.json();
            return result.result;
        } catch (error) {
            console.error('Error:', error);
            return 'Error al procesar la solicitud';
        }
    }

    function validateInput(input) {
        const regex = /^[a-z\s]+$/;
        return regex.test(input);
    }

    myForm.addEventListener("submit", async function(e) {
        e.preventDefault();
        
        let btn = e.submitter.dataset.accion;
        let data = Object.fromEntries(new FormData(e.target));
        let inputText = data.chain.trim();

        if (!validateInput(inputText)) {
            error_message.textContent = "Solo debe contener letras minúsculas y espacios.";
            form_ouput.classList.remove("active");
            form_ouput__menssage.classList.remove("active");
            return;
        } else {
            error_message.textContent = "";
        }

        let result = await processFormData(btn, inputText);

        form_ouput.classList.remove("active");
        form_ouput__menssage.classList.add("active");
        p.innerHTML = result;
    });

    btn_copy.addEventListener("click", function() {
        let range = document.createRange();
        range.selectNode(p);
        let selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand('copy');
        selection.removeAllRanges();

        document.querySelector('.confirmation-message').style.display = 'block';
        setTimeout(() => {
            document.querySelector('.confirmation-message').style.display = 'none';
        }, 2000);
    });
});
