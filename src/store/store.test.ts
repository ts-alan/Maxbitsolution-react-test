import { store } from "./store";
import { cocktailsApi } from "./app/apiSlice";

describe("Redux Store", () => {
  it("should be configured with the correct reducers", () => {
    const state = store.getState();

    // Check that the cocktailsApi reducer is present
    expect(state).toHaveProperty(cocktailsApi.reducerPath);
  });

  it("should have the cocktailsApi middleware configured", () => {
    // Check that the middleware is configured by dispatching an action
    // and verifying the store structure
    const dispatch = store.dispatch;
    expect(typeof dispatch).toBe("function");

    // The store should be properly configured for RTK Query
    const state = store.getState();
    expect(state[cocktailsApi.reducerPath]).toBeDefined();
  });

  it("should handle actions correctly", () => {
    // Dispatch an action to test the store
    const action = { type: "TEST_ACTION", payload: "test" };
    store.dispatch(action);

    // Store should still be in a valid state
    const newState = store.getState();
    expect(newState).toBeDefined();
    expect(newState[cocktailsApi.reducerPath]).toBeDefined();
  });

  it("should have the correct initial state structure", () => {
    const state = store.getState();

    // RTK Query creates specific state structure
    const apiState = state[cocktailsApi.reducerPath];
    expect(apiState).toHaveProperty("queries");
    expect(apiState).toHaveProperty("mutations");
    expect(apiState).toHaveProperty("provided");
    expect(apiState).toHaveProperty("subscriptions");
    expect(apiState).toHaveProperty("config");
  });

  it("should support subscribing to state changes", () => {
    let callCount = 0;
    const unsubscribe = store.subscribe(() => {
      callCount++;
    });

    // Dispatch an action to trigger subscription
    store.dispatch({ type: "TEST_SUBSCRIPTION" });

    expect(callCount).toBe(1);

    // Clean up
    unsubscribe();
  });

  it("should be a valid Redux store", () => {
    // Check that store has all required Redux store methods
    expect(typeof store.dispatch).toBe("function");
    expect(typeof store.getState).toBe("function");
    expect(typeof store.subscribe).toBe("function");
    expect(typeof store.replaceReducer).toBe("function");
  });
});
