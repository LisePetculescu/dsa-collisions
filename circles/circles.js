"use strict";
window.addEventListener("load", start);

function start() {
  console.log("JavaScript is running");
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
  displayCollisionInfo();
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

const player = {
  x: 0,
  y: 0,
  r: 32,
};

const object = {
  x: 300,
  y: 200,
  r: 90,
};

function isColliding(circleA, circleB) {
  // calculate distance between circle centers
  const distance = 1; // TODO: Make calculation (use Pythagoras)
  // calculate the combined size of both circles (the two radiusses...)
  const combinedSize = 1; // TODO: Make calculation!
  // if distance is less than combined size - we have a collision!
  return distance < combinedSize;
}

/* VIEW */

function displayPlayer() {
  const visualPlayer = document.querySelector("#player");

  visualPlayer.style.setProperty("--x", player.x);
  visualPlayer.style.setProperty("--y", player.y);
  visualPlayer.style.width = 2 * player.r + "px";
}

function displayObject() {
  const visualObject = document.querySelector("#object");

  visualObject.style.setProperty("--x", object.x);
  visualObject.style.setProperty("--y", object.y);
  visualObject.style.width = 2 * object.r + "px";
  if (object.collision) {
    visualObject.classList.add("collision");
  } else {
    visualObject.classList.remove("collision");
  }
}

/* INFO section */

function displayPlayerInfo() {
  document.querySelector("#player-x").textContent = player.x;
  document.querySelector("#player-y").textContent = player.y;
  document.querySelector("#player-r").textContent = player.r;
}

function displayObjectInfo() {
  document.querySelector("#object-x").textContent = object.x;
  document.querySelector("#object-y").textContent = object.y;
  document.querySelector("#object-r").textContent = object.r;
}

function displayCollisionInfo() {
  const collisionInfo = document.querySelector("#collision-status");
  if (player.collision) {
    collisionInfo.textContent = "Collision!!";
    collisionInfo.classList.add("collision");
  } else {
    collisionInfo.textContent = "No collision ...";
    collisionInfo.classList.remove("collision");
  }
}