import { CreateRenderer } from "./RendererBase";

export interface PreviewOptions{
  createRenderer: CreateRenderer;
}

export class Preview{
  options:PreviewOptions;
  constructor(options:PreviewOptions){
    this.options=options;
  }
}

