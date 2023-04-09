/* eslint-disable no-new-func */
/* eslint-disable @typescript-eslint/no-implied-eval */
/* eslint-disable no-eval */
/* eslint-disable @typescript-eslint/no-empty-function */
import {
  symbolTag,
  functionTag,
  regexpTag,
  dateTag,
  setTag,
  mapTag,
  arrayTag,
  errorTag,
  deepTags,
  getType,
  isObjOrFn,
} from './tools';

const getInit = (target: any): any => new target.constructor();

const forEach = (
  target: any[],
  callback: (value: any, key: number, target?: any[]) => void,
): void => {
  let index = 0;
  const length: number = target.length;
  while (index < length) {
    callback(target[index], index, target);
    index++;
  }
};

const cloneSymbol = (target: symbol): object => {
  return Object(Symbol.prototype.valueOf.call(target));
};

type regExpArray = RegExpExecArray | null;

const cloneRegexp = (target: any): RegExp => {
  const reFlags = /\w*$/;
  const i: regExpArray = reFlags.exec(target);
  const result: RegExp = new target.constructor(target, i);
  result.lastIndex = target.lastIndex;
  return result;
};

const defineFunName = (target: any, name: string): void => {
  Object.defineProperty(target, 'name', {
    value: name,
  });
};

const cloneFinction = (target: () => void): object => {
  const bodyReg = /(?<={)(.|\n)+(?=})/m;
  const paramReg = /(?<=\().+(?=\)\s+{)/;
  const name = target.name;
  let fun: any = null;
  const funStr = target.toString();
  if (target.prototype !== undefined) {
    const param: regExpArray = paramReg.exec(funStr);
    const body: regExpArray = bodyReg.exec(funStr);
    if (body != null) {
      if (param != null) {
        const paramStr: string = param.at(0) ?? '';
        const params: string[] = paramStr.split(',') ?? [];
        fun = new Function(...params, body.at(0) ?? '');
        defineFunName(fun, name);
        return fun;
      }
      fun = new Function(body.at(0) ?? '');
      defineFunName(fun, name);
      return fun;
    }
    fun = function () {};
    defineFunName(fun, name);
    return fun;
  }
  fun = eval(funStr);
  defineFunName(fun, name);
  return fun;
};

const cloneError = (target: Extract<any, any>): Extract<any, any> => {
  const error = new target.constructor(target.message);
  error.name = target.name;
  return error;
};

const cloneOtherType = (target: any, type: string): any => {
  switch (type) {
    case errorTag:
      return cloneError(target);
    case dateTag:
      return new target.constructor(target);
    case symbolTag:
      return cloneSymbol(target);
    case regexpTag:
      return cloneRegexp(target);
    case functionTag:
      return cloneFinction(target);
    default:
      return null;
  }
};

const clone = (target: any, map: WeakMap<any, any> = new WeakMap()): any => {
  if (!isObjOrFn(target)) return target;

  const type = getType(target);
  let cloneTarget: any;

  if (deepTags.includes(type)) {
    cloneTarget = getInit(target);
  } else {
    return cloneOtherType(target, type);
  }

  if (map.has(target)) {
    return target;
  }
  map.set(target, cloneTarget);

  if (type === setTag) {
    target.forEach((value: any) => {
      cloneTarget.add(clone(value, map));
    });
    return cloneTarget;
  }

  if (type === mapTag) {
    target.forEach((value: any, key: string) => {
      cloneTarget.set(key, clone(value, map));
    });
    return cloneTarget;
  }

  let keys: any = null;
  if (type !== arrayTag) {
    keys = Object.keys(target);
  }
  forEach(keys !== null ? keys : target, (value: any, key: number) => {
    if (keys !== null) {
      key = value;
    }
    cloneTarget[key] = clone(target[key], map);
  });

  return cloneTarget;
};

export default clone;
