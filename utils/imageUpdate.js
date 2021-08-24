import * as FileSystem from "expo-file-system";
import * as Crypto from "expo-crypto";

/**
 * Helper function to cache image
 * @function imageUpdate
 * @param {string} uri - S3 location of user image
 * @param {string} type - Used to determine the action, Getting saving user image
 * @returns location of image in the cache
 */
export const imageUpdate = async (uri, type) => {
  const check = async () => {
    const filesystemURI = await getImageFilesystemKey(uri, type);
    const image = await loadImage(filesystemURI, uri, type);
    return image;
  };

  /**
   * Function to determine the path of the user image in the cache
   * @function getImageFilesystemKey
   * @param {string} remoteURI - S3 location of user image
   * @returns string
   */
  const getImageFilesystemKey = async (remoteURI) => {
    // Hashing the url to get a unique storage location
    const hashed = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      remoteURI
    );
    // Appending the cache location to the hashed string to get file system path
    return `${FileSystem.cacheDirectory}${hashed}`;
  };

  /**
   * Function to check if image exists, if it does it deletes the present one,
   * downloads the image from the bucket and caches it
   * @function loadImage
   * @param {string} filesystemURI - Location of image in cache
   * @param {string} remoteURI - S3 location of image
   * @param {string} type - Action determinant
   * @returns string
   */
  const loadImage = async (filesystemURI, remoteURI, type) => {
    try {
      // Use the cached image if it exists
      const metadata = await FileSystem.getInfoAsync(filesystemURI);
      if (metadata.exists) {
        if (type == "UPDATE") {
          FileSystem.deleteAsync(filesystemURI);
        } else {
          return filesystemURI;
        }
      }

      // otherwise download to cache
      const imageObject = await FileSystem.downloadAsync(
        remoteURI,
        filesystemURI
      );
      return imageObject.uri;
    } catch (err) {
      console.log("Image loading error:", err);
      return remoteURI;
    }
  };

  let image = await check();
  return image;
};
