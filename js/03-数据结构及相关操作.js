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
