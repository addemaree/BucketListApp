import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './components/app';
import reducers from './reducers';
import { Router, Route, IndexRoute, browserHistory} from 'react-router';

var createStoreWithMiddelware = applyMiddleware()(createStore);

ReactDOM.render(
	<Provider store={createStoreWithMiddelware(reducers)}>
		<Router history={browserHistory}>
			<Route path="/" component={App}>
			</Route>
		</Router>
	</Provider>
	, document.querySelector('.container'));