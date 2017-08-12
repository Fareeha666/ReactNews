import React from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Col, Menu, Icon, message, Form, Input, Button, CheckBox, Modal, Tabs, Upload, Card } from 'antd';

import news from '../images/news.png';

import MobileHeader from './mobile_header.jsx';
import MobileFooter from './mobile_footer.jsx';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

export default class MobileUserCenter extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			previewImage: '',
			previewVisible: false,
			usercollection: '',
			usercomments: ''
		}
	}

	componentDidMount() {
		const myFetchOptions = {
			method: 'GET'
		};
		fetch(`http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=${localStorage.userid}`, myFetchOptions)
		.then(response=>response.json())
		.then(json=>{
			this.setState({usercollection:json});
		});
		fetch(`http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=${localStorage.userid}`, myFetchOptions)
		.then(response=>response.json())
		.then(json=>{
			this.setState({usercomments:json});
		});
	};

	handleCancel() {
		this.setState({
			previewVisible: false,
		})
	}

	render() {
		const props = {
			action: 'http://newsapi.gugujiankong.com/handler.ashx',
			headers: {
				"Access-Control-Allow-Origin": "*",
			},
			listType: 'picture-card',
			defaultFileList: [
				{
					uid: -1,
					name: 'xxx.png',
					state: 'done',
					url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
					thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
				}
			],
			onPreview: (file => {
				this.setState({previewImage: file.url||file.thumbUrl, previewVisible: true})
			})
		}

		const {usercollection, usercomments} = this.state;
		let usercollectionList = '';
		if (usercollection !== '') {
			usercollectionList = usercollection.length ? 
			usercollection.map((uc, index) => (
				<Card className="card" key={index} title={uc.uniquekey} extra={<a href={`/#/details/${uc.uniquekey}`}>查看</a>}>
					<p>{uc.Title}</p>
				</Card>
			))
			:
			'您未收藏任何新闻，快去收藏一些新闻吧！'
		}

		let usercommentsList = '';
		if (usercomments !== '') {
			usercommentsList = usercomments.length ? 
			usercomments.map((comment, index) => (
				<Card className="card" key={index} title={`于${comment.datetime}评论了新闻：${comment.uniquekey}`} extra={<a target="_blank" href={`/#/details/${comment.uniquekey}`}>查看</a>}>
					<p>{comment.Comments}</p>
				</Card>
			))
			:
			'您未发表过任何评论！'
		}

		return(
			<div>
				<MobileHeader/>
				<Row>
					<Col span={24}>
						<Tabs>
							<TabPane tab="我的收藏列表" key="1">
								<Row>
									<Col span={24}>
										{usercollectionList}
									</Col>
								</Row>
							</TabPane>
							<TabPane tab="我的评论列表" key="2">
								<Row>
									<Col span={24}>
										{usercommentsList}
									</Col>
								</Row>
							</TabPane>
							<TabPane tab="头像设置" key="3">
								<div className="clearfix">
									<Upload {...props}>
										<Icon type="plus" style={{fontSize: '26px'}}/>
										<div className="ant-upload-text">上传头像</div>
										<Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel.bind(this)}>
											<img alt="预览" src={this.state.previewImage} style={{maxWidth: '100%'}}/>
										</Modal>
									</Upload>
								</div>
							</TabPane>
						</Tabs>
					</Col>
				</Row>

				<MobileFooter/>
			</div>
		)
	}
}