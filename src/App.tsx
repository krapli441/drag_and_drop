import React, { Component } from "react";
import "./inventory.scss";

const _items = [
  {
    name: "AK-47",
    image:
      "url(https://cdn.discordapp.com/attachments/656601175763845180/930158749270831214/ak47_2.png)",
    image2:
      "url(https://cdn.discordapp.com/attachments/656601175763845180/930158749040136223/ak47.png)",
    size_width: 2,
    size_height: 4,
  },
  {
    name: "Mag",
    image:
      "url(https://media.discordapp.net/attachments/656601175763845180/930158750952730705/mag.png)",
    image2:
      "url(https://media.discordapp.net/attachments/656601175763845180/930158751183425586/mag_2.png)",
    size_width: 1,
    size_height: 2,
  },
  {
    name: "AMMO",
    image:
      "url(https://cdn.discordapp.com/attachments/656601175763845180/930158749509910538/ammo.png)",
    image2:
      "url(https://cdn.discordapp.com/attachments/656601175763845180/930158749769941042/ammo_2.png)",
    size_width: 1,
    size_height: 1,
  },
  {
    name: "Backpack",
    image:
      "url(https://cdn.discordapp.com/attachments/656601175763845180/930158750101274684/backpack.png)",
    image2:
      "url(https://cdn.discordapp.com/attachments/656601175763845180/930158750629785650/backpack_2.png)",
    size_width: 5,
    size_height: 7,
  },
];

class Inventory extends Component {
  state = {
    items: _items,
    grid: { width_block: 10, height_block: 10, size: 50 }, // size: px, block: amount
  };

  handleClick = () => {
    const { items } = this.state;
    items.push({
      name: `Items${items.length + 1}`,
      size_width: 1,
      size_height: 1,
    });
    this.setState({ items });
  };
  render() {
    const { items, grid } = this.state;
    const { width_block, height_block, size } = grid;
    return (
      <>
        <button
          onClick={this.handleClick}
          style={{ position: "absolute", top: "80%", left: "50%" }}
        >
          Add Item
        </button>
        <div
          className="inventory-drag-wrapper"
          style={{
            gridTemplateColumns: `repeat(${width_block}, ${size}px)`,
            width: `${width_block * size + 3}px`,
            height: `${height_block * size + 3}px`,
            gridTemplateRows: `repeat(${width_block}, ${size}px)`,
          }}
        >
          <InventoryBlock
            items={items}
            amount={width_block * height_block}
            size={size}
          />
        </div>
      </>
    );
  }
}

class InventoryBlock extends Component {
  state = {
    item_blocks: [...Array(this.props.amount)], // I'm too lazy to do it all manually, thanks to JS for this wonderful feature.
  };

