import { useState } from "react";
import EditSubtaskForm from "./EditSubtaskForm";

function Subtask({
  subtask,
  onDeleteSubtask,
  onEditSubtask,
}) {
  const [showEditForm, setShowEditForm] = useState(false);

  return (
    <div className="subtask-card">
      <h1>{subtask.title}</h1>
      <p>마감일: {subtask.deadline}</p>
      <p>진행도: {subtask.progress}%</p>

      <button onClick={() => setShowEditForm(true)}>수정</button>
      <button onClick={() => onDeleteSubtask(subtask.id)}>삭제</button>

      {showEditForm && (
        <EditSubtaskForm
          subtask={subtask}
          onSubmit={onEditSubtask}
          onClose={() => setShowEditForm(false)}
        />
      )}
    </div>
  );
}

export default Subtask;