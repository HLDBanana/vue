<template>
  <div class="statistics">
    <div class="">  <!-- 黑色边框style="border:1px;border-style:solid;border-color:#6B6767;align=left;" -->
      <el-row>
        <div class="title1">{{ $t('dataAnalysis.totalShareAnalysis') }}</div>
      </el-row>
      <div class="card1 grid-content">
        <el-row type="flex" class="row-bg" justify="space-between" style="height: 100%;">
          <el-col class="card1Items" :span="4">
            <el-row class="flexStyle1">
              <div class="dotIconSmall IconColor6"></div>
              <div class="fontStyle" style="display: inline-block">{{ $t('dataAnalysis.leasedUser') }}:</div>
              <div class="fontStyle-number" style="display: inline-block">{{orderAnalysis.rentUserNum}}</div>
            </el-row>
            <el-row class="flexStyle1">
              <div class="dotIconSmall IconColor6"></div><div class="fontStyle" style="display: inline-block">{{ $t('dataAnalysis.singleWarehouseOrderContribution') }}:</div>
              <div class="fontStyle-number" style="display: inline-block">{{orderAnalysis.orderPerChannel}}</div>
            </el-row>
          </el-col>
          <el-col class="card1Items" :span="4">
            <el-row class="flexStyle1">
              <div class="dotIconSmall IconColor6"></div><div class="fontStyle" style="display: inline-block">{{ $t('dataAnalysis.totalOrders') }}:</div>
              <div class="fontStyle-number" style="display: inline-block">{{orderAnalysis.orderNum}}</div>
            </el-row>
            <el-row class="flexStyle1">
              <div class="dotIconSmall IconColor6"></div><div class="fontStyle" style="display: inline-block">{{ $t('dataAnalysis.averageOrderDuration') }}:</div>
              <div class="fontStyle-number" style="display: inline-block">{{orderAnalysis.averageTime}}</div>
            </el-row>
          </el-col>
          <el-col class="card1Items" :span="4">
            <el-row class="flexStyle1">
              <div class="dotIconSmall IconColor6"></div><div class="fontStyle" style="display: inline-block">{{ $t('dataAnalysis.totalRental') }}:</div>
              <div class="fontStyle-number" style="display: inline-block">{{orderAnalysis.totalRentMoney}}</div>
            </el-row>
            <el-row class="flexStyle1">
              <div class="dotIconSmall IconColor6"></div><div class="fontStyle" style="display: inline-block">{{ $t('dataAnalysis.averageCustomerUnitPrice') }}:</div>
              <div class="fontStyle-number" style="display: inline-block">{{orderAnalysis.averageMoney}}</div>
            </el-row>
          </el-col>
          <el-col class="card1Items" :span="4">
            <el-row class="flexStyle1">
              <div class="dotIconSmall IconColor6"></div><div class="fontStyle" style="display: inline-block">{{ $t('dataAnalysis.singleUserRentalFrequency') }}:</div>
              <div class="fontStyle-number" style="display: inline-block">{{orderAnalysis.userRentFrequency}}</div>
            </el-row>
            <el-row class="flexStyle1">
              <div class="dotIconSmall IconColor6"></div><div class="fontStyle" style="display: inline-block">{{ $t('dataAnalysis.proportionOfPaidOrders') }}:</div>
              <div class="fontStyle-number" style="display: inline-block">{{orderAnalysis.payOrderRatio}}</div>
            </el-row>
          </el-col>
          <el-col class="card1Items" :span="4">
            <el-row class="flexStyle1">
              <div class="dotIconSmall IconColor6"></div><div class="fontStyle" style="display: inline-block">{{ $t('dataAnalysis.proportionOfPaidUsers') }}:</div>
              <div class="fontStyle-number" style="display: inline-block">{{orderAnalysis.payUserRatio}}</div>
            </el-row>
            <el-row class="flexStyle1" style="visibility: hidden">
              <div class="dotIconSmall IconColor6"></div><div class="fontStyle" style="display: inline-block">占位:</div>
              <div class="fontStyle-number" style="display: inline-block">占位</div>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </div>
    <div style="margin-bottom: 20px;">
      <div>
        <!-- <div style="width:71px;height:28px;float:left;">
            <el-button type="text" :class="[isActive?'button-active':'dis-active']"
                    @click="timeHandleClicked">日均统计</el-button>
            <div :class="[isActive?'row-line1 line-left1':'row-line-hidden line-left1']"></div>
        </div>
        <div style="width:71px;height:28px;float:left;">
            <el-button  type="text" :class="[isActive?'dis-active left':'button-active left']"
                    @click="terminalHandleClicked">设备型号统计</el-button>
            <div :class="[isActive?'row-line-hidden line-left':'row-line1 line-left']"></div>
        </div> -->
        <el-row>
          <el-col :span="4">
            <el-button type="text" :class="[isActive?'button-active':'dis-active']"
                       @click="timeHandleClicked">{{ $t('dataAnalysis.dailyAverageStatistics') }}
            </el-button>
            <div :class="[isActive?'row-line1 line-left1':'row-line-hidden line-left1']"></div>
          </el-col>
          <!-- class="secondButtonLocation" -->
          <!--                <el-col :span="2" >-->
          <!--                    <el-button  type="text" :class="[isActive?'dis-active left':'button-active left']"-->
          <!--                        @click="terminalHandleClicked">设备型号统计</el-button>-->
          <!--                    <div :class="[isActive?'row-line-hidden line-left':'row-line1 line-left']"></div>-->
          <!--                </el-col>-->
          <el-col :span="16">
            <div class="test" style="text-align: center;color:#F3F3F7">.</div>
          </el-col>
          <el-col :span="4">
            <el-button class="button-exportReport" @click="excelDownload" :disabled="exportActive">
              <img src="../../icons/png/icon10.png" style="vertical-align: sub;" alt=""/>&nbsp;<span>{{ $t('dataAnalysis.exportReport') }}</span>
            </el-button>
          </el-col>
        </el-row>
      </div>
      <div class="row-line"></div>
    </div>

    <div>
      <!-- :header-cell-style="{background:'#F3F3F7',color:'#818D8A'}"  -->
      <el-table v-loading="loading" :data="analysisByTime" style="width: 100%" max-height="750px">
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

      <el-pagination
        style="text-align: center; margin-top: 24px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNo"
        :page-sizes="[2, 5, 10, 15,20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <!-- 弹出框组件
    <div v-show="isshow">
      <add title="添加" :addData="addData" @childClose="childClose"></add>
    </div>
    -->
  </div>
