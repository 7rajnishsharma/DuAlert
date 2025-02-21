# Duplicate Download Alert System (DDAS)  

## What is DDAS?  
The **Duplicate Download Alert System (DDAS)** is a **Chrome extension** that helps prevent users from downloading the same file more than once. It watches your downloads and **alerts you** if you’re trying to download a file that already exists on your computer.  

It works by checking the **SHA-256 hash** (a unique code) of each file, so even if the file names are different but the content is the same, DDAS will recognize it as a duplicate. This helps save **storage space** 💾 and keeps your files organized 📂.  


#### What is SHA-256 Hash?  
SHA-256 is a method to create a **unique code** 🔑 for a file based on its content. Even if the file name changes, its SHA-256 code stays the same. DDAS uses this to detect duplicate downloads accurately.


## Features  

✅ **Real-Time Alerts** – Instantly notifies you if a file has already been downloaded.  
✅ **SHA-256 Hash Matching** – Uses advanced hashing to detect duplicates accurately.  
✅ **Works Everywhere** – Detects duplicate downloads from any website, not just specific platforms.  

## How to Install  

1. **Get the Extension:**  
   - Download the source code from the repository.  

2. **Add to Chrome:**  
   - Open **Google Chrome** and go to **chrome://extensions/**  
   - Turn on **Developer Mode** ⚙️ (top right corner).  
   - Click **Load unpacked** and select the folder with the extension files.  


## How It Works  

- Once installed, DDAS **monitors** all your downloads.  
- If you try to download a **duplicate file**, you’ll get a **notification** with options to manage it.
- ## Permissions Required  

The extension needs the following permissions to work:  

- **downloads** – To track files being downloaded.  
- **notifications** – To show alerts when a duplicate is found.  
- **storage** – To remember previously downloaded file details.  
- **host\_permissions** – Allows checking files from all websites.  


## Things to Keep in Mind  

⚠ **CORS Restrictions:** Some websites block file access, so DDAS may not always be able to check file contents. In such cases, it will rely on file names and metadata.  
⚠ **User Consent:** Since DDAS needs access to all downloads, users should understand why these permissions are required.  


## Want to Contribute?  

We welcome improvements! If you want to help, **fork the repository** and submit a **pull request** with your changes.  

