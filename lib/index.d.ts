declare class Progress {
    timestamp: number;
    duration: number;
    progress: number;
    delta: number;
    isLoop: boolean;
    constructor(duration: number, isLoop?: boolean);
    reset(): void;
    start(now: number): void;
    tick(now: number): number;
}
declare class Confetti {
    static readonly ROTATION_RATE = 50;
    static readonly SPRITE_WIDTH = 9;
    static readonly SPRITE_HEIGHT = 16;
    static readonly PAPER_LENGTH = 100;
    static readonly DURATION = 6000;
    static readonly COLORS: string[];
    parent: HTMLElement;
    canvas: HTMLCanvasElement | null;
    ctx: CanvasRenderingContext2D | null;
    width: number;
    height: number;
    length: number;
    yRange: number;
    rotationRange: number;
    speedRange: number;
    sprites: {
        canvas: HTMLCanvasElement;
        position: {
            initX: number;
            initY: number;
        };
        rotation: number;
        speed: number;
    }[];
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
    });
    build(): void;
    render(now: number): void;
    setOptions(param: {
        el?: HTMLElement;
        width?: number;
        height?: number;
        length?: number;
        duration?: number;
        isLoop?: boolean;
        offsetWidth?: number;
        offsetHeight?: number;
    }): void;
    start(): void;
    stop(): void;
    destroy(): void;
}
