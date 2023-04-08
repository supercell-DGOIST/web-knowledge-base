const arrayTag = '[object Array]';
const objectTag = '[object Object]';
const mapTag = '[object Map]';
const setTag = '[object Set]';
const argsTag = '[object Arguments]';

export const symbolTag = '[object Symbol]';
export const functionTag = '[object Function]';
export const regexpTag = '[object RegExp]';
export const dateTag = '[object Date]';

export const deepTags = [arrayTag, objectTag, mapTag, setTag, argsTag];

export const getType = (target: any): string =>
  Object.prototype.toString.call(target);

export const isObjOrFn = (target: any): boolean => {
  const type = typeof target;
  return target !== null && (type === 'object' || type === 'function');
};

export const isObject = (target: any): boolean => getType(target) === objectTag;
