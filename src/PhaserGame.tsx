import React, { useEffect, useRef } from "react";
import Phaser from "phaser";
import InventoryScene from "./scene/InventoryScene"; // InventoryScene 클래스 임포트

const PhaserGame: React.FC = () => {
  const phaserGame = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (phaserGame.current) {
      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        width: 500,
        height: 500,
        parent: phaserGame.current,
        scene: [InventoryScene], // InventoryScene 클래스 사용
        input: {
          keyboard: true, // 키보드 입력 활성화
        },
      };

      new Phaser.Game(config);
    }

    console.log("게임 생성됨");
  }, []);

  return <div ref={phaserGame} />;
};

export default PhaserGame;
