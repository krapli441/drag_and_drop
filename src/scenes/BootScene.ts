// src/scenes/BootScene.ts
import Phaser from "phaser";
const { request, gql } = require("graphql-request");

export default class BootScene extends Phaser.Scene {
  private itemDataLoaded: boolean = false;
  constructor() {
    super("BootScene");
  }

  preload() {}

  create() {
    if (!this.itemDataLoaded) {
      this.loadRandomItemData();
    }
  }
  async loadRandomItemData() {
    const query = `
    query {
      items(categoryNames: ChestRig) {
        name
        id
        width
        height
        hasGrid
        link
        image8xLink
        basePrice
        properties {
          ...on ItemPropertiesChestRig {
            grids {
              width
              height
            }
            capacity
          }
        }
      }
    }
    `;

    try {
      const response = await fetch("https://api.tarkov.dev/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const { data } = await response.json();
      const randomIndex = Math.floor(Math.random() * data.items.length);
      const randomItem = data.items[randomIndex];
      console.log("무작위로 선정된 아이템 : ", randomItem);

      this.load.start();
      this.itemDataLoaded = true;
    } catch (error) {
      console.error("Failed to load item data:", error);
    }
  }
}
