import Component from '@ember/component';
import { inject as service } from '@ember/service';


export default Component.extend({
	websockets: Ember.inject.service('socket-io'),
	io: null,
	var: "",
	init() {
		// let host = window.location.host
		this._super();
		let io = this.get('websockets').socketFor('http://localhost:3000/');
		this.set('io',io);
		io.on('open', this.myOpenHandler,this);
		io.on('error', this.myerrorHandler, this);
		io.on('message', this.myMessageHandler, this);
		io.on('close', (event)=>{
			console.log('closed');
		}, this);
	},
		message: '',
		myerrorHandler(event){
			console.log("this is the error",event)
		},
		myOpenHandler(event) {
			console.log('On open event has been called:'+ event);
		},
		myMessageHandler(event) {
			console.log('Message:' + event);
			this.set('message',event);
		},
		actions: {
			joinButtonPressed() {
				
				// 	Ember.$.ajax({
				// url:
				// })
			},
			sendButtonPressed(msg) {
				// console.log(this.get('var'))
				let message = this.get('var')
				this.get('io').send(message);
			}
		}
});
