<template>
  <div class="select-wrapper">
    <label v-if="label" :for="name">{{ label }} </label>
    <select
      :name="name"
      :id="name"
      class="select"
      :disabled="disabled"
      v-model="value"
      @change="$emit('change', ($event.target as HTMLSelectElement)?.value)"
    >
      <option
        v-for="option in options"
        :selected="!!option.selected"
        :value="option.value"
        :disabled="!!option.disabled"
      >
        {{ option.name }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';

  const props = defineProps<{
    name: string;
    label?: string;
    labelVisible?: boolean;
    required?: boolean;
    options?: {
      name: string;
      value: string | boolean;
      selected?: boolean;
      disabled?: boolean;
    }[];
    disabled?: boolean;
    modelValue?: string | boolean;
  }>();

  const emit = defineEmits(['update:modelValue', 'change']);

  const value = computed({
    get() {
      return props.modelValue;
    },
    set(value) {
      emit('update:modelValue', value);
    },
  });
</script>

<style scoped lang="scss">
  @import '../../../styles/variables.scss';

  .select-wrapper {
    width: 100%;
  }

  .select {
    -webkit-appearance: menulist-button;
    height: 30px;
    display: block;
    width: 100%;
    font-size: $font-size-primary;

    &--error {
      color: $orange-primary;
      border: 1px solid $orange-primary;
    }
  }
</style>
