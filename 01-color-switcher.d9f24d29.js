!function(){var t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]"),n=null;e.addEventListener("click",(function(){t.disabled=!1,e.disabled=!0,clearInterval(n)})),t.addEventListener("click",(function(){t.disabled=!0,e.disabled=!1,n=setInterval((function(){document.body.style.background="#".concat(Math.floor(16777215*Math.random()).toString(16))}),1e3)}))}();
//# sourceMappingURL=01-color-switcher.d9f24d29.js.map
