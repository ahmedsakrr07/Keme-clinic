<script setup>
import onlineStore from '@layouts/components/online-store.vue'
import {
injectionKeyIsVerticalNavHovered,
useLayouts
} from '@layouts'
import {
VerticalNavGroup,
VerticalNavLink,
VerticalNavSectionTitle
} from '@layouts/components'
import { config } from '@layouts/config'
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import { VNodeRenderer } from './VNodeRenderer'

components: {
  onlineStore
}

const props = defineProps({
  tag: {
    type: [
      String,
      null,
    ],
    required: false,
    default: 'aside',
  },
  navItems: {
    type: null,
    required: true,
  },
  isOverlayNavActive: {
    type: Boolean,
    required: true,
  },
  toggleIsOverlayNavActive: {
    type: Function,
    required: true,
  },
})

const refNav = ref()
const { width: windowWidth } = useWindowSize()
const isHovered = useElementHover(refNav)

provide(injectionKeyIsVerticalNavHovered, isHovered)

const {
  isVerticalNavCollapsed: isCollapsed,
  isLessThanOverlayNavBreakpoint,
  isVerticalNavMini,
  isAppRtl,
} = useLayouts()

const hideTitleAndIcon = isVerticalNavMini(windowWidth, isHovered)

const resolveNavItemComponent = item => {
  if ('heading' in item)
    return VerticalNavSectionTitle
  if ('children' in item)
    return VerticalNavGroup
  
  return VerticalNavLink
}

const route = useRoute()

watch(() => route.name, () => {
  props.toggleIsOverlayNavActive(false)
})

const isVerticalNavScrolled = ref(false)
const updateIsVerticalNavScrolled = val => isVerticalNavScrolled.value = val

const handleNavScroll = evt => {
  isVerticalNavScrolled.value = evt.target.scrollTop > 0
}

</script>

<template>
  <Component
    :is="props.tag"
    ref="refNav"
    class="layout-vertical-nav"
    :class="[
      {
        'overlay-nav': isLessThanOverlayNavBreakpoint(windowWidth),
        'hovered': isHovered,
        'visible': isOverlayNavActive,
        'scrolled': isVerticalNavScrolled,
      },
    ]"
  >
    <!-- 👉 Header -->
    <div class="nav-header">
      <slot name="nav-header">
        <RouterLink
          to="/"
          class="app-logo d-flex align-center gap-x-3 app-title-wrapper"
        >
          <VNodeRenderer :nodes="config.app.logo" />

          <Transition name="vertical-nav-app-title">
            <h1
              v-show="!hideTitleAndIcon"
              class="app-title font-weight-bold leading-normal text-xl"
            >
              {{ config.app.title }}
            </h1>
          </Transition>
        </RouterLink>
        <!-- 👉 Vertical nav actions -->
        <!-- Show toggle collapsible in >md and close button in <md -->
        <template v-if="!isLessThanOverlayNavBreakpoint(windowWidth)">
          
          <Component
            :is="config.app.iconRenderer || 'div'"
            v-show="isCollapsed && !hideTitleAndIcon"
            class="header-action"
            v-bind="config.icons.verticalNavUnPinned"
            @click="isCollapsed = !isCollapsed"
          />
          <Component
            :is="config.app.iconRenderer || 'div'"
            v-show="!isCollapsed && !hideTitleAndIcon"
            class="header-action"
            v-bind="config.icons.verticalNavPinned"
            @click="isCollapsed = !isCollapsed"
          />
        </template>
        <template v-else>
          <Component
            :is="config.app.iconRenderer || 'div'"
            class="header-action"
            v-bind="config.icons.close"
            @click="toggleIsOverlayNavActive(false)"
          />
        </template>
      </slot>
    </div>
    <slot name="before-nav-items">
      <div class="vertical-nav-items-shadow" />
    </slot>
    <slot
      name="nav-items"
      :update-is-vertical-nav-scrolled="updateIsVerticalNavScrolled"
    >
      <PerfectScrollbar
        :key="isAppRtl"
        tag="ul"
        class="nav-items"
        :options="{ wheelPropagation: false }"
        @ps-scroll-y="handleNavScroll"
      >

        <Component
          :is="resolveNavItemComponent(item)"
          v-for="(item, index) in navItems"
          :key="index"
          :item="item"
        />
        <component>
          <v-menu>
    <template v-slot:activator="{ props }">
      <button class="btn" color="primary" v-bind="props">
        <v-icon icon="mdi-settings" />
        Settings
        <v-icon icon="mdi-arrow-down-drop" />
      </button>
    </template>
    <v-list>
      <v-list-item>
        <!-- Use router-link for navigation -->
        <router-link to="/doctor/list">
          <v-list-item-title>Doctor</v-list-item-title>
        </router-link>
      </v-list-item>
      <v-list-item>
        <router-link to="/specialization/list">
          <v-list-item-title>Specialization</v-list-item-title>
        </router-link>
      </v-list-item>
      <v-list-item>
        <router-link to="/staff/list">
          <v-list-item-title>Staff</v-list-item-title>
        </router-link>
      </v-list-item>
    </v-list>
  </v-menu>
        <onlineStore />
      </component>
      </PerfectScrollbar>
    </slot>
  </Component>
