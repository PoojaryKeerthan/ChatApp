import { publicaxios } from "../config/AxiosHelper"

export const crerateRoom = async (roomDetail) => {
    const response = await publicaxios.post(`/api/v1/rooms`,roomDetail,{
        headers: {
            'Content-Type': 'text/plain',
        }
    });
    return response.data;
}

export const joinChatApi=async(roomId)=>{
    const response = await publicaxios.get(`/api/v1/rooms/${roomId}`);
    return response.data;
}

export const getAllRoomMessages = async (roomId,size=50,page=0) => {
    const response = await publicaxios.get(`/api/v1/rooms/${roomId}/messages?size=${size}&page=${page}`);
    return response.data;
}