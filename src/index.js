import React from 'react';
import ReactDOM from 'react-dom';
import MediaQuery from 'react-responsive';
import {HashRouter as Router, Route, NavLink} from 'react-router-dom'
import PCIndex from './components/pc_index.jsx';
import PCHeader from './components/pc_header.jsx';
import PCUserCenter from './components/pc_user_center.jsx';
import PCNewsDetails from './components/pc_news_details.jsx';
import MobileNewsDetails from './components/mobile_news_details.jsx';
import MobileIndex from './components/mobile_index.jsx';
import MobileUserCenter from './components/mobile_user_center.jsx';

import 'antd/dist/antd.css'; 

// import test from './components/test.jsx'

export default class Index extends React.Component{
	render() {
		return (
			<div>
			    <MediaQuery query='(max-width: 1224px)'>
			    	<Router>
			    		<div>
			    			<Route path="/" exact component={MobileIndex}></Route>
			    			<Route path="/details/:uniquekey" component={MobileNewsDetails}></Route>
			    			<Route path="/usercenter" component={MobileUserCenter}></Route>
			    		</div>
			    	</Router>
			    </MediaQuery>
			    <MediaQuery query='(min-width: 1224px)'>

			    	<Router>
			    		<div>
			    			<Route path="/" exact component={PCIndex}></Route>
			    			<Route path="/details/:uniquekey" component={PCNewsDetails}></Route>
			    			<Route path="/usercenter" component={PCUserCenter}></Route>
			    		</div>
			    	</Router>
			    </MediaQuery>
			</div>
		)
	}
}

ReactDOM.render(<Index/>, document.getElementById('container'));
