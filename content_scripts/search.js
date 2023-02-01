(function () {
    window.hasRun = true;

    function getTextElements(){
        
    }

    function getSelection() {
        var activeElement = document.activeElement;
        var activeElementTagName = activeElement ? activeElement.tagName.toLowerCase() : null;
        if (
            (activeElementTagName == "textarea") || (activeElementTagName == "input" &&
                /^(?:text|search|tel|url)$/i.test(activeElement.type)) &&
            (typeof activeElement.selectionStart == "number")
        ) {
            return activeElement;
        } else if (window.getSelection) {
            return window.getSelection();
        }
    }


    /**
       * Listen for messages from the background script
       * Call "getSelection()"
      */
    browser.runtime.onMessage.addListener((message) => {
        if (message.command === "getSelection") {}
    });

    getSelection();

})();
