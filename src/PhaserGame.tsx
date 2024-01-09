import React, { useEffect, useRef } from "react";
import Phaser from "phaser";
import InventoryScene from "./scene/InventoryScene"; // InventoryScene 클래스 임포트

const PhaserGame: React.FC = () => {
  const phaserGame = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (phaserGame.current) {
      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: phaserGame.current,
        scene: [InventoryScene], // InventoryScene 클래스 사용
      };

      new Phaser.Game(config);
    }
  }, []);

  return <div ref={phaserGame} />;
};

export default PhaserGame;
