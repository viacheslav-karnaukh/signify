# signify
```javascript
var helloNotification = Notify('Hello!');
helloNotification.init(); //default behaviour - notification at the bottom; will disappear after 3 sec

var infoNotification = Notify('Info Notification will disappear in 5 sec', {top: 0}, 5000, 'info');
infoNotification.init(); //info style of notification; it will appear at the top

//we can change behaviour of notification; let's pin helloNotification to prevent its disappearing and init it after that
helloNotification.setDuration('pinned').init();

//we can even create chaining while updating styles
helloNotification.updateStyles({top: 0}).setDuration(5000).init();
```

##TODO
- tests
- minified version
- description
