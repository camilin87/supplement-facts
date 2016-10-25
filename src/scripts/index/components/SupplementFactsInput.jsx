import React from 'react'

export default class DisplayDisclaimers extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            inputData: {
                productType: "",
                percentOfDailyValueAdditionalSymbol: "",
                servingSizeInfo: {
                    value: 23,
                    type: "packet",
                    additionalComments: "(8g) 1 tbsp",
                    servingsPerContainer: 10
                },
                dailyValueIngredients: [
                    {name: "Vitamin A", source: "AAAA", quantity: 14, unit: "mg"},
                    {name: "Vitamin C", source: "BBBB", quantity: 10, unit: "mg"},
                    {name: "Vitamin D", source: "CCCC", quantity: 11, unit: "mg"}
                ],
                nonDailyValueIngredients: [
                    {name: "Calcium", source: "AAAA", quantity: 14, unit: "mg"},
                    {name: "Chlorine", quantity: 14, unit: "mg"},
                    {name: "Sodium", quantity: 14, unit: "mg"}
                ],
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
                }
            }
        }

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

        this.handleChange(getVm1())
    }

    displayLabel2(){
        function getVm2() {
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