// Get DOM elements
const inputElements = document.querySelectorAll(".card__input");
const calculateButton = document.querySelector(".card__button");
const result = document.querySelector(".card__resultValue");
const errorMessages = document.querySelector(".card__error-messages");

// Focus first input on page load
onload = inputElements[0].focus();

// Array of days in each month (non-leap year)
const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// Check if year is leap year
const isLeapYear = (year) => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

// Validate day input based on month and leap year
const isValidDay = (day, month, year) => {
  if (!day || !month || !year) return false;

  let maxDays = monthDays[month - 1];
  if (month === 2 && isLeapYear(year)) {
    maxDays = 29;
  }

  return day > 0 && day <= maxDays;
};

// Validate month input
const isValidMonth = (month) => {
  return month && month > 0 && month <= 12;
};

// Validate year input
const isValidYear = (year) => {
  const currentYear = new Date().getFullYear();
  return year && year > 0 && year <= currentYear;
};

// Validate all inputs and show appropriate error messages
const validateInputs = () => {
  const day = parseInt(
    document.querySelector(".card__input[name='day']").value
  );
  const month = parseInt(
    document.querySelector(".card__input[name='month']").value
  );
  const year = parseInt(
    document.querySelector(".card__input[name='year']").value
  );

  const isValid = [false, false, false];

  // Validate month first
  if (!isValidMonth(month)) {
    inputElements[1].classList.add("card__input--error");
    // If month is invalid, don't validate day
    inputElements[0].classList.remove("card__input--error");
    isValid[0] = true;
  } else {
    inputElements[1].classList.remove("card__input--error");
    isValid[1] = true;

    // Only validate day if month is valid
    if (!isValidDay(day, month, year)) {
      inputElements[0].classList.add("card__input--error");
    } else {
      inputElements[0].classList.remove("card__input--error");
      isValid[0] = true;
    }
  }

  if (!isValidYear(year)) {
    inputElements[2].classList.add("card__input--error");
  } else {
    inputElements[2].classList.remove("card__input--error");
    isValid[2] = true;
  }

  return isValid.every((valid) => valid);
};

// Calculate age with improved accuracy
const calculateAge = (year, month, day) => {
  const today = new Date();
  const birthDate = new Date(year, month - 1, day);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

// Display calculated age with animation
const displayAge = () => {
  if (!validateInputs()) return;

  const year = parseInt(
    document.querySelector(".card__input[name='year']").value
  );
  const month = parseInt(
    document.querySelector(".card__input[name='month']").value
  );
  const day = parseInt(
    document.querySelector(".card__input[name='day']").value
  );

  const age = calculateAge(year, month, day);

  // Add animation
  result.style.opacity = 0;
  setTimeout(() => {
    result.textContent = age;
    result.style.opacity = 1;
  }, 200);
};

// Event listeners
inputElements.forEach((input) => {
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      displayAge();
    }
  });

  // Clear error styling on input
  input.addEventListener("input", () => {
    input.classList.remove("card__input--error");
  });

  // Add input validation for negative numbers
  input.addEventListener("input", (e) => {
    if (e.target.value < 0) {
      e.target.value = Math.abs(e.target.value);
    }
  });
});

calculateButton.addEventListener("click", displayAge);

// Add keyboard navigation between inputs
inputElements.forEach((input, index) => {
  input.addEventListener("keyup", (e) => {
    // Move to next input when current input is filled
    if (
      input.value.length >= input.maxLength &&
      index < inputElements.length - 1
    ) {
      inputElements[index + 1].focus();
    }

    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && input.value.length === 0 && index > 0) {
      inputElements[index - 1].focus();
    }
  });
});
