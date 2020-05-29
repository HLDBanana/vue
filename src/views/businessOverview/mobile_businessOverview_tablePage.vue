<template>
  <div class="mobile-businessOverview-tablePage">
    <div class="navbar">
      <svg-icon icon-class="back" style="margin-left: 42px; height: 24px; width: 24px" @click.native="$router.go(-1)"/>
      <div class="mobile-title">{{ $t(`${$route.meta.title}`) }}</div>
    </div>
    <div>
      <van-list
        v-model="isListLoading"
        :finished="finished"
        finished-text="没有更多了"
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
  </div>
</template>

<script>
  import { Col, Row, Button, List, Toast } from 'vant';
  import i18n from "@/i18n";
  import {getShopDataList, getShopTerminalInfo} from "@/services";

  export default {
    name: "mobile_businessOverview_tablePage",
    components: {
      [List.name]: List,
    },
    data() {
      return {
        navObj: {},
        timeout: null,
        monetaryUnit: '',
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
        // 加载
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
      }
    },
    computed: {
      monetaryUnitChange() {
        return this.monetaryUnit
      },
    },
    watch: {
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
      this.clickedQuery()
    },
    mounted() {},
    methods: {
      jumpToTableDetailPage() {
        this.$router.push({
          name: 'mobile_businessOverview_tablePage_detail',
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
        this.getShopDataList(false)
      },
      // 网点数据列表
      getShopDataList(isLoadMore) {
        let setting = this.$route.query
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
            this.error = true
            this.$message.error(res.msg)
          }
        }).catch(err => {
          this.isTableLoading = false
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
    }
  }
</script>

<style lang="scss" scoped>
  .mobile-businessOverview-tablePage {
    .navbar {
      height: 50px;
      position: relative;
      background: #fff;
      box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
      display: flex;
      align-items: center;
    }

    .mobile-title {
      font-size: 18px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: rgba(21, 35, 52, 1);
      line-height: 28px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
</style>
