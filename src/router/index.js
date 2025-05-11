import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import EquipmentList from '@/views/EquipmentList.vue'
import MaintenanceList from '@/views/MaintenanceList.vue'


const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/equipment', name: 'EquipmentList', component: EquipmentList },
  { path: '/maintenancetasks', name: 'MaintenanceList', component: MaintenanceList },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
