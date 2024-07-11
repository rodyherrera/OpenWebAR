import * as objectService from '@services/object/service';
import * as objectSlice from '@services/object/slice';
import OperationHandler from '@utilities/operationHandler';

export const createObject = (body) => async (dispatch) => {
    const operation = new OperationHandler(objectSlice, dispatch);
    operation.use({
        api: objectService.createObject,
        loaderState: objectSlice.setIsLoading,
        responseState: objectSlice.setObject,
        query: { body }
    });
};

export const getMyObjects = () => async (dispatch) => {
    const operation = new OperationHandler(objectSlice, dispatch);
    operation.use({
        api: objectService.getMyObjects,
        loaderState: objectSlice.setIsLoading,
        responseState: objectSlice.setObjects
    });
};

export const deleteObject = (id) => async (dispatch) => {
    const operation = new OperationHandler(objectSlice, dispatch);
    operation.use({
        api: objectService.deleteObject,
        responseState: objectSlice.setObjects,
        query: { query: { params: { id } } }
    });
};