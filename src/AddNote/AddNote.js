import React, {Component} from 'react';
import ApiContext from '../ApiContext'
import config from '../config'

export default class AddNote extends Component{
    static defaultProps ={   
        addNote: () => {},
    }

    state = {
        name: "",
        content: "",
    }

    static contextType = ApiContext
    
    handleSubmit = e => {
        e.preventDefault()
        const noteId = this.props.id
        console.log(this.context.notes)
    const  {name, content} = this.state
    const note = {name, content}
    fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
        method: 'POST',
        body:JSON.stringify(note)
        // headers: {
        //   'content-type': 'application/json'
        // },
      })
      .then(res => {
        if (!res.ok)
            return res.json().then(e => Promise.reject(e))
            return res.json()
        })
        .then(() => {
        this.context.addNote(noteId)
        // allow parent to perform extra behaviour
        // this.props.onDeleteNote(noteId)
        })
        .catch(error => {
        console.error({ error })
        })
    }
    
    render(){
        return(
            <div className="note-form">
                <form className="newNote" onSubmit={ e => this.handleSubmit(e) }>
                    <label htmlFor="note-name">Note Name</label>
                    <input 
                        type="text"
                        className="note-name"
                        id="id"
                        />
                    <input
                        type="text"
                        className="note-content"
                        />   
                <button type="submit" value="submit">Submit</button>
                </form>
            </div>
        )
    }
}