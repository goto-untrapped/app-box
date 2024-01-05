// for calclation
var CalcMode;
(function (CalcMode) {
    CalcMode[CalcMode["initialized"] = 0] = "initialized";
    CalcMode[CalcMode["add"] = 1] = "add";
    CalcMode[CalcMode["subtract"] = 2] = "subtract";
    CalcMode[CalcMode["multiply"] = 3] = "multiply";
    CalcMode[CalcMode["divide"] = 4] = "divide";
    CalcMode[CalcMode["equaled"] = 5] = "equaled";
})(CalcMode || (CalcMode = {}));
var calcMode = CalcMode.initialized;
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
var DisplayMode;
(function (DisplayMode) {
    DisplayMode[DisplayMode["displayNumber"] = 0] = "displayNumber";
    DisplayMode[DisplayMode["notDisplayNumber"] = 1] = "notDisplayNumber";
})(DisplayMode || (DisplayMode = {}));
var displayMode = DisplayMode.notDisplayNumber;
function displayModeIsDisplayNumber() {
    displayMode = DisplayMode.displayNumber;
}
function displayModeIsNotDisplayNumber() {
    displayMode = DisplayMode.notDisplayNumber;
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
        if (displayMode != DisplayMode.displayNumber) {
            clearDisplay();
        }
        displayModeIsDisplayNumber();
        var inputNumber = target.textContent;
        removeTopZero();
        var canUpdateNumber = canUpdate(inputNumber);
        if (canUpdateNumber) {
            displayContinuousNumber(inputNumber);
        }
    });
});
var MAX_DISPLAY_LENGTH = 8;
// number length can display <= 8
function canUpdate(inputNumber) {
    var display = numberDisplay();
    if (MAX_DISPLAY_LENGTH < (display.value + inputNumber).length) {
        return false;
    }
    return true;
}
// +
document.getElementById("add").addEventListener("click", function () {
    // calc by current situation
    calcByCalcMode(calcMode);
    // update situation
    var display = numberDisplay();
    updateFormerNumber(display.value);
    // update status
    calcModeIsAdd();
    displayModeIsNotDisplayNumber();
});
// -
document.getElementById("subtract").addEventListener("click", function () {
    // calc by current situation
    calcByCalcMode(calcMode);
    // update situation
    var display = numberDisplay();
    updateFormerNumber(display.value);
    // update status
    calcModeIsSubtract();
    displayModeIsNotDisplayNumber();
});
// ×
document.getElementById("multiply").addEventListener("click", function () {
    // calc by current situation
    calcByCalcMode(calcMode);
    // update situation
    var display = numberDisplay();
    updateFormerNumber(display.value);
    // update status
    calcModeIsMultiply();
    displayModeIsNotDisplayNumber();
});
// ÷
document.getElementById("divide").addEventListener("click", function () {
    // calc by current situation
    calcByCalcMode(calcMode);
    // update situation
    var display = numberDisplay();
    updateFormerNumber(display.value);
    // update status
    calcModeIsDivide();
    displayModeIsNotDisplayNumber();
});
// =
document.getElementById("equal").addEventListener("click", function () {
    // calc by current situation
    calcByCalcMode(calcMode);
    // update status
    calcModeIsEqualed();
    displayModeIsNotDisplayNumber();
});
function calcByCalcMode(calcMode) {
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
document.getElementById("clear").addEventListener("click", function () {
    // if click operation button in last, continue to show last number
    if (displayMode == DisplayMode.displayNumber) {
        clearDisplay();
    }
});
// AC (all clear)
document.getElementById("all-clear").addEventListener("click", function () {
    updateFormerNumber("0");
    clearDisplay();
    displayNumber("0");
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
    // display ERR or calced number
    var display = numberDisplay();
    if (MAX_DISPLAY_LENGTH < inputNumber.length) {
        display.value = "ERR";
        return;
    }
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
