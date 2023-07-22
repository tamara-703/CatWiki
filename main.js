//api for cats
//basic: https://api.thecatapi.com/v1/images/search?api_key=YOUR_API_KEY
//api key: d6UMByrl4eANDsX8UCdJzCqwHeH7zcdKlejRIUiVidyBfILxCyzTfjfMFsEyPhiI

const baseURL = "https://api.thecatapi.com/v1/images/search?";
const apiKey =
  "d6UMByrl4eANDsX8UCdJzCqwHeH7zcdKlejRIUiVidyBfILxCyzTfjfMFsEyPhiI";

//grab main div element
const cardContainerEl = document.querySelector(".card-container");

//grab select element on change
document
  .querySelector(".cat-selection")
  .addEventListener("change", getSelectedValue);
function getSelectedValue(e) {
  let catBreed = e.target.value;

  let data = getCatAPI(catBreed);

  if (data) {
    //create main elements
    const cardEl = document.createElement("div");
    const cardBodyEl = document.createElement("div");
    const ulListEl = document.createElement("ul");

    data.then((result) => {
      result.map((item) => {
        cardEl.classList.add("card");

        cardBodyEl.classList.add("card-body");

        ulListEl.classList.add("list-group");
        ulListEl.classList.add("list-group-flush");
        ulListEl.classList.add("change-font");

        //image element
        const imgEl = document.createElement("img");
        imgEl.classList.add("card-img-top");
        imgEl.setAttribute("src", `${item.url}`);

        cardEl.append(imgEl);

        //h5 element
        const nameEl = document.createElement("h5");
        nameEl.innerText = `${item.breeds[0].name}`;
        nameEl.classList.add("card-title");

        //paragraph element
        const descEl = document.createElement("p");
        descEl.innerText = `${item.breeds[0].description}`;
        descEl.classList.add("card-text");

        //link element
        const wikiEl = document.createElement("a");
        wikiEl.innerText = "Wikipedia";
        wikiEl.setAttribute("href", `${item.breeds[0].wikipedia_url}`);
        wikiEl.setAttribute("target", "_blank");
        wikiEl.classList.add("btn");
        wikiEl.classList.add("btn-primary");

        //lists elements
        const originListEl = document.createElement("li");
        if (item.breeds[0].origin === "") {
          originListEl.innerText = `Origin - N/A`;
        } else {
          originListEl.innerText = `Origin - ${item.breeds[0].origin}`;
        }

        originListEl.classList.add("list-group-item");

        const altListEl = document.createElement("li");
        if (item.breeds[0].alt_names === "") {
          altListEl.innerText = `Alternative name(s) - N/A`;
        } else {
          altListEl.innerText = `Alternative name(s) - ${item.breeds[0].alt_names}`;
        }

        altListEl.classList.add("list-group-item");

        const affecListEl = document.createElement("li");
        let affectRating = getStarRating(item.breeds[0].affection_level)
        affecListEl.innerHTML = "Affection level - " + affectRating;
        affecListEl.classList.add("list-group-item");

        const adaptListEl = document.createElement("li");
        let adaptRating = getStarRating(item.breeds[0].adaptability)
        adaptListEl.innerHTML = "Adaptibility - " + adaptRating;
        adaptListEl.classList.add("list-group-item");

        const childListEl = document.createElement("li");
        let childRating = getStarRating(item.breeds[0].child_friendly)
        childListEl.innerHTML = "Child friendly - " + childRating;
        childListEl.classList.add("list-group-item");

        const dogListEl = document.createElement("li");
        let dogRating = getStarRating(item.breeds[0].dog_friendly);
        dogListEl.innerHTML = "Dog friendly - " + dogRating;
        dogListEl.classList.add("list-group-item");

        //add all list elements to the ul element
        ulListEl.append(
          originListEl,
          altListEl,
          affecListEl,
          adaptListEl,
          childListEl,
          dogListEl
        );

        cardBodyEl.append(ulListEl, nameEl, descEl, wikiEl);

        cardEl.append(cardBodyEl);
        cardEl.setAttribute(
          "style",
          "width: 50rem; margin: 20px 20px 20px 350px;"
        );

        //add all elements to the main div element
        cardContainerEl.prepend(cardEl);

        //check if the main div element is populated and remove the child if it
        //this is to make sure that each time the user selects a breed from the drop down list, the old one gets removed
        if(cardContainerEl.children.length > 1)
        {
            let lastChild = cardContainerEl.lastChild;
            console.log("last child " + lastChild);
            cardContainerEl.removeChild(lastChild);
        }


      });
    });
  } else {
    cardContainerEl
      .append(
        (document.createElement("h1").innerText =
          "We could not find any information on this cat. Try picking another one or clearing your selection.")
      );
  }
}

//get star icon rating for each characteristic level available
const getStarRating = (rating) => {

    let text = "";

    switch (rating)
    {
        case 5:
            text = "&#9733&#9733&#9733&#9733&#9733";
            break
        case 4:
            text = "&#9733&#9733&#9733&#9733&#9734";
            break
        case 3:
            text = "&#9733&#9733&#9733&#9734&#9734";
            break
        case 2:
            text = "&#9733&#9733&#9734&#9734&#9734";
            break
        case 1:
            text = "&#9733&#9734&#9734&#9734&#9734"
            break
        default:
            text = "&#9734&#9734&#9734&#9734&#9734"
    }

    return text;
};

//fetch api
const getCatAPI = async (catBreed) => {
  const resp = await fetch(
    `${baseURL}&breed_ids=${catBreed}&api_key=live_${apiKey}`
  );
  const data = resp.json();

  return data;
};

//clears breed selection upon clicking the event button
document.querySelector(".clear").addEventListener("click", () => {
    location.reload();
  });
