import { rejects } from "assert";
import { time } from "console";
import { resolve } from "path";

function debounce(func, wait, immedit) {
  let timer = null;
  function debounced(...args) {
    const context = this;
    let callNow = !timer;
    let res = null;
    if (timer) {
      clearTimeout(timer);
    }
    if (immedit) {
      timer = setTimeout(() => {
        timer = null;
      }, wait);
      if (callNow) func.apply(context, args);
    } else {
      timer = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    }
  }
  debounced.cancel = () => {
    clearTimeout(timer);
    timer = null;
  };
  return debounced;
}

function curry(func) {
  let len = func.length;
  return function curried(...args) {
    if (len == args.length) {
      func.apply(this, args);
    } else {
      return function (...inArgs) {
        return curried.apply(args.concat(inArgs));
      };
    }
  };
}

function flatten(arr, depth = 1) {
  if (!Array.isArray(arr)) {
    return arr;
  }
  if (depth <= 0) return arr;
  return arr.reduce((acc, cur) => {
    if (Array.isArray(cur)) {
      return acc.concat(flatten(cur, depth - 1));
    } else {
      return acc.concat(cur);
    }
  }, []);
}

class EventEmit {
  events: any;
  constructor() {
    this.events = {};
  }

  on(type, handler) {
    if (!this.events[type]) {
      this.events[type] = [handler];
    } else {
      this.events[type].push(handler);
    }
  }

  off(type, handler) {
    if (!this.events[type]) {
      this.events[type] = [];
    } else {
      this.events[type] = this.events[type].filter(
        (cb) => cb != handler && cb.original != handler,
      );
    }
  }

  emit(type, ...args) {
    if (!this.events[type]) {
      return false;
    }
    this.events[type].forEach((cb) => cb());
    return true;
  }

  once(type, handler) {
    const wrapper = (...agrs) => {
      this.off(type, wrapper);
      handler.apply(this, agrs);
    };
    wrapper.original = handler;
    return this.on(type, wrapper);
  }
}

function deepClone(obj, map = new Map()) {
  if (typeof obj != "object" && obj == null) {
    return obj;
  }

  if (map.has(obj)) {
    return map.get(obj);
  }
  let constructor = obj.constructor;
  if (/^(RegExp|Date|Error)$/i.test(constructor.name)) {
    return new constructor(obj);
  }
  let cloneTarget = Array.isArray(obj)
    ? []
    : Object.create(Object.getPrototypeOf(obj));
  map.set(obj, cloneTarget);
  if (obj instanceof Map) {
    obj.forEach((key, val) => {
      cloneTarget.set(key, val);
    });
    return cloneTarget;
  }
  if (obj instanceof Set) {
    obj.forEach((s) => {
      cloneTarget.set(s);
    });
    return cloneTarget;
  }
  Reflect.ownKeys(obj).forEach((key) => {
    cloneTarget[key] = obj[key];
  });
  return cloneTarget;
}

function myNew(constructor, ...agrs) {
  if (typeof constructor != "function") {
    throw new Error("constructor must be function");
  }
  const obj = Object.create(constructor.prototype);
  const res = constructor.apply(obj, agrs);
  const isFunction = typeof res == "function";
  const isObj = typeof res == "object" && res != null;
  return isFunction || isObj ? res : obj;
}

Promise.myAll((iterator) => {
  return new Promise((resolve, reject) => {
    if (!iterator && typeof iterator[Symbol.iterator] != "function") {
      reject(new Error("args must be iterator"));
    }
    let promises = Array.from(iterator);
    if (promises.length == 0) resolve([]);
    let res = new Array(promises.length);
    let count = 0;
    promises.forEach((promise, i) => {
      Promise.resolve(promise)
        .then((v) => {
          res[i] = v;
          if (++count == promises.length) {
            resolve(res);
          }
        })
        .catch(reject);
    });
  });
});

Function.prototype.myBind = function (context, ...args) {
  if (typeof this !== "function") {
    throw new Error("caller must be function");
  }
  const fn = this;

  const bindFunc = function (...inArgs) {
    if (this instanceof bindFunc) {
      fn.apply(this, ...args);
    } else {
      fn.apply(context, ...args);
    }
  };
  if (fn.prototype) bindFunc.prototype = Object.create(fn.prototype);
  return bindFunc;
};

function createObj(proto) {
  function F() {}
  F.prototype = proto;
  return new F();
}

class LRUCache {
  capacity: number;
  cache: Map<string, string>;
  constructor(capacity: number) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) {
      return null;
    }
    const val = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, val);
    return val;
  }

  set(key, val) {
    if (this.cache.has(key)) {
      this.cache.get(key);
      this.cache.delete(key);
      this.cache.set(key, val);
      return;
    }
    if (this.cache.size >= this.capacity) {
      let next = this.cache.keys().next().value;
      this.cache.delete(next);
    }
    this.cache.set(key, val);
  }
}

class Schedular {
  runningCount: number;
  queue: any[];
  size: number;
  constructor(size) {
    this.size = size;
    this.queue = [];
    this.runningCount = 0;
  }

  run(promise) {
    return new Promise((resolve, reject) => {
      const execuate = () => {
        this.runningCount++;
        promise()
          .then((v) => {
            this.runningCount--;
            if (this.queue.length > 0) {
              let next = this.queue.shift();
              next();
            }
          })
          .catch(reject);
      };
      if (this.queue.length < this.size) {
        execuate();
      } else {
        this.queue.push(execuate);
      }
    });
  }
}

function throttle(func, wait) {
  let previos = 0;
  let timer = null;
  return function (...args) {
    const now = Date.now();
    let remain = wait - (now - previos);
    if (remain <= 0) {
        if(timer) {
            clearTimeout(timer)
            timer = null
        }
        previos = now
        func.apply(this, args)
    } else if (!timer) {
        timer = setTimeout(() => {
            func.apply(this, args)
        }, remain)
    }
  };
}

function Parent(name, colors) {
    this.name =""
    this.colors = []
}

function Child(name, age) {
    Parent.call(this, name)
    this.age = age
}

Child.prototype = Object.create(Parent.prototype)

Child.prototype.constructor = Child