import { showToast } from './bootStrapAlert.js';

function generateRandom(min = 0, max = 10000) {
	let difference = max - min;
	let rand = Math.random();
	rand = Math.floor(rand * difference);
	rand = rand + min;
	return rand;
}

// Dynamically Store Product Id
let prodId = (document.querySelector('#inputProductId').value =
	generateRandom());

// get Image file
document
	.getElementById('inputProductImage')
	.addEventListener('change', (event) => {
		let input = event.target;
		let reader = new FileReader();
		reader.onload = function () {
			let dataURL = reader.result;
			// console.log(dataURL);
			// document.getElementById("inputProductImage") = dataURL;
			let prodImage = document.getElementById('inputProductImage');
			prodImage.src = dataURL;
		};
		reader.readAsDataURL(input.files[0]);
	});

// Store Product Details in LocalStorage
const productSubmitBtn = document.querySelector('#productSubmitBtn');
productSubmitBtn.addEventListener('click', () => {
	let prodId = document.querySelector('#inputProductId').value,
		prodName = document.querySelector('#inputProductName').value,
		prodPrice = document.querySelector('#inputProductPrice').value,
		prodImage = document.querySelector('#inputProductImage').src,
		prodDescription = document.querySelector('#inputProductDescription').value;

	let productData = { prodId, prodName, prodPrice, prodImage, prodDescription };

	if (
		prodId == '' ||
		prodName == '' ||
		prodPrice == '' ||
		prodImage == '' ||
		prodDescription == ''
	) {
		showToast('Please fill all the fields!', 'bg-danger');
	} else {
		let inputData = JSON.parse(localStorage.getItem('Products')) || [];
		inputData.push(productData);
		localStorage.setItem('Products', JSON.stringify(inputData));
		showToast('Product added successfully', 'bg-success');

		// console.log(inputData);

		document.querySelector('#inputProductId').value = generateRandom();
		document.querySelector('#inputProductName').value = '';
		document.querySelector('#inputProductPrice').value = '';
		document.querySelector('#inputProductImage').value = '';
		document.querySelector('#inputProductDescription').value = '';
	}

	const form = document.querySelector('form');
	form.addEventListener('submit', (event) => {
		event.preventDefault();
	});
});

// localStorage.clear();
