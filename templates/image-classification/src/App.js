import React, { Component } from 'react';
import './App.css';
import './icons.css';
import { MuiThemeProvider } from 'material-ui/styles';
import { createMuiTheme } from 'material-ui/styles';
import lightblue from 'material-ui/colors/blue';
import { LabelingScreen } from './labeling-screen/labeling-screen';

export const primary = '#5495e3';
export const theme = createMuiTheme({
  palette: {
    primary: {
      ...lightblue,
      A700: primary
    }
  }
});

class App extends Component {

  componentWillMount () {
    this.next();
  }

  next(label){
    const getNext = () => {
      window.Labelbox.fetchNextAssetToLabel()
        .then((imageUrl) => this.setState({imageUrl}));
    };
    if (label) {
      window.Labelbox.setLabelForAsset(label).then(getNext);
    } else {
      getNext();
    }
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="app">
          <div className="labeling-frame">
            <LabelingScreen
              imageUrl={this.state && this.state.imageUrl}
              onSkip={() => this.next()}
              onSubmit={(label) => this.next(label)}
            />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
