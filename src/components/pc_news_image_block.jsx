import React from 'react';
import { Card } from 'antd';
import {NavLink} from 'react-router-dom';

export default class PCNewsImageBlock extends React.Component{
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
		console.log(typeof news);
		const inlineImage = {
			display: 'inline-block',
		};
		const styleImage = {
			boxSizing: 'border-box',
			width: this.props.imageWidth,
			height: '90px',
			padding: '0 3px 0'
		};
		const styleH3 = {
			width: this.props.imageWidth,
			whiteSpace: 'nowrap',
			overflow: 'hidden',
			textOverflow: 'ellipsis'
		}

		const styleP = {
			width: this.props.imageWidth,
			whiteSpace: 'nowrap',
			overflow: 'hidden',
			textOverflow: 'ellipsis'
		}

		let newsList = 'news!';
		if (typeof news === 'object') {
			if (news.length === 0) {
				newsList = '未获取到新闻！';
			}
			newsList = news.map(function (newsItem, index) {
				return(
					<div key={index} style={inlineImage}>
						<NavLink to={`details/${newsItem.uniquekey}`} target="_blank">
							<img style={styleImage} alt="" src={newsItem.thumbnail_pic_s}/>
						</NavLink>
						<div>
							<h3 style={styleH3}>{newsItem.title}</h3>
							<p style={styleP}>{newsItem.author_name}</p>
						</div>
					</div>
					
				)
			})

		} else {
			newsList = '未获取到新闻！';
		}
		console.log(news)
		console.log(newsList)

		return(
			<div className="topNewsList">
				<Card noHovering="false" title={this.props.cartTitle} bordered={true} className="card">
					{newsList}
				</Card>
			</div>
		)
	}
}