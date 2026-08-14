import { PageHeader } from "./ui.jsx";
import {
  STAKEHOLDER_SOURCE_NOTE,
  STAKEHOLDER_CAVEATS,
  STAKEHOLDERS,
  NEEDS,
  NEEDS_SOURCE_NOTE,
} from "../obeData.js";

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
