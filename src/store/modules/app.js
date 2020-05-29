import Cookies from 'js-cookie'

const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  device: 'desktop',
  navbarObj: {},
  navbarDoQuery: false,
  resizeChartList: [],
  isLoading: false,
  mobileNavbarObj: {},
  initNavbar: false,
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  QUERY: (state, obj) => {
    state.navbarObj = obj
    state.navbarDoQuery = !state.navbarDoQuery
  },
  RESIZE_CHART: (state, arr) => {
    state.resizeChartList = arr
  },
  LOADING: (state, boolean) => {
    state.isLoading = boolean
  },
  MOBILE_QUERY: (state, obj) => {
    state.mobileNavbarObj = obj
  },
  INIT_NAVBAR_QUERY: (state, obj) => {
    state.initNavbar = !state.initNavbar
  },
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  queryData({ commit }, obj) {
    commit('QUERY', obj)
  },
  resizeChart({ commit }, arr) {
    commit('RESIZE_CHART', arr)
  },
  isLoading({ commit }, boolean) {
    commit('LOADING', boolean)
  },
  mobileQueryData({ commit }, obj) {
    commit('MOBILE_QUERY', obj)
  },
  initNavbarQuery({ commit }, obj) {
    commit('INIT_NAVBAR_QUERY', obj)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
