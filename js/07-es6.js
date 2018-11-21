// bable 将es6转换为es5代码


// es6新语法
// 块级作用域：在代码块（通常指{}中）中的声明的变量被限制在该块中（以前的变量都是函数作用域），
// 为了实现类似的块级作用域，可利用立即调用函数表达式（IIFE）
var a = 1;
(function() {
  var a = 2;
  console.log(a); // 2
})();
console.log(a); // 1
// es6
var a = 1; {
  let a = 2;
  console.log(a); // 2
}
console.log(a); // 1
// let 和 var在for循环中：var声明的变量是全局作用域或者父作用域的，而let声明的则是循环内块作用域的
for (let i = 0; i < 10; i++) {}

// 默认参数
function sum(a = 1, b = 2) {
  return a + b;
}
console.log(sum(5, 3)); // 8
console.log(sum()); // 3

// ...(spread与rest)操作符
// 分散：如果将...放在数组（或是其他可迭代的内容）之前，会将数组中的原色分散到函数的各种参数中
function print(a, b, c, d) {
  console.log(a, b, c, d);
}
print(...[1, 2, 3, 4, 5, 6]); // 1 2 3 4

var arr1 = [1, 2, 3];
var arr2 = [0, ...arr1, 0];
console.log(arr2); // 0, 1, 2, 3, 0

// 聚集：将值聚集到一处
// 下列函数中，a接收第一个参数，b则是一个数组，接收所有的参数
function print(a, ...b) {
  console.log(a, b);
}
print(1, 2, 3, 4, 5, 6, 7); // 1 [2, 3, 4, 5, 6, 7]


// 对象字面量
// 原来的写法
var a = 1;
var b = 2;
var o = {
  a: a,
  b: b
}

// es6
var a = 1;
var b = 2;
var o = { a, b };
console.log(o); // { a: 1, b: 2 }

// 函数分配给属性
var o = {
  fn: function() {
    console.log(123);
  }
}

// es6
var o = {
  fn() {
    console.log(123);
  }
}
o.fn(); // 123


// 模板字面量
var a = 1;
var str = `abc
ccc
ddd`;
console.log(`变量a的值为${a}`); // 变量a的值为1
console.log(str);
// abc
// ccc
// ddd


// map与set
// 对象与map的区别是，对象无法使用非字符串作为键
let m = new Map();
let o = { 'a': 1 };
m.set('b', 1);
m.set(o, 2); // 使用一个对象作为键
console.log(m.has('b')); // true
console.log(m.get(o)); // 2
console.log(m.size); // 2
// m.delete(o);
// m.clear();

// 迭代使用entries()，它会返回一个迭代器，使用函数keys()迭代键，values()迭代值
for (let item of m.entries()) {
  console.log(item); // [ 'b', 1 ]    [ { a: 1 }, 2 ]
}
console.log('-----');
for (let item of m.keys()) {
  console.log(item); // b { a: 1 }
}
console.log('-----');
for (let item of m.values()) {
  console.log(item); // 1, 2
}

// set是不重复值得集合
let b = '123';
let s = new Set([1, 'a', b]);
s.add(4);
console.log(s); // Set { 1, 'a', '123', 4 }

// 迭代使用entries()，它会返回一个迭代器，使用函数keys()迭代键，values()迭代值
for (let item of s.entries()) {
  console.log(item); // [ 1, 1 ]  [ 'a', 'a' ]  [ '123', '123' ]  [ 4, 4 ]
}
console.log('-----');
for (let item of s.keys()) {
  console.log(item); // 1  a  123  4
}
console.log('-----');
for (let item of s.values()) {
  console.log(item); // 1  a  123  4
}
for (let [k, v] of s.entries()) {
  console.log(k, v); // 1 1    a a     123 123     4 4
}


// symbol： 它是唯一且不可变的值，通常用着对象属性的标识符，可以看作是其唯一的ID
let s = Symbol();
console.log(typeof s, s); // symbol

// 迭代器：是具有特定接口的对象，迭代器的next（）方法可返回一个对象，该对象有两个值，value（下一个值），done（是否已经抵达最后一个）
// 通过symbol.iterator()来访问数组的迭代器
var a = [1, 2];
var i = a[Symbol.iterator](); // 数组的迭代器
console.log(i.next()); // { value: 1, done: false }
console.log(i.next()); // { value: 2, done: false }
console.log(i.next()); // { value: undefined, done: true }


// for..of循环: 使用for in循环得到下标，使用for of得到值，forin遍历数组时，会遍历Array对象的自定义属性和原型上的属性
var list = ['a', 'b', 'c'];
for (let i in list) {
  console.log(i); // 0 1 2
}
for (let v of list) {
  console.log(v); // a b c
}
for (let [i, v] of list) {
  console.log(i, v); // a b c
}
// for...of为什么不能遍历Object对象
// 因为能够被for...of正常遍历的，都需要实现一个遍历器Iterator。而数组、字符串、Set、Map结构，早就内置好了Iterator（迭代器），它们的原型中都有一个Symbol.iterator方法，而Object对象并没有实现这个接口，使得它无法被for...of遍历。例如：
Array.prototype[Symbol.iterator];

// ƒ values() { [native code] }

String.prototype[Symbol.iterator];

// ƒ [Symbol.iterator]() { [native code] }

Set.prototype[Symbol.iterator];

// ƒ values() { [native code] }

Map.prototype[Symbol.iterator];

// ƒ entries() { [native code] }

Object.prototype[Symbol.iterator];

// undefined



// 箭头函数 =>, 在箭头函数中，this指向的是写代码时的this指向的那个对象，而不是运行时指向的那个对象
function fn(a, b) { return a + b; }
let fn = (a, b) => a + b;
console.log(fn(1, 2)); // 3
// 单个参数
let fn = a => a + 1;
// 没有参数
let fn = () => 1 + 2;
// iife
(x => x * 3)(3); // 9

// this指向
let fn = function(cb) {
  cb();
}
let obj = {
  fn: function() {
    fn(function() {
      console.log(this); // this指向window
    })
  }
}
obj.fn();

let obj2 = {
  name: 'obj2',
  fn: function() {
    fn(() => {
      console.log(this); // { name: 'obj2', fn: [Function: fn] }
    })
  }
}
obj2.fn();


// 解构
var [a, b, c] = [1, 2, 3];
console.log(a, b, c); // 1 2 3
var [a, , c] = [1, 2, 3];
console.log(a, c); // 1  3
var [a, ] = [1, 2, 3];
console.log(a); // 1

var { a, b } = { a: 1, b: 2 };
console.log(a, b); // 1  2
var { a: name, b: value } = { a: 1, b: 2 };
console.log(name, value); // 1  2
