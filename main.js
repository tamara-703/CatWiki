//api for cats
//basic: https://api.thecatapi.com/v1/images/search?api_key=YOUR_API_KEY
//api key: d6UMByrl4eANDsX8UCdJzCqwHeH7zcdKlejRIUiVidyBfILxCyzTfjfMFsEyPhiI

const baseURL = 'https://api.thecatapi.com/v1/images/search?limit=10'
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
    })
}

document.querySelector('.checkSelectionCat').addEventListener('click', getValue);
document.querySelector('.checkSelectionDog').addEventListener('click',getValue);
function getValue(e) {

    let value = "dogs";

    if(e.currentTarget.checked === true && e.target.value === 'cats')
    {
        e.target.disabled = true;
        value = e.target.value;
        console.log(`you picked ${value}`);
        //where catAPI will be
    } else
    {
        e.target.disabled = true;
        console.log(`you picked ${value}`);
        //where dogAPI will be
    }

    processValue(value);
}

function processValue(value)
{
    console.log(`processing ${value}`);

    mainFormEl.addEventListener('submit', (e) => {
        e.preventDefault();

        if(value === 'cats')
        {
            console.log('you picked cats');
            const resp = getCatAPI();

                resp.then((result) => {
                console.log(result);

                result.map((item) => {
                const imgEl = document.createElement('img');
                imgEl.classList.add('img-display');
                imgEl.setAttribute('src', `${item.url}`);
                imgEl.setAttribute('width', '300px');

                petDisplayEl.append(imgEl);
                })

            })




            // dataArr.map((item) => {

            //     const imgEl = document.createElement('img');
            //     imgEl.classList.add('img-display');
            //     imgEl.setAttribute('src', `${item.url}`);
            //     imgEl.setAttribute('width', '300px');

            //     petDisplayEl.append(imgEl);


            // })

            // const imgEl = document.createElement('img');
            // imgEl.setAttribute('src', `${dataArr[0].url}`);
            // imgEl.setAttribute('width', '300px');

            // document.querySelector('.pet-display-container').append(imgEl);
            petDisplayEl.classList.remove('toggle-display');
            petDisplayEl.classList.add('pet-display-container');
            mainContainerEl.classList.remove('form-container');

            document.querySelector('.main-page-img').classList.add('toggle-display');


        } else
        {
            console.log('you picked dogs');
        }
    })
}

const getCatAPI = async (catBreed) => {

    const resp = await fetch(`${baseURL}&breed_ids=${catBreed}&api_key=live_${apiKey}`);
    const data = resp.json();

    return data;
}