</template>

<script>
  import {orderAnalysis, analysisByTime, getManageDetail, downloadByTime} from '../../services'
  import i18n from '@/i18n/index'

  export default {
    data() {
      return {
        navObj: {},
        isActive: true,
        exportActive: false,
        total: 1,
        pageSize: 10,
        pageNo: 1,
        orderAnalysis: [],
        analysisByTerminal: [],
        analysisByTime: [],
        type: 0,
        loading: false
      };
    },
    computed: {
      navbarDoQuery() {
        return this.$store.state.app.navbarDoQuery
      }
    },
    watch: {
      navbarDoQuery: {
        handler(newValue, oldValue) {
          this.clickedQuery()
        },
      },
    },
    created() {
      let a = this.$store.state.app.navbarObj
      if (a.dateRange !== undefined) {
        this.$store.dispatch('app/initNavbarQuery')
      }
    },
    methods: {
      clickedQuery() {
        let a = this.$store.state.app.navbarObj
        let o = {
          startDate: a.dateRange[0],
          endDate: a.dateRange[1],
          orgId: a.orgStructureValue,
          countryId: a.country
        }
        this.navObj = Object.assign({}, this.navObj, o)
        this.pageSize = 10
        this.pageNo = 1
        this.initOrderAnalysisData();
        this.timeHandleClicked()
        // this.$store.dispatch('app/isLoading', false)
      },
      // excel导出
      excelDownload() {
        this.exportActive = true
        this.downloadTimeData()
      },
      // 按设备统计数据
      terminalHandleClicked() {
        this.isActive = false
      },
      // 按时间统计数据
      timeHandleClicked() {
        this.isActive = true
        this.initTimeData()
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
      initTimeData() {
        let obj = {
          "pageSize": this.pageSize,
          "pageNo": this.pageNo,
          ...this.navObj,
        }
        this.loading = true
        analysisByTime(obj).then(res => {
          this.loading = false
          if (res && res.code === 1) {
            this.analysisByTime = res.data.list
            this.total = res.data.totalCount
            debugger
            if (this.analysisByTime && this.analysisByTime.length > 0) {
              //0：直营 1：一二级代理
              this.type = res.data.list[0].type
            }
          }
        }).catch(err => {
          this.loading = false
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
          this.exportActive = false
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
          this.loading = false
          this.$message.error(res.msg)
          console.log(err)
        })
      },
      // 改变每页条数
      handleSizeChange(val) {
        this.pageSize = val
        this.initTimeData()
        // console.log(`每页 ${val} 条`);
      },
      // 改变页码
      handleCurrentChange(val) {
        this.pageNo = val
        this.initTimeData()
        // console.log(`当前页: ${val}`);
      }
    },
  }
</script>

<style lang="scss" scoped>
  .statistics {
    padding: 20px;
    height: 100%;
    margin-bottom: 20px;

    .flexStyle1 {
      display: flex;
      align-items: baseline;
    }

    /deep/ .el-table .cell {
      word-break: break-word;
    }

    /deep/ .el-pagination .el-select .el-input {
      width: 130px;
    }

    .title1 {
      margin-bottom: 8px;
      font-size:24px;
      font-family:PingFangSC-Semibold,PingFang SC;
      font-weight:600;
      color:rgba(42,47,43,1);
      line-height:36px;
    }

    padding-statistics {
      margin-bottom: 20px
    }

    .card1 {
      background: #ffffff;
      min-width: 1024px;
      padding: 20px;
      margin-bottom: 20px;
    }

    .card1Items {
      display: flex;
      flex-direction: column;
      justify-content: center;
      border-right: 1px solid #D8DDD9;
      &:nth-last-child(1) {
        border-right: none;
      }
      .el-row:nth-child(1) {
        margin-bottom: 10px;
      }
    }

    .grid-content {
      border-radius: 8px;
      min-height: 138px;
      box-shadow: 0px 6px 12px -4px rgba(225, 225, 235, 0.24);
      display: flex;
      flex-direction: column;
      justify-content: center;
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

    .paddingStype1 {
      padding-top: 20px;
    }

    .fontStyle {
      width: calc(100% - 80px);
      margin-right: 5px;
      font-size:14px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(42,47,43,1);
      line-height:22px;
    }

    .fontStyle-number {
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      color: rgba(129, 141, 138, 1);
      text-align: right;
      font-family: PingFangSC-Regular, PingFang SC;
    }

    .line-style {
      text-align: right;
      padding-left: 20px;

      .col-line1 {
        margin-left: 20px;
        border: 1px;
        border-color: #D8DDD9;
        border-style: solid;
        height: 44px;
        width: 1px;
      }

      .col-line2 {
        margin-left: 20px;
        border: 1px;
        border-color: #D8DDD9;
        border-style: solid;
        height: 24px;
        width: 1px;
      }
    }

    .row-line {
      border: 1px;
      border-color: #D8DDD9;
      border-style: solid;
      height: 1px;
      width: 100%;
    }

    .row-line1 {
      border: 2px;
      border-color: #12B734;
      border-style: solid;
      height: 2px;
      width: 90px;
      //margin-left: 15px;
    }

    .row-line-hidden {
      border: 2px;
      border-color: #12B734;
      border-style: solid;
      height: 2px;
      width: 90px;
      opacity: 0;
      margin-left: 15px;
    }

    .dis-active {
      width: 120px;
      height: 28px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-size: 12px;
      color: #818D8A;
      text-align: center;
    }

    .button-active {
      padding-bottom: 3px;
      width: 120px;
      height: auto;
      font-family: PingFangSC-Blod, PingFang SC;
      font-size: 18px;
      font-weight: bolder;
      color: #2A2F2B;
      text-align: center;
    }

    .secondButtonLocation {
      padding-left: 0px;
      padding-right: 0px;
      margin-left: 40px;
    }

    .line-left {
      margin-left: 14px;
    }

    .line-left1 {
      margin-left: 15px;
    }

    .button-exportReport.el-button {
      float: right;
      padding: 5px 18px;
      font-size: 14px;
      font-family: PingFangSC-Blod, PingFang SC;
      //font-weight:400;
      font-weight: bolder;
      color: rgba(255, 255, 255, 1);
      line-height: 22px;
      background: rgba(18, 183, 52, 1);
      box-shadow: 0px 6px 12px -4px rgba(18, 183, 52, 0.5);
      border-radius: 4px;
    }

    /*.el-pagination.is-background .el-pager li:not(.disabled).active {*/
    /*  background-color: #12B734;*/
    /*  color: #FFF;*/
    /*}*/

    /*.el-select-dropdown__item.selected {*/
    /*  color: #12B734;*/
    /*  font-weight: 700;*/
    /*}*/

    /*设置xx条/页的框的颜色*/
    /*.el-select .el-input.is-focus .el-input__inner,*/
    /*.el-pagination__sizes .el-input .el-input__inner:hover,*/
    /*.el-select .el-input__inner:focus {*/
    /*  border-color: #12B734;*/
    /*}*/

    /*设置当前页码的样式，及鼠标移上其他页码时的样式,以及左右箭头鼠标移上的样式*/
    /*.el-pager li.active, .el-pager li:hover,*/
    /*.el-pagination button:hover {*/
    /*  color: #12B734;*/
    /*}*/
  }
</style>
