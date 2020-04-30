import fetch from 'isomorphic-fetch';

const url = `${AppConf.api.domain}${AppConf.api.pathPrefix}api/wx/${
  AppConf.appId
}/media/uploadImImage`;

const headers = {
  Authorization: `Token userToken=${AppConf.api.userToken}`
};

export function uploadImageData(formData) {
  return fetch(url, {
    method: 'POST',
    headers,
    body: formData
  }).then(response => response.json());
}

export function uploadMediaId(mediaIds) {
  const body = JSON.stringify({ mediaIds });

  return fetch(url, { method: 'POST', headers, body }).then(response =>
    response.json()
  );
}
