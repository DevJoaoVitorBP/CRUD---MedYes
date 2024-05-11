<template>
  <div>
    <header>
    <h2>Medyes</h2>
    <nav>
      <router-link to="/doctor">Médicos</router-link> |
      <router-link to="/patient">Pacientes</router-link> |
      <router-link to="/secretary">Secretaria</router-link> |
      <router-link to="/appointment">Consultas</router-link>
    </nav>
  </header>
  <main>
    <router-view></router-view>
  </main>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>