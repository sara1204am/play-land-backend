/* eslint-disable prettier/prettier */
 import { isString } from 'lodash';

 export default class StringFunctions {
     /**
    * Parse a string to a Json object.
    *
    * @static
    * @param {string} jsonString string to parse.
    * @return {*}  {*} json object.
    * @memberof StringFunctions
    */
   static parseJsonSafe(jsonString: string, defaultValue: any = null): any {
    if (!jsonString) {
      return defaultValue;
    }

    if (!isString(jsonString)) {
      return jsonString;
    }

    try {
      return JSON.parse(jsonString);
    } catch (e) {
      console.error(e);
      return defaultValue;
    }
  }

    /**
    * Convert a string to camel case.
    *
    * @static
    * @param {string} str The string to convert.
    * @return {*}  {string} The string in camel case format.
    * @memberof StringFunctions
    */
    static camelCase(str: string): string {
        return (str.slice(0, 1).toLowerCase() + str.slice(1))
          .replace(/([-_ ]){1,}/g, ' ')
          .split(/[-_ ]/)
          .reduce((cur, acc) => {
            return cur + acc[0].toUpperCase() + acc.substring(1);
          });
      }
  
 }
 