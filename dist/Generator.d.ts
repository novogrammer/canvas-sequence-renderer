import { CreateRenderer } from "./RendererBase";
interface GeneratorOptions {
    createRenderer: CreateRenderer;
}
export declare class Generator {
    options: GeneratorOptions;
    constructor(options: GeneratorOptions);
}
export {};
