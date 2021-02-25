import './slider.scss'

let sliderRange = document.getElementById('sliderRange'); //место на бегунке
let outputRange = document.getElementById('demo'); // значение бегунка
outputRange.innerHTML = sliderRange.value 

sliderRange.oninput = function() {
  outputRange.innerHTML = this.value
}