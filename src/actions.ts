import { Brand } from './brand';
import Promise from "bluebird";
import fse from 'fs-extra';
import fs from 'fs';
import path from 'path';
import { Utils } from './utils';
import { parse } from 'node-html-parser';


export class Actions {

    public brands = [];
    paths = {
        'assets': './src/'
    };

    validate() {
        return new Promise<any>((resolve, reject) => {
            resolve();
        });
    }

    listBrands(list = true) {
        return new Promise<any>((resolve, reject) => {
            this.validateRoot().then(folders => {
                this.brands = folders;
                if (list) {
                    console.log('--------');
                    folders.map((el: any) => console.log(`-- ${el}`));
                    console.log('--------');
                };
                resolve(folders);
            }).catch((err: any) => reject(err));
        });
    }

    activateBrand(brand: string, config = 0) {
        // TODO: Check if valid root folder
        // TODO: Check if brand exists
        // TODO: Hotswap brands by replacement
        return new Promise<any>((resolve, reject) => {
            this.checkBrand(brand).then(files => {
                console.log(files);
                console.log(config);
                files.forEach((element: string) => {
                    this.copyBrandElements(brand, element);
                });
                let modBrand = Utils.capitalizeFirstLetter(brand.split('-').join(' '));
                this.setHtmlTitle(modBrand);
                resolve();
            }).catch(err => reject(err));
        });
    }

    setHtmlTitle(title: string) {
        fs.readFile(`${Utils.getCurrentPath()}/src/index.html`, 'utf8', function(err, out) {
            let html = parse(out);

        })
    }

    copyBrandElements(brand: string, brandelement: string) {
        if (brandelement === 'assets')
            this.copyBrandElement(`${Utils.getCurrentPath()}/brands/${brand}/assets`, `${Utils.getCurrentPath()}/src/assets`)
        if (brandelement.indexOf('config') > -1 && brandelement.endsWith('ts'))
            this.copyBrandElement(`${Utils.getCurrentPath()}/brands/${brand}/${brandelement}`, `${Utils.getCurrentPath()}/src/environments/${brandelement}`)
        if (brandelement === 'theme')
            this.copyBrandElement(`${Utils.getCurrentPath()}/brands/${brand}/theme`, `${Utils.getCurrentPath()}/src/theme`)
        if (brandelement === 'index.html')
            this.copyBrandElement(`${Utils.getCurrentPath()}/brands/${brand}/index.html`, `${Utils.getCurrentPath()}/src/index.html`)
        
    }

    copyBrandElement(pathFrom: string, pathTo: string) {
        fse.copySync(pathFrom, pathTo, {overwrite: true});
    }

    createBrand(name: string) {
        return new Promise<any>((resolve, reject) => {
            new Brand().create();
            resolve();
        });
    }

    validateRoot(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            fs.readdir(`${Utils.getCurrentPath()}/brands`, (err, files) => {
                if (err) {
                    reject(err);
                }
                resolve(files);
            });
        });
    }

    checkBrand(brand: string) {
        return new Promise<any>((resolve, reject) => {
            fs.readdir(`${Utils.getCurrentPath()}/brands/${brand}`, ((err, files) => {
                if (err) {
                    reject(err);
                }
                resolve(files);
            }));
        });
    }
}