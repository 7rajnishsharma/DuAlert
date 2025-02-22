// background.js
import { computeHashFromUrl } from "./utils/hash.js";

// Global mapping to store notificationId -> { newId, existingId }
const duplicateNotifications = {};

// ---------------------
// Duplicate Check on Download Creation
// ---------------------
chrome.downloads.onCreated.addListener(function(downloadItem) {
  chrome.storage.local.get({ downloads: [] }, function(data) {
    let downloads = data.downloads;
    // Check if any stored download has the same URL.
    let duplicate = downloads.find(item => item.url === downloadItem.url);
    if (duplicate) {
      // Duplicate detected – prompt the user.
      chrome.notifications.create("", {
        type: "basic",
        iconUrl: "icons/icon48.png",
        title: "Duplicate Download Detected",
        message: `The file "${downloadItem.filename}" already exists. What do you want to do?`,
        buttons: [
          { title: "Open Existing File" }
        ],
        priority: 2
      }, function(notificationId) {
        duplicateNotifications[notificationId] = {
          newId: downloadItem.id,
          existingId: duplicate.id
        };
      });
    }
  });
});

// ---------------------
// Duplicate Check on Download Completion (Advanced Content Check)
// ---------------------
chrome.downloads.onChanged.addListener(function(delta) {
  if (delta.state && delta.state.current === "complete") {
    chrome.downloads.search({ id: delta.id }, async function(items) {
      if (items && items.length > 0) {
        let item = items[0];
        // Compute the hash using the file's URL.
        let hash = await computeHashFromUrl(item.url);
        if (!hash) {
          console.error("Failed to compute hash for download: " + item.filename);
          // Fallback to using URL + fileSize.
          hash = item.url + "_" + item.fileSize;
        }
        let identifier = hash;
        // Update the download metadata in storage and check for duplicates.
        chrome.storage.local.get({ downloads: [] }, function(data) {
          let downloads = data.downloads;
          let duplicate = downloads.find(entry => entry.identifier === identifier);
          if (duplicate) {
            // If a duplicate is found (and it's not the same as the current download),
            // show a notification if one hasn't been shown already.
            if (duplicate.id !== item.id) {
              chrome.notifications.create("", {
                type: "basic",
                iconUrl: "icons/icon48.png",
                title: "Duplicate Download Detected",
                message: `The file "${item.filename}" appears to be a duplicate of "${duplicate.filename}".`,
                buttons: [
                  { title: "Open Existing File" }
                ],
                priority: 2
              }, function(notificationId) {
                duplicateNotifications[notificationId] = {
                  newId: item.id,
                  existingId: duplicate.id
                };
              });
            }
          } else {
            // No duplicate found; save this download's metadata, including its download ID, URL, and file path.
            downloads.push({
              id: item.id,                // Download ID
              url: item.url,              // Download URL
              identifier: identifier,     // Content hash (or fallback identifier)
              filename: item.filename,    // Filename (assumed to include the local file path)
              fileSize: item.fileSize,
              downloadTime: Date.now()
            });
            chrome.storage.local.set({ downloads: downloads });
          }
        });
      }
    });
  }
});


// ---------------------
// Notification Button Click Handler
// ---------------------
chrome.notifications.onButtonClicked.addListener((notificationId, buttonIndex) => {
  const mapping = duplicateNotifications[notificationId];
  if (!mapping) {
    console.error("No mapping found for notification:", notificationId);
    return;
  }
  // Since there's only one button, we assume buttonIndex === 0
  chrome.downloads.cancel(mapping.newId, function() {
    if (chrome.runtime.lastError) {
      console.error("Error canceling new download:", chrome.runtime.lastError);
    } else {
      chrome.downloads.open(mapping.existingId, function() {
        if (chrome.runtime.lastError) {
          console.error("Error opening existing file:", chrome.runtime.lastError);
        }
      });
    }
  });
  // Clear the mapping for this notification.
  delete duplicateNotifications[notificationId];
});
