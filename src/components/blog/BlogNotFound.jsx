import React from 'react'
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'

export default (props) => {
  let {message, active} = props;
  if (active == undefined)
    active = true
  if (!active) return null;


  if (message == undefined)
    message = "Not found..."
  
  return (
    <Segment>
      <Dimmer active>
        <Loader size='large'> {message} </Loader>
      </Dimmer>
      <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' size='massive' style={{height:"80vh"}}/>
    </Segment>
  )
}
