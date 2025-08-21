import { useState } from "react";

function SubtaskForm({ onSubmit, onClose }) {
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [progress, setProgress] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !deadline) return;
    onSubmit({ title, deadline, progress: Number(progress), });
    onClose();
  };

  return (
    <div className="modal-overlay">

      <div className="modal">
        <h2>세부 목표</h2>

        <form onSubmit={handleSubmit}>
          <label>
            목표명:
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
          </label>

          <label>
            마감일:
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </label>

          <label>
            진행도 (%):
            <input
              type="number"
              value={progress}
              onChange={(e) => setProgress(e.target.value)}
              min="0"
              max="100"
            />
          </label>

          <button type="submit">추가</button>
          <button type="button" onClick={onClose}>
            취소
          </button>

        </form>

      </div>

    </div>
  );
}

export default SubtaskForm;