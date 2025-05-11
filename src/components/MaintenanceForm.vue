<script setup>
import { ref, watch, onMounted } from 'vue'
import MaintenanceService from '@/services/maintenanceService.js'
import EquipmentService from '@/services/equipmentService.js'
import Swal from 'sweetalert2'
import AssignEquipmentToTask from '@/components/EquipmentTaskSelector.vue'

const props = defineProps({
    task: Object,
    onSuccess: Function
})

const isEdit = ref(false)
const equipmentTypes = ref([])
const form = ref({
    id: null,
    description: ''
})

const equipmentList = ref([])
const selectedEquipments = ref([])

const loadEquipments = async () => {
    equipmentList.value = await EquipmentService.getAll()
    equipmentTypes.value = await EquipmentService.getEquipmentTypes()
}

const loadAssignedEquipments = async (taskId) => {
    try {
        const assigned = await MaintenanceService.getEquipmentsByTask(taskId)
        selectedEquipments.value = assigned.map(e => e.id)
    } catch {
        selectedEquipments.value = []
    }
}

const resetForm = () => {
    form.value = { id: null, description: '' }
    selectedEquipments.value = []
    isEdit.value = false
}
const handleTaskChange = async (value) => {
    if (value && value.id !== form.value.id) {
        form.value = { ...value }
        isEdit.value = true
        await loadAssignedEquipments(value.id)
    } else if (!value) {
        resetForm()
    }
}
watch(
    () => props.task,
    (value) => {
        handleTaskChange(value)
    },
    { immediate: true }
)

const handleSubmit = async () => {
    if (selectedEquipments.value.length === 0) {
        Swal.fire('Error', 'Please assign at least one equipment.', 'error')
        return
    }

    try {
        let taskId

        if (isEdit.value) {
            await MaintenanceService.update(form.value.id, form.value)
            taskId = form.value.id
            await Swal.fire({
                icon: 'success',
                title: 'Updated!',
                timer: 2000,
                showConfirmButton: false,
                timerProgressBar: true
            })
        } else {
            const response = await MaintenanceService.create({
                description: form.value.description
            })
            taskId = response.data.id
            await Swal.fire({
                icon: 'success',
                title: 'Created!',
                timer: 2000,
                showConfirmButton: false,
                timerProgressBar: true
            })
        }

        await MaintenanceService.assignEquipments(taskId, selectedEquipments.value)
        props.onSuccess?.()
    } catch (err) {
        Swal.fire('Error', 'Failed to save task', 'error')
    }
}

onMounted(loadEquipments)
</script>

<template>
    <form @submit.prevent="handleSubmit">
        <div class="mb-3">
            <label class="form-label">Description *</label>
            <input v-model="form.description" type="text" class="form-control" required />
        </div>

        <AssignEquipmentToTask :equipmentList="equipmentList" :equipmentTypes="equipmentTypes"
            v-model="selectedEquipments" />

        <div class="text-end mt-3">
            <button class="btn btn-primary">
                {{ isEdit ? 'Update' : 'Create' }}
            </button>
        </div>
    </form>
</template>
