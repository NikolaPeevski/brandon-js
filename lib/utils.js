"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
var path_1 = __importDefault(require("path"));
var Utils = /** @class */ (function () {
    function Utils() {
    }
    /** Returns relative path to execution
     * @returns string
     */
    Utils.getCurrentPath = function () {
        return path_1.default.resolve(".");
    };
    Utils.capitalizeFirstLetter = function (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    return Utils;
}());
exports.Utils = Utils;
