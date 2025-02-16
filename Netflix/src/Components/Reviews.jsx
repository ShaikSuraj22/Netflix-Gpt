import React from "react";
import { useSelector } from "react-redux";

const Reviews = () => {
  const reviews = useSelector((store) => store.movies.review);
  if (!reviews || reviews.length === 0) {
    return <p>No reviews available.</p>;
  }
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">User Reviews</h2>
      {reviews.map((review) => (
        <div key={review.id} className="border-b border-gray-300 pb-4 mb-4">
          <div className="flex items-center gap-3 mb-2">
            <img
              src={`https://image.tmdb.org/t/p/w45${review.author_details.avatar_path}`}
              alt={review.author}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h3 className="font-semibold">{review.author}</h3>
              <p className="text-sm text-gray-500">
                Rating: {review.author_details.rating}/10
              </p>
            </div>
          </div>
          <p className="text-gray-700">{review.content}</p>
          <a
            href={review.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Read full review
          </a>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
