/*
Things to work on:
    ✔ full screen on laptop; width too wide
    - .
    ✔ %,√
    ✔ button hover change color slightly
    - keyboard input
*/


let num1 = 0;
let num2 = 0;
let operator = "";
let justPressedEqual = false;
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
    return Math.trunc(a/b*1000)/1000;
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
    const arr = ["%","+/–","AC","C",];
    const upper = document.querySelector("#upperButtons");

    for(const char of arr){
        const b = document.createElement("button");
        b.innerText=char;
        b.classList.add("button");
        upper.appendChild(b);
        if (b.innerText==="AC"){
            b.setAttribute('id','all-clear');
            b.style.backgroundColor="#fdab9f";
        } else if (b.innerText==="C"){
            b.setAttribute('id','delete');
            b.style.backgroundColor="#fdab9f";
        } else if (b.innerText==="+/–"){
            b.setAttribute('id','flip-sign');
            b.style.backgroundColor="#414141"
            b.style.color="#d3d3d3";
        } else{
            b.setAttribute('id','percent');
            b.style.backgroundColor="#414141"
            b.style.color="#d3d3d3";
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
            numButton.setAttribute('id',i+j);
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
            b.setAttribute('id',0);
        }
        if (char==="+"){
            b.classList.add("operator");
            b.style.backgroundColor="#B7C9E2";
        } else if (char==="="){
            b.setAttribute('id',"equals");
            b.style.backgroundColor="#accaa1";
        }
        container.appendChild(b);
    }
    outerContainer.appendChild(container);
}

function clearAll(){
    justPressedEqual=false;
    display.textContent='0';
    equation.textContent='';
    currEquation='';
    num1=0;
    num2=0;
    operator="";
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
const signFlip = document.querySelector('#flip-sign');
const percent = document.querySelector('#percent');

function number(button){
    justPressedEqual=false;
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
}
function operatorFunc(button){
    justPressedEqual=false;
    if (isNaN(currEquation[currEquation.length-1])){
        currEquation=currEquation.substring(0,currEquation.length-1)
    }
    if(operator!=="" && isNaN(currEquation)){
        // console.log({num1,num2,operator});
        num2 = currEquation[currEquation.length-1];
        let solution = operate(operator,Number(num1),Number(num2));
        solution=Math.trunc(solution*1000)/1000;
        num1= solution.toString();
        currEquation=num1;
        display.textContent=solution;
    }
    operator=button.textContent;
    currEquation+=button.textContent;
}
function equalFunc(){
    console.log({num1,num2,operator});
    // divide 0 goes to Infinity
    if (num1!==''){
    let solution="";
    if (!justPressedEqual){
        num2 = display.textContent;
        equation.textContent=num1+operator+num2;
        currEquation=num1+operator+num2;
        solution = operate(operator,Number(num1),Number(num2));
        num1=solution.toString();
        currEquation=num1;
    } else if (operator!=="+/–" && operator!=="%"){
        equation.textContent=num1+operator+num2;
        currEquation=num1+operator+num2;
        solution = operate(operator,Number(num1),Number(num2));
        num1=solution.toString();
    }
    
    display.textContent=solution;
    justPressedEqual=true;
    }
}
function deleteFunc(){
    //doesn't work if you write a number immediately after deleting operator
    console.log({num1,num2,operator});
    console.log(display.textContent);
    if (display.textContent.length!==0 && display.textContent!=="0" ){
        if(!justPressedEqual && currEquation!==num1){ 
            console.log(display.textContent)
            if (!op.includes(equation.textContent.substring(equation.textContent.length-1))){
                display.textContent=display.textContent.substring(0,display.textContent.length-1);
            }
            equation.textContent=equation.textContent.substring(0,equation.textContent.length-1);
            currEquation=currEquation.substring(0,currEquation.length-1)
            // console.log(equation.textContent);
        } else if (!isNaN(currEquation)){
            clearAll();
        }
    } else{
        clearAll();
    }
}
function percentFunc(){
    console.log({num1,num2,operator});
    if((operator!=="" && operator!=="+/–" && operator!=="%")|| (isNaN(currEquation))){
        num2 = currEquation[currEquation.length-1];
        let solution = operate(operator,Number(num1),Number(num2));
        solution=Math.trunc(solution*1000)/1000;
        num1= solution.toString();
        currEquation=num1;
    } else{
        num1=display.textContent;
    }
    console.log({num1,num2,operator});
    let currNum=num1/100;
    clearAll();
    display.textContent=currNum;
    equation.textContent=currNum*100+"%";
    num1=currNum.toString();
    currEquation=num1;
    operator="%";
    console.log({num1,num2,operator});
    justPressedEqual=true;
}

let currEquation = "";
numButtons.forEach((button)=>{
    button.addEventListener('click',()=>{
        number(button);
    })
})
operators.forEach((button)=>{
    button.addEventListener('click',()=>{
        operatorFunc(button);
    })
})
equals.addEventListener('click',()=>{
    equalFunc();
})
allButtons.forEach((button)=>{
    button.addEventListener('click',()=>{
        equation.textContent=currEquation;
    })
    let color = button.style.backgroundColor;
    button.addEventListener('mouseover',()=>{
        button.style.backgroundColor="#987d84";
    })
    button.addEventListener('mouseout',()=>{
        button.style.backgroundColor=color;
    })
})

ac.addEventListener('click',()=>{
    clearAll();
})

c.addEventListener('click',()=>{
    deleteFunc();
})

signFlip.addEventListener('click',()=>{
    console.log({num1,num2,operator});
    if((operator!=="" && operator!=="+/–" && operator!=="%")|| (isNaN(currEquation))){
        num2 = currEquation[currEquation.length-1];
        let solution = operate(operator,Number(num1),Number(num2));
        solution=Math.trunc(solution*1000)/1000;
        num1 = solution.toString();
        currEquation=num1;
    } else{
        num1=display.textContent;
    }
    // console.log({num1,num2,operator});
    let currNum=num1*-1;
    clearAll();
    display.textContent=currNum;
    equation.textContent=currNum;
    num1=currNum.toString();
    currEquation=num1;
    operator="+/–";
    justPressedEqual=true;

})

percent.addEventListener('click',()=>{
    percentFunc();
})

document.addEventListener('keydown', (event) => {
    var name = event.key;
    const userOp = ["/","x","*","-","+","%"];
    //name = "Backspace","Enter";
    if (!isNaN(name)){
        console.log(`Number pressed ${name}`);
        number(document.getElementById(name));
    }
    else if (userOp.includes(name)){
        console.log(`Operator pressed ${name}`);
    }
  }, false);