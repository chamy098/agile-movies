<template>
  <q-page class="row items-start justify-center col-8 q-pa-md">
    <div class="col-xl-9 col-lg-11 col-xs-12 row">
      <div class="col-12 q-my-md">
        <div class="text-h5 text-bold">Popular movies</div>
      </div>
      <div class="col-xl-2 col-sm-3 col-xs-12">
        <movie-filters @apply-filters="filterMovies" />
      </div>
      <div class="col-xl-10 col-xs-12 col-sm-9">
        <div class="row">
          <movie-item
            class="col-xs-11 col-sm-2 q-ma-md"
            v-for="movie in movies"
            :key="movie.id"
            :movie="movie"
          />
          <div
            v-if="movies.length === 0"
            class="text-h6 text-grey-6 absolute-center"
          >
            No movies found
          </div>
        </div>
        <q-btn
          v-if="movies.length > 0 && movies.length % 20 === 0"
          class="full-width q-mt-md q-mb-md"
          color="secondary"
          label="Load more"
          @click="loadMore"
        />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import MovieFilters from '../components/MovieFilters.vue';
import MovieItem from '../components/MovieItem.vue';
import { MovieApi } from '../api/MovieApi';
import { Movie } from 'src/datamodel/models';
export default defineComponent({
  name: 'IndexPage',
  components: {
    MovieFilters,
    MovieItem,
  },
  setup() {
    const movies = ref<Movie[]>([]);
    const genresIds = ref<number[]>([]);
    const filterMovies = async (selectedGenres: number[]) => {
      genresIds.value = selectedGenres;
      movies.value = (
        await MovieApi.filterMoviesByGenre(genresIds.value.join(','), 1)
      ).results;
    };

    // Load the first page of movies
    const init = async () => {
      movies.value = (await MovieApi.getMovieList(1)).results;
    };

    // Load more movies
    const loadMore = async () => {
      const page = Math.floor(movies.value.length / 20) + 1;
      movies.value = movies.value.concat(
        genresIds.value.length > 0
          ? (
              await MovieApi.filterMoviesByGenre(
                genresIds.value.join(','),
                page
              )
            ).results
          : (await MovieApi.getMovieList(page)).results
      );
    };

    init();
    return { filterMovies, loadMore, movies };
  },
});
</script>
