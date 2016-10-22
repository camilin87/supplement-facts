import React from 'react'

class IngredientPercentage extends React.Component {
    render (){
        if (!this.props.percentage){
            return (<span>*</span>)
        }

        return (
            <span>
                {this.props.percentage}
            </span>
        )
    }
}

export default IngredientPercentage