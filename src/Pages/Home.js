import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import {
  Container,
  Table,
  Badge,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap'

// Icons 
import { RiPencilLine } from 'react-icons/ri'
import { FaRegTrashAlt } from 'react-icons/fa'
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai'

// components
import Loading from '../Components/LoadingScreen'
import config from '../utils/config'
import history from '../utils/history'

// styles
import '../Assets/Styles/Home.scss'

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: null,
      loading: true,
      pageInfo: null,
      page: [],
      search: '',
      searchKey: 'name',
      sortName: <AiFillCaretDown />,
      sortEmail: <AiFillCaretDown />,
      sortValueName: true,
      sortValueEmail: true
    }

    this.setPage = async (e) => {
      try {
        const dataUser = await axios.get(config.APP_BACKEND.concat(`user?page=${e.target.textContent}`))
        const page = []
        const pageTotal = dataUser.data.pageInfo.totalPage
        for (let index = 0; index < pageTotal; index++) {
          page.push(<PaginationItem key={index}> <PaginationLink onClick={this.setPage} href='#'>{index + 1}</PaginationLink> </PaginationItem>)
        }
        this.setState({
          users: dataUser.data.data,
          pageInfo: dataUser.data.pageInfo,
          loading: false,
          page
        })
        this.setState({
          loading: true,
        })
      } catch (error) {
        console.log(error)
      }
    }
    this.nextLink = async (currentPage) => {
      try {
        const dataUser = await axios.get(currentPage)
        const page = []
        const pageTotal = dataUser.data.pageInfo.totalPage
        for (let index = 0; index < pageTotal; index++) {
          page.push(<PaginationItem key={index}> <PaginationLink onClick={this.setPage} href='#'>{index + 1}</PaginationLink> </PaginationItem>)
        }
        this.setState({
          users: dataUser.data.data,
          pageInfo: dataUser.data.pageInfo,
          loading: false,
          page
        })
        this.setState({
          loading: true,
        })
      } catch (error) {
        console.log(error)
      }
    }
    this.prevLink = async (currentPage) => {
      try {
        const dataUser = await axios.get(currentPage)
        const page = []
        const pageTotal = dataUser.data.pageInfo.totalPage
        for (let index = 0; index < pageTotal; index++) {
          page.push(<PaginationItem key={index}> <PaginationLink onClick={this.setPage} href='#'>{index + 1}</PaginationLink> </PaginationItem>)
        }
        this.setState({
          users: dataUser.data.data,
          pageInfo: dataUser.data.pageInfo,
          loading: false,
          page
        })
        this.setState({
          loading: true,
        })
      } catch (error) {
        console.log(error)
      }
    }
  }

  async componentDidMount() {
    try {
      const dataUser = await axios.get(config.APP_BACKEND.concat('user'))
      console.log(dataUser.data.pageInfo)
      if (dataUser.data.success && dataUser.data.data.length > 1) {
        const page = []
        const pageTotal = dataUser.data.pageInfo.totalPage
        for (let index = 0; index < pageTotal; index++) {
          page.push(<PaginationItem key={index}> <PaginationLink onClick={this.setPage} href='#'>{index + 1}</PaginationLink> </PaginationItem>)
        }
        this.setState({
          users: dataUser.data.data,
          pageInfo: dataUser.data.pageInfo,
          loading: false,
          page
        })
        this.setState({
          loading: true
        })
      } else {
        this.setState({
          users: null,
          pageInfo: null,
          loading: false,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  // search method
  searchKey = e => {
    this.setState({
      searchKey: e.target.value
    })
  }

  searchValue = e => {
    this.setState({
      search: e.target.value
    })
  }

  Search = async (key, value) => {
    try {
      const dataUser = await axios.get(config.APP_BACKEND.concat(`user?search[key]=${key}&search[value]=${value}`))
      const page = []
      const pageTotal = dataUser.data.pageInfo.totalPage
      for (let index = 0; index < pageTotal; index++) {
        page.push(<PaginationItem key={index}> <PaginationLink onClick={this.setPage} href='#'>{index + 1}</PaginationLink> </PaginationItem>)
      }
      this.setState({
        users: dataUser.data.data,
        pageInfo: dataUser.data.pageInfo,
        loading: false,
        page
      })
      this.setState({
        loading: true,
      })
    } catch (error) {
      console.log(error)
    }
  }

  // sort method
  sortValueName = async () => {
    try {
      const dataUser = await axios.get(config.APP_BACKEND.concat(`user?sort[key]=name&sort[value]=${this.state.sortValueName ? 1 : 0}`))
      const page = []
      const pageTotal = dataUser.data.pageInfo.totalPage
      for (let index = 0; index < pageTotal; index++) {
        page.push(<PaginationItem key={index}> <PaginationLink onClick={this.setPage} href='#'>{index + 1}</PaginationLink> </PaginationItem>)
      }
      this.setState({
        users: dataUser.data.data,
        pageInfo: dataUser.data.pageInfo,
        loading: false,
        page,
        sortValueName: !this.state.sortValueName
      })
      this.setState({
        loading: true,
      })
    } catch (error) {
      console.log(error)
    }
  }
  sortValueEmail = async () => {
    try {
      const dataUser = await axios.get(config.APP_BACKEND.concat(`user?sort[key]=email&sort[value]=${this.state.sortValueEmail ? 1 : 0}`))
      const page = []
      const pageTotal = dataUser.data.pageInfo.totalPage
      for (let index = 0; index < pageTotal; index++) {
        page.push(<PaginationItem key={index}> <PaginationLink onClick={this.setPage} href='#'>{index + 1}</PaginationLink> </PaginationItem>)
      }
      this.setState({
        users: dataUser.data.data,
        pageInfo: dataUser.data.pageInfo,
        loading: false,
        page,
        sortValueEmail: !this.state.sortValueEmail
      })
      this.setState({
        loading: true,
      })
    } catch (error) {
      console.log(error)
    }
  }


  render() {
    const {
      loading,
      users,
      pageInfo,
      page,
      search,
      searchKey,
      sortName,
      sortEmail,
      sortValueName,
      sortValueEmail,
    } = this.state

    console.log(pageInfo)
    return (
      <Container>
        <div className="header">
          <h1>List User</h1>
          <div className="actions">
            {users === null && pageInfo === null ? null :
              <Form>
                <FormGroup>
                  <Label for="search">Search by</Label>
                  <Input onChange={this.searchKey} type="select" id="search">
                    <option value="name">Name</option>
                    <option value="email">Email</option>
                  </Input>
                  <Input onChange={this.searchValue} placeholder="search" />
                  <Button onClick={() => this.Search(searchKey, search)} outline color="primary"> Search </Button>
                </FormGroup>
              </Form>}
          </div>
        </div>
        {loading && users === null && pageInfo === null ? <Loading />
          :
          <div className="table-user">
            {users !== null ? <>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>No.</th>
                    <th style={{ cursor: "pointer" }} onClick={this.sortValueName}>Name {sortValueName ? sortName : <AiFillCaretUp />} </th>
                    <th style={{ cursor: "pointer" }} onClick={this.sortValueEmail}>Email {sortValueEmail ? sortEmail : <AiFillCaretUp />} </th>
                  </tr>
                </thead>
                <tbody>
                  {users !== null && pageInfo !== null ? users.map((user, i) => {
                    return (
                      <tr key={i}>
                        <th> {((pageInfo.page - 1) * pageInfo.limit) + (i + 1)} </th>
                        <td> {user.name} </td>
                        <td> {user.email} </td>
                      </tr>
                    )
                  }) : null}
                </tbody>
              </Table>
              <p> Total Data : {pageInfo.totalData} </p>
              <div className="create">
                <Link to='/create'>
                  <Button style={{
                    display: 'block',
                  }} color="primary"> Create </Button>
                </Link>
              </div>
              <Pagination className="pagination" aria-label="Page navigation example">
                <PaginationItem>
                  <PaginationLink previous onClick={() => this.nextLink(pageInfo.prevLink)} href="#" />
                </PaginationItem>
                {page}
                <PaginationItem>
                  <PaginationLink next onClick={() => this.nextLink(pageInfo.nextLink)} href="#" />
                </PaginationItem>
              </Pagination>
            </> :
              <div className="nodata">
                <p>There's currently no data exist </p>
                <p>please create by clicking the create button Below</p>
                <div className="createNoData">
                  <Link to='/create'>
                    <Button style={{
                      display: 'block',
                    }} color="primary"> Create </Button>
                  </Link>
                </div>
              </div>
            }

          </div>
        }
        <div className="bottom">

        </div>
      </Container>
    )
  }
}
