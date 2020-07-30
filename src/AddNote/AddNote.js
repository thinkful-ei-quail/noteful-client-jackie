import React, {Component} from 'react';

export default class AddNote extends Component{
    render(){
        return(
            <div class="note-form">
                <form className="newNote">
                    <label htmlFor="noteName">Folder Name</label>
                    <input 
                        type="text"
                        className="noteName"
                        id="id"
                        />
                    <input
                        type="text"
                        className="noteContent"
                        />   
                </form>
                <button type="submit" value="submit">Submit</button>
            </div>
        )
    }
}