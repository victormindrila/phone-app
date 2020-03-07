const autoCompleteConfig = {
	root: document.querySelector('#autocomplete'),
	onOptionSelect(phone) {
		onPhoneSelect(phone, document.querySelector('#input-data'));
	},
	renderOption(phone) {
		return `
        <h1>${phone.DeviceName}</h1>
        `;
	},

	inputValue(phone) {
		return phone.DeviceName;
	},
	async fetchData({ fonoapi, token }, device) {
		const response = await fetch(`${fonoapi}getdevice?device=${device}&token=${token}`);
		let data = await response.json();
		if (!data) {
			return [];
		}
		return data;
	}
};

const onPhoneSelect = (phone, inputElement) => {
	inputElement.innerHTML = '';
	const arr = [];
	for (let el in phone) {
		const htmlElement = `
        <div class="field has-addons">
        <label class="label">${el}</label>
		<input class="input" placeholder="Title" name="${el}" value="${phone[el]}">
		<div class="control">
		<button class="button is-danger">Delete</button>
		</div>
		
        </div>
        `;

		arr.push(htmlElement);
	}
	inputElement.innerHTML = arr.join('');
	inputElement.querySelectorAll('.button').forEach((item) =>
		item.addEventListener('click', function(event) {
			event.preventDefault();
			this.parentNode.parentNode.outerHTML = '';
		})
	);
};

createAutoComplete(autoCompleteConfig);

const categoryNode = document.querySelector('#category');
const subcategoryNode = document.querySelector('#subcategory');
const subcategoryOptions = [ ...subcategoryNode.options ];

categoryNode.addEventListener('change', (event) => {
	filteredOptions = subcategoryOptions.filter((item) => item.dataset.catid === event.target.value);
	subcategoryNode.options.length = 0;
	filteredOptions.map((item) => subcategoryNode.options.add(item));
});
categoryNode.dispatchEvent(new Event('change'));

const addBtn = document.querySelector('#add-feature');

addBtn.addEventListener('click', (event) => {
	event.preventDefault();
	const node = document.createElement('div');
	node.classList.add('modal');
	node.classList.add('is-active');
	node.innerHTML = `
	<div class="modal-background"></div>
	<div class="modal-content">
	<div class="box">
	  <p> Add new feature</p>
	<form>
     <label class="label">Feature name</label>
	 <input class="input" placeholder="Feature name" name="featureName">
	 <button class="button is-primary" id="add-feature"><i class="fas fa-plus-circle"></i> </button>
	 </form>
	</div>
	</div>
	
	`;
	document.body.appendChild(node);
	const featureNameInput = node.querySelector('.input');
	const addBtn = node.querySelector('.button');
	addBtn.addEventListener('click', (event) => {
		event.preventDefault();
		const inputData = document.querySelector('#input-data');
		const newFeatureInput = document.createElement('div');
		newFeatureInput.classList.add('field');
		newFeatureInput.classList.add('has-addons');
		inputData.appendChild(newFeatureInput);
		newFeatureInput.innerHTML = `
		<label class="label">${featureNameInput.value}</label>
    	<input class="input" placeholder="${featureNameInput.value}" name="${featureNameInput.value}">
	    <div class="control">
        <button class="button is-danger">Delete</button>
        </div>
		`;
		newFeatureInput.querySelector('.button').addEventListener('click', function(event) {
			event.preventDefault();
			this.parentNode.parentNode.outerHTML = '';
		});

		document.body.removeChild(node);
	});
});
