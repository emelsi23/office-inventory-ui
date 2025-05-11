<script setup>
import { ref, onMounted } from 'vue'
import Swal from 'sweetalert2'
import MaintenanceService from '@/services/maintenanceService.js'
import MaintenanceForm from '@/components/MaintenanceForm.vue'

const tasks = ref([])
const showModal = ref(false)
const selectedTask = ref(null)

const loadTasks = async () => {
    tasks.value = await MaintenanceService.getAll()
}

const confirmDelete = async (id) => {
    const result = await Swal.fire({
        title: 'Confirm Deletion',
        text: 'This action cannot be undone.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#d33'
    })

    if (result.isConfirmed) {
        await MaintenanceService.remove(id)
        await loadTasks()
        Swal.fire({
            icon: 'success',
            title: 'Task Deleted',
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true
        })
    }
}

const openForm = (taskData = null) => {
    selectedTask.value = taskData
    showModal.value = true
}

const closeForm = async () => {
    showModal.value = false
    selectedTask.value = null
    await loadTasks()
}

onMounted(loadTasks)
</script>

<template>
    <div class="container py-4">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2 class="fw-bold text-dark">
                <i class="bi bi-wrench-adjustable-circle me-2"></i> Maintenance Tasks
            </h2>
            <button class="btn btn-primary px-4 py-2 shadow-sm" @click="openForm()">
                <i class="bi bi-plus-circle me-2"></i> Add Task
            </button>
        </div>

        <div class="table-responsive rounded shadow-sm">
            <table class="table table-striped table-hover align-middle mb-0">
                <thead class="table-dark text-center">
                    <tr>
                        <th>ID</th>
                        <th>Description</th>
                        <th class="text-end">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="task in tasks" :key="task.id">
                        <td class="text-center">{{ task.id }}</td>
                        <td>{{ task.description }}</td>
                        <td class="text-end">
                            <button
                                class="btn btn-sm btn-outline-warning me-2 rounded-pill d-inline-flex align-items-center"
                                @click="openForm(task)">
                                <i class="bi bi-pencil-square me-1"></i> Edit
                            </button>
                            <button class="btn btn-sm btn-outline-danger rounded-pill d-inline-flex align-items-center"
                                @click="confirmDelete(task.id)">
                                <i class="bi bi-trash3 me-1"></i> Delete
                            </button>
                        </td>
                    </tr>
                    <tr v-if="tasks.length === 0">
                        <td colspan="3" class="text-center text-muted py-4">No maintenance tasks found.</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div v-if="showModal" class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container p-4 bg-white rounded shadow" style="width: 35em">
                    <div class="modal-header d-flex justify-content-between align-items-center mb-2">
                        <h5 class="modal-title">
                            {{ selectedTask ? 'Edit Task' : 'Add Task' }}
                        </h5>
                        <button class="btn-close" @click="showModal = false"></button>
                    </div>
                    <MaintenanceForm :task="selectedTask" :onSuccess="closeForm" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.table th,
.table td {
    vertical-align: middle;
}

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
