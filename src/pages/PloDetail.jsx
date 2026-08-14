import { useParams } from "react-router-dom";
import { Placeholder } from "./ui.jsx";

export default function PloDetail() {
  const { id } = useParams();
  return <Placeholder title={`รายละเอียด PLO: ${id}`} step={10} />;
}
