import React from 'react'

export default class IngredientPercentage extends React.Component {
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