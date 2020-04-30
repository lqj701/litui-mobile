import { createAction } from 'redux-actions';
import { CALL_API } from '../utils/api';

export const uploadImageAct = createAction('UPLOAD_IMAGE');

export function uploadImage(params = {}) {
  return {
    [CALL_API]: {
      act: uploadImageAct,
      endpoint: `api/wx/1/media/uploadImage`,
      params,
    },
  };
}
