'use client';

import React, { useState } from 'react';

interface StarRatingProps {
    rating: number;
    maxRating?: number;
    size?: number;
    interactive?: boolean;
    onChange?: (rating: number) => void;
    color?: string;
}

export default function StarRating({
    rating,
    maxRating = 5,
    size = 18,
    interactive = false,
    onChange,
    color = '#f59e0b' // yellow-500
}: StarRatingProps) {
    const [hoverRating, setHoverRating] = useState(0);

    const stars = Array.from({ length: maxRating }, (_, i) => i + 1);

    return (
        <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            {stars.map((star) => {
                const isFilled = star <= (interactive && hoverRating > 0 ? hoverRating : rating);
                return (
                    <span
                        key={star}
                        onClick={() => interactive && onChange && onChange(star)}
                        onMouseEnter={() => interactive && setHoverRating(star)}
                        onMouseLeave={() => interactive && setHoverRating(0)}
                        style={{
                            fontSize: size,
                            color: isFilled ? color : '#d1d5db', // gray-300
                            cursor: interactive ? 'pointer' : 'default',
                            transition: 'transform 0.1s ease',
                            transform: interactive && (hoverRating === star || (hoverRating === 0 && rating === star)) ? 'scale(1.1)' : 'scale(1)'
                        }}
                    >
                        {isFilled ? '★' : '☆'}
                    </span>
                );
            })}
        </div>
    );
}
