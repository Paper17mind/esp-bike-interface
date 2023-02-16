<template>
  <q-header class="bg-black">
    <q-toolbar class="bg-black">
      <q-btn icon="arrow_back_ios" @click="$router.go(-1)" round flat></q-btn>
      <q-space />
      <span class="text-h6">
        {{ $route.name }}
      </span>
    </q-toolbar>
  </q-header>
</template>

<script>
export default {};
</script>

<style>
</style>
