const passBox = document.getElementById("passBox");
const passIndiccator = document.getElementById("passIndiccator");
const sliderValue = document.getElementById("sliderValue");
const inputSlider = document.getElementById("inputSlider");
const lowercase = document.getElementById("lowercase");
const numbers = document.getElementById("numbers");
const uppercase = document.getElementById("uppercase");
const symbols = document.getElementById("symbols");
const generateBtn = document.getElementById("genBtn");
const copyBtn = document.getElementById("copyIcon");
const historyList = document.getElementById("historyList");
const themeSwitch = document.getElementById("themeSwitch");

const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbersList = "0123456789";
const symbolsList = "!@#$%^&*()_+-=[]{}\\|;':\",./<>?";

// Load preferences from localStorage
window.addEventListener('DOMContentLoaded', () => {
    const savedLength = localStorage.getItem('passwordLength');
    const savedOptions = JSON.parse(localStorage.getItem('passwordOptions'));

    if (savedLength) inputSlider.value = savedLength;
    if (savedOptions) {
        lowercase.checked = savedOptions.lowercase;
        uppercase.checked = savedOptions.uppercase;
        numbers.checked = savedOptions.numbers;
        symbols.checked = savedOptions.symbols;
    }

    sliderValue.textContent = inputSlider.value;
    generatePassword();
});

sliderValue.textContent = inputSlider.value;
inputSlider.addEventListener("input", () => {
    sliderValue.textContent = inputSlider.value;
    generatePassword();
});

const generatePassword = () => {
    const length = inputSlider.value;
    let charac = "";
    let password = "";

    charac += lowercase.checked ? lowercaseLetters : "";
    charac += uppercase.checked ? uppercaseLetters : "";
    charac += numbers.checked ? numbersList : "";
    charac += symbols.checked ? symbolsList : "";

    if (!charac) {
        alert("Veuillez sélectionner au moins une option pour générer un mot de passe.");
        return;
    }

    for (let i = 0; i < length; i++) {
        password += charac.charAt(Math.floor(Math.random() * charac.length));
    }

    passBox.value = password;
    updatePasswordIndicator();
    addPasswordToHistory(password);
};

generateBtn.addEventListener("click", () => {
    localStorage.setItem('passwordLength', inputSlider.value);
    localStorage.setItem('passwordOptions', JSON.stringify({
        lowercase: lowercase.checked,
        uppercase: uppercase.checked,
        numbers: numbers.checked,
        symbols: symbols.checked
    }));
    generatePassword();
});

const updatePasswordIndicator = () => {
    const passwordStrength = getPasswordStrength(passBox.value);
    passIndiccator.className = "pass-indicator " + passwordStrength;
};

const getPasswordStrength = (password) => {
    if (password.length <= 10) {
        return "weak";
    } else if (password.length <= 20) {
        return "medium";
    } else {
        return "strong";
    }
};

const addPasswordToHistory = (password) => {
    const listItem = document.createElement("li");
    listItem.textContent = password;
    historyList.prepend(listItem);
};

copyBtn.addEventListener("click", () => {
    if (passBox.value.trim().length > 0) {
        navigator.clipboard.writeText(passBox.value);
        copyBtn.innerHTML = "done_all";
        copyBtn.style.color = "#4caf50";

        setTimeout(() => {
            copyBtn.innerHTML = "content_copy";
            copyBtn.style.color = "#333";
        }, 2000);
    }
});

// Theme toggle
const setTheme = (isDark) => {
    document.body.classList.toggle('dark-theme', isDark);
    localStorage.setItem('darkTheme', isDark);
};

themeSwitch.addEventListener('change', () => {
    setTheme(themeSwitch.checked);
});

window.addEventListener('DOMContentLoaded', () => {
    const isDarkTheme = JSON.parse(localStorage.getItem('darkTheme'));
    setTheme(isDarkTheme);
    themeSwitch.checked = isDarkTheme;
});