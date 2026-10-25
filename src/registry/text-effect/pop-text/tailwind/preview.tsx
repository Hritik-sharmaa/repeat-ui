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
      <h1 className="pop-text-title text-7xl leading-[1] [perspective:500px] font-bold text-center">
        <span className="pop-word block">{maintext}</span>
        <span className="pop-word block px-8 text-yellow-500">{subText}</span>
      </h1>

      <style>{`
        @keyframes rui-pop-word {
          to {
            transform: rotateX(0);
          }
        }

        @keyframes rui-show {
          to {
            opacity: 1;
          }
        }

        @keyframes rui-bar-scale {
          to {
            transform: scaleY(1);
          }
        }

        .pop-word {
          animation: rui-show 0.01s forwards, rui-pop-word 1.5s forwards;
          animation-timing-function: cubic-bezier(0.14, 1.23, 0.33, 1.16);
          opacity: 0;
          transform: rotateX(120deg);
          transform-origin: 50% 100%;
        }

        .pop-word:nth-of-type(2) {
          animation-delay: 1s;
        }

        @media screen and (max-width: 600px) {
          .pop-text-title {
            font-size: 5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default PopText;
