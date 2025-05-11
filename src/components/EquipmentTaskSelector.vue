<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
    equipmentList: Array,
    modelValue: Array,
    equipmentTypes: Array
})

const emit = defineEmits(['update:modelValue'])
const selectedIds = ref([...props.modelValue || []])

watch(selectedIds, (val) => {
    emit('update:modelValue', val)
})

watch(
    () => props.modelValue,
    (val) => {
        selectedIds.value = [...val || []]
    },
    { immediate: true }
)


const getTypeDescription = (id) => {
    const type = props.equipmentTypes?.find(t => Number(t.id) === Number(id))
    return type ? type.description : 'Unknown'
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
                    <tr v-for="item in equipmentList" :key="item.id">
                        <td class="text-center">
                            <input type="checkbox" :value="item.id" v-model="selectedIds" />
                        </td>
                        <td>{{ item.brand }} - {{ item.model }}</td>
                        <td>{{ getTypeDescription(item.equipmentTypeId) }}</td>
                    </tr>
                </tbody>
            </table>
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