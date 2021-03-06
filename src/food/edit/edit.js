import React from 'react'

export default class Edit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {}
        }
    }

    handleFormSubmit = (e) => {
        // console.log(this.state.data)
        e.preventDefault()
        this.props.edit(this.state.data)
    }

    handleFormChange = (e) => {
        this.setState({ 
            data: { ...this.state.data, [e.target.name]: e.target.value } 
        })
    }

    componentDidUpdate(){
        if(this.state.data._id !== this.props.data._id){
            // console.log("something food here")
            this.setState({
                data: this.props.data
            })
        }
    }

    render() {
        // console.log("working edit log")
        // console.log(this.props.data)
        return (
            <div className="edit">
                <h2>Edit Dish</h2>
                <h4>You are editing: {this.props.data.Name}?</h4>
                <form onSubmit={this.handleFormSubmit}>
                    <label htmlFor="name">Edit Food Dish</label>
                    <input name="Name" type="text" placeholder="enter dish name" value={this.state.data.Name} required onChange={this.handleFormChange} />
                    <br />
                    <label htmlFor="url">Edit Ingredients</label>
                    <input name="Ingredients" type="text" placeholder="enter ingredients" value={this.state.data.Ingredients} required onChange={this.handleFormChange} />
                    <br />
                    <button type="submit">Submit Change</button>
                </form>
            </div>
        )
    }

}