const LoadsPhones = async(SearchInputText,dataLimit) => {
    const URL = `https://openapi.programming-hero.com/api/phones?search=${SearchInputText}`;
    const response = await fetch(URL);
    const data = await response.json();
    DisplayLoadsPhones(data.data,dataLimit);
}

const DisplayLoadsPhones = (phones,dataLimit) => {
    const PhoneContainer = document.getElementById('phone-container');
    PhoneContainer.innerHTML = '';
    // display 9 phones
    const ShowAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 9) {
        phones = phones.slice(0, 9);
        ShowAll.classList.remove('d-none');
    }
    else {
        ShowAll.classList.add('d-none');
        const SearchInputField = document.getElementById('search-input');
        SearchInputField.value = '';
    }
    // display no phones found
    const NoPhonesFound = document.getElementById('no-found-message');
    if (phones.length === 0) {
        NoPhonesFound.classList.remove('d-none');
    }
    else {
        NoPhonesFound.classList.add('d-none');
    }
    // remaining function 
    phones.forEach(phone => {
        const PhoneDiv = document.createElement('div');
        PhoneDiv.classList.add('col');
        PhoneDiv.innerHTML = `
        <div class="card p-4 rounded-4">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <button onclick="LoadsPhonesDetails('${phone.slug}')" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">Show Details</button>
            </div>

        </div>
        `;
        PhoneContainer.appendChild(PhoneDiv);
    });
    // stop Spinner or Loader
    ToggleSpinner(false);
}

const ProcessSearch = (dataLimit) => {
    ToggleSpinner(true);
    const SearchInputField = document.getElementById('search-input');
    const SearchInputValue = SearchInputField.value;
    LoadsPhones(SearchInputValue, dataLimit);
}

document.getElementById('btn-search').addEventListener('click', function () {
    // start spinner or loader 
    ProcessSearch(9);
})

// press enter key
document.getElementById('search-input').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      // code for enter
      ProcessSearch(9);
    }
});

const ToggleSpinner = (IsLoading) => {
    const SpinnerSection = document.getElementById('spinner-loader');
    if (IsLoading) {
        SpinnerSection.classList.remove('d-none');
    }
    else {
        SpinnerSection.classList.add('d-none');
    }
}

document.getElementById('button-show-all').addEventListener('click', function () {
    ProcessSearch();
})

const LoadsPhonesDetails = async (id) => {
    const URL = `https://openapi.programming-hero.com/api/phone/${id}`;
    const response = await fetch(URL);
    const data = await response.json();
    DisplayLoadsPhonesDetails(data.data);
}

const DisplayLoadsPhonesDetails = (detail) => {
    console.log(detail);
    const ModalTitle = document.getElementById('exampleModalLabel');
    ModalTitle.innerText = detail.name;
    const PhonesDetails = document.getElementById('phone-details');
    PhonesDetails.innerHTML = `
    <p><span class="fw-semibold">Serial NO :</span> ${detail.slug}</p>
    <p><span class="fw-semibold">Brand :</span> ${detail.brand}</p>
    <p><span class="fw-semibold">ReleaseDate :</span> ${detail.releaseDate}</p>
    <p><span class="fw-semibold">Storage :</span> ${detail.mainFeatures.storage ? detail.mainFeatures.storage : 'No Storage'}</p>
    <p><span class="fw-semibold">DisplaySize :</span> ${detail.mainFeatures.displaySize}</p>
    <p><span class="fw-semibold">ChipSet :</span> ${detail.mainFeatures.chipSet}</p>
    <p><span class="fw-semibold">Memory :</span> ${detail.mainFeatures.memory}</p>
    <p><span class="fw-semibold">Sensors :</span> ${detail.mainFeatures.sensors.slice(0,5)}</p>
    `;
}

// LoadsPhones('iphone');
