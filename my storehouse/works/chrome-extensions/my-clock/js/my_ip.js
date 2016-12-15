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

httpRequest('http://ip.chinaz.com/getip.aspx', function(data,status){
  var ip_obj = data.replace("{","").replace("}","").split(",");
  var ip_arr = [];
  var ip_json = {};
  for(let i = 0; i < ip_obj.length; i++){
    ip_arr = ip_obj[i].replace("'","").replace("'","").split(":");
    ip_json[ip_arr[0]] = ip_arr[1];
  }
  console.log(ip_json);
  document.getElementById('ip').innerText = ip_json.ip;
  document.getElementById('address').innerText = ip_json.address;
});
