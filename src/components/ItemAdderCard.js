import React, { Component } from 'react'
import styled from '@emotion/styled'
import productImage from '../assets/images/pimage.png'
import kartIcon  from '../assets/icons/kart-icon.png'
import leftArrow  from '../assets/icons/left-arrow.png'
import rigthArrow  from '../assets/icons/rigth-arrow.png'


const Wrapper = styled.div`
    display: flex;
    flex-flow: row;
    justify-content: start;
    align-items: center;
    max-width: 286px;
    min-height: 291px;
    max-height: 191px;
    background-color: ;
    box-shadow: 0px 4px 35px 0px #A8ACB030;
    margin: 16px;
    cursor: pointer
`
const ImageContainer = styled.div`
    display: flex'
    width: 100%;
    height: 100%;
    background-color: red;
    position: relative;
`
const ProductImage = styled.img`
    height: 100%;
    width: 100%;
    background-color: red;
`
const ButtonsHolder = styled.div`
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    align-items: center;
    height:100%;
    margin:0px 25px 0px 0px;
    cursor: pointer;
    font-size: 18px;
`
const KartIconContainer = styled.button`
    padding: 30px;
    background-color: #5ECE7B;
`
const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    border: 1px solid #1D1F22;
    font-size: 20px;
    width: 45px;
    height: 43px;
    cursor: pointer;
    color: #1D1F22;
`
const Icon = styled.img`
    width: 20px;
    height: 20px;
    background-color: #5ECE7B;
`
const PriceText = styled.strong`
   
`
const AmountValue = styled.span`
  font-size: 24px;
`
const ImageChanger = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
   position: absolute;
   bottom: 0px;
   height:27px;
   width:65px;
   right:0px;
   margin-bottom:10px;
   margin-right: 10px;
   span {
        width:28px;
        display:flex;
        justify-content:center;
        align-items:center;
        height:100%;
        background-color: rgb(0,0,0,0.7);
   }
   img {

   }
`
export default class ItemAdderCard extends Component {
constructor(props){
    super(props)
    this.state = {
        productCount:1,
    }
}
 increaseCount = () => {
    this.setState({productCount: this.state.productCount + 1})
 }
 decreaseCount = () => {
     if(this.state.productCount===1) return
    this.setState({productCount: this.state.productCount - 1})
 }
  render() {
    return (
      <Wrapper>
          <ButtonsHolder>
                <Button onClick = {() => {this.increaseCount()}}>
                    +
                </Button>
                <AmountValue>
                    {this.state.productCount}
                </AmountValue>
                <Button onClick = {() => {this.decreaseCount()}}>
                    -
                </Button>
          </ButtonsHolder>
          <ImageContainer>
            <ProductImage src={productImage}/>
                <ImageChanger>
                    <span>
                        <img alt='' src={leftArrow}/>
                    </span>
                    <span>
                        <img  alt='' src={rigthArrow}/>
                    </span>
                </ImageChanger>
        </ImageContainer>
      </Wrapper>
      
    )
  }
}
