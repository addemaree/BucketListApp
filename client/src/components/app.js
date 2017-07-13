import React from 'react';
import { Component } from 'react';
import NavBarHeader from './nav';
import Video from './video/video.js';
import Signin from './auth/signin';

export default class App extends Component{
	render(){
		return(
				<div>
					<NavBarHeader />
					<Video />
					{this.props.children}
				</div>
			);
	}
}