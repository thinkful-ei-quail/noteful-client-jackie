import React, { Component } from 'react';
import ApiContext from '../ApiContext'
import config from '../config'
import ValidationError from "../ValidationError/ValidationError"
import './AddNote.css'

export default class AddNote extends Component {
    static contextType = ApiContext;
    state = {
        name: {
            value: "",
            touched: false
        },
        content: {
            value: "",
            touched: false
        },
        folder: {
            value: "",
            touched: false
        },
        id: "",
    }
    updateName(name) {
        this.setState({
            name: { value: name, touched: true }
        })
    }
    updateContent(content) {
        this.setState({
            content: { value: content, touched: true }
        })
    }
    updateFolder = (id) => {
        this.setState({
            folder: { value: id, touched: true }
        });
    };
    validateName() {
        const name = this.state.name
        if (name.value.length === 0) {
            return "Name is required";
        }
    }
    validateContent() {
        const content = this.state.content
        if (content.value.length === 0) {
            return "Content is required";
        }
    }
    validateFolder() {
        const folder = this.state.folder
        console.log(folder)
        if (folder.value === "") {
            return "Selection is required";
        }
    }
    getFolders() {
        return this.context.folders.map((folder) => {
            return (
                <option key={folder.id} value={folder.id}>
                    {folder.name}
                </option>
            );
        });
    };
    handleSubmit = e => {
        e.preventDefault()
        console.log(this.context.notes)
        const { name, content, folder } = this.state
        const note = {
            name: name.value,
            content: content.value,
            folderId: folder.value,
            modified: new Date().toLocaleString()
        }
        console.log(e)
        fetch(`${config.API_ENDPOINT}/notes/`, {
            method: 'POST',
            body: JSON.stringify(note),
            headers: {
                'content-type': 'application/json'
            },
        })
            .then(res => {
                if (!res.ok)
                    return res.json()
                        .then(e => Promise.reject(e))
                return res.json()
            })
            .then((data) => {
                this.context.addNote(data)
                this.props.history.push("/")
            })
            .catch(error => {
                console.error({ error })
            })
    }
    handleCancel = (e) => {
        e.preventDefault();
        this.props.history.push("/");
    }
    render() {
        const nameError = this.validateName();
        const contentError = this.validateContent();
        const selectError = this.validateFolder();
        return (
            <div className="note-form">
                <h2>Add New Note</h2>
                <form className="newNote" onSubmit={e => this.handleSubmit(e)}>
                    <label htmlFor="note-name">Note Name</label>
                    <input
                        type="text"
                        className="note-name"
                        id="name"
                        name="name"
                        onChange={e => this.updateName(e.target.value)}
                    />
                    {this.state.name.touched && <ValidationError message={nameError} />}
                    <label htmlFor="note-content">Note Content</label>
                    <input
                        type="text"
                        className="note-content"
                        name="content"
                        onChange={e => this.updateContent(e.target.value)}
                    />
                    {this.state.name.touched && <ValidationError message={contentError} />}
                    <select name="select" onChange={(e) => this.updateFolder(e.target.value)}>
                        <option value="" name="select">Choose</option>
                        {this.getFolders()}
                    </select>
                    {this.state.name.touched && <ValidationError message={selectError} />}
                    <button
                        type="submit"
                        value="submit"
                        disabled={
                            this.validateName() ||
                            this.validateContent() ||
                            this.validateFolder()
                        }
                    >Submit</button><button type="button" onClick={e => this.handleCancel(e)}>Cancel</button>
                </form>
            </div>
        )
    }
}