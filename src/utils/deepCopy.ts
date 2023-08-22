export default function deepCopy(obj: any) {
    // 只拷贝对象 typeof对于数组和对象都返回object
    if (typeof obj !== 'object') return;
    // 根据obj的类型判断是新建一个数组还是一个对象
    let newObj = obj instanceof Array ? [] : {};
    for (let key in obj) {
      // 遍历obj,并且判断是obj的属性才拷贝
      // hasOwnProperty()不攀升原型链，只查看自己的属性
      if (obj.hasOwnProperty(key)) {
        // 判断obj[key]的类型，如果还是数组或者对象就递归调用
        // 不是就执行newObj[key] = obj[key]
        newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
      }
    }
    return newObj;
  }