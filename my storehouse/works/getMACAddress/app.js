var get = require('./getmac');


get.getMac(function(err, macAddress){
  if(err) throw err;
  var mac = macAddress;
  console.log(mac);
})
