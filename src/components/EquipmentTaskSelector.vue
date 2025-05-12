<script setup>
import { ref, watch, computed } from 'vue'

const props = defineProps({
    equipmentList: Array,
    modelValue: Array,
    equipmentTypes: Array
})

const emit = defineEmits(['update:modelValue'])

const selectedIds = ref([])
const currentPage = ref(1)
const itemsPerPage = 5

const paginatedEquipment = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    const end = start + itemsPerPage
    return props.equipmentList?.slice(start, end) || []
})

const totalPages = computed(() =>
    Math.ceil((props.equipmentList?.length || 0) / itemsPerPage)
)

const changePage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page
    }
}

watch(
    () => props.modelValue,
    (val) => {
        if (JSON.stringify(val) !== JSON.stringify(selectedIds.value)) {
            selectedIds.value = [...(val || [])].map(id => Number(id))
        }
    },
    { immediate: true }
)

watch(selectedIds, (val) => {
    if (JSON.stringify(val) !== JSON.stringify(props.modelValue)) {
        emit('update:modelValue', val)
    }
})

const getTypeDescription = (id) => {
    const match = props.equipmentTypes?.find(t => Number(t.id) === Number(id))
    return match?.description || 'Unknown'
}
</script>

<template>
    <div>
        <h5 class="mb-3 fw-semibold">Assign Equipment</h5>
        <div class="table-responsive rounded shadow-sm">
            <table class="table table-striped table-hover align-middle">
                <thead class="table-light text-center">
                    <tr>
                        <th>Select</th>
                        <th>Brand - Model</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in paginatedEquipment" :key="item.id" class="text-center">
                        <td>
                            <input type="checkbox" :value="Number(item.id)" v-model="selectedIds" />
                        </td>
                        <td>{{ item.brand }} - {{ item.model }}</td>
                        <td>{{ getTypeDescription(item.equipmentTypeId) }}</td>
                    </tr>
                    <tr v-if="paginatedEquipment.length === 0">
                        <td colspan="3" class="text-muted text-center">No equipment available.</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div v-if="totalPages > 1" class="d-flex justify-content-center mt-3">
            <ul class="pagination pagination-sm">
                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                    <button type="button" class="page-link" @click="changePage(currentPage - 1)">« Prev</button>
                </li>

                <li v-for="page in totalPages" :key="page" class="page-item" :class="{ active: page === currentPage }">
                    <button type="button" class="page-link" @click="changePage(page)">{{ page }}</button>
                </li>

                <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                    <button type="button" class="page-link" @click="changePage(currentPage + 1)">Next »</button>
                </li>
            </ul>
        </div>

        <div v-if="selectedIds.length === 0" class="text-danger mt-2 small">
            * You must select at least one equipment to assign.
        </div>
    </div>
</template>

<style scoped>
th,
td {
    vertical-align: middle;
}
</style>
