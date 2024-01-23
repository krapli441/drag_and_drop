import React, { useRef, useEffect } from "react";
import Phaser from "phaser";
import Inventory from "./scenes/Inventory";

const PhaserGame: React.FC = () => {
  const phaserGameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (phaserGameRef.current) {
      const gameConfig: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        width: 1000,
        height: 600,
        parent: phaserGameRef.current,
        scene: [Inventory], // 여기에 Scene을 포함
      };

      const game = new Phaser.Game(gameConfig);

      return () => {
        game.destroy(true);
      };
    }
  }, []);

  return <div ref={phaserGameRef} />;
};

export default PhaserGame;
