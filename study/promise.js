var f1 = function(resolve, reject){
  setTimeout(function(){
    console.log("第一例：开始");
    resolve("hello");
  }, 1000)
}

var f2 = function(resolve, reject){
  setTimeout(function(){
    console.log("第二例：开始");
    resolve("world");
  },2000)
}

var p = new Promise(f1);

p.then((num) => {
  console.log(num);
  return new Promise(f2)
}).then((num) => {
  console.log(num);
  return 33;
}).then((num) => {
  console.log(num);
})
