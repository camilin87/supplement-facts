import React from 'react'
import Select from 'react-select'
import PresetsDataService from '../lib/PresetsDataService.jsx'
const ReactTags = require('react-tag-input').WithContext

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

            businessInfoDistributedByLabel: "Distributed by",
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
        this._handleTextChanged = this._handleTextChanged.bind(this)
        this._handleSelectChanged = this._handleSelectChanged.bind(this)

        this._handleTagDelete = this._handleTagDelete.bind(this)
        this._handleTagAddition = this._handleTagAddition.bind(this)

        //TODO: delete these once the data input is ready
        this._displayLabel1 = this._displayLabel1.bind(this)
        this._displayLabel2 = this._displayLabel2.bind(this)
    }

    _readProductTypes(){
        var productTypesRaw = this._presetsDataService.readProductTypes()
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

    _handleTextChanged(propertyName){
        var that = this

        return (event) => {
            var stateChange = {}
            stateChange[propertyName] = event.target.value

            that._handleChange(stateChange)
        }
    }

    _handleSelectChanged(propertyName){
        var that = this

        return (event) => {
            var stateChange = {}
            stateChange[propertyName] = event.value

            this._handleChange(stateChange)
        }
    }

    _handleTagDelete(i) {
        let tags = this.state.allergens
        tags.splice(i, 1)
        this._handleChange({allergens: tags})
    }

    _handleTagAddition(tag) {
        let tags = this.state.allergens
        tags.push({
            id: tags.length + 1,
            text: tag
        })
        this._handleChange({allergens: tags})
    }

    _listToSelectOptions(list){
        return list.map(v => {
            return { value: v, label: v }
        })
    }

    render (){
        return (
            <div>
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h3 className="panel-title">Presets</h3>
                  </div>
                  <div className="panel-body">
                    <button type="button" className="btn btn-primary" onClick={this._displayLabel1}>Label 1</button>
                    <button type="button" className="btn btn-success" onClick={this._displayLabel2}>Label 2</button>
                  </div>
                </div>


                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h3 className="panel-title">Product Type</h3>
                  </div>
                  <div className="panel-body">
                    <Select 
                        name="productType"
                        clearable={false}
                        options={this._listToSelectOptions(this._readProductTypes())}
                        value={this.state.productType}
                        onChange={this._handleSelectChanged("productType")} />
                  </div>
                </div>

                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h3 className="panel-title">Daily Value</h3>
                  </div>
                  <div className="panel-body">
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


                    <Select 
                        name="servingSizeInfoType"
                        clearable={false}
                        options={this._listToSelectOptions(this._presetsDataService.readServingSizeInfoTypes())}
                        value={this.state.servingSizeInfoType}
                        onChange={this._handleSelectChanged("servingSizeInfoType")}
                        />

                    <input 
                        name="servingSizeInfoAdditionalComments"
                        className="form-control"
                        placeholder="Additional comments"
                        type="text"
                        value={this.state.servingSizeInfoAdditionalComments}
                        onChange={this._handleTextChanged("servingSizeInfoAdditionalComments")} 
                        />

                    <input 
                        name="servingSizeInfoServingsPerContainer"
                        className="form-control"
                        placeholder="Servings per container"
                        type="text"
                        value={this.state.servingSizeInfoServingsPerContainer}
                        onChange={this._handleTextChanged("servingSizeInfoServingsPerContainer")} 
                        />
                  </div>
                </div>

                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h3 className="panel-title">Allergens</h3>
                  </div>
                  <div className="panel-body">

                    <ReactTags 
                        name="allergens"
                        placeholder="Allergens"
                        suggestions={this._presetsDataService.readAllergens()}
                        tags={this.state.allergens}
                        handleDelete={this._handleTagDelete}
                        handleAddition={this._handleTagAddition}
                        />

                  </div>
                </div>

                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h3 className="panel-title">Business Info</h3>
                  </div>
                  <div className="panel-body">

                    <div className="input-group">
                        <input 
                            name="businessInfoDistributedByLabel"
                            className="form-control"
                            placeholder="Distributed by Heading"
                            type="text"
                            value={this.state.businessInfoDistributedByLabel}
                            onChange={this._handleTextChanged("businessInfoDistributedByLabel")} />

                        <span className="input-group-addon"></span>

                        <input 
                            name="businessInfoBusinessName"
                            className="form-control"
                            placeholder="Business Name"
                            type="text"
                            value={this.state.businessInfoBusinessName}
                            onChange={this._handleTextChanged("businessInfoBusinessName")} />
                    </div>

                    <input 
                        name="businessInfoStreetAddressLine1"
                        className="form-control"
                        placeholder="Address"
                        type="text"
                        value={this.state.businessInfoStreetAddressLine1}
                        onChange={this._handleTextChanged("businessInfoStreetAddressLine1")} />

                    <input 
                        name="businessInfoStreetAddressLine2"
                        className="form-control"
                        placeholder=""
                        type="text"
                        value={this.state.businessInfoStreetAddressLine2}
                        onChange={this._handleTextChanged("businessInfoStreetAddressLine2")} />

                    <div className="input-group">
                        <input 
                            name="businessInfoCity"
                            className="form-control"
                            placeholder="City"
                            type="text"
                            value={this.state.businessInfoCity}
                            onChange={this._handleTextChanged("businessInfoCity")} />

                        <span className="input-group-addon"></span>

                        <input 
                            name="businessInfoState"
                            className="form-control"
                            placeholder="State"
                            type="text"
                            value={this.state.businessInfoState}
                            onChange={this._handleTextChanged("businessInfoState")} />

                        <span className="input-group-addon"></span>

                        <input 
                            name="businessInfoZipCode"
                            className="form-control"
                            placeholder="Zip"
                            type="text"
                            value={this.state.businessInfoZipCode}
                            onChange={this._handleTextChanged("businessInfoZipCode")} />
                    </div>

                    <input 
                        name="businessInfoPhone"
                        className="form-control"
                        placeholder="Phone"
                        type="text"
                        value={this.state.businessInfoPhone}
                        onChange={this._handleTextChanged("businessInfoPhone")} />

                  </div>
                </div>
            </div>
        )
    }
}