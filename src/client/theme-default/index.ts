import './styles/vars.css'
import './styles/layout.css'
import './styles/code.css'
import './styles/custom-blocks.css'
import './styles/sidebar-links.css'

import { Theme } from 'kduvite'
import Layout from './Layout.kdu'
import NotFound from './NotFound.kdu'

const theme: Theme = {
  Layout,
  NotFound
}

export default theme
