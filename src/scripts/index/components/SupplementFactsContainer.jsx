import React from 'react'
import LabelIngredient from './LabelIngredient.jsx';

class SupplementFactsContainer extends React.Component {
    render (){
        var ingredients1 = [
            {name: "Calcium", source: "AAAA", quantity: 14, unit: "mg", percentage: "15 %"},
            {name: "Chlorine", quantity: 14, unit: "mg", percentage: "5 %"},
            {name: "Sodium", quantity: 14, unit: "mg"}
        ]

        return (
            <div>
                {ingredients1.map(i => <LabelIngredient item={i}/>)}
            </div>
        )
    }
}

export default SupplementFactsContainer