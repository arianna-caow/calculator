let num1 = 0;
let num2 = 0;
let operator = "";
const op = ["÷","×","–","+"];

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
    } else if (op==="–"){
        return subtract(n1,n2);
    } else if (op==="×"){
        return multiply(n1,n2);
    } else if (op==="÷"){
        return divide(n1,n2);
    }
}

function createButtons(){
    const arr = ["%","√","AC","C",];
    const upper = document.querySelector("#upperButtons");

    for(const char of arr){
        const b = document.createElement("button");
        b.innerText=char;
        b.classList.add("button");
        upper.appendChild(b);
        if (b.innerText==="AC"){
            b.setAttribute('id','all-clear');
        } else if (b.innerText==="C"){
            b.setAttribute('id','delete');
        }
    }
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
        if (char==="0"){
            b.classList.add("number");
        }
        if (char==="+"){
            b.classList.add("operator");
            b.style.backgroundColor="#B7C9E2";
        } else if (char==="="){
            b.setAttribute('id',"equals");
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
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector("#equals");
const ac = document.querySelector("#all-clear");
const c = document.querySelector("#delete");

let currEquation = "";
numButtons.forEach((button)=>{
    button.addEventListener('click',()=>{
        console.log({currEquation});
        if (!isNaN(currEquation[currEquation.length-1])){ 
            display.textContent+=button.textContent;
        } else{
            if(num1==0){
                num1=currEquation.substring(0,currEquation.length-1);
            }
            display.textContent=button.textContent;
        }
        currEquation+=button.textContent;
    })
})
operators.forEach((button)=>{
    button.addEventListener('click',()=>{
        if (isNaN(currEquation[currEquation.length-1])){
            currEquation=currEquation.substring(0,currEquation.length-1)
        }
        if(operator!=="" && isNaN(currEquation)){
            console.log({num1,num2,operator});
            num2 = currEquation[currEquation.length-1];
            let solution = operate(operator,Number(num1),Number(num2));
            solution=Math.trunc(solution*1000)/1000;
            num1= solution.toString();
            currEquation=num1;
            display.textContent=solution;
        }
        operator=button.textContent;
        currEquation+=button.textContent;
    })
})

equals.addEventListener('click',()=>{
    num2 = display.textContent;
    equation.textContent=num1+operator+num2;
    console.log({num1,num2,operator});
    let solution = operate(operator,Number(num1),Number(num2));
    solution=Math.trunc(solution*1000)/1000;
    num1=solution.toString();
    // num2=0;
    currEquation=num1;
    display.textContent=solution;
})
allButtons.forEach((button)=>{
    button.addEventListener('click',()=>{
        equation.textContent=currEquation;
    })
})

ac.addEventListener('click',()=>{
    display.textContent='0';
    equation.textContent='';
    currEquation='';
    num1=0;
    num2=0;
    operator="";
})

c.addEventListener('click',()=>{
    console.log({num1,num2,operator});
    if(num2==0){
        display.textContent=display.textContent.substring(0,display.textContent.length-1);
        equation.textContent=equation.textContent.substring(0,equation.textContent.length-1);
        currEquation=currEquation.substring(0,currEquation.length-1)
        console.log(equation.textContent);
    } else{
        display.textContent="0";
        equation.textContent="";
        currEquation="";
        num1=0;
        operator="";
        num2 = 0;
    }
    // console.log({num1,num2,operator});
    //if num1 is 0, backspace
    //else: clear screen + num2 = 0
    
    // currEquation=currEquation.substring(0,currEquation.length-1);
    // equation.textContent=currEquation;
})