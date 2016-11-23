import React from 'react'

export default class BusinessInfoInput extends React.Component {
    constructor(props){
        super(props)

        var value = this.props.value || {}

        this.state = {
            businessInfoDistributedByLabel: value.businessInfoDistributedByLabel || "Distributed by",
            businessInfoBusinessName: value.businessInfoBusinessName || "",
            businessInfoStreetAddressLine1: value.businessInfoStreetAddressLine1 || "",
            businessInfoStreetAddressLine2: value.businessInfoStreetAddressLine2 || "",
            businessInfoCity: value.businessInfoCity || "",
            businessInfoState: value.businessInfoState || "",
            businessInfoZipCode: value.businessInfoZipCode || "",
            businessInfoPhone: value.businessInfoPhone || ""
        }

        this._handleTextChanged = this._handleTextChanged.bind(this)
    }

    _handleTextChanged(propertyName){
        var that = this

        return (event) => {
            var stateChange = {
                businessInfoDistributedByLabel: this.state.businessInfoDistributedByLabel,
                businessInfoBusinessName: this.state.businessInfoBusinessName,
                businessInfoStreetAddressLine1: this.state.businessInfoStreetAddressLine1,
                businessInfoStreetAddressLine2: this.state.businessInfoStreetAddressLine2,
                businessInfoCity: this.state.businessInfoCity,
                businessInfoState: this.state.businessInfoState,
                businessInfoZipCode: this.state.businessInfoZipCode,
                businessInfoPhone: this.state.businessInfoPhone
            }
            stateChange[propertyName] = event.target.value

            if (that.props.onChange){
                that.props.onChange(stateChange)
            }
        }
    }

    render (){
        return (
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
        )
    }
}