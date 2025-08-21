import { useState } from "react";

function EditSubtaskForm({ subtask, onSubmit, onClose }) {
  const [title, setTitle] = useState(subtask.title);
  const [deadline, setDeadline] = useState(subtask.deadline);
  const [progress, setProgress] = useState(subtask.progress);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...subtask,
      title,
      deadline,
      progress: Number(progress), 
    });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>세부 목표 수정</h2>

        <form onSubmit={handleSubmit}>
          <label>이름: <input value={title} onChange={(e) => setTitle(e.target.value)} /></label>
          <label>마감일: <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} /></label>
          <label>진행도 (%): <input type="number" value={progress} onChange={(e) => setProgress(e.target.value)} /></label>

          <button type="submit">저장</button>
          <button type="button" onClick={onClose}>취소</button>
        </form>

      </div>
    </div>
  );
}

export default EditSubtaskForm;