document.getElementById('slider-left').onclick = sliderLeft;
let left = 0;
document.getElementById('slider-right').onclick = sliderRight;
function sliderRight() {
    const polosa = document.getElementById('polosa');
    left += 300;
    if (left > 600) {
        left = 0;
    }
    polosa.style.left = `${left}px`;
}

function sliderLeft() {
    const polosa = document.getElementById('polosa');
    left -= 300;
    if (left < -600) {
        left = 0;
    }
    polosa.style.left = `${left}px`;
}

export {
    sliderLeft,
    sliderRight
};
