import React from 'react'
import SupplementFactsContainer from './SupplementFactsContainer.jsx'
import SupplementFactsInput from './SupplementFactsInput.jsx'
import DataTransformer from '../lib/DataTransformer.jsx'

export default class AppContainer extends React.Component {
    constructor(props){
        super(props)

        this.handleSupplementFactsInput = this.handleSupplementFactsInput.bind(this)

        this.state = {
            labelData: {}
        }
    }

    handleSupplementFactsInput(supplementFactsInput){
        this.setState({
            labelData: new DataTransformer().generateLabelData()
        })
    }

    render (){
        return (
            <div className="container">
              <div className="row">
                <div className="col-sm-6">
                    <SupplementFactsInput onChange={this.handleSupplementFactsInput}/>
                </div>
                <div className="col-sm-6">
                    <SupplementFactsContainer data={this.state.labelData} />
                </div>
              </div>
            </div>
        )
    }
}