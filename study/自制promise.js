var p = Promise.resolve();

setTimeout(function(){
  console.log('three')
},0)

p.then(function(){
  console.log('two');
})

console.log('one')
