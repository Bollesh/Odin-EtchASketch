let mainContainer = document.getElementById('container');
let columns = "";
let numberOfBoxes = 9;
document.querySelector("#pen").value = "#000000";
document.querySelector('#bg').value = "#ffffff"
let boxes;
let gridStatus = "ON";
let bgColorPicker = document.querySelector("#bg");

mainContainer.style.backgroundColor = "black";

document.querySelector('.gridSize > span').innerHTML = `${numberOfBoxes}x${numberOfBoxes}`

function makeBoxes(){
    for(let i = 0; i < numberOfBoxes; i++){
        for(let j = 0; j < numberOfBoxes; j++){
            let box = document.createElement('div');
            box.classList.add('box');
            box.style.backgroundColor = document.querySelector("#bg").value;
            mainContainer.appendChild(box);
        }
        columns += " auto";
    }
    mainContainer.style.gridTemplateColumns = columns;
    boxes = document.querySelectorAll('.box');
    gridColor();
}

makeBoxes();

let addBoxesBtn = document.querySelector('#addBoxes');
let removeBoxesBtn = document.querySelector('#removeBoxes');

addBoxesBtn.addEventListener('click', () => {
    if(numberOfBoxes < 64){
        mainContainer.innerHTML = ``;
        columns = "";
        numberOfBoxes++;
        makeBoxes();
        boxColoring();
        document.querySelector('.gridSize > span').innerHTML = `${numberOfBoxes}x${numberOfBoxes}`;
    }
});

removeBoxesBtn.addEventListener('click', () => {
    if(numberOfBoxes > 1){
        mainContainer.innerHTML = ``;
        columns = "";
        numberOfBoxes--;
        makeBoxes();
        boxColoring();
        document.querySelector('.gridSize > span').innerHTML = `${numberOfBoxes}x${numberOfBoxes}`;
    }
});

function boxColoring(){
    boxes.forEach(box =>{
        box.addEventListener('mousedown', () => {
            mouseDown = true;
            box.style.backgroundColor = selectedColor;
        });
        box.addEventListener('mouseup', () => {
            mouseDown = false;
        });
        box.addEventListener('mouseover', ()=>{
            if(mouseDown){
                box.style.backgroundColor = selectedColor;
            }
        });
    });
}

boxColoring();

let colorPicker = document.querySelector('#pen');
let selectedColor = document.querySelector("#pen").value;
let afterErase;
colorPicker.addEventListener('input', () => {
    rainbowEffect("OFF");
    selectedColor = document.querySelector("#pen").value;
});
colorPicker.addEventListener('click', () => {
    if(selectedColor == document.querySelector("#bg").value){
        selectedColor = afterErase;
    }
});

document.querySelector('.colorInput').addEventListener('click', () => {
    rainbowEffect("OFF");
});

bgColorPicker.addEventListener('input', () => {
    boxes.forEach(box => {
        box.style.backgroundColor = document.querySelector('#bg').value;
        gridColor();
    });
});

function gridColor(){
    boxes.forEach(box => {
        // Convert hex to RGB
        let hex = document.querySelector('#bg').value.replace(/^#/, '');
        let rgb = parseInt(hex, 16);
        let r = (rgb >> 16) & 0xff;
        let g = (rgb >> 8) & 0xff;
        let b = (rgb >> 0) & 0xff;
    
        // Calculate luminance
        let luminance = 0.299 * r + 0.587 * g + 0.114 * b;
    
        if(luminance < 120){
            box.style.border = "solid 1px white";
        }
        else{
            console.log("pp");
        }
    });
}

let black = document.querySelector('.black');
black.addEventListener('click', () => {
    rainbowEffect("OFF");
    selectedColor = "#000000";
    document.querySelector("#pen").value = "#000000"

});

let rainbow = document.querySelector('.rainbow');
rainbow.addEventListener('click', () => {
    rainbowEffect("ON");
});

let RainbowInterval = "";
function rainbowEffect(rainbowStatus){
    if(rainbowStatus == "ON"){
        selectedColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        RainbowInterval = setInterval(() => {
            selectedColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
            document.querySelector("#pen").value = selectedColor;
        }, 100)
    }
    else if(rainbowStatus == "OFF"){
        clearInterval(RainbowInterval);
    }
}


let eraser = document.querySelector('.eraser');
eraser.addEventListener('click', () => {
    rainbowEffect("OFF");
    selectedColor = document.querySelector('#bg').value;;
    afterErase = document.querySelector("#pen").value;
});

let mouseDown = false;
mainContainer.addEventListener('mouseleave', () => {
    mouseDown = false;
});

let clearBtn = document.querySelector('.clear');
clearBtn.addEventListener('click', () => {
    boxes.forEach(box => {
        box.style.backgroundColor = document.querySelector('#bg').value;
    });
});


let gridToggle = document.querySelector('.gridToggle');
gridToggle.addEventListener('click', grid);

function grid(){
    if(gridStatus == "ON"){
        boxes.forEach(box => {
            box.style.border = "none";
            gridStatus = "OFF"
            gridToggle.innerHTML = `Grid: ${gridStatus}`;
        });
    }
    else{
        boxes.forEach(box => {
            box.style.border = "solid 1px black";
            gridStatus = "ON";
            gridToggle.innerHTML = `Grid: ${gridStatus}`;
        });
    }
}

let colorBtns = document.querySelectorAll('.colorBtn');
colorBtns.forEach(colorBtn => {
    colorBtn.addEventListener('click', () => {
        removeShadow();
        colorBtn.style.boxShadow = "0 0 10px white";
    })
});

function removeShadow(){
    colorBtns.forEach(colorBtn => {
        colorBtn.style.boxShadow = "none";
    });
}

let settingsBtns = document.querySelectorAll('.settingsBtn');
settingsBtns.forEach(settingsBtn => {
    settingsBtn.addEventListener('click', () => {
        settingsBtn.style.animation = "btnEffect 0.4s";
        setTimeout(() => {
            settingsBtn.style.animation = "";
        }, 400)
    });
});