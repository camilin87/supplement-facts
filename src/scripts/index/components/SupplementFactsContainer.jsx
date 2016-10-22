import React from 'react'
import LabelIngredient from './LabelIngredient.jsx';

export default class SupplementFactsContainer extends React.Component {
    render (){
        var viewModel = {
            percentOfDailyValueAdditionalSymbol: "^",
            dailyValueIngredients: [
                {name: "Calcium", source: "AAAA", quantity: 14, unit: "mg", percentage: "15 %"},
                {name: "Chlorine", quantity: 14, unit: "mg", percentage: "5 %"},
                {name: "Sodium", quantity: 14, unit: "mg"}
            ]
        }

        return (
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Amount per Serving</th>
                        <th>% Daily Value {viewModel.percentOfDailyValueAdditionalSymbol}</th>
                    </tr>
                </thead>
                <tbody>
                    {viewModel.dailyValueIngredients.map(i => <LabelIngredient key={i.name} item={i}/>)}
                </tbody>
            </table>
        )
    }
}