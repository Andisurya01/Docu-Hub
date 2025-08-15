import React from "react";

export default function Background() {
  const [count, setCount] = React.useState(0);
  const colors = [100, 200, 300, 400, 300, 200, 100];
  const sizes = [20, 40, 60, 80, 60, 40, 20];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCount((c) => (c + 1) % colors.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [colors.length]);

  // Semua warna dimasukkan supaya Tailwind tidak menghapusnya
  const blueShades = {
    200: "bg-blue-200",
    300: "bg-blue-300",
    400: "bg-blue-400",
    500: "bg-blue-500",
    600: "bg-blue-600",
    700: "bg-blue-700",
    800: "bg-blue-800",
  };

  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      <div className="flex justify-center items-center w-screen min-h-screen blur-2xl">
        {Array.from({ length: colors.length }).map((_, index) => {
          const colorIndex = (index + count) % colors.length;
          const shade = colors[colorIndex];
          const size = sizes[index];

          return (
            <div
              key={index}
            //   style={{ width: `${size}px`, height: `${size}px` }}
              className={`${blueShades[shade]} rounded-full mx-4 w-full h-${size} transition-colors  duration-500`}
            />
          );
        })}
      </div>
    </div>
  );
}
