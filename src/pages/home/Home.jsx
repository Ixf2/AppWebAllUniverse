import { useEffect, useState } from "react";
// import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Card from "../../components/card/Card";
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

  const categories = [
    { id: "all", label: "All" },
    { id: NEWS_CATEGORY_IDS.PLANETS, label: NEWS_CATEGORY_LABELS[NEWS_CATEGORY_IDS.PLANETS] },
    { id: NEWS_CATEGORY_IDS.STARS, label: NEWS_CATEGORY_LABELS[NEWS_CATEGORY_IDS.STARS] },
    { id: NEWS_CATEGORY_IDS.NEBULAE, label: NEWS_CATEGORY_LABELS[NEWS_CATEGORY_IDS.NEBULAE] },
    { id: NEWS_CATEGORY_IDS.MISSIONS, label: NEWS_CATEGORY_LABELS[NEWS_CATEGORY_IDS.MISSIONS] },
    { id: NEWS_CATEGORY_IDS.BLACK_HOLES, label: NEWS_CATEGORY_LABELS[NEWS_CATEGORY_IDS.BLACK_HOLES] },
  ];

  return (
    <>
      {/* <Header /> */}

      <main className="home">
        <section className="news-section">
          <div className="news-top">
            <h2 className="news-title">Latest News</h2>

            <div className="categories-list">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`category-button ${
                    selectedCategory === category.id ? "active" : ""
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <p className="news-message">Loading news...</p>
          ) : news.length === 0 ? (
            <p className="news-message">No news available in this category.</p>
          ) : (
            <div className="news-grid">
              {news.map((item) => (
                <Card key={item.id} item={item} />
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