import React from "react";
import "./CharacterGrid.css";
import CharacterDisplay from "./CharacterDisplay";

function CharacterGrid({ characters, onSelect, onUnlock, selectedCharacter }) {
  return (
    <div className="backgroundColor">
      <div className="backRectangle">
        {/* 선택된 캐릭터 이미지 표시 */}
        <CharacterDisplay character={selectedCharacter} />

        <div className="character-grid">
          {characters.map(({ id, name, unlocked, image }) => (
            <div
              key={id}
              className={`character-box ${!unlocked ? "LockBox" : "UnlockBox"}`}
              onClick={() => {
                if (unlocked) onSelect({ id, name, image, unlocked: true });
              }}
            >
              <img src={image} alt={name} className="character-image" />
              <div className="character-name">{name}</div>
              {!unlocked && (
                <button
                  className="toggle-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onUnlock(id);
                  }}
                >
                  잠금 해제
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="nameLine" />
        <div className="name">내이름은뿌꾸</div>
      </div>
    </div>
  );
}

export default CharacterGrid;