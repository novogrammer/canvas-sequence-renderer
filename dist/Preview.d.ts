import { CreateRenderer } from "./RendererBase";
export interface PreviewOptions {
    createRenderer: CreateRenderer;
}
export declare class Preview {
    options: PreviewOptions;
    constructor(options: PreviewOptions);
}
