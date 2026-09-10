<script setup>
const stats = [
  ['3', '实战工作流'],
  ['26', 'UX 法则'],
  ['10', '可用性启发式'],
  ['10', '格式塔法则'],
  ['9', '设计系统语言'],
  ['7', '产品约束矩阵'],
  ['3', '已证伪教条'],
  ['42', '实证工具']
]
</script>

<template>
  <div class="ld-stats">
    <span v-for="[n, t] in stats" :key="t" class="ld-stat"><strong>{{ n }}</strong>{{ t }}</span>
  </div>
</template>
