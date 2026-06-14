import { useEffect, useState } from 'react';

function CircularRating({ rating, color, size = 70 }) {
    const [animated, setAnimated] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setAnimated(true), 100);
        return () => clearTimeout(t);
    }, []);

    const strokeWidth = size < 60 ? 3.5 : 4.5;
    const radius = (size - strokeWidth * 2) / 2;
    const circumference = 2 * Math.PI * radius;
    const percentage = Math.min(rating / 10, 1);
    const offset = animated ? circumference - percentage * circumference : circumference;

    const getRatingColor = (val) => {
        if (val >= 7.5) return '#22c55e';   // green
        if (val >= 6)   return '#eab308';   // yellow
        if (val >= 4)   return '#f97316';   // orange
        return '#ef4444';                   // red
    };

    const strokeColor = getRatingColor(rating);
    const cx = size / 2;
    const cy = size / 2;

    return (
        <div
            className="relative inline-flex items-center justify-center flex-shrink-0"
            style={{ width: size, height: size }}
            role="img"
            aria-label={`Rating: ${rating} out of 10`}
        >
            <svg
                width={size}
                height={size}
                className="transform -rotate-90"
                style={{ filter: `drop-shadow(0 0 6px ${strokeColor}60)` }}
            >
                {/* Track */}
                <circle
                    cx={cx} cy={cy} r={radius}
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                />
                {/* Progress */}
                <circle
                    cx={cx} cy={cy} r={radius}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dashoffset 1.1s cubic-bezier(0.4,0,0.2,1)' }}
                />
            </svg>

            {/* Center text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span
                    className="font-extrabold leading-none"
                    style={{
                        fontSize: size < 60 ? size * 0.26 : size * 0.28,
                        color: strokeColor,
                    }}
                >
                    {rating}
                </span>
                <span
                    className="text-gray-500 font-medium leading-none mt-0.5"
                    style={{ fontSize: size * 0.13 }}
                >
                    /10
                </span>
            </div>
        </div>
    );
}

export default CircularRating;