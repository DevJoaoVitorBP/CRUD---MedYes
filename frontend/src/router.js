import {createRouter, createWebHistory} from 'vue-router'
import DoctorComponent from './components/DoctorComponent.vue'
import PatientComponent from './components/PatientComponent.vue'
import SecretaryComponent from './components/SecretaryComponent.vue'
import AppointmentComponent from './components/AppointmentComponent.vue'

const routes = [
    {
        path: '/doctor',
        name: 'doctor',
        component: DoctorComponent
    },
    {
        path: '/patient',
        name: 'patient',
        component: PatientComponent
    },
    {
        path: '/secretary',
        name: 'secretary',
        component: SecretaryComponent
    },
    {
        path: '/appointment',
        name: 'appointment',
        component: AppointmentComponent
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router