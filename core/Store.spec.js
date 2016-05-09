"use strict";
var chai_1 = require('chai');
var Store_1 = require('./Store');
describe('Store', function () {
    it('should exist', function () {
        chai_1.expect(new Store_1.default(function (state, action) { })).to.exist;
    });
    describe('with a simple counter', function () {
        ;
        var reducer;
        var action;
        var store;
        beforeEach(function () {
            reducer = function (state, action) {
                if (state === void 0) { state = 0; }
                switch (action.type) {
                    case 'INCREMENT':
                        return state + 1;
                    case 'DECREMENT':
                        return state - 1;
                    default:
                        return state;
                }
            };
            store = new Store_1.default(reducer);
        });
        it('should return the initial state of the reducer on state subscription', function () {
            return new Promise(function (resolve) {
                store.state.subscribe(function (state) {
                    chai_1.expect(state).to.equal(0);
                });
            });
        });
        it('should correctly follow increments and decrements', function () {
            var expectedResults = [0, 1, 2, 1, 1];
            var actualResults = [];
            var subscriptionIndex = 0;
            return new Promise(function (resolve) {
                store.state.subscribe(function (state) {
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
});
