// .Net10 Uno 留덉씠洹몃젅?댁뀡(260819) - TaskServiceManager.cs??WASM(鍮?__DESKTOP__) 遺꾧린?먯꽌 ?ъ슜.
// Windows Task Scheduler(Microsoft.Win32.TaskScheduler)??釉뚮씪?곗??????API媛 ?놁뼱, 釉뚮씪?곗? ?쒖?
// Notification API(window.Notification)濡??泥? 釉뚮씪?곗???吏꾩쭨 OS ?ㅼ?以꾨윭媛 ?놁쑝誘濡?setTimeout?쇰줈
// 吏???ㅽ뻾?섎뒗 諛⑹떇?대ŉ, ???섏씠吏媛 ?ロ엳硫??덉빟???щ씪吏꾨떎(Windows Task Scheduler? ?щ━ 諛깃렇?쇱슫??吏??遺덇? -
// 蹂寃쏀궎?뚮뱶.md??紐낆떆).
(function () {
	var timers = {};
        
	function showNotification (title, content) {
		if (!("Notification" in window)) {
			return;
		}

		if ("granted" === Notification.permission) {
			new Notification (title, { body: content });
		}
		else if ("denied" !== Notification.permission) {
			Notification.requestPermission ().then (function (permission) {
				if ("granted" === permission) {
					new Notification (title, { body: content });
				}
			});
		}
	}

	globalThis.smTaskNotification_schedule = function (taskName, title, content, delayMs) {
		if (timers[taskName]) {
			clearTimeout (timers[taskName]);
		}

		if (0 >= delayMs) {
			showNotification (title, content);
			return true;
		}

		timers[taskName] = setTimeout (function () {
			delete timers[taskName];
			showNotification (title, content);
		}, delayMs);

		return true;
	};

	globalThis.smTaskNotification_cancel = function (taskName) {
		if (timers[taskName]) {
			clearTimeout (timers[taskName]);
			delete timers[taskName];
			return true;
		}
		return false;
	};
})();
