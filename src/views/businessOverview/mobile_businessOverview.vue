<template>
  <div class="mobile_businessOverview">
    <div class="part1">
      <div class="part1-head">
        <div style="display: flex">
          <svg-icon icon-class="data1" class="svgIconSize1"/>
          <div class="fontStyle1" style="margin-left: 8px;">数据汇总分析</div>
        </div>
      </div>
      <van-row gutter="8">
        <van-col span="24">
          <div class="card">
            <div class="van-hairline--bottom card-head">
              <div class="greenDot"></div>
              <div style="margin-left: 8px;">总成交</div>
            </div>
            <div style="display: flex;">
              <div class="cardItem1 van-hairline--right">
                <div class="fontStyle2" style="margin-bottom: 8px;">总订单数</div>
                <div>
                  <div style="margin-right: 4px; display: inline-block;">{{ manageDetail.orderNum }}</div>
                  <div class="fontStyle4" style="display: inline-block;">笔</div>
                </div>
              </div>
              <div class="cardItem1 van-hairline--right">
                <div class="fontStyle2" style="margin-bottom: 8px;">总成交金额</div>
                <div>
                  <div style="margin-right: 4px; display: inline-block;">{{ manageDetail.orderMoney }}</div>
                  <div class="fontStyle4" style="display: inline-block;">{{ monetaryUnit }}</div>
                </div>
              </div>
              <div class="cardItem1">
                <div class="fontStyle2" style="margin-bottom: 8px;">收入</div>
                <div>
                  <div style="margin-right: 4px; display: inline-block;">{{ manageDetail.income }}</div>
                  <div class="fontStyle4" style="display: inline-block;">{{ monetaryUnit }}</div>
                </div>
              </div>
            </div>
          </div>
        </van-col>
        <van-col span="12">
          <div class="card">
            <div class="van-hairline--bottom card-head">
              <div class="greenDot"></div>
              <div style="margin-left: 8px;">用户</div>
            </div>
            <div>
              <div class="fontStyle3" style="display: flex; flex-direction: column;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                  <div>注册用户</div>
                  <div>{{ manageDetail.registerUserNum }}</div>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                  <div>租借用户</div>
                  <div>{{ manageDetail.borrowUserNum }}</div>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                  <div>新增租借用户</div>
                  <div>{{ manageDetail.newBorrowUserNum }}</div>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <div>新增付费用户</div>
                  <div>{{ manageDetail.newPayUserNum }}</div>
                </div>
              </div>
            </div>
          </div>
        </van-col>
        <van-col span="12">
          <div class="card">
            <div class="van-hairline--bottom card-head">
              <div class="greenDot"></div>
              <div style="margin-left: 8px;">租借中订单</div>
            </div>
            <div>
              <div class="fontStyle3" style="display: flex; flex-direction: column;">
                <div style="display: flex; justify-content: space-between;">
                  <div>订单数</div>
                  <div>{{ manageDetail.borrowing }}</div>
                </div>
              </div>
            </div>
          </div>
        </van-col>
        <van-col span="12">
          <div class="card">
            <div class="van-hairline--bottom card-head">
              <div class="greenDot"></div>
              <div style="margin-left: 8px;">免费订单</div>
            </div>
            <div>
              <div class="fontStyle3" style="display: flex; flex-direction: column;">
                <div style="display: flex; justify-content: space-between;">
                  <div>订单数</div>
                  <div>{{ manageDetail.freeOrder }}</div>
                </div>
              </div>
            </div>
          </div>
        </van-col>
        <van-col span="12">
          <div class="card">
            <div class="van-hairline--bottom card-head">
              <div class="greenDot"></div>
              <div style="margin-left: 8px;">付费订单</div>
            </div>
            <div>
              <div class="fontStyle3" style="display: flex; flex-direction: column;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                  <div>订单数</div>
                  <div>{{ manageDetail.payOrder }}</div>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <div>总金额</div>
                  <div>{{ manageDetail.orderMoney }}</div>
                </div>
              </div>
            </div>
          </div>
        </van-col>
        <van-col span="12">
          <div class="card">
            <div class="van-hairline--bottom card-head">
              <div class="greenDot"></div>
              <div style="margin-left: 8px;">异常订单</div>
            </div>
            <div>
              <div class="fontStyle3" style="display: flex; flex-direction: column;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                  <div>{{ $t('businessOverview.rentFailure') }}</div>
                  <div>{{ manageDetail.borrowFail }}</div>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <div>{{ $t('businessOverview.orderToBePaid') }}</div>
                  <div>{{ manageDetail.abnormalOrder }}</div>
                </div>
              </div>
            </div>
          </div>
        </van-col>
      </van-row>
    </div>
    <div class="part2">
      <div class="part2-head">
        <div style="display: flex">
          <svg-icon icon-class="money" class="svgIconSize1"/>
          <div class="fontStyle1" style="margin-left: 8px;">经营概况</div>
