var window = document.querySelector("window");
var products_page = document.getElementById("products_container");
var search = document.getElementById("search_input");
var container = document.getElementById("container_main");
var select_input = document.getElementById("selected");
var data = [];

window.addEventListener("load", () => {
  axios.get(`https://dummyjson.com/products/categories`).then((res) => {
    console.log(res.data);
    res.data.forEach((element) => {
      select_input.innerHTML += `
            <option value="${element}">${element}</option>
            `;
    });
  });
});
select_input.addEventListener("change", (element) => {
  axios
    .get(`https://dummyjson.com/products/category/${element.target.value}`)
    .then((res) => {
      console.log(res.data.products);
      writeData(res.data.products);
    });
});

function writeData(data) {
  products_page.innerHTML = "";
  data.map((e, i) => {
    //   console.log(e);
    products_page.innerHTML += `
                 <div class="products" > 
                <div class="listNumber">${e.id}</div>
                <img src="${e.images[0]}" alt="" id="pr_image" />
                <div class="productInfo">
                  <div class="product">
                    <div class="nameAndRate">
                      <span id="pr_name">${e.title}</span>
                      <span id="pr_rate">${e.price}</span>
                    </div>
                    <div class="productInfoTxt">
                     ${e.description}
                     ${e.category}
                    </div>
                  </div>
                </div>
                <div class="scoreBox">
                  <div class="score">
                    <span id="score_point">${e.rating}</span>
                    <span id="score_txt">score</span>
                  </div>
                  <div class="moreInfoBtn">
                    <button id="more_info_btn"><p>More info</p></button>
                  </div>
                  <p id="comp_price">Compare prices</p>
                </div>
                </div>
                </div>
    
                `;
  });
}

window.addEventListener("load", () => {
  axios.get("https://dummyjson.com/products").then((res) => {
    data = res.data.products;
    // console.log(data);
    writeData(data);
  });
});

// search.addEventListener("input", (e) => {
//   let filteredData = data.filter((item) =>
//     Object.values(item)
//       .join("")
//       .toLowerCase()
//       .includes(e.target.value.toLowerCase())
//   );
//   console.log(e.target.value);
//   if (filteredData.length > 0) {
//     writeData(filteredData);
//   } else {
//     products_page.innerHTML = `<div class="products" > "Tapilmadi..." </div>`;
//   }
// });

function searchSoz(soz) {
  axios.get(`https://dummyjson.com/products/search?q=${soz}`).then((res) => {
    console.log(res.data.products);
    writeData(res.data.products);
  });
}
search.addEventListener("input", (e) => {
  searchSoz(e.target.value);
});
