import { expect } from 'chai';

import Store from './Store';

describe('Store', () => {
  it('should exist', () => {
    expect(new Store((state: any, action) => {})).to.exist;
  });

  describe('with a simple counter', () => {
    interface SimpleAction {
      type: string
    };

    let reducer;
    let action: SimpleAction;
    let store: Store<number>;

    beforeEach(() => {
      reducer = (state: number = 0, action) => {
        if (!action) {
          return state;
        }

        switch (action.type) {
          case 'INCREMENT':
            return state + 1;
          case 'DECREMENT':
            return state - 1;
          default:
            return state;
        }
      }

      store = new Store<number>(reducer);
    });

    it('should return the initial state of the reducer on state subscription', () => {
      return new Promise((resolve) => {
        store.state.subscribe((state: number) => {
          expect(state).to.equal(0);
          resolve();
        });
      });
    });

    it('should correctly follow increments and decrements', () => {
      const expectedResults = [0,1,2,1,1];
      let actualResults = [];
      let subscriptionIndex = 0;

      return new Promise((resolve) => {
        store.state.subscribe((state) => {
            actualResults.push(state);
            subscriptionIndex++;

            if (subscriptionIndex === expectedResults.length) {
                resolve({
                    expected: expectedResults,
                    actual: actualResults
                });
            }
        });
        store.dispatch.next({ type: 'INCREMENT' });
        store.dispatch.next({ type: 'INCREMENT' });
        store.dispatch.next({ type: 'DECREMENT' });
        store.dispatch.next({ type: 'ASDF' });
      });
    });
  });

  describe('combineReducers', () => {
    interface ISimpleAction {
      type: string
    };

    interface ICombinedState {
      number: number,
      string: string
    };

    let numberReducer;
    let stringReducer;
    let action: ISimpleAction;
    let store: Store<number>;

    beforeEach(() => {
      numberReducer = (state: number = 0, action) => state;
      stringReducer = (state: string = '', action) => state;
    });

    it('should combine reducers', () => {
      let combinedReducer = Store.combineReducers<ICombinedState>({
        number: numberReducer,
        string: stringReducer
      });

      expect(combinedReducer).to.exist;
    });

    it('should combine reducers and create the correct state', () => {
      let combinedReducer = Store.combineReducers<ICombinedState>({
        number: numberReducer,
        string: stringReducer
      });

      let state = combinedReducer();
      expect(state).to.exist;
      expect(state.number).to.equal(0);
      expect(state.string).to.equal('');
    });
  });
});
