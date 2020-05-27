import React, { Component } from 'react'
import {
  Container,
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormFeedback
} from 'reactstrap'

import Axios from 'axios'
import config from '../utils/config'
import history from '../utils/history'

import { Link } from 'react-router-dom'

import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai'
import { BsArrowLeftShort } from 'react-icons/bs'
import '../Assets/Styles/Create.scss'

export default class CreateUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      input: null,
      totalInput: 0,
      name: '',
      nameError: true,
      phone: '',
      phoneError: true,
      email: '',
      emailError: true,
      address: '',
      prevAdress: '',
      addressError: true,
      fullAddress: '',
      validation: false,
      btnDisabled: true,
    }
  }

  handleChangeName = (e) => {
    if (e.target.value.match("^[a-zA-Z ]{3,}$") != null) {
      this.setState({
        name: e.target.value,
        nameError: false
      });
    } else {
      this.setState({
        nameError: true
      })
    }
  }
  handleChangePhone = (e) => {
    const regex = /^\+[0-9]{13,14}|0([0-9]{10,13})$/
    if (e.target.value.match(regex) != null) {
      this.setState({
        phone: e.target.value,
        phoneError: false
      });
    } else {
      this.setState({
        phoneError: true
      })
    }
  }
  handleChangeEmail = (e) => {
    const regex = /^[a-zA-Z]+\@[a-z]+\.[a-z]+$/
    if (e.target.value.match(regex)) {
      this.setState({
        email: e.target.value,
        emailError: false
      });
    } else {
      this.setState({
        emailError: true
      })
    }
  }
  handleChangeAddress = (e) => {
    if (e.target.value !== '') {
      this.setState({
        address: e.target.value,
        addressError: false
      });
    } else {
      this.setState({
        addressError: true
      })
    }
  }
  handleChangeAditional = (e) => {
    try {
      if (e.target.value !== '') {
        const value = this.state.address.concat(` ${e.target.value}`)
        console.log(value)
        this.setState({
          fullAddress: value,
          addressError: false
        });
      } else {
        this.setState({
          addressError: true
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  CreateUser = async () => {
    try {
      const { name, phone, email, address } = this.state

      const data = {
        name,
        phone,
        email,
        address
      }
      await Axios.post(config.APP_BACKEND.concat('user'), data)
      history.push('/')

    } catch (error) {
      console.log(error)
    }
  }

  addInput = () => {
    this.setState({
      totalInput: this.state.totalInput + 1,
      addressError: true,
    })
  }

  removeInput = () => {
    this.setState({
      totalInput: this.state.totalInput - 1
    })
  }

  render() {
    const { fullAddress, input, totalInput, name, nameError, phone, phoneError, email, emailError, addressError, address } = this.state
    console.log(name, nameError, phoneError, emailError, addressError, phone)
    const listInput = []
    for (let index = 0; index < totalInput; index++) {
      listInput.push(
        <FormGroup key={index} className="create-input">
          <Label for="Adrress">{null}</Label>
          <InputGroup className="input-field">
            <Input valid={!addressError ? true : false} invalid={address === '' ? false : addressError} onChange={this.handleChangeAditional} placeholder="Adrress" id="Adrress" />
            <InputGroupAddon>
              <InputGroupText onClick={this.removeInput} style={{ cursor: 'pointer' }}>
                <AiOutlineMinusCircle size={24} />
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </FormGroup>,
      )
    }
    return (
      <Container>
        <h3 style={{ marginLeft: 40 }}>Create User</h3>
        <Link className="backHome" to='/'> <BsArrowLeftShort /> back to home</Link>
        <Form className="create-container">
          <FormGroup className="create-input">
            <Label for="name">Name</Label>
            <div className="input-field">
              <Input valid={!nameError ? true : false} invalid={name === '' ? false : nameError} onChange={this.handleChangeName} placeholder="name" id="name" />
              <FormFeedback>Name must be more then 3 letters, no number, and no sepecial character</FormFeedback>
            </div>
          </FormGroup>
          <FormGroup className="create-input">
            <Label for="Phone">Phone</Label>
            <div className="input-field">
              <Input valid={!phoneError ? true : false} invalid={phone === '' ? false : phoneError} onChange={this.handleChangePhone} maxLength={14} placeholder="Phone" id="Phone" />
              <FormFeedback>This field must be filled with correct phone number</FormFeedback>
            </div>
          </FormGroup>
          <FormGroup className="create-input">
            <Label for="Email">Email</Label>
            <div className="input-field">
              <Input valid={!emailError ? true : false} invalid={email === '' ? false : emailError} onChange={this.handleChangeEmail} type="email" placeholder="Email" id="Email" />
              <FormFeedback>This field must be filled with valid email</FormFeedback>
            </div>
          </FormGroup>
          <FormGroup className="create-input">
            <Label for="Adrress">Adrress</Label>
            <InputGroup className="input-field">
              <Input valid={!addressError ? true : false} invalid={address === '' ? false : addressError} onChange={this.handleChangeAddress} placeholder="Adrress" id="Adrress" />
              <InputGroupAddon>
                <InputGroupText onClick={this.addInput} style={{ cursor: 'pointer' }}>
                  <AiOutlinePlusCircle size={24} />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </FormGroup>
          {listInput}
          <div className="button-submit">
            <Button className={!nameError && !phoneError && !emailError && !addressError ? 'activeBtn' : 'disabledBtn'} disabled={!nameError && !phoneError && !emailError && !addressError ? false : true} onClick={this.CreateUser} type="submit" style={{
              display: 'block',
            }} color="primary"> Create </Button>
          </div>
        </Form>
      </Container>
    )
  }
}
