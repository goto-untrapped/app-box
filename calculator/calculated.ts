// for calclation
enum CalcMode {
  initialized,
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

enum DisplayMode {
  displayNumber,
  notDisplayNumber,
}
let displayMode: DisplayMode = DisplayMode.notDisplayNumber;
function displayModeIsDisplayNumber() {
  displayMode = DisplayMode.displayNumber;
}
function displayModeIsNotDisplayNumber() {
  displayMode = DisplayMode.notDisplayNumber;
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
    if (displayMode != DisplayMode.displayNumber) {
      clearDisplay();
    }
    displayModeIsDisplayNumber();

    const inputNumber: string = target.textContent!;
    removeTopZero();
    const canUpdateNumber = canUpdate(inputNumber);
    if (canUpdateNumber) {
      displayContinuousInput(inputNumber)
    }
  })
})

// set decimal point to display
document.querySelectorAll("#point").forEach((button) => {
  button.addEventListener("click", (event) => {
    const target = event.currentTarget! as HTMLElement;
    const point: string = target.textContent!;
    const canAddDecimalPoint = canAddPoint();
    if (canAddDecimalPoint) {
      displayContinuousInput(point);
    }
  })
})

// set sign to display
document.querySelectorAll("#sign").forEach((button) => {
  button.addEventListener("click", (event) => {
    const display = numberDisplay();
    let number: number = Number(display.value) * -1;
    clearDisplay();
    displayContinuousInput(String(number));
  })
})

function canAddPoint() {
  const target = document.getElementById("displayed") as HTMLInputElement;
  if (target.value == "") {
    return false;
  }
  if (/\\*\.{1,}\\*/.test(target.value)) {
    return false;
  }

  return true;
}

const MAX_DISPLAY_LENGTH = 8
// number length can display <= 8
function canUpdate(inputNumber: string) {
  const display = numberDisplay();

  if (MAX_DISPLAY_LENGTH < (display.value + inputNumber).length) {
    return false
  }
  return true;
}

// +
document.getElementById("add")!.addEventListener("click", function () {
  // calc by current situation
  calcByCalcMode(calcMode);

  // update situation
  const display = numberDisplay();
  updateFormerNumber(display.value);

  // update status
  calcModeIsAdd();
  displayModeIsNotDisplayNumber();
});

// -
document.getElementById("subtract")!.addEventListener("click", function () {
  // calc by current situation
  calcByCalcMode(calcMode);

  // update situation
  const display = numberDisplay();
  updateFormerNumber(display.value);

  // update status
  calcModeIsSubtract();
  displayModeIsNotDisplayNumber();
});

// ×
document.getElementById("multiply")!.addEventListener("click", function () {
  // calc by current situation
  calcByCalcMode(calcMode);

  // update situation
  const display = numberDisplay();
  updateFormerNumber(display.value);

  // update status
  calcModeIsMultiply();
  displayModeIsNotDisplayNumber();
});

// ÷
document.getElementById("divide")!.addEventListener("click", function () {
  // calc by current situation
  calcByCalcMode(calcMode);

  // update situation
  const display = numberDisplay();
  updateFormerNumber(display.value);

  // update status
  calcModeIsDivide();
  displayModeIsNotDisplayNumber();
});

// =
document.getElementById("equal")!.addEventListener("click", function () {
  // calc by current situation
  calcByCalcMode(calcMode);

  // update status
  calcModeIsEqualed();
  displayModeIsDisplayNumber();
});

function calcByCalcMode(calcMode: CalcMode) {
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
}

// C (clear)
document.getElementById("clear")!.addEventListener("click", function () {
  // if click operation button in last, continue to show last number
  if (displayMode == DisplayMode.displayNumber) {
    clearDisplay();
  }
});

// AC (all clear)
document.getElementById("all-clear")!.addEventListener("click", function () {
  updateFormerNumber("0");
  clearDisplay();
  displayNumber("0");
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
  // display ERR or calced number
  let display = numberDisplay();
  if (MAX_DISPLAY_LENGTH < inputNumber.length) {
    display.value = "ERR";
    return;
  }
  display.value = inputNumber;
}

function displayContinuousInput(input: string) {
  let display = numberDisplay();
  display.value += input;
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
  const regex = /^0+(?!.)/;
  const isInvalid = regex.test(target.value);
  if (isInvalid) {
    const replaced = target.value.replace(/^0+/, "");
    target.value = replaced;
  }
}
