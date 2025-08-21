// ProjectForm.js

import { useState } from "react";
import Button from "./Button";

function ProjectForm({ onSubmit, onClose }) {
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [progress, setProgress] = useState(0);
  const [priority, setPriority] = useState("중");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !deadline) return;
    onSubmit({ title, deadline, progress: Number(progress), priority });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal p-xl rounded-xl shadow-2xl" 
           style={{ width: '400px', maxWidth: '90vw' }} 
           onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-semibold text-center mb-lg" style={{color: 'var(--color-gray-900)'}}>
          프로젝트 추가
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">프로젝트명:</label>
            <input 
              className="form-input"
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
            />
          </div>

          <div className="form-group">
            <label className="form-label">마감일:</label>
            <input
              className="form-input"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">진행도 (%):</label>
            <input
              className="form-input"
              type="number"
              value={progress}
              onChange={(e) => setProgress(e.target.value)}
              min="0"
              max="100"
            />
          </div>

          <div className="form-group">
            <label className="form-label">중요도:</label>
            <select 
              className="form-select"
              value={priority} 
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="상">상</option>
              <option value="중">중</option>
              <option value="하">하</option>
            </select>
          </div>

          <div className="flex justify-center gap-sm mt-xl">
            <Button type="button" variant="secondary" size="medium" onClick={onClose}>
              취소
            </Button>
            <Button type="submit" variant="default" size="medium">
              추가
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProjectForm;
