import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, DropdownButton, MenuItem, CollapsibleNav} from 'react-bootstrap';
import { connect } from 'react-redux';
import { link } from 'react-router';

	class NavBarHeader extends Component{
		renderLinks(){
			if(this.props.authenticated){
				return <NavItem href="/signout">Sign Out</NavItem>
			}else{
				return[
				  <NavItem key={1} href="/signin">Sign In</NavItem>,
				  <NavItem key={2} href="#">Sign Up</NavItem>
				]; 
			}
		}
		render(){
			return(
					<Navbar>
				  <Navbar.Header>
					<Navbar.Brand>
						<a href='#'>Bucket List</a>
					</Navbar.Brand>
				   </Navbar.Header>
				   <Nav>
				   	{this.renderLinks()}
					<NavDropdown Key={3} title="Cool Stuff" id="basic-nav-dropdrown">
					  <MenuItem Key={3.1}>Action</MenuItem>
					  <MenuItem Key={3.2}>Another action</MenuItem>			   	
					  <MenuItem Key={3.3}>Something else</MenuItem>
					  <MenuItem divider />
					  <MenuItem Key={3.1}>Seperated Link</MenuItem>
				   </NavDropdown>
				  </Nav>
				</Navbar>
				);
		}			
	}


function mapStateToProp(state) {
	return{
		authenticated: state.auth.authenticated
	};
}

export default connect(mapStateToProp)(NavBarHeader);