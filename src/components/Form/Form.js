import React from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';


class CustomForm extends React.Component {


    handleForm = (values, requestType, articleID) => {
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        console.log(values, requestType, articleID);


        switch (this.props.requestType) {
            case 'post':
                axios.post('https://strider-blog.herokuapp.com/api/', {
                    title: title,
                    content: content
                })
                    .then(res => { console.log(res); window.location.reload(); })
                    .catch(error => console.log(error));
                break;
            case 'put':
                // return axios.put(API_URL + articleID, {
                axios.put(`https://strider-blog.herokuapp.com/api/${articleID}/`, {
                    title: title,
                    content: content
                })
                    .then(res => { console.log(res); window.location.reload(); })
                    .catch(error => console.log(error));
                break;
        }
    }
    render() {
        return (
            <div>
                <Form onFinish={(values) => this.handleForm(
                    values,
                    this.props.requestType,
                    this.props.articleID
                )}>
                    <Form.Item name="title" label="Title">
                        <Input id="title" placeholder="Put a title here" />
                    </Form.Item>
                    <Form.Item name="content" label="Content">
                        <Input id="content" placeholder="Enter some content ..." />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">{this.props.btnText}</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    };
}

export default CustomForm