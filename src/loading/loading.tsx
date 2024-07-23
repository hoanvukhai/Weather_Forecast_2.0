import React from "react";
import loadingIcon from "../loading.svg";
import loadingIcon2 from "../loading2.svg";

function Loading({ isDarkMode }: any) {
  return (
    <div
      className={
        isDarkMode
          ? "fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-90 z-50"
          : "fixed inset-0 flex justify-center items-center bg-sky-100 bg-opacity-80 z-50"
      }
    >
      <img
        src={isDarkMode ? loadingIcon2 : loadingIcon}
        alt=""
        className="fixed App-logo"
      />
    </div>
  );
}

export default Loading;
