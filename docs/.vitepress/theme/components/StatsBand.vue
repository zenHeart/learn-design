<script setup>
const stats = [
  ['26', 'UX 法则'],
  ['10', '可用性启发式'],
  ['9', '设计语言'],
  ['7', '产品类型'],
  ['3', '已证伪教条'],
  ['14', '设计师 Hub 条目']
]
</script>

<template>
  <div class="ld-stats">
    <span v-for="[n, t] in stats" :key="t" class="ld-stat"><strong>{{ n }}</strong>{{ t }}</span>
  </div>
</template>
