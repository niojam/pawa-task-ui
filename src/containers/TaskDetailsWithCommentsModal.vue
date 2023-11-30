<template>
  <Modal :title="task?.title" v-if="task?.id" v-model:show="show">
    <p class="task-details__description">
      {{ task?.description }}
    </p>
    <div class="task-details__meta">
      <p><span class="bold">Date:</span> {{ formattedDeadline }}</p>
      <p>
        <span class="bold">Created by:</span>
        {{ `${task.createdBy.firstName} ${task.createdBy.lastName}` }}
      </p>
      <p><span class="bold">Priority:</span> {{ task?.priority }}</p>
    </div>
    <div :key="`comment${comment.id}`" v-for="comment in task?.comments">
      <CommenRow :comment="comment" />
    </div>
    <div class="task-details__form-wrapper">
      <form class="task-details__form" @submit.prevent="handleAddComment">
        <Input
          id="comments"
          class="task-form__item"
          v-model="commentContent"
          name="comments"
          :type="'textarea'"
          :label="'Comments:'"
          :placeholder="'Initial comment'"
        />
        <Button :type="'submit'" class="task-details__btn" :disabled="!commentContent">
          Add comment
        </Button>
      </form>
    </div>
  </Modal>
</template>

<script setup lang="ts">
  import Button from '../components/common/Button/Button.vue';
  import Input from '../components/common/Input/Input.vue';
  import CommenRow from '../components/CommenRow.vue';
  import Modal from '../components/common/Modal/Modal.vue';
  import {
    CommentCreateRequest,
    CommentCreateResponse,
    TaskExtendedData,
    Comment,
  } from '@/api/types';
  import { computed, onMounted, ref, Ref } from 'vue';
  import { TaskApi } from '@/api/TaskApi.ts';
  import { CommentApi } from '@/api/CommentApi';
  import { useAuthStore } from '@/store/authStore';
  import { DATE_TIME_FORMAT, formatInTimeZone } from '@/util/dateUtil';

  const authStore = useAuthStore();

  const task: Ref<TaskExtendedData> = ref({});
  const commentContent: Ref<string> = ref('');

  const props = withDefaults(
    defineProps<{
      taskId: number;
      showModal: boolean;
    }>(),
    {},
  );

  const emit = defineEmits<{
    (e: 'update:showModal', value: boolean): void;
  }>();

  const formattedDeadline = computed(() =>
    formatInTimeZone(
      task.value.deadline,
      DATE_TIME_FORMAT,
      Intl.DateTimeFormat().resolvedOptions().timeZone,
    ),
  );

  const show = computed({
    get() {
      return props.showModal;
    },
    set(value: boolean) {
      emit('update:showModal', value);
    },
  });

  onMounted(async () => {
    task.value = await TaskApi.findTaskById(props.taskId);
  });

  const handleAddComment = async () => {
    const request: CommentCreateRequest = {
      content: commentContent.value,
      taskId: task.value.id,
    };
    const response: CommentCreateResponse = await CommentApi.add(request);

    const taskComment: Comment = {
      id: response.id,
      content: response.content,
      createdAt: response.createdAt,
      createdBy: authStore.userInfo,
    };

    task.value.comments.push(taskComment);
    commentContent.value = '';
  };
</script>

<style scoped lang="scss">
  @import '../styles/variables.scss';

  .task-details__description {
    margin-top: 1rem;
  }

  .task-details__meta {
    display: grid;
    row-gap: 2rem;
    grid-template-columns: auto auto auto;

    justify-content: space-between;
    border-bottom: 1px solid $gray;
    padding-bottom: 0.5rem;
    margin-bottom: 1.5rem;

    .bold {
      font-weight: bold;
    }
  }

  @media (max-width: 768px) {
    .task-details__meta {
      display: grid;
      row-gap: 0rem;
      p {
        grid-column: 1 / span 4;
      }
    }
  }

  .task-details__form-wrapper {
    border-top: 1px solid $gray;
    background-color: $gray-lightest;
    display: flex;
    margin: 1.5rem -1rem -1rem -1rem;
    padding: 1.2rem 1rem;
  }

  .task-details__form {
    width: 100%;
  }

  .task-details__btn {
    margin-top: 1rem;
    margin-bottom: 1rem;
    float: right;
  }
</style>
