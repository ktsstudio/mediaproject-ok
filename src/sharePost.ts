import axios from 'axios';

import okApi from './okApi';
import okUI from './okUI';
import { SharePostParams } from './types/sharing';

const sharePost = async ({ file, message, appLink }: SharePostParams) => {
  try {
    const resultPermission = await okApi('users.hasAppPermission', {
      ext_perm: 'PHOTO_CONTENT',
    });

    if (!resultPermission) {
      await okUI('showPermissions', '["PHOTO_CONTENT"]');
    }

    const { upload_url } = await okApi('photosV2.getUploadUrl');

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

    const photos = JSON.stringify(
      Object.keys(data.photos).map((photoId) => ({
        photo_id: photoId,
        token: data.photos[photoId].token,
      }))
    );

    await okApi('photosV2.commit', { photos });

    const result = await okUI('postMediatopic', {
      media: [
        {
          type: 'text',
          text: message,
        },
        {
          type: 'photo',
          list: [{ id: data.photos[Object.keys(data.photos)[0]].token }],
        },
        {
          type: 'link',
          url: appLink,
        },
      ],
    });

    return Boolean(result);
  } catch (e) {
    return false;
  }
};

export default sharePost;
