/**
 * 用户请求相关模块
 */
import request from "@/utils/request";

export const createOrUpdateMenu = (data: any) => {
    return request({
        method: "POST",
        url: "/boss/menu/saveOrUpdate",
        data
    });
};

export const getEditMenuInfo = (id: number | string | string[] = -1) => {
    return request({
        method: "GET",
        url: '/boss/menu/getEditMenuInfo',
        params: {
            id
        }
    });
};

export const getAllmenus = () => {
    return request({
        method: "GET",
        url: '/boss/menu/getAll'
    });
};

export const deleteMenus = (id: number) => {
    return request({
        method: "DELETE",
        url: `/boss/menu/${id}`
    });
};
