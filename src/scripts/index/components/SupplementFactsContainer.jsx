import React from 'react'
import LabelIngredient from './LabelIngredient.jsx';

class SupplementFactsContainer extends React.Component {
    render (){
        var item1 = {name: "Calcium", source: "AAAA", quantity: 14, unit: "mg", percentage: "15 %"}

        return (
            <LabelIngredient item={item1}/>
        )
    }
}

export default SupplementFactsContainer