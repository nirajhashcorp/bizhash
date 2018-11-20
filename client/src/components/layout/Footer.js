import React from "react";

export default () => {
  return (
    <footer className="bg-dark text-white mt-5 p-4 text-center">
      Copyright &copy; {new Date().getFullYear()}
      <a href="/" target="_blank" title="MSRCOSMOS" rel="noopener noreferrer">
        <img
          src="/assets/images/Hashcorp.svg"
          alt=""
          style={{ width: "100px" }}
        />
      </a>
    </footer>
  );
};
