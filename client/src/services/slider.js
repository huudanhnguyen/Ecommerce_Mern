import axios from '../axios';

// Lấy tất cả sliders
export const getSliders = (params = {}) =>
  axios({
    url: '/slider',
    method: 'get',
    params,
  });

// Lấy slider theo ID
export const getSliderById = (id) =>
  axios({
    url: `/slider/${id}`,
    method: 'get',
  });

// Tạo slider mới
export const createSlider = (data, config = {}) =>
  axios({
    url: '/slider',
    method: 'post',
    data,
    ...config,
  });

// Cập nhật slider
export const updateSlider = (id, data, config = {}) =>
  axios({
    url: `/slider/${id}`,
    method: 'put',
    data,
    ...config,
  });

// Xóa slider
export const deleteSlider = (id) =>
  axios({
    url: `/slider/${id}`,
    method: 'delete',
  });

// Toggle trạng thái slider
export const toggleSliderStatus = (id) =>
  axios({
    url: `/slider/${id}/toggle`,
    method: 'put',
  });

// Cập nhật vị trí sliders
export const updateSliderPositions = (sliders) =>
  axios({
    url: '/slider/positions/update',
    method: 'put',
    data: { sliders },
  });
