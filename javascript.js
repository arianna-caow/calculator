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
    const op = ["÷","×","–","+"];
    const outerContainer = document.querySelector("#allButtons");
    let count = 0;
    for (let i = 7; i > 0; i-=3){
        const container = document.createElement("div");
        container.classList.add("row");
        for (let j = 0; j < 3; j++) {
            const numButton = document.createElement("button");
            numButton.innerText=(i+j);
            numButton.classList.add("button");
            numButton.classList.add("number");
            container.appendChild(numButton);
        }
        const operator = document.createElement("button");
        operator.innerText=(op[count]);
        operator.classList.add("button");
        operator.classList.add("operator");
        operator.style.backgroundColor="#B7C9E2";
        container.appendChild(operator);
        outerContainer.appendChild(container);
        count++
    }
    const lowArr = ["0",".","=","+"];
    const container = document.createElement("div");
    container.classList.add("row");
    for(const char of lowArr){
        const b = document.createElement("button");
        b.innerText=char;
        b.classList.add("button");
        if (char==="+" || char==="="){
            b.classList.add("operator");
            b.style.backgroundColor="#B7C9E2";
        }
        container.appendChild(b);
    }
    outerContainer.appendChild(container);
}

createButtons();

const display = document.querySelector("#screen");
const equation = document.querySelector('#equation');
const numButtons = document.querySelectorAll(".number");
const allButtons = document.querySelectorAll(".button");
numButtons.forEach((button)=>{
    button.addEventListener('click',()=>{
        display.textContent=button.textContent;
    })
})
allButtons.forEach((button)=>{
    button.addEventListener('click',()=>{
        equation.textContent+=button.textContent;
    })
})