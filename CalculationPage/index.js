const bmiForm = document.getElementById("bmi-form");
const heightInput = document.getElementById("height");
const weightInput = document.getElementById("weight");
const resultSection = document.getElementById("result");
const bmiValue = document.getElementById("bmi-value");
const bmiCategory = document.getElementById("bmi-category");
const resultMessage = document.getElementById("result-message");
const formError = document.getElementById("form-error");

function showFieldError(input, message) {
  const error = document.getElementById(`${input.id}-error`);
  error.textContent = message;
  input.setAttribute("aria-invalid", message ? "true" : "false");
}

function clearResults() {
  resultSection.hidden = true;
  bmiValue.textContent = "";
  bmiCategory.textContent = "";
  resultMessage.textContent = "";
  formError.textContent = "";
}

bmiForm.addEventListener("submit", (event) => {
  event.preventDefault();
  clearResults();

  const height = Number(heightInput.value);
  const weight = Number(weightInput.value);
  let isValid = true;

  if (heightInput.value.trim() === "" || !Number.isFinite(height) || height <= 0) {
    showFieldError(heightInput, "Enter a height greater than zero.");
    isValid = false;
  } else {
    showFieldError(heightInput, "");
  }

  if (weightInput.value.trim() === "" || !Number.isFinite(weight) || weight <= 0) {
    showFieldError(weightInput, "Enter a weight greater than zero.");
    isValid = false;
  } else {
    showFieldError(weightInput, "");
  }

  if (!isValid) {
    formError.textContent = "Please correct the highlighted fields.";
    return;
  }

  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  let category;
  let message;

  if (bmi < 18.5) {
    category = "Underweight";
    message = "Your BMI is below the typical healthy range.";
  } else if (bmi < 25) {
    category = "Normal Weight";
    message = "Your BMI is within the typical healthy range.";
  } else if (bmi < 30) {
    category = "Overweight";
    message = "Your BMI is above the typical healthy range.";
  } else {
    category = "Obesity";
    message = "Your BMI is in the obesity range.";
  }

  bmiValue.textContent = bmi.toFixed(2);
  bmiCategory.textContent = category;
  resultMessage.textContent = message;
  resultSection.hidden = false;
});

bmiForm.addEventListener("reset", () => {
  clearResults();
  showFieldError(heightInput, "");
  showFieldError(weightInput, "");
});

heightInput.addEventListener("input", () => showFieldError(heightInput, ""));
weightInput.addEventListener("input", () => showFieldError(weightInput, ""));