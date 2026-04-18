import "./Card.css"

function Card({ item }) {
  return (
      <div className="news-card">
      <div className="news-card-media">
        {item.imageURL ? (
          <img
          src={item.imageURL}
          alt={item.title}
          className="news-card-image"
          />
        ) : (
          <div className="news-card-image" />
        )}
      </div>

      <div className="news-card-content">
        <span className="news-card-category">{item.categoryLabel}</span>
        <h3 className="news-card-title">{item.title}</h3>
        <p className="news-card-description">{item.description}</p>
        <div className="news-card-bottom-line"></div>
      </div>
        </div>
  );
}

export default Card;