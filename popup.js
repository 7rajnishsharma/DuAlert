// popup.js
document.addEventListener("DOMContentLoaded", function() {
    chrome.storage.local.get({ downloads: [] }, function(data) {
      let listDiv = document.getElementById("downloadList");
      if (data.downloads.length === 0) {
        listDiv.textContent = "No downloads recorded.";
      } else {
        data.downloads.forEach(function(item) {
          let div = document.createElement("div");
          div.textContent = `${item.filename} (${item.fileSize} bytes)`;
          listDiv.appendChild(div);
        });
      }
    });
  });
