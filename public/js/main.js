let myForm = document.querySelector("#myForm");
let form_ouput = document.querySelector(".form-ouput")
let form_ouput__menssage = document.querySelector(".form-ouput__menssage")
let p = document.querySelector(".form-ouput__menssage p");
let btn_copy = document.querySelector("#copy")

myForm.addEventListener("submit", function(e){
    let btn = e.submitter.dataset.accion
    let data = Object.fromEntries(new FormData(e.target));
    if(btn=="encrypt") {
        form_ouput.classList.remove("active")
        form_ouput__menssage.classList.add("active")
        p.innerHTML = encrypt(data);
    }else if(btn=="decrypt") {
        form_ouput.classList.remove("active")
        form_ouput__menssage.classList.add("active")
        p.innerHTML = decrypt(data);
    }
    e.preventDefault();
})
btn_copy.addEventListener("click", function(e){
    let range = document.createRange();
    range.selectNode(p);
    let selection = window.getSelection();
    selection.removeAllRanges();  
    selection.addRange(range);
    document.execCommand('copy');  
    selection.removeAllRanges();  
    p.innerHTML = ""
    form_ouput__menssage.classList.remove("active")
    form_ouput.classList.add("active")
})
function encrypt(object){
    let word = object.chain.split(" ");
    let convertion = word.map((value, index) => {
        value = value.split('');
        return value.map((caracter)=>{
            if(caracter == "e") return "enter"
            else if(caracter == "i") return "imes"
            else if(caracter == "a") return "ai"
            else if(caracter == "o") return "ober"
            else if(caracter == "u") return "ufat"
            else return caracter
        }).join("")
    }).join(" ");
    return convertion;
}
function decrypt(object){
    let word = object.chain.split(" ");
    let convertion = word.map((value, index) => {
        value = value.replace(/enter/gi, "e");
        value = value.replace(/imes/gi, "i");
        value = value.replace(/ai/gi, "a");
        value = value.replace(/ober/gi, "o");
        value = value.replace(/ufat/gi, "u");
        return value;
    }).join(" ");
    return convertion;
}