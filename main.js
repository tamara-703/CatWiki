//api for cats
//basic: https://api.thecatapi.com/v1/images/search?api_key=YOUR_API_KEY
//api key: d6UMByrl4eANDsX8UCdJzCqwHeH7zcdKlejRIUiVidyBfILxCyzTfjfMFsEyPhiI

const baseURL = 'https://api.thecatapi.com/v1/images/search?'
const apiKey = 'd6UMByrl4eANDsX8UCdJzCqwHeH7zcdKlejRIUiVidyBfILxCyzTfjfMFsEyPhiI';

let welcEl = document.getElementsByClassName('welcome-header');
let mainFormEl = document.getElementById('main-form');
let petDisplayEl = document.querySelector('.pet-display-container');
let mainContainerEl = document.querySelector('.form-container');

document.querySelector('.cat-selection').addEventListener('change', getSelectedValue);
function getSelectedValue(e)
{
    e.preventDefault();
    console.log(e.target.value);

    let catBreed = e.target.value;

    let data = getCatAPI(catBreed);

    data.then((result) => {
        console.log(result);

        result.map((item) => {
            console.log(item);
            const imgEl = document.createElement('img');
            imgEl.classList.add('img-display');
            imgEl.setAttribute('src', `${item.url}`);
            imgEl.setAttribute('width', '300px');

            //append image to the div element as a child
            petDisplayEl.append(imgEl);

            const originEl = document.createElement('p');
            originEl.innerText = `Origin - ${item.breeds[0].origin}`;

            const altNameEl = document.createElement('p');
            altNameEl.innerText = `Alternative name - ${item.breeds[0].alt_names}`;

            const labelsEl = document.querySelector('.labels');
            labelsEl.append(originEl,altNameEl);


            const descEl = document.createElement('p');
            descEl.innerText = `Description - ${item.breeds[0].description}`;

            const wikiBtn = document.createElement('button');
            wikiBtn.innerText = 'More information';
            wikiBtn.setAttribute('onClick', 'getLink');

            petDisplayEl.append(labelsEl, descEl, wikiBtn);

            petDisplayEl.classList.remove('toggle-display');
            })


    })
}

const getLink = () => {
    console.log('getting wiki link');
}

const getCatAPI = async (catBreed) => {

    const resp = await fetch(`${baseURL}&breed_ids=${catBreed}&api_key=live_${apiKey}`);
    const data = resp.json();

    return data;
}
