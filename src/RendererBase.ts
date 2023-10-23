
type OutputType="png";

interface RendererBaseOptionsBase{
  canvas?:HTMLCanvasElement;
  outputType:OutputType
}

interface RendererBaseOptionsAnimation extends RendererBaseOptionsBase{
  isAnimation:true;
  fps:number;
  duration:number;
}
interface RendererBaseOptionsNoAnimation extends RendererBaseOptionsBase{
  isAnimation:false;
}


export type RendererBaseOptions=RendererBaseOptionsAnimation|RendererBaseOptionsNoAnimation;


export abstract class RendererBase{
  canvas:HTMLCanvasElement;
  options:RendererBaseOptions;
  setupPromise: Promise<void>;
  constructor(options:RendererBaseOptions){
    this.options=options;
    this.canvas = options.canvas || document.createElement("canvas");
    this.setupPromise=this.setupAsync();
  }

  async setupAsync():Promise<void>{

  }

  async makeDataURLAsync(): Promise<string> {
    await this.setupPromise;

    const { options } = this;

    let type = "";
    switch (options.outputType) {
      case "png":
        type = "image/png";
        break;
      default:
        throw new Error(`unknown type options: ${options}`);
    }

    const { canvas } = this;
    return canvas.toDataURL(type);
  }

}

export type CreateRenderer=()=>RendererBase;

