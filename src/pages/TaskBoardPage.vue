<template>
  <main class="container dashboard">
    <div class="row header">
      <h1 class="title">PawaTask</h1>
      <div class="header__btn-wrapper">
        <Button @onClick="handleAddNewClick">Add a new task</Button>
        <Button theme="white" @onClick="handleLogout">Logout</Button>
      </div>
    </div>
    <hr class="horizontal-rule" />

    <div v-if="taskStore.tasks?.length === 0">
      You do not have any tasks
      <Button theme="link"> add a new task </Button>
    </div>

    <div :key="`task-${task.id}`" v-for="task in sortedTasksByDate">
      <TaskRow
        @handleEditTask="handleEditTask"
        @handleViewDetails="handleViewDetails"
        :task="task"
      />
    </div>

    <TaskFormModal
      v-if="showTaskFormModal"
      v-model:showModal="showTaskFormModal"
      :taskId="selectedTaskId"
    />
    <TaskDetailsWithCommentsModal
      v-if="showTaskDetails"
      v-model:showModal="showTaskDetails"
      :taskId="selectedTaskId"
    />
  </main>
</template>

<script setup lang="ts">
  import Button from '../components/common/Button/Button.vue';
  import { onMounted, Ref, ref, watch, computed } from 'vue';
  import TaskRow from '../components/TaskRow.vue';
  import TaskFormModal from '../containers/TaskFormModal.vue';
  import TaskDetailsWithCommentsModal from '../containers/TaskDetailsWithCommentsModal.vue';
  import { useTaskStore } from '@/store/taskStore';
  import { useAuthStore } from '@/store/authStore';

  const selectedTaskId: Ref<number | undefined> = ref();
  const showTaskFormModal: Ref<boolean> = ref(false);
  const showTaskDetails: Ref<boolean> = ref(false);

  const taskStore = useTaskStore();
  const authStore = useAuthStore();

  const handleEditTask = (id: number) => {
    showTaskFormModal.value = true;
    selectedTaskId.value = id;
  };

  const handleViewDetails = (id: number) => {
    showTaskDetails.value = true;
    selectedTaskId.value = id;
  };

  const sortedTasksByDate = computed(() => taskStore.getAllTasksSortedByDeadline);

  watch(showTaskFormModal, () => {
    if (!showTaskFormModal.value) {
      selectedTaskId.value = undefined;
    }
  });

  watch(showTaskDetails, () => {
    if (!showTaskDetails.value) {
      selectedTaskId.value = undefined;
    }
  });

  const handleAddNewClick = () => {
    showTaskFormModal.value = true;
  };

  const handleLogout = () => {
    authStore.logout();
  };

  onMounted(() => {
    taskStore.loadTasks();
  });
</script>

<style scoped lang="scss">
  .header {
    padding: 1.25rem 2rem;
    justify-content: space-between;

    &__btn-wrapper {
      margin-top: auto;
      margin-bottom: auto;

      .btn {
        margin-left: 1rem;
      }
    }
  }
</style>
