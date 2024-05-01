<template>
  <div id="app">
    <DoctorCreate />
  </div>
</template>

<script>
import DoctorCreate from './components/AppointmentComponent.vue';

export default {
  name: 'App',
  components: {
    DoctorCreate
  }
}
</script>