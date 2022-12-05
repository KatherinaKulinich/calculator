const calculator = document.querySelector('form');
const result = document.querySelector('#result');

const action = ['+', '-', '*', '/'];

let numberFirst = '';
let numberSecond = '';
let sign = '';
let finish = false;


calculator.addEventListener('click', (event) => {
    const value = event.target.value;
    
    if(event.target.tagName !== 'INPUT') return;

    if (value === 'AC') {
        clearAll()
        return;
    }

    if (value === 'DEL') {

        if (numberSecond === '') {
            numberFirst = numberFirst.slice(0, -1);
            result.innerHTML = numberFirst;
            return;
        }
        numberSecond = numberSecond.slice(0, -1);
        result.innerHTML = numberSecond;
    }

    
    if (Number(value >= 0) || value === '00' || value === '.') {

        if (numberSecond === '' && sign === '') {

            numberFirst += value;
            result.innerHTML = numberFirst;
            return;
        }

        if (numberFirst !== '' && numberSecond !== '' && finish) {

            numberSecond = value;
            result.innerHTML = numberSecond;
            finish = false;
            return;
        }

        numberSecond += value;
        result.innerHTML = numberSecond;

        console.log(numberFirst, numberSecond, sign);
        return;
    }

    // if (value === '%') {
    //     result.innerHTML = result.innerHTML / 100;
        
    //     return;
    // }

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
                // numberFirst = Number(numberFirst) - Number(numberSecond);
                break;
            case '/':
                if (numberSecond === '0') {
                    result.innerHTML = 'error';
                    numberFirst === '';
                    numberFirst === '';
                    return;
                }
                numberFirst = numberFirst / numberSecond;
                // numberFirst = Number(numberFirst) / Number(numberSecond);
                break;
            case '*':
                numberFirst = numberFirst * numberSecond;
                // numberFirst = Number(numberFirst) * Number(numberSecond);
                break;
        }
        finish = true;
        result.innerHTML = numberFirst;
    }
})



function clearAll() {
    numberFirst = '';
    numberSecond = '';
    sign = '';
    finish = false;
    result.innerHTML = 0;
}





// if (value === '.' ) {
    //     let currentValue = result.innerHTML;

    //     if (currentValue.indexOf('.') === -1) {
    //         result.innerHTML += value;
    //     }
    // }