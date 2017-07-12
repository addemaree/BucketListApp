import React from 'react';
import { Component } from 'react';
import NavBarHeader from './nav';
import Video from './video/video.js';

export default class App extends Component{
	render(){
		return(
				<div>
					<NavBarHeader />
					<Video />
				</div>
			);
	}
}