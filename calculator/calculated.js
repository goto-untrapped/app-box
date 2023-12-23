

document.querySelectorAll(".input-number").forEach((button) => {
  button.addEventListener("click", (event) => {
    const inputNumber = event.target.textContent;
    displayNumber(inputNumber)
  })
})

function displayNumber(inputNumber) {
  const currentResult = document.querySelector('span[name="result"]');
  currentResult.textContent = inputNumber;
  alert("clicked!");
}

