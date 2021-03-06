<template>
  <div class="oss-list">
    <div class="oss-list__header">
      <span>{{ $t('oss.bucket') }}</span>
      <i class="el-icon-plus" @click="openAddDialog"></i>
    </div>
    <div class="oss-list__body n-scroll" v-if="!showEmpty" @click="handleItemClick">
      <BucketItem v-for="bucket in listData" :key="bucket" :selected="selected" :name="bucket" />
    </div>
    <div class="oss-list__empty" v-else>
      <span>{{ $t('oss.bucket.empty') }}</span>
    </div>
    <el-dialog :title="$t('oss.bucket.add')" :visible.sync="addDialogVisible">
      <el-input
        v-model="newBucketName"
        :placeholder="$t('oss.bucket.add.placeholder')"
        autocomplete="off"
      ></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">{{ $t('cancel') }}</el-button>
        <el-button type="primary" @click="handleAddClick" :disabled="addDisabled">
          {{ $t('confirm') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import BucketItem from './bucketItem';

export default {
  props: {
    listData: {
      type: Array,
    },
    selected: {
      type: String,
    },
  },
  components: {
    BucketItem,
  },
  data() {
    return {
      addDialogVisible: false,
      newBucketName: '',
      addDisabled: false,
    };
  },
  computed: {
    showEmpty() {
      return !this.listData || !this.listData.length;
    },
  },
  methods: {
    openAddDialog() {
      this.newBucketName = '';
      this.addDialogVisible = true;
    },
    async handleAddClick() {
      const res = await this.$nApi.post('/oss/makeBucket', {
        bucketName: this.newBucketName,
      });
      if (!res) {
        return;
      }
      this.addDialogVisible = false;
      this.$message.success(this.$t('addSuccess'));
      this.$emit('added', this.newBucketName);
    },
    async handleItemClick(e) {
      if (e.target.classList.contains('oss-list-item')) {
        this.$emit('item-click', e.target.dataset.name);
      }
    },
  },
};
</script>

<style lang="less">
.oss-list {
  user-select: none;
  &__header {
    padding: 14px 18px;
    color: var(--primary);
    font-size: 14px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #363636;
    span {
      flex: 1;
    }
    i {
      transition: color 100ms ease;
      justify-self: flex-end;
    }
    i:hover {
      cursor: pointer;
      color: var(--regular-text);
    }
  }
  &__body {
    max-height: calc(100% - 48px);
  }
  &__empty {
    margin-top: 16px;
    font-size: 13px;
    color: var(--primary);
    text-align: center;
  }
}
</style>
