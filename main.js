//api for cats
//basic: https://api.thecatapi.com/v1/images/search?api_key=YOUR_API_KEY
//api key: d6UMByrl4eANDsX8UCdJzCqwHeH7zcdKlejRIUiVidyBfILxCyzTfjfMFsEyPhiI

const baseURL = 'https://api.thecatapi.com/v1/images/search?'
const apiKey = 'd6UMByrl4eANDsX8UCdJzCqwHeH7zcdKlejRIUiVidyBfILxCyzTfjfMFsEyPhiI';

let welcEl = document.getElementsByClassName('welcome-header');
let mainFormEl = document.getElementById('main-form');
let petDisplayEl = document.querySelector('.card');
let petCardHolderEl = document.querySelector('.card-body')
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
            imgEl.classList.add('card-img-top');
            // imgEl.classList.add('img-display');
            // imgEl.classList.add('img-thumbnail');
            imgEl.setAttribute('src', `${item.url}`);

            //append image to the div element as a child
            petDisplayEl.append(imgEl);

            const nameEl = document.createElement('h5');
            nameEl.innerText = `${item.breeds[0].name}`;
            nameEl.classList.add('card-title');

            const originEl = document.createElement('p');
            originEl.innerText = `Origin - ${item.breeds[0].origin}`;


            const altNameEl = document.createElement('p');
            altNameEl.innerText = `Alternative name - ${item.breeds[0].alt_names}`;


            const descEl = document.createElement('p');
            descEl.innerText = `${item.breeds[0].description}`;
            descEl.classList.add('card-text');

            const wikiEl = document.createElement('a');
            wikiEl.innerText = 'Wikipedia';
            wikiEl.setAttribute('href', `${item.breeds[0].wikipedia_url}`);
            wikiEl.setAttribute('target', "_blank");
            wikiEl.classList.add('btn');
            wikiEl.classList.add('btn-primary');

            petCardHolderEl.append(nameEl,descEl,wikiEl);

            petDisplayEl.append(petCardHolderEl);
            petDisplayEl.removeAttribute('style');
            petDisplayEl.setAttribute('style', 'width: 18rem');
            petDisplayEl.setAttribute('style', 'margin: 20px');


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
