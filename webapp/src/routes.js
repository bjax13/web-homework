import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { css } from '@emotion/core'
import { Home } from './home'
import { UserHomePage } from './users'
import { MerchantHomePage } from './merchants'

function AppRouter () {
  return (
    <Router>
      <div css={layoutStyle}>
        <nav css={navStyle}>
          <ul >
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/users'>Users</Link>
            </li>
            <li>
              <Link to='/merchants'>Merchants</Link>
            </li>
          </ul>
        </nav>
        <div className='main-content' css={contentStyle}>
          <Route component={Home} exact path='/' />
          <Route component={UserHomePage} exact path='/users' />
          <Route component={MerchantHomePage} exact path='/merchants' />
        </div>
      </div>
    </Router>
  )
}

export default AppRouter

const layoutStyle = css`
    display: grid;
    grid-row-gap: 24px;
    padding: 8px;
`

const navStyle = css`
  grid-row: 1;

  & > ul {
      display: flex;
      flex-direction: row;
      list-style-type: none;
  }
  
  & > ul > li:not(:first-of-type) {
    margin-left: 16px;
  }
`

const contentStyle = css`
  grid-row: 2;
`
