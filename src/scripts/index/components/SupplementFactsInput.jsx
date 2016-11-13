import React from 'react'
import Select from 'react-select'
import PresetsDataService from '../lib/PresetsDataService.jsx'

export default class SupplementFactsInput extends React.Component {
    constructor(props){
        super(props)

        //**** dependencies ****
        this._presetsDataService = props["PresetsDataService"] || new PresetsDataService()

        //**** initial state ****
        this.state = {
            productType: this._readProductTypes()[0],
            percentOfDailyValueAdditionalSymbol: "",

            servingSizeInfoValue: 0,
            servingSizeInfoType: "",
            servingSizeInfoAdditionalComments: "",
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

            dailyValueIngredients: [],
            nonDailyValueIngredients: []
        }

        //**** event handlers *****
        this._productTypeChanged = this._productTypeChanged.bind(this)
        this._handleTextChanged = this._handleTextChanged.bind(this)

        //TODO: delete these once the data input is ready
        this._displayLabel1 = this._displayLabel1.bind(this)
        this._displayLabel2 = this._displayLabel2.bind(this)
    }

    _readProductTypes(){
        var productTypesRaw = this._presetsDataService.read()
        return Object.keys(productTypesRaw).map(k => productTypesRaw[k])
    }

    _handleChange(change){
        this.setState(change, () => {
            if (this.props.onChange){
                this.props.onChange(this.state)
            }
        })
    }

    _displayLabel1(){
        this._handleChange({
            productType: "Adults",
            percentOfDailyValueAdditionalSymbol: "^",

            servingSizeInfoValue: 23,
            servingSizeInfoType: "packet",
            servingSizeInfoAdditionalComments: "(8g) 1 tbsp",
            servingSizeInfoServingsPerContainer: 10,

            otherIngredients: [
                {name: "hg", quantity: 10},
                {name: "pb", quantity: 1000}
            ],
            allergens: [
                "nuts",
                "penicillin"
            ],

            businessInfoDistributedByLabel: "Distributed by",
            businessInfoBusinessName: "Apple",
            businessInfoStreetAddressLine1: "One infinite loop",
            businessInfoStreetAddressLine2: " --- ",
            businessInfoCity: "cupertino",
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
            servingSizeInfoType: "bottle",
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

    _productTypeChanged(newValue){
        this._handleChange({
            productType: newValue.value
        })
    }

    _handleTextChanged(propertyName){
        var that = this

        return (event) => {
            var stateChange = {}
            stateChange[propertyName] = event.target.value

            that._handleChange(stateChange)
        }
    }

    render (){
        var productTypesSelect = this._readProductTypes().map(v => {
            return { value: v, label: v }
        })

        return (
            <div>
                <button type="button" className="btn btn-primary" onClick={this._displayLabel1}>Label 1</button>
                <button type="button" className="btn btn-success" onClick={this._displayLabel2}>Label 2</button>

                <Select 
                    name="productType"
                    options={productTypesSelect}
                    clearable={false}
                    value={this.state.productType}
                    onChange={this._productTypeChanged} />


                <input 
                    name="percentOfDailyValueAdditionalSymbol"
                    className="form-control"
                    placeholder="Percent of Daily Value additional symbol"
                    type="text"
                    value={this.state.percentOfDailyValueAdditionalSymbol}
                    onChange={this._handleTextChanged("percentOfDailyValueAdditionalSymbol")} />

                <input 
                    name="servingSizeInfoValue"
                    className="form-control"
                    placeholder="Value"
                    type="text"
                    value={this.state.servingSizeInfoValue}
                    onChange={this._handleTextChanged("servingSizeInfoValue")} 
                    />

                <hr />

            </div>
        )
    }
}