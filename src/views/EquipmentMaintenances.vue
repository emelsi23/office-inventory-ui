<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getMaintenancesByEquipment } from '@/services/maintenanceService'


const tasks = ref([])
const route = useRoute()
const equipmentId = route.params.id

const fetchMaintenances = async () => {
    try {
        tasks.value = await getMaintenancesByEquipment(equipmentId)
    } catch (error) {
        console.error('Error loading maintenances:', error)
    }
}

onMounted(fetchMaintenances)
</script>

<style scoped>
.table th,
.table td {
    vertical-align: middle;
}
</style>

<template>
    <div class="container py-4">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2 class="fw-bold text-primary">
                🛠️ Maintenance Tasks for Equipment #{{ equipmentId }}
            </h2>
            <button class="btn btn-outline-secondary" @click="goBack">← Back</button>
        </div>

        <div class="table-responsive">
            <table class="table table-hover table-bordered align-middle shadow">
                <thead class="table-dark text-center">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Description</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="task in tasks" :key="task.id">
                        <td class="text-center">{{ task.id }}</td>
                        <td>{{ task.description }}</td>
                        <td class="text-center">
                            <button class="btn btn-outline-warning btn-sm me-2">Edit</button>
                            <button class="btn btn-outline-danger btn-sm">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
