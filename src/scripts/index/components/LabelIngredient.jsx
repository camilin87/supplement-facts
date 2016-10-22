import React from 'react'

class LabelIngredient extends React.Component {
    render (){
        return (
            <div>
                {this.props.item.name}
            </div>
        )
    }
}

export default LabelIngredient