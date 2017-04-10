'use strict'

const database = require('.Dao/database'); // 数据库模板

// 渲染About页面
exports.renderAboutPage = (req, res) => {
  database.query("select * from t_product", [], function (data) {
    let productObj = data,
        addressObj = {};

    addressObj.name = "成都";
    addressObj.addres = "高新区";
    addressObj.infor = "天府三街****广场";

    res.render('pages/about', {
      layout: 'index',
      title: 'About',
      product: productObj,
      address: addressObj,
      seaModule: '/static/js/sea_module/about/about.js',
      cssModule: '/static/css/css_module/about/about.css'
    })
  })
}

exports.postData = (req, res) => {
  let arry = [],
      obj = {};

      obj.name = "成都";
      obj.addres = "高新区";
      obj.infor = "天府三街****广场";
      arry.push(obj)

  let htmlData = arry,
      html = '',
      data = {};

      htmlData.forEach(function(element, index){
        html += `<tr>
                  <td style="color:#fc5144">${element.name}</td>
                  <td style="color:#fc5144">${element.addres}</td>
                  <td style="color:#fc5144">${element.infor}</td>
                  <td style="color:#fc5144"></td>
                </tr>`
      })

      data.html = html;
      data.success = true;
      data.errMsg = '请将controller文件夹下的about.js文件的postData方法的 data,success = false改为true';
      res.send(data)
}

// 获取about列表
exports.getListData = (req, res) => {
  database.query('select * from t_product', [], function(data) {
    console.log(data)
    if(data.length > 0){
      var msg = {}, html = '';
          data.forEach(function(element, index){
            html += `<tr>
                        <td style="color:green">${element.p_brand}</td>
                        <td style="color:#444">${element.p_name}</td>
                        <td style="color:#fc5144">${element.p_price}元</td>
                        <td><img style="width:50px;" src="/static/images/list/${element.p_index_imgLIST}"></td>
                        <td><a style="color: white;
                        padding: 10px 30px;
                        display:inline-block;
                        text-decoration: none;
                        background: #ff8000;
                        border-radius:3px;" href="/details?p_id=${element.p_id}">查看详情</a></td>
                      </tr>`
          })
          msg.success = true;
          msg.html = html;
          res.send(msg);
    } else {
      var data = {};
      data.errMsg = "没有商品信息!";
      res.send(data)
    }
  })
}
