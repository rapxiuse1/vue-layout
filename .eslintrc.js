module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/essential",
    "eslint:recommended", //核心规则
  ],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    //"off"或者0    //关闭规则关闭
    //"warn"或者1    //在打开的规则作为警告（不影响退出代码）
    //"error"或者2    //把规则作为一个错误（退出代码触发时为1）
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    indent: ["error", 2], //限定缩进为2个空格
    // 'quotes': [ 'error', 'single' ],//字符串使用单引号
    "no-redeclare": 2, //禁止重复声明变量
  },
}
