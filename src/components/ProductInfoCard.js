import React, { Component } from 'react'
import styled from '@emotion/styled'
import productImage from '../assets/images/pimage.png'
import kartIcon  from '../assets/icons/kart-icon.png'


const Wrapper = styled.div`
    display: flex;
    flex-flow: column;
    justify-content: start;
    align-items: start;
    // max-width: 286px;
    height:auto;
    // min-height: 291px;
    // max-height: 191px;
    // box-shadow: 0px 4px 35px 0px #A8ACB030;
    margin: 16px;
    padding: 30px 10px;
    cursor: pointer;
`
const BrandName = styled.strong`
    display: flex'
    width: 100%;
    font-size: 18px;
    font-weight: 250px;
    margin-bottom:10px;

`
const ProductName = styled.span`
    display: flex'
    width: 100%;
    font-size: 20px;
    font-weight: 250px;
    margin-bottom:10px;
`
const ProductPrice = styled.strong`
    display: flex'
    width: 100%;
    background-color: ;;
    font-style: Bold;
    font-size: 20px;
    line-height: 24px;
    line-height: 85%;
    font-weight:bold;
    margin-bottom:15px;
`
const SizesContainer = styled.div`
    display: flex;
    flex-flow: column;
    justify-content: start;
    width:100%;
    align-items: start;
    cursor: pointer;
    font-size: 14px;
    strong {
        margin-bottom:6px;
        font-weight:bold;
    }
`
const SizesContainerInner = styled.div`
    display: flex;
    flex-flow: row;
    justify-content: start;
    align-items: center;
    width:100%;
    height: 100%;
    cursor: pointer;
    font-size: 14px;
   
`
const SizeOption = styled.div`
    display: flex;
    justify-content: center;
    align-items:center;
    width: 63px;
    height: 45px;
    margin-right:6px;
    margin-bottom:17px;
    border: 1px solid #1D1F22;
    background-color: ${props => props.selected ? 'black' : ''};
    color: ${props => props.selected ? 'white': 'black'};
`

const ColorsContainer = styled.div`
    display: flex;
    flex-flow: column;
    justify-content: start;
    width: 100%;
    align-items: start;
    cursor: pointer;
    font-size: 14px;
    strong {
        margin-bottom:6px;
        font-weight:bolder
        font-size:18px;
    }
`
const ColorsContainerInner = styled.div`
    display: flex;
    flex-flow: row;
    justify-content: start;
    align-items: center;
    width: 100%;
    height: 100%;
    margin:0px 25px 0px 0px;
    cursor: pointer;
    font-size: 14px;
`

const ColorOption = styled.div`
    display: flex;
    width: 36px;
    height: 36px;
    margin-right:6px;
    border: 1px solid ${props => props.selected ? 'green' : 'transparent'};
    padding: 1px;
    span {
        width: 100%;
        height: 100;
        Font style: Bold;
        font-size: 18px;
        line-height: 18px;
        line-height: 85%;
        background-color: ${props => props.bgColor ? props.bgColor : 'black'};
    }
`


export default class ProductInfoCard extends Component {
constructor(props){
    super(props)
    this.state = {
        selectedColor: '',
        selectedSize: 'XS'
    }
}
sendSelection = (color,size) => {
    this.props.getSelection && this.props.getSelection(color, size);
    console.log(color, size)
}
ejectSwatchAttributes= (swatchItems) => {
    const {selectedColor, selectedSize} = this.state
    return swatchItems.map((item, index) => {
        return  <ColorOption 
                    key = {index}
                    selected = {selectedColor === item.displayValue}
                    bgColor = {item.displayValue}
                    onClick = {() => {
                        this.setState({selectedColor: item.displayValue}, () => {
                            this.sendSelection(selectedColor, selectedSize)
                        })
                    }}
                > 
                    <span></span> 
                </ColorOption>
    })
 }

 ejectTextAttributes= (textItems) => {
    const {selectedSize, selectedColor} = this.state
    return textItems.map((item, index) => {
            // console.log(item)
            return   <SizeOption  
                            key = {index}
                            selected = {selectedSize === item.displayValue}
                            onClick = {() => {
                                this.setState({selectedSize: item.displayValue}, () => {
                                    this.sendSelection(selectedColor, selectedSize)
                                })
                            }}
                     >
                       {item.displayValue}
                    </SizeOption>
        })
 }
ejectAttributes = () => {
    const {selectedSize, selectedColor} = this.state
    const {data} = this.props
    return data.attributes.map((attribute, index) => {
        if (attribute.type === 'text') {
            return   <SizesContainer key = {index}>
                        <strong> {attribute.name}: </strong>
                        <SizesContainerInner>
                            {this.ejectTextAttributes(attribute.items)}
                        </SizesContainerInner>
                    </SizesContainer>
        }
        else if(attribute.type === 'swatch' ) {
            return <ColorsContainer  key = {index}>
                        <strong> {attribute.name}: </strong>
                        <ColorsContainerInner>
                            {this.ejectSwatchAttributes(attribute.items)}
                        </ColorsContainerInner>
                    </ColorsContainer>
        }
    })
}
 
  render() {
      const {data, price} = this.props
    return (
      <Wrapper>
          <BrandName> {data.brand} </BrandName>
          <ProductName> {data.name} </ProductName>
          <ProductPrice> {price}  </ProductPrice>
         {this.ejectAttributes()}
      </Wrapper>
      
    )
  }
}
