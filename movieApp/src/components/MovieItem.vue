<template>
  <q-card class="remove-margin-top movie-card">
    <q-img :src="poster"> </q-img>

    <q-card-section class="q-pa-md q-mt-md">
      <circular-progress :score="score" />

      <div class="text-bold">{{ movie.original_title }}</div>
      <div class="text-grey-6">{{ movie.release_date }}</div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { PropType, computed, defineComponent } from 'vue';
import CircularProgress from './CircularProgress.vue';
import { Movie } from '../datamodel/models';

export default defineComponent({
  components: {
    CircularProgress,
  },
  props: {
    movie: {
      type: Object as PropType<Movie>,
      required: true,
    },
  },
  setup(props) {
    const poster = computed(() =>
      props.movie.poster_path
        ? 'https://media.themoviedb.org/t/p/w220_and_h330_face/' +
          props.movie.poster_path
        : 'https://via.placeholder.com/220x330?text=No+Image'
    );

    const score = computed(() => Math.round(props.movie.vote_average * 10));

    return {
      value: 81,
      poster,
      score,
    };
  },
});
</script>

<style scoped>
.remove-margin-top {
  margin-top: 0 !important;
}

.movie-card {
  transition: transform 0.4s;
}

.movie-card:hover {
  transform: scale(1.04);
  cursor: pointer;
}
</style>
