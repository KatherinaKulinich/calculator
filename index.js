const calculator = document.querySelector('form');
const result = document.querySelector('#result');

const action = ['+', '-', '*', '/', '%'];
const values = ['0', '00', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', 'DEL'];

let numberFirst = '';
let numberSecond = '';
let sign = '';
let finish = false;




calculator.addEventListener('click', (event) => {
    const value = event.target.value;
    
    if(event.target.tagName !== 'INPUT') return;

    if (value === 'AC') {
        clearAll(0);
        return;
    }

    
    if (values.includes(value)) {

        if (numberSecond === '' && sign === '') {
            if (numberFirst.length >= 9) return;

            
            if (value === '.' && numberFirst.length === 0) {
                numberFirst = '0' + '.';
                result.innerHTML = numberFirst;
                return;
            } 

            if (value === '.' &&  numberFirst.length > 0) {     
                if (numberFirst.indexOf('.') === -1) {
                    numberFirst += value;
                    result.innerHTML = numberFirst;
                }         
                return;
            }


            if (value === 'DEL' ) {
                numberFirst = numberFirst.slice(0, -1);
                result.innerHTML = numberFirst;
                return;
            }

            numberFirst += value;
            result.innerHTML = numberFirst;
            trimStartZero(numberFirst);
            return;
        }



        if (numberFirst !== '' && numberSecond !== '' && finish) {
            if (value === 'DEL' ) {
                numberFirst = String(numberFirst);
                numberFirst = numberFirst.slice(0, -1);
                result.innerHTML = numberFirst;
                return;
            }

            if (value === '.') {
                numberSecond = '0' + '.';
                result.innerHTML = numberSecond;
                finish = false;
                return;
            }

            numberSecond = value;
            result.innerHTML = numberSecond;
            finish = false;
            trimStartZero(numberSecond);
            return;
        }


        if (numberSecond.length >= 9) return;

        if (value === '.' && numberSecond.length === 0) {
            numberSecond = '0' + '.';
            result.innerHTML = numberSecond;
            return;
        } 

        if (value === '.' &&  numberSecond.length > 0) {
            if (numberSecond.indexOf('.') === -1) {
                numberSecond += value;
                result.innerHTML = numberSecond;
            } 
            return;
        }

        if (value === 'DEL' ) {
            numberSecond = numberSecond.slice(0, -1);
            result.innerHTML = numberSecond;
            return;
        }
        
        numberSecond += value;
        result.innerHTML = numberSecond;
        trimStartZero(numberSecond);
        return;
    }


    if (action.includes(value)) {
        sign = value;
        result.innerHTML = sign;
        return;
    }

    if (value === '=') {
        if (numberSecond === '') {
            numberSecond = numberFirst;
        }

        switch(sign) {
            case '+':
                numberFirst = Number(numberFirst) + Number(numberSecond);
                break;
            case '-':
                numberFirst = numberFirst - numberSecond;
                break;
            case '/':
                if (numberSecond === '0') {
                    clearAll('error');
                    return;
                }
                numberFirst = numberFirst / numberSecond;
                break;
            case '*':
                numberFirst = numberFirst * numberSecond;
                break;
            case '%':
                numberFirst = numberFirst / 100;
                break;
        }

        let numberLength = String(numberFirst).length;
        if (!Number.isInteger(numberFirst) && numberLength > 5) {
            numberFirst = numberFirst.toExponential(6);
        }

        if (Number.isInteger(numberFirst) && numberLength > 7) {
            numberFirst = numberFirst.toExponential(9);
        }

        finish = true;
        result.innerHTML = numberFirst;
    }
})




function clearAll(value) {
    numberFirst = '';
    numberSecond = '';
    sign = '';
    finish = false;
    result.innerHTML = value;
}

function trimStartZero(numb) {
    if (/^0+(?=\d)/.test(numb)) {
        numb = numb.replace(/^0+(?=\d)/, '');
        result.innerHTML = numb; 
        return;
    }
}


