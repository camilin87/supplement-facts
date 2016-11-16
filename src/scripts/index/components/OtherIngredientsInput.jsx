import React from 'react'

export default class OtherIngredientsInput extends React.Component {
    render (){
        var ingredients = this.props.value || []

        return (
            <div>
                <ul className="list-group">
                    { 
                        ingredients.map(i => <li className="list-group-item" key={i.name}>
                                {i.name} <span className="badge">{i.quantity} mg</span>
                            </li>
                        ) 
                    }
                </ul>
                <div className="input-group">
                  <input name="otherIngredientName" type="text" className="form-control" placeholder="Ingredient" />
                  <span className="input-group-addon"></span>
                  <input name="otherIngredientQuantity" type="text" className="form-control" placeholder="Quantity" />
                  <span className="input-group-addon">mg</span>
                  <span className="input-group-btn">
                    <button className="btn btn-default" type="button">Add</button>
                  </span>
                </div>
            </div>
        )
    }
}