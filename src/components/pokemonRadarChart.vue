<script setup>
  import apexchart from "vue3-apexcharts"

  import {defineProps} from "vue"

  const props = defineProps({
      seriesData: Array
  })

  console.log(props.seriesData)

  let chartOptions = {
    chart: {
      id: "vuechart-example",
      type: "radar",
      
    },
    markers: {
              size: 4,
              colors: ['#fff'],
              strokeColor: '#FF4560',
              strokeWidth: 2,
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
     palette: 'palette2'
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
    <h1>Salut</h1>

  <apexchart type="radar" width="600" height="600" :options="chartOptions" :series="series"/>
</template>

<style></style>