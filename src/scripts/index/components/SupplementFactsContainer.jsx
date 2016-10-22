import React from 'react'
import LabelIngredient from './LabelIngredient.jsx'
import DailyValueHeader from './DailyValueHeader.jsx'

export default class SupplementFactsContainer extends React.Component {

    constructor(props) {
        super(props)

        var vm = this.props.viewModel

        if (!this.props.viewModel){
            vm = {
                percentOfDailyValueAdditionalSymbol: "^=",
                dailyValueIngredients: [
                    {name: "Calcium", source: "AAAA", quantity: 14, unit: "mg", percentage: "15 %"},
                    {name: "Chlorine", quantity: 14, unit: "mg", percentage: "5 %"},
                    {name: "Sodium", quantity: 14, unit: "mg"}
                ]
            }
        }

        vm.dailyValueIngredients = vm.dailyValueIngredients || []

        this.state = {
            viewModel: vm
        }
    }

    render (){
        return (
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Amount per Serving</th>
                        <th>
                            <DailyValueHeader addSymbol={this.state.viewModel.percentOfDailyValueAdditionalSymbol}/>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.viewModel.dailyValueIngredients.map(i => <LabelIngredient key={i.name} item={i}/>)}
                </tbody>
            </table>
        )
    }
}