import React from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Col, Menu, Icon, message, Form, Input, Button, CheckBox, Modal, Tabs } from 'antd';

import news from '../images/news.png';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class PCHeader extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			current: 'top',
			modalVisible: false,
			action: 'login',
			hasLogined: false,
			userNickName: '',
			userid: 0
		}
	}

	componentWillMount(){
		if (localStorage.userid!='') {
			this.setState({hasLogined:true});
			this.setState({userNickName:localStorage.userNickName,userid:localStorage.userid});
		}
	}

	handleClick(e) {
		if (e.key === 'register') {
			this.setModalVisible(true);
		}
		this.setState({
		  current: e.key
		});
	}

	setModalVisible(value) {
		this.setState({
			modalVisible: value
		})
	}

	handleSubmit(e) {
		//页面提交数据
		e.preventDefault();
		const myFetchOptions = {
			method: 'GET'
		};
		
		let formData = this.props.form.getFieldsValue();

		console.log(formData);

		fetch(`http://newsapi.gugujiankong.com/Handler.ashx?action=${this.state.action}&username=${formData.userName}&password=${formData.password}&r_userName=${formData.r_userName}&r_password=${formData.r_password}&r_confirmPassword=${formData.r_confirmPassword}`, myFetchOptions)
			.then(response => response.json())
			.then(json => {
				this.setState({userNickName: json.NickUserName,userid: json.UserId})
				localStorage.userid= json.UserId;
				localStorage.userNickName = json.NickUserName;
			});

		if (this.state.action=="login") {
			this.setState({hasLogined:true});
		}

		message.success('请求成功！');
		this.setModalVisible(false);
	}


	callback(key) {
		if (key == 1) {
			this.setState({action: 'login'});
		} else if (key == 2) {
			this.setState({action: 'register'});
		}
	}

	logout(){
		localStorage.userid= '';
		localStorage.userNickName = '';
		this.setState({hasLogined:false});
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		const userShow = this.state.hasLogined 
			? 
			<Menu.Item key="logout" className="register">
				<span><Icon type="user"/>{ this.state.userNickName } </span>
				&nbsp;&nbsp;
				<Button htmlType="button" type="primary" ><NavLink to="/usercenter">个人中心</NavLink></Button>
				&nbsp;&nbsp;
				<Button htmlType="button" onClick={ this.logout.bind(this) }>退出</Button>
			</Menu.Item>

			:
			<Menu.Item key="register" className="register">
				<Icon type="appstore"/>注册/登录
			</Menu.Item>;
		return(
			<header>
				<Row type="flex" justify="space-around" align="middle">
					<Col span={2}></Col>
					<Col span={4}>
						<NavLink to="/" className="logo">
							<img src={news}/>
							<span>React News</span>
						</NavLink>
					</Col>
					<Col span={16}>
						<Menu
							onClick={ this.handleClick.bind(this) }
							selectedKeys={ [this.state.current] }
							mode="horizontal"
						>
							<Menu.Item key="top">
								<Icon type="appstore"/>头条
							</Menu.Item>
							<Menu.Item key="shehui">
								<Icon type="appstore"/>社会
							</Menu.Item>
							<Menu.Item key="guonei">
								<Icon type="appstore"/>国内
							</Menu.Item>
							<Menu.Item key="guoji">
								<Icon type="appstore"/>国际
							</Menu.Item>
							<Menu.Item key="yule">
								<Icon type="appstore"/>娱乐
							</Menu.Item>
							<Menu.Item key="tiyu">
								<Icon type="appstore"/>体育
							</Menu.Item>
							<Menu.Item key="keji">
								<Icon type="appstore"/>科技
							</Menu.Item>
							{ userShow }
						</Menu>
					</Col>
					<Col span={2}></Col>
				</Row>
				<Modal
					title="用户中心"
					wrapClassName="vertical-center-modal"
					visible={ this.state.modalVisible }
					onOk={ () => this.setModalVisible(false) }
					onCancel={ () => this.setModalVisible(false) }
					okText="确认"
				>
					<Tabs type="card" onChange={ this.callback.bind(this) }>
						<TabPane tab="登录" key="1">
							<Form layout="horizontal" onSubmit={this.handleSubmit.bind(this)}>
								<FormItem label="账户">
							    	{getFieldDecorator('userName', {
										rules: [{ required: true, message: '请输入您的用户名' }],
										})(
										<Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="请输入您的用户名" />
									)}
								</FormItem>
								<FormItem label="密码">
							    	{getFieldDecorator('password', {
										rules: [{ required: true, message: '请输入您的密码' }],
										})(
										<Input type="password" prefix={<Icon type="lock" style={{ fontSize: 13 }} />} placeholder="请输入您的用户名" />
									)}
								</FormItem>
								<Button type="primary" htmlType="submit">登录</Button>
							</Form>
						</TabPane>
						<TabPane tab="注册" key="2">
							<Form layout="horizontal" onSubmit={this.handleSubmit.bind(this)}>
							    <FormItem label="用户名">
							    	{getFieldDecorator('r_userName', {
										rules: [{ required: true, message: '请输入您的用户名' }],
										})(
										<Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="请输入您的用户名" />
									)}
							    </FormItem>
							    <FormItem label="密码">
							    	{getFieldDecorator('r_password', {
										rules: [{ required: true, message: '请输入您的密码' }],
										})(
										<Input type="password" prefix={<Icon type="lock" style={{ fontSize: 13 }} />} placeholder="请输入您的用户名" />
									)}
							    </FormItem>
							    <FormItem label="确认密码">
							    	{getFieldDecorator('r_confirmPassword', {
										rules: [{ required: true, message: '请再次输入您的密码' }],
										})(
										<Input type="password" prefix={<Icon type="lock" style={{ fontSize: 13 }} />} placeholder="请输入您的用户名" />
									)}
							    </FormItem>
							    <Button type="primary" htmlType="submit">注册</Button>
							</Form>
						</TabPane>
					</Tabs>
				</Modal>
			</header>
		)
	}
}

export default PCHeader = Form.create()(PCHeader)