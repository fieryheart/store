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
  this.on = function(id){
    var obj = document.getElementById(id);
    obj.addEventListener('click' , function(){
      console.log(this[id]);
      this.innerText = this[id];
    });
  }
}



httpRequest('http://ip.chinaz.com/getip.aspx', function(data,status){
  var obj = data.replace("{","").replace("}","").split(",");
  var info_arr = [];
  var info_json = {};
  var user = new User();
  for(let i = 0; i < obj.length; i++){
    info_arr = obj[i].replace("'","").replace("'","").split(":");
    info_json[info_arr[0]] = info_arr[1];
  }
  user.ip = info_json.ip;
  user.address = info_json.address;
  console.log(user);
  user.on('ip');
  user.on('address');
});
