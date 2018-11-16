// 函数语句方式声明
function add(a, b) {
  return a + b;
}
console.log(add(1, 2)); // 3
// 函数表达式方式声明
let add = function(a, b) {
  return a + b;
}
console.log(add(2, 3)); // 5
// 使用函数表达式声明的函数无法递归调用，可采用具名函数表达式，例如计算给定数值n的阶乘
let factorial = function fn(n) {
  if (n <= 1) {
    return 1;
  }
  return n * fn(n - 1);
}
console.log(factorial(3)); // 6      
// 立即调用的函数表达式（iife），如果加上函数名称
// 1
(function(v) {
  console.log('立即执行的匿名函数');
  console.log(v);
})('第一种写法，传参数');
// 2
(function() {
  console.log('第二种写法');
}())


// 创建全局作用域变量的两种方式
// 1 在所有函数的外部使用var声明变量
// 2 在声明变量时不使用var（隐式全局变量）
var a = 1; // 全局变量
function fn() {
  console.log(a);
}
fn(); // 1

var a = 1; // 全局变量
function fn() {
  a = 2; // 不实用var关键字，会覆盖全局变量a的值
  console.log(a);
}
console.log(a); // 1
fn(); // 2
console.log(a); // 2 fn函数执行过后，变量a的值被修改

function fn() {
  var b = 4;
  a = 3;
  console.log(a, b);
}
fn(); // 3 4
console.log(a); // 3 fn函数内部的变量a未使用var，所以a是全局变量
console.log(b); // 此处代码会报错[b is not defined]，因为没有全局变量b


// 局部作用域：在函数中使用var声明的变量是局部变量，只有该函数或者函数中的函数才能访问
var a = 1;

function fn() {
  var a = 2;
  console.log(a);
}
fn(); // 2
console.log(a); // 1
/* 
js中通常只有一个全局作用域，每个函数有自己的嵌套作用域，在函数内部定义的函数也有局部作用域，
该作用域与外围的作用域是链接在一起的，称为作用域链。在解析一个变量时，从最内部的作用域开始向外搜索。
*/


// 行内函数表达式，fn1作为其他函数的参数
function fn(fn1, v) {
  fn1();
}
fn(function() {
  console.log(123);
}, 2)


// 块作用域：es6中引入的let可生成块作用域
var foo = true;
if (foo) {
  var a = '3'; // 全局作用
  let s = '123'; // 在一对花括号之间有效
  console.log(s); // 123
}
console.log(a); // 3
console.log(s); // 报错 s is not defined

// js代码通常是从上往下执行的，但有一些例外
/*
js运行分两个阶段，编译阶段和执行阶段，编译阶段会将所有函数和变量的声明移动到代码顶部（这就是常说的提升），
只有声明才会提升，赋值和其他逻辑都是保留在原来的位置，在执行阶段处理的。函数声明和变量声明都会被提升，函数在前，变量在后
 */
// 变量提升
console.log(a); // undefined
var a = 1;
// 上述代码提升后，相当于以下代码
var a;
console.log(a);
a = 1;
// -------------------
a = 1;
var a;
console.log(a); // 1
// 上述代码相当于以下代码
var a;
a = 1;
console.log(a); // 1

// 函数提升
foo(); // foo

function foo() {
  console.log('foo');
}
// 提升后，相当于下述代码
function foo() {
  console.log('foo');
}
foo(); // foo

// 函数声明与函数表达式的区别
// 1 函数表达式
console.log(fn); // undefined，fn为变量提升
fn(); // 报错，fn is not a function， 在执行这句时，变量fn的值为undefined，根本不是一个函数
var fn = function() {
  console.log(1);
}

// 2 函数声明
fn(); // 2
function fn() {
  console.log(2);
}
/**
 * 使用函数表达式方式时，是在代码实际执行到其所在位置求值后才得到函数，而求值前的值是undefined，并不是函数，所以调用会报错
 * 使用函数声明方式时，函数声明是在编译阶段声明好了，能在当前作用域找到该函数，所以调用不会报错。
 * 
 */

// 决不能在if条件中使用函数声明，可能导致不明后果
if (true) {
  function fn() {};
} else {
  function fn() {};
}
fn();
// 可使用函数表达式的方式
var fn;
if (true) {
  fn = function() {};
} else {
  fn = function() {};
}
fn();
