function deepClone<T extends Array<T> | any>(obj: T): T {
  if (typeof obj !== 'object' || obj === null) return obj

  const result = Array.isArray(obj) ? ([] as T) : ({} as T)

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key] = deepClone(obj[key])
    }
  }

  return obj
}

const obj = {
  a: 1,
  b: {
    bb: "hh",
  },
  c() {
    console.log("cc");
  },
};

console.group('deepclone')
const cloneObj = deepClone(obj);
obj.a = 999;
console.log("cloneObj :>> ", cloneObj);
console.log("obj :>> ", obj);
console.groupEnd()
