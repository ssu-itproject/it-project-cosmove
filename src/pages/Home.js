import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Project from "../components/Project";
import ProjectForm from "../components/ProjectForm";
import AddProjectButton from "../components/AddProjectButton";
import StoreButton from "../components/StoreButton";
import Button from "../components/Button";
import Header from "../components/Header";
import "./Home.css"

function Home() {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [positions, setPositions] = useState({});
  const [mapOffset, setMapOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects))
  }, [projects])

  useEffect(() => {
    localStorage.setItem("positions", JSON.stringify(positions));
  }, [positions]);

  useEffect(() => {
    const storedProjects = JSON.parse(localStorage.getItem("projects") || "[]");
    const storedPositions = JSON.parse(localStorage.getItem("positions") || "{}");
    setProjects(storedProjects);
    setPositions(storedPositions);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  });


  const getPosition = (id) => {
    const pos = positions[id];
    return pos
      ? {
          top: pos.y - pos.radius + mapOffset.y,
          left: pos.x - pos.radius + mapOffset.x,
        }
      : { top: 0, left: 0 };
  };


  const getRadius = (priority) => {
    if (priority === "상") return 75;
    if (priority === "중") return 55;
    return 40;
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !lastMousePos) return;

    const dx = e.clientX - lastMousePos.x;
    const dy = e.clientY - lastMousePos.y;

    setMapOffset((prev) => ({
      x: prev.x + dx,
      y: prev.y + dy,
    }));

    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setLastMousePos(null);
  };


  const handleAddProject = (newProject) => {
    const id = Date.now();
    const project = {
      id,
      ...newProject,
      subtasks: [],
    };

    const radius = getRadius(project.priority);
    const padding = 20;
    const tryLimit = 300;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const centerX = screenWidth / 2;
    const centerY = screenHeight / 2;

    const tempPositions = { ...positions };
    let x = 0;
    let y = 0;
    let placed = false;
    let attempt = 0;

    const isOverlapping = (cx, cy, r, allPositions) => {
      return Object.values(allPositions).some((pos) => {
        const dx = pos.x - cx;
        const dy = pos.y - cy;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < pos.radius + r + padding;
      });
    };

    const numExisting = Object.keys(tempPositions).length;

    if (numExisting === 0) {
      // 첫 프로젝트는 중앙에
      x = centerX;
      y = centerY;
      tempPositions[id] = { x, y, radius };
      placed = true;
    } else {
      while (!placed && attempt < tryLimit) {
        // 각도와 거리 생성
        const angle = Math.random() * 2 * Math.PI;

        // 확산 거리 증가 (최소 거리 + 증가)
        const baseDistance = 100;
        const spreadFactor = 50;
        const distance = baseDistance + spreadFactor * (numExisting + attempt / 10);

        const cx = centerX + Math.cos(angle) * distance;
        const cy = centerY + Math.sin(angle) * distance;

        // 화면 바깥은 제외
        if (
          cx - radius < 0 || cx + radius > screenWidth ||
          cy - radius < 0 || cy + radius > screenHeight
        ) {
          attempt++;
          continue;
        }

        if (!isOverlapping(cx, cy, radius, tempPositions)) {
          x = cx;
          y = cy;
          tempPositions[id] = { x, y, radius };
          placed = true;
        }

        attempt++;
      }
    }

    if (!placed) {
      alert("프로젝트를 배치할 공간이 부족합니다.");
      return;
    }

    setProjects((prev) => [...prev, project]);
    setPositions(tempPositions);
  };


  const editProject = (updatedProject) => {
    setProjects((prev) =>
     prev.map((p) => (p.id === updatedProject.id ? updatedProject : p))
    );
  };

  const deleteProject = (id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    setPositions((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };


  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", }}>
      <Header>
        <h1>프로젝트 목록</h1>
        <div className="header-buttons">
          <AddProjectButton onClick={() => setShowForm(true)}>프로젝트 추가</AddProjectButton>
          <StoreButton />
          <Button variant="danger" onClick={() => navigate("/")}>로그아웃</Button>
        </div>
      </Header>

      <div
        className="main-page"
        onMouseDown={handleMouseDown}
        style={{
          flex: 1,
          position: "relative",
          overflow: "hidden",
          userSelect: isDragging ? "none" : "auto",
          cursor: isDragging ? "grabbing" : "grab",
        }}
      >
        {projects.map((project) => (
          <Project
            key={project.id}
            project={project}
            onDeleteProject={deleteProject}
            onEditProject={editProject}
            position={getPosition(project.id)}
          />
        ))}

        {showForm && (
          <ProjectForm
            onSubmit={handleAddProject}
            onClose={() => setShowForm(false)}
          />
        )}
      </div>
    </div>
  );

}

export default Home;
