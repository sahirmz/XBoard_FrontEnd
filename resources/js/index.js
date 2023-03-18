const getId = () => Math.random().toString(36).substr(2, 9);



const getAccordionItem = (title, id) => {
  return `
  <div class="accordion-item" id="card${id}">
  <h2 class="accordion-header" id="heading${id}">
    <button
      class="btn btn-link"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#collapse${id}"
      aria-expanded="true"
      aria-controls="collapse${id}"
    >
  ${title}
</button>
  </h2>
  <div id="collapse${id}" class="accordion-collapse collapse" aria-labelledby="heading${id}" data-parent="#accordionId">
  </div>
</div>
  `;
};


const getCarouselOuter = (id, innerId) => {
  return `
  <div class="carousel slide" id="carouselControls${id}" data-bs-ride="carousel">
  <div class="carousel-inner" id="${innerId}"></div>

  <button class="carousel-control-prev" type="button" data-bs-target="#carouselControls${id}" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselControls${id}" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
  `;
};

const getCarouselItem = (id, active) => {
  return `
  <div class="carousel-item ${active? "active":""}" id="${id}">
  </div>
  `;
};



let getCard = (item) => {
  return `
  <div class="card d-block">
  <img src="${item["enclosure"]["link"]}" alt="..." class="card-img-top img-fluid carousel-img">
  <div class="card-body">
    <h5 class="card-title">${item.title}</h5>
    <p class="card-text"><small class="text-muted">${item.author} - ${item["pubDate"]}</small></p>
    <p class="card-text">${item['description']}</p>
    <a href="${item["link"]}" class="stretched-link" target="_blank"></a>
  </div>
</div>
  `;
};

const addContent = async() => {

  for (let index = 0; index < magazines.length; index++) {
    let url = magazines[index];
    console.log("url", url);
    const response = await fetch (`https://api.rss2json.com/v1/api.json?rss_url=${encodeURI(url)}`);
    const data = await response.json();

    //add accordion Item
    const accordionItemId = getId();
    const accordionItem = getAccordionItem(data.feed.title, accordionItemId);
    document.getElementById("accordionId").innerHTML += accordionItem;


    //oprn first accordion item by default
    if(index === 0){
      document.getElementById(`collapse${accordionItemId}`).classList.add('show');
    }

    //Create Carousel

    const carouselId = getId();
    let carouselInnerId = getId();
    const carousel = getCarouselOuter(carouselId, carouselInnerId);
    document.getElementById(`collapse${accordionItemId}`).innerHTML = carousel;

    //add the cards in carousel

    const items = data.items;
    for (const itemIdx in items){
      

      const carouselItemId = getId();
      const carouselItem = getCarouselItem(carouselItemId, itemIdx == 0);

    // place Carousel item inside carousle
    
      document.getElementById(carouselInnerId).innerHTML += carouselItem;
      const card = getCard(items[itemIdx]);
      document.getElementById(carouselItemId).innerHTML += card;
    // }
    }
  }
};

addContent();