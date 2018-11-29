const input = document.querySelector('.input');
const output = document.querySelector('.display');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const clear = document.querySelectorAll('.btn--clear');
const dec = document.querySelector('.decimal');



let outputVal = '';
let itemsForEval = [];
let current = '';

// adding number input
function setInputVal(element) {
	const el = element;
	const regEx = /(\d{3})/g;
	//adding zero or not
	if(input.value == '' || input.value === '0') {
 		current = el;
		input.value = current;
		inputVal = input.value;
	} else {
		current += el;
		input.value = current;
	}
	// separeting with comma
	if(input.value.length > 3 && current.length % 3 != 0 && !input.value.includes('.')) {
		const l = current.length;
		const r = l % 3;
		input.value = current.substring(0, r) + current.substring(r, l).replace(regEx, ',$1');
	} else if(input.value.length > 3 && current.length % 3 == 0 && !input.value.includes('.')) {
		input.value = current.replace(regEx, ',$1').slice(1);
	}
}

//adding decimal
function addingDecimal(decimal) {
		if(input.value.includes(decimal)) {
			return;
		} else if(input.value == '') {
			current = '0' + decimal;
			input.value = current;
		} else {
			input.value += decimal;
			current = input.value;
		}
}

//clear all or end element
function clearAllOrOne(c) {
	if(c === 'C') {
		output.textContent = '';
		input.value = '';
		current = '';
		outputVal = '';
		itemsForEval = [];
	} else {
		current = input.value.slice(0, input.value.length - 1);
		input.value = current;
		if(current.includes(',')) {
			current = current.replace(/,/, '');
		}
	}
}

//operate

function operation(e) {
	const eVal = e.target.value;
	const eTxt = e.target.textContent;
	let curVal = '';
	const x = outputVal[outputVal.length-1];
	if(x == eTxt) return;
	itemsForEval.push(input.value);


	switch(eTxt) {
		case '+':
			itemsForEval.push(eVal);
			curVal = input.value + eTxt;
			outputVal += curVal;
			output.textContent = outputVal;
			input.value = '';
			break;
		case '−':
			itemsForEval.push(eVal);
			curVal = input.value + eTxt;
			outputVal += curVal;
			output.textContent = outputVal;
			input.value = '';
		break;
		case '×':
			itemsForEval.push(eVal);
			curVal = input.value + eTxt;
			outputVal += curVal;
			output.textContent = outputVal;
			input.value = '';
		break;
		case '÷':
			itemsForEval.push(eVal);
			curVal = input.value + eTxt;
			outputVal += curVal;
			output.textContent = outputVal;
			input.value = '';
		break;
		case '%':
			itemsForEval.push(eVal);
			curVal = input.value + eTxt;
			outputVal += curVal;
			output.textContent = outputVal;
			input.value = '';
		break;
		case '=':
			let calcVal = '';
			if(itemsForEval.join('').includes(',')) {
				calcVal = itemsForEval.join('').replace(/,/g, '');
			} else {
				calcVal = itemsForEval.join('');
			}
			input.value = Number.parseFloat(eval(itemsForEval.join('')).toFixed(2));
			output.textContent = '';
			itemsForEval = [];
			outputVal = '';
			curVal = '';
			current = '';
		break;

	}
}



numbers.forEach( (number) => number.addEventListener('click', (e) => {
	setInputVal(e.target.value);
}));

dec.addEventListener('click', (e) => {
	addingDecimal(e.target.value);
});

clear.forEach((c) => c.addEventListener('click', (e) => {
	clearAllOrOne(e.target.textContent);
}))

operators.forEach((operator) => operator.addEventListener('click', operation));


