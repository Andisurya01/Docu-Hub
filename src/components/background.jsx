import React from "react";

export default function Background() {
  const [count, setCount] = React.useState(0);
  const colors = [
    "bg-blue-100", "bg-blue-200", "bg-blue-300", 
    "bg-blue-400", "bg-blue-300", "bg-blue-200", "bg-blue-100"
  ];
  const sizes = [5, 10, 15, 20, 15, 10, 5];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCount((c) => (c + 1) % colors.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [colors.length]);

  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      <div className="flex justify-center items-center w-screen min-h-screen">
        {Array.from({ length: colors.length }).map((_, index) => {
          const colorIndex = (index + count) % colors.length;
          const shade = colors[colorIndex];
          const size = sizes[index];

          return (
            <div
              key={index}
              className={`${shade} rounded-full mx-4 transition-colors duration-500`}
              style={{ width: `${size}rem`, height: `${size}rem` }}
            />
          );
        })}
      </div>
    </div>
  );
}
