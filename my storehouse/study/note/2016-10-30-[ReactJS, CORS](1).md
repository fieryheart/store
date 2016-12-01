# ReactJS
> 变化的数据 —> DOM操作 —> UI  
> 复杂或频繁的DOM操作产生性能瓶颈  
> React引入虚拟DOM 机制    
> 那么我觉得就是在JS中写HTML和CSS

# Wireshark(抓包工具)

# CORS(跨域资源共享)
> CORS和"Access-Control-Allow-Origin: *"  
> 在服务器方面需要加上上面这些东西来让允许其他域发起请求，如
```PHP
<?php
  header("Access-Control-Allow-Origin:*");
```
> 上面代码的意思是允许任何域发起的请求获取当前服务器的数据。有XSS攻击服务器的风险

# HTTP
> 8种请求方法:  
> GET  
> HEAD  
> POST  
> PUT  
> DELETE  
> CONNECT  
> OPTIONS  
> TRACE