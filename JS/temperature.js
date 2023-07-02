const currencyEl_one = document.getElementById('currency-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_one = document.getElementById('amount-one');
const amountEl_two = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

// Text in select box to research
function myNewFunction(sel) {
  alert(sel.options[sel.selectedIndex].text);
}

// Fetch exchange rates and update the dome
function calculate() {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;

  fetch(`API/api-temperature/${currency_one}.json`)
    .then((res) => res.json())
    .then((data) => {
      //   console.log(data);

    if(`${currency_one}`=="C" && `${currency_two}`=="K"){
        rateEl.innerText = ` ${currency_one} = ${currency_one}+273.15 ${currency_two}`;
        amountEl_two.value = (amountEl_one.value*1 + 273.15).toFixed(4);
    }        
    if (`${currency_one}`=="C" && `${currency_two}`=="F"){
        rateEl.innerText = ` ${currency_one} = (1.8*${currency_one}+32) ${currency_two}`;
        amountEl_two.value = (amountEl_one.value * 1.8 + 32).toFixed(4);
    }
    else if (`${currency_one}`=="F" && `${currency_two}`=="C"){
        rateEl.innerText = ` ${currency_one} = 5/9*(${currency_one}-32) ${currency_two}`;
        amountEl_two.value = ((amountEl_one.value *1 - 32)*(5/9)).toFixed(4);
    }
    else if (`${currency_one}`=="F" && `${currency_two}`=="K"){
        rateEl.innerText = ` ${currency_one} = 5/9*(${currency_one}-32)+273.15 ${currency_two}`;
        amountEl_two.value = ((amountEl_one.value *1 - 32)*(5/9)+273.15).toFixed(2);
    }   
    else if (`${currency_one}`=="K" && `${currency_two}`=="C"){
        rateEl.innerText = ` ${currency_one} = ${currency_one}-273.15 ${currency_two}`;
        amountEl_two.value = (amountEl_one.value *1-273.15).toFixed(2);
    }
    else if (`${currency_one}`=="K" && `${currency_two}`=="F"){
        rateEl.innerText = ` ${currency_one} = 1.8*(${currency_one}-273.15)+32 ${currency_two}`;
        amountEl_two.value = (1.8*(amountEl_one.value *1-273.15)+32).toFixed(2);
    }
    });
}


// Event Listeners
currencyEl_one.addEventListener('change', calculate);
amountEl_one.addEventListener('input', calculate);
currencyEl_two.addEventListener('change', calculate);
amountEl_two.addEventListener('input', calculate);
swap.addEventListener('click', () => {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  calculate();
});

calculate();