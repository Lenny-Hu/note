// js变量名必须以字母、下划线或者是$开头，随后的字符可以是数字和数字。变量名区分大小写。
// 声明变量可以使用var、let（作用域为代码区块"{}"内）、const（常量，声明时必须赋值，不能修改）关键字
var s1; // 声明了一个未定义的变量，其值默认为 undefined。
console.log(`s1的值为[${s1}]`);
let s2 = '1';
var $123 = '123';
var _123 = 'test';
const S2 = '2';
console.log(`s2[${s2}]和S2[${S2}]不是同一个变量`);



// js有以下7种数据类型，可分为基本类型和引用类型（对象）
// 1 number 数值
// 2 string 字符串
// 3 boolean 布尔
// 4 symbol 符号，es6中的新类型
// 5 object 对象（引用类型），有function（函数）、array（数组）、date（日期）、regexp（正则）
// 6 null 空（无值）
// 7 undefined 未定义（未赋值）

// 基本类型使用typeof检查类型，引用类型（对象）使用instanceof检查
let s = '1';
let n = 1;
let bool = true;
let y;
console.log(typeof(s), typeof(n), typeof(bool), typeof(y)); // string, number, boolean, undenfiend
let x = null; // null显示为object是一个历史bug
console.log(typeof(x)); // object
// 检查值为null时，这样写
if (!x && typeof x === 'object') { console.log('x值为null') }

let arr = [];
let fun = function() {};
let reg = /[0-9]{5}/;
let date = new Date();
console.log(arr instanceof Array); // true
console.log(fun instanceof Function); // true
console.log(reg instanceof RegExp); // true
console.log(date instanceof Date); // true

// NaN(not a number的缩写)是一个特殊的值，表示不是一个数字，通常以下代码运算后可以得出
let s1;
let n1 = 1;
let r1 = s1 + n1; // undefined + 1 = NaN, js隐式转换类型失败
console.log(`r1的值为[${r1}]`);
console.log(`NaN只要出现在数学运算的任何一部分，结果都会变成NaN，NaN + 5 = ${NaN + 5}`);
console.log(`判断变量r1是不是一个NaN，使用isNaN(), ${isNaN(r1)}`);
console.log(`NaN不等于NaN ${NaN === NaN}`);

//# number类型能描述32位整数和64位浮点数的值，其实js不存在整数，而是使用64位浮点数来描述整数，如下
console.log(0.1 + 0.2); // 0.30000000000000004
console.log((0.1 + 0.2 === 0.3)); // false 如果依赖高精度的小数，尝试使用big.js这类库来解决问题

// 数值的上下边界，当运算结果大于上限边界时，被赋予Number.POSITIVE_INFINITY，小于下限边界时，被赋予Number.NEGATIVE_INFINITY，
// 上二者表示非数字，可使用 isInfinite()方法来验证运算结果是否为无穷。
console.log(`最大的数字${Number.MAX_VALUE}，最小的数字${Number.MIN_VALUE}，所有的数字一定在这个区间内`);

// 将字符串转为数字，可将字符串开头为数字的字符串转为数字类型，如下：
console.log(`转换整数 ${parseInt(' 0123abc')} 转换浮点数 ${parseFloat(' 123.45abc')}`); // 转换整数 123 转换浮点数 123.45
// 应使用isNaN来处理转换意外情况
console.log(`转换失败，转换后的值为NaN[${parseInt('abc')}]`);


// 字符串是一个unicode字符（每个字符占16位），字符中的字符可以使用索引访问
let s1 = '中国';
console.log(s1[0]); // 中
// 特殊字符有 \n(换行符)，\t(制表符)，\b(退格)，\r(回车)，\\(反斜杠)，\'(单引号)，\“(双引号)

// string也可使用new关键字创建，使用这种方法创建的使用typeof检查结果都为object，不要使用该方式创建！
var s = new String('test');
console.log(s); // test
console.log(typeof(s)); // object

var s2 = '1234567890';
console.log(typeof(s2)); // string
// 字符串类型的工具函数
console.log('字符串长度', s2.length); // 10
console.log('返回指定索引处的字符', s2.charAt(0), s2.charAt(1)); // 1, 2
console.log('在字符串中从前往后查找1和从后往前查找2', s2.indexOf('1'), s2.lastIndexOf('2')); // 0, 1
console.log('判断字符串是否是1开头和0结尾', s2.startsWith('1'), s2.endsWith('0')); // true, true
console.log('字符串中是否包x', s2.includes('x')); // false
console.log('字符串分割成数组', s2.split('')); // [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '0' ]
console.log('字符串转大写', 'abc'.toUpperCase()); // ABC
console.log('字符串转小写', 'ABC'.toLowerCase()); // abc
console.log('去空格', ' test '.trim()); // test
console.log('分割字符串，指定开始和结束索引', s2.slice(1, -1)); // 23456789
console.log('分割字符串，制定开始索引和长度', s2.substr(1, 2)); // 23
console.log('用某些字符替换另一些字符', s2.replace(/1234/ig, '5678')); // 5678567890
console.log('用某些字符替换另一些字符', 'abcdA'.match(/a/ig)); // ['a', 'A']
console.log('查找指定字符串的起始位置', 'abcdA'.search(/a/i)); // 0


