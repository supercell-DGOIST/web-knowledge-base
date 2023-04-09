export const arrayTag = '[object Array]';
export const objectTag = '[object Object]';
export const mapTag = '[object Map]';
export const setTag = '[object Set]';
export const argsTag = '[object Arguments]';
export const errorTag = '[object Error]';

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
