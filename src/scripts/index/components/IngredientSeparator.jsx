import React from 'react'

export default class IngredientSeparator extends React.Component {
    render (){
        if (this.props.isLast){
            return (null)
        }

        return (
            <hr className="x-slim"/>
        )
    }
}