import Phaser from "phaser";
import Inventory from "./InventoryClass/Inventory";
import {
  ChestRigData,
  BarterItemData,
  DraggedItemData,
} from "./InventoryClass/InventoryInterface";
import { loadChestRigData, loadBarterItemsData } from "./api";

export default class BootScene extends Phaser.Scene {
  private inventory: Inventory | null = null;
  private ChestRigData: ChestRigData | null = null;
  private selectedBarterItems: BarterItemData[] = [];
  private draggedItemData: DraggedItemData | null = null;

  constructor() {
    super("BootScene");
  }

  preload() {}

  async create() {
    // Chest Rig 데이터 로드
    const chestRigResponse = await loadChestRigData();
    if (
      chestRigResponse &&
      chestRigResponse.data &&
      chestRigResponse.data.items.length > 0
    ) {
      this.ChestRigData = chestRigResponse.data.items[0] as ChestRigData;
      this.createInventory();
      this.createItemData();
      console.log("Selected Chest Rig Data: ", this.ChestRigData);
    }

    // Barter Item 데이터 로드
    const barterItemsResponse = await loadBarterItemsData();
    if (
      barterItemsResponse &&
      barterItemsResponse.data &&
      barterItemsResponse.data.items.length > 0
    ) {
      // 무작위로 5개의 아이템 선택
      this.selectedBarterItems = this.selectRandomItems(
        barterItemsResponse.data.items,
        5
      );
      console.log("Selected Barter Items: ", this.selectedBarterItems);
    }

    this.createBarterItemGrids();
  }

  // 무작위로 n개의 아이템을 선택하는 함수
  selectRandomItems(items: any[], n: number): any[] {
    let selectedItems = [];
    for (let i = 0; i < n; i++) {
      const randomIndex = Math.floor(Math.random() * items.length);
      selectedItems.push(items[randomIndex]);
      // 선택된 아이템은 목록에서 제거하여 중복 선택을 방지
      items.splice(randomIndex, 1);
    }
    return selectedItems;
  }

  createInventory() {
    if (this.ChestRigData && this.ChestRigData.hasGrid) {
      this.inventory = new Inventory(this.ChestRigData.properties);
      console.log(this.inventory);
    }
  }

  createItemData() {
    // ChestRigData가 존재하는 경우에만 실행
    if (this.ChestRigData) {
      this.add.text(20, 20, `Name: ${this.ChestRigData.shortName}`, {
        font: "18px Arial",
        color: "#ffffff",
      });
      this.add.text(20, 50, `Width: ${this.ChestRigData.width}`, {
        font: "18px Arial",
        color: "#ffffff",
      });
      this.add.text(20, 80, `Height: ${this.ChestRigData.height}`, {
        font: "18px Arial",
        color: "#ffffff",
      });
      this.add.text(
        20,
        110,
        `Capacity: ${this.ChestRigData.properties.capacity}`,
        { font: "18px Arial", color: "#ffffff" }
      );
    }
    // 그리드 인벤토리 생성 (현재 아이템의 크기)
    this.createGridInventory();

    // 내부 그리드 인벤토리 생성
    this.createInnerGridInventory();
  }

  createGridInventory() {
    if (this.ChestRigData && this.ChestRigData.hasGrid) {
      const xOffsetStart = 20;
      const yOffsetStart = 150;
      const gridWidth = 50;
      const gridHeight = 50;

      this.ChestRigData.properties.grids.forEach((grid, index) => {
        let gridX = xOffsetStart + grid.x * gridWidth;
        let gridY = yOffsetStart + grid.y * gridHeight;

        // 그리드 그래픽 생성 및 그리기
        let gridGraphic = this.add.graphics();
        gridGraphic.lineStyle(1, 0x00ff00);
        gridGraphic.strokeRect(
          gridX,
          gridY,
          grid.width * gridWidth,
          grid.height * gridHeight
        );

        // 인터랙티브 설정
        gridGraphic.setInteractive(
          new Phaser.Geom.Rectangle(
            gridX,
            gridY,
            grid.width * gridWidth,
            grid.height * gridHeight
          ),
          Phaser.Geom.Rectangle.Contains
        );

        // 드래그 가능하게 설정
        this.input.setDraggable(gridGraphic);
      });
    }
  }

