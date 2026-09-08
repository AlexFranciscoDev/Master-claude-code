// ============ Lorem Ipsum ============
const loremParagraphs = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.",
    "Consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.",
    "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa.",
    "Qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio commodi consequatur, quia nihil impedit.",
    "Quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint.",
    "Et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Sed ut perspiciatis unde omnis iste natus error sit.",
    "Voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit."
];

const generateBtn = document.getElementById('generateBtn');
const copyLoremBtn = document.getElementById('copyLoremBtn');
const loremOutput = document.getElementById('loremOutput');
const paragraphsSelect = document.getElementById('paragraphs');
const loremCounter = document.getElementById('loremCounter');

function updateCharCounter() {
    const charCount = loremOutput.value.length;
    loremCounter.textContent = charCount.toLocaleString() + ' carácteres';
}

generateBtn.addEventListener('click', () => {
    const numParagraphs = parseInt(paragraphsSelect.value);
    const generatedText = loremParagraphs
        .slice(0, numParagraphs)
        .join('\n\n');

    loremOutput.value = generatedText;
    copyLoremBtn.disabled = false;
    updateCharCounter();
});

loremOutput.addEventListener('input', updateCharCounter);

copyLoremBtn.addEventListener('click', () => {
    if (loremOutput.value.trim() === '') return;
    navigator.clipboard.writeText(loremOutput.value).then(() => {
        showCopyMessage();
    });
});

// ============ Email Generator ============
const firstNames = ['Ana', 'Carlos', 'Diego', 'Elena', 'Fernando', 'Gabriela', 'Héctor', 'Iris', 'Jorge', 'Karen', 'Lucas', 'María', 'Nicolás', 'Olivia', 'Pablo', 'Quique', 'Rosa', 'Salvador', 'Teresa', 'Úrsula', 'Valeria', 'Ximena', 'Yolanda', 'Zoe'];
const lastNames = ['García', 'Rodríguez', 'López', 'González', 'Martínez', 'Pérez', 'Sánchez', 'Hernández', 'Gómez', 'Jiménez', 'Flores', 'Vargas', 'Morales', 'Castro', 'Ruiz'];

function generateEmail(domain) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)].toLowerCase();
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)].toLowerCase();
    const randomNum = Math.floor(Math.random() * 1000);
    return `${firstName}.${lastName}${randomNum}@${domain}`;
}

const generateEmailBtn = document.getElementById('generateEmailBtn');
const emailOutput = document.getElementById('emailOutput');
const copyEmailBtn = document.getElementById('copyEmailBtn');
const emailDomainSelect = document.getElementById('emailDomain');

generateEmailBtn.addEventListener('click', () => {
    const domain = emailDomainSelect.value;
    const email = generateEmail(domain);
    emailOutput.value = email;
    copyEmailBtn.disabled = false;
});

copyEmailBtn.addEventListener('click', () => {
    if (emailOutput.value.trim() === '') return;
    navigator.clipboard.writeText(emailOutput.value).then(() => {
        showCopyMessage();
    });
});

// ============ Password Generator ============
const passwordLengthInput = document.getElementById('passwordLength');
const lengthDisplay = document.getElementById('lengthDisplay');
const useUppercaseCheckbox = document.getElementById('useUppercase');
const useLowercaseCheckbox = document.getElementById('useLowercase');
const useNumbersCheckbox = document.getElementById('useNumbers');
const useSymbolsCheckbox = document.getElementById('useSymbols');
const generatePasswordBtn = document.getElementById('generatePasswordBtn');
const passwordOutput = document.getElementById('passwordOutput');
const copyPasswordBtn = document.getElementById('copyPasswordBtn');

const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercase = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const symbols = '!@#$%^&*()-_=+[]{}|;:,.<>?';

function generatePassword() {
    const length = parseInt(passwordLengthInput.value);
    const useUppercase = useUppercaseCheckbox.checked;
    const useLowercase = useLowercaseCheckbox.checked;
    const useNumbers = useNumbersCheckbox.checked;
    const useSymbols = useSymbolsCheckbox.checked;

    let charset = '';
    let password = [];

    if (useUppercase) {
        charset += uppercase;
        password.push(uppercase[Math.floor(Math.random() * uppercase.length)]);
    }

    if (useLowercase) {
        charset += lowercase;
        password.push(lowercase[Math.floor(Math.random() * lowercase.length)]);
    }

    if (useNumbers) {
        charset += numbers;
        password.push(numbers[Math.floor(Math.random() * numbers.length)]);
    }

    if (useSymbols) {
        charset += symbols;
        password.push(symbols[Math.floor(Math.random() * symbols.length)]);
    }

    if (charset === '') {
        return 'Selecciona al menos un tipo de carácter';
    }

    while (password.length < length) {
        password.push(charset[Math.floor(Math.random() * charset.length)]);
    }

    password = password.sort(() => Math.random() - 0.5);
    return password.join('');
}

passwordLengthInput.addEventListener('input', () => {
    lengthDisplay.textContent = passwordLengthInput.value;
});

generatePasswordBtn.addEventListener('click', () => {
    const password = generatePassword();
    passwordOutput.value = password;
    copyPasswordBtn.disabled = false;
});

copyPasswordBtn.addEventListener('click', () => {
    if (passwordOutput.value.trim() === '') return;
    navigator.clipboard.writeText(passwordOutput.value).then(() => {
        showCopyMessage();
    });
});

// ============ Shared Popup ============
function showCopyMessage() {
    const message = document.createElement('div');
    message.className = 'copy-message';
    message.textContent = '¡Copiado!';
    document.body.appendChild(message);

    setTimeout(() => {
        message.classList.add('hide');
        setTimeout(() => {
            message.remove();
        }, 300);
    }, 2000);
}

// ============ Init ============
window.addEventListener('load', () => {
    generateBtn.click();
    generateEmailBtn.click();
    generatePasswordBtn.click();
});