</template>

<style lang="scss">
@use "@configured-variables" as variables;
@use "@layouts/styles/mixins";

// 👉 Vertical Nav
.btn-check:checked + .btn, :not(.btn-check) + .btn:active, .btn:first-child:active, .btn.active, .btn.show {
    color: var(--bs-btn-active-color);
    background-color: none !important;
    border-color: none !important;
}
a {
    color: rgba(var(--bs-link-color-rgb), var(--bs-link-opacity, 1));
    text-decoration: none !important;
}
.btn {
  margin-left: 13px !important;
    margin-top: -1px !important;
    padding-left: "20px";
    padding-right: "20px";
    background-color: #fff !important;
    cursor: pointer;
    font-size: 17px !important;
    font-weight: 400 !important;
    color: #787878 !important;
    box-shadow: none !important;
}
.btn :hover {
  border-color: none !important;
}
.v-icon {
  font-size: 20px !important;
}
.v-list-item-title {
    hyphens: auto;
    overflow-wrap: normal;
    overflow: hidden;
    padding: 3px;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: normal;
    word-wrap: break-word;
    font-size: 17px !important;
    font-weight: 400;
    letter-spacing: 0.009375em;
    line-height: 1.5rem;
    text-transform: none;
}

.layout-vertical-nav {
  position: fixed;
  z-index: variables.$layout-vertical-nav-z-index;
  display: flex;
  flex-direction: column;
  block-size: 100%;
  inline-size: variables.$layout-vertical-nav-width;
  inset-block-start: 0;
  inset-inline-start: 0;
  transition: transform 0.25s ease-in-out, inline-size 0.25s ease-in-out, box-shadow 0.25s ease-in-out;
  will-change: transform, inline-size;

  .nav-header {
    display: flex;
    align-items: left;

    .header-action {
      cursor: pointer;
    }
  }

  .app-title-wrapper {
    margin-inline-end: auto;
  }

  .nav-items {
    block-size: 100%;

    // ℹ️ We no loner needs this overflow styles as perfect scrollbar applies it
    // overflow-x: hidden;

    // // ℹ️ We used `overflow-y` instead of `overflow` to mitigate overflow x. Revert back if any issue found.
    // overflow-y: auto;
  }
  .link {
    background-color: #eaf2fc;
    width: 45px;
    height: 45px;
    border-radius: 78%;
  }
  .icon {
    position: relative;
    top: 9px;
    right: 20px;
  }

  .nav-item-title {
    overflow: hidden;
    margin-inline-end: auto;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  // 👉 Collapsed
  .layout-vertical-nav-collapsed & {
    &:not(.hovered) {
      inline-size: variables.$layout-vertical-nav-collapsed-width;
    }
  }

  // 👉 Overlay nav
  &.overlay-nav {
    &:not(.visible) {
      transform: translateX(-#{variables.$layout-vertical-nav-width});

      @include mixins.rtl {
        transform: translateX(variables.$layout-vertical-nav-width);
      }
    }
  }
  }
</style>
