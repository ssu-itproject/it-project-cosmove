import { useState } from "react";
import "./EditProjectForm.css"

function EditProjectForm({ project, onSubmit, onClose }) {
  const [title, setTitle] = useState(project.title);
  const [deadline, setDeadline] = useState(project.deadline);
  const [progress, setProgress] = useState(project.progress);
  const [priority, setPriority] = useState(project.priority || "중");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...project,
      title,
      deadline,
      progress: Number(progress),
      priority, 
    });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>프로젝트 수정</h2>

        <form onSubmit={handleSubmit}>
          <label>이름: <input value={title} onChange={(e) => setTitle(e.target.value)} /></label>
          <label>마감일: <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} /></label>
          <label>진행도 (%): <input type="number" value={progress} onChange={(e) => setProgress(e.target.value)} min="0" max="100"/></label>
          <label>
            중요도:
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="상">상</option>
              <option value="중">중</option>
              <option value="하">하</option>
            </select>
          </label>

          <button type="submit">저장</button>
          <button type="button" onClick={onClose}>취소</button>
        </form>

      </div>
    </div>
  );
}

export default EditProjectForm;
