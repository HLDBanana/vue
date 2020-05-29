<template>
  <div class="mobile-dashboard">
    <div v-if="isShowArr.includes(4)" class="todayData">
      <div class="todayData-head">
        <div style="display: flex">
          <svg-icon icon-class="data0" class="svgIconSize1"/>
          <div class="fontStyle1" style="margin-left: 8px;">今日数据汇总</div>
        </div>
      </div>
      <van-row gutter="8" class="todayData-body">
        <van-col span="6">
          <div class="todayData-body-card">
            <div class="fontStyle2" style="margin-bottom: 5px">新增注册用户</div>
            <div class="fontStyle3">{{ dataCollect.todayRegisterUser }}</div>
          </div>
        </van-col>
        <van-col span="6">
          <div class="todayData-body-card">
            <div class="fontStyle2" style="margin-bottom: 5px">订单</div>
            <div class="fontStyle3">{{ dataCollect.todayOrder }}</div>
          </div>
        </van-col>
        <van-col span="6">
          <div class="todayData-body-card">
            <div class="fontStyle2" style="margin-bottom: 5px">营业额</div>
            <div class="fontStyle3">{{ dataCollect.todayIncome }}</div>
          </div>
        </van-col>
        <van-col span="6">
          <div class="todayData-body-card">
            <div class="fontStyle2" style="margin-bottom: 5px">新增设备</div>
            <div class="fontStyle3">{{ dataCollect.todayApplyTerminal }}</div>
          </div>
        </van-col>
      </van-row>
    </div>
    <div class="piePart">
      <div class="piePart-head">
        <div style="display: flex; margin-left: 8px;">
          <svg-icon icon-class="data2" class="svgIconSize1"/>
          <div class="fontStyle1" style="margin-left: 8px;">饼状图占比分析</div>
        </div>
      </div>
      <van-swipe :width="swipeItemWidth" :loop="false" @change="pieChartSwipeOnChange">
        <van-swipe-item class="pieChartSwipeItem" v-if="isShowArr.includes(5)">
          <div class="whiteCard">
            <div class="chartTitle">{{ $t('dashboard.sceneDistributionStatisticsBySite') }}</div>
            <div v-if="showShopChartMask" class="maskLayer">
              <span>{{ $t('dashboard.noData') }}</span>
            </div>
            <div id="shopChart" class="pie"></div>
            <div class="sorts1">
              <van-row gutter="8">
                <van-col class="sceneItem" span="12" v-for="(item, index) in sceneInfoByShop.shopTypeList">
                  <div :class="{ dotIcon: true, dotColor0: index === 0, dotColor1: index === 1, dotColor2: index === 2, dotColor3: index === 3, dotColor4: index === 4, dotColor5: index === 5, dotColor6: index === 6, dotColor7: index === 7, dotColor8: index === 8, dotColor9: index === 9,}"></div>
                  <div class="fontStyle2" style="display: inline-block; width: calc(100% - 20px)">{{ item.typeName }} {{ (item.shopRatio * 100).toFixed(0) }}%</div>
                </van-col>
              </van-row>
            </div>
          </div>
        </van-swipe-item>
        <van-swipe-item class="pieChartSwipeItem" v-if="isShowArr.includes(5)">
          <div class="whiteCard">
            <div class="chartTitle">{{ $t('dashboard.sceneDistributionStatisticsByOrder') }}</div>
            <div v-if="showOrderChartMask" class="maskLayer">
              <span>{{ $t('dashboard.noData') }}</span>
            </div>
            <div id="orderChart" class="pie"></div>
            <div class="sorts1">
              <van-row gutter="8">
                <van-col class="sceneItem" span="12" v-for="(item, index) in sceneInfoByOrder.shopTypeList">
                  <div :class="{ dotIcon: true, dotColor0: index === 0, dotColor1: index === 1, dotColor2: index === 2, dotColor3: index === 3, dotColor4: index === 4, dotColor5: index === 5, dotColor6: index === 6, dotColor7: index === 7, dotColor8: index === 8, dotColor9: index === 9,}"></div>
                  <div class="fontStyle2" style="display: inline-block; width: calc(100% - 20px)">{{ item.typeName }} {{ (item.orderRatio * 100).toFixed(0) }}%</div>
                </van-col>
              </van-row>
            </div>
          </div>
        </van-swipe-item>
        <van-swipe-item class="pieChartSwipeItem" v-if="isShowArr.includes(5)">
          <div class="whiteCard">
            <div class="chartTitle">{{ $t('dashboard.sceneDistributionStatisticsByIncome') }}</div>
            <div v-if="showIncomeChartMask" class="maskLayer">
              <span>{{ $t('dashboard.noData') }}</span>
            </div>
            <div id="incomeChart" class="pie"></div>
            <div class="sorts1">
              <van-row gutter="8">
                <van-col class="sceneItem" span="12" v-for="(item, index) in sceneInfoByIncome.shopTypeList">
                  <div :class="{ dotIcon: true, dotColor0: index === 0, dotColor1: index === 1, dotColor2: index === 2, dotColor3: index === 3, dotColor4: index === 4, dotColor5: index === 5, dotColor6: index === 6, dotColor7: index === 7, dotColor8: index === 8, dotColor9: index === 9,}"></div>
                  <div class="fontStyle2" style="display: inline-block; width: calc(100% - 20px)">{{ item.typeName }} {{ (item.incomeRatio * 100).toFixed(0) }}%</div>
                </van-col>
              </van-row>
            </div>
          </div>
        </van-swipe-item>
        <van-swipe-item class="pieChartSwipeItem" v-if="isShowArr.includes(6)">
          <div class="whiteCard">
            <div class="chartTitle">{{ $t('dashboard.userRegistrationChannelStatistics') }}</div>
            <div v-if="showRegisterChannelChartMask" class="maskLayer">
              <span>{{ $t('dashboard.noData') }}</span>
            </div>
            <div id="registerChannelChart" class="pie"></div>
            <div class="sorts1">
              <van-row class="fontStyle2" style="margin-bottom: 20px;">
                <van-col span="12" class="flexLayout1">
                  <div class="dotIconSmall IconColorGray"></div>
                  <div style="display: inline-block; width: calc(100% - 20px)">{{ $t('dashboard.totalRegisteredUsers') + ' ' + userRegisterChannel.userRegisterTotal}}</div>
                </van-col>
                <van-col span="12" class="flexLayout1">
                  <div style="visibility: hidden" class="dotIconSmall IconColor4"></div>
                  <div style="display: inline-block; width: calc(100% - 20px)">{{ $t('dashboard.leaseConversionRate') + ' ' + (userRegisterChannel.borrowRatioTotal * 100).toFixed(0) }}%</div>
                </van-col>
              </van-row>
              <van-row gutter="8">
                <van-col class="sceneItem" span="12" v-for="(item, index) in userRegisterChannel.userRegisterList">
                  <div :class="{ dotIcon: true, dotColor0: index === 0, dotColor1: index === 1, dotColor2: index === 2, dotColor3: index === 3, dotColor4: index === 4, dotColor5: index === 5, dotColor6: index === 6, dotColor7: index === 7, dotColor8: index === 8, dotColor9: index === 9,}"></div>
                  <div class="fontStyle2" style="display: inline-block; width: calc(100% - 20px)">{{ item.thirdType }} {{ item.userRegisterNum }}</div>
                </van-col>
              </van-row>
            </div>
          </div>
        </van-swipe-item>
        <van-swipe-item class="pieChartSwipeItem" v-if="isShowArr.includes(7)">
          <div class="whiteCard">
            <div class="chartTitle">{{ $t('dashboard.orderProportionStatistics') }}</div>
            <div v-if="showOrderRatioChartMask" class="maskLayer">
              <span>{{ $t('dashboard.noData') }}</span>
            </div>
            <div id="orderRatioChart" class="pie"></div>
            <div class="sorts1">
              <van-row>
                <van-col span="24">
                  <el-radio-group v-model="radioOfOrderRatio" @change="changeOrderRatioChart" size="mini" style="margin-bottom: 20px;">
                    <el-radio-button :label="1">{{ $t('dashboard.byLeaseTime') }}</el-radio-button>
                    <el-radio-button :label="2">{{ $t('dashboard.byLeaseAmount') }}</el-radio-button>
                  </el-radio-group>
                </van-col>
              </van-row>
              <van-row v-if="radioOfOrderRatio === 1">
                <van-row class="fontStyle2" v-for="(item, index) in orderRatioByTime.orderList">
                  <van-col span="18">
                    <div :class="{ dotIcon: true, dotColor0: index === 0, dotColor1: index === 1, dotColor2: index === 2, dotColor3: index === 3, dotColor4: index === 4, dotColor5: index === 5, dotColor6: index === 6, dotColor7: index === 7, dotColor8: index === 8, dotColor9: index === 9,}"></div>
                    {{ item.timeRange }}
                  </van-col>
                  <van-col span="6">{{ item.orderNum }}</van-col>
                </van-row>
              </van-row>
              <van-row v-if="radioOfOrderRatio === 2">
                <van-row class="fontStyle2" v-for="(item, index) in orderRatioByMoney.orderList">
                  <van-col span="18">
                    <div :class="{ dotIcon: true, dotColor0: index === 0, dotColor1: index === 1, dotColor2: index === 2, dotColor3: index === 3, dotColor4: index === 4, dotColor5: index === 5, dotColor6: index === 6, dotColor7: index === 7, dotColor8: index === 8, dotColor9: index === 9,}"></div>
                    {{ item.moneyRange }}
                  </van-col>
                  <van-col span="6">{{ item.orderNum }}</van-col>
                </van-row>
              </van-row>
            </div>
          </div>
        </van-swipe-item>
        <van-swipe-item class="pieChartSwipeItem" v-if="isShowArr.includes(8)">
          <div class="whiteCard">
            <div class="chartTitle">{{ $t('dashboard.orderPaymentChannelAnalysis') }}</div>
            <div v-if="showOrderChannelChartMask" class="maskLayer">
              <span>{{ $t('dashboard.noData') }}</span>
            </div>
            <div id="orderChannelChart" class="pie"></div>
            <div class="sorts1">
              <van-row class="fontStyle2" v-for="(item, index) in orderChannel.orderList">
                <van-col span="18">
                  <div :class="{ dotIcon: true, dotColor0: index === 0, dotColor1: index === 1, dotColor2: index === 2, dotColor3: index === 3, dotColor4: index === 4, dotColor5: index === 5, dotColor6: index === 6, dotColor7: index === 7, dotColor8: index === 8, dotColor9: index === 9,}"></div>
                  {{ item.payChannel }}
                </van-col>
                <van-col span="6">{{ item.orderNum }}</van-col>
              </van-row>
            </div>
          </div>
        </van-swipe-item>
        <template #indicator>
          <div class="custom-indicator">
            <div v-for="(item, index) in pieChartArray" :class="{'item': true, 'item-active': indicatorCurrentIndex === index}"></div>
          </div>
        </template>
      </van-swipe>
    </div>
    <div class="linePart">
      <div v-if="isShowArr.includes(9)" class="revenueStreamChart">
        <div class="linePart-head">
          <div class="fontStyle1">营收流水趋势</div>
          <svg-icon icon-class="filter_nor" class="svgIconSize1" @click="showRevenueStreamChartSetting = true"/>
        </div>
        <div class="linePart-body">
          <div id="revenueStreamChart" class="line"></div>
        </div>
      </div>
    </div>
    <div class="barPart">
      <div v-if="isShowArr.includes(10)" class="growthStatistics1">
        <div class="barPart-head">
          <div class="fontStyle1">营收同比增长统计</div>
          <svg-icon icon-class="filter_nor" class="svgIconSize1" @click="showGrowthStatistics1Setting = true"/>
        </div>
        <div class="barPart-body">
          <div id="growthStatistics1" class="bar"></div>
        </div>
      </div>
      <div v-if="isShowArr.includes(11)" class="growthStatistics2">
        <div class="barPart-head">
          <div class="fontStyle1">营收环比增长统计</div>
          <svg-icon icon-class="filter_nor" class="svgIconSize1" @click="showGrowthStatistics2Setting = true"/>
        </div>
        <div class="barPart-body">
          <div id="growthStatistics2" class="bar"></div>
        </div>
      </div>
    </div>
    <!-- 折线图检索条件 -->
    <van-popup
      v-model="showRevenueStreamChartSetting"
      :close-on-popstate="true"
      round
      style="width: 90%; padding: 24px;"
      @close="cancelSetting('revenueStreamChart')">
      <el-form ref="settingForm" :model="revenueStreamChartSettingForm" label-position="left" label-width="80px">
        <el-form-item label="统计日期">
          <el-input v-model="revenueStreamChartSettingForm.dateRangeLabel" readonly @click.native="showRevenueStreamChartCalendar = true"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footPart" style="margin-top: 24px">
        <div class="cancelButton" @click="showRevenueStreamChartSetting = false">取消</div>
        <div class="confirmButton" @click="confirmSetting('revenueStreamChart')">确认</div>
      </div>
    </van-popup>
    <van-calendar
      v-model="showRevenueStreamChartCalendar"
      :default-date="revenueStreamCalendarDefaultDate"
      :min-date="new Date(2018, 0, 1)"
      :close-on-popstate="true"
      color="#409eff"
      type="range"
      @confirm="(date) => dateOnConfirm(date, 'revenueStreamChart')"/>
    <!-- 柱状图（同比）检索条件 -->
    <van-popup
      v-model="showGrowthStatistics1Setting"
      :close-on-popstate="true"
      round
      style="width: 90%; padding: 24px;"
      @close="cancelSetting('growthStatistics1')">
      <el-form ref="settingForm" :model="growthStatistics1SettingForm" label-position="left" label-width="80px">
        <el-form-item label="按星期几对比统计" label-width="140px">
          <el-input v-model="growthStatistics1SettingForm.day" readonly @click.native="showGrowthStatistics1DaySelector = true"></el-input>
        </el-form-item>
        <el-form-item label="统计日期">
          <el-input v-model="growthStatistics1SettingForm.dateRangeLabel" readonly @click.native="showGrowthStatistics1Calendar = true"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footPart" style="margin-top: 24px">
        <div class="cancelButton" @click="showGrowthStatistics1Setting = false">取消</div>
        <div class="confirmButton" @click="confirmSetting('growthStatistics1')">确认</div>
      </div>
    </van-popup>
    <van-popup
      v-model="showGrowthStatistics1DaySelector"
      :close-on-popstate="true"
      position="bottom">
      <van-picker
        show-toolbar
        value-key="label"
        :columns="week"
        @cancel="growthStatistics1DayOnCancel"
        @confirm="growthStatistics1DayOnConfirm"
      />
    </van-popup>
    <van-calendar
      v-model="showGrowthStatistics1Calendar"
      :default-date="growthStatistics1CalendarDefaultDate"
      :min-date="new Date(2018, 0, 1)"
      :close-on-popstate="true"
      color="#409eff"
      type="range"
      @confirm="(date) => dateOnConfirm(date, 'growthStatistics1')"/>
    <!-- 柱状图（环比）检索条件 -->
    <van-popup
      v-model="showGrowthStatistics2Setting"
      :close-on-popstate="true"
      round
      style="width: 90%; padding: 24px;"
      @close="cancelSetting('growthStatistics2')">
      <el-form ref="settingForm" :model="growthStatistics2SettingForm" label-position="left" label-width="80px">
        <el-form-item label="统计日期">
          <el-input v-model="growthStatistics2SettingForm.dateRangeLabel" readonly @click.native="showGrowthStatistics2Calendar = true"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footPart" style="margin-top: 24px">
        <div class="cancelButton" @click="showGrowthStatistics2Setting = false">取消</div>
        <div class="confirmButton" @click="confirmSetting('growthStatistics2')">确认</div>
      </div>
    </van-popup>
    <van-calendar
      v-model="showGrowthStatistics2Calendar"
      :default-date="growthStatistics2CalendarDefaultDate"
      :min-date="new Date(2018, 0, 1)"
      :close-on-popstate="true"
      color="#409eff"
      type="range"
      @confirm="(date) => dateOnConfirm(date, 'growthStatistics2')"/>
  </div>
