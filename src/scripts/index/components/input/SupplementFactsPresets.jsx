import React from 'react'

export default class SupplementFactsPresets extends React.Component {
    constructor(props){
        super(props)

        //**** event handlers *****
        this._displayLabel1 = this._displayLabel1.bind(this)
        this._displayLabel2 = this._displayLabel2.bind(this)
    }

    _displayLabel1(){
        this._handleChange({
            productType: "Adults",
            percentOfDailyValueAdditionalSymbol: "^",

            servingSizeInfoValue: 23,
            servingSizeInfoType: "Packet",
            servingSizeInfoAdditionalComments: "(8g) 1 tbsp",
            servingSizeInfoServingsPerContainer: 10,

            otherIngredients: [
                {name: "hg", quantity: 10},
                {name: "pb", quantity: 1000}
            ],
            allergens: [
                {id: 1, text: "Tree nuts"},
                {id: 2, text: "Soy"}
            ],

            businessInfoDistributedByLabel: "Distributed by",
            businessInfoBusinessName: "Apple",
            businessInfoStreetAddressLine1: "One infinite loop",
            businessInfoStreetAddressLine2: " --- ",
            businessInfoCity: "Cupertino",
            businessInfoState: "CA",
            businessInfoZipCode: "55555",
            businessInfoPhone: "1-800-my-apple",

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
        })
    }

    _displayLabel2(){
        this._handleChange({
            productType: "Adults",
            percentOfDailyValueAdditionalSymbol: "",

            servingSizeInfoValue: 1,
            servingSizeInfoType: "Capsule",
            servingSizeInfoAdditionalComments: "1 tbsp",
            servingSizeInfoServingsPerContainer: 1,

            otherIngredients: [],
            allergens: [],

            businessInfoDistributedByLabel: "",
            businessInfoBusinessName: "",
            businessInfoStreetAddressLine1: "",
            businessInfoStreetAddressLine2: "",
            businessInfoCity: "",
            businessInfoState: "",
            businessInfoZipCode: "",
            businessInfoPhone: "",

            dailyValueIngredients: [
                {name: "Vitamin D", quantity: 11},
                {name: "Vitamin C", quantity: 10}
            ],

            nonDailyValueIngredients: [
                {name: "Sodium", quantity: 14, unit: "mg"}
            ]
        })
    }

    _handleChange(change){
        if (this.props.onChange){
            this.props.onChange(change)
        }
    }

    render (){
        return (
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Presets</h3>
              </div>
              <div className="panel-body">
                <button type="button" className="btn btn-primary" onClick={this._displayLabel1}>Label 1</button>
                <button type="button" className="btn btn-success" onClick={this._displayLabel2}>Label 2</button>
              </div>
            </div>
        )
    }
}