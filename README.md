# Downshift Issue #217

**Issue:** Cursor jumps to end of input when inputValue is a controlled prop [[link]](https://github.com/paypal/downshift/issues/217)

**Solution:** Move "controlled" input state into it's [own class](https://github.com/geoffdavis92/downshift-test/blob/18fc1fbfc7aaae056d80053d1d356392df4ab884/src/App.js#L32-L61) so it does not override user input, on input. This local input state can bubble up to parent component(s) in order to be used/saved at higher levels if need be. [[link]](https://github.com/geoffdavis92/downshift-test/blob/issue/217/src/App.js)