// for calclation
enum Operations {
  initialized,
  add,
  subtract,
  multiply,
  divide,
  equaled,
}
let calcMode: Operations = Operations.initialized;
function calcModeIsInitialized() {
  calcMode = Operations.initialized;
}
function calcModeIsAdd() {
  calcMode = Operations.add;
}
function calcModeIsSubtract() {
  calcMode = Operations.subtract;
}
function calcModeIsMultiply() {
  calcMode = Operations.multiply;
}
function calcModeIsDivide() {
  calcMode = Operations.divide;
}
function calcModeIsEqualed() {
  calcMode = Operations.equaled;
}

// record former display number
let formerNumber: number = 0;
function updateFormerNumber(inputNumber: String) {
  formerNumber = Number(inputNumber);
}

// set number to display
document.querySelectorAll(".input-number").forEach((button) => {
  button.addEventListener("click", (event) => {
    const target = event.currentTarget! as HTMLElement;
    if (calcMode != Operations.initialized) {
      clearDisplay();
    }
    const inputNumber: string = target.textContent!;
    removeTopZero();
    displayContinuousNumber(inputNumber)
  })
})

// +
document.getElementById("add")!.addEventListener("click", function () {
  const display = numberDisplay();
  updateFormerNumber(display.value);

  calcModeIsAdd();
});

// -
document.getElementById("subtract")!.addEventListener("click", function () {
  const display = numberDisplay();
  updateFormerNumber(display.value);

  calcModeIsSubtract();
});

// ×
document.getElementById("multiply")!.addEventListener("click", function () {
  const display = numberDisplay();
  updateFormerNumber(display.value);

  calcModeIsMultiply();
});

// ÷
document.getElementById("divide")!.addEventListener("click", function () {
  const display = numberDisplay();
  updateFormerNumber(display.value);

  calcModeIsDivide();
});

// =
document.getElementById("equal")!.addEventListener("click", function () {
  switch (calcMode) {
    case Operations.add: {
      displayAddedNumber();
      break;
    }
    case Operations.subtract: {
      displaySubtractedNumber();
      break;
    }
    case Operations.multiply: {
      displayMultipliedNumber();
      break;
    }
    case Operations.divide: {
      displayDividedNumber();
      break;
    }
  }

  calcModeIsEqualed();
});

// C (clear)
document.getElementById("clear")!.addEventListener("click", function () {
  clearDisplay();
});

// calculation
// A + B
function displayAddedNumber() {
  const display = numberDisplay();
  const calcedNumber: number = formerNumber + Number(display.value);
  const calcedNumberStr = calcedNumber.toString();
  displayNumber(calcedNumberStr);
}

// A - B
function displaySubtractedNumber() {
  const display = numberDisplay();
  const calcedNumber: number = formerNumber - Number(display.value);
  const calcedNumberStr = calcedNumber.toString();
  displayNumber(calcedNumberStr);
}

// A × B
function displayMultipliedNumber() {
  const display = numberDisplay();
  const calcedNumber: number = formerNumber * Number(display.value);
  const calcedNumberStr = calcedNumber.toString();
  displayNumber(calcedNumberStr);
}

// A ÷ B
function displayDividedNumber() {
  const display = numberDisplay();
  const inputNumber = Number(display.value);
  if (inputNumber == 0) {
    return;
  }
  const calcedNumber: number = formerNumber / Number(display.value);
  const calcedNumberStr = calcedNumber.toString();
  displayNumber(calcedNumberStr);
}

function displayNumber(inputNumber: string) {
  let display = numberDisplay();
  display.value = inputNumber;
}

function displayContinuousNumber(inputNumber: string) {
  let display = numberDisplay();
  display.value += inputNumber;
}

function clearDisplay() {
  let display = numberDisplay();
  display.value = "";
}

function numberDisplay() {
  return document.getElementById("displayed") as HTMLInputElement;
}

// format display number: "02" => "2"
function removeTopZero() {
  const target = document.getElementById("displayed") as HTMLInputElement;
  const regex = /^0+/;
  const isValid = regex.test(target.value);
  if (isValid) {
    const replaced = target.value.replace(/^0+/, "");
    target.value = replaced;
  }
}