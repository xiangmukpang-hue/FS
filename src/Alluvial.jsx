import { useMemo, useRef, useState } from "react";

const NODE_W = 16;
const COL_GAP = 260;
const NODE_GAP = 8;
const PAD_TOP = 34;
const PAD_LEFT = 12;
const LABEL_W = 230;

// เรียงโหนดในแต่ละคอลัมน์ด้วย barycenter เพื่อลดการไขว้ของเส้น
function orderNodes(cols, nodesByCol, links) {
  const order = {};
  cols.forEach((c) => {
    order[c.key] = nodesByCol[c.key].map((n) => n.id);
  });

  const indexOf = (colKey, id) => order[colKey].indexOf(id);

  for (let pass = 0; pass < 8; pass++) {
    const forward = pass % 2 === 0;
    const seq = forward ? cols.slice(1) : cols.slice(0, -1).reverse();

    seq.forEach((col, i) => {
      const refCol = forward
        ? cols[cols.indexOf(col) - 1]
        : cols[cols.indexOf(col) + 1];
      if (!refCol) return;

      const bary = {};
      order[col.key].forEach((id) => {
        const related = links.filter((l) =>
          forward ? l.to === id : l.from === id
        );
        if (!related.length) {
          bary[id] = indexOf(col.key, id);
          return;
        }
        const sum = related.reduce((acc, l) => {
          const other = forward ? l.from : l.to;
          const idx = indexOf(refCol.key, other);
          return acc + (idx === -1 ? 0 : idx);
        }, 0);
        bary[id] = sum / related.length;
      });

      order[col.key] = [...order[col.key]].sort((a, b) => bary[a] - bary[b]);
    });
  }

  return order;
}

function truncate(text, max) {
  if (!text) return "";
  return text.length > max ? text.slice(0, max - 1) + "…" : text;
}

