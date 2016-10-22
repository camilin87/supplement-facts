import React from 'react'

class IngredientSource extends React.Component {
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

export default IngredientSource