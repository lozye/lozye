## EventTarget.addEventListener()

+ [RAW](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)

#### SyntaxSection
```javascript
target.addEventListener(type, listener[, options]);
target.addEventListener(type, listener[, useCapture]);
target.addEventListener(type, listener[, useCapture, wantsUntrusted  ]); // Gecko/Mozilla only
```
#### Parameters
`type`
A case-sensitive string representing the [event type](https://developer.mozilla.org/en-US/docs/Web/Events) to listen for.


`listener`
The object which receives a notification (an object that implements the Event interface) when an event of the specified type occurs. This must be an object implementing the EventListener interface, or a JavaScript function. See The event listener callback for details on the callback itself.

`options` Optional
An options object that specifies characteristics about the event listener. The available options are:
+ capture: A Boolean indicating that events of this type will be dispatched to the registered listener before being dispatched to any EventTarget beneath it in the DOM tree.
+ once: A Boolean indicating that the listener should be invoked at most once after being added. If true, the listener would be automatically removed when invoked.
+ passive: A Boolean which, if true, indicates that the function specified by listener will never call preventDefault(). If a passive listener does call preventDefault(), the user agent will do nothing other than generate a console warning. See Improving scrolling performance with passive listeners to learn more.
> mozSystemGroup: A Boolean indicating that the listener should be added to the system group. Available only in code running in XBL or in the chrome of the Firefox browser.

`useCapture` Optional
A Boolean indicating whether events of this type will be dispatched to the registered listener before being dispatched to any EventTarget beneath it in the DOM tree. Events that are bubbling upward through the tree will not trigger a listener designated to use capture. Event bubbling and capturing are two ways of propagating events which occur in an element that is nested within another element, when both elements have registered a handle for that event. The event propagation mode determines the order in which elements receive the event. See DOM Level 3 Events and JavaScript Event order for a detailed explanation. If not specified, useCapture defaults to false.

> Note: For event listeners attached to the event target, the event is in the target phase, rather than the capturing and bubbling phases. Events in the target phase will trigger all listeners on an element in the order they were registered, regardless of the useCapture parameter.

> Note: useCapture has not always been optional. Ideally, you should include it for the widest possible browser compatibility.

`wantsUntrusted`
A Firefox (Gecko)-specific parameter. If true, the listener receives synthetic events dispatched by web content (the default is false for browser chrome and true for regular web pages). This parameter is useful for code found in add-ons as well as the browser itself.

