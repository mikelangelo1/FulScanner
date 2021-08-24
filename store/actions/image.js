export const saveImage = (uri) => {
    return {
      type: "SAVE_IMAGE",
      image: uri,
    };
  };
  