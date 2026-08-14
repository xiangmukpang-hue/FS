import { useParams } from "react-router-dom";
import { Placeholder } from "./ui.jsx";

export default function StructureDetail() {
  const { id } = useParams();
  return <Placeholder title={`รายละเอียดกลุ่มวิชา: ${id}`} step={2} />;
}
