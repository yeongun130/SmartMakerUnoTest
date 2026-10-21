// TopControl/WasmScripts/MapView.js
// WASM 전용 지도 초기화/조작 스크립트. Uno.Wasm.Bootstrap이 자동으로 페이지에 로드함
// (TaskNotification.js와 동일 컨벤션 - TopControl.csproj의 EmbeddedResource 참고).
// MapViewControl.xaml.cs의 [JSImport("globalThis.smMapView_...")]에서 호출된다.
(function () {
	var loadedSdks = {};

	function loadScript(url) {
		return new Promise(function (resolve, reject) {
			var script = document.createElement('script');
			script.src = url;
			script.onload = function () { resolve(); };
			script.onerror = function () { reject(new Error('Failed to load ' + url)); };
			document.head.appendChild(script);
		});
	}

	// 티맵 SDK는 내부적으로 document.write()를 호출하는데, 크롬은 "동적으로 삽입된 외부(src=) 스크립트"에서
	// 오는 document.write만 막는다(에러 메시지의 "asynchronously-loaded external script" 참고) - 인라인
	// 스크립트는 이 제약을 받지 않는다. 그래서 fetch로 코드를 텍스트로 받아 인라인 스크립트로 실행해서 우회.
	function loadScriptInline(url) {
		return fetch(url)
			.then(function (response) {
				if (!response.ok) {
					throw new Error('Failed to fetch ' + url + ': ' + response.status);
				}
				return response.text();
			})
			.then(function (code) {
				var script = document.createElement('script');
				script.textContent = code;
				document.head.appendChild(script);
			});
	}

	function sdkUrlFor(kind, apiKey) {
		switch (kind) {
			case 'GoogleMap':
				// sensor=true는 폐기된 파라미터로, 내부적으로 SensorNotRequired 경고 처리 경로에서
				// "Cannot read properties of undefined (reading 'dM')" 예외를 유발해서 제거함(지도 표시엔
				// 지장 없었지만 테스트마다 디버거가 이 예외에서 멈춰서 걸리적거렸음).
				return 'https://maps.google.com/maps/api/js?key=' + apiKey + '&v=3';
			case 'NaverMap':
				return 'https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=' + apiKey;
			case 'NaverMap2':
				return 'https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=' + apiKey;
			case 'KakaoMap':
				return 'https://dapi.kakao.com/v2/maps/sdk.js?appkey=' + apiKey;
			case 'TMap':
				return 'https://apis.openapi.sk.com/tmap/jsv2?version=1&appKey=' + apiKey;
			default:
				return null;
		}
	}

	globalThis.smMapView_ensureSdk = function (kind, apiKey) {
		if (loadedSdks[kind]) {
			return Promise.resolve(true);
		}

		var url = sdkUrlFor(kind, apiKey);
		if (!url) {
			return Promise.reject(new Error('Unknown map kind: ' + kind));
		}

		var loader = (kind === 'TMap') ? loadScriptInline(url) : loadScript(url);

		return loader.then(function () {
			loadedSdks[kind] = true;
			return true;
		});
	};

	globalThis.smMapView_createMap = function (elementId, kind, mapVarName, lat, lng, zoom) {
		var el = document.getElementById(elementId);
		if (!el) {
			return false;
		}

		switch (kind) {
			case 'GoogleMap':
				globalThis[mapVarName] = new google.maps.Map(el, {
					center: new google.maps.LatLng(lat, lng),
					zoom: zoom,
					mapTypeId: google.maps.MapTypeId.ROADMAP
				});
				return true;
			case 'NaverMap':
			case 'NaverMap2':
				globalThis[mapVarName] = new naver.maps.Map(el, {
					center: new naver.maps.LatLng(lat, lng),
					zoom: zoom
				});
				return true;
			case 'KakaoMap':
				globalThis[mapVarName] = new kakao.maps.Map(el, {
					center: new kakao.maps.LatLng(lat, lng),
					level: zoom
				});
				return true;
			case 'TMap':
				globalThis[mapVarName] = new Tmapv2.Map(el, {
					center: new Tmapv2.LatLng(lat, lng),
					zoom: zoom
				});
				return true;
			default:
				return false;
		}
	};

	globalThis.smMapView_setCenterAndMarker = function (kind, mapVarName, lat, lng) {
		var map = globalThis[mapVarName];
		if (!map) {
			return false;
		}

		switch (kind) {
			case 'GoogleMap': {
				var pos = new google.maps.LatLng(lat, lng);
				map.setCenter(pos);
				new google.maps.Marker({ position: pos, map: map });
				return true;
			}
			case 'NaverMap':
			case 'NaverMap2': {
				var npos = new naver.maps.LatLng(lat, lng);
				map.setCenter(npos);
				new naver.maps.Marker({ position: npos, map: map });
				return true;
			}
			case 'KakaoMap': {
				var kpos = new kakao.maps.LatLng(lat, lng);
				map.setCenter(kpos);
				var kmarker = new kakao.maps.Marker({ position: kpos });
				kmarker.setMap(map);
				return true;
			}
			case 'TMap': {
				var tpos = new Tmapv2.LatLng(lat, lng);
				map.setCenter(tpos);
				var tmarker = new Tmapv2.Marker({ position: tpos });
				tmarker.setMap(map);
				return true;
			}
			default:
				return false;
		}
	};
})();
