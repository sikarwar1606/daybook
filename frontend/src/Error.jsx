import { useState, useEffect } from "react";

const Error = () => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.style.setProperty("--bg-color", "#050505");
      root.style.setProperty("--text-color", "#fff");
    } else {
      root.style.setProperty("--bg-color", "#fff");
      root.style.setProperty("--text-color", "#000");
    }
  }, [theme]);

  return (
    <>
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Fira+Sans:wght@200;500&display=swap");

        * { margin: 0; padding: 0; box-sizing: border-box; }

        :root {
          --primary-color: #faca2e;
          --eye-pupil-color: #050505;
          --bg-color: #fff;
          --text-color: #000;
          --fs-heading: 36px;
          --fs-text: 26px;
          --fs-button: 18px;
          --fs-icon: 30px;
          --pupil-size: 30px;
          --eye-size: 80px;
          --button-padding: 15px 30px;
        }

        @media only screen and (max-width: 567px) {
          :root {
            --fs-heading: 30px;
            --fs-text: 22px;
            --fs-button: 16px;
            --fs-icon: 24px;
            --button-padding: 12px 24px;
          }
        }

        body {
          display: flex;
          min-height: 100vh;
          background-color: var(--bg-color);
          color: var(--text-color);
          font-family: "Fira Sans", sans-serif;
        }

        .error-page {
          margin: auto;
        }

        .error-page .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          row-gap: 30px;
          text-align: center;
        }

        .error-page__heading-title {
          text-transform: capitalize;
          font-size: var(--fs-heading);
          font-weight: 500;
          color: var(--primary-color);
        }

        .error-page__heading-description {
          margin-top: 10px;
          font-size: var(--fs-text);
          font-weight: 200;
        }

        .error-page__button {
          color: inherit;
          text-decoration: none;
          border: 1px solid var(--primary-color);
          font-size: var(--fs-button);
          font-weight: 200;
          padding: var(--button-padding);
          border-radius: 15px;
          box-shadow: 0px 7px 0px -2px var(--primary-color);
          transition: all 0.3s ease-in-out;
          text-transform: capitalize;
          display: inline-block;
        }

        .error-page__button:hover {
          box-shadow: none;
          background-color: var(--primary-color);
          color: #fff;
        }

        .eyes {
          display: flex;
          justify-content: center;
          gap: 2px;
        }

        .eye {
          width: var(--eye-size);
          height: var(--eye-size);
          background-color: var(--primary-color);
          border-radius: 50%;
          display: grid;
          place-items: center;
        }

        .eye__pupil {
          width: var(--pupil-size);
          height: var(--pupil-size);
          background-color: var(--eye-pupil-color);
          border-radius: 50%;
          animation: movePupil 2s infinite ease-in-out;
          transform-origin: center center;
        }

        @keyframes movePupil {
          0%, 100% { transform: translate(0, 0); }
          25%       { transform: translate(-10px, -10px); }
          50%       { transform: translate(10px, 10px); }
          75%       { transform: translate(-10px, 10px); }
        }

        .color-switcher {
          position: fixed;
          top: 40px;
          right: 40px;
          background-color: transparent;
          font-size: var(--fs-icon);
          cursor: pointer;
          color: var(--primary-color);
          border: 0;
        }
      `}</style>

      <main className="error-page">
        <div className="container">
          <div className="eyes">
            <div className="eye">
              <div className="eye__pupil eye__pupil--left"></div>
            </div>
            <div className="eye">
              <div className="eye__pupil eye__pupil--right"></div>
            </div>
          </div>

          <div className="error-page__heading">
            <h1 className="error-page__heading-title">Looks like you're lost</h1>
            <p className="error-page__heading-description">404 error</p>
          </div>

          <a
            className="error-page__button"
            href="/"
            aria-label="back to home"
            title="back to home"
          >
            back to home
          </a>
        </div>
      </main>

      <button
        className="color-switcher"
        onClick={toggleTheme}
        aria-label="toggle theme"
      >
        {theme === "light" ? "🌙" : "☀️"}
      </button>
    </>
  );
};

export default Error;   