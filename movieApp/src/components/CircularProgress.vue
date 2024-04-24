<template>
  <q-circular-progress
    show-value
    font-size="12px"
    :value="score"
    size="40px"
    :thickness="0.2"
    :color="color"
    track-color="grey"
    center-color="primary"
    class="absolute text-white text-bold"
    style="top: -35px; left: 10px"
  >
    {{ score }}%
  </q-circular-progress>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

interface ProgressColor {
  minValue: number;
  maxValue: number;
  color: string;
}

export default defineComponent({
  props: {
    score: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    // Define the color of the progress bar based on the score
    const progressColors = [
      { minValue: 0, maxValue: 20, color: 'red' },
      { minValue: 21, maxValue: 40, color: 'orange' },
      { minValue: 41, maxValue: 69, color: 'yellow' },
      { minValue: 70, maxValue: 80, color: 'green' },
      { minValue: 81, maxValue: 100, color: 'teal' },
    ] as ProgressColor[];

    // Find the color based on the score
    const color = computed(
      () =>
        progressColors.filter(
          (item) => props.score >= item.minValue && props.score <= item.maxValue
        )[0].color
    );
    return { progressColors, color };
  },
});
</script>

<style scoped></style>
