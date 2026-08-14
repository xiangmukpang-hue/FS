import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="page">
      <header className="page-header">
        <h1>ไม่พบหน้านี้</h1>
      </header>
      <div className="empty-state">
        <p>ไม่พบเส้นทางที่ต้องการ — กลับไปที่ <Link to="/">หน้าแรก</Link></p>
      </div>
    </section>
  );
}
