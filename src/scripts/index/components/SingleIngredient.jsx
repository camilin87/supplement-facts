import React from 'react'
import IngredientSource from './IngredientSource.jsx';
import IngredientPercentage from './IngredientPercentage.jsx';
import IngredientSeparator from './IngredientSeparator.jsx';

export default class SingleIngredient extends React.Component {
    render (){
        return (
            <div>
              <div className="row">
                <div className="col-xs-7">
                  {this.props.item.name}
                  <IngredientSource source={this.props.item.source} />
                </div>
                <div className="col-xs-2 nobr">
                  {this.props.item.quantity + " " + this.props.item.unit}
                </div>
                <div className="col-xs-1"></div>
                <div className="col-xs-1 text-right nobr">
                  <IngredientPercentage percentage={this.props.item.percentage} />
                </div>
                <div className="col-xs-1"></div>
              </div>

              <IngredientSeparator isLast={this.props.item.isLast}/>
            </div>
        )
    }
}