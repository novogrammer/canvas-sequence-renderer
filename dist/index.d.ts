type OutputType = "png";
interface RendererBaseOptionsBase {
    canvas?: HTMLCanvasElement;
    outputType: OutputType;
}
interface RendererBaseOptionsAnimation extends RendererBaseOptionsBase {
    isAnimation: true;
    fps: number;
    duration: number;
}
interface RendererBaseOptionsNoAnimation extends RendererBaseOptionsBase {
    isAnimation: false;
}
type RendererBaseOptions = RendererBaseOptionsAnimation | RendererBaseOptionsNoAnimation;
declare abstract class RendererBase {
    canvas: HTMLCanvasElement;
    options: RendererBaseOptions;
    setupPromise: Promise<void>;
    constructor(options: RendererBaseOptions);
    setupAsync(): Promise<void>;
    makeDataURLAsync(): Promise<string>;
}

export { RendererBase, type RendererBaseOptions };
