/**
 * Created by swchen on 2017/2/14.
 */

import {message, Button} from "antd";
import UserPermissionService from "../../../service/core/UserPermissionService";
import DepartmentService from '../../../service/core/DepartmentService';
import MainActionTypes from "../../../actiontype/MainActionTypes";


import AppContext from "../../../application/AppContext";

function getData() {

    return async (dispatch, getState) => {
        try {
            dispatch({
                type: MainActionTypes.IS_EXECUTING,
                payload: true,
            });

            const [config, user, {perms, roles}, menus, rootUnit] = await Promise.all([
                UserPermissionService.getSysDictWithoutExceptionHandleAsync(),
                UserPermissionService.findUserWithoutExceptionHandleAsync(),
                UserPermissionService.myPermissionsWithoutExceptionHandleAsync(),
                UserPermissionService.myMenusFlatWithoutExceptionHandleAsync(),
                DepartmentService.getRootNurseUnitWithoutExceptionHandleAsync()]);

            AppContext.init({
                user,
                config,
                roles,
                permissions: perms,
                menus,
                rootUnit
            });

        } catch (e) {
            dispatch({
                type: MainActionTypes.ERROR,
                payload: e,
            })

        } finally {
            dispatch({
                type: MainActionTypes.IS_EXECUTING,
                payload: false,
            })
        }
    }
}


export default {
    getData,
}





