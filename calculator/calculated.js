// for calclation
var Operations;
(function (Operations) {
    Operations[Operations["initialized"] = 0] = "initialized";
    Operations[Operations["add"] = 1] = "add";
    Operations[Operations["subtract"] = 2] = "subtract";
    Operations[Operations["multiply"] = 3] = "multiply";
    Operations[Operations["divide"] = 4] = "divide";
    Operations[Operations["equaled"] = 5] = "equaled";
})(Operations || (Operations = {}));
var calcMode = Operations.initialized;
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
var formerNumber = 0;
function updateFormerNumber(inputNumber) {
    formerNumber = Number(inputNumber);
}
// set number to display
document.querySelectorAll(".input-number").forEach(function (button) {
    button.addEventListener("click", function (event) {
        var target = event.currentTarget;
        if (calcMode != Operations.initialized) {
            clearDisplay();
        }
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
