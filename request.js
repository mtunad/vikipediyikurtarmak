var rules, lastRequestId;

chrome.webRequest.onBeforeRequest.addListener(function(details) {
	return redirectToMatchingRule(details);
}, {
	urls : ["<all_urls>"]
}, ["blocking"]);

function redirectToMatchingRule(details) {
	var rules = [
		{"from":"wikipedia.org","to":"wikipedi0.org","isActive":true}
	];
	for (var i = 0; i < rules.length; i++) {
		var rule = rules[i];
		if (rule.isActive && details.url.indexOf(rule.from) > -1 && details.requestId !== lastRequestId ) {
			lastRequestId = details.requestId;
			return{
				redirectUrl : details.url.replace(rule.from, rule.to)
			};
		}
	}
}