<!--          <van-button plain hairline type="primary" size="small" style="margin-left: 8px" @click.native="jumpToTablePage">点击查看详情</van-button>-->
        </div>
        <div style="display: flex;">
          <div class="fontStyle5 exportTableButton" style="margin-right: 10px;" @click="exportExcel">导出表格</div>
          <svg-icon icon-class="filter_nor" class="svgIconSize1" @click="showBusinessOverviewTableSetting = true"/>
        </div>
      </div>
      <van-list
        v-model="isListLoading"
        offset="100"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad">
        <el-table
          v-loading="isTableLoading"
          :data="tableData">
          <el-table-column
            prop="shopName"
            :label="$t('businessOverview.nameOfDot')"
            align="center"
            min-width="140">
          </el-table-column>
          <el-table-column
            v-for="(item, index) in table1"
            :key="item.prop"
            :prop="item.prop"
            :label="item.label"
            align="center"
            min-width="100">
          </el-table-column>
          <el-table-column
            :label="$t('businessOverview.quantityOfEquipment')"
            align="center"
            min-width="100">
            <template slot-scope="scope">
              <el-popover
                trigger="click"
                placement="right"
                :open-delay="300"
                @show="getShopTerminalInfo(scope.row.shopId)"
                @hide="clearShopTerminalInfo">
                <div v-for="item in shopTerminalInfo" v-loading="popoverLoading">
                  <p>{{ $t('businessOverview.equipmentId') }}: {{ item.terminal }}</p>
                  <p>{{ $t('businessOverview.equipmentType') }}: {{ item.productName }}</p>
                </div>
                <div slot="reference">
                  <el-tag size="medium">{{ scope.row.terminalNum }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            v-for="(item, index) in table2"
            :key="item.prop"
            :prop="item.prop"
            :label="item.label"
            align="center"
            min-width="100">
          </el-table-column>
        </el-table>
      </van-list>
    </div>
    <van-popup
      v-model="showBusinessOverviewTableSetting"
      :close-on-popstate="true"
      round
      style="width: 90%; padding: 24px;"
      @close="cancelSetting">
      <el-form ref="settingForm" :model="businessOverviewTableSetting" label-position="left" label-width="80px">
        <el-form-item :label="$t('businessOverview.sort')">
          <el-input v-model="businessOverviewTableSetting.screenedValueLabel" readonly style="margin-bottom: 8px;" @click.native="showSortingConditionsPopup = true"></el-input>
          <el-input v-model="businessOverviewTableSetting.highOrLowRankLabel" readonly @click.native="showHighOrLowRankListPopup = true"></el-input>
        </el-form-item>
        <el-form-item :label="$t('businessOverview.managementModel')">
          <el-input v-model="businessOverviewTableSetting.partnerTypeValueLabel" readonly @click.native="showTypeListPopup = true"></el-input>
        </el-form-item>
        <el-form-item label-width="0px">
          <el-input v-model="businessOverviewTableSetting.searchWayLabel" readonly style="margin-bottom: 8px;" @click.native="showSearchWayListPopup = true"></el-input>
          <el-input v-model="businessOverviewTableSetting.searchValue" :placeHolder="$t('businessOverview.placeHolder2')"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footPart" style="margin-top: 24px">
        <div class="cancelButton" @click="showBusinessOverviewTableSetting = false">取消</div>
        <div class="confirmButton" @click="confirmSetting">确认</div>
      </div>
    </van-popup>
    <van-popup
      v-model="showSortingConditionsPopup"
      :close-on-popstate="true"
      :lazy-render="false"
      position="bottom">
      <van-picker
        ref="sortingConditionsPicker"
        show-toolbar
        value-key="label"
        :columns="sortingConditions"
        @cancel="(value, index) => popupOnCancel(value, index, 'sortingConditions')"
        @confirm="(value, index) => popupOnConfirm(value, index, 'sortingConditions')"
      />
    </van-popup>
    <van-popup
      v-model="showHighOrLowRankListPopup"
      :close-on-popstate="true"
      :lazy-render="false"
      position="bottom">
      <van-picker
        ref="highOrLowRankListPicker"
        show-toolbar
        value-key="label"
        :columns="highOrLowRankList"
        @cancel="(value, index) => popupOnCancel(value, index, 'highOrLowRankList')"
        @confirm="(value, index) => popupOnConfirm(value, index, 'highOrLowRankList')"
      />
    </van-popup>
    <van-popup
      v-model="showTypeListPopup"
      :close-on-popstate="true"
      :lazy-render="false"
      position="bottom">
      <van-picker
        ref="typeListPicker"
        show-toolbar
        value-key="label"
        :columns="typeList"
        @cancel="(value, index) => popupOnCancel(value, index, 'typeList')"
        @confirm="(value, index) => popupOnConfirm(value, index, 'typeList')"
      />
    </van-popup>
    <van-popup
      v-model="showSearchWayListPopup"
      :close-on-popstate="true"
      :lazy-render="false"
      position="bottom">
      <van-picker
        ref="searchWayListPicker"
        show-toolbar
        value-key="label"
        :columns="searchWayList"
        @cancel="(value, index) => popupOnCancel(value, index, 'searchWayList')"
        @confirm="(value, index) => popupOnConfirm(value, index, 'searchWayList')"
      />
    </van-popup>
  </div>
</template>

<script>
  import {Col, Row, List, Popup, Picker, Button, Toast} from 'vant';
  import i18n from "@/i18n";
  import {excelDownload, getManageDetail, getShopDataList, getShopTerminalInfo} from "@/services";
  import {upperCaseFirstCharactor} from "@/utils/common";

  let valueMapper = {
    sortingConditionsPopup: 'screenedValue',
    highOrLowRankListPopup: 'highOrLowRank',
    typeListPopup: 'partnerTypeValue',
    searchWayListPopup: 'searchWay',
  }
  let labelMapper = {
    sortingConditionsPopup: 'screenedValueLabel',
    highOrLowRankListPopup: 'highOrLowRankLabel',
    typeListPopup: 'partnerTypeValueLabel',
    searchWayListPopup: 'searchWayLabel',
  }

  export default {
    name: "mobile_businessOverview",
    components: {
      [Col.name]: Col,
      [Row.name]: Row,
      [List.name]: List,
      [Popup.name]: Popup,
      [Picker.name]: Picker,
      [Button.name]: Button,
    },
    data() {
      return {
        navObj: {},
        timeout: null,
        monetaryUnit: '',
        // 总成交信息
        manageDetail: {
          orderNum: '0',
          orderMoney: '0',
          income: '0',
          registerUserNum: '0',
          borrowUserNum: '0',
          newBorrowUserNum: '0',
          newPayUserNum: '0',
          borrowing: '0',
          freeOrder: '0',
          payOrder: '0',
          borrowFail: '0',
          abnormalOrder: '0',
          orderAvgTime: '0',
          perUserBorrowCount: '0',
        },
        // 表格的筛选条件
        showBusinessOverviewTableSetting: false,
        showSortingConditionsPopup: false,
        showHighOrLowRankListPopup: false,
        showTypeListPopup: false,
        showSearchWayListPopup: false,
        businessOverviewTableSetting: {
          screenedValueLabel: i18n.t('businessOverview.turnover'),
          highOrLowRankLabel: i18n.t('businessOverview.highRanking'),
          partnerTypeValueLabel: '',
          searchWayLabel: i18n.t('businessOverview.nameOfDot'),
          screenedValue: 'orderMoney',
          highOrLowRank: 2,
          partnerTypeValue: '',
          searchWay: 'searchByName',
          searchValue: '',
        },
        popupLevelBusinessOverviewTableSetting: {
          screenedValueLabel: i18n.t('businessOverview.turnover'),
          highOrLowRankLabel: i18n.t('businessOverview.highRanking'),
          partnerTypeValueLabel: '',
          searchWayLabel: i18n.t('businessOverview.nameOfDot'),
          screenedValue: 'orderMoney',
          highOrLowRank: 2,
          partnerTypeValue: '',
          searchWay: 'searchByName',
          searchValue: '',
        },
        sortingConditions: [
          {
            label: i18n.t('businessOverview.turnover'),
            value: 'orderMoney',
          },
          {
            label: i18n.t('businessOverview.totalOrders'),
            value: 'orderNum',
          },
          {
            label: i18n.t('businessOverview.rentAmount'),
            value: 'lendMoney',
          },
          {
            label: i18n.t('businessOverview.amountOfPurchase'),
            value: 'buyMoney',
          },
          {
            label: i18n.t('businessOverview.averageOrderDuration'),
            value: 'orderAvgTime',
          },
          {
            label: i18n.t('businessOverview.averageCustomerUnitPrice'),
            value: 'orderAvgMoney',
          },
        ],
        highOrLowRankList: [
          {
            label: i18n.t('businessOverview.highRanking'),
            value: 2,
          },
          {
            label: i18n.t('businessOverview.lowRanking'),
            value: 1,
          }
        ],
        typeList: [{
          label: i18n.t('businessOverview.all'),
          value: -1,
          disabled: false,
        }, {
          label: i18n.t('businessOverview.directlyOperated'),
          value: 0,
          disabled: false,
        }, {
          label: i18n.t('businessOverview.primaryAgent'),
          value: 1,
          disabled: false,
        }, {
          label: i18n.t('businessOverview.secondaryAgent'),
          value: 2,
          disabled: false,
        },],
        searchWayList: [
          {
            label: i18n.t('businessOverview.nameOfDot'),
            value: 'searchByName',
          },
          {
            label: i18n.t('businessOverview.equipmentId'),
            value: 'searchByID',
          },
        ],
        // 表格
        table1: [
          {
            prop: "bussinessType",
            label: i18n.t('businessOverview.managementModel'),
          },
          {
            prop: "typeName",
            label: i18n.t('businessOverview.businessScenario'),
          },
        ],
        table2: [
          {
            prop: "orderNum",
            label: i18n.t('businessOverview.totalOrders'),
          },
          {
            prop: "usrNum",
            label: i18n.t('businessOverview.leasedUser'),
          },
          {
            prop: "orderMoney",
            label: '', // 根据选择的国家自动配置
          },
          {
            prop: "lendMoney",
            label: i18n.t('businessOverview.rentAmount'),
          },
          {
            prop: "buyMoney",
            label: i18n.t('businessOverview.amountOfPurchase'),
          },
          {
            prop: 'waitPayMoney',
            label: i18n.t('businessOverview.amountToBePaid'),
          },
          {
            prop: "perTerminalMoney",
            label: i18n.t('businessOverview.averageSingleEquipmentRevenue'),
          },
          {
            prop: "perChannelNum",
            label: i18n.t('businessOverview.singleWarehouseOrderContribution'),
          },
          {
            prop: "orderAvgTime",
            label: i18n.t('businessOverview.averageOrderDuration'),
          },
          {
            prop: "orderAvgMoney",
            label: i18n.t('businessOverview.averageCustomerUnitPrice'),
          },
          {
            prop: "payOrderRatio",
            label: i18n.t('businessOverview.proportionOfPaidOrders'),
          },
          {
            prop: "payUserRatio",
            label: i18n.t('businessOverview.proportionOfPaidUsers'),
          },
        ],
        tableData: [],
        pageNo: 1,
        pageSize: 20,
        totalCount: 1,
        isFirstLoadOk: false,
        isListLoading: false,
        finished: false,
        error: false,
        isTableLoading: false,
        // 网点设备型号和设备号
        shopTerminalInfo: [{terminal: '', productName: '',}],
        popoverLoading: true,
        isDownloading: false,
      }
    },
    computed: {
      mobileNavbarObj() {
        return this.$store.state.app.mobileNavbarObj
      },
      monetaryUnitChange() {
        return this.monetaryUnit
      },
    },
    watch: {
      mobileNavbarObj: {
        handler(newValue, oldValue) {
          this.clickedQuery()
        },
      },
      monetaryUnitChange: {
        handler(newValue, oldValue) {
          for (let i = 0; i < this.table2.length; i++) {
            if (this.table2[i].prop === 'orderMoney') {
              this.table2.splice(i, 1, {
                prop: 'orderMoney',
                label: `${i18n.t('businessOverview.businessSales')} （${this.monetaryUnit}）`,
              })
              break
            }
          }
        }
      },
    },
    created() {
      // 首次加载导航栏时 dateRange === undefined，监听 mobileNavbarObj 调用 clickedQuery
      // 已经加载过导航栏时 dateRange !== undefined，直接调用 clickedQuery
      let a = this.$store.state.app.mobileNavbarObj
      if (a.dateRange !== undefined) {
        this.clickedQuery()
      }
    },
    mounted() {},
    methods: {
      // 检索条件
      cancelSetting() {
        let that = this
        setTimeout(() => {
          let nameList = ['sortingConditions', 'highOrLowRankList', 'typeList', 'searchWayList']
          that.businessOverviewTableSetting = Object.assign({}, that.businessOverviewTableSetting, that.popupLevelBusinessOverviewTableSetting)
          for (let i = 0; i < nameList.length; i++) {
            let name = nameList[i]
            let value = that.popupLevelBusinessOverviewTableSetting[valueMapper[`${name}Popup`]]
            let list = that[name]
            for (let i = 0; i < list.length; i++) {
              if (value === list[i].value) {
                that.$refs[`${name}Picker`].setColumnIndex(0, i)
                break
              }
            }
          }
        }, 300)
      },
      confirmSetting() {
        this.showBusinessOverviewTableSetting = false
        this.popupLevelBusinessOverviewTableSetting = Object.assign({}, this.popupLevelBusinessOverviewTableSetting, this.businessOverviewTableSetting)
        this.getShopDataList(false)
      },
      popupOnCancel(value, index, name) {
        let that = this
        this[`show${upperCaseFirstCharactor(name)}Popup`] = false
        setTimeout(() => {
          let value = that.businessOverviewTableSetting[valueMapper[`${name}Popup`]]
          let list = that[name]
          for (let i = 0; i < list.length; i++) {
            if (value === list[i].value) {
              that.$refs[`${name}Picker`].setColumnIndex(0, i)
              break
            }
          }
        }, 300)
      },
      popupOnConfirm(value, index, name) {
        this[`show${upperCaseFirstCharactor(name)}Popup`] = false
        this.businessOverviewTableSetting[valueMapper[`${name}Popup`]] = value.value
        this.businessOverviewTableSetting[labelMapper[`${name}Popup`]] = value.label

      },
      //
      jumpToTablePage() {
        this.$router.push({
          name: 'mobile_businessOverview_tablePage',
          query: {
            'screenedValue': this.popupLevelBusinessOverviewTableSetting.screenedValue,
            'highOrLowRank': this.popupLevelBusinessOverviewTableSetting.highOrLowRank,
            'partnerTypeValue': this.popupLevelBusinessOverviewTableSetting.partnerTypeValue,
            'searchWay': this.popupLevelBusinessOverviewTableSetting.searchWay,
            'searchValue': this.popupLevelBusinessOverviewTableSetting.searchValue,
          }
        })
      },
      onLoad() {
        if (this.isFirstLoadOk) {
          this.getShopDataList(true)
        }
      },
      //
      clickedQuery() {
        let a = this.$store.state.app.mobileNavbarObj
        let o = {
          startDate: a.dateRange[0],
          endDate: a.dateRange[1],
          orgId: a.orgStructureValue,
          countryId: a.country,
          partnerType: a.partnerType
        }
        let monetaryUnitMapper = {
          '1': 'JPY', // 日本
          '2': 'SGD', // 新加坡
          '3': 'RM', // 马来西亚
          '4': 'THB', // 泰国
        }
        this.navObj = Object.assign({}, this.navObj, o)
        this.monetaryUnit = monetaryUnitMapper[String(this.navObj.countryId)]
        this.getPartnerTypeAndList()
        this.getManageDetail()
        this.getShopDataList(false)
      },
      getPartnerTypeAndList() {
        let typeNumber = this.navObj.partnerType
        if (typeNumber === null) { // null代表全部
          this.businessOverviewTableSetting.partnerTypeValue = -1
          this.popupLevelBusinessOverviewTableSetting.partnerTypeValue = -1
          this.typeList.forEach(e => {
            e.disabled = false
            if (e.value === -1) {
              this.businessOverviewTableSetting.partnerTypeValueLabel = e.label
              this.popupLevelBusinessOverviewTableSetting.partnerTypeValueLabel = e.label
            }
          })
        } else {
          this.businessOverviewTableSetting.partnerTypeValue = typeNumber
          this.popupLevelBusinessOverviewTableSetting.partnerTypeValue = typeNumber
          this.typeList.forEach(e => {
            e.disabled = (e.value !== typeNumber)
            if (e.value === typeNumber) {
              this.businessOverviewTableSetting.partnerTypeValueLabel = e.label
              this.popupLevelBusinessOverviewTableSetting.partnerTypeValueLabel = e.label
            }
          })
        }
      },
      // 总成交信息
      getManageDetail() {
        let obj = {
          startDate: this.navObj['startDate'],
          endDate: this.navObj['endDate'],
          orgId: this.navObj['orgId'],
          countryId: this.navObj['countryId'],
        }
        getManageDetail(obj).then(res => {
          if (res.code === 1) {
            let keys = Object.keys(this.manageDetail)
            keys.forEach(item => {
              if (res.data[item] === undefined) {
                res.data[item] = 0
              }
            })
            this.manageDetail = Object.assign({}, this.manageDetail, res.data)
          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      // 网点数据列表
      getShopDataList(isLoadMore) {
        let setting = this.popupLevelBusinessOverviewTableSetting
        if (!isLoadMore) {
          this.isFirstLoadOk = false
          this.isTableLoading = true
          this.pageNo = 1
          this.finished = false
          this.error = false
        }
        let obj = {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          orderField: setting.screenedValue,
          orderFlag: setting.highOrLowRank,
          startDate: this.navObj['startDate'],
          endDate: this.navObj['endDate'],
          orgId: this.navObj['orgId'],
          countryId: this.navObj['countryId'],
          partnerType: setting.partnerTypeValue,
          shopName: setting.searchWay === 'searchByName' ? setting.searchValue : '',
          terminal: setting.searchWay === 'searchByID' ? setting.searchValue : '',
        }
        getShopDataList(obj).then(res => {
          this.isTableLoading = false
          if (res.code === 1) {
            let list = res.data.list
            let mapper = {
              '0': i18n.t('businessOverview.directlyOperated'),
              '1': i18n.t('businessOverview.primaryAgent'),
              '2': i18n.t('businessOverview.secondaryAgent'),
              '3': i18n.t('businessOverview.BD'),
              '4': i18n.t('businessOverview.store'),
            }
            list.forEach(e => {
              e.bussinessType = mapper[String(e.bussinessType)]
            })
            if (!isLoadMore) {
              this.tableData = res.data.list
              this.isFirstLoadOk = true
            } else if (isLoadMore) {
              this.tableData = this.tableData.concat(list)
            }
            this.pageNo += 1
            this.totalCount = res.data.totalCount
            this.isListLoading = false
            if (res.data.list.length === 0) {
              this.finished = true
            }
          } else {
            this.isFirstLoadOk = true
            this.isListLoading = false
            this.error = true
            Toast.fail(res.msg)
          }
        }).catch(err => {
          this.isTableLoading = false
          this.isFirstLoadOk = true
          this.isListLoading = false
          this.error = true
          console.log(err)
        })
      },
      // 网点设备型号和设备号
      getShopTerminalInfo(shopId) {
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          let obj = {
            shopId: shopId,
            startDate: this.navObj['startDate'],
            endDate: this.navObj['endDate'],
            orgId: this.navObj['orgId'],
            countryId: this.navObj['countryId'],
          }
          getShopTerminalInfo(obj).then(res => {
            if (res.code === 1) {
              this.popoverLoading = false
              this.shopTerminalInfo = res.data
            } else {
              this.$message.error(res.msg)
            }
          }).catch(err => {
            console.log(err)
          })
        }, 300)
      },
      clearShopTerminalInfo() {
        this.shopTerminalInfo = [{terminal: '', productName: '',}]
        this.popoverLoading = true
      },
      // 导出报表
      exportExcel() {
        let setting = this.popupLevelBusinessOverviewTableSetting
        let obj = {
          orderField: setting.screenedValue,
          orderFlag: setting.highOrLowRank,
          startDate: this.navObj['startDate'],
          endDate: this.navObj['endDate'],
          orgId: this.navObj['orgId'],
          countryId: this.navObj['countryId'],
          partnerType: setting.partnerTypeValue,
          shopName: setting.searchWay === 'searchByName' ? setting.searchValue : '',
          terminal: setting.searchWay === 'searchByID' ? setting.searchValue : '',
        }
        this.isDownloading = true
        // responseType: 'arraybuffer' 解决二进制文件流乱码问题
        excelDownload(obj, {responseType: 'arraybuffer'}).then(res => {
          this.exportActive = false
          //处理返回的文件流
          const content = res
          const blob = new Blob([content])
          const fileName = `${i18n.t('businessOverview.businessOverviewOfOutlets')}.xls`
          if ("download" in document.createElement("a")) {
            // 非IE下载
            const elink = document.createElement("a");
            elink.download = fileName;
            elink.style.display = "none";
            elink.href = URL.createObjectURL(blob);
            document.body.appendChild(elink);
            elink.click();
            URL.revokeObjectURL(elink.href); // 释放URL 对象
            document.body.removeChild(elink);
            this.isDownloading = false
          } else {
            // IE10+下载
            navigator.msSaveBlob(blob, fileName);
            this.isDownloading = false
          }
        }).catch(err => {
          console.log(err)
          this.isDownloading = false
        })
      }
    },
  }
</script>

<style lang="scss" scoped>
  .mobile_businessOverview {
    .part1 {
      padding: 16px 8px 0px 8px;
      .part1-head {
        display: flex;
        justify-content: space-between;
        margin-bottom: 6px
      }
    }
    .part2 {
      padding-bottom: 27px;
      background-color: white;
      .part2-head {
        height: 56px;
        padding: 0px 8px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
    .dialog-footPart {
      display: flex;
      justify-content: space-around;
    }
    .card {
      padding: 8px 8px 16px 8px;
      background:rgba(255,255,255,1);
      box-shadow:0px 8px 16px -4px rgba(184,190,194,0.16);
      border-radius:8px;
      margin-bottom: 8px;
    }
    .card-head {
      display: flex;
      align-items: center;
      padding-bottom: 8px;
      margin-bottom: 16px;
    }
    .cardItem1 {
      flex-grow: 1;
      padding-left: 8px;
      &:nth-child(1) {
        padding-left: 0px;
      }
    }
    .svgIconSize1 {
      height: 24px;
      width: 24px;
    }
    .greenDot {
      width:8px;
      height:8px;
      border-radius: 8px;
      background:rgba(29,219,68,1);
      box-shadow:0px 4px 6px -1px rgba(29,219,68,0.48);
    }
    .exportTableButton {
      padding: 3px 12px;
      border-radius:4px;
      border:1px solid rgba(21,35,52,1);
    }
    .fontStyle1 {
      font-size:16px;
      font-family:PingFangSC-Semibold,PingFang SC;
      font-weight:600;
      color:rgba(21,35,52,1);
      line-height:24px;
    }
    .fontStyle2 {
      font-size:14px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(21,35,52,1);
      line-height:22px;
    }
    .fontStyle3 {
      font-size:14px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(119,128,155,1);
      line-height:22px;
    }
    .fontStyle4 {
      font-size:11px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(119,128,155,1);
      line-height:16px;
    }
    .fontStyle5 {
      font-size:12px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(21,35,52,1);
      line-height:18px;
    }
    .fontStyle6 {
      font-size:12px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(119,128,155,1);
      line-height:16px;
    }
  }
</style>
