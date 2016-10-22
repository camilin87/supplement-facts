import React from 'react'

export default class IngredientSource extends React.Component {
    render (){
        if (!this.props.source){
            return (null)
        }

        return (
            <div>
                ({this.props.source})
            </div>
        )
    }
}