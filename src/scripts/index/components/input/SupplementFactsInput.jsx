import React from 'react'
import Select from 'react-select'
import PresetsDataService from '../../lib/PresetsDataService.jsx'
import DailyValueIngredientsDataService from '../../lib/DailyValueIngredientsDataService.jsx'
import OtherIngredientsInput from './OtherIngredientsInput.jsx'
import NonDailyValueIngredientsInput from './NonDailyValueIngredientsInput.jsx'
import DailyValueIngredientsInput from './DailyValueIngredientsInput.jsx'
import BusinessInfoInput from './BusinessInfoInput.jsx'
import SupplementFactsPresets from './SupplementFactsPresets.jsx'
const ReactTags = require('react-tag-input').WithContext

export default class SupplementFactsInput extends React.Component {
    constructor(props){
        super(props)

        //**** dependencies ****
        this._presetsDataService = props["PresetsDataService"] || new PresetsDataService()
        this._dailyValueIngredientsDataService = props["DailyValueIngredientsDataService"] || new DailyValueIngredientsDataService()

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
        this._handleChange = this._handleChange.bind(this)
        this._handleTextChanged = this._handleTextChanged.bind(this)
        this._handleSelectChanged = this._handleSelectChanged.bind(this)

        this._handleTagDelete = this._handleTagDelete.bind(this)
        this._handleTagAddition = this._handleTagAddition.bind(this)
        this._handleIngredientsChange = this._handleIngredientsChange.bind(this)
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

            that._handleChange(stateChange)
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

    _handleIngredientsChange(propertyName){
        var that = this

        return (updatedValue) => {
            var stateChange = {}
            stateChange[propertyName] = updatedValue

            that._handleChange(stateChange)
        }
    }

    _listToSelectOptions(list){
        return list.map(v => {
            return { value: v, label: v }
        })
    }

    render (){
        var businessInfo = {
            businessInfoDistributedByLabel: this.state.businessInfoDistributedByLabel,
            businessInfoBusinessName: this.state.businessInfoBusinessName,
            businessInfoStreetAddressLine1: this.state.businessInfoStreetAddressLine1,
            businessInfoStreetAddressLine2: this.state.businessInfoStreetAddressLine2,
            businessInfoCity: this.state.businessInfoCity,
            businessInfoState: this.state.businessInfoState,
            businessInfoZipCode: this.state.businessInfoZipCode,
            businessInfoPhone: this.state.businessInfoPhone
        }

        return (
            <div>
                <SupplementFactsPresets onChange={this._handleChange}/>

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

                    <div className="input-group">
                        <span className="input-group-addon">Serving Size</span>
                        <input 
                            name="servingSizeInfoValue"
                            className="form-control"
                            placeholder="Value"
                            type="number"
                            min="0"
                            step="1"
                            value={this.state.servingSizeInfoValue}
                            onChange={this._handleTextChanged("servingSizeInfoValue")} 
                            />
                    </div>

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

                    <div className="input-group">
                        <span className="input-group-addon">Servings per Container</span>
                        <input 
                            name="servingSizeInfoServingsPerContainer"
                            className="form-control"
                            placeholder="Servings per container"
                            type="number"
                            min="0"
                            step="1"
                            value={this.state.servingSizeInfoServingsPerContainer}
                            onChange={this._handleTextChanged("servingSizeInfoServingsPerContainer")} 
                            />
                    </div>
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
                    <h3 className="panel-title">Daily Value Ingredients</h3>
                  </div>
                  <div className="panel-body">

                    <DailyValueIngredientsInput 
                        name="dailyValueIngredients"
                        DailyValueIngredientsDataService={this._dailyValueIngredientsDataService}
                        value={this.state.dailyValueIngredients}
                        onChange={this._handleIngredientsChange("dailyValueIngredients")}
                        />

                  </div>
                </div>

                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h3 className="panel-title">Non Daily Value Ingredients</h3>
                  </div>
                  <div className="panel-body">

                    <NonDailyValueIngredientsInput 
                        name="nonDailyValueIngredients"
                        value={this.state.nonDailyValueIngredients}
                        onChange={this._handleIngredientsChange("nonDailyValueIngredients")}
                        />

                  </div>
                </div>

                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h3 className="panel-title">Other Ingredients</h3>
                  </div>
                  <div className="panel-body">

                    <OtherIngredientsInput 
                        name="otherIngredients"
                        value={this.state.otherIngredients}
                        onChange={this._handleIngredientsChange("otherIngredients")}
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

                <BusinessInfoInput value={businessInfo} onChange={this._handleChange}/>
            </div>
        )
    }
}