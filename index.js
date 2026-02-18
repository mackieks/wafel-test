function setWarning(warningText) {
    var btn = document.getElementById("launch-button");
    var btnText = document.getElementById("button-text");
    var controls = document.getElementById("compatibility-controls");

    // Update button text and look
    btnText.innerText = warningText;
    btn.classList.add("btn-warning");

    // Show the "Ignore" checkbox
    controls.hidden = false;
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
    if (document.getElementById("ignore-compatibility").checked) {
        return launchExploit();
    }

    var userAgentDetails = navigator.userAgent.match(/\S+ \((.*?)\) .* (?:NintendoBrowser\/(\d+\.\d+\.\d+\.(\d+)\.(\w\w)))?/);
    
    if (!userAgentDetails || userAgentDetails.length < 2) {
        return setWarning("Unknown device. Click to try anyway.");
    }

    if (userAgentDetails[1] == "Nintendo WiiU") {
        if (userAgentDetails.length != 5) {
            return setWarning("Unknown browser version. Try anyway?");
        }
        
        var version = userAgentDetails[2].substring(0, 5);
        if (version == "4.3.2" || version == "4.3.1" || version == "4.3.0") {
            return launchExploit();
        } else {
            const commitVersion = parseInt(userAgentDetails[3]);
            if (commitVersion < 11224) {
                return setWarning("Firmware outdated (5.5.0+ required). Try anyway?");
            } else {
                return setWarning("Unknown firmware. Try anyway?");
            }
        }
    } else {
        return setWarning("Console not detected. Try anyway?");
    }
}
