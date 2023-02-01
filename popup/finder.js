function listenForClicks() {
    document.addEventListener("click", (e) => {
        /**
         * send a "getSelection" message to the content script in the active tab.
         */
        function getSelection(tabs) {
            browser.tabs.sendMessage(tabs[0].id, {
                command: "getSelection",
                search: document.getElementById("input").value
            });
        }

        /**
         * Just log the error to the console.
         */
        function reportError(error) {
            console.error(`Could not get selection: ${error}`);
        }

        /**
         * Get the active tab,
         * then call "getSelection()".
         */
        if (e.target.classList.contains("getSelection")) {
            browser.tabs.query({ active: true, currentWindow: true })
                .then(getSelection)
                .catch(reportError);
        }
    });
}

/**
 * There was an error executing the script.
 * Display the popup's error message, and hide the normal UI.
 */
function reportExecuteScriptError(error) {
    document.querySelector("#popup-content").classList.add("hidden");
    document.querySelector("#error-content").classList.remove("hidden");
    console.error(`Failed to get selection content script: ${error.message}`);
}

/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 * If we couldn't inject the script, handle the error.
 */
browser.tabs.executeScript({ file: "/content_scripts/search.js" })
    .then(listenForClicks)
    .catch(reportExecuteScriptError);