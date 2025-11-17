    _defineProperty2(this, "QUALITY_PATH", browser.isMobile || Math.min(window.innerWidth || window.screen.width || 0, window.innerHeight || window.screen.height || 0) <= 768 ? "lowres/" : "hires/"),
    _defineProperty2(this, "DPR", (function() {
        var e = Math.min(1.5, browser.devicePixelRatio) || 1;
        return Math.min(window.innerWidth || window.screen.width || 0, window.innerHeight || window.screen.height || 0) <= 768 ? Math.min(1, e) : e
    })()),
