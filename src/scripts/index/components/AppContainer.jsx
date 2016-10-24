import React from 'react'
import SupplementFactsContainer from './SupplementFactsContainer.jsx'

export default class AppContainer extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            labelData: this.getVm2()
        }
    }

    getVm1() {
        return {
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

    getVm2() {
        return {
            servingSizeInfo: {
                value: 1,
                type: "bottle",
                additionalComments: "1 tbsp",
                servingsPerContainer: 1
            },
            disclaimers: {
                displayDailyValueNotEstablished: true,
                displayChildrenDisclaimer: false,
                displayPregnantWomenDisclaimer: false
            },
            otherIngredients: {},
            businessInfo: {},
            dailyValueIngredients: [
                {name: "Vitamin C", quantity: 10, unit: "mg", percentage: "5 %"},
                {name: "Vitamin D", quantity: 11, unit: "mg", percentage: "< 1 %"}
            ],
            nonDailyValueIngredients: [
                {name: "Sodium", quantity: 14, unit: "mg"}
            ]
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