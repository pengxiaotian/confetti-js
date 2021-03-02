var Progress = (function () {
    function Progress(duration, isLoop) {
        if (isLoop === void 0) { isLoop = true; }
        this.timestamp = 0;
        this.duration = 0;
        this.progress = 0;
        this.delta = 0;
        this.isLoop = false;
        this.duration = duration;
        this.isLoop = isLoop;
    }
    Progress.prototype.reset = function () {
        this.timestamp = 0;
    };
    Progress.prototype.start = function (now) {
        this.timestamp = now;
    };
    Progress.prototype.tick = function (now) {
        if (this.timestamp) {
            this.delta = now - this.timestamp;
            this.progress = Math.min(this.delta / this.duration, 1);
            if (this.progress >= 1 && this.isLoop) {
                this.start(now);
            }
            return this.progress;
        }
        return 0;
    };
    return Progress;
}());
var Confetti = (function () {
    function Confetti(param) {
        this.width = 100;
        this.height = 100;
        this.length = 100;
        this.yRange = 100;
        this.rotationRange = 10;
        this.speedRange = 10;
        this.sprites = [];
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.setOptions(param);
        this.render = this.render.bind(this);
        this.build();
        this.canvas.style.cssText = ['display: block', 'position: absolute', 'top: 0', 'left: 0', 'pointer-events: none'].join(';');
        this.parent.append(this.canvas);
        this.progress = new Progress(param.duration || Confetti.DURATION, !!param.isLoop);
        this.start();
        requestAnimationFrame(this.render);
    }
    Confetti.prototype.build = function () {
        for (var i = 0; i < this.length; ++i) {
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            canvas.width = Confetti.SPRITE_WIDTH;
            canvas.height = Confetti.SPRITE_HEIGHT;
            var position = {
                initX: Math.random() * this.width,
                initY: -canvas.height - Math.random() * this.yRange
            };
            var rotation = this.rotationRange / 2 - Math.random() * this.rotationRange;
            var speed = this.speedRange / 2 + Math.random() * (this.speedRange / 2);
            ctx.save();
            ctx.fillStyle = Confetti.COLORS[Math.random() * Confetti.COLORS.length | 0];
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.restore();
            this.sprites.push({
                canvas: canvas,
                position: position,
                rotation: rotation,
                speed: speed
            });
        }
    };
    Confetti.prototype.render = function (now) {
        if (!this.canvas || !this.ctx) {
            return;
        }
        var progress = this.progress.tick(now);
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        for (var i = 0; i < this.length; ++i) {
            this.ctx.save();
            var _a = this.sprites[i], position = _a.position, rotation = _a.rotation, speed = _a.speed;
            this.ctx.translate(position.initX + rotation * Confetti.ROTATION_RATE * progress, position.initY + progress * (this.height + this.yRange));
            this.ctx.rotate(rotation);
            this.ctx.drawImage(this.sprites[i].canvas, -Confetti.SPRITE_WIDTH * Math.abs(Math.sin(progress * Math.PI * 2 * speed)) / 2, -Confetti.SPRITE_HEIGHT / 2, Confetti.SPRITE_WIDTH * Math.abs(Math.sin(progress * Math.PI * 2 * speed)), Confetti.SPRITE_HEIGHT);
            this.ctx.restore();
        }
        requestAnimationFrame(this.render);
    };
    Confetti.prototype.setOptions = function (param) {
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
    };
    Confetti.prototype.start = function () {
        this.progress.start(performance.now());
    };
    Confetti.prototype.stop = function () {
        this.progress.reset();
    };
    Confetti.prototype.destroy = function () {
        if (this.canvas) {
            this.canvas.remove();
            this.canvas = null;
            this.ctx = null;
        }
    };
    Confetti.ROTATION_RATE = 50;
    Confetti.SPRITE_WIDTH = 9;
    Confetti.SPRITE_HEIGHT = 16;
    Confetti.PAPER_LENGTH = 100;
    Confetti.DURATION = 6000;
    Confetti.COLORS = ['#EF5350', '#EC407A', '#AB47BC', '#7E57C2', '#5C6BC0', '#42A5F5', '#29B6F6', '#26C6DA', '#26A69A', '#66BB6A', '#9CCC65', '#D4E157', '#FFEE58', '#FFCA28', '#FFA726', '#FF7043', '#8D6E63', '#BDBDBD', '#78909C'];
    return Confetti;
}());
//# sourceMappingURL=index.js.map