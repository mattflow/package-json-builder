import React, { Component } from 'react';
import ClipboardJS from 'clipboard';
import NamedInput from './components/NamedInput';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      version: '',
      proxy: '',
      description: '',
      random: '',
      homepage:'',
      license: '',
      author: '',
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
              <NamedInput label="Name" placeholder="package name..." value={this.state.name} handleChange={this.handlePropertyChange} />
              <NamedInput label="Version" placeholder="1.0.0" value={this.state.version} handleChange={this.handlePropertyChange} />
              <NamedInput label="Proxy" placeholder="http://localhost:8080" value={this.state.proxy} handleChange={this.handlePropertyChange} />
              <NamedInput label="Description" placeholder="description..." value={this.state.description} handleChange={this.handlePropertyChange} />
              <NamedInput label="Homepage" placeholder="https://github.com/owner/project#readme" value={this.state.homepage} handleChange={this.handlePropertyChange} />
              <NamedInput label="License" placeholder="MIT" value={this.state.license} handleChange={this.handlePropertyChange} />
              <NamedInput label="Author" placeholder="your name..." value={this.state.author} handleChange={this.handlePropertyChange} />
            </div>
            <div className="col-md-6">
              <textarea id="packageJson" rows="25" readOnly className="form-control" value={JSON.stringify(this.state.packageJson, null, 2)}/>
              <input type="button" className="copyBtn btn btn-link" value="copy to clipboard" data-clipboard-target="#packageJson" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
