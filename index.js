var hasWarning = false;

function setWarning(warningText) {
    var btn = document.getElementById("launch-button");
    var btnText = document.getElementById("button-text");

    // Update button text and color
    btnText.innerText = warningText;
    btn.classList.add("btn-warning");
    
    // Set flag so the next click proceeds
    hasWarning = true;
}

function launchExploit() {
    var paths = window.location.pathname.split("/");
    if (paths[paths.length-1].substring(0, 6) == "index." || paths[paths.length-1] == "") {
        paths.pop();
    }
    paths.push(exploit_page);
    window.location.pathname = paths.join("/");
}

function checkCompatibility() {
    // If we've already shown a warning, the second click launches regardless
    if (hasWarning) {
        return launchExploit();
    }

    var userAgentDetails = navigator.userAgent.match(/\S+ \((.*?)\) .* (?:NintendoBrowser\/(\d+\.\d+\.\d+\.(\d+)\.(\w\w)))?/);
    
    if (!userAgentDetails || userAgentDetails.length < 2) {
        return setWarning("Unknown device. Click again to force launch.");
    }

    if (userAgentDetails[1] == "Nintendo WiiU") {
        if (userAgentDetails.length != 5) {
            return setWarning("Unknown version. Click again to force launch.");
        }
        
        var version = userAgentDetails[2].substring(0, 5);
        if (version == "4.3.2" || version == "4.3.1" || version == "4.3.0") {
            return launchExploit();
        } else {
            const commitVersion = parseInt(userAgentDetails[3]);
            if (commitVersion < 11224) {
                return setWarning("Firmware outdated. Click again to force launch.");
            } else {
                return setWarning("Unsupported firmware. Click again to force launch.");
            }
        }
    } else {
        return setWarning("Console not detected. Click again to force launch.");
    }
}
