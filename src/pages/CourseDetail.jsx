import { useParams } from "react-router-dom";
import { Placeholder } from "./ui.jsx";

export default function CourseDetail() {
  const { code } = useParams();
  return <Placeholder title={`รายละเอียดรายวิชา: ${code}`} step={4} />;
}
