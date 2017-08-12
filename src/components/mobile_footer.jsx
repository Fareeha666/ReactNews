import React from 'react';
import { Row, Col } from 'antd';

export default class MobileFooter extends React.Component{
	render() {
		return(
			<footer>
				<Row type="flex" justify="space-around" align="middle">
					<Col span={2}></Col>
					<Col span={20} className="footer">
						&copy;&nbsp; 2017 ReactNews. All Rights Reserved.
					</Col>
					<Col span={2}></Col>
				</Row>
			</footer>
		)
	}
}