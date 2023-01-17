<template>
  <div>
    <div v-if="showSearchBox" class="search-box">
      <slot name="searchSlot" />
    </div>

    <div style="margin-bottom: 12px">
      <slot name="menuLeftSlot" />
    </div>
    <el-table
      ref="eleTable"
      v-adaptive:[autoSize]="{bottomOffset}"
      v-loading="tableLoading"
      :data="tableData"
      :height="height ? height : undefined"
      :max-height="maxHeight"
      border
      stripe
      style="width: 100%"
      :row-key="rowKey"
      :tree-props="treeProps"
      :default-expand-all="expandAll"
      @selection-change="changeSelect"
    >
      <el-table-column v-if="showSelect" type="selection" width="55" :selectable="judgeSelect" />
      <el-table-column type="expand" :align="align" fixed="left">
        <template slot-scope="props">
          <el-form>
            <el-row>
              <template v-for="col in columns">
                <el-col v-if="!col.expandHidden" :key="col.prop" :span="props.row.span || 8 ">
                  <el-form-item :label="col.label">
                    <span> {{ col.formatter ? col.formatter(props.row[col.prop], props.row) : props.row[col.prop] }}</span>
                  </el-form-item>
                </el-col>
              </template>
            </el-row>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        v-if="showIndex"
        type="index"
        label="序号"
        :align="align"
        width="70"
        fixed="left"
      />
      <template v-for="col in columns">
        <el-table-column
          v-if="!col.hidden"
          :key="col.prop"
          :prop="col.prop"
          :label="col.label"
          :width="col.width"
          :min-width="col.minWidth"
          :align="col.align || align"
          :header-align="col.headerAlign || align"
          :fixed="col.fixed"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <my-slot
              v-if="col.render"
              :render="col.render"
              :row="scope.row"
              :index="scope.$index"
              :column="col"
            />
            <span v-else>
              {{ col.formatter ? col.formatter(scope.row[col.prop], scope.row) : scope.row[col.prop] }}
            </span>
          </template>
        </el-table-column>
      </template>
      <div
        v-if="infinite"
        slot="append"
        v-tableInfiniteScroll:[infinite]="loadList"
        class="loading-box"
      >
        <span v-if="contextLoading&&!contextLoadingFinish">
          <i class="el-icon-loading" />
          加载中
        </span>
        <span v-if="!contextLoading&&!contextLoadingFinish">
          <i class="el-icon-check" />
          加载成功
        </span>
        <span v-if="contextLoadingFinish">
          <i class="el-icon-check" />
          没有更多内容了
        </span>
      </div>
    </el-table>
    <div v-if="showPagination" class="pagination-container">
      <el-pagination
        background
        style="float: right;margin-top: 12px"
        layout="total, sizes, prev, pager, next"
        :total="total"
        :current-page="currentPage"
        :page-size="pageSize"
        :page-sizes="[10, 20, 50, 100]"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <slot name="footer" />
  </div>
</template>

<script>
import adaptive from '@/directive/el-table-auto-size'
import tableInfiniteScroll from '@/directive/el-table-infinite-scroll'

const MySlot = {
  functional: true,
  props: {
    row: Object,
    render: Function,
    index: Number,
    column: {
      type: Object,
      default: null
    }
  },

  render: (h, data) => {
    const params = {
      row: data.props.row,
      index: data.props.index
    }

    if (data.props.column) params.column = data.props.column
    return data.props.render(h, params)
  }
}
export default {
  name: 'MainTable',
  directives: { adaptive, tableInfiniteScroll },
  components: {
    MySlot
  },
  props: {
    expand: {
      type: Boolean,
      default: false
    },
    showIndex: {
      type: Boolean,
      default: true
    },
    expandAll: {
      type: Boolean,
      default: false
    },
    autoSize: {
      type: Boolean,
      default: false
    },
    bottomOffset: {
      type: Number,
      default: 50
    },
    infinite: {
      type: Boolean,
      default: false
    },
    showSearchBox: {
      type: Boolean,
      default: () => true
    },
    tableLoading: {
      type: Boolean,
      default: () => false
    },
    contextLoading: {
      type: Boolean,
      default: () => false
    },
    contextLoadingFinish: {
      type: Boolean,
      default: () => false
    },
    height: {
      type: [Number, String],
      default: () => ''
    },
    maxHeight: {
      type: [Number, String],
      default: () => 'autoSize'
    },
    tableData: {
      type: Array,
      required: true
    },
    columns: {
      type: Array,
      required: true
    },
    currentPage: {
      type: Number,
      default: () => 1
    },
    pageSize: {
      type: Number,
      default: () => 10
    },
    total: {
      type: Number,
      default: () => 0
    },
    showPagination: {
      type: Boolean,
      default: () => true
    },
    showSelect: {
      type: Boolean,
      default: () => false
    },
    judgeSelect: {
      type: Function,
      default: () => {
        return true
      }
    },
    align: {
      type: String,
      default: () => 'left'
    },
    rowKey: {
      type: String,
      default: () => ''
    },
    treeProps: {
      type: Object,
      default: () => {
        return { children: 'children', hasChildren: 'hasChildren' }
      }
    }
  },
  data () {
    return {}
  },
  methods: {
    loadList () {
      this.$emit('loadList')
    },
    changeSelect (data) {
      this.$emit('changeSelect', data)
    },
    handleSizeChange (data) {
      this.$emit('changePageSize', data)
    },
    handleCurrentChange (data) {
      this.$emit('changeCurrentPage', data)
    },
    clearSelection () {
      this.$refs.eleTable.clearSelection()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.search-box {
  border: 1px solid $borderColor;
  border-radius: 4px;
  padding: 20px 10px 0 10px;
  margin-bottom: 20px;
}

.loading-box {
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-align: center;
}

.pagination-container {
  *zoom: 1;

  &::before {
    display: table;
    content: " ";
  }

  &::after {
    display: table;
    content: " ";
    clear: both;
  }
}

</style>