</template>

<script>
  import {Col, Row, Swipe, SwipeItem, Popup, Calendar, Picker} from 'vant';
  import {
    getDataCollect,
    getSceneInfoByShop,
    getSceneInfoByOrder,
    getSceneInfoByIncome,
    getUserRegisterChannel,
    getOrderRatioByMoney,
    getOrderRatioByTime,
    getOrderChannel,
    getRevenueStream,
    getIncomeCompare,
    getMenuList,
  } from '../../services'
  import {formatTime, upperCaseFirstCharactor} from '../../utils/common'
  import echarts from 'echarts'
  import qs from 'qs'
  import {getToken} from '@/utils/auth'
  import i18n from '@/i18n/index'

  export default {
    name: "mobile_dashboard",
    components: {
      [Col.name]: Col,
      [Row.name]: Row,
      [Swipe.name]: Swipe,
      [SwipeItem.name]: SwipeItem,
      [Popup.name]: Popup,
      [Calendar.name]: Calendar,
      [Picker.name]: Picker,
    },
    data() {
      return {
        isShowArr: [
          // "4", // 今日数据
          // "5", // 场景分布统计
          // "6", // 用户注册渠道统计
          // "7", // 订单占比统计
          // "8", // 订单付款渠道分析
          // "9", // 营收流水趋势分析
          // "10", // 营收同比增长统计
          // "11", // 营收环比增长统计
        ],
        pieChartArray: [],
        navObj: {},
        dataCollect: {
          todayRegisterUser: 0, // 今日注册用户
          todayOrder: 0, // 今日订单数
          todayIncome: 0, // 今日营业额
          yesterDayRegisterUser: 0, // 昨日注册用户
          yesterOrder: 0, // 昨日订单数
          yesterIncome: 0,	// 昨日租借总额
          currentWeekRegisterUser: 0, // 本周注册用户
          currentWeekOrder: 0, // 本周订单数
          currentWeekIncomer: 0, // 本周租借总额
          currentMonthRegisterUser: 0, // 本月注册用户数
          currentMonthOrder: 0, // 本月订单数
          currentMonthIncome: 0, // 本月租借总额
          todayApplyTerminal: 0, // 今日新增上线设备
          terminalOnline: 0, // 在线设备
          terminalOnlineRatio: 0, // 设备在线率
        },
        week: [
          {
            label: i18n.t('dashboard.monday'),
            value: '星期一',
          },
          {
            label: i18n.t('dashboard.tuesday'),
            value: '星期二',
          },
          {
            label: i18n.t('dashboard.wednesday'),
            value: '星期三',
          },
          {
            label: i18n.t('dashboard.thursday'),
            value: '星期四',
          },
          {
            label: i18n.t('dashboard.friday'),
            value: '星期五',
          },
          {
            label: i18n.t('dashboard.saturday'),
            value: '星期六',
          },
          {
            label: i18n.t('dashboard.sunday'),
            value: '星期日',
          },
        ],
        dateRangeDay1: [],
        dateRangeMonth1: [],
        dateRange2: [],
        dateRangeDay3: [],
        dateRangeMonth3: [],
        allTableData1: [],
        allTableData2: [],
        // 饼图
        sceneInfoByShop: {},
        sceneInfoByOrder: {},
        sceneInfoByIncome: {},
        userRegisterChannel: {},
        radioOfOrderRatio: 1, // 1 按租借时间，2 按租借金额
        orderRatioByTime: {},
        orderRatioByMoney: {},
        orderChannel: {},
        // 是否显示遮罩层（无数据时显示）
        showShopChartMask: false,
        showOrderChartMask: false,
        showIncomeChartMask: false,
        showRegisterChannelChartMask: false,
        showOrderRatioChartMask: false,
        showOrderChannelChartMask: false,
        // 折线图
        incomePledge: {
          "totalpledge": {
            "sum": 0,
            "max": 0,
            "min": 0
          },
          "totalMoney": {
            "sum": 0,
            "max": 0,
            "min": 0
          },
          "deposit": {
            "sum": 0,
            "max": 0,
            "min": 0
          },
          "recharge": {
            "sum": 0,
            "max": 0,
            "min": 0
          }
        },
        // 柱状图
        incomeCompare1: {},
        incomeCompare2: {},
        //
        // 轮播图
        swipeItemWidth: '',
        indicatorCurrentIndex: 0,
        // 折线图
        showRevenueStreamChartSetting: false,
        showRevenueStreamChartCalendar: false,
        revenueStreamChartSettingForm: {
          dateRange: '',
          dateRangeLabel: '',
        },
        popupLevelRevenueStreamChartSettingForm: {
          dateRange: '',
          dateRangeLabel: '',
        },
        revenueStreamCalendarDefaultDate: [],
        // 柱状图（同比）
        showGrowthStatistics1Setting: false,
        showGrowthStatistics1DaySelector: false,
        showGrowthStatistics1Calendar: false,
        growthStatistics1SettingForm: {
          dateRange: '',
          dateRangeLabel: '',
          day: '星期一',
        },
        popupLevelGrowthStatistics1SettingForm: {
          dateRange: '',
          dateRangeLabel: '',
          day: '星期一',
        },
        growthStatistics1CalendarDefaultDate: [],
        // 柱状图（环比）
        showGrowthStatistics2Setting: false,
        showGrowthStatistics2Calendar: false,
        growthStatistics2SettingForm: {
          dateRange: '',
          dateRangeLabel: '',
        },
        popupLevelGrowthStatistics2SettingForm: {
          dateRange: '',
          dateRangeLabel: '',
        },
        growthStatistics2CalendarDefaultDate: [],
      }
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
    async created() {
      this.swipeItemWidth = window.innerWidth
      await this.getMenuList()
      // 首次加载导航栏时 dateRange === undefined，监听 mobileNavbarObj 调用 clickedQuery
      // 已经加载过导航栏时 dateRange !== undefined，直接调用 clickedQuery
      let a = this.$store.state.app.mobileNavbarObj
      if (a.dateRange !== undefined) {
        this.clickedQuery()
      }
    },
    methods: {
      // 根据登录账户，获取首页的查看权限
      async getMenuList() {
        let id = this.$route.meta.id
        let obj = {
          menuId: id, // 数据统计首页id
          access_token: getToken()
        }
        await getMenuList(qs.stringify(obj)).then(res => {
          if (res.result === 1) {
            let arr = []
            res.data.forEach(e => {
              arr.push(e.code)
            })
            this.isShowArr = arr.slice(0)
            this.getPieChartArray(this.isShowArr)
          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => {
          console.log('err', err)
        })
      },
      getPieChartArray(array) {
        if (this.isShowArr.includes(5)) {
          this.pieChartArray.push(1, 1, 1)
        }
        if (this.isShowArr.includes(6)) {
          this.pieChartArray.push(1)
        }
        if (this.isShowArr.includes(7)) {
          this.pieChartArray.push(1)
        }
        if (this.isShowArr.includes(8)) {
          this.pieChartArray.push(1)
        }
      },
      // 进入页面时立即调用的方法
      clickedQuery() {
        let a = this.$store.state.app.mobileNavbarObj
        let o = {
          startDate: a.dateRange[0],
          endDate: a.dateRange[1],
          orgId: a.orgStructureValue,
          countryId: a.country,
        }
        this.navObj = Object.assign({}, this.navObj, o)
        this.main()
      },
      main() {
        this.homePageTheme = require('../../assets/echarts/homePage')
        echarts.registerTheme('homePage', this.homePageTheme)
        this.getDefaultDateRange()
        this.getDataCollect()
        this.getSceneInfoByShop(true)
        this.getSceneInfoByOrder(true)
        this.getSceneInfoByIncome(true)
        this.getUserRegisterChannel(true)
        this.getOrderRatioByTime(true)
        this.getOrderChannel(true)
        this.getRevenueStream(true)
        this.getIncomeCompare(this.popupLevelGrowthStatistics1SettingForm.day, true)
        this.getIncomeCompare(1, true)
      },
      //
      // 接口
      getDataCollect() {
        let obj = {
          orgId: this.navObj.orgId,
          countryId: this.navObj.countryId,
        }
        getDataCollect(obj).then(res => {
          if (res.code === 1) {
            let keys = Object.keys(this.dataCollect)
            keys.forEach(item => {
              if (res.data[item] === undefined) {
                res.data[item] = 0
              }
            })
            this.dataCollect = Object.assign({}, this.dataCollect, res.data)
          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      getSceneInfoByShop(drawChart) {
        let obj = {
          ...this.navObj
        }
        getSceneInfoByShop(obj).then(res => {
          if (res.code === 1) {
            this.sceneInfoByShop = Object.assign({}, {
              "shopTotal": 0,
              "terminalTotal": 0,
              "shopTypeTotal": 0,
              "shopTypeList": [],
            }, res.data)
            this.showShopChartMask = (this.sceneInfoByShop.shopTypeList.length === 0)
            if (drawChart === true) {
              this.ShopChart()
            }
          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      getSceneInfoByOrder(drawChart) {
        let obj = {
          ...this.navObj
        }
        getSceneInfoByOrder(obj).then(res => {
          if (res.code === 1) {
            this.sceneInfoByOrder = Object.assign({}, {
              "shopTypeTotal": 0,
              "payOrderTotalNum": 0,
              "orderTotalNum": 0,
              "freeOrderTotalNum": 0,
              "shopTypeList": [],
            }, res.data)
            this.showOrderChartMask = (this.sceneInfoByOrder.shopTypeList.length === 0)
            if (drawChart === true) {
              this.OrderChart()
            }
          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      getSceneInfoByIncome(drawChart) {
        let obj = {
          ...this.navObj
        }
        getSceneInfoByIncome(obj).then(res => {
          if (res.code === 1) {
            this.sceneInfoByIncome = Object.assign({}, {
              "shopTypeTotal": 0,
              "incomeTotal": 0,
              "shopTypeList": [],
            }, res.data)
            this.showIncomeChartMask = (this.sceneInfoByIncome.shopTypeList.length === 0)
            if (drawChart === true) {
              this.IncomeChart()
            }
          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      getUserRegisterChannel(drawChart) {
        let obj = {
          startDate: this.navObj.startDate,
          endDate: this.navObj.endDate,
        }
        getUserRegisterChannel(obj).then(res => {
          if (res.code === 1) {
            this.userRegisterChannel = Object.assign({}, {
              "userRegisterTotal": 0,
              "borrowUserTotal": 0,
              "borrowRatioTotal": 0,
              "userRegisterList": [],
            }, res.data)
            this.showRegisterChannelChartMask = (this.userRegisterChannel.userRegisterList.length === 0)
            if (drawChart === true) {
              this.RegisterChannelChart()
            }
          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      getOrderRatioByTime(drawChart) {
        let obj = {
          ...this.navObj
        }
        getOrderRatioByTime(obj).then(res => {
          if (res.code === 1) {
            this.orderRatioByTime = Object.assign({}, {
              "totalOrder": 0,
              "orderList": [],
            }, res.data)
            this.showOrderRatioChartMask = (this.orderRatioByTime.orderList.length === 0)
            if (drawChart === true) {
              this.OrderRatioChart('byTime')
            }
          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      getOrderRatioByMoney(drawChart) {
        let obj = {
          ...this.navObj
        }
        getOrderRatioByMoney(obj).then(res => {
          if (res.code === 1) {
            this.orderRatioByMoney = Object.assign({}, {
              "payOrder": 0,
              "totalOrder": 0,
              "orderList": [],
            }, res.data)
            this.showOrderRatioChartMask = (this.orderRatioByMoney.orderList.length === 0)
            if (drawChart === true) {
              this.OrderRatioChart('byMoney')
            }
          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      getOrderChannel(drawChart) {
        let obj = {
          ...this.navObj
        }
        getOrderChannel(obj).then(res => {
          if (res.code === 1) {
            this.orderChannel = Object.assign({}, {
              "totalOrder": 0,
              "orderList": [],
            }, res.data)
            this.showOrderChannelChartMask = (this.orderChannel.orderList.length === 0)
            if (drawChart === true) {
              this.OrderChannelChart()
            }
          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      getRevenueStream(drawChart) {
        let statTime
        let endTime
        statTime = this.popupLevelRevenueStreamChartSettingForm.dateRange[0]
        endTime = this.popupLevelRevenueStreamChartSettingForm.dateRange[1]
        let obj = {
          type: 1, // 1日，2月，3周
          smartStartTime: statTime,
          smartEndTime: endTime,
          orgId: this.navObj.orgId,
          countryId: this.navObj.countryId,
        }
        getRevenueStream(obj).then(res => {
          if (res.code === 1) {
            this.incomePledge = Object.assign({}, this.incomePledge, res.data)
            if (drawChart === true) {
              this.RevenueStreamChart()
            }
          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      getIncomeCompare(statisticWay, drawChart) {
        let obj = {
          type: '', // 1日，2月，3周
          smartStartTime: '',
          smartEndTime: '',
          orgId: this.navObj.orgId,
          countryId: this.navObj.countryId,
        }
        // statisticWay 是星期一到星期日(字符串) 时 obj 为同比图的参数
        if (typeof statisticWay === 'string') {
          obj.type = 3
          obj.week = statisticWay
          obj.smartStartTime = this.popupLevelGrowthStatistics1SettingForm.dateRange[0]
          obj.smartEndTime = this.popupLevelGrowthStatistics1SettingForm.dateRange[1]
        } else if (statisticWay === 1) {
          obj.type = 1
          obj.smartStartTime = this.popupLevelGrowthStatistics2SettingForm.dateRange[0]
          obj.smartEndTime = this.popupLevelGrowthStatistics2SettingForm.dateRange[1]
        }
        getIncomeCompare(obj, { isNoCancel: true }).then(res => {
          if (res.code === 1) {
            if (typeof statisticWay === 'string') {
              this.incomeCompare1 = Object.assign({}, this.incomeCompare1, res.data)
            } else {
              this.incomeCompare2 = Object.assign({}, this.incomeCompare2, res.data)
            }
            // 更新图片和表格
            if (drawChart === true) {
              if (typeof statisticWay === 'string') {
                this.getAllTableData('incomeCompare1', 'allTableData1')
                this.GrowthStatisticsChart1() // 画图需要在 getAllTableData 得到数据后
              } else {
                this.getAllTableData('incomeCompare2', 'allTableData2')
                this.GrowthStatisticsChart2()
              }
            }
          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      // 更改订单占比统计显示
      changeOrderRatioChart() {
        if (this.radioOfOrderRatio === 1) {
          this.getOrderRatioByTime(true)
        } else if (this.radioOfOrderRatio === 2) {
          this.getOrderRatioByMoney(true)
        }
      },
      //
      // 获取默认日期
      getDefaultDateRange() {
        let startDay1 = new Date().getTime() - 3600 * 1000 * 24 * 30
        let startDay2 = new Date().getTime() - 3600 * 1000 * 24 * 30 * 3
        let endDay = new Date().getTime()
        let defaultDateBegin1 = new Date(new Date(startDay1).getFullYear(), new Date(startDay1).getMonth(), new Date(startDay1).getDate())
        let defaultDateBegin2 = new Date(new Date(startDay2).getFullYear(), new Date(startDay1).getMonth(), new Date(startDay1).getDate())
        let defaultDateEnd = new Date(new Date(endDay).getFullYear(), new Date(endDay).getMonth(), new Date(endDay).getDate())
        this.revenueStreamChartSettingForm = Object.assign({}, this.revenueStreamChartSettingForm, {
          dateRange: [formatTime(startDay1, 'yyyy-MM-dd'), formatTime(endDay, 'yyyy-MM-dd')],
          dateRangeLabel: `${formatTime(startDay1, 'yyyy-MM-dd')} - ${formatTime(endDay, 'yyyy-MM-dd')}`,
        })
        this.popupLevelRevenueStreamChartSettingForm = Object.assign({}, this.popupLevelRevenueStreamChartSettingForm, this.revenueStreamChartSettingForm)
        this.growthStatistics1SettingForm = Object.assign({}, this.growthStatistics1SettingForm, {
          dateRange: [formatTime(startDay2, 'yyyy-MM-dd'), formatTime(endDay, 'yyyy-MM-dd')],
          dateRangeLabel: `${formatTime(startDay2, 'yyyy-MM-dd')} - ${formatTime(endDay, 'yyyy-MM-dd')}`,
        })
        this.popupLevelGrowthStatistics1SettingForm = Object.assign({}, this.popupLevelGrowthStatistics1SettingForm, this.growthStatistics1SettingForm)
        this.growthStatistics2SettingForm = Object.assign({}, this.growthStatistics2SettingForm, {
          dateRange: [formatTime(startDay1, 'yyyy-MM-dd'), formatTime(endDay, 'yyyy-MM-dd')],
          dateRangeLabel: `${formatTime(startDay1, 'yyyy-MM-dd')} - ${formatTime(endDay, 'yyyy-MM-dd')}`,
        })
        this.popupLevelGrowthStatistics2SettingForm = Object.assign({}, this.popupLevelGrowthStatistics2SettingForm, this.growthStatistics2SettingForm)
        this.revenueStreamCalendarDefaultDate = [defaultDateBegin1, defaultDateEnd]
        this.growthStatistics1CalendarDefaultDate = [defaultDateBegin2, defaultDateEnd]
        this.growthStatistics2CalendarDefaultDate = [defaultDateBegin1, defaultDateEnd]
      },
      // 获取所有表格数据
      getAllTableData(incomeCompare, allTableData) {
        let td = []
        let xData = this[incomeCompare].xdata
        td = this[incomeCompare].barData.map(e => {
          let result = []
          for (let i = xData.length - 1; i >= 0; i--) {
            let a = {}
            let today = e.ydata[i]
            let yesterday = e.ydata[i - 1]
            let rate = String(((today - yesterday) / yesterday * 100).toFixed(0)) + '%'
            a.date = xData[i]
            a.value = e.ydata[i]
            if (rate === 'NaN%' || rate === 'Infinity%') {
              a.rate = '-'
            } else {
              a.rate = rate
            }
            result.push(a)
          }
          return result
        })
        this[allTableData] = td
      },
      // 检索条件
      cancelSetting(name) {
        setTimeout(() => {
          this[`${name}SettingForm`] = Object.assign({}, this[`${name}SettingForm`], this[`popupLevel${upperCaseFirstCharactor(name)}SettingForm`])
        }, 300)
      },
      confirmSetting(name) {
        this[`show${upperCaseFirstCharactor(name)}Setting`] = false
        this[`popupLevel${upperCaseFirstCharactor(name)}SettingForm`] = Object.assign({}, this[`popupLevel${upperCaseFirstCharactor(name)}SettingForm`], this[`${name}SettingForm`])
        if (name === 'revenueStreamChart') {
          this.getRevenueStream(true)
        } else if (name === 'growthStatistics1') {
          this.getIncomeCompare(this.popupLevelGrowthStatistics1SettingForm.day, true)
        } else if (name === 'growthStatistics2') {
          this.getIncomeCompare(1, true)
        }
      },
      dateOnConfirm(date, name) {
        let [start, end] = date;
        let a = formatTime(start.getTime(), 'yyyy-MM-dd')
        let b = formatTime(end.getTime(), 'yyyy-MM-dd')
        this[`${name}SettingForm`] = Object.assign({}, this[`${name}SettingForm`], {
          dateRange: [a, b],
          dateRangeLabel: `${a} - ${b}`,
        })
        this[`show${upperCaseFirstCharactor(name)}Calendar`] = false;
      },
      // 柱状图（同比）选择按星期几检索
      growthStatistics1DayOnCancel() {
        this.showGrowthStatistics1DaySelector = false
      },
      growthStatistics1DayOnConfirm(value, index) {
        this.showGrowthStatistics1DaySelector = false
        this.growthStatistics1SettingForm.day = value.value
      },
      // 获取轮播图索引
      pieChartSwipeOnChange(index) {
        this.indicatorCurrentIndex = index
      },
      //
      // 饼图
      ShopChart() {
        let that = this
        let item = document.querySelector('#shopChart')
        if (item === null) {
          return
        }
        let shopChart = echarts.init(item, 'homePage')
        let arr = this.sceneInfoByShop.shopTypeList
        let data = arr.map(e => {
          let num = (e.shopRatio * 100).toFixed(0)
          return {
            name: e.typeName,
            value: e.shopNum,
            terminalNum: e.terminalNum,
            shopRatio: String(num) + '%',
          }
        })
        let option = {
          series: [
            {
              name: 'ShopChart',
              type: 'pie',
              radius: ["40%", '84%'],
              center: ['50%', '50%'],
              label: {
                show: false,
              },
              data: data,
            }
          ]
        }
        shopChart.setOption(option, true)
      },
      OrderChart() {
        let that = this
        let item = document.querySelector('#orderChart')
        if (item === null) {
          return
        }
        let orderChart = echarts.init(item, 'homePage')
        let arr = this.sceneInfoByOrder.shopTypeList
        let data = arr.map(e => {
          let num = (e.orderRatio * 100).toFixed(0)
          return {
            name: e.typeName,
            value: e.orderNum,
            freeOrderNum: e.freeOrderNum,
            payOrderNum: e.payOrderNum,
            orderRatio: String(num) + '%',
          }
        })
        let option = {
          series: [
            {
              name: 'OrderChart',
              type: 'pie',
              radius: ['40%', '84%'],
              center: ['50%', '50%'],
              label: {
                show: false,
              },
              data: data,
            }
          ]
        }
        orderChart.setOption(option, true)
      },
      IncomeChart() {
        let that = this
        let item = document.querySelector('#incomeChart')
        if (item === null) {
          return
        }
        let IncomeChart = echarts.init(item, 'homePage')
        let arr = this.sceneInfoByIncome.shopTypeList
        let data = arr.map(e => {
          let num = (e.incomeRatio * 100).toFixed(0)
          return {
            name: e.typeName,
            value: e.income,
            incomeRatio: String(num) + '%',
          }
        })
        let option = {
          series: [
            {
              name: 'IncomeChart',
              type: 'pie',
              radius: ['40%', '84%'],
              center: ['50%', '50%'],
              label: {
                show: false,
              },
              data: data,
            }
          ]
        }
        IncomeChart.setOption(option, true)
      },
      RegisterChannelChart() {
        let that = this
        let item = document.querySelector('#registerChannelChart')
        if (item === null) {
          return
        }
        let registerChannelChart = echarts.init(item, 'homePage')
        let arr = this.userRegisterChannel.userRegisterList
        let userRegisterTotal = String(this.userRegisterChannel.userRegisterTotal)
        let data = arr.map(e => {
          let num = (e.borrowRatio * 100).toFixed(0)
          return {
            name: e.thirdType,
            value: e.userRegisterNum,
            borrowRatio: String(num) + '%',
          }
        })
        let option = {
          series: [
            {
              name: 'RegisterChannelChart',
              type: 'pie',
              radius: ['40%', '84%'],
              center: ['50%', '50%'],
              label: {
                show: false,
              },
              data: data,
            }
          ]
        }
        registerChannelChart.setOption(option, true)
      },
      OrderRatioChart(moneyOrTime) {
        let that = this
        let item = document.querySelector('#orderRatioChart')
        if (item === null) {
          return
        }
        let orderRatioChart = echarts.init(item, 'homePage')
        let arr
        let data
        let option
        if (moneyOrTime === 'byTime') {
          arr = this.orderRatioByTime.orderList.slice(0)
          data = arr.map(e => {
            let num = (e.orderRatio * 100).toFixed(0)
            return {
              name: e.timeRange,
              value: e.orderNum,
              orderRatio: String(num) + '%',
            }
          })
          option = {
            series: [
              {
                name: 'OrderRatioChart',
                type: 'pie',
                radius: ['40%', '84%'],
                center: ['50%', '50%'],
                label: {
                  show: false,
                },
                data: data,
              }
            ]
          }
        } else if (moneyOrTime === 'byMoney') {
          arr = this.orderRatioByMoney.orderList.slice(0)
          data = arr.map(e => {
            let num = (e.orderRatio * 100).toFixed(0)
            return {
              name: e.moneyRange,
              value: e.orderNum,
              orderRatio: String(num) + '%',
            }
          })
          option = {
            series: [
              {
                name: 'OrderRatioChart',
                type: 'pie',
                radius: ['40%', '84%'],
                center: ['50%', '50%'],
                label: {
                  show: false,
                },
                data: data,
              }
            ]
          }
        }
        orderRatioChart.setOption(option, true)
      },
      OrderChannelChart() {
        let that = this
        let item = document.querySelector('#orderChannelChart')
        if (item === null) {
          return
        }
        let orderChannelChart = echarts.init(item, 'homePage')
        if (orderChannelChart === undefined) {
          return
        }
        let arr = this.orderChannel.orderList
        let data = arr.map(e => {
          let num = (e.orderRatio * 100).toFixed(0)
          return {
            name: e.payChannel,
            value: e.orderNum,
            orderRatio: String(num) + '%',
          }
        })
        let option = {
          series: [
            {
              name: 'OrderChannelChart',
              type: 'pie',
              radius: ['40%', '84%'],
              center: ['50%', '50%'],
              label: {
                show: false,
              },
              data: data,
            }
          ]
        }
        orderChannelChart.setOption(option, true)
      },
      // 折线图
      RevenueStreamChart() {
        let that = this
        let item = document.querySelector('#revenueStreamChart')
        if (item === null) {
          return
        }
        let revenueStreamChart = echarts.init(item, 'homePage')
        let xData = this.incomePledge.dates
        let arr = this.incomePledge.income
        // arr1 及 arr2 对应 tooltip formatter 的 params.data
        let arr1 = arr.map((e, index) => {
          return [index, e.totalpledge,
            {
              totalMoney: e.totalMoney,
              deposit: e.deposit,
              recharge: e.recharge,
              date: e.date,
            },
          ]
        })
        let arr2 = arr.map((e, index) => {
          return [index, e.totalMoney,
            {
              totalMoney: e.totalMoney,
              rentMoney: e.rentMoney,
              buyMoney: e.buyMoney === null ? 0 : e.buyMoney,
              date: e.date,
            },
          ]
        })
        let option = {
          animation: false,
          tooltip: {
            trigger: 'axis',
            formatter(params) {
              let result
              if (params.length === 1 && params[0].seriesName === i18n.t('dashboard.flowBill')) {
                result = `${params[0].name}
                          <br/>${i18n.t('dashboard.flowBill1')}${params[0].data[1]}
                          <br/>${i18n.t('dashboard.revenue1')}${params[0].data[2].totalMoney}
                          <br/>${i18n.t('dashboard.deposit')}${params[0].data[2].deposit}
                          <br/>${i18n.t('dashboard.recharge')}${params[0].data[2].recharge}`
              } else if (params.length === 1 && params[0].seriesName === i18n.t('dashboard.revenue')) {
                result = `${params[0].name}
                          <br/>${i18n.t('dashboard.revenue1')}${params[0].data[2].totalMoney}
                          <br/>${i18n.t('dashboard.rentalAmount')}${params[0].data[2].rentMoney}
                          <br/>${i18n.t('dashboard.amountOfPurchase')}${params[0].data[2].buyMoney}`
              } else {
                result = `${params[0].name}
                          <br/>${i18n.t('dashboard.flowBill1')}${params[0].data[1]}
                          <br/>${i18n.t('dashboard.revenue1')}${params[0].data[2].totalMoney}
                          <br/>${i18n.t('dashboard.deposit')}${params[0].data[2].deposit}
                          <br/>${i18n.t('dashboard.recharge')}${params[0].data[2].recharge}
                          <br/>${i18n.t('dashboard.rentalAmount')}${params[1].data[2].rentMoney}
                          <br/>${i18n.t('dashboard.amountOfPurchase')}${params[1].data[2].buyMoney}`
              }
              return result
            }
          },
          grid: {
            left: '3%',
            right: '3%',
            top: '3%',
            bottom: 70,
            containLabel: true,
          },
          dataZoom: [
            {
              type: 'slider',
              show: true,
              xAxisIndex: [0],
              start: 77,
              end: 100,
              bottom: 30
            },
            {
              type: 'inside',
              xAxisIndex: [0],
              start: 77,
              end: 100
            },
          ],
          legend: {
            data: [i18n.t('dashboard.flowBill'), i18n.t('dashboard.revenue')],
            bottom: 0,
          },
          xAxis: {
            type: 'category',
            data: xData,
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              name: i18n.t('dashboard.flowBill'),
              type: 'line',
              data: arr1,
            },
            {
              name: i18n.t('dashboard.revenue'),
              type: 'line',
              data: arr2,
            },
          ]
        };
        revenueStreamChart.setOption(option, true)
      },
      // 柱状图
      // 同比
      GrowthStatisticsChart1() {
        let that = this
        let item = document.querySelector('#growthStatistics1')
        if (item === null) {
          return
        }
        let growthStatistics1 = echarts.init(item, 'homePage')
        let d = this.incomeCompare1

        let weekday
        for (let i = 0; i < this.week.length; i++) {
          if (this.week[i].value === this.popupLevelGrowthStatistics1SettingForm.day) {
            weekday = this.week[i].label
            break
          }
        }
        let xData = d.xdata.map(e => {
          return e + '\n（' + weekday + '）'
        })
        let legendData = d.barData.map(e => {
          return e.name
        })
        let series = d.barData.map((e, index) => {
          let data = e.ydata.map((date, i) => {
            // 增减百分比（rate）和表格的顺序相反
            return [i, date, that.allTableData1[index][e.ydata.length - 1 - i].rate]
          })
          return {
            name: e.name,
            type: 'bar',
            barGap: 0,
            data: data
          }
        })
        let option = {
          animation: false,
          tooltip: {
            trigger: 'axis',
            formatter(params) {
              let result = `<div>${params[0].name}</div>`
              params.forEach(e => {
                result += `<div>${e.marker}${e.seriesName}：${e.data[1]}</div>
                <div>${i18n.t('dashboard.growthOrDecreaseRateTB')}：${e.data[2]}</div>`
              })
              return result
            },
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: legendData,
            bottom: 0,
            itemWidth: 14
          },
          grid: {
            left: '3%',
            right: '3%',
            top: '3%',
            bottom: 90,
            containLabel: true,
          },
          dataZoom: [
            {
              type: 'slider',
              show: true,
              xAxisIndex: [0],
              start: 0,
              end: 100,
              bottom: 50
            },
            {
              type: 'inside',
              xAxisIndex: [0],
              start: 0,
              end: 100
            },
          ],
          xAxis: [
            {
              type: 'category',
              axisTick: {show: false},
              data: xData
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: series
        }
        growthStatistics1.setOption(option, true)
      },
      // 环比
      GrowthStatisticsChart2() {
        let that = this
        let item = document.querySelector('#growthStatistics2')
        if (item === null) {
          return
        }
        let growthStatistics2 = echarts.init(item, 'homePage')
        if (growthStatistics2 === undefined) {
          return
        }
        let d = this.incomeCompare2
        let xData = d.xdata
        let legendData = d.barData.map(e => {
          return e.name
        })
        let series = d.barData.map((e, index) => {
          let data = e.ydata.map((date, i) => {
            // 增减百分比（rate）和表格的顺序相反
            return [i, date, that.allTableData2[index][e.ydata.length - 1 - i].rate]
          })
          return {
            name: e.name,
            type: 'bar',
            barGap: 0,
            data: data
          }
        })
        let option = {
          animation: false,
          tooltip: {
            trigger: 'axis',
            formatter(params) {
              let result = `<div>${params[0].name}</div>`
              params.forEach(e => {
                result += `<div>${e.marker}${e.seriesName}：${e.data[1]}</div>
                <div>${i18n.t('dashboard.growthOrDecreaseRateHB')}：${e.data[2]}</div>`
              })
              return result
            },
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: legendData,
            bottom: 0,
            itemWidth: 14
          },
          grid: {
            left: '3%',
            right: '3%',
            top: '3%',
            bottom: 90,
            containLabel: true,
          },
          dataZoom: [
            {
              type: 'slider',
              show: true,
              xAxisIndex: [0],
              start: 77,
              end: 100,
              bottom: 50
            },
            {
              type: 'inside',
              xAxisIndex: [0],
              start: 77,
              end: 100
            },
          ],
          xAxis: [
            {
              type: 'category',
              axisTick: {show: false},
              data: xData
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: series
        }
        growthStatistics2.setOption(option, true)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .mobile-dashboard {
    .todayData {
      padding: 16px 8px;
      background-color: white;
      .todayData-head {
        display: flex;
        justify-content: space-between;
        margin-bottom: 16px;
      }
      .todayData-body {
        display: flex;
        .todayData-body-card {
          background:rgba(255,255,255,1);
          border-radius:8px;
          border:1px solid rgba(238,238,245,1);
          padding: 4px;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
      }
    }

    .sceneItem {
      display: flex;
      align-items: baseline;
      min-height: 24px;
    }

    .flexLayout1 {
      display: flex;
      align-items: baseline;
    }

    .dialog-footPart {
      display: flex;
      justify-content: space-around;
    }

    .piePart {
      padding: 16px 0px 24px 0px;
      .piePart-head {
        display: flex;
        justify-content: space-between;
        margin-bottom: 16px;
      }
      .chartTitle {
        font-size:14px;
        font-family:PingFangSC-Semibold,PingFang SC;
        font-weight:600;
        color:rgba(21,35,52,1);
        line-height:22px;
        margin-left: 16px;
      }
      .whiteCard {
        padding: 16px 0px;
        margin: 0px 18px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 6px 12px -4px rgba(225, 225, 235, 0.24);
        border-radius: 24px;
        overflow: hidden;
        position: relative;
      }
      .maskLayer {
        position: absolute;
        height: calc(100% - 54px);
        width: 100%;
        z-index: 1;
        background-color: white;
        font-weight: 300;
        text-align: center;
        font-size: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #818d8a;
      }
      .pie {
        display: inline-block;
        width: 42%;
        min-height: 150px;
        border-radius: 24px;
        overflow: hidden;
      }
      .sorts1 {
        word-break: break-word;
        margin-bottom: 16px;
        display: inline-block;
        width: 56%;
      }
      .pieChartSwipeItem {
        padding-bottom: 24px;
      }
      .custom-indicator {
        position: absolute;
        display: flex;
        bottom: 0px;
        left: 50%;
        transform: translateX(-50%);
        .item {
          width:8px;
          height:8px;
          background:rgba(119,128,155,0.16);
          margin-right: 8px;
          border-radius: 8px;
          &:nth-last-child(1) {
            margin-right: 0px;
          }
        }
        .item-active {
          width:24px;
          height:8px;
          background:rgba(21,35,52,1);
          box-shadow:0px 4px 8px -2px rgba(21,35,52,0.48);
          border-radius:4px;
        }
      }
    }

    .linePart {
      .linePart-head {
        display: flex;
        justify-content: space-between;
        margin-bottom: 16px;
        padding: 0px 8px;
      }
      .linePart-body {
        padding: 0px 20px;
      }
      .revenueStreamChart {
        padding: 16px 0px;
        margin-bottom: 16px;
        background-color: white;
      }
      .line {
        width: 100%;
        min-height: 240px;
      }
    }

    .barPart {
      margin-bottom: 34px;
      .barPart-head {
        display: flex;
        justify-content: space-between;
        margin-bottom: 16px;
        padding: 0px 8px;
      }
      .barPart-body {
        padding: 0px 20px;
      }
      .growthStatistics1 {
        padding: 16px 0px;
        margin-bottom: 16px;
        background-color: white;
      }
      .growthStatistics2 {
        padding: 16px 0px;
        background-color: white;
      }
      .bar {
        width: 100%;
        min-height: 240px;
      }
    }

    .fontStyle1 {
      font-size: 16px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: rgba(21, 35, 52, 1);
      line-height: 24px;
    }

    .fontStyle2 {
      font-size:11px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(21,35,52,1);
      line-height:16px;
    }

    .fontStyle3 {
      font-size:18px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(21,35,52,1);
      line-height:28px;
    }

    .svgIconSize1 {
      height: 24px;
      width: 24px;
    }

    .IconColorGray {
      background-color: #D8DDD9;
    }
  }
</style>
