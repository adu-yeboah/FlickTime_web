function CircularRating({ rating, color, size = 70 }) {
    const radius = (size - 8) / 2;
    const circumference = 2 * Math.PI * radius;
    const percentage = (rating / 10) * 100;
    const offset = circumference - (percentage / 100) * circumference;

    const getRatingColor = (val) => {
        if (val >= 7) return '#22c55e';
        if (val >= 5) return '#eab308';
        return '#ef4444';
    };

    const strokeColor = getRatingColor(rating);

    return (
        <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
            <svg className="transform -rotate-90" width={size} height={size}>
                <circle cx={size / 2} cy={size / 2} r={radius} stroke="#374151" strokeWidth="4" fill="transparent" />
                <circle
                    cx={size / 2} cy={size / 2} r={radius}
                    stroke={strokeColor} strokeWidth="4" fill="transparent"
                    strokeDasharray={circumference} strokeDashoffset={offset}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                />
            </svg>
            <div className="absolute flex flex-col items-center">
                <span className="text-lg font-extrabold text-white">{rating}</span>
                <span className="text-[8px] text-gray-400 -mt-1">/10</span>
            </div>
        </div>
    );
}

export default CircularRating;
