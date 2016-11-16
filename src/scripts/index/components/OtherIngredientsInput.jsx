import React from 'react'

export default class OtherIngredientsInput extends React.Component {
    render (){
        var lines = (this.props.value || []).map(i => `${i.name} ${i.quantity}mg`)

        return (
            <ul>
                { lines.map(l => <li key={l}>{l}</li>) }
            </ul>
        )
    }
}