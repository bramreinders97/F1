import React from 'react';
import * as ReactBootStrap from 'react-bootstrap';

const Test = ({number,handleTest}) => {


    return ( 
        <React.Fragment>
        <ReactBootStrap.Button variant='primary'>
            +
        </ReactBootStrap.Button>
        <ReactBootStrap.Button variant='warning'>
            -
        </ReactBootStrap.Button>
        </React.Fragment>
    )
}

export default Test;