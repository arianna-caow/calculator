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
    const container = document.createElement("div");
    container.classList.add("row");
    const zero = document.createElement("button");
    zero.innerText=0;
    zero.classList.add("button");
    container.appendChild(zero);
    const period = document.createElement("button");
    period.innerText=".";
    period.classList.add("button");
    container.appendChild(period);
    const equal = document.createElement("button");
    equal.innerText="=";
    equal.classList.add("button");
    container.appendChild(equal);
    outerContainer.appendChild(container);
}

createButtons();


