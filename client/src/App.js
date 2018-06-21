import React, { Component } from 'react';
import ClipboardJS from 'clipboard';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      version: '',
      proxy: '',
      description: '',
      packageJson: {},
    };

    new ClipboardJS('.copyBtn');
    
    this.handlePropertyChange = this.handlePropertyChange.bind(this);
  }

  handlePropertyChange(property) {
    return (e) => {
      const packageJson = this.state.packageJson;
      if (packageJson[property] && e.target.value === '') {
        delete packageJson[property];
      } else {
        packageJson[property] = e.target.value.trim();
      }
      const state = {
        packageJson,
      };
      state[property] = e.target.value;
      this.setState(state);
    };
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <h1>package.json builder</h1>
              <hr />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label for="name">Name:</label>
                <input className="form-control" placeholder="package name..." value={this.state.name} onChange={this.handlePropertyChange('name')} />
              </div>
              <div className="form-group">
                <label for="name">Version:</label>
                <input className="form-control" placeholder="1.0.0" value={this.state.version} onChange={this.handlePropertyChange('version')} />
              </div>
              <div className="form-group">
                <label for="name">Proxy:</label>
                <input className="form-control" placeholder="http://localhost:8080" value={this.state.proxy} onChange={this.handlePropertyChange('proxy')} />
              </div>
              <div className="form-group">
                <label for="name">Description:</label>
                <input className="form-control" placeholder="description..." value={this.state.description} onChange={this.handlePropertyChange('description')} />
              </div>
            </div>
            <div className="col-md-6">
              <textarea id="packageJson" rows="25" readOnly className="form-control" value={JSON.stringify(this.state.packageJson, null, 2)}/>
              <input type="button" className="copyBtn btn btn-link" value="copy" data-clipboard-target="#packageJson" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
