/**
 * 面向对象的编程（OPP）：将整个系统划分成规模更小的部分，各部分之间独立，这些较小的部分（对象）尽可能多的隐藏实现细节。
 * 只向外暴露有限接口，其他系统可以直接使用，而无需关注内部所隐藏的复杂性。对象通常会隐藏内部状态，只能通过受控的接口来修改，
 * 避免其他对象直接修改。
 * 
 * 当你驾驶一辆汽车时，你操作的是接口----方向盘、离合器、刹车、油门。你只能通过这些接口操作这辆汽车，
 * 有了他们，我们才能驾驶汽车。接口实际上隐藏了所有真正驱动汽车的复杂系统，比如，引擎、电子系统等，作为一名
 * 司机，这些不用你来操心，面向对象编程就类似于这样。
 */
var obj = {
  name: 'x',
  'x-a': 123,
  book: {
    a: 1
  },
  fn: function() {
    console.log('方法是一个具有函数值的对象的属性')
  }
}
obj.book.b = 987;
console.log(obj.name); // x
console.log(obj['x-a']); // 123
console.log(obj.abc); // undefined
console.log(obj.book.b); // 987
obj.fn(); // 方法是一个具有函数值的对象的属性

// 原型：是定义能够被对象实例所使用的属性和函数的一种方式。原型的属性最终会成为对象实例的属性，可视为对象创建的模板。
function Player() {}
Player.prototype.userBat = function() {
    return true;
  }
  // 以普通函数的方式调用player，什么都不会发生
console.log(Player()); // undefined 函数返回的是undefined
// 以构造函数方式调用
// 构造函数的作用：创建多个共享特定特性和行为的对象，用于生成对象的模具，生成的对象具有默认的属性和方法，使用new关键词时，返回this而不是undefined
var p = new Player();
if (p && p.userBat && p.userBat()) {
  console.log('继承了userBat方法'); // 继承了userBat方法
}

// 实例属性比原型属性的优先级更高，查找属性时，先找实例本身，找不到时才到自身的原型上去找，当自身原型上找不到时，才会到父级上查找
// 使用new关键字实例化时，是先将原型上的属性绑定到对象实例中，然后将构造函数中的属性（使用this.的属性）绑定到对象实例中
// 在下面的例子中，this指的是new出来的对象实例p
function Player() {
  this.fn = function() {
    console.log('我是在构造函数内的方法');
  }
}
Player.prototype.fn = function() {
  console.log('我是在原型上的方法');
}
var p = new Player();
p.fn(); // 我是在构造函数内的方法

// 如下代码，可以正常运行，之所以能打印出fn，因为fn是一个隐式全局变量
function Player() {
  fn = '我是构造函数中的私有变量'; // 这个fn是一个隐式的全局变量，如果此处加上var声明，原型中就不能访问该私有变量了
}
var p = new Player();
Player.prototype.fn = function() {
  console.log('我是原型上的方法，我要打印构造函数中的fn：', fn);
}
p.fn(); //
console.log('能打印出fn，证明fn是一个隐式的全局变量', fn);

// 修改后的代码就不能打印出了
function Player() {
  var fn = '我是构造函数中的私有变量';
}
Player.prototype.fn = function() {
  console.log('我是原型上的方法，我要打印构造函数中的fn：', fn);
}
var p = new Player();
p.fn(); // 报错 fn is not defined

/**
 * 使用var在构造函数中声明私有变量和方法，由私有函数或者特权方法访问
 * 特权方法声明在this上，如 this.method = function () {} 外部可以调用，成员可以访问
 * 公共方法声明在prototype上，如 Class.protorype.fn = function () {} 外部和成员可以访问
 * 公共属性声明在this上，如 this.abc = 1，外部可访问
 * 
 * 声明在原型上的方法和属性是所有对象实例共享的（修改对所有实例对象生效），其他的都是实例化的时候，各有一份自己的（修改仅对自身实例对象生效）
 */

function Player(name, age) {
  // 私有变量
  var _name = name || 'x';
  var _age = age || 28;
  // 私有方法
  function _fn() {
    return age > 40 ? true : false;
  }
  // 公共属性
  this.name = _name;
  this.age = _age;
  this.msg = '公共属性';
  // 特权方法
  this.log = function() {
    console.log('_name值为', _name, _age);
    console.log('this上的name值为', this.name, this.age);
  }
}
// 公共方法
Player.prototype.change = function(name) {
  this.name = name;
}
Player.prototype.text = '我是原型上的属性';
Player.value = '我是静态属性';
// 创建实例
var p1 = new Player('小红', 45);
var p2 = new Player('李晓', 20);
//console.log(Player.value); // 我是静态属性 --- 两个函数共享的静态属性
//console.log(p1.value); // 这样访问不了，是在 p1.__proto__.constructor.value上
// p1.log(); // _name值为 小红 45 this上的name值为 小红 45
// p2.log(); // _name值为 李晓 20 this上的name值为 李晓 20
// 调用p1的change方法，只会修改实例p1上的name
p1.change('p1调用');
p1.log(); // _name值为 小红 45  this上的name值为 p1调用 45
p2.log(); // _name值为 李晓 20  this上的name值为 李晓 20
// 更新p1上的age，只会影响自己
p1.age = 88;
p1.log(); // _name值为 小红 45  this上的name值为 p1调用 88
p2.log(); // _name值为 李晓 20  this上的name值为 李晓 20
// 更新p1上的log方法，只会影响自身
p1.log = function() {
  console.log('我是p1修改后的log方法');
}
p1.log(); // 我是p1修改后的log方法
p2.log(); // _name值为 李晓 20  this上的name值为 李晓 20
// 修改原型上的公共属性和方法，会影响2个实例化后的对象
console.log(p1.text); // 我是原型上的属性
console.log(p2.text); // 我是原型上的属性
Player.prototype.text = '我是修改后的原型属性';
console.log(p1.text); // 我是修改后的原型属性
console.log(p2.text); // 我是修改后的原型属性



