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
	console.log(phone);
	inputElement.innerHTML = '';
	const arr = [];
	for (let el in phone) {
		const htmlElement = `
        <div class="field">
        <label class="label">${el}</label>
        <input class="input" placeholder="Title" name="${el}" value="${phone[el]}">
        </div>
        `;

		arr.push(htmlElement);
	}
	inputElement.innerHTML = arr.join('');
};

createAutoComplete(autoCompleteConfig);
