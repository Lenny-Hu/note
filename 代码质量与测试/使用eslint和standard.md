###  代码质量控制工具
- [ESline](https://cn.eslint.org/)
- [standard:标准的ESlint规则](https://standardjs.com/readme-zhcn.html)

### 为什么我们要在项目中使用ESLint
> ESLint可以校验我们写的代码，给代码定义一个规范，项目里的代码必须按照这个规范写。
> 加入ESLint有非常多的好处，比如说可以帮助我们避免一些非常低级的错误，一些格式上的问题导致我们在运行生产环境的时候出现一些不明所以的报错。还有就是在跟团队协作的时候，每个人都保持同一个风格进行代码书写，这样团队内部相互去看别人的代码的时候，就可以更容易的看懂。

### 如何使用
- 这些都是eslint-config-standard这个npm包里推荐我们去安装的，因为它的校验规则要依赖于这些plugins进行去验证
```
$ npm i eslint eslint-config-standard eslint-plugin-standard eslint-plugin-promise eslint-plugin-import eslint-plugin-node -D
```
- 然后，我们要去项目的根目录里面手动创建一个.eslintrc文件，然后在里面敲入以下代码：
```
{
  "extends": "standard"
}
```
> 在Vue项目里，.vue文件写的是类似于html的格式，不是标准的JavaScript文件，ESLint无法直接识别.vue文件里的JavaScript代码，那么这个时候我们需要去安装一个工具，$ npm i eslint-plugin-html -D，因为在vue文件里面写JavaScript代码也是写在script标签里面的，这个插件的作用就是识别一个文件里面script标签里面的JS代码，官方也是这么推荐的。所以我们要在.eslintrc文件里面新增这么一段：

```
{
  "extends": "standard",
  "plugins": [
    "html"
  ]
}
```
> 执行完以上步骤后，我们跳转到package.json文件里面的scripts里面新增一条命令：
```
"lint": "eslint --ext .js --ext .jsx --ext .vue src/"

$ npm run lint
```
> --ext后面需要写上指定检测文件的后缀，如.js、.jsx、 .vue等，紧接着后面要写上一个参数，这个参数就是我们要检测哪个目录下面的文件，一般项目文件都在src下面，所以在后面写上src/就好。现在我们就可以到terminal里面输入$ npm run lint，来检验项目里的代码是否符合ESLint的规则。一般来说，我们项目在前期没有加入ESLint的时候，后期我们加入了之后跑一下，基本上都会出现非常的多报错，一执行检查就是满屏的error和warning，简直是丧心病狂不堪入目~
> 使用下面的方法让ESLint自动修复报错，提高开发效率
```
// 当然，还有一种万能方法，就是在报错的JS文件中第一行写上/* eslint-disable */，详情可见官网的User guide（用户指南）。
"lint-fix": "eslint --fix --ext .js --ext .jsx --ext .vue src/"

$ npm run lint-fix
```
- 怎么在项目中预处理错误，eslint-loader来帮忙
> 我希望在项目开发的过程当中，每次修改代码，它都能够自动进行ESLint的检查。因为在我们改代码的过程中去做一次检查，如果有错误，我们就能够很快地去定位到这个问题，由于是我们刚刚改过的，因此立马把它修复掉就OK了。这就避免了我们每次改了一大堆代码之后，要去提交的时候，再去跑一次ESLint，有可能有很多地方要去改，浪费我们的时间，因为你一下子就定位不到这个问题在哪里了。同时我们每次改代码的时候去检测，也能改善我们写代码的规范性，让我们慢慢养成规范写代码的习惯。
```
$ npm i eslint-loader babel-eslint -D

// 执行完上述操作后，我们需要跳转到.eslintrc文件里面配置一下：
{
  "extends": "standard",
  "plugins": [
    "html"
  ],
  "parser": "babel-eslint"
}
```
> 为什么我们要配置parser呢？因为我们的项目是基于webpack的，项目里的代码都是需要经过babel去处理的。babel处理的这种语法可能对ESLint不是特别的支持，然后我们使用loader处理ESLint的时候就会出现一些问题。所以一般来说，我们用webpack和babel来进行开发的项目，都会指定它的parser使用babel-eslint。
> 执行完以上步骤之后，在build目录下找到我前几篇文章里讲到的webpack.config.base.js，然后在module下面的rules里面添加一个对象：
```
rules: [
  {
    test: /\.(vue|js|jsx)$/,
    loader: 'eslint-loader',
    exclude: /node_modules/,
    enforce: 'pre'
  },
  ......
]
```
> 此时大家可能心里纳闷了，闰土啊你写的前面三个我们都能看懂，最后一个 enforce: 'pre'这是什么鬼？
> 别急，且听我慢慢道来。因为.vue文件已经被vue-loader处理过了，而eslint-loader只是做代码检测，肯定不能让它去默认处理.vue文件。所以我们希望vue-loader在处理.vue文件之前，让eslint-loader先进行一次代码检测。如果代码检测都通过不了的话，那么vue-loader就不需要处理了，直接报错就OK了。所以需要加上 enforce: 'pre'，这叫预处理。
> 执行完上述步骤之后，我们就可以去terminal里面尽情地跑一下 $ npm run dev，等运行成功后，我们可以在项目里找一个js文件，故意报个错保存一下，比如说多加个空格之类的，然后我们的terminal里面就会马上报错，此刻我猜想terminal的内心活动应该是：“TMD，写的什么烂代码，天天写bug气得我每次脸都涨的通红”~~~

原文地址：https://m.imooc.com/article/32222




