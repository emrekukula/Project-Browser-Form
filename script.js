const form = document.getElementById('form');
const button = document.getElementById('button');
const email = document.getElementById('email');
const country = document.getElementById('country')
const zip = document.getElementById('zip');
const pwd = document.getElementById('pwd');
const pwdConfirm = document.getElementById('pwdConfirm')

function renderValidations() {
  mailValidation();
  zipValidation();
  pwdValidation();
  pwdConfirmValidation();
  submitButton();
}
renderValidations();

function mailValidation() {
  const pattern = "^(?!.*?\.\.)(?:[a-zA-Z0-9.]{1,30}@(?!gmail\.com$)(?:[a-zA-Z0-9-]+\.)+[a-zA-Z0-9]{2,4}|[a-zA-Z0-9.]{6,30}@gmail\.com)$";
  const mailPattern = new RegExp(pattern);
  
  email.addEventListener('input', (e) => {
    const emailValue = document.getElementById('email').value;
    
    if (mailPattern.test(emailValue)) {
      email.setCustomValidity('Must be an email! E.g: example@example.com')
      validations[0] = email.checkValidity();
      console.log('false')
    } else {
      email.setCustomValidity('')
      console.log('true')
      validations[0] = email.checkValidity();
    }
  })
} 

function zipValidation() {
  const constraints = {
    ch: [
      "^(CH-)?\\d{4}$",
      "Switzerland ZIPs must have exactly 4 digits: e.g. CH-1950 or 1950",
    ],
    fr: [
      "^(F-)?\\d{5}$",
      "France ZIPs must have exactly 5 digits: e.g. F-75012 or 75012",
    ],
    de: [
      "^(D-)?\\d{5}$",
      "Germany ZIPs must have exactly 5 digits: e.g. D-12345 or 12345",
    ],
    nl: [
      "^(NL-)?\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$",
      "Netherland ZIPs must have exactly 4 digits, followed by 2 letters except SA, SD and SS",
    ],
  };

  zip.addEventListener('input', (e) => {
    const zipValue = document.getElementById('zip').value;
    const countryValue = document.getElementById('country').value;
    
    const constraint = new RegExp(constraints[countryValue][0], '');

    if (constraint.test(zipValue)) {
      zip.setCustomValidity('')
      validations[1] = zip.checkValidity();
      console.log('true'); 
    } else {
      zip.setCustomValidity(constraints[countryValue][1])
      validations[1] = zip.checkValidity();
      console.log('false');
    }
  })
}

function pwdValidation() {
  
  pwd.addEventListener('input', (e) => {
    const pwdValue = document.getElementById('pwd').value;
    
    const pattern = "(?=^.{6,}$)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).*";
    const pwdPattern = new RegExp(pattern, '');

    if (pwdPattern.test(pwdValue)) {
      console.log('true');
      pwd.setCustomValidity('');
      validations[2] = pwd.checkValidity();
    } else {
      pwd.setCustomValidity('Minimum six characters, at least one upper case letter, one lower case letter, one number and one special character.')
      console.log('false');
      validations[2] = pwd.checkValidity();
    }
  })
}

function pwdConfirmValidation() {
  pwdConfirm.addEventListener('input', (e) => {
    const pwdConfirmValue = document.getElementById('pwdConfirm').value;
    const pwdValue = document.getElementById('pwd').value;

    if (pwdConfirmValue === '') {
      pwdConfirm.setCustomValidity('Can not be empty.');

    } else if (pwdConfirmValue !== pwdValue) {
      pwdConfirm.setCustomValidity('Passwords do not match.');
      validations[3] = pwdConfirm.checkValidity();
    } else {
      pwdConfirm.setCustomValidity('');
      validations[3] = pwdConfirm.checkValidity();
    }
  })
}

let validations = [];

function submitButton() {
  button.addEventListener('submit', (e) => {
    e.preventDefault();
    
    values = [email.value, pwd.value, pwdConfirm.value, zip.value];

    if (validations.every(boolean => boolean === true)) {
      alert('HIGH FIVE');
      console.log('HIGH FIVE');
    }
  })
}

const inputs = document.querySelectorAll('input');

inputs.forEach( input => input.addEventListener('focus', (e) => {
  event.target.style.background = 'pink';
}));

inputs.forEach( input => input.addEventListener('blur', (e) => {
  event.target.style.background = '';
}));