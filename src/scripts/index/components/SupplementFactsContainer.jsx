import React from 'react'
import LabelIngredient from './LabelIngredient.jsx';

export default class SupplementFactsContainer extends React.Component {

    constructor(props) {
        super(props)

        if (!this.props.viewModel){
            this.state = {
                viewModel: {
                    percentOfDailyValueAdditionalSymbol: "^",
                    dailyValueIngredients: [
                        {name: "Calcium", source: "AAAA", quantity: 14, unit: "mg", percentage: "15 %"},
                        {name: "Chlorine", quantity: 14, unit: "mg", percentage: "5 %"},
                        {name: "Sodium", quantity: 14, unit: "mg"}
                    ]
                }
            }
        }
        else {
            this.state = {
                viewModel: this.props.viewModel
            }
        }
    }

    render (){
        return (
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Amount per Serving</th>
                        <th>% Daily Value {this.state.viewModel.percentOfDailyValueAdditionalSymbol}</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.viewModel.dailyValueIngredients.map(i => <LabelIngredient key={i.name} item={i}/>)}
                </tbody>
            </table>
        )
    }
}