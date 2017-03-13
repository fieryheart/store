
const Utils = {
	
	destructionString: function(string) { 
		return string.replace( /<p>|↵/g , "").replace(/<\/p>|<br \/>/g , "\n").replace(/<\/a>/g, "\n").replace(/<a.*>/g, function(str){
																	let arr = str.match(/(\w+):\/\/([\w.]+)\/?(\S*)/);
																	if(arr){
																		return arr[0].slice(0, arr[0].length-1) + "\n";
																	}else{
																		return ;
																	}
																	
																})
	}
}

export default Utils;