// 正则表达式创建方式有两种
// 1.正则表达式字面量
var pattern = /test/g;
console.log(pattern.test('test')); // true
// 2.构建regexp对象实例
var pattern = new RegExp('test', 'gi');
console.log(pattern.test('dsfdsfdsftest dsfdsfdsf')); // true

// 匹配字符组，匹配a或b或c
var pattern = /[abc]/;
console.log(pattern.test('adfdsfdsfdsf')); // true

var pattern = /[0-5]/;
console.log(pattern.test(311)); // true
console.log(pattern.test(524)); // true
console.log(pattern.test(679)); // false

// 访问特定模式出现的位置，exec方法类似string对象上的match方法
var pattern = /5/g;
console.log(pattern.exec('2314354678797845345879789345342342142565')); // exec加g无效

// string对象上的match、replace、split方法都能使用正则表达式
console.log('2314354678797845345879789345342342142565'.match(/5/g)); // [ '5', '5', '5', '5', '5', '5' ]
console.log('123456'.replace(/345/, 'red')); // 12red6
console.log('123456'.split(/5/)); // ['1234', '6']

// 字符组快捷写法
console.log('任意的单个数字字符', /\d/.test('1234567890')); // true
console.log('任意的单个字母或数字字符', /\w/.test('abcdefg')); // true
console.log('任意的单个空白字符', /\s/.test('   \r\n')); // true
console.log('任意的单个非数字字符', /\D/.test('abc_=+')); // true
console.log('任意的单个非字母或数字字符', /\W/.test('_-=')); // true
console.log('任意的单个非空白字符', /\S/.test('_-=abc123')); // true
console.log('除换行符之外任意单个字符', /\S/.test('_-=abc123')); // true

// 重复限定符号
console.log('出现0次或者1次[?]', /1?/.test(123)); // true
console.log('出现0次或者多次[*]', /9*/.test(123)); // true
console.log('出现1次或者多次[+]', /1?/.test(111222333)); // true
console.log('出现固定次数[{n}]', /1{4}/.test(111123)); // true
console.log('出现n次到m次[{n, m}]', /1{1,2}/.test(1123)); // true
console.log('至少出现n次[{n,}]', /1{1,}/.test(111111123)); // true
console.log('出现0次到n次[{0,n}]', /1{0,10}/.test(113)); // true

// 匹配独立单词
console.log(/\bcat\b/.test('tomcat')); // false
console.log(/\bcat\b/.test('catabc')); // false
console.log(/\bcat\b/.test('a cat')); // true
console.log(/\babc\b/.test('ade abc cde')); // true

// 选择结构
console.log(/a|b/.test('ad')); // true
console.log(/a|b/.test('bccd')); // true

// 首部与尾部
console.log(/^abcd$/.test('1abcd2')); // false
console.log(/^abcd$/.test('abcd')); // true
console.log(/^a\w+d$/.test('a123aad')); // true

// 向后引用，$1 $2分别代表匹配的两组字串
var orig = '1234 5678';
var re = /(\d{4}) (\d{4})/;
console.log(orig.replace(re, "$2 $1")); // 5678 1234

// 惰性限定符： 在正则表达式后加上问号（？），正常的是贪婪模式，而惰性模式则是尽可能的少地匹配字符串。
// 对于字符串abcXXX，匹配结果可能是abcX,abcXX,abcXXX，惰性模式匹配abcX。
// 使用正则表达式替换字符串的首位空白字符
function trim(str) {
  return (str || '').replace(/^\s+|\s+$/g, '');
}
console.log(`--${trim('   123   ')}---`); // --123---



// 创建数组的3种方法，数组的索引从0开始，length是其长度
// 你可以给length赋值，如果设置为0则是清空数组，如果设置为小于实际长度的值是从0开始截断数组
var arr = new Array(1, 2, 3);
var arr = Array(1, 2, 3);
var arr = [1, 2, 3];
// 如果使用索引查询的数组元素不存在，会返回undefined
console.log(arr[5]);

// 创建一个特定长度的数组
var arr = Array(10); // 数组的长度为10，而不是一个只有一个元素为10的数组

// 遍历数组可以使用for循环以及forEach
var arr = [1, 2, 3];
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}
arr.forEach(function(v, i) {
  console.log(v, i);
})

// for in能遍历数组，但是不建议使用，因为会将prototype和自定义属性也遍历
// for...in循环出的是key，for...of循环出的是value，建议使用es6的for of遍历数组
Array.prototype.arrCustom = function() {};

let iterable = [3, 5, 7];
iterable.foo = 'hello';

for (let i in iterable) {
  console.log(i); // 0, 1, 2, "foo", "arrCustom", "objCustom"
}
for (let value of iterable) {
  console.log(value); // 3, 5, 7
}
// 使用for in遍历对象时，也会将prototype上的属性进行遍历！
Object.prototype.objCustom = function() {};
let obj = {
  name: '123',
  a: 2,
  b: 12
}
for (let key in obj) {
  console.log(key); // name, a, b, objCustom
}
// 建议使用for of遍历对象，同时搭配Object.keys()使用
for (let key of Object.keys(obj)) {
  console.log(key); // name, a, b
}

// Array对象上的方法，更多需求可使用 lodash.js 这个工具函数库处理
console.log('合并数组', [1, 2, 3].concat([4])); // [1, 2, 3, 4];
console.log('将数组转为字符串', [1, 2, 3].join('-')); // 1-2-3
console.log('删除数组最后一个元素并将其返回', [1, 2, 3].pop()); // 3
console.log('添加一个或者多个元素到数组末尾，并返回新的长度', [1, 2, 3].push(4, 5)); // 5
console.log('删除数组一个元素并将其返回', [1, 2, 3].shift()); // 1
console.log('添加一个或多个元素到数组开头，并返回新的长度', [1, 2, 3].unshift(0, 1)); // 5
console.log('反转数组', [1, 2, 3].reverse()); // [3, 2, 1]
console.log('数组升序', [1, 3, 2].sort()); // [1, 2, 3] 默认升序
console.log('数组降序', [1, 3, 2].sort(function(a, b) { return b - a; })); // [3, 2, 1] 降序
console.log('截断数组, 包含从 start 到 end （不包括该元素）', [0, 1, 2, 3, 4, 5].slice(0, 2)); // [0, 1] 参数说明：开始索引，结束索引
console.log('添加或删除项目，返回删除的元素', [4, 5, 6].splice(0, 1, 4, 5)); // [4] 参数说明：开始索引，删除个数，填充的元素...
console.log('从左往右查找元素，返回元素的索引', [1, 2, 3].indexOf(1)); // 0
console.log('从右往左查找元素，返回元素的索引', [1, 2, 1].lastIndexOf(1)); // 2


// es6中的map
var founders = new Map();
founders.set('name', 'x');
founders.set('age', 28);
console.log(founders.size); // 2
console.log(founders.get('abc')) // undefined
console.log(founders.get('name')); // x
console.log(founders.has('ccc')); // false

for (let [k, v] of founders) {
  console.log(k, v); // name x, age 28
}

// es6 中的set，一个集合，其重要特点就是值不能重复出现
var mySet = new Set();
mySet.add(1);
mySet.add(2);
mySet.add(3);
mySet.add(1);
console.log(mySet); // Set { 1, 2 }
mySet.has(1); // true
mySet.delete(2);
console.log(mySet.size) // 2
for (let item of mySet) {
  console.log(item); // 2, 1, 3
}
// 使用set值不能重复出现的特性对数组进行去重
console.log(Array.from(new Set([1, 1, 2, 2, 3, 3])));
