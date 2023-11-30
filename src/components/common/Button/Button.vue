<template>
  <button :class="['btn', btnTheme]" @click="$emit('onClick')" :type="type" :disabled="disabled">
    <slot />
  </button>
</template>

<script setup lang="ts">
  import { ButtonProps } from './types.ts';
  import { computed } from 'vue';

  const props = withDefaults(defineProps<ButtonProps>(), {
    type: 'button',
    theme: 'primary',
    block: false,
    disabled: false,
    classes: '',
  });

  defineEmits<{
    (e: 'onClick'): void;
  }>();

  const btnTheme: string = computed(() => {
    const applyDisabledIfNeeded = (className: string) => {
      const disabled: string = props.disabled ? '--disabled' : '';
      return className + disabled;
    };

    if (props.theme === 'primary') {
      return applyDisabledIfNeeded('btn__primary');
    }
    if (props.theme === 'ghost') {
      return applyDisabledIfNeeded('btn__ghost');
    }
    if (props.theme === 'white') {
      return applyDisabledIfNeeded('btn__white');
    }
    if (props.theme === 'link') {
      return applyDisabledIfNeeded('btn__link');
    }
    return 'btn__primary';
  });
</script>

<style lang="scss" scoped>
  @import '../../../styles/variables';

  .btn {
    display: inline-block;
    cursor: pointer;
    font-size: $font-size-primary;
    font-weight: bold;
    padding: 0.4rem 0.8rem;
    border-radius: 15px;

    &__primary {
      border: 1px solid $orange-primary;
      background-color: $orange-primary;
      color: $white-primary;

      &--disabled {
        border: red;
        background-color: red;
        cursor: not-allowed;
      }
    }

    &__ghost {
      background: transparent;
      border: none;
      color: $white-primary;
      padding: 0;

      &--disabled {
        border: red;
        background-color: red;
        cursor: not-allowed;
      }
    }

    &__white {
      border: 1px solid $orange-primary;
      background-color: $white-primary;
      color: $orange-primary;

      &--disabled {
        border: red;
        background-color: red;
        cursor: not-allowed;
      }
    }

    &__link {
      border: none;
      background-color: transparent;
      color: $orange-primary;
      text-decoration: underline;
      font-weight: normal;
    }
  }
</style>