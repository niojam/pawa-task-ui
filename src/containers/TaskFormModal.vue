<template>
  <Modal :title="title" v-model:show="show">
    <form class="task-form" @submit.prevent="onSubmit">
      <Input
        class="task-form__item"
        id="title"
        name="title"
        :label="'Title:'"
        :placeholder="'Title'"
        :labelVisible="true"
        v-model="title"
        :validationError="errors.title"
      />

      <Input
        class="task-form__item"
        id="description"
        name="description"
        :type="'textarea'"
        :label="'Description:'"
        :placeholder="'Description'"
        :labelVisible="true"
        v-model="description"
        :validationError="errors.description"
      />

      <div class="task-form__item">
        <DatePicker
          :name="'deadline-picker'"
          :label="'Deadline'"
          v-model:value="deadline"
          placeholder="Deadline"
        />
      </div>

      <div class="task-form__item">
        <Select
          id="priority"
          name="priority"
          :label="'Priority:'"
          v-model="priority"
          v-bind:options="priorityOption"
        />
      </div>

      <Input
        v-if="!taskId"
        id="comment"
        class="task-form__item"
        name="comment"
        :type="'textarea'"
        :label="'Comments:'"
        :placeholder="'Initial comment'"
        v-model="comment"
      />
      <footer :class="['task-form__footer']">
        <Button
          v-if="!!taskId"
          class="task-form__remove-btn"
          :type="'button'"
          theme="white"
          @onClick="handleRemove(taskId)"
          >Remove task
        </Button>
        <Button :type="'submit'" :disabled="false"> Save </Button>
      </footer>
    </form>
  </Modal>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import Button from '../components/common/Button/Button.vue';
  import Input from '../components/common/Input/Input.vue';
  import Select from '../components/common/Select/Select.vue';
  import DatePicker from '../components/common/DatePicker.vue';
  import { Priority, Task, TaskCreateRequest, TaskUpdateRequest } from '@/api/types';
  import { useForm } from 'vee-validate';
  import * as yup from 'yup';
  import { useTaskStore } from '@/store/taskStore';
  import Modal from '../components/common/Modal/Modal.vue';

  const taskStore = useTaskStore();

  const priorityOption = [
    { name: 'LOW', value: Priority.LOW },
    { name: 'MEDIUM', value: Priority.MEDIUM },
    { name: 'HIGH', value: Priority.HIGH },
    { name: 'CRITICAL', value: Priority.CRITICAL },
  ];

  const props = withDefaults(
    defineProps<{
      taskId?: number;
      showModal: boolean;
    }>(),
    {},
  );

  const emit = defineEmits<{
    (e: 'onClick'): void;
    (e: 'handleEditTask', value: number): void;
    (e: 'update:showModal', value: boolean): void;
  }>();

  const show = computed({
    get() {
      return props.showModal;
    },
    set(value: boolean) {
      emit('update:showModal', value);
    },
  });

  const task = computed<Task>(() => taskStore.tasks.find((task) => task.id === props.taskId));

  const { errors, handleSubmit, defineField } = useForm({
    validationSchema: yup.object({
      title: yup.string().required(),
      description: yup.string().min(6).required(),
      deadline: yup.string().required(),
      priority: yup.string().required(),
    }),
    initialValues: {
      title: task?.value?.title ?? '',
      description: task.value?.description ?? '',
      priority: task.value?.priority ?? Priority.LOW,
      deadline: task.value?.deadline ?? '',
      comment: '',
    },
  });

  const [title] = defineField('title');
  const [description] = defineField('description');
  const [priority] = defineField('priority');
  const [comment] = defineField('comment');
  const [deadline] = defineField('deadline');

  const onSubmit = handleSubmit(async (values) => {
    const taskRequest: TaskUpdateRequest = {
      title: values.title,
      description: values.description,
      priority: values.priority,
      deadline: values.deadline,
    };
    if (props.taskId) {
      await taskStore.updateTask(props.taskId, taskRequest);
    } else {
      (taskRequest as TaskCreateRequest).comment = values.comment;
      await taskStore.addTask(taskRequest as TaskCreateRequest);
    }
    show.value = false;
  });

  const handleRemove = async (taskId) => {
    await taskStore.removeTask(taskId);
    show.value = false;
  };
</script>

<style scoped lang="scss">
  @import '../styles/variables.scss';

  .task-form {
    margin-top: 1.3rem;
    color: $gray-darker;
    padding: 0.5rem;

    .task-form__item {
      margin-bottom: 0.75rem;
    }

    &__footer {
      display: flex;
      justify-content: end;
    }

    &__remove-btn {
      margin-right: 1rem;
    }
  }
</style>
