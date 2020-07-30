import React from 'react';
import ApiContext from '../ApiContext';
import config from '../config';
import ValidationError from '../ValidationError/ValidationError'

export default class AddFolder extends React.Component { 
    static defaultProps = {
        history: {
            goBack: () => { }
        },
        match: {
            params: {}
        }
    }
    static contextType = ApiContext;
    handleSubmit = (e) => {
        e.preventDefault();
        const { name } = e.target;
        const newFolder = {
            name: name.value
        };
        fetch(`${config.API_ENDPOINT}/folders`, {
            method: "POST",
            body: JSON.stringify(newFolder),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(error => {
                        throw error
                    });
                }
                return res.json()
            })
            .then(data => {
                this.context.addFolder(data);
                this.props.history.push('/');
            })
            .catch(err => {
                console.log(err);
            })
        //this.context.addFolder({id: "folder", name: "Name"});
    }

    state = {
        name:{value:"",
        touched:false,
        }
    }
    handleCancel = (e) => {
        e.preventDefault();
        this.props.history.push("/");
    }
    updateName(name) {
        this.setState({
            name: { value: name, touched: true }
        })
    }
    validateName() {
        const name = this.state.name
        if (name.value.length === 0) {
            return "Name is required";
        }
    }


    render() {
        const nameError = this.validateName();
        return (
            <form className="add-folder" onSubmit={e => this.handleSubmit(e)}>
                <label htmlFor="name">Folder Name</label>
                <input type="text" name="name" id="name" onChange={e => this.updateName(e.target.value)} />
                {this.state.name.touched && <ValidationError message={nameError} />}
                <button 
                    type="submit"
                    disabled={
                        this.validateName()
                    }
                    >Submit Folder</button>
                <button type="button" onClick={e => this.handleCancel(e)}>Cancel</button>
            </form>
        );
    }
}