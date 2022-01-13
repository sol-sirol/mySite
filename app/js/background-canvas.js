(function () {
  let doAnim = true;
  window.onload = function () {
    const simplebarScrollbar = document.querySelector(
      ".simplebar-vertical>.simplebar-scrollbar"
    );
    const mainContentWrapper = document.querySelector(
      ".simplebar-content-wrapper"
    );

    mainContentWrapper.onscroll = function (e) {
      const num = parseInt(
        simplebarScrollbar.style.transform.replace(/\D+/g, "")
      );

      if (String(num).substring(2) > 2000) {
        doAnim = false;
      } else doAnim = true;
    };
  };

  const canvas = document.getElementById("canvas-2");

  let ctx = canvas.getContext("2d"),
    w = (canvas.width = innerWidth),
    h = (canvas.height = innerHeight),
    particles = [],
    properties = {
      bgColor: "rgba(101, 101, 101, 1)",
      particleColor: "rgba(255, 255, 255, 1)",
      particleRadius: 3,
      particleCount: 70,
      particleMaxVelocity: 0.5,
      lineLength: 150,
      particleLife: 6,
    };

  window.onresize = function () {
    (w = canvas.width = innerWidth), (h = canvas.height = innerHeight);
  };

  class Particle {
    constructor() {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.velocityX =
        Math.random() * (properties.particleMaxVelocity * 2) -
        properties.particleMaxVelocity;
      this.velocityY =
        Math.random() * (properties.particleMaxVelocity * 2) -
        properties.particleMaxVelocity;
      this.life = Math.random() * properties.particleLife * 60;
      this.ff = Math.random() * 4.5;
      this.ff < 1.8 ? (this.ff = 1.8) : (this.ff = this.ff);
    }
    position() {
      (this.x + this.velocityX > w && this.velocityX > 0) ||
      (this.x + this.velocityX < 0 && this.velocityX < 0)
        ? (this.velocityX *= -1)
        : this.velocityX;
      (this.y + this.velocityY > h && this.velocityY > 0) ||
      (this.y + this.velocityY < 0 && this.velocityY < 0)
        ? (this.velocityY *= -1)
        : this.velocityY;
      this.x += this.velocityX;
      this.y += this.velocityY;
    }
    reDraw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.ff, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fillStyle = properties.particleColor;
      ctx.fill();
    }
    reCalculateLife() {
      if (this.life < 1) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.velocityX =
          Math.random() * (properties.particleMaxVelocity * 2) -
          properties.particleMaxVelocity;
        this.velocityY =
          Math.random() * (properties.particleMaxVelocity * 2) -
          properties.particleMaxVelocity;
        this.life = Math.random() * properties.particleLife * 60;
      }
      this.life--;
    }
  }

  function reDrawBackground() {
    // grd = ctx.createRadialGradient(w/2,h/2,300, w/2,h/2,320, w/2,h/2,350,);

    // // Попробуйте добавить цвета с первым параметром от 0 до 1
    // grd.addColorStop(0, "#5221E6");
    // grd.addColorStop(0.25, "#ffff00");
    // grd.addColorStop(0.5, "#00ff00");
    // grd.addColorStop(0.75, "#0000ff");
    // grd.addColorStop(1, "#c1b4e7");

    // ctx.fillStyle = grd;
    // ctx.fillRect(0, 0, w, h);

    // for (let i = 0; i < 16; i++) {
    //     for (let j = 0; j < 16; j++) {
    //         ctx.fillStyle = `rgb(
    //             ${Math.floor(255 - 16 * i)},
    //             0,
    //             ${Math.floor(255 - 16 * j)}
    //         )`;
    //         ctx.fillRect(j * w/16, i * w/16, w/16, w/16);
    //     }
    // }

    ctx.fillStyle = "rgba(99, 0, 209, 0.26)";
    ctx.fillRect(0, 0, w, h);

    // let img = new Image();
    // img.src = '../images/russia/1261954120_background-42.jpg';
    // img.onload = function() {
    // let pattern = ctx.createPattern(img, 'repeat');
    // ctx.fillStyle = pattern;
    // ctx.fillRect(0, 0, w, h);
    // };
  }

  function drawLines() {
    let x1, y1, x2, y2, length, opacity;
    for (let i in particles) {
      for (let j in particles) {
        x1 = particles[i].x;
        y1 = particles[i].y;
        x2 = particles[j].x;
        y2 = particles[j].y;
        length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        if (length < properties.lineLength) {
          opacity = 1 - length / properties.lineLength;
          ctx.lineWidth = "0.5";
          ctx.strokeStyle = "rgba(255, 255, 255, " + opacity + ")";
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.closePath();
          ctx.stroke();
        }
      }
    }
  }

  function reDrawParticles() {
    for (let i in particles) {
      particles[i].reCalculateLife();
      particles[i].position();
      particles[i].reDraw();
    }
  }

  function loop() {
    if (doAnim) {
      reDrawBackground();
      reDrawParticles();
      drawLines();
    }
    requestAnimationFrame(loop);
  }

  function init() {
    for (let i = 0; i < properties.particleCount; i++) {
      particles.push(new Particle());
    }

    loop();
  }
  init();
})();
