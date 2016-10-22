import React from 'react'
import LabelIngredient from './LabelIngredient.jsx';

export default class SupplementFactsContainer extends React.Component {
    render (){
        var ingredients1 = [
            {name: "Calcium", source: "AAAA", quantity: 14, unit: "mg", percentage: "15 %"},
            {name: "Chlorine", quantity: 14, unit: "mg", percentage: "5 %"},
            {name: "Sodium", quantity: 14, unit: "mg"}
        ]

        return (
            <ul>
                {ingredients1.map(i => <LabelIngredient key={i.name} item={i}/>)}
            </ul>
        )
    }
}