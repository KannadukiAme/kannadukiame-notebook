# CodeStyle

> 神無月雨的代码风格

## 代码风格

**一律不写分号**

```js
// ✖
const num = 1;

// 〇
const num = 1
```

**一律使用单引号**

```js
// ✖
const str = "abc"

// 〇
const str = 'abc'
```

**一律使用2个键位的空格缩进**

```js
// ✖
function fn1(){
    return 0
}

// 〇
function fn1(){
  return 0
}
```

**不使用多个空格**

```js
// ✖
let  a    =  1

// 〇
let a = 1
```

**注释首行字母空格**

```js
// ✖
//this is a comment

// 〇
// this is a comment
```

**关键字后加空格**

```js
// ✖
if(foo) {
  //
}else {
  //
}

// 〇
if (foo) {
  //
} else {
  //
}
```

**key后加空格**

```js
// ✖
const obj = {
  a:1
}

// 〇
const obj = {
  a: 1
}
```

## ESLint规则

```json
{
  "rules": {
      "semi": [
        "error",
        "never"
      ],
      "quotes": [
        "error",
        "single"
      ],
      "indent": [
        "error",
        2
      ],
      "space-before-blocks": [
        "error"
      ],
      "space-before-function-paren": [
        "error",
        "always"
      ],
      "space-infix-ops": [
        "error",
        {
          "int32Hint": false
        }
      ],
      "no-multi-spaces": "error",
      "spaced-comment": "error",
      "keyword-spacing": "error",
      "space-in-parens": "error",
      "object-curly-spacing": ["error", "always"],
      "key-spacing": "error"
  }
}
```

ESLint规范文档

[List of available rules - ESLint - Pluggable JavaScript linter](https://eslint.org/docs/rules/)

VSCode插件

[vscode-eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

## EditorConfig

```
# .editorconfig
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
insert_final_newline = true
trim_trailing_whitespace = true
```

VSCode插件

[EditorConfig for VSCode](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
