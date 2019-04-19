import React, { Component } from 'react'
import {getRecommendations} from '../../crud/recommendation'
import { changeTab} from '../../redux/actions'
import { getMessage } from '../../crud/common'
import { readBlogs } from '../../crud/blog'
import {Container, Label, Divider} from 'semantic-ui-react'
import { connect } from 'react-redux'
import BlogList from './BlogList'


const mapStateToProps = (state) => {
  return {
    articles : state.blog.articles
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    changeTab: (...args) => (dispatch(changeTab(...args))),
    loadArticles: () => readBlogs()(dispatch),
  }
}


class BlogRecommendation extends Component {
  constructor(props) {
    super(props)
    this.state = {articles:[]}
  }

  componentDidMount() {
    this.props.changeTab(2)
    getRecommendations(this.props.articles).then((articles)=>{
      this.setState({articles})
      // this.props.loadArticles()
    }).catch((err)=> {
      alert(err)
    })
  }

  isEqual = (a, b) => {
    if (a === b) return true;
    if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime();
    if (!a || !b || (typeof a !== 'object' && typeof b !== 'object')) return a === b;
    if (a === null || a === undefined || b === null || b === undefined) return false;
    if (a.prototype !== b.prototype) return false;
    let keys = Object.keys(a);
    if (keys.length !== Object.keys(b).length) return false;
    return keys.every(k => this.isEqual(a[k], b[k]));
  };

  componentWillReceiveProps(nextProps) {
    if (!this.isEqual(nextProps.articles, this.props.articles)) {
      getRecommendations(nextProps.articles).then((articles)=>{
        this.setState({articles})
        // this.props.loadArticles()
      }).catch((err)=> {
        alert(err)
      })
    }
    
  }

  render() {
    return (
      <Container textAlign='center'>
      <Label size='big' as='a' color='teal' tag>
        Recommended
      </Label>
      <Divider hidden />
      <BlogList articles={this.state.articles}/>
    </Container>
    )
  }
}


BlogRecommendation = connect(mapStateToProps, mapDispatchToProps)(BlogRecommendation)
export default BlogRecommendation