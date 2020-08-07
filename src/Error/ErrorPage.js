import React, {Component} from 'react';

export default class ErrorPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
          hasError: false
        };
      }
    static getDerivedStateFromError(error) {
        return { hasError: true };
    }
    render(){
        if (this.state.hasError) {      
            return (
              <main className="error-page">
                  <h1>Something seems to have gone wrong</h1>
                  <p>Try refreshing the page</p>
              </main>
            );
        }
    return this.props.children;       
    }
}