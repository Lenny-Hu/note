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


// arguments参数是传递给函数所有参数的集合，其是一个类似数组的结构的数据，可用 Array.prototype.slice.call(arguments)转为数组
var sum = function() {
  let total = 0;
  for (let i = 0; i < arguments.length; i++) {
    total += arguments[i];
  }
  return total;
}
console.log(sum(1, 2, 3)); // 6

// this 指向
// 1 作为函数调用，指向Window
function add() {
  console.log(this);
}
add(); // window
var add = function() {
  console.log(this);
}
add(); // window
// 2 作为方法调用，指向被调用时，所在的对象上。如果存在嵌套对象的话，指向的就是直接的父对象
// 比如 obj.fn()，this指向obj， obj.a.fn()this指向obj.a，方法名前面的点（.）前面是谁，就指向谁
var obj = {
  name: 'xiao hong',
  age: 24,
  get: function() {
    console.log(this.name);
  }
}
obj.get(); // xiao hong
// 下面这个例子，前两次都是函数调用，this指向的是window，后一次是作为对象的方法调用，this指向这个对象
function test() {
  console.log(this);
}
test(); // window
var fn = test;
fn(); // window
var obj = {
  test: test
}
obj.test(); // obj
// 3 作为构造函数调用，this指向new出来的构造实例（使用new前缀调用的函数被称为构造函数）
var Person = function(name) {
  this.name = name;
}
Person.prototype.greet = function() {
  console.log(this.name);
}
var l = new Person('xiao xiao');
l.greet(); // 'xiao xiao'
// 4 通过apply（）和call（）方法调用，this指向两个方法的第一参数
// 使用apply方法调用时，需要传入两个参数：作为函数上下文的对象和作为调用参数的数组 .apply(obj, [a1, a2, a3...])
// 使用call方法调用时，需要传入两个参数：作为函数上下文的对象和参数列表形式的参数  .call(obj, a1, a2, a3...)



// 闭包： 简单来说，闭包就是在函数声明时所创建的作用域
// 如下例子，copy函数执行的时候，因为外围作用域中所有的变量都是闭包的一部分，这也是console.log(magic)能正常执行的原因
var outer = 1;
var copy;

function fn1() {
  var inner = 2;

  function innerfn(param) {
    console.log(outer);
    console.log(inner);
    console.log(param);
    console.log(magic);
  }
  copy = innerfn;
}
console.log(magic); // undefined
var magic = 3;
fn1();
copy('123'); // 1  2  123 3

// 常见的闭包使用模式
// 1 计时器和回调函数，timerfn有一个能覆盖delay作用域的作用域闭包，所以能访问message
function delay(message) {
  setTimeout(function timerfn() {
    console.log(message);
  }, 1000)
}
delay('hello'); // hello
// 2 私有变量，将数据封装成私有变量形式，避免污染，n就是一个私有变量，无法在外部直接访问和修改
function PrivateTest() {
  var n = 0;
  this.get = function() {
    return n;
  }
  this.add = function() {
    n++;
  }
}
var p = new PrivateTest();
p.add();
console.log(p.n); // undefiend
console.log(p.get()) // 1

(function() {
  var n = 123;
  console.log(n);
})();

// 3 循环与闭包
for (var i = 0; i < 6; i++) {
  setTimeout(function() {
    console.log(i);
  }, 200)
}
// 上面这段代码你预期打印 0，1，2，3，4，5 实际打印 6,6,6,6,6,6，我们可以引入一个函数作用域来解决，（es6中也可以使用let解决问题）
for (var i = 0; i < 6; i++) {
  (function(i) {
    setTimeout(function() {
      console.log(i);
    }, 200)
  })(i);
}



// 模块，用来模拟类，强调的是对变量和函数的公共及私有访问。又助于减少全局作用域污染，降低代码之间的命名冲突
// 典型用法
var moduleName = function() {
  // 私有状态
  // 私有函数
  return {
    // 公共状态
    // 公共函数
  }
}

// 要实现以上模式有两个要求，1.必须有一个外围函数，至少需要执行一次，2.外围函数至少返回一个内部函数
var superModule = (function test() {
  var secret = '123456';
  var passcode = '1';

  function getSecret() {
    console.log(secret);
  }

  function getPasscode() {
    console.log(passcode);
  }
  return {
    getSecret: getSecret,
    getPasscode: getPasscode
  }
})();
superModule.getSecret(); // 123456
superModule.getPasscode(); // 1

// 使用函数声明来声明函数，不建议使用函数表达式
// 绝不要在if while中声明函数
// 不要给参数起名arguments
