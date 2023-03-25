import { showToast } from './bootStrapAlert.js';

// function to generate random Product Id
const characters =
	'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length) {
	let result = '';
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}

	return result;
}

// Dynamically Store Prdouct Id
let prodId = (document.querySelector('#inputProductId').value =
	generateString(5));

// testing Image and workin file
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

		document.querySelector('#inputProductId').value = generateString(5);
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
