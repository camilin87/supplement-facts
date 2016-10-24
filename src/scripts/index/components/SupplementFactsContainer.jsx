import React from 'react'
import ServingSize from './ServingSize.jsx'
import SingleIngredient from './SingleIngredient.jsx'
import IngredientsHeader from './IngredientsHeader.jsx'
import NonDailyValueSeparator from './NonDailyValueSeparator.jsx'
import DisplayDisclaimers from './DisplayDisclaimers.jsx'
import DisplayOtherIngredients from './DisplayOtherIngredients.jsx'
import BusinessInfo from './BusinessInfo.jsx'

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
                percentOfDailyValueAdditionalSymbol: "^",
                disclaimers: {
                    percentOfDailyValueAdditionalSymbol: "^",
                    displayDailyValueNotEstablished: true,
                    displayChildrenDisclaimer: true,
                    displayPregnantWomenDisclaimer: true
                },
                otherIngredients: {
                    otherIngredients: "pb, hg",
                    allergens: "nuts, penicillin"
                },
                businessInfo: {
                    distributedByLabel: "Distributed by",
                    businessName: "Apple",
                    streetAddressLine1: "One infinite loop",
                    streetAddressLine2: " --- ",
                    city: "cupertino",
                    state: "CA",
                    zipCode: "55555",
                    phone: "1-800-my-apple"
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

        function initIngredients(arr){
            arr = arr || []

            if (arr.length > 0){
                arr[arr.length - 1].isLast = true
            }

            return arr
        }

        vm.dailyValueIngredients = initIngredients(vm.dailyValueIngredients)
        vm.nonDailyValueIngredients = initIngredients(vm.nonDailyValueIngredients)

        this.state = vm
    }

    render (){
        return (
            <div id="label-container">
                <div className="label-box">
                    <div className="text-center">
                        <h2>Supplement Facts</h2>
                    </div>

                    <ServingSize servingSize={this.state.servingSizeInfo} />
                    <hr />

                    <IngredientsHeader addSymbol={this.state.percentOfDailyValueAdditionalSymbol}/>
                    <hr className="slim"/>

                    {this.state.dailyValueIngredients.map(i => <SingleIngredient key={i.name} item={i}/>)}

                    <NonDailyValueSeparator ingredients={this.state.nonDailyValueIngredients} />
                    {this.state.nonDailyValueIngredients.map(i => <SingleIngredient key={i.name} item={i}/>)}
                    <hr />

                    <DisplayDisclaimers info={this.state.disclaimers} />
                </div>

                <DisplayOtherIngredients info={this.state.otherIngredients} />
                <BusinessInfo info={this.state.businessInfo} />
            </div>
        )
    }
}