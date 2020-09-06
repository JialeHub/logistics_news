import { axiosG, axiosG2 } from "@/utils/request";

// 获取新闻分类接口
const newClassificationUrl = "qiantai/getallL_newclassification";
export function newClassificationApi(data) {
  return axiosG(newClassificationUrl, data);
}

// 获取新闻
const newsUrl = "qiantai/getallL_news";
export function newsApi(data) {
  return axiosG(newsUrl, data);
}

// 获取所有新闻
const getAllUrl = "qiantai/getallL_news";
export function getAllApi(data) {
  return axiosG(getAllUrl, data);
}

// 根据id获取新闻
const getOneUrl = "qiantai/getOne";
export function getOneApi(data) {
  return axiosG(getOneUrl, data);
}

// 获取网点信息
const getallUserUrl = "qiantai/getallUser";
export function getallUserApi(data) {
  return axiosG(getallUserUrl, data);
}

// 获取公告
const announcementUrl = "qiantai/getL_announcement";
export function announcementApi(data) {
  return axiosG(announcementUrl, data);
}

// 获取帮助中心
const serviceUrl = "qiantai/getallL_service";
export function serviceApi(data) {
  return axiosG(serviceUrl, data);
}

// 订单搜索
const searchUrl = "qiantai/search";
export function searchApi(data) {
  return axiosG(searchUrl, data);
}
export function searchApi2(data) {
  return axiosG2(searchUrl, data);
}

// 模糊查询网点
const searchWangDianUrl = "qiantai/searchWangDian";
export function searchWangDianApi(data) {
  return axiosG(searchWangDianUrl, data);
}
