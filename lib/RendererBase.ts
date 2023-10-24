
type OutputType="png";

interface RendererBaseOptionsBase{
  canvas:HTMLCanvasElement;
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
  options:RendererBaseOptions;
  canvas:HTMLCanvasElement;
  time:number;
  constructor(options:RendererBaseOptions){
    this.options=options;
    this.canvas = options.canvas;
    this.time=0;
  }

  stepTime(isLoop:boolean):boolean{
    if(!this.options.isAnimation){
      return false;
    }
    const {fps}=this.options;
    this.time += 1/fps;
    if(this.options.duration<=this.time+Number.EPSILON){
      if(isLoop){
        this.time-=this.options.duration;
        return true;
      }
      return false;
    }
    return true;
  }

  abstract render(): void;

  makeDataURL(): string {

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

export type CreateRenderer=(canvas:HTMLCanvasElement)=>RendererBase;

