import React, {Component} from 'react';

export default class AddFolder extends Component{
    render(){
        return(
            <div class="folder-form">
                <form className="newFolder">
                    <label htmlFor="folderName">Folder Name</label>
                    <input 
                        type="text"
                        className="folderName"
                        id="id"
                        />     
                </form>
                <button type="submit" value="submit">Submit</button>
            </div>
        )
    }
}