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
