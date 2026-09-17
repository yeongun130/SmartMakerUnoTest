/*
 * SmartMaker <-> miniPaint host bridge
 *
 * .Net10 Uno 마이그레이션(260826) - PaintToolWindow(WebView2)가 miniPaint를 제어하기 위한 얇은 브릿지.
 * miniPaint 자체 소스는 손대지 않고(업그레이드 편의) index.html에 이 파일 <script> 한 줄만 추가해서 쓴다.
 * miniPaint의 공식 임베드 API인 window.Layers(examples/open-edit-save.html 참고)만 사용한다.
 */
(function () {
	function post (msg) {
		try {
			if (window.chrome && window.chrome.webview) {
				window.chrome.webview.postMessage (msg);
			}
			else if (window.unoWebView) {
				window.unoWebView.postMessage (JSON.stringify (msg));
			}
		}
		catch (e) { /* 호스트가 없으면 무시 */ }
	}

	/* 호스트가 넘겨준 data URL을 새 레이어로 연다. */
	window.smpOpenImageDataUrl = function (dataUrl, name) {
		if (!dataUrl) return false;

		var img = new Image ();
		img.onload = function () {
			try {
				window.Layers.insert ({
					name: name || 'image',
					type: 'image',
					data: img,
					width: img.naturalWidth || img.width,
					height: img.naturalHeight || img.height,
					width_original: img.naturalWidth || img.width,
					height_original: img.naturalHeight || img.height
				});
				post ({ type: 'opened' });
			}
			catch (e) {
				post ({ type: 'error', message: 'insert failed: ' + e });
			}
		};
		img.onerror = function () {
			post ({ type: 'error', message: 'image decode failed' });
		};
		img.src = dataUrl;

		return true;
	};

	/* 모든 레이어를 합쳐 data URL로 돌려준다(동기 - ExecuteScriptAsync 반환값으로 바로 받는다). */
	window.smpExportDataUrl = function (mime) {
		try {
			var dim = window.Layers.get_dimensions ();
			var canvas = document.createElement ('canvas');
			canvas.width = dim.width;
			canvas.height = dim.height;
			window.Layers.convert_layers_to_canvas (canvas.getContext ('2d'));

			return canvas.toDataURL (mime || 'image/png');
		}
		catch (e) {
			post ({ type: 'error', message: 'export failed: ' + e });
			return '';
		}
	};

	window.smpIsReady = function () {
		return !!window.Layers;
	};

	/* miniPaint 전역(window.Layers)이 준비되면 호스트에 알린다. */
	var nTries = 0;
	var timer = setInterval (function () {
		if (window.Layers) {
			clearInterval (timer);
			post ({ type: 'ready' });
		}
		else if (200 < ++nTries) {
			clearInterval (timer);
			post ({ type: 'error', message: 'miniPaint init timeout' });
		}
	}, 50);
}) ();
