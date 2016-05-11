# redrx
### An implementation of Redux using observables.

### **Note:** This is a pre-alpha release and probably should not be used in production.

## Useage

Think about this as basically redux, except _everything is an observable_.

Simple counter example:

```
const reducer = (state: number = 0, action) => {
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

const store = new Store<number>(reducer);

store.state.subscribe((state) => {
  // Do stuff with your new state in here
});

store.dispatch.next({ type: 'INCREMENT' }); // State will be 1
store.dispatch.next({ type: 'INCREMENT' }); // State will be 2
store.dispatch.next({ type: 'DECREMENT' }); // State will be 1
```
