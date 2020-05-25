import path from "path";

export class Utils {
  /** Returns relative path to execution
   * @returns string
   */
  static getCurrentPath(): string {
    return path.resolve(".");
  }

  static capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
