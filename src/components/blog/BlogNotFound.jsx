import React from 'react'
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'

export default () => {
  return (
    <Segment>
      <Dimmer active>
        <Loader size='large'> Not found... </Loader>
      </Dimmer>
      <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' size='massive' style={{height:"80vh"}}/>
    </Segment>
  )
}
