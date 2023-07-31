import tsCompiler from "typescript"; // TS编译器

// 待分析代码片段字符串
const tsCode = `import { app } from 'framework';                    

const dataLen = 3;
let name = 'iceman';

if(app){
    console.log(name);
}

function getInfos (info: string) {
    const result = app.get(info);
    return result;
}`;

console.log(tsCompiler);

// 获取AST
const ast = tsCompiler.createSourceFile(
  "xxx",
  tsCode,
  tsCompiler.ScriptTarget.Latest,
  true
);
console.log(ast);
