/* eslint-disable prettier/prettier */
export default class ValidationFunctions {
    /**
     * Checks of the value is Null or Undefined.
     *
     * @static
     * @param {*} value value to evaluate
     * @returns {boolean}
     * @memberof tp40Utils
     */
    static isNullOrUndefined(value: any): boolean {
      return value === null || value === undefined;
    }
  
    /**
     * Evaluate if a string is valid URL
     *
     * @static
     * @param {string} url
     * @returns {boolean}
     * @memberof tp40Utils
     */
    static validateUrlString(url: string): boolean {
      const regex =
        /^(ftp|http|https|chrome|:\/\/|\.|@){2,}(localhost|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|\S*:\w*@)*([a-zA-Z]|(\d{1,3}|\.){7}){1,}(\w|\.{2,}|\.[a-zA-Z]{2,3}|\/|\?|&|:\d|@|=|\/|\(.*\)|#|-|%)*$/;
      return regex.test(url);
    }
  
    /**
     * Checks if the value is an Object type value.
     *
     * @static
     * @param {*} value value to evaluate
     * @returns {boolean}
     * @memberof tp40Utils
     */
    static isLiteralObject(value: any): boolean {
      return !!value && value.constructor === Object;
    }
  }
  