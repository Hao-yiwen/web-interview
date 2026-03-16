function debounce(func, wait, immedit) {
  let timer = null;
  const debounced = function (...args) {
    let context = this;
    let callNow = !timer;
    let res;
    if (timer) {
      clearTimeout(timer);
    }
    if (immedit) {
      timer = setTimeout(() => {
        timer = null;
      });
      if (!callNow) res = func.apply(context, args);
    } else {
      timer = setTimeout(() => {
        res = func.apply(context, args);
      }, wait);
    }
    return res;
  };
  debounced.cancel = () => {
    clearTimeout(timer);
    timer = null;
  };
  return debounced;
}

function curry(func) {
  let len = func.length;
  return function curried(...args) {
    if (args.length == len) {
      return func.apply(this, args);
    } else {
      return function (...nextargs) {
        return curried(args.concat(nextargs));
      };
    }
  };
}

function flatten(arr, depth = 1) {
  if (!Array.isArray(arr)) {
    return arr;
  }
  if (depth <= 0) return arr;
  return arr.reduce((acc, val) => {
    if (Array.isArray(val)) {
      return acc.concat(flatten(val, depth - 1));
    } else {
      return acc.concat(val);
    }
  }, []);
}

class EventEmit {
  events: any;
  constructor() {
    this.events = {};
  }

  on(type, handler) {
    if (this.events[type]) {
      this.events[type].push(handler);
    } else {
      this.events[type] = [handler];
    }
    return this;
  }

  off(type, handler) {
    if (!this.events[type]) {
      this.events[type] = [];
    }
    if (this.events[type]) {
      this.events[type] = this.events[type].filter(
        (cb) => cb != handler && cb.origin != handler,
      );
    }
    return this;
  }

  once(type, handler) {
    const wrapper = (...args) => {
      this.off(type, wrapper);
      handler.apply(this, ...args);
    };
    this.on(type, wrapper);
    return this;
  }

  emit(type, ...args) {
    if (!this.events[type]) {
      return false;
    }
    this.events[type].forEach((cb) => {
      cb.apply(this, args);
    });
    return true;
  }
}

function deepClone(obj, map = new Map()) {
  if (typeof obj !== "object" || typeof obj == null) {
    return obj;
  }
  if (map.get(obj)) {
    return map.get(obj);
  }
  let constructor = obj.constructor;
  if (/^(RegExp|Date|Error)$/i.test(constructor.name)) {
    return new constructor();
  }
  let cloneTarget = Array.isArray(obj)
    ? []
    : Object.create(Object.getPrototypeOf(obj));
  map.set(obj, cloneTarget);
  if (obj instanceof Map) {
    obj.forEach((key, val) => {
      cloneTarget.set(key, deepClone(val, map));
    });
    return cloneTarget;
  }
  if (obj instanceof Set) {
    obj.forEach((val) => {
      cloneTarget.add(deepClone(val, map));
    });
  }
  Reflect.ownKeys(obj).forEach((key) => {
    cloneTarget[key] = deepClone(obj[key], map);
  });
  return cloneTarget;
}

function myNew(constructor, ...args) {
  if (typeof constructor !== "function") {
    throw new TypeError("constructor must be function");
  }

  const obj = Object.create(constructor.prototype);
  const result = constructor.apply(obj, args);

  const isFunction = typeof result == "function";
  const isObject = typeof result == "object" && result != null;
  return isFunction || isObject ? result : obj;
}

Promise.myAll = function (iterator) {
  return new Promise((resolve, reject) => {
    if (iterator == null || typeof iterator[Symbol.iterator] != "function") {
      reject(new Error("Arguments must be iterator"));
    }

    let promises = Array.from(iterator);
    if (promises.length == 0) resolve([]);
    let res = new Array(promises.length);
    let count = 0;
    promises.forEach((p, i) => {
      Promise.resolve(p)
        .then((v) => {
          res[i] = v;
          if (++count == promises.length) {
            resolve(res);
          }
        })
        .catch(reject);
    });
  });
};

Function.prototype.mybind = function (contenxt, ...outerArgs) {
  if (typeof this != "function") {
    throw new Error("caller must be function");
  }
  const fn = this;

  const bindfunc = function (...inArgs) {
    // 判断是不是new调用
    if (this instanceof bindfunc == true) {
      return fn.apply(this, outerArgs.concat(inArgs));
    } else {
      return fn.apply(contenxt, outerArgs.concat(inArgs));
    }
  };
  // new的情况下更改原形链条
  if (fn.prototype) bindfunc.prototype = Object.create(fn.prototype);
  return bindfunc;
};

function createObjc(proto) {
  function F() {}
  F.prototype = proto;
  return new F();
}

class LRUCache {
  cache: Map<string, any>;
  capacity: number;
  constructor(capactiy) {
    this.capacity = capactiy;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.get(key)) {
      return -1;
    }
    let value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  set(key, value) {
    if (this.cache.get(key)) {
      this.cache.delete(key);
      this.cache.set(key, value);
    } else if (this.cache.size < this.capacity) {
      this.cache.set(key, value);
    } else {
      this.cache.delete(this.cache.keys().next().value);
      this.cache.set(key, value);
    }
  }
}

class Schedular {
  size: number;
  runningCount: number;
  queue: Array<any>;
  constructor(size) {
    this.size = size;
    this.runningCount = 0;
    this.queue = [];
  }

  task(promise) {
    return new Promise((resolve, reject) => {
      const execuate = () => {
        this.runningCount++;
        promise()
          .then(resolve)
          .catch(reject)
          .finally(() => {
            this.runningCount--;
            if (this.queue.length > 0) {
              let next = this.queue.shift();
              next();
            }
          });
      };
      if (this.runningCount < this.size) {
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
    let now = Date.now();
    let reaming = wait - (now - previos);
    if (reaming <= 0) {
      if(timer){
        clearTimeout(timer)
        timer = null
      }
      previos = now
      func.apply(this, args)
    } else if (!timer) {
      timer = setTimeout(() => {
        previos = Date.now();
        func.apply(this, args);
      }, reaming);
    }
  };
}

function Parent(name, colors){
    this.name=name
    this.colors=["红"]
}

function Child(name, grade){
    Parent.call(this, name,)
    this.grade = grade
}

Child.prototype = Object.create(Parent.prototype)

Child.prototype.constructor = Child

Child.prototype.sayHello = function() {
    console.log("hi")
}
const child1 = new Child("li", 90)
const child2 = new Child("dsadsa", 100)
child1.colors.push("黑恶化")
console.log(child2.colors)