export default function Alluvial({ nodes, links, cols, height = 720 }) {
  const svgRef = useRef(null);
  const [hovered, setHovered] = useState(null);

  const layout = useMemo(() => {
    const nodesByCol = {};
    cols.forEach((c) => {
      nodesByCol[c.key] = nodes.filter((n) => n.col === c.key);
    });

    const valueOf = (id) => {
      const inSum = links.filter((l) => l.to === id).reduce((a, l) => a + l.value, 0);
      const outSum = links.filter((l) => l.from === id).reduce((a, l) => a + l.value, 0);
      return Math.max(inSum, outSum, 1);
    };

    let maxTotal = 0;
    let maxCount = 0;
    cols.forEach((c) => {
      const total = nodesByCol[c.key].reduce((a, n) => a + valueOf(n.id), 0);
      maxTotal = Math.max(maxTotal, total);
      maxCount = Math.max(maxCount, nodesByCol[c.key].length);
    });

    const usableH = height - PAD_TOP - NODE_GAP * Math.max(0, maxCount - 1) - 20;
    const scaleY = usableH / maxTotal;

    const order = orderNodes(cols, nodesByCol, links);

    const placed = {};
    cols.forEach((col, ci) => {
      const x = PAD_LEFT + LABEL_W + ci * COL_GAP;
      let y = PAD_TOP;
      order[col.key].forEach((id) => {
        const node = nodes.find((n) => n.id === id);
        const h = Math.max(4, valueOf(id) * scaleY);
        placed[id] = { ...node, x, y, h, value: valueOf(id) };
        y += h + NODE_GAP;
      });
    });

    // จัดตำแหน่งเส้นภายในโหนด โดยเรียงตามลำดับโหนดปลายทางเพื่อไม่ให้เส้นไขว้ในตัวโหนดเอง
    const outCursor = {};
    const inCursor = {};
    const colIndexOf = (id) => cols.findIndex((c) => c.key === placed[id].col);

    const sortedLinks = [...links].sort((a, b) => {
      const ay = placed[a.to]?.y ?? 0;
      const by = placed[b.to]?.y ?? 0;
      return ay - by;
    });

    const drawn = sortedLinks
      .filter((l) => placed[l.from] && placed[l.to])
      .map((l, i) => {
        const s = placed[l.from];
        const t = placed[l.to];
        const w = Math.max(1.5, l.value * scaleY);

        const so = outCursor[l.from] || 0;
        const ti = inCursor[l.to] || 0;
        outCursor[l.from] = so + w;
        inCursor[l.to] = ti + w;

        const y0 = s.y + so + w / 2;
        const y1 = t.y + ti + w / 2;
        const x0 = s.x + NODE_W;
        const x1 = t.x;
        const mx = (x0 + x1) / 2;

        return {
          key: `${l.from}->${l.to}-${i}`,
          from: l.from,
          to: l.to,
          w,
          d: `M${x0},${y0} C${mx},${y0} ${mx},${y1} ${x1},${y1}`,
          color: s.color || "#42618c",
        };
      });

    const width = PAD_LEFT + LABEL_W + (cols.length - 1) * COL_GAP + NODE_W + LABEL_W;

    return { placed, drawn, width, colIndexOf };
  }, [nodes, links, cols, height]);

  // ไฮไลต์ "ตลอดสาย" — ต้นน้ำ (ทุกโหนดที่ไหลมาถึง) และปลายน้ำ (ทุกโหนดที่ไหลต่อไป) ของโหนดที่ hover
  // ต้องไม่แตกแขนงย้อนกลับ ไม่งั้นกราฟสองฝั่งที่เชื่อมกันหนาแน่นจะสว่างทั้งแผนภาพ
  const highlight = useMemo(() => {
    if (!hovered) return null;

    const ancestors = new Set();
    const descendants = new Set();

    const walkUp = (id) => {
      links.forEach((l) => {
        if (l.to === id && !ancestors.has(l.from)) {
          ancestors.add(l.from);
          walkUp(l.from);
        }
      });
    };
    const walkDown = (id) => {
      links.forEach((l) => {
        if (l.from === id && !descendants.has(l.to)) {
          descendants.add(l.to);
          walkDown(l.to);
        }
      });
    };
    walkUp(hovered);
    walkDown(hovered);

    const nodeSet = new Set([hovered, ...ancestors, ...descendants]);
    const upstream = new Set([hovered, ...ancestors]);
    const downstream = new Set([hovered, ...descendants]);

    return { nodeSet, upstream, downstream };
  }, [hovered, links]);

  const linkActive = (l) => {
    if (!highlight) return true;
    // เส้นบนสายต้นน้ำ (ไหลเข้าหาโหนดที่ hover) หรือสายปลายน้ำ (ไหลออกจากโหนดที่ hover)
    return highlight.upstream.has(l.to) || highlight.downstream.has(l.from);
  };

  const activeSet = highlight?.nodeSet ?? null;

  function downloadSvg() {
    const svg = svgRef.current;
    if (!svg) return;
    const source = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "alluvial.svg";
    a.click();
    URL.revokeObjectURL(url);
  }

  const { placed, drawn, width } = layout;

  return (
    <div>
      <div style={{ marginBottom: 8 }}>
        <button type="button" className="btn" onClick={downloadSvg}>
          ดาวน์โหลด SVG
        </button>
      </div>

      <div className="alluvial-scroll">
        <svg
          ref={svgRef}
          xmlns="http://www.w3.org/2000/svg"
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          onMouseLeave={() => setHovered(null)}
        >
          {cols.map((c, ci) => (
            <text
              key={c.key}
              x={PAD_LEFT + LABEL_W + ci * COL_GAP}
              y={18}
              fontSize="13"
              fontWeight="600"
              fill="#16335c"
            >
              {c.label} ({nodes.filter((n) => n.col === c.key).length})
            </text>
          ))}

          <g>
            {drawn.map((l) => (
              <path
                key={l.key}
                d={l.d}
                fill="none"
                stroke={l.color}
                strokeWidth={l.w}
                strokeOpacity={linkActive(l) ? (activeSet ? 0.62 : 0.35) : 0.06}
              />
            ))}
          </g>

          <g>
            {Object.values(placed).map((n) => {
              const dim = activeSet && !activeSet.has(n.id);
              const isLast = n.col === cols[cols.length - 1].key;
              return (
                <g
                  key={n.id}
                  opacity={dim ? 0.25 : 1}
                  onMouseEnter={() => setHovered(n.id)}
                  style={{ cursor: "pointer" }}
                >
                  <rect
                    x={n.x}
                    y={n.y}
                    width={NODE_W}
                    height={n.h}
                    fill={n.color || "#42618c"}
                    rx="3"
                  />
                  <text
                    x={isLast ? n.x + NODE_W + 8 : n.x - 8}
                    y={n.y + n.h / 2 - 2}
                    textAnchor={isLast ? "start" : "end"}
                    fontSize="12"
                    fontWeight="600"
                    fill="#1c2430"
                  >
                    {n.label}
                  </text>
                  <text
                    x={isLast ? n.x + NODE_W + 8 : n.x - 8}
                    y={n.y + n.h / 2 + 11}
                    textAnchor={isLast ? "start" : "end"}
                    fontSize="10.5"
                    fill="#5b6472"
                  >
                    {truncate(n.sub, 30)}
                  </text>
                  <title>
                    {n.label} — {n.sub}
                    {n.meta ? `\n${n.meta}` : ""}
                  </title>
                </g>
              );
            })}
          </g>
        </svg>
      </div>
    </div>
  );
}
