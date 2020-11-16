
const container = document.querySelector("#container");
const reset = document.querySelector("#slider");
const colorPicker = document.querySelector("#colorPicker");

const customColor = document.createElement('input');
customColor.type = "color";
customColor.value = "#636363";
let colorChoice = customColor.value;

colorPicker.addEventListener('change', function() {
    colorChoice = customColor.value;
    if (colorPicker.value === "custom") {
        document.querySelector("#buttons").appendChild(customColor);
    } else {
        document.querySelector("#buttons").removeChild(customColor);
    }
})


function createGrid(gridSize) {
    let gridArea = Math.pow(gridSize, 2);
    for (let i = 0; i < gridArea; i++) {
        let pixel = document.createElement('div');
        pixel.style.backgroundColor = "hsla(0, 100%, 0%, 0)";
        container.appendChild(pixel);
    }
    container.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
    let gridTotal = container.querySelectorAll('div');
    gridTotal.forEach(gridTotal => gridTotal.addEventListener('mouseover', colorChange));
}

let opacity = 0;
function colorChange() {
    let x = colorPicker.value;
    if (this.style.backgroundColor.match(/rgba/)) {
        opacity = this.style.backgroundColor.slice(-4, -1);
        console.log(opacity);
        if(opacity === ', 0') {
            opacity = 0;
        } else {
            opacity = Number(opacity);
        }
    } else opacity = 1;

    if (x === "black") this.style.backgroundColor = "hsla(0, 100%, 0%, 1.0)";
    if (x === "blueScale") {
        if (opacity <= 0.9) {
            let e = opacity + .1;
            this.style.backgroundColor = `rgba(0, 68, 204, ${e})`;
        }
    }
    if (x === "greenScale") {
        if (opacity <= 0.9) {
            let e = opacity + .1;
            this.style.backgroundColor = `rgba(0, 255, 0, ${e})`;
        }
    }
    if (x === "redScale") {
        if (opacity <= 0.9) {
            let e = opacity + .1;
            this.style.backgroundColor = `rgba(255, 0, 0, ${e})`;
        }
    }
    if (x === "greyScale") {
        if (opacity <= 0.9) {
            let e = opacity + .1;
            this.style.backgroundColor = `rgba(0, 0, 0, ${e})`;
        }
    }
    if (x === "custom") {
        this.style.backgroundColor = customColor.value;
    }
}




function resetGrid() {
    let gridTotal = container.querySelectorAll('div');
    gridTotal.forEach(gridTotal => container.removeChild(gridTotal));
    let newSize = reset.value;
    document.querySelector("#gridSize").textContent = `${newSize}`;
    createGrid(newSize);
}

reset.addEventListener('change', resetGrid);
createGrid(16);