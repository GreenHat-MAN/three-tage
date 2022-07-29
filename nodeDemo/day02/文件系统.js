// Fs 文件系统
// 得到文件与目录的信息：stat
// 创建一个目录：mkdir
// 创建文件并写入内容：writeFile,appendFile
// 读取文件的内容：readFile
// 列出目录的东西：readdir
// 重命名目录或文件：rename
// 删除目录与文件：rmdir,unlink

// 导入文件系统
const fs=require("fs");

// 1.读取文件
// 同步和异步API方法
// fs.statSync()和fs.stat()

// fs.stat('./nodeDemo/day02/events.js',(err,stat)=>{
//     if(err){
//         console.log(err);
//         console.log("文件读取失败");
//     }else{
//         console.log(stat);
//         console.log(stat.isFile()?'这是一个文件':'这是一个目录');
//     }
// })

// const stat=fs.statSync('./nodeDemo/day02/events.js');
// console.log(stat.isDirectory()?'这是一个目录':'这是一个文件');

// // 2.创建文件
// fs.mkdir('fileDemo',(err)=>{
//     try {
//         console.log('文件夹创建成功!!');
//     } catch (error) {
//         throw error;
//     }
// })

// 3.同步创建文件
// const result=fs.mkdirSync('libs');
// fs.writeFile(path,data,code,callback);新增文件
// fs.writeFile('logs/hello.log','我是写入的数据\n','utf-8',(err)=>{
//     if(err) throw err;
//     console.log('文件创建成功!!!');
// })

// 4.累计新增(顺序是打乱的)
// for(let i=0;i<100;i++){
//     fs.appendFile('logs/hello.log','我是累加的文件-'+i+'\n','utf-8',(err)=>{
//         try {
//             console.log('文件创建成功!!!');
//         } catch (error) {
//             console.log('文件创建失败');
//             console.log(error);
//         }
//     })
// }

// 5.读取文件详细信息readFile
// fs.readFile('logs/hello.log','utf-8',(err,data)=>{
//     if(err) throw err;
//     console.log(data);
// })


// 6.读取目录[ 'hello.log' ]
// fs.readdir('logs','utf-8',(err,files)=>{
//     if(err) throw err;
//     console.log(files);
// })

// 7.重命名
// fs.rename('logs/hello.log','logs/word.log',(err)=>{
//     if(err) throw err;
//     console.log('重命名成功!!!');
// })


// 8.删除文件夹
// fs.rmdir('fileDemo',(err)=>{
//     if(err) throw err;
//     console.log('fileDemo 删除成功!!!');
// })

// 9.删除文件
// fs.unlink('logs/word.log',(err)=>{
//     if(err) throw err;
//     console.log('word 删除成功!!!');
// })

// 10.封装删除指定所有文件的方法
function delFile(path){
    // 定义一个存储所有文件的数组
    let file=[];
    // 判断该文件是否存在
    if(fs.existsSync(path)){
        // 读取所有文件信息
        file=fs.readdirSync(path);
        file.forEach((files,index)=>{
            let curPath=path+'/'+files
            if(fs.statSync(curPath).isDirectory()){
                // 判断这个文件是否是一个目录
                // 递归删除文件夹
                delFile(curPath);
            }else{
                //删除文件
                fs.unlinkSync(curPath);
            }
        })
        fs.rmdirSync(path)
    }
    // 不存在则什么都不做
}

// 方法调用
delFile('logs');