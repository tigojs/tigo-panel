<template>
  <div
    :class="{
      'editor-list-item': true,
      'editor-list-item__selected': selected === item.id,
    }"
    v-if="type !== 'add'"
    @click="handleItemClick"
    v-context
  >
    <span>{{ displayName }}</span>
    <ContextMenu
      width="100"
      @item-clicked="handleContextClick"
      >
      <ContextMenuItem name="delete">{{$t('delete')}}</ContextMenuItem>
    </ContextMenu>
  </div>
  <div class="editor-list-item editor-list-add" @click="handleAddClick" v-else>
    <i class="el-icon-plus"></i>
  </div>
</template>

<script>
export default {
  props: {
    type: String,
    item: Object,
    selected: [String, Number],
    formatter: Function,
  },
  computed: {
    displayName() {
      if (typeof this.formatter === 'function') {
        return this.formatter(this.item);
      }
      return this.item.name;
    },
  },
  methods: {
    handleItemClick() {
      this.$parent.itemClicked(this.item);
    },
    handleAddClick() {
      this.$parent.addClicked();
    },
    async handleContextClick(name) {
      if (name === 'delete') {
        this.$confirm(
          `${this.$t('editor.confirm.delete')} ${this.displayName} ${this.$t('editor.confirm.delete.end')}`,
          this.$t('confirm'),
        ).then(() => {
          this.$parent.deleteClicked(this.item);
        }).catch(() => {});
      }
    },
  },
};
</script>

<style lang="less">
.editor-list-item {
  height: 42px;
  line-height: 42px;
  padding: 0 16px;
  font-size: 13px;
  color: var(--primary);
  border-bottom: 1px solid #363636;
  user-select: none;
}
.editor-list-item:hover {
  background: #3a3a3a;
}
.editor-list-item__selected {
  background: #424242 !important;
}
.editor-list-add {
  font-size: 16px;
  text-align: center;
}
</style>
