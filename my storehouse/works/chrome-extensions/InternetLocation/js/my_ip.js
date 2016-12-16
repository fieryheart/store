function httpRequest(url, callback){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            callback(xhr.responseText);
        }
    }
    xhr.send();
}



var User = function(){
  this.id = null;
  this.ip = null;
  this.address = null;
  this.on = function(id, data){
    var obj = document.getElementById(id);
    var objT = document.getElementById(id+'T');
    var item = data;
    var i = 0;
    obj.addEventListener('click' , function(item){

      if(i % 2){
        objT.innerText = '';
      }else{
        objT.innerText = data;
      }
      i++;
    });
  }
}

httpRequest('http://ip.chinaz.com/getip.aspx', function(data,status){
  var obj = data.replace("{","").replace("}","").split(",");
  var info_arr = [];
  var info_json = {};
  var user = new User();
  var i = 0;
  for(let i = 0; i < obj.length; i++){
    info_arr = obj[i].replace("'","").replace("'","").split(":");
    info_json[info_arr[0]] = info_arr[1];
  }
  user.ip = info_json.ip;
  user.address = info_json.address;
  user.on('ip', user.ip);
  user.on('address', user.address);
});
