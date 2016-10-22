import React from 'react'
import LabelIngredient from './LabelIngredient.jsx'
import DailyValueHeader from './DailyValueHeader.jsx'

export default class SupplementFactsContainer extends React.Component {

    constructor(props) {
        super(props)

        var vm = this.props.data

        if (!this.props.data){
            vm = {
                percentOfDailyValueAdditionalSymbol: "^=",
                dailyValueIngredients: [
                    {name: "Vitamin A", source: "AAAA", quantity: 14, unit: "mg", percentage: "15 %"},
                    {name: "Vitamin C", source: "BBBB", quantity: 10, unit: "mg", percentage: "5 %"},
                    {name: "Vitamin D", source: "CCCC", quantity: 11, unit: "mg", percentage: "< 1 %"}
                ],
                nonDailyValueIngredients: [
                    {name: "Calcium", source: "AAAA", quantity: 14, unit: "mg"},
                    {name: "Chlorine", quantity: 14, unit: "mg"},
                    {name: "Sodium", quantity: 14, unit: "mg"}
                ]
            }
        }

        vm.dailyValueIngredients = vm.dailyValueIngredients || []
        vm.nonDailyValueIngredients = vm.nonDailyValueIngredients || []

        this.state = vm
    }

    render (){
        return (
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Amount per Serving</th>
                        <th>
                            <DailyValueHeader addSymbol={this.state.percentOfDailyValueAdditionalSymbol}/>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.dailyValueIngredients.map(i => <LabelIngredient key={i.name} item={i}/>)}

                    <tr>
                        <td colSpan="3">
                            <hr />
                        </td>
                    </tr>

                    {this.state.nonDailyValueIngredients.map(i => <LabelIngredient key={i.name} item={i}/>)}
                </tbody>
            </table>
        )
    }
}