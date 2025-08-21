import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CharacterGrid from "../components/CharacterGrid";
import BackButton from "../components/BackButton";
import Header from "../components/Header";
import charactersData from "../data/characters";

function Store() {
  const [characters, setCharacters] = useState(charactersData);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const navigate = useNavigate();

  const handleSelect = (char) => {
    if (char.unlocked) setSelectedCharacter(char);
  };

  const handleUnlock = (id) => {
    setCharacters((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unlocked: true } : c))
    );
  };

  return (
    <div className="app">
      <Header>
        <BackButton />
        <h1>캐릭터 상점</h1>
      </Header>
      <CharacterGrid
        characters={characters}
        onSelect={handleSelect}
        onUnlock={handleUnlock}
        selectedCharacter={selectedCharacter}
      />
    </div>
  );
}

export default Store;
