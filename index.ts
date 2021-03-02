class Progress {
  timestamp = 0;

  duration = 0;

  progress = 0;

  delta = 0;

  isLoop = false;

  constructor(duration: number, isLoop = true) {
    this.duration = duration;
    this.isLoop = isLoop;
  }

  reset() {
    this.timestamp = 0;
  }

  start(now: number) {
    this.timestamp = now;
  }

  tick(now: number) {
    if (this.timestamp) {
      this.delta = now - this.timestamp;
      this.progress = Math.min(this.delta / this.duration, 1);

      if (this.progress >= 1 && this.isLoop) {
        this.start(now);
      }

      return this.progress;
    }

    return 0;
  }
}

class Confetti {
  static readonly ROTATION_RATE = 50;

  static readonly SPRITE_WIDTH = 9;

  static readonly SPRITE_HEIGHT = 16;

  static readonly PAPER_LENGTH = 100;

  static readonly DURATION = 6000;

  static readonly COLORS = ['#EF5350', '#EC407A', '#AB47BC', '#7E57C2', '#5C6BC0', '#42A5F5', '#29B6F6', '#26C6DA', '#26A69A', '#66BB6A', '#9CCC65', '#D4E157', '#FFEE58', '#FFCA28', '#FFA726', '#FF7043', '#8D6E63', '#BDBDBD', '#78909C']

  parent: HTMLElement;

  canvas: HTMLCanvasElement | null;

  ctx: CanvasRenderingContext2D | null;

  width = 100;

  height = 100;

  length = 100;

  yRange = 100;

  rotationRange = 10;

  speedRange = 10;

  sprites: {
    canvas: HTMLCanvasElement;
    position: { initX: number; initY: number };
    rotation: number;
    speed: number;
  }[] = [];

  progress: Progress;

  constructor(param: {
    el?: HTMLElement;
    width?: number;
    height?: number;
    length?: number;
    duration?: number;
    isLoop?: boolean;
    offsetWidth?: number;
    offsetHeight?: number;
  }) {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d')!;

    this.setOptions(param);

    this.render = this.render.bind(this);
    this.build();

    this.canvas.style.cssText = ['display: block', 'position: absolute', 'top: 0', 'left: 0', 'pointer-events: none'].join(';');

    this.parent.append(this.canvas);

    this.progress = new Progress(
      param.duration || Confetti.DURATION,
      !!param.isLoop,
    );

    this.start();

    requestAnimationFrame(this.render);
  }

  build() {
    for (let i = 0; i < this.length; ++i) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;

      canvas.width = Confetti.SPRITE_WIDTH;
      canvas.height = Confetti.SPRITE_HEIGHT;

      const position = {
        initX: Math.random() * this.width,
        initY: -canvas.height - Math.random() * this.yRange,
      };
      const rotation = this.rotationRange / 2 - Math.random() * this.rotationRange;
      const speed = this.speedRange / 2 + Math.random() * (this.speedRange / 2);

      ctx.save();
      ctx.fillStyle = Confetti.COLORS[Math.random() * Confetti.COLORS.length | 0];
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();

      this.sprites.push({
        canvas,
        position,
        rotation,
        speed,
      });
    }
  }

  render(now: number) {
    if (!this.canvas || !this.ctx) {
      return;
    }

    const progress = this.progress.tick(now);

    this.canvas.width = this.width;
    this.canvas.height = this.height;

    for (let i = 0; i < this.length; ++i) {
      this.ctx.save();
      const { position, rotation, speed } = this.sprites[i];
      this.ctx.translate(
        position.initX + rotation * Confetti.ROTATION_RATE * progress,
        position.initY + progress * (this.height + this.yRange),
      );
      this.ctx.rotate(rotation);
      this.ctx.drawImage(
        this.sprites[i].canvas,
        -Confetti.SPRITE_WIDTH * Math.abs(Math.sin(progress * Math.PI * 2 * speed)) / 2,
        -Confetti.SPRITE_HEIGHT / 2,
        Confetti.SPRITE_WIDTH * Math.abs(Math.sin(progress * Math.PI * 2 * speed)),
        Confetti.SPRITE_HEIGHT,
      );
      this.ctx.restore();
    }

    requestAnimationFrame(this.render);
  }

  setOptions(param: {
    el?: HTMLElement;
    width?: number;
    height?: number;
    length?: number;
    duration?: number;
    isLoop?: boolean;
    offsetWidth?: number;
    offsetHeight?: number;
  }) {
    this.parent = param.el || document.body;
    this.width = param.width || this.parent.offsetWidth;
    this.height = param.height || this.parent.offsetHeight;
    this.width += param.offsetWidth || 0;
    this.height += param.offsetHeight || 0;
    this.length = param.length || Confetti.PAPER_LENGTH;
    this.yRange = this.height * 2;

    if (this.progress) {
      this.progress.isLoop = !!param.isLoop;
      this.progress.duration = param.duration || Confetti.DURATION;
    }
  }

  start() {
    this.progress.start(performance.now());
  }

  stop() {
    this.progress.reset();
  }

  destroy() {
    if (this.canvas) {
      this.canvas.remove();
      this.canvas = null;
      this.ctx = null;
    }
  }
}
