<template>
  <label v-if="label" :for="name">{{ label }} </label>
  <VueDatePicker
    :id="name"
    :name="name"
    :placeholder="placeholder"
    teleport-center
    v-model="value"
  ></VueDatePicker>
</template>

<script setup lang="ts">
  import VueDatePicker from '@vuepic/vue-datepicker';
  import '@vuepic/vue-datepicker/dist/main.css';
  import { computed } from 'vue';
  import { formatInTimeZone, ISO_DATE_TIME_FORMAT, UCT_TIMEZONE } from '@/util/dateUtil';

  const props = defineProps<{
    name: string;
    placeholder: string;
    value?: string;
    label?: string;
  }>();

  const value = computed({
    get() {
      return props.value;
    },
    set(value: string) {
      emit('update:value', formatInTimeZone(value, ISO_DATE_TIME_FORMAT, UCT_TIMEZONE));
    },
  });

  const emit = defineEmits<{
    (e: 'update:value', value: string): void;
  }>();
</script>

<style scoped lang="scss">
  @import '../../styles/variables.scss';
</style>
