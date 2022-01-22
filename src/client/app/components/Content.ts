import { defineComponent, h } from 'kdu'
import { useRoute } from '../router'

export const Content = defineComponent({
  name: 'KduViteContent',
  setup() {
    const route = useRoute()
    return () => (route.component ? h(route.component) : null)
  }
})
