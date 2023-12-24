// for calclation
var CalcMode;
(function (CalcMode) {
    CalcMode[CalcMode["initialized"] = 0] = "initialized";
    CalcMode[CalcMode["displayNumber"] = 1] = "displayNumber";
    CalcMode[CalcMode["add"] = 2] = "add";
    CalcMode[CalcMode["subtract"] = 3] = "subtract";
    CalcMode[CalcMode["multiply"] = 4] = "multiply";
    CalcMode[CalcMode["divide"] = 5] = "divide";
    CalcMode[CalcMode["equaled"] = 6] = "equaled";
})(CalcMode || (CalcMode = {}));
var calcMode = CalcMode.initialized;
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
var formerNumber = 0;
function updateFormerNumber(inputNumber) {
    formerNumber = Number(inputNumber);
}
// set number to display
document.querySelectorAll(".input-number").forEach(function (button) {
    button.addEventListener("click", function (event) {
        var target = event.currentTarget;
        if (calcMode != CalcMode.displayNumber) {
            clearDisplay();
        }
        calcModeIsDisplayNumber();
        var inputNumber = target.textContent;
        removeTopZero();
        displayContinuousNumber(inputNumber);
    });
});
// +
document.getElementById("add").addEventListener("click", function () {
    var display = numberDisplay();
    updateFormerNumber(display.value);
    calcModeIsAdd();
});
// -
document.getElementById("subtract").addEventListener("click", function () {
    var display = numberDisplay();
    updateFormerNumber(display.value);
    calcModeIsSubtract();
});
// ×
document.getElementById("multiply").addEventListener("click", function () {
    var display = numberDisplay();
    updateFormerNumber(display.value);
    calcModeIsMultiply();
});
// ÷
document.getElementById("divide").addEventListener("click", function () {
    var display = numberDisplay();
    updateFormerNumber(display.value);
    calcModeIsDivide();
});
// =
document.getElementById("equal").addEventListener("click", function () {
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
document.getElementById("clear").addEventListener("click", function () {
    clearDisplay();
});
// calculation
// A + B
function displayAddedNumber() {
    var display = numberDisplay();
    var calcedNumber = formerNumber + Number(display.value);
    var calcedNumberStr = calcedNumber.toString();
    displayNumber(calcedNumberStr);
}
// A - B
function displaySubtractedNumber() {
    var display = numberDisplay();
    var calcedNumber = formerNumber - Number(display.value);
    var calcedNumberStr = calcedNumber.toString();
    displayNumber(calcedNumberStr);
}
// A × B
function displayMultipliedNumber() {
    var display = numberDisplay();
    var calcedNumber = formerNumber * Number(display.value);
    var calcedNumberStr = calcedNumber.toString();
    displayNumber(calcedNumberStr);
}
// A ÷ B
function displayDividedNumber() {
    var display = numberDisplay();
    var inputNumber = Number(display.value);
    if (inputNumber == 0) {
        return;
    }
    var calcedNumber = formerNumber / Number(display.value);
    var calcedNumberStr = calcedNumber.toString();
    displayNumber(calcedNumberStr);
}
function displayNumber(inputNumber) {
    var display = numberDisplay();
    display.value = inputNumber;
}
function displayContinuousNumber(inputNumber) {
    var display = numberDisplay();
    display.value += inputNumber;
}
function clearDisplay() {
    var display = numberDisplay();
    display.value = "";
}
function numberDisplay() {
    return document.getElementById("displayed");
}
// format display number: "02" => "2"
function removeTopZero() {
    var target = document.getElementById("displayed");
    var regex = /^0+/;
    var isValid = regex.test(target.value);
    if (isValid) {
        var replaced = target.value.replace(/^0+/, "");
        target.value = replaced;
    }
}
