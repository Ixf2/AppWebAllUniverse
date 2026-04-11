import { useEffect, useState } from "react";
// import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import {
  getNews,
  getNewsByCategoryID,
  NEWS_CATEGORY_IDS,
  NEWS_CATEGORY_LABELS,
} from "../../services/firebase/NewsArticles";
import "./Home.css";

function Home() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    async function loadNews() {
      setLoading(true);

      try {
        let data = [];

        if (selectedCategory === "all") {
          data = await getNews({ max: 6 });
        } else {
          data = await getNewsByCategoryID(selectedCategory, { max: 6 });
        }

        setNews(data);
      } catch (error) {
        console.error("Error loading news:", error);
      } finally {
        setLoading(false);
      }
    }

    loadNews();
  }, [selectedCategory]);

  return (
    <>
      {/* <Header /> */}

      <main className="home">
        <section className="news-section">
          <div className="news-header">
            <h2>Latest News</h2>

            <div className="news-filter">
              <label htmlFor="categoryFilter">Category</label>
              <select
                id="categoryFilter"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All</option>
                <option value={NEWS_CATEGORY_IDS.PLANETS}>
                  {NEWS_CATEGORY_LABELS[NEWS_CATEGORY_IDS.PLANETS]}
                </option>
                <option value={NEWS_CATEGORY_IDS.STARS}>
                  {NEWS_CATEGORY_LABELS[NEWS_CATEGORY_IDS.STARS]}
                </option>
                <option value={NEWS_CATEGORY_IDS.NEBULAE}>
                  {NEWS_CATEGORY_LABELS[NEWS_CATEGORY_IDS.NEBULAE]}
                </option>
                <option value={NEWS_CATEGORY_IDS.MISSIONS}>
                  {NEWS_CATEGORY_LABELS[NEWS_CATEGORY_IDS.MISSIONS]}
                </option>
                <option value={NEWS_CATEGORY_IDS.BLACK_HOLES}>
                  {NEWS_CATEGORY_LABELS[NEWS_CATEGORY_IDS.BLACK_HOLES]}
                </option>
              </select>
            </div>
          </div>

          {loading ? (
            <p className="news-message">Loading news...</p>
          ) : news.length === 0 ? (
            <p className="news-message">No news found in this category.</p>
          ) : (
            <div className="news-grid">
              {news.map((item) => (
                <article key={item.id} className="news-card">
                  <img
                    src={item.imageURL}
                    alt={item.title}
                    className="news-image"
                  />

                  <div className="news-content">
                    <span className="news-category">{item.categoryLabel}</span>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Home;