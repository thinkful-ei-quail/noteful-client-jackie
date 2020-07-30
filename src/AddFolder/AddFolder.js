import React, {Component} from 'react';
import ApiContext from '../ApiContext'

export default class AddFolder extends Component{
    static contextType = ApiContext
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.context.folders)
    }
    
    render(){
        return(
            <div className="folder-form" >
                <form className="newFolder" onSubmit={ e => this.handleSubmit(e) }>
                    <label htmlFor="folderName">Folder Name</label>
                    <input 
                        type="text"
                        className="folderName"
                        id="id"
                        />     
                <button type="submit" value="submit">Submit</button>
                </form>
            </div>
        )
    }
}