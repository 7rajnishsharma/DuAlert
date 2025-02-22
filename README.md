# DuAlert

## What is DuAlert?

**DuAlert** is a Chrome extension that prevents duplicate downloads by checking your computer’s drive before a new file is downloaded. Using the File System Access API, DuAlert scans a user-selected folder on your computer, computes each file's SHA-256 hash, and compares it with the hash of the file you’re about to download. If a duplicate is detected—even if the file names differ—DuAlert cancels the download and notifies you. This process helps save storage space and reduces redundant data downloads.

## What is SHA-256 Hash?

SHA-256 is a cryptographic algorithm that creates a unique 64-character hexadecimal code for a file based on its content. Even if file names change, the hash remains the same, allowing DuAlert to accurately detect duplicate files.

## Features

- **Real-Time Duplicate Detection:**  
  Monitors downloads and checks file hashes against files stored in a user-selected folder.

- **File System Integration:**  
  Uses the File System Access API to directly scan and access your computer’s drive.

- **Accurate Hash Matching:**  
  Employs SHA-256 hashing to detect duplicates even when file names differ.

- **User-Friendly Notifications:**  
  Alerts you immediately if a duplicate file is detected, preventing unnecessary downloads.

## How to Install

### Get the Extension

1. **Download or Clone the Repository:**  
   Obtain the DuAlert source code from the repository.

2. **Add to Chrome:**

   - Open Google Chrome and navigate to `chrome://extensions/`
   - Enable **Developer Mode** (toggle in the top right corner)
   - Click **Load unpacked** and select the folder containing the DuAlert extension files

## How It Works

1. **Folder Selection:**  
   - In the extension’s popup, click the "Select Folder" button to open a dedicated folder-picker window.
   - Choose a folder on your computer where DuAlert will scan for existing files.

2. **Duplicate Check Before Download:**  
   - When a new download is initiated, DuAlert computes the SHA-256 hash of the file (using its URL or content).
   - It then scans the user-selected folder to check if any file in that folder has the same hash.
   
3. **Action on Duplicate:**  
   - If a duplicate is found, the new download is canceled automatically.
   - A notification is displayed informing you that the file already exists on your computer.

## Permissions Required

DuAlert requires the following permissions to function:

- **downloads:** To monitor and manage file downloads.
- **downloads.open:** To open existing files if needed.
- **notifications:** To alert you when a duplicate file is detected.
- **storage:** To store metadata (including folder handles) locally.
- **scripting:** To allow the extension to inject scripts if necessary.
- **host_permissions:** Set to `*://*/*` to access files from any website for hashing purposes.

## Business Model

DuAlert follows a **Freemium Model**:

- **Free Tier:**
  - **Core Duplicate Detection:**  
    Use basic duplicate detection based on file metadata and SHA-256 hash checks.
  - **Local Storage:**  
    Store duplicate records locally on your device with a usage limit (e.g., up to 100 duplicate checks per month).
  - **Basic Notifications:**  
    Receive alerts when a duplicate is detected, with an option to open the existing file.

- **Premium Tier (Individual Subscription):**
  - **Advanced Features:**  
    - Cloud Sync: Synchronize download metadata across multiple devices.
    - Detailed Analytics: Track download behavior and duplicate trends.
    - Enhanced Duplicate Detection: Advanced algorithms and integrations.
  - **Unlimited Usage:**  
    Remove or significantly increase the monthly duplicate check limit.
  - **Pricing:**  
    Approximately $4.99–$9.99/month based on market research.

- **Enterprise Tier:**
  - **Custom Integrations & Admin Dashboard:**  
    For organizations, academic institutions, or large enterprises.
  - **Centralized Management:**  
    Manage downloads across teams with reporting and administrative controls.
  - **Volume Licensing & Premium Support:**  
    Custom pricing based on user volume and service requirements.

## Target Customers

Potential customer segments for DuAlert include:

- **Students:**  
  High school, college, and university students who frequently download research materials and course content.

- **Researchers & Academics:**  
  Faculty members, lab technicians, and researchers managing large volumes of data.

- **Freelancers & Professionals:**  
  Designers, writers, developers, and other professionals who need efficient file management.

- **Content Creators:**  
  Bloggers, vloggers, and social media influencers who regularly download digital assets.

- **Small Businesses & Corporate IT Departments:**  
  Companies that require efficient storage management and reduced bandwidth usage.

- **Government & Public Sector:**  
  Agencies that handle extensive digital records and require streamlined data management.

- **Digital Libraries & E-Learning Platforms:**  
  Organizations managing vast digital document repositories.

## Contribution

Contributions are welcome! If you'd like to improve DuAlert, please fork the repository, make your changes, and submit a pull request. For major changes, please open an issue first to discuss your ideas.


## Contact

For any questions, suggestions, or contributions, please contact us via [your email/issue tracker link here].

---

*DuAlert helps you avoid redundant downloads, saving storage space and keeping your digital files organized—all with the power of advanced file hashing and seamless integration with your computer’s drive.*
