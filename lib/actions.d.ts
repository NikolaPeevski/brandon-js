import Promise from "bluebird";
export declare class Actions {
    brands: never[];
    paths: {
        assets: string;
    };
    validate(): Promise<any>;
    listBrands(list?: boolean): Promise<any>;
    activateBrand(brand: string, config?: number): Promise<any>;
    setHtmlTitle(title: string): void;
    copyBrandElements(brand: string, brandelement: string): void;
    copyBrandElement(pathFrom: string, pathTo: string): void;
    createBrand(name: string): Promise<any>;
    validateRoot(): Promise<any>;
    checkBrand(brand: string): Promise<any>;
}
