<template>
  <div class="n-scroll editor-list" @contextmenu.prevent.stop>
    <ListItem
      v-for="listItem in list"
      :key="listItem.id"
      :item="listItem"
      type="default"
      :selected="selected"
      :formatter="formatter"
      />
    <ListItem type="add"/>
  </div>
</template>

<script>
import ListItem from './listItem';

export default {
  props: {
    list: Array,
    type: String,
  },
  components: {
    ListItem,
  },
  data() {
    return {
      selected: null,
      formatter: null,
    };
  },
  created() {
    if (this.type === 'cfs') {
      this.formatter = (item) => {
        return `${item.name}.${item.type}`;
      };
    }
  },
  methods: {
    itemClicked(item) {
      if (item.id !== this.selected) {
        this.selected = item.id;
        this.$parent.setEditItem(item);
      }
    },
    addClicked() {
      this.$emit('new');
    },
    deleteClicked(item) {
      this.$parent.deleteItem(item);
    },
    setSelected(id) {
      this.selected = id;
    },
  },
};
</script>

<style lang="less">
.editor-list {
  width: 100%;
  max-height: 100%;
}
</style>
