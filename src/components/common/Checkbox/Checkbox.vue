<template>
  <input :id="id" class="checkbox" type="checkbox" v-model="checkBoxValue" />
</template>

<script setup lang="ts">
  import { computed } from 'vue';

  const props = defineProps<{
    id: string;
    value?: boolean;
  }>();

  const emit = defineEmits<{
    (e: 'update:value', value: boolean): void;
  }>();

  const checkBoxValue = computed({
    get() {
      return props.value;
    },
    set(value: boolean) {
      emit('update:value', value);
    },
  });
</script>

<style scoped lang="scss">
  @import '../../../styles/variables';

  .checkbox {
    height: 1rem;
    width: 1rem;
  }
</style>
