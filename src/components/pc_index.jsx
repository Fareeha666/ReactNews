import React from 'react';
import ReactDom from 'react-dom';
import PCHeader from './pc_header.jsx';
import PCFooter from './pc_footer.jsx';
import PCNewsDetails from './pc_news_details.jsx'
import PCNewsContainer from './pc_newscontainer.jsx';
import { BackTop } from 'antd';


import '../css/pc.css';

export default class PCIndex extends React.Component{
	render() {
		return (
			<div>
				<PCHeader/>
				<PCNewsContainer/>
				<PCFooter/>
				<BackTop/>
			</div>
		)
	}
};

// ReactDom.render(<PCIndex/>, document.getElementById('container'));