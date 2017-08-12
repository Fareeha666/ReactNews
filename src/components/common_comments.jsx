import React from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Col, Menu, Icon, message, Form, Input, Button, CheckBox, Modal, Tabs, Card, notification } from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const { TextArea } = Input;

class CommonComments extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			comments: ''
		};
	}

	componentDidMount() {
		let myFetchOptions = {
			method: 'GET'
		}
		fetch(`http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=${this.props.uniquekey}`, myFetchOptions)
			.then(response => response.json())
			.then(json => {
				this.setState({comments: json});
				console.log('评论');
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

		fetch(`http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=${localStorage.userid}&uniquekey=${this.props.uniquekey}&commnet=${formData.remark}`, myFetchOptions)
			.then(response => response.json())
			.then(json => {
				this.componentDidMount();
				this.props.form.setFieldsValue({remark: ''});
			});
	}

	addUserCollection() {
		//页面提交数据
		const myFetchOptions = {
			method: 'GET'
		};
		
		fetch(`http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=${localStorage.userid}&uniquekey=${this.props.uniquekey}`, myFetchOptions)
			.then(response => response.json())
			.then(json => {
				//收藏成功全局提醒
				notification['success']({message: 'React News提醒', description: '收藏成功！'})
			});
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		let commentsList = (<p>评论正在加载中……</p>);
		if (this.state.comments !== '') {
			const {comments} = this.state;
			console.log(comments)
			commentsList = comments.length?
			comments.map((comment, index)=> (
				<Card className="card" key={index} title={comment.UserName} extra={<a href="#">发表于 {comment.datetime}</a>}>
					<p>{comment.Comments}</p>
				</Card>
			))
			:
			'没有加载到任何评论';
		}

		return(
			<div className="comment">
				<Row>
					<Col span={24}>
						{commentsList}
						<Form onSubmit={this.handleSubmit.bind(this)}>
							<FormItem label="评论">
						    	{getFieldDecorator('remark', {
									rules: [{ required: true, message: '请输入您的评论' }],
									})(
									<TextArea placeholder="请输入您的评论内容" />
								)}
							</FormItem>
							<Button type="primary" htmlType="submit">提交</Button>
							&nbsp;&nbsp;
							<Button type="button" onClick={this.addUserCollection.bind(this)}>收藏</Button>
						</Form>
					</Col>
				</Row>
			</div>
		)
	}
}

export default CommonComments = Form.create()(CommonComments)