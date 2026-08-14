// แหล่งข้อมูลเมนูแหล่งเดียว — SiteNav.jsx และ Sidebar.jsx render จากไฟล์นี้เท่านั้น ห้าม hardcode ซ้ำ
//
// NAV_GROUPS: {
//   id: string, label: string, hint: string, solo?: boolean,
//   items: { to: string, label: string, desc: string, sections?: { id: string, label: string }[] }[]
// }[]
//
// solo: true = กลุ่มที่เป็นลิงก์เดี่ยว (เช่น หน้าแรก, ข้อมูลอ้างอิง) แสดงเป็นลิงก์ตรง ไม่ใช่เมนูย่อย

export const NAV_GROUPS = [
  {
    id: "home",
    label: "หน้าแรก",
    hint: "ภาพรวมหลักสูตร",
    solo: true,
    items: [
      { to: "/", label: "หน้าแรก", desc: "ภาพรวมหลักสูตรวิทยาศาสตรบัณฑิต สาขาการเพาะเลี้ยงและธุรกิจสัตว์น้ำ" },
    ],
  },
  {
    id: "curriculum",
    label: "หลักสูตร",
    hint: "โครงสร้าง รายวิชา แผนการเรียน และกราฟรายวิชา",
    items: [
      { to: "/structure", label: "โครงสร้างหลักสูตร", desc: "หมวดและกลุ่มวิชา พร้อมหน่วยกิต" },
      { to: "/courses", label: "รายวิชา", desc: "รายวิชาทั้งหมดของหลักสูตร พร้อมคำอธิบาย" },
      { to: "/plan", label: "แผนการเรียน", desc: "แผนการเรียนรายภาคการศึกษา" },
      { to: "/graph", label: "กราฟรายวิชา", desc: "ลำดับก่อน–หลังของรายวิชา" },
      { to: "/faculty", label: "คณาจารย์", desc: "คณาจารย์ผู้รับผิดชอบหลักสูตร" },
    ],
  },
  {
    id: "outcomes",
    label: "ผลลัพธ์การเรียนรู้",
    hint: "OBE, PLO, YLO, CLO",
    items: [
      { to: "/obe", label: "OBE", desc: "กระบวนการออกแบบหลักสูตรแบบ Outcome-Based Education" },
      { to: "/plo", label: "PLO", desc: "ผลลัพธ์การเรียนรู้ระดับหลักสูตร" },
      { to: "/ylo", label: "YLO", desc: "ผลลัพธ์การเรียนรู้รายชั้นปี" },
      { to: "/clo", label: "CLO", desc: "ผลลัพธ์การเรียนรู้รายวิชา" },
    ],
  },
  {
    id: "teaching",
    label: "การเรียนการสอน",
    hint: "การจัดการเรียนการสอนและการประเมินผล",
    items: [
      { to: "/teaching", label: "การจัดการเรียนการสอน", desc: "แนวทางการจัดการเรียนการสอนของหลักสูตร" },
      { to: "/assessment", label: "การประเมินผล", desc: "แนวทางการวัดและประเมินผลการเรียนรู้" },
      { to: "/ksa-pedagogy", label: "KSA & Pedagogy", desc: "องค์ประกอบความรู้ ทักษะ เจตคติ กับวิธีสอนที่สอดคล้อง" },
    ],
  },
  {
    id: "market",
    label: "ตลาดแรงงาน",
    hint: "อาชีพเป้าหมายและหลักฐานตลาดงาน",
    items: [
      { to: "/careers", label: "เส้นทางอาชีพ", desc: "เส้นทางรายวิชาสู่อาชีพเป้าหมาย" },
      { to: "/jobs", label: "Jobs & Skills", desc: "หลักฐานตลาดงานและทักษะที่ต้องการ" },
    ],
  },
  {
    id: "refs",
    label: "ข้อมูลอ้างอิง",
    hint: "แหล่งอ้างอิงของหลักสูตร",
    solo: true,
    items: [
      { to: "/refs", label: "ข้อมูลอ้างอิง", desc: "แหล่งอ้างอิงและเอกสารประกอบการออกแบบหลักสูตร" },
    ],
  },
];
