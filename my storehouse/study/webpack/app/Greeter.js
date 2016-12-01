
import React,  {Component} from 'react'
import config from './config.json';
import styles from './Greeter.css';

class Greeter extends Component{
	render() {
		return (
			<div className={styles.root}>
			{config.greetText}
			</div>
		);
	}
}

export default Greeter



// var config = require('./config.json');

// module.exports = function() {
//   var greet = document.createElement('div');
//   greet.textContent = "Hi ,this is webpack-studying!" + " eval-source-map" +" devServer";
//   greet.innerHTML += "<br />" + config.greetText;
//   greet.style.fontFamily = "微软雅黑";
//   return greet;
// };