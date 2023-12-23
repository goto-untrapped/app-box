// for calclation
enum Operations {
  initialized = '',
  plus = '+',
}
let calcMode: Operations = Operations.initialized;
function calcModeIsInitialized() {
  calcMode = Operations.initialized;
}
function calcModeIsPlus() {
  calcMode = Operations.plus;
}

// record former display number
let formerNumber: number = 0;

// set number to display
document.querySelectorAll(".input-number").forEach((button) => {
  button.addEventListener("click", (event) => {
    const target = event.currentTarget! as HTMLElement;
    if (calcMode != Operations.initialized) {
      clearDisplay();
    }
    const inputNumber: string = target.textContent!;
    displayAddedNumber(inputNumber)
  })
})

// plus
document.getElementById("plus")!.addEventListener("click", function () {
  const display = numberDisplay();
  formerNumber = Number(display.textContent);

  calcModeIsPlus();
});

// equal
document.getElementById("equal")!.addEventListener("click", function () {
  if (calcMode = Operations.plus) {
    displayPlusedNumber()
  }

  calcModeIsInitialized();
});

function displayPlusedNumber() {
  const display = numberDisplay();
  const calcedNumber: number = formerNumber + Number(display.textContent);
  const calcedNumberStr = calcedNumber.toString();
  displayNumber(calcedNumberStr);
}

function displayNumber(inputNumber: string) {
  const display = numberDisplay();
  display.textContent = inputNumber;
}

function displayAddedNumber(inputNumber: string) {
  const display = numberDisplay();
  display.textContent += inputNumber;
}

function clearDisplay() {
  const display = numberDisplay();
  display.textContent = "";
}

function numberDisplay() {
  return document.querySelector('span[name="displayed"]') as HTMLElement;
}
