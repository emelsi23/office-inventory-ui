import axios from 'axios'

const BASE_URL = 'https://localhost:44379/api'
const TASK_URL = `${BASE_URL}/maintenancetasks`
const LINK_URL = `${BASE_URL}/equipmentmaintenances`

const getAll = async () => {
    const res = await axios.get(TASK_URL)
    return res.data
}

const getById = async (id) => {
    const res = await axios.get(`${TASK_URL}/${id}`)
    return res.data
}

const create = async (data) => {
    return await axios.post(TASK_URL, data)
}

const update = async (id, data) => {
    return await axios.put(`${TASK_URL}/${id}`, data)
}

const remove = async (id) => {
    return await axios.delete(`${TASK_URL}/${id}`)
}

const assignEquipments = async (taskId, equipmentIds) => {
    return await axios.post(`${LINK_URL}/assign`, {
        maintenanceTaskId: taskId,
        equipmentIds
    })
}

const getAssignedEquipments = async (taskId) => {
    const res = await axios.get(`${LINK_URL}/task/${taskId}`)
    return res.data
}

export default {
    getAll,
    getById,
    create,
    update,
    remove,
    assignEquipments,
    getAssignedEquipments
}
