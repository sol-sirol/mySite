class Mouse {
  constructor(canvas) {
    this.x = 0;
    this.y = 0;

    canvas.onmousemove = (e) => {
      const rect = canvas.getBoundingClientRect();

      this.x = e.clientX - rect.left;
      this.y = e.clientY - rect.top;
    };
    // canvas.touchmove = (e) => {
    //   this.x = e.clientX - rect.left;
    //   this.y = e.clientY - rect.top;
    // };
  }
}

class Ball {
  constructor(x, y, radius, color) {
    this.x = x || 0;
    this.y = y || 0;
    this.originalX = x;
    this.originalY = y;
    this.vx = 0;
    this.vy = 0;
    this.radius = radius || 2;
    this.color = color || "#ff0000";
    this.friction = 0.7;
    this.springFactor = 0.01;
  }

  think(mouse) {
    const dx = this.x - mouse.x;
    const dy = this.y - mouse.y;

    const dist = Math.sqrt(dx * dx + dy * dy);

    // interaction
    if (dist < 30) {
      const angle = Math.atan2(dy, dx); //?

      const tx = mouse.x + Math.cos(angle) * 30;
      const ty = mouse.y + Math.sin(angle) * 30;

      this.vx += tx - this.x;
      this.vy += ty - this.y;
    }

    // spring back
    const dx1 = -(this.x - this.originalX);
    const dy1 = -(this.y - this.originalY);

    this.vx += dx1 * this.springFactor;
    this.vy += dy1 * this.springFactor;
    // friction
    this.vx *= this.friction;
    this.vy *= this.friction;

    // actual move
    this.x += this.vx;
    this.y += this.vy;
  }

  setPos(x, y) {
    this.x = x;
    this.y = y;
  }

  draw(ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 2 * Math.PI, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  }
}

class Letter {
  constructor(x, y, letter, font, color) {
    this.x = x || 0;
    this.y = y || 0;
    this.originalX = x;
    this.originalY = y;
    this.vx = 0;
    this.vy = 0;
    this.letter = letter || "";
    // this.radius = radius || 2;
    this.color = color || "#ff0000";
    this.friction = 0.9;
    this.springFactor = 0.01;
    this.font = font || "normal 16px 'Raleway'";
  }

  think(mouse) {
    const dx = this.x - mouse.x;
    const dy = this.y - mouse.y;

    const dist = Math.sqrt(dx * dx + dy * dy);

    // interaction
    if (dist < 30) {
      const angle = Math.atan2(dy, dx); //?

      const tx = mouse.x + Math.cos(angle) * 30;
      const ty = mouse.y + Math.sin(angle) * 30;

      this.vx += tx - this.x;
      this.vy += ty - this.y;
    }

    // spring back
    const dx1 = -(this.x - this.originalX);
    const dy1 = -(this.y - this.originalY);

    this.vx += dx1 * this.springFactor;
    this.vy += dy1 * this.springFactor;
    // friction
    this.vx *= this.friction;
    this.vy *= this.friction;

    // actual move
    this.x += this.vx;
    this.y += this.vy;
  }

  setPos(x, y) {
    this.x = x;
    this.y = y;
  }

  draw(ctx) {
    ctx.save();
    ctx.font = this.font;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(this.letter, this.x, this.y);
    ctx.restore();
  }
}

const text_title = "Философия и Ценности",
  text_1 = "Я думаю, что все хотят одного и того же — отношений с",
  text_2 = "человечеством, мира с метафизическим и опыта со вселенной. ",
  text_3 = "Я пытаюсь понять эти вещи своими ценностями: подлинность,",
  text_4 = "креативность и гостеприимство.";

const canvas = document.getElementById("canvas-3");
let canvasWidth = (canvas.width = canvas.clientWidth);
let canvasHeight = (canvas.height = canvas.clientHeight);

const ctx = canvas.getContext("2d");
const pos = new Mouse(canvas);

let mouse = new Ball(pos.x, pos.y, 30, "#ff0000");
let letters = [];

function drawLetters() {
  function drawLetter(row, rowNember, font) {
    let x = 0;
    let y = 0;

    for (let i = 0; i < row.length; i++) {
      x = 72 + (canvasWidth / 79) * i;
      y = 160 + (canvasWidth / 23.33) * rowNember;
      letters.push(new Letter(x, y, row[i], font));
    }
  }

  drawLetter(text_1, 1, `normal ${canvasWidth / 49.45}px 'Raleway'`);
  drawLetter(text_2, 2, `normal ${canvasWidth / 49.45}px 'Raleway'`);
  drawLetter(text_3, 3, `normal ${canvasWidth / 49.45}px 'Raleway'`);
  drawLetter(text_4, 4, `normal ${canvasWidth / 49.45}px 'Raleway'`);
}
drawLetters();
function drawLettersTitle() {
  function drawLetterTitle(row, rowNember, font) {
    let x = 0;
    let y = 0;

    for (let i = 0; i < row.length; i++) {
      x = 72 + (canvasWidth / 23.33) * i;
      y = 120 + (canvasWidth / 46.66) * rowNember;
      letters.push(new Letter(x, y, row[i], font));
    }
  }

  drawLetterTitle(text_title, 0, `bold ${canvasWidth / 14.35}px 'Raleway'`);
}
drawLettersTitle();

function render() {
  window.requestAnimationFrame(render);
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  letters.forEach((letter) => {
    letter.think(pos);
    letter.draw(ctx);
  });
  // drawLetters();
  mouse.setPos(pos.x, pos.y);
  mouse.draw(ctx);
}

render();
