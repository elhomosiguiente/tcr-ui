import React, { Component } from 'react'
import styled from 'styled-components'
import NavLink from './NavLink'

const NavBar = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 5px;
  padding: 1.5em;
  background-color: white;
`
const styles = {
  active: {
    fontWeight: 'bold',
    color: 'red',
  },
}

class Nav extends Component {
  render() {
    return (
      <NavBar>
        <NavLink to="/"/>
        <NavLink to="/"/>
        <NavLink to="/"/>
        <NavLink strict to="/">
          Home
        </NavLink>
        {/* <NavLink activeStyle={styles.active} to="/challenge">
          Challenge
        </NavLink> */}
        <NavLink activeStyle={styles.active} to="/vote">
          Vote
        </NavLink>
        {/* <NavLink activeStyle={styles.active} to="/activities">
          Activities
        </NavLink> */}
        {/* <NavLink activeStyle={styles.active} to="/search">
          Registry
        </NavLink> */}
      </NavBar>
    )
  }
}

export default Nav
