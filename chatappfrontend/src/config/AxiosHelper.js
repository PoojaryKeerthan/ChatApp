import axios from 'axios';

export const baseurl = 'https://chatback-latest-vp0u.onrender.com';
export const  publicaxios = axios.create({
    baseURL: baseurl,
    headers: {
        'Content-Type': 'application/json',
    },
});