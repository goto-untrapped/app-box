// for calclation
enum CalcMode {
  initialized,
  displayNumber,
  add,
  subtract,
  multiply,
  divide,
  equaled,
}
let calcMode: CalcMode = CalcMode.initialized;
function calcModeIsInitialized() {
  calcMode = CalcMode.initialized;
}
function calcModeIsDisplayNumber() {
  calcMode = CalcMode.displayNumber;
}
function calcModeIsAdd() {
  calcMode = CalcMode.add;
}
function calcModeIsSubtract() {
  calcMode = CalcMode.subtract;
}
function calcModeIsMultiply() {
  calcMode = CalcMode.multiply;
}
function calcModeIsDivide() {
  calcMode = CalcMode.divide;
}
function calcModeIsEqualed() {
  calcMode = CalcMode.equaled;
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
    if (calcMode != CalcMode.displayNumber) {
      clearDisplay();
    }
    calcModeIsDisplayNumber();

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
    case CalcMode.add: {
      displayAddedNumber();
      break;
    }
    case CalcMode.subtract: {
      displaySubtractedNumber();
      break;
    }
    case CalcMode.multiply: {
      displayMultipliedNumber();
      break;
    }
    case CalcMode.divide: {
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