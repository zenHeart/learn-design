<script setup>
// 明暗切换：View Transitions 圆形扩散（motion token：450ms / standard easing）
// 不支持 startViewTransition 或 prefers-reduced-motion 时退化为直接切换
import DefaultTheme from 'vitepress/theme'
import { nextTick, provide, ref } from 'vue'
import { useData } from 'vitepress'

const { isDark } = useData()
const reduced = ref(false)
if (typeof window !== 'undefined') {
  reduced.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

provide('toggle-appearance', async ({ clientX: x, clientY: y }) => {
  const noTransition = reduced.value || !document.startViewTransition
  if (noTransition) {
    isDark.value = !isDark.value
    return
  }
  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))}px at ${x}px ${y}px)`
  ]
  await document.startViewTransition(async () => {
    isDark.value = !isDark.value
    await nextTick()
  }).ready
  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 450,
      easing: 'cubic-bezier(0.2, 0, 0, 1)',
      pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`
    }
  )
})
</script>

<template>
  <DefaultTheme.Layout />
</template>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}
</style>
