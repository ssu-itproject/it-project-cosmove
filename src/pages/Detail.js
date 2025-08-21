import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import SubtaskForm from "../components/SubtaskForm";
import BackButton from "../components/BackButton";
import StoreButton from "../components/StoreButton";
import AddProjectButton from "../components/AddProjectButton";
import Header from "../components/Header";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";
import "./Detail.css";

function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // 중심 노드 ID 상수
  const CENTER_NODE_ID = "center";

  // 프로젝트 불러오기
  useEffect(() => {
    const projects = JSON.parse(localStorage.getItem("projects") || "[]");
    const found = projects.find((p) => String(p.id) === id);
    if (found) {
      setProject(found);
    } else {
      alert("프로젝트를 찾을 수 없습니다.");
      navigate("/home");
    }
  }, [id, navigate]);

  // subtasks → nodes 변환 함수
  const generateNodesFromProject = (project) => {
    const baseNode = [
      {
        id: CENTER_NODE_ID,
        type: "default",
        data: { label: project.title, page: "/center" },
        position: { x: 300, y: 200 },
        draggable: false,
        className: "my-node center-node",
      },
    ];

    const subtaskNodes = (project.subtasks || []).map((subtask) => ({
      id: subtask.id.toString(),
      type: "default",
      data: { label: subtask.title },
      position: {
        x: Math.random() * 400 + 100,
        y: Math.random() * 200 + 100,
      },
      className: "my-node",
    }));

    return [...baseNode, ...subtaskNodes];
  };

  // subtasks → edges 변환 함수
  const generateEdgesFromProject = (project) => {
    return (project.subtasks || []).map((subtask) => ({
      id: `e-center-${subtask.id}`,
      source: CENTER_NODE_ID,
      target: subtask.id.toString(),
    }));
  };

  // project가 바뀔 때 nodes/edges 세팅
  useEffect(() => {
    if (project) {
      const newNodes = generateNodesFromProject(project);
      const newEdges = generateEdgesFromProject(project);
      setNodes(newNodes);
      setEdges(newEdges);
    }
  }, [project, setNodes, setEdges]);

  const updateProjectInStorage = (updatedProject) => {
    const projects = JSON.parse(localStorage.getItem("projects") || "[]");
    const newProjects = projects.map((p) =>
      p.id === updatedProject.id ? updatedProject : p
    );
    localStorage.setItem("projects", JSON.stringify(newProjects));
  };

  const onNodeClick = useCallback(
    (event, node) => {
      if (node.id !== CENTER_NODE_ID) {
        navigate(`/project/${project.id}/${node.id}`);
      } else {
        alert("페이지 정보가 없습니다.");
      }
    },
    [navigate, CENTER_NODE_ID, project]
  );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // subtask 추가 → project.subtasks 업데이트
  const handleAddSubtask = (newSubtask) => {
    const updated = {
      ...project,
      subtasks: [...(project.subtasks || []), newSubtask],
    };
    setProject(updated);
    updateProjectInStorage(updated);
    setShowForm(false);
  };

  const handleSubmitBoth = (newSubtask) => {
    const newId = Date.now();
    const newSubtaskWithId = { id: newId, ...newSubtask };
    handleAddSubtask(newSubtaskWithId);
  };

  // 상태 업데이트 이후 값 찍기
  useEffect(() => {
    console.log("Nodes updated:", nodes);
  }, [nodes]);

  useEffect(() => {
    console.log("Edges updated:", edges);
  }, [edges]);

  if (!project) return <div>Loading...</div>;

return (
    <div className="detail-container">
      <Header>
        <div className="nav-buttons">
          <BackButton />
          <StoreButton />
        </div>
        <div className="action-buttons">
          <AddProjectButton onClick={() => setShowForm(true)} />
        </div>
      </Header>

      {showForm && (
        <div className="form-overlay">
          <SubtaskForm
            onSubmit={handleSubmitBoth}
            onClose={() => setShowForm(false)}
          />
        </div>
      )}

      <div className="react-flow-container">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          fitView
          key={`${nodes.length}-${edges.length}`}
        />
      </div>
    </div>
  );
}

export default Detail;