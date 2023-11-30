<template>
  <div class="task-row" :class="{ 'task-is-done': task.isDone }">
    <div class="task-row__task-info">
      <div>
        <Checkbox id="task-id" />
      </div>

      <div class="task-row__task-title">
        {{ task.title }}
      </div>
    </div>

    <div class="control-panel">
      <div class="control-panel__date">
        <img class="control-panel__icon" src="../assets/calendar.png" alt="Calendar" />
        <span class="control-panel__date">
          {{ formattedDeadline }}
        </span>
      </div>
      <div class="control-panel__actions">
        <Button @onClick="() => $emit('handleViewDetails', task.id)">
          <img class="control-panel__icon" src="../assets/speech-bubble.png" alt="Speech Icon" />
        </Button>
        <Button @onClick="() => $emit('handleEditTask', task.id)">
          <img class="control-panel__icon" src="../assets/pencil.png" alt="Pencil" />
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Checkbox from './common/Checkbox/Checkbox.vue';
  import Button from './common/Button/Button.vue';
  import { Task } from '@/api/types';
  import { computed } from 'vue';
  import { DATE_TIME_FORMAT, formatInTimeZone } from '@/util/dateUtil';

  const props = withDefaults(
    defineProps<{
      task: Task;
    }>(),
    {},
  );

  defineEmits<{
    (e: 'onClick'): void;
    (e: 'handleEditTask', value: number): void;
    (e: 'handleViewDetails', value: number): void;
  }>();

  const formattedDeadline = computed(() =>
    formatInTimeZone(
      props.task.deadline,
      DATE_TIME_FORMAT,
      Intl.DateTimeFormat().resolvedOptions().timeZone,
    ),
  );
</script>

<style lang="scss" scoped>
  @import '../styles/variables';

  .task-row {
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: solid 1px $gray;

    &__task-info {
      display: flex;
      width: 70%;
      min-width: 150px;
    }

    &__task-title {
      white-space: nowrap;
      font-weight: bold;
      margin-left: 0.75rem;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .control-panel {
      display: flex;
      align-items: center;
      flex-direction: column;

      &__actions {
        display: flex;
        align-items: center;

        button {
          margin-left: 0.6rem;
        }
      }

      &__date {
        display: none;
      }

      &__icon {
        height: 1rem;
        width: 1rem;
      }

      &__date {
        margin-left: 0.5rem;
        margin-right: 0.5rem;
        font-size: 15px;
      }

      @media (min-width: 600px) {
        .control-panel__date {
          display: flex;
          align-items: center;
          min-width: 150px;
          justify-content: end;
        }
        flex-direction: row;
      }
    }
  }

  .control-panel__icon {
  }

  .control-panel__date {
  }
</style>