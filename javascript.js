function add(a, b){
    return a+b;
}
function subtract(a, b){
    return a-b;
}
function multiply(a,b){
    return a*b;
}
function divide(a,b){
    return a/b;
}

function operate (op, n1, n2){
    if (op==="+"){
        return add(n1,n2);
    } else if (op==="-"){
        return subtract(n1,n2);
    } else if (op==="*"){
        return multiply(n1,n2);
    } else if (op==="/"){
        return divide(n1,n2);
    }
}
// console.log(operate("*",1,2))
// console.log(operate("-",1,2))
// console.log(operate("+",1,2))
// console.log(operate("/",1,2))

function createButtons(){
    const arr = ["%","√","AC","C",];
    const upper = document.querySelector("#upperButtons");

    for(const char of arr){
        const b = document.createElement("button");
        b.innerText=char;
        b.classList.add("button");
        upper.appendChild(b);
    }

    const outerContainer = document.querySelector("#numbers");
    for (let i = 7; i >0; i-=3){
        const container = document.createElement("div");
        container.classList.add("row");
        for (let j = 0; j < 3; j++) {
            const numButton = document.createElement("button");
            numButton.innerText=(i+j);
            numButton.classList.add("button");
            container.appendChild(numButton);
        }
        outerContainer.appendChild(container);
    }
    const lowArr = ["0",".","="];
    const container = document.createElement("div");
    container.classList.add("row");
    for(const char of lowArr){
        const b = document.createElement("button");
        b.innerText=char;
        b.classList.add("button");
        container.appendChild(b);
    }
    outerContainer.appendChild(container);
}

createButtons();


