// src/router.js
import { createRouter, createWebHistory } from 'vue-router'
import MedicoComponent from './components/MedicoComponent.vue'
import PacienteComponent from './components/PacienteComponent.vue'
import SecretarioComponent from './components/SecretarioComponent.vue'
import AtendimentoComponent from './components/AtendimentoComponent.vue'

const routes = [
  { path: '/medicos', component: MedicoComponent },
  { path: '/pacientes', component: PacienteComponent },
  { path: '/secretarios', component: SecretarioComponent },
  { path: '/atendimentos', component: AtendimentoComponent }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
