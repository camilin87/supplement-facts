import React from 'react'

export default class OtherIngredientsInput extends React.Component {
    render (){
        var ingredients = (this.props.value || [])//.map(i => `${i.name} ${i.quantity}mg`)

        return (
            <ul className="list-group">
                { 
                    ingredients.map(i => {
                        return <li className="list-group-item" key={i.name}>
                            {i.name} <span className="badge">{i.quantity}mg</span>
                        </li>
                    }) 
                }
            </ul>
        )
    }
}