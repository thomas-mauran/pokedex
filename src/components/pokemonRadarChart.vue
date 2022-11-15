<script setup>
import apexchart from "vue3-apexcharts"

import { defineProps } from "vue"

const props = defineProps({
  seriesData: Array
})


console.log({ props: props.seriesData })

let chartOptions = {
  chart: {
    id: "vuechart-example",
    type: "radar",
    toolbar: {
      show: false
    },


  },

  stroke: {
    width: 2
  },
  fill: {
    opacity: 0.1
  },

  xaxis: {
    categories: ["hp", "attack", "defense", "special-attack", "special-defense", "speed"],
    labels: {
      style: {
        colors: ['#000000', '#000000','#000000','#000000','#000000','#000000',],
      }
    },
  },

  yaxis: {
    
    labels: {
      style: {
        colors: ['#000000', '#000000','#000000','#000000','#000000','#000000',],
      }
    },
  },
  theme: {
    palette: 'palette7'
  },

  dataLabels: {
    enabled: true,

  },

}

let series = [
  {
    name: "Value",
    data: props.seriesData,
  },
]

</script>

<template>
  <apexchart class="chart" width="600px" type="radar" :options="chartOptions" :series="series" />
</template>

<style>

</style>