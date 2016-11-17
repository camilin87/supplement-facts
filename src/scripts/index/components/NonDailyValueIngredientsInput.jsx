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

                <input 
                    name="nondvIngredientName"
                    type="text"
                    className="form-control"
                    placeholder="Ingredient"/>

                <input 
                    name="nondvIngredientSource"
                    type="text"
                    className="form-control"
                    placeholder="Source"/>

                <input 
                    name="nondvIngredientQuantity"
                    type="text"
                    className="form-control"
                    placeholder="Quantity"/>

                <input 
                    name="nondvIngredientUnit"
                    type="text"
                    className="form-control"
                    placeholder="Unit"/>

                <button
                        className="btn btn-primary"
                        type="button">
                        Add
                    </button>
            </div>
        )
    }
}