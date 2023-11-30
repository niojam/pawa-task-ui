<template>
  <div v-if="showModal" class="modal-wrapper">
    <div class="overlay" @click="close()"></div>
    <div ref="modal" class="modal">
      <div class="modal__header">
        <h2 ref="title" class="modal__title" tabindex="-1">{{ props.title }}</h2>
        <Button theme="ghost" @onClick="close()">
          <img class="close-icon" src="../../../assets/multiply.png" alt="Close" />
        </Button>
      </div>
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
  import Button from '../Button/Button.vue';
  import { computed } from 'vue';

  const props = defineProps<{
    show: boolean;
    title?: string;
  }>();

  const emit = defineEmits<{
    (e: 'update:show', value: boolean): void;
  }>();

  const showModal = computed({
    get() {
      return props.show;
    },
    set(value: boolean) {
      emit('update:show', value);
    },
  });

  const close = () => {
    showModal.value = false;
  };
</script>


<style lang="scss" scoped>
  @import '../../../styles/variables';

  .modal-wrapper {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
  }

  .overlay {
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: #001919;
    opacity: 0.7;
    overflow: hidden;
  }

  .modal {
    z-index: 10;
    background: $white-primary;
    border: 1px solid $gray;
    padding: 1rem;
    max-height: 700px;
    overflow-y: scroll;
    width: 80%;

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .close-icon {
        width: 1.2rem;
        height: 1.2rem;

        @media (min-width: 640px) {
          margin-top: 0;
        }
      }
    }

    &__title {
      line-height: 0;
    }

    @media (min-width: 725px) {
      width: 700px;
    }
  }
</style>
