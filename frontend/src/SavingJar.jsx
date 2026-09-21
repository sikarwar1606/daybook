import { useId } from "react";

const JAR_PATH =
  "M120 78 L120 100 Q100 106 100 130 L100 306 Q100 340 134 340 L246 340 Q280 340 280 306 L280 130 Q280 106 260 100 L260 78 Z";

const WAVE_A =
  "M0 0 q22.5 -7 45 0 t45 0 t45 0 t45 0 t45 0 t45 0 t45 0 t45 0 V200 H0 Z";
const WAVE_B =
  "M0 0 q22.5 6 45 0 t45 0 t45 0 t45 0 t45 0 t45 0 t45 0 t45 0 V200 H0 Z";

// Coins resting at the bottom of the jar, in the order they "stack up".
const PILE = [
  { cx: 140, cy: 328, rx: 26, ry: 8 },
  { cx: 190, cy: 330, rx: 26, ry: 8 },
  { cx: 240, cy: 328, rx: 26, ry: 8 },
  { cx: 164, cy: 319, rx: 24, ry: 7.5 },
  { cx: 216, cy: 319, rx: 24, ry: 7.5 },
  { cx: 190, cy: 310, rx: 22, ry: 7 },
];

const CSS = `
.sj-slosh{transform-origin:190px 250px;animation:sj-slosh 4.5s ease-in-out infinite alternate}
.sj-w1{animation:sj-wl 3.4s linear infinite}
.sj-w2{animation:sj-wr 4.8s linear infinite}
.sj-drop{opacity:0;animation:sj-drop 6s cubic-bezier(.5,0,.9,.6) infinite}
.sj-spin{transform-origin:190px 60px;animation:sj-spin .9s linear infinite}
.sj-b1{opacity:0;animation:sj-rise 4s ease-in infinite}
.sj-b2{opacity:0;animation:sj-rise 5.2s ease-in 1.5s infinite}
.sj-b3{opacity:0;animation:sj-rise 4.6s ease-in 3s infinite}
@keyframes sj-slosh{from{transform:rotate(-1.3deg)}to{transform:rotate(1.3deg)}}
@keyframes sj-wl{from{transform:translateX(0)}to{transform:translateX(-90px)}}
@keyframes sj-wr{from{transform:translateX(-90px)}to{transform:translateX(0)}}
@keyframes sj-spin{0%{transform:scaleX(1)}50%{transform:scaleX(.2)}100%{transform:scaleX(1)}}
@keyframes sj-drop{
  0%{transform:translateY(0);opacity:0}
  4%{opacity:1}
  42%{transform:translateY(238px);opacity:1}
  50%{transform:translateY(246px);opacity:0}
  100%{transform:translateY(246px);opacity:0}
}
@keyframes sj-rise{
  0%{transform:translateY(0);opacity:0}
  15%{opacity:.7}
  85%{opacity:.5}
  100%{transform:translateY(-95px);opacity:0}
}
@media (prefers-reduced-motion:reduce){
  .sj-slosh,.sj-w1,.sj-w2,.sj-drop,.sj-spin,.sj-b1,.sj-b2,.sj-b3{animation:none}
}
`;

/**
 * Animated glass saving jar with gently waving water.
 *
 * Props (all optional):
 *  - fill:        0–1, how full the jar is with water (default 0.65)
 *  - coins:       0–6, how many coins rest on the bottom (default 6)
 *  - label:       text on the jar's label; empty string hides it (default "Savings")
 *  - lidColor:    lid fill color (default coral)
 *  - waterColor:  base water color (default blue)
 *  - showFalling: show the coin that drops in periodically (default true)
 *  - outlineColor: glass outline color (default soft blue-grey)
 *  - className:   extra class names on the <svg> (e.g. Tailwind drop-shadow)
 *  - width:       CSS width of the SVG (default "100%")
 *  - maxWidth:    CSS max-width of the SVG (default 380)
 */
