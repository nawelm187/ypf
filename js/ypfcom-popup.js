(function () {
  var COOKIE_NAME = "ypfcom_popup_choice";
  var COOKIE_DAYS = 30;
  var GLOBAL_URL = "https://english.ypf.com/";

  function getCookie(name) {
    var match = document.cookie.match(new RegExp("(?:^|; )" + encodeURIComponent(name).replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"));
    return match ? decodeURIComponent(match[1]) : null;
  }

  function setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/; SameSite=Lax";
  }

  var ARGENTINA_BOUNDS = {
    minLat: -55.1,
    maxLat: -21.7,
    minLon: -73.6,
    maxLon: -53.6
  };

  function requestGeolocationOnStart() {
    if (!("geolocation" in navigator)) {
      console.info("Geolocalizacion no soportada por este navegador.");
      return Promise.resolve(null);
    }

    return new Promise(function (resolve) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          resolve({ lat: position.coords.latitude, lon: position.coords.longitude });
        },
        function (error) {
          if (error.code === error.PERMISSION_DENIED) {
            console.info("Permiso de geolocalizacion denegado por el usuario.");
          } else {
            console.error("Error al obtener la geolocalizacion: " + error.message);
          }
          resolve(null);
        },
        {
          enableHighAccuracy: false,
          timeout: 10000,
          maximumAge: 300000
        }
      );
    });
  }

  function isInsideArgentina(coords) {
    return (
      coords.lat >= ARGENTINA_BOUNDS.minLat &&
      coords.lat <= ARGENTINA_BOUNDS.maxLat &&
      coords.lon >= ARGENTINA_BOUNDS.minLon &&
      coords.lon <= ARGENTINA_BOUNDS.maxLon
    );
  }

  function showYpfcomPopup() {
    var style = document.createElement("style");
    style.textContent =
      "#ypfcom-popup-overlay { position: fixed; bottom: 24px; right: 24px; z-index: 99999; font-family: DIN, sans-serif; }" +
      "#ypfcom-popup { background: #fff; border-top: 4px solid #0451dd; box-shadow: 0 4px 24px rgba(0,0,0,0.15); padding: 20px; min-width: 300px; max-width: 360px; position: relative; animation: ypfcomPopupSlideIn 0.3s ease-out; }" +
      "@keyframes ypfcomPopupSlideIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }" +
      "#ypfcom-popup .ypfcom-popup-close { position: absolute; top: 12px; right: 16px; background: none; border: none; font-size: 20px; cursor: pointer; color: #666; line-height: 1; padding: 4px; }" +
      "#ypfcom-popup .ypfcom-popup-close:hover { color: #000; }" +
      "#ypfcom-popup .ypfcom-popup-header { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }" +
      "#ypfcom-popup .ypfcom-popup-header .ypfcom-popup-icon-wrapper { padding: 8px; border-radius: 50%; background-color: #e8f0fe; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }" +
      "#ypfcom-popup .ypfcom-popup-header .ypfcom-popup-icon { width: 22px; height: 22px; }" +
      "#ypfcom-popup .ypfcom-popup-header h3 { margin: 0; font-size: 16px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.3px; color: #0451dd; }" +
      "#ypfcom-popup .ypfcom-popup-text { font-size: 14px; font-weight: 400; color: #364153; margin-bottom: 16px; line-height: 19px; letter-spacing: 0px; }" +
      "#ypfcom-popup .ypfcom-popup-actions { display: flex; align-items: center; gap: 8px; }" +
      "#ypfcom-popup .ypfcom-popup-btn-primary { display: inline-block; padding: 9px 18px; border: 1px solid #0451dd; color: #0451dd; font-size: 14px; font-weight: 500; text-decoration: none; line-height: 20px; letter-spacing: 0px; cursor: pointer; background: transparent; transition: background 0.2s, color 0.2s; }" +
      "#ypfcom-popup .ypfcom-popup-btn-primary:hover { background: #0033a0; color: #fff; }" +
      "#ypfcom-popup .ypfcom-popup-btn-secondary { background: none; border: none; color: #6A7282; font-size: 14px; font-weight: 500; line-height: 20px; letter-spacing: 0px; cursor: pointer; padding: 9px 18px; text-decoration: none; font-family: DIN;}" +
      "#ypfcom-popup .ypfcom-popup-btn-secondary:hover { color: #0451dd; }" +
      "#ypfcom-popup .ypfcom-popup-text .ypfcom-popup-br { display: block; }" +
      "@media (max-width: 768px) { #ypfcom-popup-overlay { bottom: 0; right: 0; left: 0; } #ypfcom-popup { max-width: 100%; min-width: auto; border-radius: 0; } #ypfcom-popup .ypfcom-popup-text .ypfcom-popup-br { display: none; } }";
    document.head.appendChild(style);

    var overlay = document.createElement("div");
    overlay.id = "ypfcom-popup-overlay";
    overlay.innerHTML =
      '<div id="ypfcom-popup">' +
      '  <button class="ypfcom-popup-close" aria-label="Cerrar">' +
      '    <img src="https://ypf.com/yl-cdn/images/ds2/icons/icon_close--grey.svg" alt="Cerrar" style="width:16px;height:16px;">' +
      "  </button>" +
      '  <div class="ypfcom-popup-header">' +
      '    <div class="ypfcom-popup-icon-wrapper"><img class="ypfcom-popup-icon" src="https://ypf.com/yl-cdn/images/ds2/icons/icon_world--brand.svg" alt="Globe"></div>' +
      "    <h3>Sitio Internacional</h3>" +
      "  </div>" +
      '  <p class="ypfcom-popup-text">Detectamos que estás <span style="font-weight:500">fuera de Argentina</span>.<span class="ypfcom-popup-br"></span> ¿Querés ir al sitio global de YPF?</p>' +
      '  <div class="ypfcom-popup-actions">' +
      '    <button class="ypfcom-popup-btn-primary ypfcom-popup-btn-global">YPF.com - English</button>' +
      '    <button class="ypfcom-popup-btn-secondary">Quedarme aquí</button>' +
      "  </div>" +
      "</div>";

    document.body.appendChild(overlay);

    var closeBtn = overlay.querySelector(".ypfcom-popup-close");
    var stayBtn = overlay.querySelector(".ypfcom-popup-btn-secondary");
    var globalBtn = overlay.querySelector(".ypfcom-popup-btn-global");

    function closePopup() {
      overlay.remove();
    }

    closeBtn.addEventListener("click", function () {
      closePopup();
    });

    stayBtn.addEventListener("click", function () {
      setCookie(COOKIE_NAME, "stay", COOKIE_DAYS);
      closePopup();
    });

    globalBtn.addEventListener("click", function () {
      setCookie(COOKIE_NAME, "global", COOKIE_DAYS);
      window.location.href = GLOBAL_URL;
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var choice = getCookie(COOKIE_NAME);

    if (choice === "global") {
      window.location.href = GLOBAL_URL;
      return;
    }

    if (choice === "stay") {
      return;
    }

    requestGeolocationOnStart().then(function (coords) {
      if (coords && !isInsideArgentina(coords)) {
        showYpfcomPopup();
      }
    });
  });
})();