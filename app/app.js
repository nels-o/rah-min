/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import 'babel-polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import FontFaceObserver from 'fontfaceobserver';
import createHistory from 'history/createBrowserHistory';
import log from 'loglevelnext';
import 'sanitize.css/sanitize.css';

// Import root app
import App from 'containers/App';


// Load the favicon and the .htaccess file
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
import 'file-loader?name=[name].[ext]!./.htaccess'; // eslint-disable-line import/extensions

import configureStore from './configureStore';

// Import CSS reset and Global Styles
import './global-styles';

// Observe loading of Open Sans (to remove open sans, remove the <link> tag in
// the index.html file and this observer)
const openSansObserver = new FontFaceObserver('Open Sans', {});

// When Open Sans is loaded, add a font-family using Open Sans to the body
openSansObserver.load().then(() => {
  document.body.classList.add('fontLoaded');
});

// Create redux store with history
const initialState = {};
const history = createHistory();
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app');

const render = messages => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>,
    MOUNT_NODE,
  );
};

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  // eslint-disable-next-line global-require
  const runtime = require('offline-plugin/runtime');
  runtime.install({
    onUpdating: e => {
      log.info('RPE SW:', 'Updating service worker.', e);
    },
    onUpdateReady: e => {
      log.info('RPE SW:', 'Update ready. Applying...', e);
      // Tells to new SW to take control immediately
      const p = new Promise((res, rej) => {
        runtime.applyUpdate(
          () => {
            log.info(
              'RPE SW Event:',
              'UpdateReady',
              'Success',
              JSON.stringify(arguments),
            );
            res(arguments);
          },
          () => {
            log.info(
              'RPE SW Event:',
              'Error',
              'UpdateReady',
              JSON.stringify(arguments),
            );
            rej(arguments);
          },
        );
      });
      if (e.waitUntil) {
        e.waitUntil(p);
      }
      return p;
    },
    onUpdated: e => {
      log.info('RPE SW:', 'Updated service worker.', e);
      // Reload the webpage to reload into new version
      window.location.reload();
    },

    onUpdateFailed: e => {
      log.warn('RPE SW:', 'Update failed.', e);
    },
  });
}

render();
