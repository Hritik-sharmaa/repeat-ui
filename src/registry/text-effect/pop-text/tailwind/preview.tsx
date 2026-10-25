"use client";

const PopText = ({
  maintext,
  subText,
  className = "",
}: {
  maintext?: string;
  subText?: string;
  className?: string;
}) => {
  return (
    <div className={`${className}`}>
      <h1 className="text-7xl leading-[1] [perspective:500px] font-bold text-center">
        <span className="word block">{maintext}</span>
        <span className="word block px-8 text-yellow-500">{subText}</span>
      </h1>

      <style jsx>{`
        @keyframes pop-word {
          to {
            transform: rotateX(0);
          }
        }

        @keyframes show {
          to {
            opacity: 1;
          }
        }

        @keyframes bar-scale {
          to {
            transform: scaleY(1);
          }
        }

        .word {
          animation: show 0.01s forwards, pop-word 1.5s forwards;
          animation-timing-function: cubic-bezier(0.14, 1.23, 0.33, 1.16);
          opacity: 0;
          transform: rotateX(120deg);
          transform-origin: 50% 100%;
        }

        .word:nth-of-type(2) {
          animation-delay: 1s;
        }

        @media screen and (max-width: 600px) {
          h1 {
            font-size: 5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default PopText;
