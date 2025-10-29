const flakes = Array.from({ length: 120 }, (_, index) => {
  const left = (index * 83) % 100;
  const size = 3 + ((index * 7) % 6);
  const duration = 14 + (index % 12);
  const delay = -((index % 20) * 0.65);
  const opacity = 0.45 + ((index % 10) * 0.05);
  const sway = 18 + ((index * 13) % 32);

  return {
    id: index,
    style: {
      "--flake-left": `${left}%`,
      "--flake-size": `${size}px`,
      "--flake-duration": `${duration}s`,
      "--flake-delay": `${delay}s`,
      "--flake-opacity": opacity.toFixed(2),
      "--flake-sway": `${sway}px`,
    },
  };
});

export default function Snowfall() {
  return (
    <div className="snowfall" aria-hidden="true">
      {flakes.map((flake) => (
        <span key={flake.id} className="snowflake" style={flake.style} />
      ))}
    </div>
  );
}
