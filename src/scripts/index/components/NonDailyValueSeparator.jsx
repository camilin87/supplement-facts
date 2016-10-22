import React from 'react'

export default class NonDailyValueSeparator extends React.Component {
    render (){
        if ((this.props.ingredients || []).length === 0){
            return (null)
        }

        return (
            <tr>
                <td colSpan="3">
                    <hr />
                </td>
            </tr>
        )
    }
}