<script setup>
import { ref, onMounted, watch } from 'vue'
import EquipmentService from '@/services/equipmentService'
import Swal from '@/alerts/swal'
import Swal2 from 'sweetalert2'

const props = defineProps({
    equipment: Object,
    onSuccess: Function
})

const form = ref({
    brand: '',
    model: '',
    equipmentTypeId: '',
    purchaseDate: '',
    serialNumber: ''
})

const isEdit = ref(false)
const equipmentTypes = ref([])

watch(() => props.equipment, (value) => {
    if (value) {
        form.value = { ...value }
        if (form.value.purchaseDate) {
            form.value.purchaseDate = form.value.purchaseDate.split('T')[0]
        }
        isEdit.value = true
    } else {
        form.value = {
            brand: '',
            model: '',
            equipmentTypeId: '',
            purchaseDate: '',
            serialNumber: ''
        }
        isEdit.value = false
    }
}, { immediate: true })

const addNewType = async () => {
    const { value: typeName } = await Swal2.fire({
        title: 'Add New Equipment Type',
        input: 'text',
        inputLabel: 'Type name',
        inputPlaceholder: 'Enter type name',
        showCancelButton: true,
        confirmButtonText: 'Save',

    })

    if (typeName) {
        try {
            const newType = await EquipmentService.addEquipmentType({ description: typeName })
            equipmentTypes.value.push(newType)
            form.value.equipmentTypeId = newType.id
            Swal.showSuccess('New type added')
        } catch {
            Swal.showError('Failed to add type')
        }
    }
}
onMounted(async () => {
    equipmentTypes.value = await EquipmentService.getEquipmentTypes()
})

const handleSubmit = async () => {
    try {
        if (isEdit.value) {
            await EquipmentService.update(form.value.id, form.value)
            await Swal.showSuccess('Equipment updated')
        } else {
            await EquipmentService.create(form.value)
            await Swal.showSuccess('Equipment created')
        }
        props.onSuccess?.()
    } catch (err) {
        Swal.showError('Failed to save equipment')
    }
}
</script>

<template>
    <form @submit.prevent="handleSubmit" class="px-2">
        <div class="mb-3">
            <label class="form-label">Brand *</label>
            <input v-model="form.brand" type="text" class="form-control" required />
        </div>

        <div class="mb-3">
            <label class="form-label">Model *</label>
            <input v-model="form.model" type="text" class="form-control" required />
        </div>

        <div class="mb-3">
            <label class="form-label">Equipment Type *</label>
            <select v-model.number="form.equipmentTypeId" class="form-select" required>
                <option disabled value="">Select a type</option>
                <option v-for="type in equipmentTypes" :key="type.id" :value="type.id">
                    {{ type.description }}
                </option>
            </select>
            <div class="mt-2">
                <button type="button" class="btn btn-sm btn-outline-secondary" @click="addNewType">
                    + Add New Type
                </button>
            </div>
        </div>

        <div class="mb-3">
            <label class="form-label">Purchase Date *</label>
            <input v-model="form.purchaseDate" type="date" class="form-control" required
                :max="new Date().toISOString().split('T')[0]" />
        </div>

        <div class="mb-3">
            <label class="form-label">Serial Number</label>
            <input v-model="form.serialNumber" type="text" class="form-control" />
        </div>

        <div class="text-end">
            <button type="submit" class="btn btn-primary">{{ isEdit ? 'Update' : 'Create' }}</button>
        </div>
    </form>
</template>
