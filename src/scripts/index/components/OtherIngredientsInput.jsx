import React from 'react'

export default class OtherIngredientsInput extends React.Component {
    render (){
        var lines = (this.props.value || []).map(i => `${i.name} ${i.quantity}mg`)

        return (
            <ul className="list-group">
                { lines.map(l => <li className="list-group-item" key={l}>{l}</li>) }
            </ul>
        )
    }
}