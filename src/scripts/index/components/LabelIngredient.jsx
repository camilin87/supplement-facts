import React from 'react'
import IngredientSource from './IngredientSource.jsx';

class LabelIngredient extends React.Component {
    render (){
        return (
            <div>
                {this.props.item.name}

                <IngredientSource source={this.props.item.source} />

                {this.props.item.quantity}
                {this.props.item.unit}
                {this.props.item.percentage}
            </div>
        )
    }
}

export default LabelIngredient