import axios from 'axios'


const BASE_URL = import.meta.env.VITE_API_URL
const API_URL = `${BASE_URL}/equipment`
const TYPES_URL = `${BASE_URL}/equipmenttypes`

const getAll = async () => {
    const res = await axios.get(API_URL)
    return res.data
}

const getById = async (id) => {
    const res = await axios.get(`${API_URL}/${id}`)
    return res.data
}

const create = async (data) => {
    return await axios.post(API_URL, data)
}

const update = async (id, data) => {
    return await axios.put(`${API_URL}/${id}`, data)
}

const remove = async (id) => {
    return await axios.delete(`${API_URL}/${id}`)
}
const getEquipmentTypes = async () => {
    const res = await axios.get(TYPES_URL)
    return res.data
}

const createEquipmentType = async (data) => {
    return await axios.post(TYPES_URL, data)
}

export const getMaintenancesByEquipment = async (equipmentId) => {
    const response = await axios.get(`${API_URL}${equipmentId}/maintenances`)
    return response.data
}

const addEquipmentType = async (data) => {
    const res = await axios.post(`${TYPES_URL}`, data)
    return res.data
}

export default {
    getAll,
    getById,
    create,
    update,
    remove,
    getEquipmentTypes,
    createEquipmentType,
    addEquipmentType
}
