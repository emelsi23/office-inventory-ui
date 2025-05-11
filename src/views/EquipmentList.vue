<script setup>
import { ref, onMounted } from 'vue'
import Swal from 'sweetalert2'
import EquipmentService from '@/services/equipmentService'
import EquipmentForm from '@/components/EquipmentForm.vue'

const equipment = ref([])
const showModal = ref(false)
const selectedEquipment = ref(null)
const equipmentTypes = ref([])



const loadData = async () => {
    equipment.value = await EquipmentService.getAll()
}

const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString()
}

const confirmDelete = async (id) => {
    const result = await Swal.fire({
        title: 'Do you want to delete this equipment?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#dc3545'
    })

    if (result.isConfirmed) {
        await EquipmentService.remove(id)
        await loadData()
        Swal.fire('Deleted!', '', 'success')
    }
}

const openForm = (equipmentData = null) => {
    selectedEquipment.value = equipmentData
    showModal.value = true
}

const closeForm = async () => {
    showModal.value = false
    selectedEquipment.value = null
    await loadData()
}


const getTypeDescription = (id) => {
    const type = equipmentTypes.value.find(t => t.id === id)
    return type ? type.description : 'Unknown'
}

onMounted(async () => {

    loadData()
    equipmentTypes.value = await EquipmentService.getEquipmentTypes()

})
</script>

<template>
    <div class="container py-4">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2 class="fw-bold text-dark">
                <i class="bi bi-hdd-stack me-2"></i> Equipment List
            </h2>
            <button class="btn btn-primary px-4 py-2 shadow-sm" @click="openForm()">
                <i class="bi bi-plus-circle me-2"></i> Add Equipment
            </button>
        </div>

        <div class="table-responsive">
            <table class="table table-striped table-hover shadow">
                <thead class="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Brand</th>
                        <th>Model</th>
                        <th>Type</th>
                        <th>Purchase Date</th>
                        <th>Serial Number</th>
                        <th class="text-end">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in equipment" :key="item.id">
                        <td>{{ item.id }}</td>
                        <td>{{ item.brand }}</td>
                        <td>{{ item.model }}</td>
                        <td>{{ getTypeDescription(item.equipmentTypeId) }}</td>
                        <td>{{ formatDate(item.purchaseDate) }}</td>
                        <td>{{ item.serialNumber }}</td>
                        <td class="text-end">
                            <button
                                class="btn btn-sm btn-outline-warning me-2 rounded-pill d-inline-flex align-items-center"
                                @click="openForm(item)">
                                <i class="bi bi-pencil-square me-1"></i> Edit
                            </button>
                            <button class="btn btn-sm btn-outline-danger rounded-pill d-inline-flex align-items-center"
                                @click="confirmDelete(item.id)">
                                <i class="bi bi-trash3 me-1"></i> Delete
                            </button>
                        </td>
                    </tr>
                    <tr v-if="equipment.length === 0">
                        <td colspan="7" class="text-center text-muted">No equipment found.</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div v-if="showModal" class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container p-4 bg-white rounded shadow" style="width: 40em">
                    <div class="modal-header d-flex justify-content-between align-items-center mb-2">
                        <h5 class="modal-title">
                            {{ selectedEquipment ? 'Edit Equipment' : 'Add Equipment' }}
                        </h5>
                        <button class="btn-close" @click="showModal = false"></button>
                    </div>
                    <EquipmentForm :equipment="selectedEquipment" :onSuccess="closeForm" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.modal-mask {
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-wrapper {
    position: relative;
}
</style>
