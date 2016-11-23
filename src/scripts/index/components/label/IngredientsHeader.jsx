import React from 'react'

export default class IngredientsHeader extends React.Component {
    render (){
        var addSymbol = ""

        if (this.props.addSymbol){
            addSymbol = " " + this.props.addSymbol
        }

        return (
             <div className="row">
                <div className="col-xs-6">
                    <h3>Amount per Serving</h3>
                </div>
                <div className="col-xs-6 text-right">
                    <h3>
                        % Daily Value{addSymbol}
                    </h3>
                </div>
            </div>
        )
    }
}