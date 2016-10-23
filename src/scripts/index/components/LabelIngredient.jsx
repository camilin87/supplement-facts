import React from 'react'
import IngredientSource from './IngredientSource.jsx';
import IngredientPercentage from './IngredientPercentage.jsx';

export default class LabelIngredient extends React.Component {
    render (){
        return (
            <div className="row">
              <div className="col-xs-6">
                {this.props.item.name}
                <IngredientSource source={this.props.item.source} />
              </div>
              <div className="col-xs-3">
                {this.props.item.quantity + " " + this.props.item.unit}
              </div>
              <div className="col-xs-3 text-right">
                <IngredientPercentage percentage={this.props.item.percentage} />
              </div>
            </div>
        )
    }
}