  createInnerGridInventory() {
    if (
      this.ChestRigData &&
      this.ChestRigData.hasGrid &&
      this.ChestRigData.properties.grids
    ) {
      const gridGraphics = this.add.graphics();
      gridGraphics.lineStyle(1, 0x00ff00); // 다른 색으로 그리드 테두리 설정

      let xOffset = 20; // 시작 X 위치
      let yOffset = 150 + this.ChestRigData.height * 50 + 20; // 시작 Y 위치 (기존 그리드 아래에 위치)

      interface GridSize {
        width: number;
        height: number;
      }

      this.ChestRigData.properties.grids.forEach((grid: GridSize) => {
        for (let x = 0; x < grid.width; x++) {
          for (let y = 0; y < grid.height; y++) {
            gridGraphics.strokeRect(
              xOffset + x * 50, // X 위치
              yOffset + y * 50, // Y 위치
              50, // 칸 너비
              50 // 칸 높이
            );
          }
        }

        // X 오프셋 업데이트 (다음 그리드의 X 위치를 위해)
        xOffset += grid.width * 50 + 10;

        // 가로 방향으로 더 이상 그리드를 그릴 공간이 없으면 Y 오프셋 업데이트
        if (xOffset + grid.width * 50 > this.cameras.main.width) {
          xOffset = 20; // X 오프셋 리셋
          yOffset += grid.height * 50 + 10; // Y 오프셋 업데이트
        }
      });
    }
  }

  createBarterItemGrids() {
    let xOffset = this.cameras.main.width / 2 + 20;
    let yOffset = 20;

    this.selectedBarterItems.forEach((item, index) => {
      // 각 아이템에 대한 그래픽 생성 및 설정
      let itemGraphic = this.add.graphics();
      itemGraphic.fillStyle(0xffffff, 1);
      itemGraphic.fillRect(0, 0, item.width * 50, item.height * 50);

      // 그리드 구분선 그리기
      itemGraphic.lineStyle(1, 0x000000, 1); // 검은색 선으로 설정
      for (let x = 0; x < item.width; x++) {
        for (let y = 0; y < item.height; y++) {
          itemGraphic.strokeRect(x * 50, y * 50, 50, 50); // 각 그리드 칸 그리기
        }
      }

      // 아이템 이름 텍스트 생성
      let itemText = this.add
        .text(item.width * 25, item.height * 25, item.shortName, {
          font: "16px Arial",
          color: "#000000",
          align: "center",
        })
        .setOrigin(0.5, 0.5);

      // 컨테이너 생성 및 아이템 그래픽과 텍스트 추가
      let itemContainer = this.add.container(xOffset, yOffset, [
        itemGraphic,
        itemText,
      ]);

      // 컨테이너 인터랙티브하게 설정
      itemContainer.setInteractive(
        new Phaser.Geom.Rectangle(0, 0, item.width * 50, item.height * 50),
        Phaser.Geom.Rectangle.Contains
      );

      // 드래그 가능하게 설정
      this.input.setDraggable(itemContainer);

      // X, Y 오프셋 업데이트
      xOffset += item.width * 50 + 10;
      if (xOffset + item.width * 50 > this.cameras.main.width) {
        xOffset = this.cameras.main.width / 2 + 20;
        yOffset += item.height * 50 + 10;
      }
    });

    // 전역 드래그 이벤트 리스너 추가
    this.input.on(
      "drag",
      (
        pointer: Phaser.Input.Pointer,
        gameObject: Phaser.GameObjects.GameObject,
        dragX: number,
        dragY: number
      ) => {
        if (gameObject instanceof Phaser.GameObjects.Container) {
          gameObject.x = dragX;
          gameObject.y = dragY;

          // 아이템 데이터 캡처 및 저장
          if (gameObject.itemData) {
            this.draggedItemData = {
              id: gameObject.itemData.id, // 아이템의 고유 ID
              x: dragX, // 현재 드래그 중인 아이템의 X 좌표
              y: dragY, // 현재 드래그 중인 아이템의 Y 좌표
              width: gameObject.itemData.width, // 아이템의 너비
              height: gameObject.itemData.height, // 아이템의 높이
            };
          } // 필요한 경우, 여기에서 드래그 중인 아이템에 대한 시각적 피드백을 제공할 수 있습니다.
          gameObject.setAlpha(0.5); // 예시: 드래그 중인 아이템의 투명도를 변경
        }
      }
    );
  }
}
