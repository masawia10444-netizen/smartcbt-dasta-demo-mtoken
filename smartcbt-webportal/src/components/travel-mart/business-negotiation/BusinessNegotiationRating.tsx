"use client";

import { useEffect, useState } from "react";

type BusinessNegotiationRatingProps = {
  defaultRating: number;
  totalStars: number;
  onChange?: (rating: number) => Promise<void>;
  viewOnly?: boolean;
};

const BusinessNegotiationRating = ({
  defaultRating,
  totalStars,
  onChange,
  viewOnly = false,
}: BusinessNegotiationRatingProps) => {
  const [rating, setRating] = useState<number>(defaultRating);
  const [hover, setHover] = useState<number>(0);
  const [editable, setEditable] = useState<boolean>(true);

  useEffect(() => {
    if (defaultRating > 0 && !viewOnly) {
      setEditable(false);
    } else if (viewOnly) {
      setEditable(false);
    }
  }, [defaultRating]);

  const handleRatingChange = (currentRating: number) => {
    if (editable) {
      setRating(currentRating);
      if (onChange) onChange(currentRating);
    }
  };

  return (
    <>
      {[...Array(totalStars)].map((star, index) => {
        const currentRating = index + 1;

        return (
          <label key={index}>
            <input
              key={star}
              type="radio"
              name="rating"
              className="hidden"
              value={currentRating}
              onChange={() => handleRatingChange(currentRating)}
              disabled={!editable}
            />
            <span
              className="star"
              style={{
                color: currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9",
                cursor: editable ? "pointer" : "default",
              }}
              onMouseEnter={() => editable && setHover(currentRating)}
              onMouseLeave={() => editable && setHover(0)}
            >
              &#9733;
            </span>
          </label>
        );
      })}
    </>
  );
};

export default BusinessNegotiationRating;
