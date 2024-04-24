<template>
  <div>
    <q-list bordered class="rounded-borders">
      <q-expansion-item
        :class="true"
        expand-separator
        :default-opened="true"
        label="Filters"
        header-class="text-subtitle2"
      >
        <div class="q-pa-xs">
          <div class="q-pa-sm text-body2">Genres</div>
          <q-badge
            class="filter-item q-pa-sm"
            :class="selectedGenres.includes(item.id) ? 'selected-item' : ''"
            v-for="item in genres"
            :key="item.id"
            outline
            color="black"
            :label="item.name"
            @click="
              selectedGenres.includes(item.id)
                ? selectedGenres.splice(selectedGenres.indexOf(item.id), 1)
                : selectedGenres.push(item.id)
            "
          />
        </div>
      </q-expansion-item>
    </q-list>
    <q-btn
      class="full-width q-mt-md q-mb-md"
      color="secondary"
      rounded
      label="Search"
      @click="$emit('apply-filters', selectedGenres)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Genre } from '../datamodel/models';
import { GenreApi } from '../api/MovieApi';

export default defineComponent({
  setup() {
    const selectedGenres = ref<number[]>([]);
    const genres = ref<Genre[]>([]);
    const init = async () => {
      genres.value = (await GenreApi.getGenreList()).genres;
    };
    init();
    return {
      genres,
      selectedGenres,
    };
  },
});
</script>

<style scoped>
.filter-item {
  margin: 3px;
  border: 1px solid #9e9e9e;
  font-size: 13px;
  cursor: pointer;
  border-radius: 15px;
}

.filter-item:hover {
  background-color: #01b4e4;
}

.selected-item {
  background-color: #01b4e4;
}
</style>
