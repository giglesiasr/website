var counterVal = 0;
/* var sube = true; */

function ascensorClick() {
  if (counterVal != 100) {
    updateDisplay(++counterVal);
  }
}

function descensorClick() {
  if (counterVal != 100) {
    updateDisplay(--counterVal);
  }
}

function updateDisplay(val) {
  document.getElementById("counter-label").innerHTML = val;
  if (counterVal >= 20) {
    document.getElementById("counter-label").style.backgroundColor = "green";
  } else if (counterVal <= 0) {
    document.getElementById("counter-label").style.backgroundColor = "red";
  } else {
    document.getElementById("counter-label").style.backgroundColor = "white";
  }
}
