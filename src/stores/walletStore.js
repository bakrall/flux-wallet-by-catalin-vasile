import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';
import ActionTypes from '../constants';

const CHANGE = 'CHANGE';
let _walletState = [];

class WalletStore extends EventEmitter {
	constructor() {
		super();

		//registers action handler with the Dispatcher
		Dispatcher.register(this._registerToActions.bind(this));
	}

	_registerToActions(action) {
		switch(action.actionType) {
			case ActionTypes.ADD_NEW_ITEM:
				this._addNewItem(action.payload);
			break;
		}
	}

	_addNewItem(item) {
		item.id = _walletState.length;
		_walletState.push(item);
		this.emit(CHANGE);
	}

	//returns the current store's state
	getAllItems() {
		return _walletState;
	}

	getTotalBudget() {
		let totalBudget = 0;

		_walletState.forEach(item => {
			totalBudget += parseFloat(item.amount);
		});

		return totalBudget;
	}


	//hooks a React component's callack to the CHANGED event
	addEventListener(callback) {
		this.on(CHANGE, callback);
	}

	//removes the listener from the CHANGED event
	removeChangeListener(callback) {
		this.removeListener(CHANGE, callback);
	}
 }

export default new WalletStore();
