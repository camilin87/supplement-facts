import React from 'react'
import Select from 'react-select'
import DeleteIngredientControl from './DeleteIngredientControl.jsx'
import SingleDailyValueIngredientDetails from './SingleDailyValueIngredientDetails.jsx'
import DailyValueIngredientsDataService from '../../lib/DailyValueIngredientsDataService.jsx'

export default class DailyValueIngredientsInput extends React.Component {
    constructor(props){
        super(props)

        //**** dependencies ****
        this._dailyValueIngredientsDataService = props["DailyValueIngredientsDataService"] || new DailyValueIngredientsDataService()

        //**** initial state ****
        this.state = this._getDefaultState()

        //**** event handlers *****
        this._handleTextChanged = this._handleTextChanged.bind(this)
        this._handleIngredientNameSelectChanged = this._handleIngredientNameSelectChanged.bind(this)
        this._handleDeleteLinkClick = this._handleDeleteLinkClick.bind(this)
        this._handleAddButtonClick = this._handleAddButtonClick.bind(this)
    }

    _getDefaultState(){
        return {
            dvIngredientName: "",
            dvIngredientSource: "",
            dvIngredientQuantity: "",
            dvIngredientUnit: "mg"
        }
    }

    _handleTextChanged(propertyName){
        var that = this

        return (event) => {
            var stateChange = {}
            stateChange[propertyName] = event.target.value
            that.setState(stateChange)
        }
    }

    _handleIngredientNameSelectChanged(event){
        this.setState({
            dvIngredientName: event.value,
            dvIngredientUnit: this._getIngredientUnit(event.value)
        })
    }

    _broadcastChange(componentStatus){
        if (this.props.onChange){
            this.props.onChange(componentStatus)
        }
    }

    _ingredientsToSelectOptions(ingredients){
        return (ingredients || []).map(i => {
            return {value: i.name, label: i.name}
        })
    }

    _handleAddButtonClick(){
        if (!this.state.dvIngredientName ||
            !this.state.dvIngredientQuantity){
            return
        }


        var newIngredient = {
            name: this.state.dvIngredientName,
            source: this.state.dvIngredientSource,
            quantity: parseInt(this.state.dvIngredientQuantity || "0")
        }
        var updatedIngredients = (this.props.value || []).concat(newIngredient)

        this.setState(this._getDefaultState())
        this._broadcastChange(updatedIngredients)
    }

    _handleDeleteLinkClick(item){
        return (event) => {
            var clonedList = (this.props.value || []).slice(0)

            var indexToDelete = clonedList.findIndex(i => i.name === item.name)

            clonedList.splice(indexToDelete, 1)

            this._broadcastChange(clonedList)
        }
    }

    _getIngredientUnit(ingredientName){
        var allIngredientPresets = this._dailyValueIngredientsDataService.all()
        var result = allIngredientPresets.find(p => p.name === ingredientName).unit
        return result
    }

    render (){
        return (
            <div>
                <ul className="list-group">
                    { 
                        (this.props.value || []).map((i, idx) => <li className="list-group-item" key={idx}>
                              <SingleDailyValueIngredientDetails
                                DailyValueIngredientsDataService={this._dailyValueIngredientsDataService}
                                ingredient={i} />
                              <DeleteIngredientControl onClick={this._handleDeleteLinkClick(i)} />
                            </li>
                        ) 
                    }
                </ul>

                    <Select 
                        name="dvIngredientName"
                        clearable={false}
                        options={this._ingredientsToSelectOptions(this._dailyValueIngredientsDataService.all())}
                        value={this.state.dvIngredientName}
                        onChange={this._handleIngredientNameSelectChanged} />

                    <input 
                        name="dvIngredientSource"
                        type="text"
                        className="form-control"
                        placeholder="Source"
                        value={this.state.dvIngredientSource}
                        onChange={this._handleTextChanged("dvIngredientSource")} />

                <div className="input-group">
                    <input 
                        name="dvIngredientQuantity"
                        type="number"
                        min="0"
                        className="form-control"
                        placeholder="Quantity"
                        value={this.state.dvIngredientQuantity}
                        onChange={this._handleTextChanged("dvIngredientQuantity")} />

                    <span className="input-group-addon" id="dvIngredientUnit">
                        {this.state.dvIngredientUnit}
                    </span>

                    <span className="input-group-btn">
                        <button
                            className="btn btn-primary"
                            type="button"
                            onClick={this._handleAddButtonClick}>
                            Add
                        </button>
                    </span>
                </div>
            </div>
        )
    }
}