import React, { Component } from "react";
import axios from 'axios';

import AudioContainer from "./AudioContainer";
import InputFileForm from "../components/InputFileForm";
import {Editor} from "../components/Codemirror";
import {Viewer} from "../components/Markdown";

class TestContainer extends Component {

  state= {
    input:`default data`,
    file:null
  }

  onChangeFile = e => {
    this.setState({
      file: e.target.files[0]
    });
  }
  
  onFileSubmit = () => {
    const formData = new FormData();
    formData.append("audiofile", this.state.file);
    const headers = {
	    headers: {
              Accept: "application/json",
              "Content-Type": "multipart/form-data"
	    }
    };
    axios.post(`http://localhost:8080/deepspeech`, formData, headers).then(result=> {
      this.handleAddResult("\n```\n"+result.data.ds+"\n```\n")
    })
  }

  handleAddResult = value => {
    this.setState(prevState => ({input: prevState.input + value}));
  }

  handleBeforeChange = (editor, data, value) => {
    this.setState({ input: value });
  };
  
  render() {
    const file = this.state.file;
    const input = this.state.input;
    return (
      <div>
        <InputFileForm onChangeFile={this.onChangeFile} />
        <input type="button" value="submit" onClick={this.onFileSubmit} />
        <AudioContainer file={file} />
        <Editor
          input={this.state.input}
          onBeforeChange={this.handleBeforeChange}
        />
        <Viewer input={this.state.input} />
      </div>
    );
  }
}

export default TestContainer;
