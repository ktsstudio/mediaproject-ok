import axios from 'axios';

import okApi from './okApi';
import okUI from './okUI';

const shareMoment = async (file: File): Promise<boolean | null> => {
  try {
    const resultPermission = await okApi('users.hasAppPermission', {
      ext_perm: 'PHOTO_CONTENT',
    });

    if (!resultPermission) {
      await okUI('showPermissions', '["PHOTO_CONTENT"]');
    }

    const { upload_url } = await okApi('moments.getUploadUrl', {
      type: 'PHOTO',
    });

    const formData = new FormData();
    formData.append('pic', file);

    const { data } = await axios({
      url: upload_url,
      method: 'POST',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const [photoId] = Object.keys(data.photos);
    const { token } = data.photos[photoId];

    const result = await okApi('moments.commit', {
      photos: JSON.stringify([{ photo_id: photoId, token: token }]),
    });

    return Boolean(result);
  } catch (error) {
    // 'null', если пользователь отказался шерить
    return error === 'null' ? null : false;
  }
};

export default shareMoment;
