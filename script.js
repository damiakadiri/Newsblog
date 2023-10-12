const API_KEY = "79a0bf0a3fe9484c97e4dd331f501caf";
const allNews = document.getElementById("home");
const selectedNews = document.getElementById("selected");
const form = document.getElementById("form");
const search = document.getElementById("search");
// const searchBtn = document.getElementById("searchBtn");

const NewsArticles = document.querySelector(".news-articles");
const NewsArticle = document.querySelector(".news-article");

const API_URL =
  // "https://newsapi.org/v2/top-headlines?country=us&category=general&apiKey=79a0bf0a3fe9484c97e4dd331f501caf";

const SEARCH_URL =
  // "https://newsapi.org/v2/everything?q='from=2023-10-10&sortBy=popularity&apiKey=79a0bf0a3fe9484c97e4dd331f501caf";

getNews(API_URL);

async function getNews(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();

  // console.log(data.articles);
  showNews(data.articles.slice(0, 9));
}

function showNews(News) {
  NewsArticles.innerHTML = "";
  News.forEach((item) => {
    const { author, title, description, publishedAt, urlToImage, url } = item;
    const source = item.source.name;

    const markup = `
    <hr />
        <div class="news-article">
          <div class="news-article-headline">
            <p class="source">${source}</p>
            <h3 class="headline">
            ${title}
            </h3>
            <h6 class="author">${author}</h6>
            <p class="time-date">${publishedAt}</p>
          </div>
          <div class="news-article-description">
            <p class="description">
             ${description}
            </p>
          </div>
          <div class="news-article-image">
            <img
              class="news-img"
              src="${urlToImage}"
              alt="${url}"
            />
          </div>
        </div>

    `;
    NewsArticles.insertAdjacentHTML("afterbegin", markup);
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const searchTerm = search.value.trim();

  if (searchTerm !== "") {
    // const SEARCH_URL = `https://newsapi.org/v2/everything?q=${searchTerm}&from=2023-10-10&sortBy=popularity&apiKey=79a0bf0a3fe9484c97e4dd331f501caf`;
    try {
      const data = await fetch(SEARCH_URL);
      if (!data.ok) {
        throw new Error(`HTTP error! status: ${data.status}`);
      }
      const searchData = await data.json();
      showNews(searchData.articles.slice(0, 9));
    } catch (error) {
      console.error("Error fetching search results:", error);
    }

    search.value = "";
  } else {
    window.location.reload();
  }
});

allNews.addEventListener("click", function () {
  getNews(API_URL);
});

// selectedNews.addEventListener("click", function () {});
