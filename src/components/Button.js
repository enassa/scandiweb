import React, { Component } from 'react'
import styled from '@emotion/styled'

const StyledButton = styled.button`
    display: flex;
    justify-content: center;
    align-items:center;
    background-color: white;
    border: 0px;
    font-size: 20px;
    padding: ${props => props.padding ? props.padding : '10px 80px'};
    background-color: #5ECE7B;
    border-radius: ${props => props.borderRadius ? props.borderRadius : '0px'};
    cursor: pointer;
    color: white;
`
export default class Button extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    render() {
    return (
        <div>
            <StyledButton 
                onClick={(e) => {
                    this.props.handleClick && this.props.handleClick(e)
                }}
                styles = {{...this.props}}
            >
                {this.props.children}
            </StyledButton>
        </div>
       
    )
  }
}

