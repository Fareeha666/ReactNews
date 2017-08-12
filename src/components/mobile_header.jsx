import React from 'react';
import {NavLink} from 'react-router-dom';

import news from '../images/news.png';

import { Row, Col, Menu, Icon, message, Form, Input, Button, CheckBox, Modal, Tabs } from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class MobileHeader extends React.Component{
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

	login() {
		this.setModalVisible(true);
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		const userShow = this.state.hasLogined
			?
			<NavLink to="/usercenter">
				<Icon type="inbox"/>
			</NavLink>
			:
			<Icon type="user" onClick={this.login.bind(this)}/>;
		return (			
			<header className="mobileheader">
				<NavLink to="/">
					<img src={news} alt="logo"/>
					<span>React News</span>
				</NavLink>
				{userShow}
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

export default MobileHeader = Form.create()(MobileHeader)