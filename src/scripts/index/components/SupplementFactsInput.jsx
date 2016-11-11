import React from 'react'
import Select from 'react-select'
import ProductTypesDataService from '../lib/ProductTypesDataService.jsx'

export default class SupplementFactsInput extends React.Component {
    constructor(props){
        super(props)

        this._productTypesDataService = new ProductTypesDataService()

        this._handleChange = this._handleChange.bind(this)
        this._productTypeChanged = this._productTypeChanged.bind(this)

        var productTypesRaw = this._productTypesDataService.read()
        var productTypes = Object.keys(productTypesRaw).map(k => productTypesRaw[k])

        this.state = {
            productType: productTypes[0],
            percentOfDailyValueAdditionalSymbol: null,
            servingSizeInfo: {
                value: 0,
                type: null,
                additionalComments: null,
                servingsPerContainer: 10
            },
            otherIngredients: [],
            allergens: [],
            businessInfo: {
                distributedByLabel: null,
                businessName: null,
                streetAddressLine1: null,
                streetAddressLine2: null,
                city: null,
                state: null,
                zipCode: null,
                phone: null
            },
            dailyValueIngredients: [],
            nonDailyValueIngredients: []
        }

        //TODO: delete these once the data input is ready
        this._displayLabel1 = this._displayLabel1.bind(this)
        this._displayLabel2 = this._displayLabel2.bind(this)
    }

    _handleChange(change){
        this.setState(change, () => {
            this.props.onChange(this.state)
        })
    }

    _displayLabel1(){
        this._handleChange({
            productType: this.state.productType,
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
        })
    }

    _displayLabel2(){
        this._handleChange({
            productType: this.state.productType,
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
        })
    }

    _productTypeChanged(newValue){
        this._handleChange({
            productType: newValue.value
        })
    }

    render (){
        var productTypesRaw = this._productTypesDataService.read()
        var productTypes = Object.keys(productTypesRaw).map(k => productTypesRaw[k])
        var productTypesSelect = productTypes.map(v => {
            return {
                value: v,
                label: v
            }
        })

        return (
            <div>
                <button type="button" className="btn btn-primary" onClick={this._displayLabel1}>Label 1</button>
                <button type="button" className="btn btn-success" onClick={this._displayLabel2}>Label 2</button>

                <Select 
                    options={productTypesSelect}
                    clearable={false}
                    value={this.state.productType}
                    onChange={this._productTypeChanged} />

                <hr />

            </div>
        )
    }
}