import React, { Suspense } from "react";

const Card = ({ url_image, title, description, key }) => {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <div class="card" key={key}>
        <img src={url_image} alt={title} className="card-image" />
        <div className="card-content">
          <h2 className="card-title">{title}</h2>
          <p className="card-text">{description}</p>
        </div>
      </div>
    </Suspense>
  );
};

export default Card;
