const getUniqueID = () => Math.floor(Math.random() * 9999999 + 1);

export const isEmpty = obj => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};

export const uniqueID = obj => {
  let id = getUniqueID();
  let unique = true;

  for (const num of Object.keys(obj)) {
    if (id == num) unique = false;
  }

  if (!unique) {
    uniqueID(obj);
  } else {
    return id;
  }
};

export const getFirstScript = obj => Object.keys(obj)[0];

export const getFileName = str => str.replace(/(.*)wp-content/g, '....');

export const uploader = () => {
  let mediaUploader;

  mediaUploader = wp.media.frames.file_frame = wp.media({
    title: 'Choose a File',
    button: {
      text: 'Choose File'
    },
    multiple: false
  });

  return mediaUploader;
};
