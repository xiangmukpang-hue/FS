import { Routes, Route } from "react-router-dom";
import SiteNav from "./SiteNav.jsx";
import Sidebar from "./Sidebar.jsx";
import Home from "./pages/Home.jsx";
import Structure from "./pages/Structure.jsx";
import StructureDetail from "./pages/StructureDetail.jsx";
import Courses from "./pages/Courses.jsx";
import CourseDetail from "./pages/CourseDetail.jsx";
import Plan from "./pages/Plan.jsx";
import Graph from "./pages/Graph.jsx";
import Faculty from "./pages/Faculty.jsx";
import Obe from "./pages/Obe.jsx";
import Plo from "./pages/Plo.jsx";
import PloDetail from "./pages/PloDetail.jsx";
import Ylo from "./pages/Ylo.jsx";
import YloDetail from "./pages/YloDetail.jsx";
import Clo from "./pages/Clo.jsx";
import Teaching from "./pages/Teaching.jsx";
import Assessment from "./pages/Assessment.jsx";
import KsaPedagogy from "./pages/KsaPedagogy.jsx";
import Careers from "./pages/Careers.jsx";
import Jobs from "./pages/Jobs.jsx";
import Refs from "./pages/Refs.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <div className="app-shell">
      <SiteNav />
      <div className="app-body">
        <Sidebar />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/structure" element={<Structure />} />
            <Route path="/structure/:id" element={<StructureDetail />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:code" element={<CourseDetail />} />
            <Route path="/plan" element={<Plan />} />
            <Route path="/graph" element={<Graph />} />
            <Route path="/faculty" element={<Faculty />} />
            <Route path="/obe" element={<Obe />} />
            <Route path="/plo" element={<Plo />} />
            <Route path="/plo/:id" element={<PloDetail />} />
            <Route path="/ylo" element={<Ylo />} />
            <Route path="/ylo/:id" element={<YloDetail />} />
            <Route path="/clo" element={<Clo />} />
            <Route path="/teaching" element={<Teaching />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/ksa-pedagogy" element={<KsaPedagogy />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/refs" element={<Refs />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
