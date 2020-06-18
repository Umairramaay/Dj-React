import React, { Component } from 'react'
import axios from 'axios';

import {Button ,Card} from 'antd';
import CustomForm from '../components/Form/Form';

export class ArticleDetail extends Component {

    state = {
        article: []
    }

    componentDidMount() {
        const articleID= this.props.match.params.articleID
        axios.get('https://strider-blog.herokuapp.com/api/' + articleID )
            .then(res => {
                this.setState({
                    article:res.data
                });
            })
    }

    handleDelete = (event) => {
        const articleID= this.props.match.params.articleID
        axios.delete(`https://strider-blog.herokuapp.com/api/${articleID}/`);
        this.props.history.push('/')

    }

    // updateStateHandler = () => { 
    //     axios.get('http://127.0.0.1:8000/api/')
    //         .then(res => {
    //             this.setState({
    //                 articles:res.data
    //             });
    //         })
    //        .catch(function(err){
    //            console.log(err);
    //       })
    //  }

    render() {
        return (
            <div>
                <Card title={this.state.article.title}>
                    <p>{this.state.article.content}</p>
                </Card>
                <br />
                <CustomForm 
                requestType="put"
                articleID={this.props.match.params.articleID}
                btnText="Update"
                />
                <form onSubmit={this.handleDelete}>
                    <Button type="danger" htmlType="submit">Delete</Button>
                </form>
            </div>
        )
    }
}

export default ArticleDetail;