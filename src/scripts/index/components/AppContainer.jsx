import React from 'react'
import SupplementFactsContainer from './SupplementFactsContainer.jsx'

export default class AppContainer extends React.Component {
    render (){
        return (
            <div className="container">
              <div className="row">
                <div className="col-sm-6">
                    <SupplementFactsContainer />
                </div>
                <div className="col-sm-6"></div>
              </div>
            </div>
        )
    }
}