"use strict";
var Rx = require('@reactivex/rxjs');
var Store = (function () {
    function Store(reducer) {
        var _this = this;
        this.reducer = reducer;
        this.dispatch = new Rx.Subject();
        this.state = new Rx.BehaviorSubject(this.reducer());
        this.dispatch
            .withLatestFrom(this.state, function (action, state) {
            return {
                action: action,
                state: state
            };
        })
            .subscribe(function (reduceable) {
            _this.state.next(_this.reducer(reduceable.state, reduceable.action));
        });
    }
    Store.combineReducers = function (reducers) {
        return function (state, action) {
            var stateInProgress = {};
            Object.keys(reducers).forEach(function (key) {
                stateInProgress[key] = reducers[key](state && state[key], action);
            });
            return stateInProgress;
        };
    };
    ;
    return Store;
}());
exports.Store = Store;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Store;
