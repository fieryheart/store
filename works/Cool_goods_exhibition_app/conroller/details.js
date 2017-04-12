'use strict'

const database = require('./Dao/database'); // 数据库模板

// 渲染 商品详情页面
exports.renderDetailsPage = (req, res) => {
  let param = {};
      param.p_id = Number(req.query.p_id)
      database.query('select * from t_product where p_id=?', [param.id], function(data){
        let detailsData = data[0];
        res.render('pages/details', {
          layout: 'index',
          title: 'DetailsPage',
          data: detailData,
          seaModule: '/static/js/sea_module/details/details.js',
          cssModule: '/static/css/css_module/details/details.css'
        })
      })
}
