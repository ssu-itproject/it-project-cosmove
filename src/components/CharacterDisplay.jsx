import React from "react";

function CharacterDisplay({ character }) {
  if (!character) return null;

  return (
    <div className="character-display-inside">
      <img
        src={character.image}
        alt={character.name}
        className="character-visual-inside"
      />
    </div>
  );
}

export default CharacterDisplay;