// 在JavaScript中，false、0、''、NaN、null和undefined都被视为false，其他的都被视为true
// 不要使用boolean()函数创建布尔值，在老版本的浏览器中会导致无法判断真假（nodejs中好像正常）！
var bFalse = Boolean(false);
console.log(typeof(bFalse)); // object，nodejs环境环境中为boolean
if (bFalse) {
  console.log('布尔值为假，不应该打印我');
}

// js没有日期数据类型，使用date对象处理日期时间，可使用的库moment.js timezone.js date.js
// date对象构造函数使用
var today = new Date(); // 不使用参数，当前时间
var date1 = new Date('December 31, 2015 23:45:32'); // 描述日期的字符串，month day, year hours:minutes:seconds, 如果忽略了时分秒，这些会被设置为0
var date2 = new Date(2018, 8, 23, 21, 13, 56); // 一组表示年月日的整数或者表示年月日时分秒的整数
console.log(today, date1, date2); // 2018-11-15T06:53:16.689Z 2015-12-31T15:45:32.000Z 2018-09-23T13:13:56.000Z
// 处理日期常用函数
console.log('获取年月日时分秒', today.getFullYear(), today.getMonth() + 1, today.getDate(), today.getHours(), today.getMinutes(), today.getSeconds()); // 2018 11 15 14 57 42
console.log('获取当前时间距1970年的毫秒数1', today.getTime());
console.log('获取当前时间距1970年的毫秒数2', Date.now());


// + 操作符，在当着单目操作符号的时候，不会对number类型造成影响。如用在字符串上，会将字符串转为数字类型
let n1 = 25;
n1 = +n1;
console.log(n1); // 25

var b = '10';
console.log(typeof b); // string
b = +b;
console.log(typeof b); // number
// 但是如果字符串无法转乘数字的化，typeof判断类型会出错，慎用！
var c = 'abc';
c = +c;
console.log(typeof c); //number
console.log(c); // NaN
// 当字符串为空时，会转为0
var d = '';
d = +d;
console.log(d); // 0
console.log(typeof d); //number

// ++ 和 -- 操作符号，前者将数值加1，后者将数值减1。既可以作为前缀又能作为后缀，作为前缀时，会先增加变量的值，再将值从表达式返回。
var a = 1;
var b = ++a;
console.log(a, b); // 2 2
// 作为后缀时，先返回值，然后再增加
var a = 1;
var b = a++;
console.log(a, b); // 2 1

// 布尔操作符号： &(and)、|(or)、!(not)，逻辑操作符求值是从左到右
// &&，返回表达式中视为false的值（有多个时返回第一个），否则，返回最后一个视为true的值
console.log(false && true); // false
console.log('a' && 'b' && 0); // 0
console.log(0 && ''); // 0
console.log('c' && 'd'); // d
// ||，返回表达式中视为true的值（有多个时返回第一个），否则，返回最后一个视为false的值
console.log(true || false); // true
console.log('c' || 'd'); // c
console.log('' || 0 || 1); // 1
console.log('' || 0 || null); // null
// !，返回相反的布尔类型结果
console.log(!''); // true

// 三元操作符
var n = 1 > 0 ? 5 : 1;
console.log(n); // 5


// switch 循环
switch (1) {
  case 1:
    console.log(1);
    break;
  case 2:
  case 3:
    console.log(2, 3);
    break;
  default:
    console.log('default');
}
// while循环
let i = 0;
while (i < 10) {
  console.log(i);
  i++;
}
// do-while循环，可确保循环至少执行一次
let i = 0;
do {
  console.log(i);
  i++;
} while (i < 10)
// for 循环
for (let i = 0; i < 10; i++) {
  if (i == 5) { continue; }
  console.log(i);
  if (i == 8) { break; }
}
// 空体for循环
var arr = [20, 30, 40];
for (let i = 0; i < arr.length; arr[i++] = 100); // ++在i后面，先返回后执行+1，所以实际执行的是这句arr[i] = 100
console.log(arr); // [ 100, 100, 100 ]



// 相等比较，严格模式（===）和非严格模式（==），比较的时候，非严格模式会进行类型转换
console.log('' === 0); // false
console.log(0 === '0'); // false
console.log(false === 'false'); // false
console.log(null === undefined); // false

console.log('' == 0); // true
console.log('123' == 123); // true
console.log(null == undefined); // true

// es6提供了Object.is()方法来进行类似于===的严格比较，针对NaN做了特别处理
console.log(NaN === NaN); // false
console.log(Object.is(NaN, NaN)); // true

// 类型转换
let n = 123;
console.log(typeof n.toString()); // string
console.log(typeof String(n)); // string

let s = '123';
console.log(typeof parseInt(s)); // number
console.log(typeof Number(s)); // number

let t = 1;
let u = '' + t; // 隐式类型转换，将t转为字符串类型
console.log(typeof u); // string
// 非数字值需要被强制转换为数字时，js在内部调用toNumber，true变成1，undefined变成NaN，false和null变成0
// 在字符串上使用toNumber进行转换失败时，会返回NaN

// 命名：
// 一般使用驼峰命名法，对于构造函数或者类，使用首字母大写的命名方法，对于私有属性时，在名字前加上下划线。

// 严格模式， 在文件首行加上 ‘use strict’, 不支持的js引擎会忽略这句。

// 工具： jshint 是一个能标记出可疑代码的工具，安装 npm i jshint, 使用 jshint test.js
