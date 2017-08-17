import React from 'react';
import { Row, Col, Menu, Icon, message, Form, Input, Button, CheckBox, Modal, Tabs, Carousel } from 'antd';
import PCNewsBlock from './pc_news_block.jsx';
import PCNewsImageBlock from './pc_news_image_block.jsx';

const TabPane = Tabs.TabPane;

export default class PCNewsContainer extends React.Component{
	render() {
		const settings = {
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true
		}

		const carouselStyle = {
			boxSizing: 'border-bbox',
			height: '210px',
			padding: '5px',
			paddingLeft: 0,
			overflow: 'hidden'
		}

		return (
			<div>
				<Row>
					<Col span={2}></Col>
					<Col span={6}>
						<div  style={carouselStyle}>
							<Carousel {...settings}>
								<div><img className="carousel-img" src="https://08.imgmini.eastday.com/mobile/20161028/20161028005246_30294b4895331146d61ee2b3e3244cdc_1.jpg"/></div>
								<div><img className="carousel-img" src="https://01.imgmini.eastday.com/mobile/20161028/20161028164015_abc1bd1a8a90d8e8f84438719d098c1e_1.jpeg"/></div>
								<div><img className="carousel-img" src="https://07.imgmini.eastday.com/mobile/20161027/20161027204327_72f6cf1932a718387d031c75fe257497_4.jpeg"/></div>
								<div><img className="carousel-img" src="https://08.imgmini.eastday.com/mobile/20160920/20160920060002_76bc328cc2181a6ec23822b6243cc7a6_1.jpeg"/></div>
							</Carousel>
						</div>
					</Col>
					<Col span={14}>
						<Tabs className="tabs_news">
							<TabPane tab="今日头条" key="1">
								<PCNewsBlock count={6} type="top" width="100%" />
							</TabPane>
						</Tabs>
					</Col>
					<Col span={2}></Col>
				</Row>
				<Row>
					<Col span={2}></Col>
					<Col span={20} className="container">
						<div className="rightContainer">
							<PCNewsImageBlock count={16} type="shehui" width="100%" cartTitle="社会新闻" imageWidth="132px"/>
							<PCNewsImageBlock count={16} type="guonei" width="100%" cartTitle="国内新闻" imageWidth="132px"/>
							<PCNewsImageBlock count={16} type="guoji" width="100%" cartTitle="国际新闻" imageWidth="132px"/>
							<PCNewsImageBlock count={16} type="yule" width="100%" cartTitle="娱乐新闻" imageWidth="132px"/>
							<PCNewsImageBlock count={16} type="tiyu" width="100%" cartTitle="体育新闻" imageWidth="132px"/>
							<PCNewsImageBlock count={16} type="keji" width="100%" cartTitle="科技新闻" imageWidth="132px"/>
						</div>
					</Col>
					<Col span={2}></Col>
				</Row>
			</div>

		)
	}

}