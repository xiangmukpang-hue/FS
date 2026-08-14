// คอมโพเนนต์ UI ร่วมสำหรับทุกหน้าใน src/pages/ — ไม่ใช้ UI library ภายนอก

export function PageHeader({ title, hint }) {
  return (
    <header className="page-header">
      <h1>{title}</h1>
      {hint && <p className="page-hint">{hint}</p>}
    </header>
  );
}

export function EmptyState({ step }) {
  return (
    <div className="empty-state">
      <p>ยังไม่มีข้อมูล — ดูขั้นที่ {step} ของคู่มือ</p>
    </div>
  );
}

export function Placeholder({ title, hint, step }) {
  return (
    <section className="page">
      <PageHeader title={title} hint={hint} />
      <EmptyState step={step} />
    </section>
  );
}
