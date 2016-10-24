import React from 'react'
import SupplementFactsContainer from './SupplementFactsContainer.jsx'

export default class AppContainer extends React.Component {
    constructor(props){
        super(props)

        var vm1 = {
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

        this.state = {
            labelData: vm1
        }
    }

    render (){
        return (
            <div className="container">
              <div className="row">
                <div className="col-sm-6"></div>
                <div className="col-sm-6">
                    <SupplementFactsContainer data={this.state.labelData} />
                </div>
              </div>
            </div>
        )
    }
}