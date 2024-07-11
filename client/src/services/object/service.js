import APIRequestBuilder from '@utilities/apiRequestBuilder';

export const ObjectAPI = new APIRequestBuilder('/object');

export const createObject = ObjectAPI.register({
    path: '/',
    method: 'POST'
});

export const getMyObjects = ObjectAPI.register({
    path: '/me/',
    method: 'GET'
});

export const deleteObject = ObjectAPI.register({
    path: '/me/:id/',
    method: 'DELETE'
});