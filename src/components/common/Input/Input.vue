<template>
  <div class="input-wrapper">
    <label v-if="label" :for="name">{{ label }} </label>
    <component
      :is="computedComponentType"
      :type="type"
      :name="name"
      :id="name"
      :class="computedClassName"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :autocomplete="autocomplete"
      :rows="computedRows"
      :value="modelValue"
      @input="handleInput"
      @change="handleChange"
    />
    <p v-if="validationError" class="input__validation-error" id="error">
      {{ validationError }}
    </p>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { InputProps } from './types';

  const props = withDefaults(defineProps<InputProps>(), {
    labelVisible: true,
    required: false,
    disabled: false,
    type: 'text',
    rows: 5,
  });

  const computedRows = computed(() => {
    return props.type === 'textarea' ? props.rows : null;
  });

  const computedComponentType = computed(() => {
    return props.type === 'textarea' ? 'textarea' : 'input';
  });

  const computedClassName = computed(() => {
    if (props.type === 'textarea') {
      return 'text-area';
    } else {
      return 'input';
    }
  });

  const emit = defineEmits(['update:modelValue', 'input', 'change']);

  const handleChange = (event: InputEvent): void => {
    const value: string | null = (event.target as HTMLInputElement).value || null;
    emit('update:modelValue', value);
    emit('change', value);
  };

  const handleInput = (event: InputEvent): void => {
    const value: string | null = (event.target as HTMLInputElement).value || null;
    emit('update:modelValue', value);
    emit('input', value);
  };
</script>

<style scoped lang="scss">
  @import '../../../styles/variables.scss';

  .input-wrapper {
    width: 100%;

    .input,
    .text-area {
      padding: 0.4rem;
      margin: 0;
      border: 1px solid $gray;
      font-size: $font-size-primary;
      width: 100%;
      box-sizing: border-box;
    }

    .input__validation-error {
      color: $orange-primary;
      margin: 0;
    }

    .text-area {
      resize: none;
    }
  }
</style>
