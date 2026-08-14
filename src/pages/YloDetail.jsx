import { useParams } from "react-router-dom";
import { Placeholder } from "./ui.jsx";

export default function YloDetail() {
  const { id } = useParams();
  return <Placeholder title={`รายละเอียด YLO: ${id}`} step={12} />;
}
