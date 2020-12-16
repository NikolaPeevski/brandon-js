"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Actions = void 0;
var brand_1 = require("./brand");
var bluebird_1 = __importDefault(require("bluebird"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var fs_1 = __importDefault(require("fs"));
var utils_1 = require("./utils");
var node_html_parser_1 = require("node-html-parser");
var Actions = /** @class */ (function () {
    function Actions() {
        this.brands = [];
        this.paths = {
            'assets': './src/'
        };
    }
    Actions.prototype.validate = function () {
        return new bluebird_1.default(function (resolve, reject) {
            resolve();
        });
    };
    Actions.prototype.listBrands = function (list) {
        var _this = this;
        if (list === void 0) { list = true; }
        return new bluebird_1.default(function (resolve, reject) {
            _this.validateRoot().then(function (folders) {
                _this.brands = folders;
                if (list) {
                    console.log('--------');
                    folders.map(function (el) { return console.log("-- " + el); });
                    console.log('--------');
                }
                ;
                resolve(folders);
            }).catch(function (err) { return reject(err); });
        });
    };
    Actions.prototype.activateBrand = function (brand, config) {
        var _this = this;
        if (config === void 0) { config = 0; }
        // TODO: Check if valid root folder
        // TODO: Check if brand exists
        // TODO: Hotswap brands by replacement
        return new bluebird_1.default(function (resolve, reject) {
            _this.checkBrand(brand).then(function (files) {
                // console.log(files);
                // console.log(config);
                files.forEach(function (element) {
                    _this.copyBrandElements(brand, element);
                });
                // let modBrand = Utils.capitalizeFirstLetter(brand.split('-').join(' '));
                // this.setHtmlTitle(modBrand);
                resolve();
            }).catch(function (err) { return reject(err); });
        });
    };
    Actions.prototype.setHtmlTitle = function (title) {
        fs_1.default.readFile(utils_1.Utils.getCurrentPath() + "/src/index.html", 'utf8', function (err, out) {
            var html = node_html_parser_1.parse(out);
        });
    };
    Actions.prototype.copyBrandElements = function (brand, brandelement) {
        if (brandelement === 'assets')
            this.copyBrandElement(utils_1.Utils.getCurrentPath() + "/brands/" + brand + "/assets", utils_1.Utils.getCurrentPath() + "/src/assets");
        if (brandelement.indexOf('config') > -1 && brandelement.endsWith('ts'))
            this.copyBrandElement(utils_1.Utils.getCurrentPath() + "/brands/" + brand + "/" + brandelement, utils_1.Utils.getCurrentPath() + "/src/environments/" + brandelement);
        if (brandelement === 'theme')
            this.copyBrandElement(utils_1.Utils.getCurrentPath() + "/brands/" + brand + "/theme", utils_1.Utils.getCurrentPath() + "/src/theme");
        if (brandelement === 'index.html')
            this.copyBrandElement(utils_1.Utils.getCurrentPath() + "/brands/" + brand + "/index.html", utils_1.Utils.getCurrentPath() + "/src/index.html");
    };
    Actions.prototype.copyBrandElement = function (pathFrom, pathTo) {
        fs_extra_1.default.copySync(pathFrom, pathTo, { overwrite: true });
    };
    Actions.prototype.createBrand = function (name) {
        return new bluebird_1.default(function (resolve, reject) {
            new brand_1.Brand().create();
            resolve();
        });
    };
    Actions.prototype.validateRoot = function () {
        return new bluebird_1.default(function (resolve, reject) {
            fs_1.default.readdir(utils_1.Utils.getCurrentPath() + "/brands", function (err, files) {
                if (err) {
                    reject(err);
                }
                resolve(files);
            });
        });
    };
    Actions.prototype.checkBrand = function (brand) {
        return new bluebird_1.default(function (resolve, reject) {
            fs_1.default.readdir(utils_1.Utils.getCurrentPath() + "/brands/" + brand, (function (err, files) {
                if (err) {
                    reject(err);
                }
                resolve(files);
            }));
        });
    };
    return Actions;
}());
exports.Actions = Actions;
