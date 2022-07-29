const url=require("url");

const myurl=new URL("https://a:b@測試?abc#foo");

console.log(myurl.href);

console.log(myurl.toString());

console.log(url.format(myurl,{fragment:false,unicode:true,auth:false}));

console.log(url.resolve('http://dalaodi.com/index','test'));//解析地址