import React, { Component } from 'react'
import axios from 'axios';

import Articles from '../components/Article/Article';
import CustomForm from '../components/Form/Form';

export class ArticleList extends Component {

    state = {
        articles: []
    }

    componentDidMount() {
        axios.get('https://strider-blog.herokuapp.com/api/')
            .then(res => {
                this.setState({
                    articles:res.data
                });
            })
    }

    render() {
        return (
            <div>
                <Articles data={this.state.articles} />
                <br />
                <h2>Create Article Here</h2>
                <CustomForm
                requestType="post"
                articleId={null}
                btnText="Create"
                />
            </div>
        )
    }
}

export default ArticleList