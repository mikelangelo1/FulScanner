import { Alert } from "react-native";

export default (image, url, loading) => {
  const xhr = new XMLHttpRequest();
  xhr.open("PUT", url);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        Alert.alert("Image edited successfully", "Press okay to continue", [
          { text: "Okay" },
        ]);
        loading(false);
      } else {
        Alert.alert("An error occured", "Failed to update profile picture", [
          { text: "Okay" },
        ]);
      }
    }
  };

  let content;

  content = image.split("/").pop().split(".").pop() === "png" ? "png" : "jpeg";

  xhr.setRequestHeader("Content-Type", `image/${content}`);
  xhr.send({
    uri: image,
    type: `image/${content}`,
    name: Date.now() + "_" + image.split("/").pop(),
  });
};
