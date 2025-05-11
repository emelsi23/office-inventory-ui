<template>
  <div class="container py-5 text-center">
    <h2 class="fw-bold mb-4">
      <i class="bi bi-box-seam me-2"></i> Office Inventory
    </h2>
    <p class="text-muted mb-5">Manage equipment and maintenance easily.</p>

    <div class="row justify-content-center gap-4">
      <div class="col-md-4">
        <div class="card shadow-sm border-0">
          <div class="card-body">
            <i class="bi bi-hdd-stack fs-1 text-primary"></i>
            <h5 class="card-title mt-3">Equipment</h5>
            <p class="card-text text-muted">Access the list of all registered equipment.</p>
            <router-link to="/equipment" class="btn btn-primary w-100">Go to Equipment</router-link>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card shadow-sm border-0">
          <div class="card-body">
            <i class="bi bi-wrench-adjustable-circle fs-1 text-warning"></i>
            <h5 class="card-title mt-3">Maintenance Tasks</h5>
            <p class="card-text text-muted">View and manage maintenance tasks for equipment.</p>
            <router-link to="/maintenancetasks" class="btn btn-warning text-white w-100">Go to Tasks</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.card-title {
  font-weight: 600;
}
</style>
