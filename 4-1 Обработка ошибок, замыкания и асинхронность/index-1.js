function getPasswordChecker(password) {
    let validPass = password;

    return function (checkPass) {
        return validPass === checkPass;
    }
}


const cheker = getPasswordChecker("MyPass");

console.log(cheker(123));
console.log(cheker("123"));
console.log(cheker("Pass"));
console.log(cheker("MyPass"));