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


// import React, { Component } from 'react';
// import ApiContext from '../ApiContext'
// import config from '../config'
// import ValidationError from "../ValidationError/ValidationError"
// import './AddNote.css'

// export default class AddNote extends Component {
//     static contextType = ApiContext;

//     state = {
//         name:"",
//         content:"",
//         id:"",
//     }
//     updateName(name) {
//         this.setState({
//             name:name
//         })
//     }

//     updateContent(content) {
//         this.setState({
//             content:content
//         })
//     }

//     validateName() {
//         const name = this.state.name
//         if (name.length === 0) {
//             return "Name is required";
//         }
//     }
//     validateContent() {
//         const content = this.state.content
//         if (content.length === 0) {
//             return "Content is required";
//         }
//     }

//     handleSubmit = e => {
//         e.preventDefault()
//         console.log(this.context.notes)
//         const { name, content} = this.state
//         const note = { name, content}
//         console.log(note)
//         fetch(`${config.API_ENDPOINT}/notes/`, {
//             method: 'POST',
//             body: JSON.stringify(note),
//             headers: {
//                 'content-type': 'application/json'
//             },
//         })
//             .then(res => {
//                 if (!res.ok)
//                     return res.json().then(e => Promise.reject(e))
//                 return res.json()
//             })
//             .then((data) => {
//                 this.context.addNote(data)
//                 this.props.history.push("/")
//             })
//             .catch(error => {
//                 console.error({ error })
//             })
//     }

//     render() {
//         const nameError = this.validateName();
//         const contentError = this.validateContent();
//         return (
//             <div className="note-form">
//                 <h2>Add New Note</h2>
//                 <form className="newNote" onSubmit={e => this.handleSubmit(e)}>
//                     <label htmlFor="note-name">Note Name</label>
//                     <input
//                         type="text"
//                         className="note-name"
//                         id="name"
//                         name="name"
//                         onChange={e => this.updateName(e.target.value)}
//                     />
//                     {this.state.name.touched && <ValidationError message={nameError} />}
//                     <label htmlFor="note-content">Note Content</label>
//                     <input
//                         type="text"
//                         className="note-content"
//                         name="content"
//                         onChange={e => this.updateContent(e.target.value)}
//                     />
//                     {this.state.name.touched && <ValidationError message={contentError} />}
//                     <button type="submit" value="submit">Submit</button>
//                 </form>
//             </div>
//         )
//     }
// }