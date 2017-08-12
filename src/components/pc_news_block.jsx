import React from 'react';
import { Card } from 'antd';
import {NavLink} from 'react-router-dom';

export default class PCNewsBlock extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			news: ''
		}
	}

	componentWillMount() {
		const myFetchOptions = {
			method: 'GET'
		}
		fetch(`http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${this.props.type}&count=${this.props.count}`, myFetchOptions)
			.then(response => response.json())
			.then(json => this.setState({news: json}))
	}

	render() {
		const {news} = this.state;
		console.log(typeof news)
		// let newsList = news.length
		// 	?
		// 	this.state.news.map((newsItem, index) => {
		// 			<li key={index}>
		// 				<a target="_blank">
		// 					{newsItem.title}
		// 				</a>
		// 			</li>
		// 	})
		// 	:
		// 	"未获取到新闻！";
		let newsList = 'news!';
		if (typeof news === 'object') {
			if (news.length === 0) {
				newsList = '未获取到新闻！';
			}
			newsList = news.map(function (newsItem, index) {
				return(
					<li key={index}>
						<NavLink to={`details/${newsItem.uniquekey}`} target="_blank">
							{newsItem.title}
						</NavLink>
					</li>
				)
			})

		} else {
			newsList = '未获取到新闻！';
		}
		console.log(news)
		console.log(newsList)

		return(
			<div className="topNewsList">
				<Card noHovering="false">
					<ul>
						{newsList}
					</ul>
				</Card>
			</div>
		)
	}
}