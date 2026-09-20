const Loader = ({ label }) => {
  return (
    <>
      <style>{`
        .loader-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 14px;
          padding: 40px 20px;
        }

        .loader-label {
          font-size: 0.85rem;
          color: #14231F;
          opacity: 0.7;
          margin: 0;
          font-family: system-ui, -apple-system, sans-serif;
        }

        /* HTML: <div class="loader6"></div> */
        .loader6 {
          width: 40px;
          height: 20px;
          --c: no-repeat radial-gradient(farthest-side, #2F6F5E 93%, #0000);
          background:
            var(--c) 0   0,
            var(--c) 50% 0;
          background-size: 8px 8px;
          position: relative;
          clip-path: inset(-200% -100% 0 0);
          animation: l6-0 1.5s linear infinite;
        }

        .loader6::before {
          content: "";
          position: absolute;
          width: 8px;
          height: 12px;
          background: #2F6F5E;
          left: -16px;
          top: 0;
          animation:
            l6-1 1.5s linear infinite,
            l6-2 0.5s cubic-bezier(0, 200, 0.8, 200) infinite;
        }

        .loader6::after {
          content: "";
          position: absolute;
          inset: 0 0 auto auto;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #3fd3d5;
          animation: l6-3 1.5s linear infinite;
        }

        @keyframes l6-0 {
          0%, 30%  { background-position: 0 0,    50% 0; }
          33%      { background-position: 0 100%, 50% 0; }
          41%, 63% { background-position: 0 0,    50% 0; }
          66%      { background-position: 0 0,    50% 100%; }
          74%, 100%{ background-position: 0 0,    50% 0; }
        }

        @keyframes l6-1 {
          90%  { transform: translateY(0); }
          95%  { transform: translateY(15px); }
          100% { transform: translateY(15px); left: calc(100% - 8px); }
        }

        @keyframes l6-2 {
          100% { top: -0.1px; }
        }

        @keyframes l6-3 {
          0%, 80%, 100% { transform: translate(0); }
          90%           { transform: translate(26px); }
        }

        @media (prefers-reduced-motion: reduce) {
          .loader6,
          .loader6::before,
          .loader6::after {
            animation: none;
          }
        }
      `}</style>

      <div className="loader-wrapper" role="status" aria-live="polite">
        <div className="loader6" />
        {label && <p className="loader-label">{label}</p>}
      </div>
    </>
  );
};

export default Loader;
