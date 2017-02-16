#出现的问题

* button的click事件没用：mockState放在了render()里面，即使重新渲染了，还是会一样，不会减少苹果数量
* 摘苹果，随机苹果质量：   在fetch返回200后，再本地随机苹果质量
```
    let weight = Math.floor(200 + Math.random() * 50);
    dispatch(actions.donePickApple(weight));
```