  #findEmptySlot = (data) => {
    const { amount, size } = this.props;
    for (var id = 0; id <= amount; id++) {
      let can_stop;
      const first_point = document.getElementById(`block_item_${id}`);
      if (first_point && !this.state.item_blocks[id]) {
        const rect = first_point.getBoundingClientRect();
        const Vector2 = this.getSizeCoords(data, rect, size);
        for (var i = 0; i < Vector2.length; i++) {
          const coords = Vector2[i];
          const elem = document.elementFromPoint(coords.x, coords.y);
          if (
            (elem && elem.className === "item-block") ||
            elem.className !== "block"
          ) {
            can_stop = true;
            break;
          }
        }
        if (!can_stop) {
          this.#addItem(id, data);
          break;
        }
      }
    }
  };

  #addItem = (id, data) => {
    const { item_blocks } = this.state;
    if (item_blocks[id]) return;
    if (!id && id !== 0) return this.#findEmptySlot(data);
    item_blocks[id] = {
      name: data.name || "NOT NAME",
      image:
        data.image ||
        "url(https://icon-library.com/images/none-icon/none-icon-23.jpg)",
      image2:
        data.image2 ||
        data.image ||
        "url(https://icon-library.com/images/none-icon/none-icon-23.jpg)",
      description: data.description || "NOT DESCRIPTION",
      weight: data.weight || "NOT WEIGHT",
      size_width: data.size_width || 1,
      size_height: data.size_height || 1,
      slot_id: data.slot_id || null,
    };
    this.setState({ item_blocks });
  };

  getSizeCoords = (data, rect, size) => {
    const get_coords = [];
    for (var h = 1; h <= data.size_height; h++) {
      // X - Width / Y - Height / I'm on this math, fuck how long it took to come to it
      for (var w = 1; w <= data.size_width; w++) {
        // We create a new square, and on this square we check if the block is with the "item-block" class, if so, then it cannot be rearranged
        const coords = { x: 0, y: 0 }; // By the way, I fucked my mouth with JS, why isn't Vector2 here?
        let padding = 5;
        coords.x = rect.x + ((w === 1 && padding) || size * w - 30); // And this is my great mathematics. It's better not to fucking touch, otherwise it might go all over the cunt
        coords.y = rect.y + ((h === 1 && padding) || size * h - 30);
        get_coords.push(coords);
      }
    }
    return get_coords;
  };

  #removeItem = (id) => {
    const { item_blocks } = this.state;
    item_blocks[id] = undefined;
    this.setState({ item_blocks });
  };

  #getBlockId = (elem) => {
    let id = elem.id.replace("block_item_", "");
    return id;
  };

  #getItemBlockId = (elem) => {
    let id = elem.id.replace("item_block_", "");
    return id;
  };

  #createElement = ({ x, y }, item) => {
    const clone = document.createElement("div");
    clone.style.width = (item && item.style.width) || `20px`;
    clone.style.height = (item && item.style.height) || `20px`;
    clone.style.backgroundImage =
      (item && item.style.backgroundImage) ||
      `url(https://icon-library.com/images/none-icon/none-icon-23.jpg)`;
    clone.style.overflow = "hidden";
    clone.style.backgroundPosition = "center";
    clone.style.backgroundSize = "contain";
    clone.style.boxSizing = "border-box";
    clone.style.backgroundRepeat = "no-repeat";
    clone.style.position = "absolute";
    clone.style.backgroundColor = "#1e1f21";
    clone.style.Color = "rgba(255,255,255,1)";
    clone.style.left = x + "px";
    clone.style.top = y + "px";
    clone.style.zIndex = "9999";
    clone.style.pointerEvents = "none";
    clone.classList.add("clone-item");
    document.body.prepend(clone);
    return clone;
  };

  onDragReady = ({ x, y }, data, size) => {
    const first_point = document.elementFromPoint(x, y);
    const rect = first_point.getBoundingClientRect();
    const Vector2 = this.getSizeCoords(data, rect, size);
    let first_coords, can_stop;

    for (var i = 0; i < Vector2.length; i++) {
      const coords = Vector2[i];
      if (!first_coords) first_coords = coords;
      const elem = document.elementFromPoint(coords.x, coords.y);
      if (
        (elem && elem.className === "item-block") ||
        (elem.className !== "block" && elem.className !== "block-wrapper")
      ) {
        can_stop = true;
        break;
      }
    }
    return { first_coords: first_coords, can_stop: can_stop };
  };

  onDragStart = (e) => {
    if (e.button !== 0) return;
    const item = e.target;
    const id = this.#getItemBlockId(item); // Where
    const data = this.state.item_blocks[id]; // data in args
    const { size } = this.props;
    let rotate = false;
    if (item && id && data) {
      const clone = this.#createElement({ x: e.clientX, y: e.clientY }, item);
      this.#removeItem(id);
      let can_drop;

      const mouseMove = (e) => {
        if (e.pageX > 0 && e.pageX < window.innerWidth - 60) {
          clone.style.left = e.pageX + "px";
        }

        if (e.pageY > 0 && e.pageY < window.innerHeight - 60) {
          clone.style.top = e.pageY + "px";
        }

        const { first_coords, can_stop } = this.onDragReady(
          { x: e.clientX, y: e.clientY },
          data,
          size
        );

        if (can_stop) clone.style.backgroundColor = "red";
        // If you can't drag
        else clone.style.backgroundColor = "green"; //  If you can drag

        if (can_stop) return;

        const elem = document.elementFromPoint(first_coords.x, first_coords.y);
        if (elem) can_drop = elem;
      };
      const mouseUp = (e) => {
        clone.remove();
        document.removeEventListener("keydown", mouseMove);
        document.removeEventListener("mousemove", mouseMove);
        document.removeEventListener("mouseup", mouseUp);
        const { can_stop } = this.onDragReady(
          { x: e.clientX, y: e.clientY },
          data,
          size
        );
        if (can_stop && rotate) {
          rotateR({}, true);
          this.#addItem(id, data);
          return;
        }
        const where_id = can_drop && this.#getBlockId(can_drop);
        if (where_id) this.#addItem(where_id, data);
        else this.#addItem(id, data);

        can_drop = false;
      };

      const rotateR = (e, flag) => {
        if (e.code === "KeyR" || flag) {
          const { size_height, size_width } = data;
          let new_height, new_width;
          new_height = size_width;
          new_width = size_height;
          clone.style.height = size * new_height + "px";
          clone.style.width = size * new_width + "px";
          data.size_height = new_height;
          data.size_width = new_width;
          let oldimg = data.image;
          data.image = data.image2;
          data.image2 = oldimg;
          clone.style.backgroundImage = data.image;
          rotate = !rotate;
        }
      };
      document.addEventListener("keyup", rotateR);
      document.addEventListener("mousemove", mouseMove);
      document.addEventListener("mouseup", mouseUp);
    }
  };
  componentDidMount() {
    Object.entries(this.props.items).map((el, i) => {
      setTimeout(() => {
        this.#addItem(null, el[1]);
      }, 0); // This timeout for loading DOM element, delete this and add item not correct work
      return null;
    });
  }

  render() {
    const { item_blocks } = this.state;
    const { size } = this.props;
    return item_blocks.map((v, i) => {
      return (
        <div className="block-wrapper" key={i}>
          {typeof v === "undefined" && (
            <div className="block" id={`block_item_${i}`}></div>
          )}
          {typeof v !== "undefined" && (
            <div
              className="item-block"
              id={`item_block_${i}`}
              onMouseDown={this.onDragStart}
              style={{
                backgroundImage: v.image,
                width: size * v.size_width || 1,
                height: size * v.size_height || 1,
                backgroundColor: "#1e1f21",
                color: "rgba(255,255,255,1)",
                overflow: "hidden",
                backgroundPosition: "center",
                backgroundSize: "contain",
                boxSizing: "border-box",
                backgroundRepeat: "no-repeat",
                position: "absolute",
              }}
            >
              {v.name}
            </div>
          )}
        </div>
      );
    });
  }
}
export default Inventory;
