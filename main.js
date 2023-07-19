//api for cats
//basic: https://api.thecatapi.com/v1/images/search?api_key=YOUR_API_KEY
//api key: d6UMByrl4eANDsX8UCdJzCqwHeH7zcdKlejRIUiVidyBfILxCyzTfjfMFsEyPhiI

const baseURL = 'https://api.thecatapi.com/v1/images/search?api_key=live_'
const apiKey = 'd6UMByrl4eANDsX8UCdJzCqwHeH7zcdKlejRIUiVidyBfILxCyzTfjfMFsEyPhiI';

let welcEl = document.getElementsByClassName('welcome-header');
let mainFormEl = document.getElementById('main-form');

//invoked upon making a change to the selection in the form
// document.addEventListener('change', getSelectedValue)
// function getSelectedValue(e) {
//     console.log(e.target);
// }

//invoked upon submitting the form
document.addEventListener('submit', processForm);
function processForm(e)
{
    e.preventDefault();
    console.log(e.target);

}

document.addEventListener('change', getSelectedValue)
function getSelectedValue(e)
{
    console.log(e.target.children[1].value);

    if(e.target.children[1].value === 'cat')
    {
        console.log('getting cat api...');
        const resp = getCatAPI().then(result => {
            console.log(result);
        })

    }

}

const getCatAPI = async () => {

    const resp = await fetch(`${baseURL}${apiKey}`).then(data => {
        const response = data.json();
        return response;
    })

    return resp;



}
