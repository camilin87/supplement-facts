import React from 'react'

export default class OtherIngredientsInput extends React.Component {
    constructor(props) {
        super(props)

        //**** initial state ****
        this.state = this._getDefaultState()

        //**** event handlers *****
        this._handleTextChanged = this._handleTextChanged.bind(this)
        this._handleButtonClick = this._handleButtonClick.bind(this)
    }

    _getDefaultState(){
        return {
            otherIngredientName: "",
            otherIngredientQuantity: ""
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

    _handleButtonClick(){
        var newIngredient = {
            name: this.state.otherIngredientName,
            quantity: parseInt(this.state.otherIngredientQuantity || "0")
        }
        var updatedIngredients = (this.props.value || []).concat(newIngredient)

        this.setState(this._getDefaultState())

        if (this.props.onChange){
            this.props.onChange(updatedIngredients)
        }
    }

    render (){
        var ingredients = this.props.value || []

        return (
            <div>
                <ul className="list-group">
                    { 
                        ingredients.map(i => <li className="list-group-item" key={i.name}>
                              <span>
                                {i.name} <span className="badge">{i.quantity} mg</span>
                              </span>

                              <span className="pull-right">
                                <a href="#">x</a>
                              </span>
                            </li>
                        ) 
                    }
                </ul>

                <div className="input-group">
                  <input 
                    name="otherIngredientName"
                    type="text"
                    className="form-control"
                    placeholder="Ingredient"
                    value={this.state.otherIngredientName}
                    onChange={this._handleTextChanged("otherIngredientName")} />

                  <span className="input-group-addon"></span>

                  <input
                    name="otherIngredientQuantity"
                    type="text"
                    className="form-control"
                    placeholder="Quantity"
                    value={this.state.otherIngredientQuantity}
                    onChange={this._handleTextChanged("otherIngredientQuantity")}/>

                  <span className="input-group-addon">mg</span>
                  <span className="input-group-btn">
                    <button
                        className="btn btn-primary"
                        type="button"
                        onClick={this._handleButtonClick}>
                        Add
                    </button>
                  </span>
                </div>
            </div>
        )
    }
}