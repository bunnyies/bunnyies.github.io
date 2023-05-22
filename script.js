function switchMode(mode) {
    var encryptTab = document.getElementById("encrypt");
    var decryptTab = document.getElementById("decrypt");
    var submitBtn = document.querySelector(".txt input[type='submit']");
    var submitValue = "";

    if (mode === "encrypt") {
        encryptTab.style.color = "#fff";
        decryptTab.style.color = "#808080";
        submitBtn.value = "ENCRYPT";
        submitValue = "ENCRYPT";
    } else if (mode === "decrypt") {
        encryptTab.style.color = "#808080";
        decryptTab.style.color = "#fff";
        submitBtn.value = "DECRYPT";
        submitValue = "DECRYPT";
    }

    submitBtn.onclick = function() {
        var textInput = document.getElementById("ascii").value;
        var keyInput = parseInt(document.getElementById("key").value);

        // Perform encryption or decryption based on the mode and input values
        if (mode === "encrypt") {
            var encryptedText = encryptText(textInput, keyInput);
            copyToClipboard(encryptedText);
        } else if (mode === "decrypt") {
            var decryptedText = decryptText(textInput, keyInput);
            copyToClipboard(decryptedText);
        }

        // Prevent form submission
        return false;
    };
}

function encryptText(text, encryptionKey) {
    var encryptedText = "";
    for (var i = 0; i < text.length; i++) {
        var charCode = (text.charCodeAt(i) + encryptionKey) % 128;
        var encryptedChar = String.fromCharCode(charCode);
        encryptedText += encryptedChar;

        // Add random ASCII character between each encrypted character
        encryptedText += String.fromCharCode(Math.floor(Math.random() * (126 - 33 + 1)) + 33);
    }
    return encryptedText;
}

function decryptText(encryptedText, encryptionKey) {
    var decryptedText = "";
    for (var i = 0; i < encryptedText.length; i += 2) {
        var charCode = (encryptedText.charCodeAt(i) - encryptionKey) % 128;
        if (charCode < 0) {
            charCode += 128;
        }
        var decryptedChar = String.fromCharCode(charCode);
        decryptedText += decryptedChar;
    }
    return decryptedText;
}

function copyToClipboard(text) {
    var textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    alert("Copied to clipboard: " + text);
}