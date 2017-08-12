import React from 'react';
import { Row, Col } from 'antd';
import {NavLink} from 'react-router-dom';

export default class MobileList extends React.Component{
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
		let newsList = 'news!';
		if (typeof news === 'object') {
			if (news.length === 0) {
				newsList = '未获取到新闻！';
			}
			newsList = news.map(function (newsItem, index) {
				return(
					<section key={index} className="news-list">
						<NavLink to={`details/${newsItem.uniquekey}`} className="m_article list-item special_section clearfix">
							<div className="m_article_img">
								<img alt={newsItem.title} src={newsItem.thumbnail_pic_s}/>
							</div>
							<div className="m_article_info">
								<div className="m_article_title">
									<span>{newsItem.title}</span>
								</div>
								<div className="m_article_desc clearfix">
									<div className="m_article_desc_l">
										<span className="m_article_channel">
											{newsItem.realtype}
										</span>
										<span className="m_article_date">
											{newsItem.date}
										</span>
									</div>
								</div>
							</div>
						</NavLink>
					</section>
				)
			})

		} else {
			newsList = '未获取到新闻！';
		}
		console.log(news)
		console.log(newsList)

		return(
			<div>
				<Row>
					<Col span={24}>
						{newsList}
					</Col>
				</Row>
			</div>
		)
	}
}