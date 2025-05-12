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
const equipmentList = ref([])
const selectedEquipments = ref([])

const getEmptyForm = () => ({
    id: null,
    description: ''
})

const form = ref(getEmptyForm())

const loadEquipments = async () => {
    equipmentList.value = await EquipmentService.getAll()
    equipmentTypes.value = await EquipmentService.getEquipmentTypes()
}

watch(
    () => props.task,
    async (value) => {
        if (value?.id) {
            form.value = {
                id: value.id,
                description: value.description
            }
            isEdit.value = true

            try {
                const assigned = await MaintenanceService.getAssignedEquipments(value.id)
                selectedEquipments.value = Array.isArray(assigned)
                    ? assigned.map(id => Number(id))
                    : []
                console.log('Assigned Equipment IDs:', selectedEquipments.value)
            } catch (err) {
                console.error('Failed to load assigned equipments', err)
                selectedEquipments.value = []
            }
        } else {
            form.value = getEmptyForm()
            selectedEquipments.value = []
            isEdit.value = false
        }
    },
    { immediate: true }
)

const handleSubmit = async () => {
    if (selectedEquipments.value.length === 0) {
        await Swal.fire({
            icon: 'error',
            title: 'Please assign at least one equipment.',
            confirmButtonText: 'OK'
        })
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
                confirmButtonText: 'OK'
            })
        } else {
            const response = await MaintenanceService.create({
                description: form.value.description
            })
            taskId = response.data.id
            await Swal.fire({
                icon: 'success',
                title: 'Created!',
                confirmButtonText: 'OK'
            })
        }

        await MaintenanceService.assignEquipments(taskId, selectedEquipments.value)
        props.onSuccess?.()
    } catch (err) {
        await Swal.fire({
            icon: 'error',
            title: 'Failed to save task',
            text: err?.message || '',
            confirmButtonText: 'OK'
        })
    }
}

onMounted(() => {
    loadEquipments()
})
</script>

<template>
    <form @submit.prevent="handleSubmit">
        <div class="mb-3">
            <label class="form-label">Description *</label>
            <input v-model="form.description" type="text" class="form-control" required minlength="3" />
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
