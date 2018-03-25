import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import './index.css'

// Context demo for React 16.2 and before.
class Child162 extends React.Component {
  render () {
    return (
      <div className='child'>
        <p>Child162</p>
        <p>Context = { this.context.ctx }</p>
      </div>
    )
  }
}

Child162.contextTypes = { ctx: PropTypes.string }

function Middle ({ children }) {
  return (
    <div className='middle'>
      <p>Middle</p>
      { children }
    </div>
  )
}

class Parent162 extends React.Component {
  constructor (props) {
    super(props)
    this.state = { ctx: 'ctx' }
  }

  getChildContext () {
    return this.state
  }

  render () {
    return (
      <div className='parent'>
        <p>Parent162</p>
        <p>Context = {JSON.stringify(this.state)}</p>
        {this.props.children}
      </div>
    )
  }
}

Parent162.childContextTypes = { ctx: PropTypes.string }

function Demo162 () {
  return (
    <div className='demo'>
      <p>Context demo for React 16.2 and before</p>
      <Parent162>
        <Middle>
          <Child162 />
        </Middle>
      </Parent162>
    </div>
  )
}

// Context demo for React 16.3
const Ctx = React.createContext({ ctx: '' })

class Child163 extends React.Component {
  render () {
    return (
      <Ctx.Consumer>
        { ctx => (
          <div className='child'>
            <p>Child163</p>
            <p>Context = {JSON.stringify(ctx)}</p>
          </div>
        )}
      </Ctx.Consumer>
    )
  }
}

class Parent163 extends React.Component {
  constructor (props) {
    super(props)
    this.state = { ctx: 'ctx' }
  }

  render () {
    return (
      <Ctx.Provider value={this.state}>
        <div className='parent'>
          <p>Parent163</p>
          <p>Context = {JSON.stringify(this.state)}</p>
          {this.props.children}
        </div>
      </Ctx.Provider>
    )
  }
}

function Demo163 () {
  return (
    <div className='demo'>
      <p>Context demo for upcomming React 16.3</p>
      <Parent163>
        <Middle>
          <Child163 />
        </Middle>
      </Parent163>
    </div>
  )
}

function App () {
  return (
    <React.Fragment>
      <h4>React Context Deom</h4>
      <Demo162 />
      <Demo163 />
    </React.Fragment>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
