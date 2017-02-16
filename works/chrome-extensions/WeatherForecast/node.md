带选项页面的扩展
在文件manifest.json中"option_page"是指设定选项的页面（option.html）

在option.js文件中
  1、var city = localStorage.city || 'beijing'应该是给(#city)初始化
  2、localStorage即为一个window中已有的对象
  3、给localStorage写入数据用localStorage.namespace
                   删除数据用localStorage.removeItem('namespace')
  4、localStorage这个对象中的数据是永久存储在计算机硬盘上的，当然都有域的限制
  而这个域是指在相同的协议、相同的主机名、相同的端口下 即用户当前浏览页面所在域中
