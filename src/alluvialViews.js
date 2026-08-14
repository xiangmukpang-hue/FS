// สร้างชุดข้อมูลแผนภาพสายธารจากข้อมูลจริงใน obeData.js เท่านั้น
// ทุกโหนดและทุกเส้นคำนวณจากข้อมูล ไม่มีการพิมพ์ด้วยมือ
//
// build() คืน { nodes, links, cols }
//   nodes = [{ id, col, label, sub?, color? }]
//   links = [{ from, to, value }]
//   cols  = [{ key, label }]  ลำดับคอลัมน์จากซ้ายไปขวา

import { STAKEHOLDERS, NEEDS } from "./obeData.js";

const SH_COLOR = "#2f6fb0";
const NEED_COLOR = "#0e9aa7";
const ORPHAN_COLOR = "#b8760f";

// ความต้องการที่มี SH รองรับหลายกลุ่ม = เสียงร่วม ยิ่งเข้มยิ่งมีหลายกลุ่มระบุตรงกัน
function needColor(shCount) {
  return shCount <= 1 ? ORPHAN_COLOR : NEED_COLOR;
}

/* ① ผู้มีส่วนได้ส่วนเสีย → ความต้องการ
   เส้นหนาที่โหนด SH = กลุ่มนั้นระบุความต้องการกี่ข้อ
   เส้นหนาที่โหนด Need = ความต้องการข้อนั้นถูกกี่กลุ่มระบุตรงกัน */
function viewShNeed() {
  const nodes = [];
  const links = [];

  const needCountBySh = {};
  NEEDS.forEach((n) => {
    n.sh.forEach((shCode) => {
      needCountBySh[shCode] = (needCountBySh[shCode] || 0) + 1;
    });
  });

  STAKEHOLDERS.forEach((s) => {
    nodes.push({
      id: `sh:${s.code}`,
      col: "sh",
      label: s.code,
      sub: s.group,
      color: SH_COLOR,
      meta: `ระบุความต้องการ ${needCountBySh[s.code] || 0} ข้อ`,
    });
  });

  NEEDS.forEach((n) => {
    nodes.push({
      id: `need:${n.code}`,
      col: "need",
      label: n.code,
      sub: n.text,
      color: needColor(n.sh.length),
      meta: `ถูกระบุโดย ${n.sh.length} กลุ่ม: ${n.sh.join(", ")}`,
    });
  });

  NEEDS.forEach((n) => {
    n.sh.forEach((shCode) => {
      links.push({ from: `sh:${shCode}`, to: `need:${n.code}`, value: 1 });
    });
  });

  return {
    nodes,
    links,
    cols: [
      { key: "sh", label: "① ผู้มีส่วนได้ส่วนเสีย (SH1–SH8)" },
      { key: "need", label: "② ความต้องการ (N1–N16)" },
    ],
  };
}

export const VIEWS = [
  {
    id: "v1",
    name: "ผู้มีส่วนได้ส่วนเสีย → ความต้องการ",
    desc:
      "เสียงของแต่ละกลุ่มไหลไปจบที่ความต้องการข้อใด · เส้นหนาที่ฝั่งซ้าย = กลุ่มนั้นระบุความต้องการหลายข้อ · เส้นหนาที่ฝั่งขวา = ความต้องการข้อนั้นถูกหลายกลุ่มระบุตรงกัน",
    build: viewShNeed,
  },
];
