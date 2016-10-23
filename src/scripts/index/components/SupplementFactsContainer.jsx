import React from 'react'
import ServingSize from './ServingSize.jsx'
import LabelIngredient from './LabelIngredient.jsx'
import DailyValueHeader from './DailyValueHeader.jsx'
import NonDailyValueSeparator from './NonDailyValueSeparator.jsx'
import DisplayDisclaimers from './DisplayDisclaimers.jsx'

export default class SupplementFactsContainer extends React.Component {

    constructor(props) {
        super(props)

        var vm = this.props.data

        if (!this.props.data){
            vm = {
                servingSizeInfo: {
                    value: 23,
                    type: "packet",
                    additionalComments: "(8g) 1 tbsp",
                    servingsPerContainer: 10
                },
                percentOfDailyValueAdditionalSymbol: "^=",
                disclaimers: {
                    percentOfDailyValueAdditionalSymbol: "^=",
                    displayDailyValueNotEstablished: true,
                    displayChildrenDisclaimer: true,
                    displayPregnantWomenDisclaimer: true,
                    otherIngredients: "pb, hg",
                    allergens: "nuts, penicillin"
                },
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
            <div>
                <ServingSize servingSize={this.state.servingSizeInfo} />

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

                        <NonDailyValueSeparator ingredients={this.state.nonDailyValueIngredients} />
                        {this.state.nonDailyValueIngredients.map(i => <LabelIngredient key={i.name} item={i}/>)}
                    </tbody>
                </table>

                <DisplayDisclaimers info={this.state.disclaimers} />
            </div>
        )
    }
}