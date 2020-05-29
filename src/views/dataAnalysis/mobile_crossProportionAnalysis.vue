<template>
  <div class="mobile_crossProportionAnalysis">
    <div class="part1">
      <div class="part1-head van-hairline--bottom">
        <div style="display: flex">
          <svg-icon icon-class="data2" class="svgIconSize1"/>
          <div class="fontStyle1" style="margin-left: 8px;">总占比分析</div>
        </div>
      </div>
      <div class="part1-body">
        <div class="part1-body-item fontStyle3">
          <div class="part1-body-item-label">
            <div class="grayDot" style="margin-right: 8px"></div>
            <div>租借用户</div>
          </div>
          <div>{{orderAnalysis.rentUserNum}}</div>
        </div>
        <div class="part1-body-item fontStyle3">
          <div class="part1-body-item-label">
            <div class="grayDot" style="margin-right: 8px"></div>
            <div>单仓道订单贡献</div>
          </div>
          <div>{{orderAnalysis.orderPerChannel}}</div>
        </div>
        <div class="part1-body-item fontStyle3">
          <div class="part1-body-item-label">
            <div class="grayDot" style="margin-right: 8px"></div>
            <div>订单总数</div>
          </div>
          <div>{{orderAnalysis.orderNum}}</div>
        </div>
        <div class="part1-body-item fontStyle3">
          <div class="part1-body-item-label">
            <div class="grayDot" style="margin-right: 8px"></div>
            <div>平均订单时长</div>
          </div>
          <div>{{orderAnalysis.averageTime}}</div>
        </div>
        <div class="part1-body-item fontStyle3">
          <div class="part1-body-item-label">
            <div class="grayDot" style="margin-right: 8px"></div>
            <div>租借总额</div>
          </div>
          <div>{{orderAnalysis.totalRentMoney}}</div>
        </div>
        <div class="part1-body-item fontStyle3">
          <div class="part1-body-item-label">
            <div class="grayDot" style="margin-right: 8px"></div>
            <div>平均客单价</div>
          </div>
          <div>{{orderAnalysis.averageMoney}}</div>
        </div>
        <div class="part1-body-item fontStyle3">
          <div class="part1-body-item-label">
            <div class="grayDot" style="margin-right: 8px"></div>
            <div>单一用户租借频次</div>
          </div>
          <div>{{orderAnalysis.userRentFrequency}}</div>
        </div>
        <div class="part1-body-item fontStyle3">
          <div class="part1-body-item-label">
            <div class="grayDot" style="margin-right: 8px"></div>
            <div>付费订单占比</div>
          </div>
          <div>{{orderAnalysis.payOrderRatio}}</div>
        </div>
        <div class="part1-body-item fontStyle3">
          <div class="part1-body-item-label">
            <div class="grayDot" style="margin-right: 8px"></div>
            <div>付费用户占比</div>
          </div>
          <div>{{orderAnalysis.payUserRatio}}</div>
        </div>
      </div>
    </div>
    <div class="part2">
      <div class="part2-head">
        <div style="display: flex; align-items: flex-end;">
          <div @click="changeTable('dailyTable')" :class="{'fontStyle6': true, 'activeTable': showTable === 'dailyTable',}" style="margin-right: 24px;">日均统计</div>
<!--          <div @click="changeTable('deviceTypeTable')" :class="{'fontStyle6': true, 'activeTable': showTable === 'deviceTypeTable',}">按设备型号统计</div>-->
        </div>
        <div style="display: flex;">
          <div class="fontStyle5 exportTableButton" style="margin-right: 10px;" @click="downloadTimeData">导出表格</div>
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
          :data="analysisByTime">
          <el-table-column prop="time" align="center" :label="$t('dataAnalysis.statisticalDate')" min-width="100"></el-table-column>
          <el-table-column prop="orderNum" align="center" :label="$t('dataAnalysis.totalOrders')" min-width="100"></el-table-column>
          <el-table-column prop="rentUserNum" align="center" :label="$t('dataAnalysis.leasedUser')" min-width="100"></el-table-column>
          <el-table-column prop="totalRentMoney" align="center" :label="$t('dataAnalysis.totalRental')" min-width="100"></el-table-column>
          <el-table-column prop="orderPerChannel" align="center" :label="$t('dataAnalysis.singleWarehouseOrderContribution')" min-width="100"></el-table-column>
          <el-table-column prop="averageTime" align="center" :label="$t('dataAnalysis.averageOrderDuration')" min-width="100"></el-table-column>
          <el-table-column prop="averageMoney" align="center" :label="type === 1 ? $t('dataAnalysis.averageCustomerUnitPrice') : $t('dataAnalysis.averageCustomerUnitPriceMB')" min-width="100"></el-table-column>
          <el-table-column prop="buyRentRatio" align="center" :label="$t('dataAnalysis.proportionOfSalesLeasing')" v-if="type === 0" min-width="100"></el-table-column>
          <el-table-column prop="payOrderRatio" align="center" :label="$t('dataAnalysis.proportionOfPaidOrders')" min-width="100"></el-table-column>
          <el-table-column prop="payUserRatio" align="center" :label="$t('dataAnalysis.proportionOfPaidUsers')" min-width="100"></el-table-column>
        </el-table>
      </van-list>
    </div>
  </div>
</template>

