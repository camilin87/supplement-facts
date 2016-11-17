import React from 'react'

export default class NonDailyValueIngredientsInput extends React.Component {
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
                                <a href="#">x</a>
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
                        placeholder="Ingredient"/>
                    <span className="input-group-addon"></span>
                    <input 
                        name="nondvIngredientSource"
                        type="text"
                        className="form-control"
                        placeholder="Source"/>
                </div>

                <div className="input-group">
                    <input 
                        name="nondvIngredientQuantity"
                        type="text"
                        className="form-control"
                        placeholder="Quantity"/>
                    <span className="input-group-addon"></span>
                    <input 
                        name="nondvIngredientUnit"
                        type="text"
                        className="form-control"
                        placeholder="Unit"/>
                    <span className="input-group-addon"></span>
                    <span className="input-group-btn">
                        <button
                            className="btn btn-primary"
                            type="button">
                            Add
                        </button>
                    </span>
                </div>
            </div>
        )
    }
}