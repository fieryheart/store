//一个简单的字符串不能换行通过增加行数
var normalString = 'line1' +
		       'line2';
//false
normalString == 'line1\nline2';

//但是在``中是可是实现换行的
var normalString = `line1
line2`;

//true 
normalString == 'line1\nline2';