<script>
  import {Col, Row, List, Toast} from 'vant';
  import {analysisByTime, downloadByTime, getShopDataList, orderAnalysis} from "@/services";
  import i18n from "@/i18n";

  export default {
    name: "mobile_crossProportionAnalysis",
    components: {
      [Col.name]: Col,
      [Row.name]: Row,
      [List.name]: List,
    },
    data() {
      return {
        showTable: 'dailyTable',
        //
        navObj: {},
        isActive: true,
        orderAnalysis: [],
        analysisByTerminal: [],
        analysisByTime: [],
        type: 0,
        // 表格
        total: 1,
        pageNo: 1,
        pageSize: 20,
        isFirstLoadOk: false,
        isListLoading: false,
        finished: false,
        error: false,
        isTableLoading: false,
      };
    },
    computed: {
      mobileNavbarObj() {
        return this.$store.state.app.mobileNavbarObj
      },
    },
    watch: {
      mobileNavbarObj: {
        handler(newValue, oldValue) {
          this.clickedQuery()
        },
      },
    },
    created() {
      let a = this.$store.state.app.mobileNavbarObj
      if (a.dateRange !== undefined) {
        this.clickedQuery()
      }
    },
    methods: {
      jumpToTablePage() {

      },
      changeTable(tableName) {
        this.showTable = tableName
      },
      onLoad() {
        if (this.isFirstLoadOk) {
          this.initTimeData(true)
        }
      },
      clickedQuery() {
        let a = this.$store.state.app.mobileNavbarObj
        let o = {
          startDate: a.dateRange[0],
          endDate: a.dateRange[1],
          orgId: a.orgStructureValue,
          countryId: a.country
        }
        this.navObj = Object.assign({}, this.navObj, o)
        this.initOrderAnalysisData();
        this.timeHandleClicked()
      },
      // excel导出
      excelDownload() {
        this.downloadTimeData()
      },
      // 按设备统计数据
      terminalHandleClicked() {
        this.isActive = false
      },
      // 按时间统计数据
      timeHandleClicked() {
        this.isActive = true
        this.initTimeData(false)
      },
      // 总占比分析
      initOrderAnalysisData() {
        let obj = {
          ...this.navObj,
        }
        orderAnalysis(obj).then(res => {
          // console.log(obj)
          if (res && res.code == 1) {
            this.orderAnalysis = res.data
          }
        }).catch(err => {
          this.$message.error(res.msg)
          console.log(err)
        })
      },
      // 按日统计
      initTimeData(isLoadMore) {
        if (!isLoadMore) {
          this.isFirstLoadOk = false
          this.isTableLoading = true
          this.pageNo = 1
          this.finished = false
          this.error = false
        }
        let obj = {
          "pageSize": this.pageSize,
          "pageNo": this.pageNo,
          ...this.navObj,
        }
        analysisByTime(obj).then(res => {
          this.isTableLoading = false
          if (res.code === 1) {
            if (!isLoadMore) {
              this.analysisByTime = res.data.list
              this.isFirstLoadOk = true
            } else if (isLoadMore) {
              this.analysisByTime = this.analysisByTime.concat(res.data.list)
            }
            this.isListLoading = false
            if (res.data.list.length === 0) {
              this.finished = true
            }
            this.pageNo += 1
            this.total = res.data.totalCount
            if (res.data.list && res.data.list.length > 0) {
              //0：直营 1：一二级代理
              this.type = res.data.list[0].type
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
      // 按设备统计
      initTerminalData() {
        var timeParam = {
          "pageSize": this.pageSize,
          "pageNo": this.pageNo,
          "startDate": "2019-11-11",
          "endDate": "2019-11-12",
          "orgList": [
            121, 122
          ],
          "countryId": 3
        }
      },
      //导出按日统计报表
      downloadTimeData() {
        let obj = {
          ...this.navObj,
        }
        // responseType: 'arraybuffer' 解决二进制文件流乱码问题
        downloadByTime(obj, {responseType: 'arraybuffer'}).then(res => {
          //处理返回的文件流
          const content = res
          const blob = new Blob([content])
          const fileName = `${i18n.t('dataAnalysis.dailyAverageStatistics')}.xls`
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
          } else {
            // IE10+下载
            navigator.msSaveBlob(blob, fileName);
          }
        }).catch(err => {
          this.$message.error(res.msg)
          console.log(err)
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .mobile_crossProportionAnalysis {
    .part1 {
      background-color: white;
      padding: 16px 8px 0px 8px;
      margin: 8px 0px;
      .part1-head {
        display: flex;
        justify-content: space-between;
        padding-bottom: 16px;
        margin-bottom: 16px;
      }
      .part1-body {
        display: flex;
        flex-direction: column;
        .part1-body-item {
          display: flex;
          justify-content: space-between;
          padding-right: 8px;
          margin-bottom: 16px;
          .part1-body-item-label {
            display: flex;
            align-items: center;
          }
        }
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
    .grayDot {
      width:6px;
      height:6px;
      border-radius: 8px;
      background:rgba(216,221,217,1);
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
    .activeTable {
      font-size:14px;
      font-family:PingFangSC-Semibold,PingFang SC;
      font-weight:600;
      color:rgba(18,183,52,1);
      line-height:22px;
      position: relative;
      &::after {
        content: '';
        position: absolute;
        width:40px;
        height:6px;
        background:rgba(18,183,52,1);
        box-shadow:0px 4px 6px -1px rgba(18,183,52,0.5);
        border-radius:3px;
        left: 50%;
        top: auto;
        bottom: -12px;
        right: auto;
        margin-left: -20px;
      }
    }
  }
</style>
