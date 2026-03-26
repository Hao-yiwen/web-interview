import { clear, time } from "console";
import { resolve } from "path";

function debounce(func, wait, immedit) {
    let timer = null
    const debounced = function(...args) {
        let contenxt = this
        let callNow = !timer
        let res;
        if(timer){
            clearTimeout(timer)
        }
        if(immedit) {
            timer = setTimeout(() => {
                timer = null
            },wait)
            if(!callNow) res=func.apply(contenxt, args)
        } else {
            timer = setTimeout(() => {
                res = func.apply(contenxt, args)
            },wait)
        }
        return res
    }
    debounced.cancel = () => {
        clearTimeout(timer)
    }
    return debounced
}

function curry(func) {
    let len = func.length
    return function curried(...args) {
        if(args.length == len){
            func.apply(this, args)
        } else {
            return function(...nextArgs) {
                return curried(args.concat(nextArgs))
            }
        }
    }
}

function flatten(arr, depth=1){
    if(!Array.isArray(arr)) {
        return arr
    }
    if(depth<=0) return arr
    return arr.reduce((acc, cur)=> {
        if(Array.isArray(cur)) {
            return acc.concat(flatten(cur, depth -1))
        } else {
            return acc.concat(cur)
        }
    },[])
}

class EventEmit{
    events: any
    constructor(){
        this.events = {}
    }

    on(type, handler) {
        if(this.events[type]) {
            this.events[type].push(handler)
        } else {
            this.events[type] = [handler]
        }
        return this
    }

    off(type, handler) {
        if(!this.events[type]) {
            this.events[type] = []
        }
        if(this.events[type]) {
            this.events[type] = this.events[type].filter(
                (cb) => cb != handler && cb.origin != handler
            )
        }
        return this
    }

    once(type, handler) {
        const wrapper = (...args) {
            this.off(type, wrapper)
            handler.apply(this, ...args)
        }
        wrapper.origin = handler
        this.on(type, wrapper)
        return this
    }

    emit(type, ...args) {
        if(!this.events[type]){
            return false
        }
        this.events[type].forEach((cb) => {
            cb.apply(this, args)
        })
        return true
    }
}

function deepClone(obj, map=new Map()){
    if(typeof obj != "object" || obj == null){
        return obj
    }
    if(map.get(obj)){
        return map.get(obj)
    }
    let constructor = obj.constructor
    if(/^(RegExp|Date|Error)$/i.test(constructor.name)) {
        return new constructor(obj)
    }
    let cloneTarget = Array.isArray(obj) ? []: Object.create(Object.getPrototypeOf(obj))
    map.set(obj, cloneTarget)
    if(obj instanceof Map){
        obj.forEach((key, val) => {
            cloneTarget.set(key, deepClone(val, map))
        })
        return cloneTarget
    }
    if(obj instanceof Set){
        obj.forEach((val) => {
            cloneTarget.add(deepClone(val, map))
        })
    }
    Reflect.ownKeys(obj).forEach((key) => {
        cloneTarget[key] = deepClone(obj[key], map)
    })
    return cloneTarget
}

function myNew(constructor, ...args) {
    if(typeof constructor != "function") {
        throw new Error("constructor must be fucntion")
    }
    const obj = Object.create(constructor.prototype)
    const res = constructor.apply(obj, args)

    const isFunction = typeof res == "function"
    const isObject = typeof res === "object" && res != null
    return isFunction || isObject ? res : obj
}

Promise.myAll = function(iterator) {
    return new Promise((resolve, reject) => {
        if(iterator == null || typeof iterator[Symbol.iterator] != "function") {
            reject("必须是迭代器属性")
        }
        let promises = Array.from(iterator)
        if(promises.length == 0) resolve([])
        let res = new Array(promises.length)
        let count = 0
        promises.forEach((p,i) => {
            Promise.reject(p)
                .then(v => {
                    res[i] = v
                    if(++count == promises.length){
                        resolve(res)
                    }
                })
                .catch(reject)
        })
    })
}

Function.prototype.mybind = function(contenxt, ...outerArgs) {
    if(typeof this != "function") {
        throw new Error("必须是函数")
    }
    const fn = this

    const bindfunc = function(...args){
        if(this instanceof bindfunc == true) {
            return fn.apply(this, outerArgs.concat(args))
        } else {
            return fn.apply(contenxt, outerArgs.concat(args))
        }
    }
    if(fn.prototype) bindfunc.prototype = Object.create(fn.prototype)
    return bindfunc
}

function createObj(proto) {
    function F(){}
    F.prototype = proto
    return new F()
}

class Schedular{
    size: number
    runningCount: number
    queue: Array<any>
    constructor(size) {
        this.size = size
        this.queue =[]
        this.runningCount =0
    }

    task(promise) {
        return new Promise((resolve, reject) => {
            const execute = () => {
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
                execute();
            } else {
                this.queue.push(execute);
            }
        });
    }
}

function throttle(func, wait){
    let previos =0
    let timer = null
    return function(...args) {
        let now = Date.now()
        let remain = wait - (now - previos)
        if(remain <=0) {
            if(timer) {
                clearTimeout(timer)
                timer = null
            }
            previos = now
            func.apply(this.args)
        } else if(!timer){
            timer = setTimeout(() => {
                previos = Date.now()
                func.apply(this, args)
            }, remain)
        }
    }
}