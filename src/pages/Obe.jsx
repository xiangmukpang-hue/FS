import { useState, useMemo } from "react";
import { PageHeader } from "./ui.jsx";
import Alluvial from "../Alluvial.jsx";
import { VIEWS } from "../alluvialViews.js";
import {
  STAKEHOLDER_SOURCE_NOTE,
  STAKEHOLDER_CAVEATS,
  STAKEHOLDERS,
  NEEDS,
  NEEDS_SOURCE_NOTE,
} from "../obeData.js";

function AlluvialSection() {
  const [viewId, setViewId] = useState(VIEWS[0].id);
  const view = VIEWS.find((v) => v.id === viewId) || VIEWS[0];
  const graph = useMemo(() => view.build(), [view]);

  const { noIncoming, noOutgoing } = useMemo(() => {
    const firstCol = graph.cols[0].key;
    const lastCol = graph.cols[graph.cols.length - 1].key;
    return {
      // โหนดคอลัมน์แรกไม่มีเส้นเข้าโดยธรรมชาติ จึงตรวจเฉพาะคอลัมน์ถัดไป
      noIncoming: graph.nodes.filter(
        (n) => n.col !== firstCol && !graph.links.some((l) => l.to === n.id)
      ),
      noOutgoing: graph.nodes.filter(
        (n) => n.col !== lastCol && !graph.links.some((l) => l.from === n.id)
      ),
    };
  }, [graph]);

  return (
    <>
      <h2>แผนภาพสายธารความเชื่อมโยง</h2>

      {VIEWS.length > 1 && (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
          {VIEWS.map((v) => (
            <button
              key={v.id}
              type="button"
              className={"btn" + (v.id === viewId ? " is-active" : "")}
              onClick={() => setViewId(v.id)}
            >
              {v.id}
            </button>
          ))}
        </div>
      )}

      <p className="page-hint">{view.desc}</p>

      <Alluvial nodes={graph.nodes} links={graph.links} cols={graph.cols} height={760} />

      <div className="empty-state" style={{ marginBottom: 24 }}>
        <strong>ช่องว่างของหลักสูตร</strong>
        <ul>
          <li>
            โหนดที่ไม่มีเส้นเข้า:{" "}
            {noIncoming.length
              ? noIncoming.map((n) => n.label).join(", ")
              : "ไม่มี — ทุกความต้องการมีกลุ่มผู้มีส่วนได้ส่วนเสียรองรับ"}
          </li>
          <li>
            โหนดที่ไม่มีเส้นออก:{" "}
            {noOutgoing.length
              ? noOutgoing.map((n) => n.label).join(", ")
              : "ไม่มี — ทุกกลุ่มผู้มีส่วนได้ส่วนเสียมีความต้องการผูกอยู่"}
          </li>
        </ul>
      </div>
    </>
  );
}

export default function Obe() {
  return (
    <section className="page">
      <PageHeader
        title="OBE"
        hint="กระบวนการออกแบบหลักสูตรแบบ Outcome-Based Education เริ่มจากความต้องการของผู้มีส่วนได้ส่วนเสีย"
      />

      <p className="mono" style={{ fontSize: "0.85rem", color: "var(--color-text-muted)" }}>
        {STAKEHOLDER_SOURCE_NOTE}
      </p>

      <div className="empty-state" style={{ marginBottom: 24 }}>
        <strong>ข้อจำกัดของแหล่งข้อมูล</strong>
        <ul>
          {STAKEHOLDER_CAVEATS.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      </div>

      <AlluvialSection />

      <h2>ตารางที่ 1 — ผู้มีส่วนได้ส่วนเสีย</h2>
      <div className="table-scroll">
        <table className="data-table">
          <thead>
            <tr>
              <th>รหัส</th>
              <th>กลุ่ม</th>
              <th>วิธีเก็บข้อมูล</th>
              <th>ขนาดกลุ่มตัวอย่าง</th>
              <th>ช่วงเวลาที่เก็บ</th>
              <th>ระดับความสำคัญ</th>
            </tr>
          </thead>
          <tbody>
            {STAKEHOLDERS.map((s) => (
              <tr key={s.code}>
                <td className="mono">{s.code}</td>
                <td>{s.group}</td>
                <td>{s.method}</td>
                <td>—</td>
                <td>—</td>
                <td>—</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>ตารางที่ 2 — ความต้องการ</h2>
      <p className="page-hint">{NEEDS_SOURCE_NOTE}</p>
      <div className="table-scroll">
        <table className="data-table">
          <thead>
            <tr>
              <th>รหัส</th>
              <th>ข้อความความต้องการ</th>
              <th>ระดับความสำคัญ</th>
              <th>SH ที่ระบุ</th>
            </tr>
          </thead>
          <tbody>
            {NEEDS.map((n) => (
              <tr key={n.code}>
                <td className="mono">{n.code}</td>
                <td>{n.text}</td>
                <td>—</td>
                <td className="mono">{n.sh.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="empty-state">
        <p>
          จำนวน SH: {STAKEHOLDERS.length} กลุ่ม (SH1–SH{STAKEHOLDERS.length}) · จำนวน N: {NEEDS.length} ข้อ (N1–N{NEEDS.length})
          — ยังไม่มีข้อมูลผู้ปกครอง หน่วยงานภาครัฐในพื้นที่ และครูแนะแนวโรงเรียนมัธยม
        </p>
      </div>
    </section>
  );
}
