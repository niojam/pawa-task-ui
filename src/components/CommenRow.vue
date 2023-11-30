<template>
  <section :key="'id'" class="comment">
    <div class="comment__meta">
      <span class="comment__author">
        {{ `${comment.createdBy.firstName} ${comment.createdBy.lastName}` }}
      </span>
      <small class="comment__date">
        <time>{{ formattedDate }}</time>
      </small>
    </div>
    <p class="comment__text">{{ comment.content }}</p>
  </section>
</template>

<script setup lang="ts">
  import { Comment } from '@/api/types';
  import { computed } from 'vue';
  import { DATE_TIME_FORMAT, formatInTimeZone } from '@/util/dateUtil';

  const props = withDefaults(
    defineProps<{
      comment: Comment;
    }>(),
    {},
  );

  const formattedDate = computed(() =>
    formatInTimeZone(
      props.comment.createdAt,
      DATE_TIME_FORMAT,
      Intl.DateTimeFormat().resolvedOptions().timeZone,
    ),
  );
</script>

<style lang="scss" scoped>
  @import '../styles/variables';

  .comment {
    padding-bottom: 1.5rem;

    &:last-child {
      padding-bottom: 0;
    }

    &__author,
    &__date {
      font-size: small;
      margin-right: 0.5rem;
    }
  }

  .comment__date {
    display: inline-block;
    margin-bottom: 0.2rem;
    color: darken($gray, 20%);
  }
</style>