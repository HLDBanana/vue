<template>
  <div class="businessOverview-container">
    <div>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" style="margin: 10px 0px; min-width: 400px;">
          <div>
            <div>
              <div class="dotIcon IconColor0"></div>
              <div class="item-header">{{ $t('businessOverview.totalTurnover') }}</div>
              <div class="fontStyle-little" style="display: inline-block">({{ $t('businessOverview.totalTurnover1')
                }})
              </div>
            </div>
          </div>
          <div class="grid-content bg-light card-totalTurnover">
            <el-row>
              <el-col :span="8">
                <el-row class="textAlignCenter paidOrdersPartStyle">
                  <div style="display: inline-block"><img src="../../icons/png/icon3.png" alt=""/></div>
                  <div style="display: inline-block">
                    <div>{{ $t('businessOverview.totalOrder') }}</div>
                    <div class="fontStyle-little">{{ $t('businessOverview.totalOrderUnit') }}</div>
                  </div>
                </el-row>
                <el-row class="bigNumber">{{ manageDetail.orderNum }}</el-row>
                <el-row>
                  <el-col :span="12" style="text-align: center" class="fontStyle-little">{{
                    $t('businessOverview.averageOrderDuration') }}：{{
                    manageDetail.orderAvgTime }}&nbsp;min
                  </el-col>
                  <el-col :span="12" style="text-align: center" class="fontStyle-little">{{
                    $t('businessOverview.singleUserRentalFrequency') }}：{{
                    manageDetail.perUserBorrowCount }}&nbsp;{{ $t('businessOverview.times') }}
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="8">
                <el-row class="textAlignCenter paidOrdersPartStyle">
                  <div style="display: inline-block"><img src="../../icons/png/icon4.png" alt=""/></div>
                  <div style="display: inline-block">
                    <div>{{ $t('businessOverview.totalTransactionAmount') }}</div>
                    <div class="fontStyle-little">({{ $t('businessOverview.unit') }}：{{ monetaryUnit }})</div>
                  </div>
                </el-row>
                <el-row class="bigNumber">{{ manageDetail.orderMoney }}</el-row>
              </el-col>
              <el-col :span="8">
                <el-row class="textAlignCenter paidOrdersPartStyle">
                  <div style="display: inline-block"><img src="../../icons/png/icon5.png" alt=""/></div>
                  <div style="display: inline-block; width: 55%">
                    <div>{{ $t('businessOverview.income') }}</div>
                    <div class="fontStyle-little">({{ $t('businessOverview.unit') }}：{{ monetaryUnit }})</div>
                  </div>
                </el-row>
                <el-row class="bigNumber">{{ manageDetail.income }}</el-row>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6" style="margin: 10px 0px; min-width: 210px;">
          <div class="dotIcon IconColor1"></div>
          <div class="item-header">{{ $t('businessOverview.user') }}</div>
          <div class="grid-content bg-light card-user">
            <el-row>
              <el-col :span="18" class="fontStyle">
                <div class="dotIconSmall IconColor6"></div>
                {{ $t('businessOverview.registeredUser') }}
              </el-col>
              <el-col :span="6" class="fontStyle-number">{{ manageDetail.registerUserNum }}</el-col>
            </el-row>
            <el-row>
              <el-col :span="18" class="fontStyle">
                <div class="dotIconSmall IconColor6"></div>
                {{ $t('businessOverview.leasedUser') }}
              </el-col>
              <el-col :span="6" class="fontStyle-number">{{ manageDetail.borrowUserNum }}</el-col>
            </el-row>
            <el-row>
              <el-col :span="18" class="fontStyle">
                <div class="dotIconSmall IconColor6"></div>
                {{ $t('businessOverview.newRentalUser') }}
              </el-col>
              <el-col :span="6" class="fontStyle-number">{{ manageDetail.newBorrowUserNum }}</el-col>
            </el-row>
            <el-row>
              <el-col :span="18" class="fontStyle">
                <div class="dotIconSmall IconColor6"></div>
                {{ $t('businessOverview.newPayingUser') }}
              </el-col>
              <el-col :span="6" class="fontStyle-number">{{ manageDetail.newPayUserNum }}</el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6" style="margin: 10px 0px; min-width: 210px;">
          <div class="dotIcon IconColor2"></div>
          <div class="item-header">{{ $t('businessOverview.onLeaseOrder') }}</div>
          <div class="grid-content bg-light card-onLeaseOrder">
            <el-row>
              <el-col :span="18" class="fontStyle">
                <div class="dotIconSmall IconColor6"></div>
                {{ $t('businessOverview.orderNumber') }}
              </el-col>
              <el-col :span="6" class="fontStyle-number">{{ manageDetail.borrowing }}</el-col>
            </el-row>
          </div>
          <div class="dotIcon IconColor3"></div>
          <div class="item-header">{{ $t('businessOverview.freeOrder') }}</div>
          <div class="grid-content bg-light card-freeOrder">
            <el-row>
              <el-col :span="18" class="fontStyle">
                <div class="dotIconSmall IconColor6"></div>
                {{ $t('businessOverview.orderNumber') }}
              </el-col>
              <el-col :span="6" class="fontStyle-number">{{ manageDetail.freeOrder }}</el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="6" style="margin: 10px 0px; min-width: 210px;">
          <div class="dotIcon IconColor4"></div>
          <div class="item-header">{{ $t('businessOverview.paidOrder') }}</div>
          <div class="grid-content bg-light card-paidOrder">
            <el-row>
              <el-col :span="18" class="fontStyle">
                <div class="dotIconSmall IconColor6"></div>
                {{ $t('businessOverview.orderNumber') }}
              </el-col>
              <el-col :span="6" class="fontStyle-number">{{ manageDetail.payOrder }}</el-col>
            </el-row>
            <el-row>
              <el-col :span="18" class="fontStyle">
                <div class="dotIconSmall IconColor6"></div>
                {{ $t('businessOverview.totalSum') }}
              </el-col>
              <el-col :span="6" class="fontStyle-number">{{ manageDetail.orderMoney }}</el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="6" style="margin: 10px 0px; min-width: 210px;">
          <div class="dotIcon IconColor5"></div>
          <div class="item-header">{{ $t('businessOverview.abnormalOrder') }}</div>
          <div class="grid-content bg-light card-abnormalOrder">
            <el-row>
              <el-col :span="18" class="fontStyle">
                <div class="dotIconSmall IconColor6"></div>
                {{ $t('businessOverview.rentFailure') }}
              </el-col>
              <el-col :span="6" class="fontStyle-number">{{ manageDetail.borrowFail }}</el-col>
            </el-row>
            <el-row>
              <el-col :span="18" class="fontStyle">
                <div class="dotIconSmall IconColor6"></div>
                {{ $t('businessOverview.orderToBePaid') }}
              </el-col>
              <el-col :span="6" class="fontStyle-number">{{ manageDetail.abnormalOrder }}</el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
    <!--    <div>-->
    <!--      <el-row :gutter="20">-->
    <!--        -->
    <!--      </el-row>-->
    <!--    </div>-->
    <div>
      <div>
        <div style="margin: 10px 0px;">
          <div class="overview-header inlineBlock">{{ $t('businessOverview.generalSituationOfManagement') }}</div>
          <el-button class="button-exportReport" @click="exportExcel" :disabled="isDownloading">
            <img src="../../icons/png/icon10.png" style="vertical-align: sub;" alt=""/>&nbsp;<span>{{ $t('businessOverview.exportReport') }}</span>
          </el-button>
        </div>
        <div style="margin: 10px 0px;">
          <div class="fontStyle rankFontStyle inlineBlock">{{ $t('businessOverview.sort') }}</div>
          <el-select v-model="screenedValue" style="width: 150px;" :placeholder="$t('businessOverview.placeHolder1')">
            <el-option
              v-for="item in sortingConditions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="highOrLowRank" style="width: 150px;" :placeholder="$t('businessOverview.placeHolder1')">
            <el-option
              :key="2"
              :label="$t('businessOverview.highRanking')"
              :value="2">
            </el-option>
            <el-option
              :key="1"
              :label="$t('businessOverview.lowRanking')"
              :value="1">
            </el-option>
          </el-select>
          <div class="fontStyle rankFontStyle inlineBlock">{{ $t('businessOverview.managementModel') }}</div>
          <el-select v-model="partnerTypeValue" style="width: 120px;" :placeholder="$t('businessOverview.placeHolder1')">
            <el-option
              v-for="(item, index) in typeList"
              :key="index"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled">
            </el-option>
          </el-select>
          <el-select v-model="searchWay" style="width: 120px; margin: 0px 8px 0px 40px;" :placeholder="$t('businessOverview.placeHolder1')">
            <el-option
              :key="1"
              :label="$t('businessOverview.nameOfDot')"
              value="searchByName">
            </el-option>
            <el-option
              :key="2"
              :label="$t('businessOverview.equipmentId')"
              value="searchByID">
            </el-option>
          </el-select>
          <el-input v-model="searchValue" :placeHolder="$t('businessOverview.placeHolder2')" style="display: inline-block; width: 230px;"></el-input>
          <el-button @click="searchShopDataList" class="searchButton">{{ $t('businessOverview.search') }}</el-button>
        </div>
      </div>
      <div>
        <el-table
          v-loading="isTableLoading"
          :data="tableData"
          style="width: 100%"
          max-height="1200">
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
                trigger="hover"
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
        <div style="margin-top: 24px; text-align: center;">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="pageNo"
            :page-sizes="[10, 20, 50, 100]"
            :page-size.sync="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalCount">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {excelDownload, getManageDetail, getShopDataList, getShopTerminalInfo,} from '../../services'
  import i18n from '@/i18n/index'

  export default {
    name: 'BusinessOverview',
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
        screenedValue: 'orderMoney',
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
        highOrLowRank: 2,
        partnerTypeValue: '',
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
        searchWay: 'searchByName',
        searchValue: '',
        // 表格
        isTableLoading: false,
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
        // 分页
        pageNo: 1,
        pageSize: 20,
        totalCount: 1,
        // 网点设备型号和设备号
        shopTerminalInfo: [{terminal: '', productName: '',}],
        popoverLoading: true,
        isDownloading: false,
        timeoutOfShopDataList: null,
      }
    },
    computed: {
      navbarDoQuery() {
        return this.$store.state.app.navbarDoQuery
      },
      monetaryUnitChange() {
        return this.monetaryUnit
      },
    },
    watch: {
      navbarDoQuery: {
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
      let a = this.$store.state.app.navbarObj
      if (a.dateRange !== undefined) {
        this.$store.dispatch('app/initNavbarQuery')
      }
    },
    mounted() {},
    methods: {
      async clickedQuery() {
        let a = this.$store.state.app.navbarObj
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
        this.pageNo = 1
        this.pageSize = 20
        this.getPartnerTypeAndList()
        this.getManageDetail()
        this.getShopDataList()
      },
      getPartnerTypeAndList() {
        let typeNumber = this.navObj.partnerType
        if (typeNumber === null) { // null代表全部
          this.partnerTypeValue = -1
          this.typeList.forEach(e => {
            e.disabled = false
          })
        } else {
          this.partnerTypeValue = typeNumber
          this.typeList.forEach(e => {
            e.disabled = (e.value !== typeNumber)
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
      getShopDataList() {
        let obj = {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          orderField: this.screenedValue,
          orderFlag: this.highOrLowRank,
          startDate: this.navObj['startDate'],
          endDate: this.navObj['endDate'],
          orgId: this.navObj['orgId'],
          countryId: this.navObj['countryId'],
          partnerType: this.partnerTypeValue,
          shopName: this.searchWay === 'searchByName' ? this.searchValue : '',
          terminal: this.searchWay === 'searchByID' ? this.searchValue : '',
        }
        this.isTableLoading = true
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
            this.tableData = list.slice(0)
            this.totalCount = res.data.totalCount
          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => {
          this.isTableLoading = false
          console.log(err)
        })
      },
      //
      searchShopDataList() {
        clearTimeout(this.timeoutOfShopDataList)
        this.timeoutOfShopDataList = setTimeout(() => {
          this.getShopDataList()
        }, 800)
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
      // 分页组件方法
      // pageSize改变时调用
      handleSizeChange(val) {
        this.pageSize = val
        this.getShopDataList()
      },
      // currentPage改变时调用
      handleCurrentChange(val) {
        this.pageNo = val
        this.getShopDataList()
      },
      // 导出报表
      exportExcel() {
        let obj = {
          orderField: this.screenedValue,
          orderFlag: this.highOrLowRank,
          startDate: this.navObj['startDate'],
          endDate: this.navObj['endDate'],
          orgId: this.navObj['orgId'],
          countryId: this.navObj['countryId'],
          partnerType: this.partnerTypeValue,
          shopName: this.searchWay === 'searchByName' ? this.searchValue : '',
          terminal: this.searchWay === 'searchByID' ? this.searchValue : '',
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
    }
  }
</script>

<style lang="scss" scoped>
  .businessOverview-container {
    padding: 20px;
    height: 100%;

    /deep/ .el-table .cell {
      word-break: break-word;
    }

    .searchButton {
      min-width: 90px;
      line-height: 22px;
      padding: 5px 18px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      background: rgba(18, 183, 52, 1);
      box-shadow: 0px 6px 12px -4px rgba(18, 183, 52, 0.5);
      border-radius: 4px;
      float: right;
      margin-right: 8px;
    }

    .paidOrdersPartStyle {
      margin-bottom: 0px !important;
      height: 54px;
      display: flex;
      justify-content: center;
    }

    /deep/ .el-pagination .el-select .el-input {
      width: 130px;
    }

    .inlineBlock {
      display: inline-block;
    }

    .button-exportReport {
      padding: 5px 18px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 22px;
      background: rgba(18, 183, 52, 1);
      box-shadow: 0px 6px 12px -4px rgba(18, 183, 52, 0.5);
      border-radius: 4px;
      float: right;
      margin-right: 8px;
    }

    .rankFontStyle {
      text-align: center;
      padding: 0px 8px 0px 20px;
    }

    .textAlignCenter {
      text-align: center;
    }

    .IconColor0 {
      background-color: #12B734;
      box-shadow: 0px 4px 6px -1px rgba(18, 183, 52, 0.5);
    }

    .IconColor1 {
      background-color: #21C2FF;
      box-shadow: 0px 4px 6px -1px rgba(33, 194, 255, 0.5);
    }

    .IconColor2 {
      background-color: #87D721;
      box-shadow: 0px 4px 6px -1px rgba(18, 183, 52, 0.5);
    }

    .IconColor3 {
      background-color: #FFD830;
      box-shadow: 0px 4px 6px -1px rgba(255, 216, 48, 0.5);
    }

    .IconColor4 {
      background-color: #FF8720;
      box-shadow: 0px 4px 6px -1px rgba(255, 135, 32, 0.5);
    }

    .IconColor5 {
      background-color: #F14E45;
      box-shadow: 0px 4px 6px -1px rgba(241, 78, 69, 0.5);
    }

    .IconColor6 {
      background-color: #D8DDD9;
    }

    .item-header {
      display: inline-block;
      font-weight: 600;
      font-size: 18px;
      color: #2A2F2B;
      line-height: 28px;
      margin-bottom: 8px;
      font-family: PingFangSC-Semibold, PingFang SC;
    }

    .fontStyle {
      font-weight: 400;
      font-size: 14px;
      color: rgba(42, 47, 43, 1);
      line-height: 22px;
      font-family: PingFangSC-Regular, PingFang SC;
    }

    .fontStyle-little {
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      line-height: 18px;
      color: rgba(129, 141, 138, 1);
    }

    .fontStyle-number {
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      color: rgba(129, 141, 138, 1);
      text-align: right;
      font-family: PingFangSC-Regular, PingFang SC;
    }

    .overview-header {
      padding-left: 10px;
      padding-right: 10px;
      font-size: 24px;
      line-height: 36px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: rgba(42, 47, 43, 1);
    }

    .el-row {
      margin-bottom: 20px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    .el-col {
      border-radius: 4px;
    }

    .bg-light {
      background: #ffffff;
    }

    .bigNumber {
      font-size: 36px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(42, 47, 43, 1);
      line-height: 44px;
      text-align: center;
    }

    .card-totalTurnover {
      height: 184px;
    }

    .card-user {
      height: 184px;
      padding: 24px;
    }

    .card-abnormalOrder {
      height: 104px;
      padding: 22px 24px;
    }

    .card-paidOrder {
      height: 104px;
      padding: 22px 24px;
    }

    .card-onLeaseOrder {
      height: 64px;
      margin-bottom: 20px;
      padding: 21px 24px;
    }

    .card-freeOrder {
      height: 64px;
      padding: 21px 24px;
    }

    .grid-content {
      border-radius: 8px;
      box-shadow: 0px 6px 12px -4px rgba(225, 225, 235, 0.24);
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
</style>
