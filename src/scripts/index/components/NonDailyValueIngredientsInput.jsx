import React from 'react'

export default class NonDailyValueIngredientsInput extends React.Component {
    constructor(props){
        super(props)

        //**** initial state ****
        this.state = this._getDefaultState()

        //**** event handlers *****
        this._handleTextChanged = this._handleTextChanged.bind(this)
        this._handleAddButtonClick = this._handleAddButtonClick.bind(this)
        this._handleDeleteLinkClick = this._handleDeleteLinkClick.bind(this)
    }

    _getDefaultState(){
        return {
            nondvIngredientName: "",
            nondvIngredientSource: "",
            nondvIngredientQuantity: "",
            nondvIngredientUnit: "mg"
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

    _handleAddButtonClick(){
        var newIngredient = {
            name: this.state.nondvIngredientName,
            source: this.state.nondvIngredientSource,
            quantity: parseInt(this.state.nondvIngredientQuantity || "0"),
            unit: this.state.nondvIngredientUnit
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

    _broadcastChange(componentStatus){
        if (this.props.onChange){
            this.props.onChange(componentStatus)
        }
    }

    render (){
        var ingredients = this.props.value || []

        return (
            <div>
                <ul className="list-group">
                    { 
                        ingredients.map((i, idx) => <li className="list-group-item" key={idx}>
                              <span>
                                {i.name} {i.source} <span className="badge">{i.quantity} {i.unit}</span>
                              </span>

                              <span className="pull-right">
                                <a href="#" onClick={this._handleDeleteLinkClick(i)}>x</a>
                              </span>
                            </li>
                        ) 
                    }
                </ul>

                <div className="input-group">

                    <input 
                        name="nondvIngredientName"
                        type="text"
                        className="form-control"
                        placeholder="Ingredient"
                        value={this.state.nondvIngredientName}
                        onChange={this._handleTextChanged("nondvIngredientName")} />

                    <span className="input-group-addon"></span>

                    <input 
                        name="nondvIngredientSource"
                        type="text"
                        className="form-control"
                        placeholder="Source"
                        value={this.state.nondvIngredientSource}
                        onChange={this._handleTextChanged("nondvIngredientSource")}/>
                </div>

                <div className="input-group">

                    <input 
                        name="nondvIngredientQuantity"
                        type="number"
                        min="0"
                        className="form-control"
                        placeholder="Quantity"
                        value={this.state.nondvIngredientQuantity}
                        onChange={this._handleTextChanged("nondvIngredientQuantity")}/>

                    <span className="input-group-addon"></span>

                    <input 
                        name="nondvIngredientUnit"
                        type="text"
                        className="form-control"
                        placeholder="Unit"
                        value={this.state.nondvIngredientUnit}
                        onChange={this._handleTextChanged("nondvIngredientUnit")}/>

                    <span className="input-group-addon"></span>
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