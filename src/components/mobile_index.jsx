import React from 'react';
import MobileHeader from './mobile_header.jsx';
import MobileFooter from './mobile_footer.jsx';
import MobileList from './mobile_list.jsx';
import {Tabs, Carousel} from 'antd';
import '../css/mobile.css';

const TabPane = Tabs.TabPane;

export default class MobileIndex extends React.Component{

	render() {
		const settings = {
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true
		}
		return (
			<div>
				<MobileHeader/>
				<Carousel {...settings} className="carousel">
					<div><img className="carousel-img" src="https://08.imgmini.eastday.com/mobile/20161028/20161028005246_30294b4895331146d61ee2b3e3244cdc_1.jpg"/></div>
					<div><img className="carousel-img" src="https://01.imgmini.eastday.com/mobile/20161028/20161028164015_abc1bd1a8a90d8e8f84438719d098c1e_1.jpeg"/></div>
					<div><img className="carousel-img" src="https://07.imgmini.eastday.com/mobile/20161027/20161027204327_72f6cf1932a718387d031c75fe257497_4.jpeg"/></div>
					<div><img className="carousel-img" src="https://08.imgmini.eastday.com/mobile/20160920/20160920060002_76bc328cc2181a6ec23822b6243cc7a6_1.jpeg"/></div>
				</Carousel>
				<Tabs>
					<TabPane tab="头条" key="1">
						<MobileList count={20} type="top"/>
					</TabPane>
					<TabPane tab="社会" key="2">
						<MobileList count={20} type="shehui"/>
					</TabPane>
					<TabPane tab="国内" key="3">
						<MobileList count={20} type="guonei"/>
					</TabPane>
					<TabPane tab="国际" key="4">
						<MobileList count={20} type="guoji"/>
					</TabPane>
					<TabPane tab="娱乐" key="5">
						<MobileList count={20} type="yule"/>
					</TabPane>
				</Tabs>

				<MobileFooter/>
			</div>
		)
	}
};