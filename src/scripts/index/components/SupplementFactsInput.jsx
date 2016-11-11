import React from 'react'

export default class SupplementFactsInput extends React.Component {
    constructor(props){
        super(props)

        this.handleChange = this.handleChange.bind(this)

        //TODO: delete these once the data input is ready
        this.displayLabel1 = this.displayLabel1.bind(this)
        this.displayLabel2 = this.displayLabel2.bind(this)
    }

    handleChange(change){
        this.props.onChange(change)
    }

    displayLabel1(){
        function getVm1() {
            return {
                productType: "Adults",
                percentOfDailyValueAdditionalSymbol: "^",
                servingSizeInfo: {
                    value: 23,
                    type: "packet",
                    additionalComments: "(8g) 1 tbsp",
                    servingsPerContainer: 10
                },
                otherIngredients: [
                    {name: "hg", quantity: 10},
                    {name: "pb", quantity: 1000}
                ],
                allergens: [
                    "nuts",
                    "penicillin"
                ],
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
                    {name: "Vitamin A", source: "AAAA", quantity: 14},
                    {name: "Vitamin D", source: "CCCC", quantity: 11},
                    {name: "Vitamin C", source: "BBBB", quantity: 10}
                ],
                nonDailyValueIngredients: [
                    {name: "Calcium", source: "AAAA", quantity: 14, unit: "mg"},
                    {name: "Chlorine", quantity: 14, unit: "mg"},
                    {name: "Sodium", quantity: 14, unit: "mg"}
                ]
            }
        }

        this.handleChange(getVm1())
    }

    displayLabel2(){
        function getVm2() {
            return {
                productType: "Adults",
                servingSizeInfo: {
                    value: 1,
                    type: "bottle",
                    additionalComments: "1 tbsp",
                    servingsPerContainer: 1
                },
                dailyValueIngredients: [
                    {name: "Vitamin D", quantity: 11},
                    {name: "Vitamin C", quantity: 10}
                ],
                nonDailyValueIngredients: [
                    {name: "Sodium", quantity: 14, unit: "mg"}
                ]
            }
        }

        this.handleChange(getVm2())
    }

    render (){

        return (
            <div>
                <button type="button" className="btn btn-primary" onClick={this.displayLabel1}>Label 1</button>
                <button type="button" className="btn btn-success" onClick={this.displayLabel2}>Label 2</button>
            </div>
        )
    }
}