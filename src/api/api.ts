import { CHEST_RIG_QUERY, BARTER_ITEM_QUERY } from "./item_queries";

export async function loadRandomData(query: string) {
  try {
    const response = await fetch("https://api.tarkov.dev/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to load data:", error);
    return null;
  }
}

export async function loadChestRigData() {
  return await loadRandomData(CHEST_RIG_QUERY);
}

export async function loadBarterItemsData() {
  return await loadRandomData(BARTER_ITEM_QUERY);
}