export default function SavingJar({
  fill = 0.65,
  coins = 0,
  label = "Savings",
  lidColor = "#E4665A",
  waterColor = "#3F98CC",
  showFalling = true,
  outlineColor = "#7FA9BF",
  className = "",
  width = "100%",
  maxWidth = 380,
}) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const clipId = `sj-clip-${uid}`;

  const clamped = Math.min(1, Math.max(0, fill));
  const level = 340 - clamped * 230; // y of the water surface (110 = full, 340 = empty)
  const pile = PILE.slice(0, Math.min(PILE.length, Math.max(0, coins)));

  return (
    <svg
      width={width}
      className={className}
      viewBox="0 0 380 380"
      role="img"
      aria-label="Glass saving jar with gently waving water"
      style={{ display: "block", maxWidth, margin: "0 auto" }}
    >
      <title>Glass saving jar with gently waving water</title>
      <style>{CSS}</style>
      <defs>
        <clipPath id={clipId}>
          <path d={JAR_PATH} />
        </clipPath>
      </defs>

      {/* Ground shadow */}
      <ellipse cx="190" cy="350" rx="105" ry="9" fill="#000" opacity="0.09" />

      {/* Glass body tint */}
      <path d={JAR_PATH} fill="#DDEFF7" opacity="0.4" />

      <g clipPath={`url(#${clipId})`}>
        {/* Coin pile (sits under the water so it's tinted) */}
        <g fill="#F2B93B" stroke="#B9861A" strokeWidth="1.2">
          {pile.map((c, i) => (
            <ellipse key={i} cx={c.cx} cy={c.cy} rx={c.rx} ry={c.ry} />
          ))}
        </g>
        <g fill="none" stroke="#FFDB78" strokeWidth="1.2">
          {pile.slice(3).map((c, i) => (
            <ellipse key={i} cx={c.cx} cy={c.cy} rx={c.rx - 9} ry={c.ry - 3.5} />
          ))}
        </g>

        {/* Falling coin, emerges from beneath the lid */}
        {showFalling && (
          <g className="sj-drop">
            <g className="sj-spin">
              <circle cx="190" cy="60" r="14" fill="#F2B93B" stroke="#B9861A" strokeWidth="1.5" />
              <circle cx="190" cy="60" r="8" fill="none" stroke="#FFDB78" strokeWidth="1.5" />
            </g>
          </g>
        )}

        {/* Water: two offset wave layers, sloshing slightly */}
        <g className="sj-slosh">
          <g transform={`translate(75,${level - 4})`}>
            <g className="sj-w2">
              <path d={WAVE_B} fill={waterColor} opacity="0.55" />
            </g>
          </g>
          <g transform={`translate(60,${level + 2})`}>
            <g className="sj-w1">
              <path d={WAVE_A} fill={waterColor} opacity="0.72" />
            </g>
          </g>
        </g>

        {/* Bubbles */}
        <circle className="sj-b1" cx="150" cy="300" r="4" fill="#fff" />
        <circle className="sj-b2" cx="228" cy="296" r="3" fill="#fff" />
        <circle className="sj-b3" cx="196" cy="290" r="2.5" fill="#fff" />
      </g>

      {/* Paper label */}
      {label && (
        <g>
          <rect x="140" y="132" width="100" height="32" rx="4" fill="#FFF7E6" stroke="#D9C9A3" strokeWidth="1" />
          <text
            x="190"
            y="153"
            textAnchor="middle"
            fontSize="14"
            fontWeight="500"
            fill="#5A4A2A"
            style={{ fontFamily: "inherit" }}
          >
            {label}
          </text>
        </g>
      )}

      {/* Glass highlights */}
      <rect x="110" y="128" width="7" height="140" rx="3.5" fill="#fff" opacity="0.55" />
      <rect x="110" y="278" width="7" height="14" rx="3.5" fill="#fff" opacity="0.55" />
      <rect x="263" y="130" width="4" height="90" rx="2" fill="#fff" opacity="0.35" />

      {/* Glass outline */}
      <path d={JAR_PATH} fill="none" stroke={outlineColor} strokeWidth="2.5" />

      {/* Lid with coin slot */}
      <rect x="112" y="48" width="156" height="32" rx="6" fill={lidColor} stroke="#00000033" strokeWidth="1.5" />
      <line x1="124" y1="72" x2="256" y2="72" stroke="#00000033" strokeWidth="1" />
      <rect x="158" y="57" width="64" height="7" rx="3.5" fill="#00000066" />
    </svg>
  );
}
