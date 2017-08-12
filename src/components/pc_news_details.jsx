import React from 'react';
import {Row, Col, BackTop} from 'antd';

import '../css/details.css'

import PCHeader from './pc_header.jsx';
import PCFooter from './pc_footer.jsx';
import PCNewsImageBlock from './pc_news_image_block.jsx';
import CommonComments from './common_comments.jsx'

export default class PCNewsDatails extends React.Component{
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
			padding: '10px'
		}
		
		return (
			<div>
				<PCHeader/>
				<Row>
					<Col span={2}></Col>
					<Col span={14} className="container" style={mainContent}>
						<div dangerouslySetInnerHTML={createMarkup}></div>
						<div className="hr"></div>
						<CommonComments uniquekey={this.props.match.params.uniquekey}/>
					</Col>
					<Col span={6}>
						<PCNewsImageBlock count={16} type="top" width="100%" cartTitle="今日头条" imageWidth="140px"/>
					</Col>
					<Col span={2}></Col>
				</Row>
				<PCFooter/>
				<BackTop/>
			</div>
		)
	}
}