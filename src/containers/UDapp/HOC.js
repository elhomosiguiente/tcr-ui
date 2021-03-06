import React, { Component } from 'react'

import abis from '../../abis'

import { randInt } from '../../utils/units_utils'
import vote_utils from '../../utils/vote_utils'

const UDappHOC = WrappedComponent => {
  return class UDapp extends Component {
    constructor(props) {
      super(props)

      this.state = {
        fromAddress: false,
        registry: {
          abi: abis.registry.abi,
          address: abis.registry.networks[props.networkId].address,
        },
        voting: {
          abi: abis.voting.abi,
          address: abis.voting.networks[props.networkId].address,
        },
        parameterizer: {
          abi: abis.parameterizer.abi,
          address: abis.parameterizer.networks[props.networkId].address,
        },
        token: {
          abi: abis.token.abi,
          address: abis.token.networks[props.networkId].address,
        },
        callResult: '',
        currentMethod: '',
      }
    }

    // this is a horrendous hack to make default values work
    // TODO: fix this pathetic piece of code
    componentWillReceiveProps(newProps) {
      // console.log('HOC OLD PROPS:', this.props)
      // console.log('HOC NEW PROPS:', newProps)

      if (newProps.request.get('context').size > 0) {
        const listingStr = newProps.request.getIn(['context', 'listing'])
        const _pollID = newProps.request.getIn(['context', 'latest', 'pollID'])

        this.setState(prevState => ({
          ...prevState,
          [newProps.actions[0]]: {
            ...prevState[newProps.actions[0]],
            _listingHash: listingStr,
            _data: listingStr,
            _pollID,
            // _prevPollID,
          },
        }))
      }
    }

    handleInputChange = async (e, method, input) => {
      const methName = method.name
      const inputName = input.name

      const inputValue = e.target.value

      this.setState(prevState => ({
        ...prevState,
        [methName]: {
          ...prevState[methName],
          [inputName]: inputValue,
        },
        currentMethod: methName,
      }))
    }

    getMethodArgs = method =>
      method.inputs.map(input => this.state[method.name][input.name])

    handleHOCCall = async (e, method, contract) => {
      e.preventDefault()
      const args = await this.getMethodArgs(method)
      const callResult = await this.props.handleCall({ method, contract, args })
      console.log('callResult', callResult)
    }
    handleHOCSendTransaction = async (e, method, contract) => {
      e.preventDefault()
      const args = this.getMethodArgs(method)
      this.props.handleSendTransaction({ method, args, contract })
    }

    render() {
      return (
        <WrappedComponent
          hocInputChange={this.handleInputChange}
          hocCall={this.handleHOCCall}
          hocSendTransaction={this.handleHOCSendTransaction}
          registry={this.state.registry}
          voting={this.state.voting}
          token={this.state.token}
          callResult={this.state.callResult}
          currentMethod={this.state.currentMethod}
          {...this.props}
        />
      )
    }
  }
}

export default UDappHOC
