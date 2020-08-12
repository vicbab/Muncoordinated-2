import * as React from 'react';

// This import loads the firebase namespace along with all its type information.
import * as firebase from 'firebase/app';

// These imports load individual services into the firebase namespace.
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/storage';

import { Route } from 'react-router-dom';
import './App.css';

import Onboard from './components/Onboard';
import Homepage from './components/Homepage';
import Guides from './components/Guides'
import FAQ from './components/FAQ';
import Committee from './components/Committee';

const firebaseConfig = {
  apiKey: "AIzaSyCK_r3i6bZvRVW_dNOMXKhS563Pf_aqEps",
  authDomain: "qmun2021.firebaseapp.com",
  databaseURL: "https://qmun2021.firebaseio.com",
  projectId: "qmun2021",
  storageBucket: "qmun2021.appspot.com",
  messagingSenderId: "776859144464",
  appId: "1:776859144464:web:e2ecaa3903a21416edd595",
  measurementId: "G-8S18Z87KZ6"
};

firebase.initializeApp(firebaseConfig);



class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/onboard" component={Onboard} />
        <Route exact path="/guides" component={Guides} />
        <Route exact path="/faq" component={FAQ} />
        <Route exact path="/committees" component={Onboard} />
        <Route path="/committees/:committeeID" component={Committee} />
      </React.Fragment>
    );
  }
}

export default App;
