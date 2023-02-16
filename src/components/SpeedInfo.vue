<template>
  <div>
    <q-separator />
    <q-item class="text-left q-ml-sm">
      <q-item-section>
        <q-item-label :caption="hideSide">Distances</q-item-label>
        <q-item-label v-if="hideSide">Distances</q-item-label>
      </q-item-section>
      <q-item-section v-if="!hideSide" side> 1800KM </q-item-section>
    </q-item>
    <q-separator />
    <q-item class="text-left q-ml-sm">
      <q-item-section>
        <q-item-label :caption="hideSide">Top Speed</q-item-label>
        <q-item-label v-if="hideSide">Distances</q-item-label>
      </q-item-section>
      <q-item-section v-if="!hideSide" side> 1800KM </q-item-section>
    </q-item>
  </div>
</template>

<script>
export default {
  props: {
    hideSide: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>
</style>
