<script setup>
  import apexchart from "vue3-apexcharts"

  import {defineProps} from "vue"

  const props = defineProps({
      seriesData: Array
  })


  console.log({props: props.seriesData})

  let chartOptions = {
    chart: {
      id: "vuechart-example",
      type: "radar",
      toolbar: {
        show: false
      }
      
    },

    stroke: {
      width: 3
    },
    fill: {
      opacity: 0.1
    },
    markers: {
      size: 3
    },
    xaxis: {
      categories: ["hp", "attack", "defense", "special-attack", "special-defense", "speed"]
    },
    theme: {
     palette: 'palette1'
   },
   dataLabels: {
              enabled: true
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
  <apexchart class="chart" width="700px"  type="radar" :options="chartOptions" :series="series"/>
</template>

<style>
</style>