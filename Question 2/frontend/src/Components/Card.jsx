import React, { useState } from "react";
import "./Card.css";

function Card({ id, title, body, tags, reactions }) {
  return (
    <div className="column-card-container">
      <div className="column-card">
        <h3>ID: {id}</h3>
        <div className="title">
          <h3 className="title-h3">Title: {title}</h3>
        </div>
        <p className="desc">Body: {body}</p>
        <div className="tags-desc">
          <p>Tags: </p>
          <div className="tags">
            {tags.map((tag) => (
              <p>#{tag}</p>
            ))}
          </div>
        </div>
        <p className="reactions">
          <span>Reactions: </span>
          {reactions}
        </p>
      </div>
    </div>
  );
}

export default Card;
