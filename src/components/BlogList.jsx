import React, { Component } from 'react'
import {Card} from 'semantic-ui-react'

const src = require('../assets/image_not_found.png')

class BlogList extends Component {
  render() {
    return (
    <Card.Group itemsPerRow={6}>
      <Card raised image={src} />
      <Card raised image={src} />
      <Card raised image={src} />
      <Card raised image={src} />
      <Card raised image={src} />
      <Card raised image={src} />
      <Card raised image={src} />
      <Card raised image={src} />
      <Card raised image={src} />
      <Card raised image={src} />
      <Card raised image={src} />
      <Card raised image={src} />
    </Card.Group>
    )
  }
}

export default BlogList;