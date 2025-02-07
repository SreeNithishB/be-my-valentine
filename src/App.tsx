"use client";
import { useState, useEffect } from "react";

// HeartRain component to create falling hearts
const HeartRain = () => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((prevHearts) => [
        ...prevHearts,
        {
          id: Date.now(),
          left: Math.random() * 100 + "vw", // Random position
          animationDuration: Math.random() * 3 + 4 + "s", // Random speed, starting at 4 seconds
        },
      ]);
    }, 3000); // Add new heart every 200ms for a smoother effect

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute text-red-500"
          style={{
            left: heart.left,
            fontSize: "24px",
            animation: `fall ${heart.animationDuration} linear infinite`,
          }}
        >
          ❤️
        </div>
      ))}
      <style jsx>{`
        @keyframes fall {
          0% {
            top: -10%;
            opacity: 0;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            top: 100%;
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default function Page() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const yesButtonSize = noCount * 20 + 16;

  const handleNoClick = () => {
    setNoCount(noCount + 1);
  };

  const getNoButtonText = () => {
    const phrases = [
      "No",
      "Are you sure?",
      "What if I asked really nicely?",
      "Pretty please",
      "With a chocolate mousse cake on top",
      "And a lot of Stuffed Toys?",
      "PLEASE En Chellamla? ♡",
      "But :(",
      "I'm gonna die",
      "Yep I'm dead",
      "ok ur talking to Nithish's ghost",
      "please babe",
      "babeee? :(",
      ":((((",
      "PRETTY PLEASE",
      "En Anbu Kadhalila? ♡",
      "No :(",
    ];

    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  return (
    <div className="-mt-16 flex h-screen flex-col items-center justify-center relative px-4 sm:px-8">
      {yesPressed ? (
        <>
          <img
            className="w-full max-w-[250px] sm:max-w-[400px]"
            src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif"
            alt="Bear Kiss"
          />
          <div className="my-4 text-3xl sm:text-4xl font-bold text-center">
            Woahh!!! I know you'll Say Yes ;))
          </div>
          <div className="my-4 text-3xl sm:text-4xl font-bold text-center">
            You're my favourite panni kutty ♡
          </div>
          <HeartRain /> {/* Add heart rain here */}
        </>
      ) : (
        <>
          <img
            className="h-[200px] w-full max-w-[250px] sm:max-w-[300px]"
            src="https://gifdb.com/images/high/cute-love-bear-roses-ou7zho5oosxnpo6k.gif"
            alt="Love Bear"
          />
          <h1 className="my-4 text-3xl sm:text-4xl text-center">Will you be my Valentine?</h1>
          <div className="flex flex-col sm:flex-row items-center">
            <button
              className={`mr-0 sm:mr-4 rounded bg-green-500 px-6 py-3 font-bold text-white hover:bg-green-700`}
              style={{ fontSize: yesButtonSize }}
              onClick={() => setYesPressed(true)}
            >
              Yes
            </button>
            <button
              onClick={handleNoClick}
              className="mt-4 sm:mt-0 rounded bg-red-500 px-6 py-3 font-bold text-white hover:bg-red-700"
            >
              {noCount === 0 ? "No" : getNoButtonText()}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
