const inputElements = document.querySelectorAll('.card__input');
const submitButton = document.querySelector('.card__button');

// Function to check if a year is a leap year
const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
};

// Function to validate the day input based on month and year
const validateDay = (day, month, year) => {
    if (!day || day <= 0) return false;

    const monthDays = [31, (isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return day <= monthDays[month - 1];
};

// Function to validate the month input
const validateMonth = (month) => {
    return month && month > 0 && month <= 12;
};

// Function to validate the year input
const validateYear = (year) => {
    const currentYear = new Date().getFullYear();
    return year && year > 0 && year <= currentYear;
};

// Function to check if the date is valid
const isValidDate = (day, month, year) => {
    let isValid = [true, true, true];

    if (!validateDay(day.value, month.value, year.value)) {
        day.classList.add('card__input--error');
        isValid[0] = false;
    } else {
        day.classList.remove('card__input--error');
    }
    
    if (!validateMonth(month.value)) {
        month.classList.add('card__input--error');
        isValid[1] = false;
    } else {
        month.classList.remove('card__input--error');
    }

    if (!validateYear(year.value)) {
        year.classList.add('card__input--error');
        isValid[2] = false;
    } else {
        year.classList.remove('card__input--error');
    }

    return isValid.every(item => item === true);
};

// Function to calculate the age based on the input date
const calculateAge = (year, month, day) => {
    const today = new Date();
    const birthDate = new Date(year, month - 1, day);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};

// Function to handle the click event on the submit button
const onClickHandler = () => {
    const dayInput = document.querySelector('.card__input[name="day"]');
    const monthInput = document.querySelector('.card__input[name="month"]');
    const yearInput = document.querySelector('.card__input[name="year"]');
    const resultElement = document.querySelector('.card__resultValue');

    if (!isValidDate(dayInput, monthInput, yearInput)) {
        resultElement.textContent = '--';
        return;
    }

    const age = calculateAge(yearInput.value, monthInput.value, dayInput.value);
    resultElement.textContent = age;
};

// Add event listener for the submit button
submitButton.addEventListener('click', onClickHandler);

// Enhance accessibility and UX by allowing 'Enter' key to submit the form
inputElements.forEach(item => {
    item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            onClickHandler();
        }
    });
});
