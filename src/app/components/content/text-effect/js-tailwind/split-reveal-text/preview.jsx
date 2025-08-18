"use client";

const SplitRevealText = ({ outerText, innerText, className = "" }) => {
  return (
    <div className={`relative ${className}`}>
      <h2 className="m-0 p-0 absolute top-1/2 left-1/2 -translate-x-1/2 font-bold -translate-y-1/2 text-[6em] uppercase text-transparent group">
        {outerText}
        <span
          className="absolute top-0 left-0 text-orange-400 transition-all duration-500 overflow-hidden group-hover:-translate-y-[18px]"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)" }}>
          {outerText}
        </span>
        <span
          className="absolute top-0 left-0 text-orange-400 transition-all duration-500 overflow-hidden group-hover:translate-y-[18px]"
          style={{ clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)" }}>
          {outerText}
        </span>
        <span className="absolute top-1/2 left-0 -translate-y-1/2 scale-y-0 w-[96%] text-black bg-lime-400 text-[15px] pl-[10px] font-medium tracking-[0.7em] text-center transition-all duration-500 group-hover:scale-y-100">
          {innerText}
        </span>
      </h2>
    </div>
  );
};

export default SplitRevealText;