// 继承：继承是提高代码重用率的利器
/**
 * 要想有一个既没有副作用，又准确无误的继承机制，必须执行以下操作：
 * 1.将原型设置成父类的实例来初始化原型链（继承）。这一步只需要做一个次（因为原型对象是共享的）
 * 2.调用父类的构造函数来初始化对象自身。在每次实例化的时候都要这么做（每次构造对象的时候可以传入不同的参数）
 */
function Employee() {
  this.name = '';
  this.dept = 'None';
  this.salary = '0.00';
}

function Manager() {
  Employee.call(this); // 改变this的指当前构造函数实例化的对象
  this.reports = [];
}
// 此处不使用new，而使用object.create，因为它可以在创建对象的时候指定原型，并且在不调用Employee构造函数的情况下，
// 在父子之间创建和使用new操作符时一样的原型链。（这么创建出来的原型，修改原型上的属性或者方法时，不会影响Employee原型上的？？？）
Manager.prototype = Object.create(Employee.prototype);

function IndividuaContributor() {
  Employee.call(this);
  this.active_projects = [];
}
IndividuaContributor.prototype = Object.create(Employee.prototype);

function TeamLead() {
  Manager.call(this);
  this.dept = 'software';
  this.salary = 100000;
}
TeamLead.prototype = Object.create(Manager.prototype);

function Enginner() {
  TeamLead.call(this);
  this.dept = 'javascript';
  this.desktop_id = '8822';
  this.salary = 80000;
}
Enginner.prototype = Object.create(TeamLead.prototype);

// 实例化对象
// js处理new操作符时，会创建一个新的对象，然后将该对象作为this的值传给构造函数，并将_prototype_设置乘Class.prototype的值
var genericEmployee = new Employee();
console.log(genericEmployee); // Employee { name: '', dept: 'None', salary: '0.00' }

var karen = new Manager(); // 实例化的时候，Manager继承了name，dept，salary一些默认的属性，reports是自身的
console.log(karen); // Employee { name: '', dept: 'None', salary: '0.00', reports: [] }
karen.name = 'karen';
karen.reports = [1, 2, 3];
console.log(karen);
// Employee {
//   name: 'karen',
//   dept: 'None',
//   salary: '0.00',
//   reports: [ 1, 2, 3 ] }

var jason = new TeamLead();
jason.name = 'jason';
console.log(jason); // Employee { name: 'jason', dept: 'software', salary: 100000, reports: {} }


// 如果想要在运行时修改属性值，并希望改对象所有的后代都能继承这个值，就别把属性定义到构造函数中，而是定义到原型上
function Employee() {
  this.dept = 'None';
  this.salary = 0;
}
Employee.prototype.name = '';

function Manager() {
  this.reports = [];
}
Manager.prototype = new Employee();
var sandy = new Manager();
var karen = new Manager();
Employee.prototype.name = 'junk';
console.log(sandy.name, karen.name); // junk  junk
sandy.name = '123';
console.log(sandy.name, karen.name, Employee.prototype.name, Manager.prototype.name); // 123 junk junk junk
Manager.prototype.name = '从manager上修改';
console.log(sandy.name, karen.name, Employee.prototype.name, Manager.prototype.name); // 123 从manager上修改 junk 从manager上修改
// 修改子级原型上的不会影响父级原型上的，但是修改父级的会影响子级和所有实例化的对象（看起来好像是这样）
// 实际的原因是因为，查找属性时，先找实例本身，找不到时才到自身的原型上去找，当自身原型上找不到时，才会到父级上查找，所以才
// 会出现最后一句打印时，sandy.name为123，而karen.name却为“从manager上修改”，因为sandy.name被我赋值过，自身找到了，而karen.name是从原型上找到的


// 接收器与设置器：接收器（getter）用来获取特定属性的值，设置器（setter）用来设置属性值的方法
// 传统的写法：
var person = {
  firstname: 'x',
  lastname: 'y',
  setLastname: function(name) {
    this.lastname = name;
  },
  setFirstname: function(name) {
    this.firstname = name;
  },
  getFullname: function() {
    return this.firstname + ' ' + this.lastname;
  }
}
person.setFirstname('h');
person.setLastname('l');
console.log(person.getFullname()); // h l

// es5默认写法
var person = {
  _firstname: 'x', // _firstname和 set, get后的名字不能同名
  _lastname: 'y',
  set lastname(name) {
    this._lastname = name + '<2>';
  },
  set firstname(name) {
    this._firstname = '<1>' + name;
  },
  get fullname() {
    return this._firstname + ' ' + this._lastname;
  }
}
person.lastname = '明';
person.firstname = '小';
console.log(person.fullname); //<1>小 明<2>

// 写法2，使用object.defineProperty()，即使是对象已经创建后也能使用
var person = {
  firstname: 'x',
  lastname: 'y'
}
Object.defineProperty(person, 'fullname', {
  get: function() {
    return this.firstname + ' ' + this.lastname;
  },
  set: function(name) {
    let arr = name.split(' ');
    this.firstname = arr[0];
    this.lastname = arr[1];
  }
})
person.fullname = '小 明';
console.log(person.fullname); // 小 明

// 工具库 lodash.js underecore.js
