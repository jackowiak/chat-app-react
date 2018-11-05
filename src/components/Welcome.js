import React from 'react';
import {Button, Input, InputGroup, InputGroupAddon} from 'reactstrap';

export const Welcome = (props) => {
  return (
      <div>
        <InputGroup>
          <Input value={props.userName} onChange={props.changeUserName} />
          <InputGroupAddon addonType="prepend"><Button>Submit!</Button></InputGroupAddon>
        </InputGroup>
      </div>
    )
}
