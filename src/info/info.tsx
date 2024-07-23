import React from "react";
import { ReactComponent as SplashIcon } from "../splash-icon.svg";

function Info({ isDarkMode }: any) {
  return (
    <div className="flex flex-col justify-center items-center h-[450px] md:mt-0 mt-2">
      <div
        className={
          isDarkMode
            ? "h-full w-full p-4 rounded-3xl flex flex-col justify-center items-center md:h-72 md:w-[40rem]"
            : "bg-sky-400 bg-opacity-40 h-full w-full p-4 rounded-3xl flex flex-col justify-center items-center md:h-72 md:w-[40rem]"
        }
      >
        <div className="size-40 my-4">
          <SplashIcon />
        </div>
        <div className="text-white text-center my-4">
          Explore current weather data and 4,5-day forecast of more than 200,000
          cities!
        </div>
      </div>
    </div>
  );
}

export default Info;
