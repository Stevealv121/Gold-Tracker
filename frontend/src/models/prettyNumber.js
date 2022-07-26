
class PrettyNumber {

    number;
    constructor(number) {
        this.setNumber(number);
    }

    setNumber(number) {
        //000,000.00
        var digits = number.toString().split('');
        var realDigits = digits.map(Number);
        let formattedNumber = ".00";
        console.log("length:" + realDigits.length);
        for (let index = 1; index <= realDigits.length; index++) {
            if (realDigits.length <= 3) {
                formattedNumber = realDigits[realDigits.length - index] + formattedNumber;
            } else if (index === 4 || index === 7) {
                formattedNumber = realDigits[realDigits.length - index] + "," + formattedNumber;
                console.log("prettynumber");
            } else if (realDigits.length <= 6 && realDigits.length > 3) {
                formattedNumber = realDigits[realDigits.length - index] + formattedNumber;
            } else if (realDigits.length <= 9 && realDigits.length > 6) {
                formattedNumber = realDigits[realDigits.length - index] + formattedNumber;
            }
        }
        this.number = formattedNumber;
    }
}

export default PrettyNumber;