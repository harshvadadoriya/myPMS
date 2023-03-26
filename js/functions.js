import { showToast } from './bootStrapAlert.js';

// function to show all user data on screen in table
export function showProducts() {
	const getProdCard = document.querySelector('.products-card');
	// below line is the Id number
	let ind = 1;
	// below line will stop printing all firstName and email of previous users
	getProdCard.innerHTML = '';
	let _userData = JSON.parse(localStorage.getItem('Products')) || [];
	const arr = _userData.map((obj) => {
		return `<div class="card">
      <div class="card-img">
      <img src=${obj.prodImage} >
      </div>
      <div class="card-info" data-id=${obj.prodName}>
        <p id="prodId">#${obj.prodId}</p>
        <p class="text-title" name="prodName">${obj.prodName}</p>
        <p class="text-body">${obj.prodDescription}</p>
      </div>
      <div class="card-footer">
      <span class="text-title">₹ ${obj.prodPrice}</span>
      <div class="card-button">
        <svg class="svg-icon" viewBox="0 0 20 20">
          <path d="M17.72,5.011H8.026c-0.271,0-0.49,0.219-0.49,0.489c0,0.271,0.219,0.489,0.49,0.489h8.962l-1.979,4.773H6.763L4.935,5.343C4.926,5.316,4.897,5.309,4.884,5.286c-0.011-0.024,0-0.051-0.017-0.074C4.833,5.166,4.025,4.081,2.33,3.908C2.068,3.883,1.822,4.075,1.795,4.344C1.767,4.612,1.962,4.853,2.231,4.88c1.143,0.118,1.703,0.738,1.808,0.866l1.91,5.661c0.066,0.199,0.252,0.333,0.463,0.333h8.924c0.116,0,0.22-0.053,0.308-0.128c0.027-0.023,0.042-0.048,0.063-0.076c0.026-0.034,0.063-0.058,0.08-0.099l2.384-5.75c0.062-0.151,0.046-0.323-0.045-0.458C18.036,5.092,17.883,5.011,17.72,5.011z"></path>
          <path d="M8.251,12.386c-1.023,0-1.856,0.834-1.856,1.856s0.833,1.853,1.856,1.853c1.021,0,1.853-0.83,1.853-1.853S9.273,12.386,8.251,12.386z M8.251,15.116c-0.484,0-0.877-0.393-0.877-0.874c0-0.484,0.394-0.878,0.877-0.878c0.482,0,0.875,0.394,0.875,0.878C9.126,14.724,8.733,15.116,8.251,15.116z"></path>
          <path d="M13.972,12.386c-1.022,0-1.855,0.834-1.855,1.856s0.833,1.853,1.855,1.853s1.854-0.83,1.854-1.853S14.994,12.386,13.972,12.386z M13.972,15.116c-0.484,0-0.878-0.393-0.878-0.874c0-0.484,0.394-0.878,0.878-0.878c0.482,0,0.875,0.394,0.875,0.878C14.847,14.724,14.454,15.116,13.972,15.116z"></path>
        </svg>
      </div>
    </div>
    <div class="buttons" data-id=${obj.prodId}><button type="button" data-bs-toggle="modal"
	data-bs-target="#exampleModal"class="btn btn-primary card-link" id="prodEdit">Edit</button>
    <button class="btn btn-danger" id="prodDelete">Delete</button>
    </div>
    </div>`;
	});
	if (arr !== undefined && arr.length > 0) {
		// i is the key of the array
		for (let i of arr) {
			getProdCard.insertAdjacentHTML('beforeend', i);
		}
	} else {
		getProdCard.innerHTML =
			'<img class="img-fluid no-data-found" src="/Asset/100465-no-data-found.gif">';
	}
}
showProducts();

// common function to read localStorage Data
function getCrudData() {
	let prodData = JSON.parse(localStorage.getItem('Products')) || [];
	return prodData;
}

// function to delete products
function deleteProduct(cardId) {
	// Get the current list of cards from local storage
	const inputData = getCrudData();

	// Find the index of the card with the given ID
	const cardIndex = inputData.findIndex((card) => card.prodId === cardId);

	// If the card was found, remove it from the list and update local storage
	if (cardIndex !== -1) {
		inputData.splice(cardIndex, 1);
		// showToast(`${card.prodName} removed`, 'bg-danger');

		// console.log(cardIndex);
		localStorage.setItem('Products', JSON.stringify(inputData));
	}
}

// Attach a click event listener to the delete button of each card
const deleteButtons = document.querySelectorAll('#prodDelete');
deleteButtons.forEach((button) => {
	button.addEventListener('click', (event) => {
		// Get the ID of the product to delete
		const cardId = event.target.closest('.buttons').dataset.id;

		// Delete the card from local storage
		deleteProduct(cardId);

		// Remove the card from the DOM
		event.target.closest('.card').remove();

		// reload page after product delete
		setTimeout(function () {
			window.location.reload();
		}, 2000);

		// console.log(cardId);
		showToast(`#${cardId} product deleted`, 'bg-danger');
	});
});

// function to update products
function updateProducts(cardId) {
	let showModal = document.getElementById('modal');
	// console.log(showModal);
	let products = getCrudData();
	products.forEach((elem) => {
		if (elem.prodId == cardId) {
			let index = products.indexOf(elem);
			// console.log(index);
			// console.log(elem.prodDescription);
			showModal.innerHTML = `
        	<div class="modal-header">
          		<h5 class="modal-title" id="exampleModalLabel">Edit Product Details</h5>
          		<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          	</div>
           	<div class="modal-body">
				<form>
					<div class="form-group">
						<label class="form-label" for="productId">Product Id <b>#</b></label>
						<input type="text" class="form-control" id="productId" placeholder="Product Id" value=${elem.prodId} disabled required>
					</div>
					<div class="form-group">
						<label class="form-label mt-2" for="productName">Update Name</label> 
						<input type="text" class="form-control" id="productName" placeholder="Product Name" value=${elem.prodName} required>
					</div>
					<div class="form-group">
						<label class="form-label mt-2" for="productPrice">Update Price <b>₹</b></label>
						<input type="number" class="form-control" id="productPrice" placeholder="Product Price" value=${elem.prodPrice} required>
					</div>
					<div class="form-group">
						<label class="form-label mt-2" for="productImage">Old Image</label><br>
						<img class="img img-thumbnail mt-2" src=${elem.prodImage}>
					</div>
					<div class="form-row">
						<div class="form-group col-md-6">
						<label class="form-label mt-2" for="productImage">Choose New Image</label>
						<input type="file" class="form-control" id="productImage" accept="image/png, image/jpeg" value=${elem.prodImage} required>
						</div>
					</div>
					<div class="form-group">
						<label class="form-label mt-2" for="productDescription">Update Description</label>
						<textarea class="form-control" id="productDescription" placeholder="Product Description" rows="3">${elem.prodDescription}</textarea>
					</div>
					
				</form>
          	</div>
        	<div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        		<button type="button" class="btn btn-primary">Save changes</button>
       	 	</div>`;
			return;
			// continue from here.................
		}
	});
}

// function to edit products
const editButtons = document.querySelectorAll('#prodEdit');
editButtons.forEach((button) => {
	button.addEventListener('click', (event) => {
		const cardId = event.target.closest('.buttons').dataset.id;
		// updateProducts(parseFloat(cardId));
		updateProducts(cardId);
		// console.log(cardId);
	});
});
