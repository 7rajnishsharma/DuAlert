// utils/hash.js

/**
 * Compute a SHA-256 hash from the file fetched at the provided URL.
 *
 * Note:
 * - This function uses fetch with mode 'cors'. If the remote server does not provide
 *   the appropriate CORS headers, the response may be opaque and we won't be able to
 *   read its contents.
 * - If an opaque response is encountered, a warning is logged and the function returns null.
 *
 * @param {string} url - The URL of the file to hash.
 * @returns {Promise<string|null>} - The computed hex hash, or null if an error occurs.
 */
async function computeHashFromUrl(url) {
    try {
      // Fetch the file with CORS mode.
      const response = await fetch(url, { mode: "cors" });
      
      // If the response is opaque, we cannot read its contents.
      if (response.type === "opaque") {
        console.warn(`Received an opaque response for URL: ${url}. Cannot compute hash.`);
        return null;
      }
      
      // Check if the response is OK.
      if (!response.ok) {
        console.error(`Failed to fetch file from URL: ${url}. Status: ${response.status}`);
        return null;
      }
      
      // Convert response to a Blob.
      const blob = await response.blob();
      // Read the blob as an ArrayBuffer.
      const arrayBuffer = await blob.arrayBuffer();
      // Compute the SHA-256 hash.
      const hashBuffer = await crypto.subtle.digest("SHA-256", arrayBuffer);
      // Convert the hash buffer into a hex string.
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
      
      return hashHex;
    } catch (error) {
      console.error("Error computing hash:", error);
      return null;
    }
  }
  
  export { computeHashFromUrl };
  