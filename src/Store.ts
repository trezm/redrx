import * as Rx from '@reactivex/rxjs';
import IAction from './IAction';
import IReducer from './IReducer';

export class Store<T> {
    public dispatch: Rx.Subject<IAction>;
    public state: Rx.BehaviorSubject<T>;

    constructor(private reducer: IReducer<T>) {
        this.dispatch = new Rx.Subject<IAction>();
        this.state = new Rx.BehaviorSubject<T>(this.reducer());

        this.dispatch
            .withLatestFrom(this.state, (action: IAction, state: T) => {
                return {
                    action: action,
                    state: state
                };
            })
            .subscribe((reduceable) => {
                this.state.next(this.reducer(reduceable.state, reduceable.action));
            });
    }
}

export default Store;
