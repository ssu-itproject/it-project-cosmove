import TodoApp from "../components/Todo";
import Header from "../components/Header";
import "./DetailTodo.css"

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function DetailTodo() {
  const { id: projectId, id2: nodeId } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [subtask, setSubtask] = useState(null);

  useEffect(() => {
    const projects = JSON.parse(localStorage.getItem("projects") || "[]");
    const foundProject = projects.find((p) => String(p.id) === projectId);

    if (foundProject) {
      setProject(foundProject);

      const foundSubtask = (foundProject.subtasks || []).find(
        (sub) => String(sub.id) === nodeId
      );
      setSubtask(foundSubtask);
    }
  }, [projectId, nodeId]);

  if (!project) return <div>Project Loading...</div>;

  return (
    <div>
      <Header>
        <div className="nav-buttons">
          <button className="btn btn-back" onClick={() => navigate(-1)}>
            ← 뒤로가기
          </button>
          <button className="btn btn-store" onClick={() => navigate("/store")}>
            상점
          </button>
        </div>
      </Header>
      <div className="container">
          <h2>메인 프로젝트: {project.title}</h2>
        {subtask ? (
          <>
            <h3>{subtask.title}</h3>
            <p>마감일: {subtask.deadline}</p>
            <p>진행도: {subtask.progress}%</p>
          </>
        ) : (
          <p>서브태스크를 찾을 수 없습니다.</p>
        )}
      <TodoApp/>
      </div>

    </div>
  );
}

export default DetailTodo;