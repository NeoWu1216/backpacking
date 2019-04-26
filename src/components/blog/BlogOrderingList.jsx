import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Checkbox, Menu, Dropdown, Input, Divider, Icon, Button} from 'semantic-ui-react'
import BlogList from './BlogList'
import moment from 'moment'
import Loading from './BlogNotFound'




class BlogOrderingList extends Component {
  SORT_OPTIONS = [
    {value:"title", label:"Title", text:"Title", key:"1"},
    {value:"like", label:"Likes", text:"Num of Likes", key:"2"},
    {value:"create_time", label:"Date", text:"Date created", key:"3"},
    {value:"author_name", label:"Author", text:"Author Name", key:"4"},
  ]

  constructor(props) {
    super(props)
    this.state = {
      keyword : "",
      sortOption : this.SORT_OPTIONS[2].value,
      asc : false
    }
  }

  

  onInputChange = (e) => {
    this.setState({ [e.target.id]: e.target.value })
  }

  onSortOptionChange = (e, option) => {
    this.setState({sortOption : option.value})
  }

  onSortOrderChange = () => {
    this.setState({asc : !this.state.asc})
  }

  filterSortArticles = (articles, keyword, sortOption, asc) => {
    articles = articles.filter(article => 
      article.title.toLowerCase().includes(keyword.toLowerCase())
    )

    return articles.sort(function(a, b){
      var sign = ((asc) ? 1 : -1);
      var va = a[sortOption], vb = b[sortOption]
      if (sortOption === 'create_time')
        return sign*(moment(va).isAfter(moment(vb)) ? 1 : -1)
      return sign*((va>vb) ? 1 : -1)
    });
  }

  redirectNew = () => {
    this.props.history.push('/dashboard/blogs/create')
  }

  render() {
    let {keyword, sortOption, asc} = this.state;
    let {articles, loading} = this.props;
    return (
      <div>
      <Menu>

          <Menu.Item>
            <Dropdown 
              placeholder='State' 
              selection 
              options={this.SORT_OPTIONS}
              defaultValue={sortOption}
              onChange={this.onSortOptionChange} 
            />
          </Menu.Item>

          <Menu.Item>
            <Checkbox 
              label='ascending' 
              checked={asc} 
              onChange={this.onSortOrderChange}/>
          </Menu.Item>

          <Menu.Item>
              <Input 
                icon='search' 
                placeholder='Search...' 
                id='keyword'
                value={keyword}
                onChange={this.onInputChange}
              />
            </Menu.Item>

          <Menu.Menu position='right'>
            <Menu.Item>
              <Button primary icon labelPosition='right' onClick={this.redirectNew}>
                <Icon name='add' />
                New Blog
              </Button>
            </Menu.Item>
          </Menu.Menu>



        </Menu>
        <Divider hidden />
        <Loading message='loading...' active={loading}/>
        <BlogList 
          articles={this.filterSortArticles(
            articles,keyword,sortOption,asc)}
          />
        </div>
    )
  }
}

export default BlogOrderingList;