<script>
  export default {
    name: 'MenuItem',
    functional: true,
    props: {
      icon: {
        type: String,
        default: ''
      },
      title: {
        type: String,
        default: ''
      }
    },
    render(h, context) {
      const {icon, title} = context.props
      const vnodes = []

      if (icon) {
        vnodes.push(<svg-icon icon-class={icon} class-name='sidebarIcon'/>)
      }

      if (title) {
        vnodes.push(<span slot='title' class="titleStyle">{(title)}</span>)
      }
      return vnodes
    }
  }
</script>
