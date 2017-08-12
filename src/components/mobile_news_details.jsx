import React from 'react';
import {Row, Col, BackTop} from 'antd';

import '../css/details.css'

import MobileHeader from './mobile_header.jsx';
import MobileFooter from './mobile_footer.jsx';
import CommonComments from './common_comments.jsx'

export default class MobileNewsDatails extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			newsItem: ''
		}
	}

	componentDidMount() {
		let myFetchOptions = {
			method: 'GET'
		}
		fetch(`http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${this.props.match.params.uniquekey}`, myFetchOptions)
			.then(response => response.json())
			.then(json => {
				this.setState({newsItem: json});
				document.title = `${this.state.newsItem.title} - React News | React 驱动新闻平台`;
				console.log(this.state.newsItem.pagecontent);
			})

	}

	render() {
		var createMarkup = {__html: `<h1>正在加载中……</h1>`}; 
		if (typeof this.state.newsItem === 'object') {
			createMarkup = {__html: this.state.newsItem.pagecontent};
		}
		
		const mainContent = {
			boxSizing: 'border-box',
			padding: '8px'
		}

		return (
			<div id="mobileDetailsContainer">
				<MobileHeader/>
					<div className="usmobileList">
						<Row>
							<Col span={24} style={mainContent}>
								<div dangerouslySetInnerHTML={createMarkup}></div>
								<CommonComments uniquekey={this.props.match.params.uniquekey}/>
							</Col>
						</Row>
					</div>
				<MobileFooter/>
				<BackTop/>
			</div>
		)
	}
}