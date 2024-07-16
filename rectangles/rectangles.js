"use strict";
window.addEventListener("load", start);

function start() {
  console.log("Javascript is running");
  document.addEventListener("keydown", keyEvent);
  document.addEventListener("keyup", keyEvent);

  requestAnimationFrame(tick);
}

function keyEvent(event) {
  const control = controlMap[event.code];
  const value = event.type === "keydown";

  if (control) {
    controls[control] = value;
  }
}

// The control map, maps keycodes to control-directions
const controlMap = {
  ArrowRight: "right",
  KeyD: "right", // you can have multiple keys with the same controls
  ArrowLeft: "left",
  KeyA: "left",
  ArrowUp: "up",
  KeyW: "up",
  ArrowDown: "down",
  KeyS: "down",
  Space: "fire", // But this doesn't work: you can't have
  Space: "jump", // multiple controls for the same key!
};

// the controls contain the directions currently "active"
const controls = {
  up: false,
  down: false,
  left: false,
  right: false,
  fire: false,
  jump: false,
};

/* CONTROLLER */

function tick() {
  // ignore the deltaTime and accurate frame calculation - just move 1 pixel each frame
  requestAnimationFrame(tick);

  // move
  movePlayer();

  // check collisions
  if (isColliding(player, object)) {
    player.collision = true;
    object.collision = true;
  } else {
    player.collision = false;
    object.collision = false;
  }

  // update display
  displayPlayer();
  displayObject();

  // - update info
  displayPlayerInfo();
  displayObjectInfo();
  // displayCollisionInfo();

  // - update geometry
  if (showGeometry) {
    // displayGeometry();
  }
}

function movePlayer() {
  if (controls.left) {
    player.x--;
  } else if (controls.right) {
    player.x++;
  }

  if (controls.up) {
    player.y--;
  } else if (controls.down) {
    player.y++;
  }
}

/* MODEL */

let showGeometry = true;

const player = {
  x: 0,
  y: 0,
  w: 55,
  h: 70,
};

const object = {
  x: 250,
  y: 100,
  w: 190,
  h: 90,
};

function isColliding(rectA, rectB) {
  // determine if the two rectangles are colliding, i.e. overlapping
  let colliding = false;
  // TODO: do collision detection!!

  return colliding;
}

/* VIEW */

function displayPlayer() {
  const visualPlayer = document.querySelector("#player");

  visualPlayer.style.setProperty("--x", player.x);
  visualPlayer.style.setProperty("--y", player.y);
  visualPlayer.style.setProperty("--w", player.w);
  visualPlayer.style.setProperty("--h", player.h);
}

function displayObject() {
  const visualObject = document.querySelector("#object");

  visualObject.style.setProperty("--x", object.x);
  visualObject.style.setProperty("--y", object.y);
  visualObject.style.setProperty("--w", object.w);
  visualObject.style.setProperty("--h", object.h);
}

/* INFO section */

function displayPlayerInfo() {
  document.querySelector("#player-x").value = player.x;
  document.querySelector("#player-y").value = player.y;
  document.querySelector("#player-w").value = player.w;
  document.querySelector("#player-h").value = player.h;
}

function displayObjectInfo() {
  document.querySelector("#object-x").value = object.x;
  document.querySelector("#object-y").value = object.y;
  document.querySelector("#object-w").value = object.w;
  document.querySelector("#object-h").value = object.h;
}
