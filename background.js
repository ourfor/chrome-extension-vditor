chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({color: 'green'}, function() {
    console.log("The color is green.");
});

chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
  chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'developer.chrome.com'},
      })
      ],
          actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

chrome.browserAction.onClicked.addListener(function() {
  chrome.windows.create({
    'url': 'popup.html',
    'type': 'popup',
    'width': 1400,
    'height': 850,
    'left': 360,
    'top': 190,
  }, function(window) {
  });
});
