import React, { Component } from 'react';
import ClipboardJS from 'clipboard';
import NamedInput from './components/NamedInput';
import ShortId from 'shortid';
import './App.css';

const ENTER = 13;

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
      main: '',
      packageJson: {},
      package: '',
      view: 0,
      searchResults: [],
      searchLoading: false,
    };

    new ClipboardJS('.copyBtn');
    
    this.handlePropertyChange = this.handlePropertyChange.bind(this);
    this.setView = this.setView.bind(this);
    this.handlePackageInput = this.handlePackageInput.bind(this);
    this.searchNpm = this.searchNpm.bind(this);
    this.enterSubmit = this.enterSubmit.bind(this);
  }

  enterSubmit(cb) {
    return (e) => {
      const keyCode = e.which || e.keyCode; 
      if (keyCode === ENTER) {
        cb();
      }
    }
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

  handlePackageInput(e) {
    this.setState({
      package: e.target.value,
    });
  }

  searchNpm() {
    if (this.state.package.trim() !== '') {
      this.setState({
        searchLoading: true,
      });
      fetch(`/npm/search/${this.state.package}`).then(response => response.json())
        .then(responseJson => {
          this.setState({
            searchResults: responseJson,
            package: '',
            searchLoading: false,
          });
        });
    }
  }

  setView(view) {
    return () => {
      this.setState({
        view,
      });
    }
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <div className="alert alert-warning" role="alert">This tool is still under development and some features may not work. Sorry for the inconvenience!</div>
              <h1>package.json builder</h1>
              <hr />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <ul className="nav nav-tabs" style={{marginBottom: '20px'}}>
                <li role="presentation" className={this.state.view === 0 ? "active" : ""}><a onClick={this.setView(0)}>Fields</a></li>
                <li role="presentation" className={this.state.view === 1 ? "active" : ""}><a onClick={this.setView(1)}>Dependencies</a></li>
                <li role="presentation" className={this.state.view === 2 ? "active" : ""}><a onClick={this.setView(2)}>Dev Dependencies</a></li>
              </ul>
              <div style={{display: this.state.view === 0 ? 'block' : 'none'}}>
                <NamedInput label="Name" placeholder="package name..." value={this.state.name} handleChange={this.handlePropertyChange} />
                <NamedInput label="Version" placeholder="1.0.0" value={this.state.version} handleChange={this.handlePropertyChange} />
                <NamedInput label="Proxy" placeholder="http://localhost:8080" value={this.state.proxy} handleChange={this.handlePropertyChange} />
                <NamedInput label="Description" placeholder="description..." value={this.state.description} handleChange={this.handlePropertyChange} />
                <NamedInput label="Homepage" placeholder="https://github.com/owner/project#readme" value={this.state.homepage} handleChange={this.handlePropertyChange} />
                <NamedInput label="License" placeholder="MIT" value={this.state.license} handleChange={this.handlePropertyChange} />
                <NamedInput label="Author" placeholder="your name..." value={this.state.author} handleChange={this.handlePropertyChange} />
                <NamedInput label="Main" placeholder="index.js" value={this.state.main} handleChange={this.handlePropertyChange} />
              </div>
              <div style={{display: this.state.view === 1 ? 'block' : 'none'}}>
                <div className="form-group">
                  <label>Package name:</label>
                  <input className="form-control" type="input" placeholder="react..." value={this.state.package} onInput={this.handlePackageInput} onKeyDown={this.enterSubmit(this.searchNpm)} />
                </div>
                <input className="btn btn-primary" style={{marginBottom: '20px',}} type="submit" value="Search" onClick={this.searchNpm} />
                {this.state.searchLoading ? <h4>Loading...</h4> : <h4>Results</h4>}
                <table className="table">
                  <thead>
                    <tr>
                      <th>Package</th>
                      <th>Version</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.searchResults.map((result) =>
                      <tr key={ShortId.generate()}>
                        <td>{result.name}</td>
                        <td>{result.version}</td>
                        <td><input type="button" className="btn btn-small btn-default" value="Add" /></td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-md-6">
              <textarea id="packageJson" rows="25" readOnly className="form-control" value={JSON.stringify(this.state.packageJson, null, 2)}/>
              <ul className="nav nav-pills">
                <li role="presentation">
                  <a type="button" className="copyBtn btn btn-link" data-clipboard-target="#packageJson">copy to clipboard</a>
                </li>
                <li role="presentation">
                  <a className="btn btn-link" download="package.json" href={'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.state.packageJson, null, 2))}>download package.json</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
