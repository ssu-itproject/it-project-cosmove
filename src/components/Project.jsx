import { useState } from "react";
import EditProjectForm from "./EditProjectForm";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import "./Project.css";
import penIcon from "../assets/images/edit.png";
import trashcanIcon from "../assets/images/delete.png"

function Project({ project, onDeleteProject, onEditProject, position }) {
  const [showEditForm, setShowEditForm] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isCompleted = project.progress === 100;
  const priorityClass = `project-circle ${project.priority} ${isCompleted ? "완료" : ""}`;

  return (
    <div
      className="project-wrapper"
      style={{
        position: "absolute",
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/project/${project.id}`} className={priorityClass}>
        <span className="project-title">{project.title}</span>
      </Link>

      {isHovered && (
        <div className="project-buttons">
          <button onClick={() => setShowEditForm(true)}>
            <img src={penIcon} alt="수정"/>
          </button>
          <button onClick={() => onDeleteProject(project.id)}>
            <img src={trashcanIcon} alt="삭제"/>
          </button>
        </div>
      )}

      {showEditForm && (
        createPortal(
          <EditProjectForm
            project={project}
            onSubmit={onEditProject}
            onClose={() => setShowEditForm(false)}
          />, 
          document.body
        )
      )}
    </div>
  );
}

export default Project;