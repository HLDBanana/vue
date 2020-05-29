<template>
  <div class="dashboard-container">
    <div class="headPart" v-if="isShowArr.includes(4)">
      <div class="headerField">{{ $t('dashboard.dataSummaryForToday') }}</div>
      <el-row :gutter="20">
        <el-col class="cardAutoWidth" :span="12">
          <div class="headLineCard">
            <div class="titleBox">
              <div class="dotIcon IconColor0"></div>
              <div class="cardTitle">{{ $t('dashboard.registeredUsersForToday') }}</div>
            </div>
            <el-row>
              <div class="bigNumber">{{ dataCollect.todayRegisterUser }}</div>
              <div class="newIncreasePart">
                <el-row>
                  <div class="grayFontStyle">
                    <div class="dotIconSmall IconColor4"></div>
                    {{ $t('dashboard.registeredUsersForYesterday') }}{{ dataCollect.yesterDayRegisterUser }}
                  </div>
                </el-row>
                <el-row>
                  <div class="grayFontStyle">
                    <div class="dotIconSmall IconColor4"></div>
                    {{ $t('dashboard.registeredUsersForWeek') }}{{ dataCollect.currentWeekRegisterUser }}
                  </div>
                </el-row>
                <el-row>
                  <div class="grayFontStyle">
                    <div class="dotIconSmall IconColor4"></div>
                    {{ $t('dashboard.registeredUsersForMonth') }}{{ dataCollect.currentMonthRegisterUser }}
                  </div>
                </el-row>
              </div>
            </el-row>
          </div>
        </el-col>
        <el-col class="cardAutoWidth" :span="12">
          <div class="headLineCard">
            <div class="titleBox">
              <div class="dotIcon IconColor1"></div>
              <div class="cardTitle">{{ $t('dashboard.ordersForToday') }}</div>
            </div>
            <el-row>
              <div class="bigNumber">{{ dataCollect.todayOrder }}</div>
              <div class="newIncreasePart">
                <el-row>
                  <div class="grayFontStyle">
                    <div class="dotIconSmall IconColor4"></div>
                    {{ $t('dashboard.ordersForYesterday') }}{{ dataCollect.yesterOrder }}
                  </div>
                </el-row>
                <el-row>
                  <div class="grayFontStyle">
                    <div class="dotIconSmall IconColor4"></div>
                    {{ $t('dashboard.ordersForWeek') }}{{ dataCollect.currentWeekOrder }}
                  </div>
                </el-row>
                <el-row>
                  <div class="grayFontStyle">
                    <div class="dotIconSmall IconColor4"></div>
                    {{ $t('dashboard.ordersForMonth') }}{{ dataCollect.currentMonthOrder }}
                  </div>
                </el-row>
              </div>
            </el-row>
          </div>
        </el-col>
        <el-col class="cardAutoWidth" :span="12">
          <div class="headLineCard">
            <div class="titleBox">
              <div class="dotIcon IconColor2"></div>
              <div class="cardTitle">{{ $t('dashboard.turnoverForToday') }}</div>
            </div>
            <el-row>
              <div class="bigNumber">{{ dataCollect.todayIncome }}</div>
              <div class="newIncreasePart">
                <el-row>
                  <div class="grayFontStyle">
                    <div class="dotIconSmall IconColor4"></div>
                    {{ $t('dashboard.turnoverForYesterday') }}{{ dataCollect.yesterIncome }}
                  </div>
                </el-row>
                <el-row>
                  <div class="grayFontStyle">
                    <div class="dotIconSmall IconColor4"></div>
                    {{ $t('dashboard.turnoverForWeek') }}{{ dataCollect.currentWeekIncomer }}
                  </div>
                </el-row>
                <el-row>
                  <div class="grayFontStyle">
                    <div class="dotIconSmall IconColor4"></div>
                    {{ $t('dashboard.turnoverForMonth') }}{{ dataCollect.currentMonthIncome }}
                  </div>
                </el-row>
              </div>
            </el-row>
          </div>
        </el-col>
        <el-col class="cardAutoWidth" :span="12">
          <div class="headLineCard">
            <div class="titleBox">
              <div class="dotIcon IconColor3"></div>
              <div class="cardTitle">{{ $t('dashboard.newDevicesForToday') }}</div>
            </div>
            <el-row>
              <div class="bigNumber">{{ dataCollect.todayApplyTerminal }}</div>
              <div class="newIncreasePart">
                <el-row>
                  <div class="grayFontStyle">
                    &nbsp;
                  </div>
                </el-row>
                <el-row>
                  <div class="grayFontStyle">
                    <div class="dotIconSmall IconColor4"></div>
                    {{ $t('dashboard.onlineEquipment') }}{{ dataCollect.terminalOnline }}
                  </div>
                </el-row>
                <el-row>
                  <div class="grayFontStyle">
                    <div class="dotIconSmall IconColor4"></div>
                    {{ $t('dashboard.onlineRateOfEquipment') }}{{ (dataCollect.terminalOnlineRatio * 100).toFixed(0) }}%
                  </div>
                </el-row>
              </div>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="chartContainer">
      <div class="pie">
        <div class="chartItem" v-if="isShowArr.includes(5)">
          <div class="chartTitle">{{ $t('dashboard.sceneDistributionStatisticsBySite') }}</div>
          <div class="whiteCard">
            <div v-if="showShopChartMask" class="maskLayer">
              <span>{{ $t('dashboard.noData') }}</span>
            </div>
            <div id="shopChart" class="pieChart"></div>
            shopRatio
          </div>
        </div>
        <div class="chartItem" v-if="isShowArr.includes(5)">
          <div class="chartTitle">{{ $t('dashboard.sceneDistributionStatisticsByOrder') }}</div>
          <div class="whiteCard">
            <div v-if="showOrderChartMask" class="maskLayer">
              <span>{{ $t('dashboard.noData') }}</span>
            </div>
            <div id="orderChart" class="pieChart"></div>
            <div class="sorts1">
              <el-row class="part1">
                <el-row class="grayFontStyle">
                  <el-col :span="18" class="flexLayout1">
                    <div class="dotIconSmall IconColor4"></div>
                    <div style="display: inline-block; width: calc(100% - 20px);">{{ $t('dashboard.totalSceneNumber') }}</div>
                  </el-col>
                  <el-col :span="6">{{ sceneInfoByOrder.shopTypeTotal }}</el-col>
                </el-row>
                <el-row class="grayFontStyle">
                  <el-col :span="18" class="flexLayout1">
                    <div class="dotIconSmall IconColor4"></div>
                    <div style="display: inline-block; width: calc(100% - 20px);">{{ $t('dashboard.totalOrderNum') }}</div>
                  </el-col>
                  <el-col :span="6">{{ sceneInfoByOrder.orderTotalNum }}</el-col>
                </el-row>
                <el-row class="grayFontStyle">
                  <el-col :span="18" class="flexLayout1">
                    <div class="dotIconSmall IconColor4"></div>
                    <div style="display: inline-block; width: calc(100% - 20px);">{{ $t('dashboard.freeOrderNum') }}</div>
                  </el-col>
                  <el-col :span="6">{{ sceneInfoByOrder.freeOrderTotalNum }}</el-col>
                </el-row>
                <el-row class="grayFontStyle">
                  <el-col :span="18" class="flexLayout1">
                    <div class="dotIconSmall IconColor4"></div>
                    <div style="display: inline-block; width: calc(100% - 20px);">{{ $t('dashboard.paidOrderNum') }}</div>
                  </el-col>
                  <el-col :span="6">{{ sceneInfoByOrder.payOrderTotalNum }}</el-col>
                </el-row>
              </el-row>
              <el-row>
                <el-row class="grayFontStyle">
                  <el-col class="sceneItem" :span="11" v-for="(item, index) in sceneInfoByOrder.shopTypeList">
                    <div :class="{ dotIcon: true, dotColor0: index === 0, dotColor1: index === 1, dotColor2: index === 2, dotColor3: index === 3, dotColor4: index === 4, dotColor5: index === 5, dotColor6: index === 6, dotColor7: index === 7, dotColor8: index === 8, dotColor9: index === 9,}"></div>
                    <div style="display: inline-block; width: calc(100% - 20px)">{{ item.typeName }}</div>
                  </el-col>
                </el-row>
              </el-row>
            </div>
          </div>
        </div>
        <div class="chartItem" v-if="isShowArr.includes(5)">
          <div class="chartTitle">{{ $t('dashboard.sceneDistributionStatisticsByIncome') }}</div>
          <div class="whiteCard">
            <div v-if="showIncomeChartMask" class="maskLayer">
              <span>{{ $t('dashboard.noData') }}</span>
            </div>
            <div id="incomeChart" class="pieChart"></div>
            <div class="sorts1">
              <el-row class="part1">
                <el-row class="grayFontStyle">
                  <el-col :span="18" class="flexLayout1">
                    <div class="dotIconSmall IconColor4"></div>
                    <div style="display: inline-block; width: calc(100% - 20px);">{{ $t('dashboard.totalSceneNumber') }}</div>
                  </el-col>
                  <el-col :span="6">{{ sceneInfoByIncome.shopTypeTotal }}</el-col>
                </el-row>
                <el-row class="grayFontStyle">
                  <el-col :span="18" class="flexLayout1">
                    <div class="dotIconSmall IconColor4"></div>
                    <div style="display: inline-block; width: calc(100% - 20px);">{{ $t('dashboard.totalIncome') }}</div>
                  </el-col>
                  <el-col :span="6">{{ sceneInfoByIncome.incomeTotal }}</el-col>
                </el-row>
              </el-row>
              <el-row>
                <el-row class="grayFontStyle">
                  <el-col class="sceneItem" :span="11" v-for="(item, index) in sceneInfoByIncome.shopTypeList">
                    <div :class="{ dotIcon: true, dotColor0: index === 0, dotColor1: index === 1, dotColor2: index === 2, dotColor3: index === 3, dotColor4: index === 4, dotColor5: index === 5, dotColor6: index === 6, dotColor7: index === 7, dotColor8: index === 8, dotColor9: index === 9,}"></div>
                    <div style="display: inline-block; width: calc(100% - 20px)">{{ item.typeName }}</div>
                  </el-col>
                </el-row>
              </el-row>
            </div>
          </div>
        </div>
        <div class="chartItem" v-if="isShowArr.includes(6)">
          <div class="chartTitle">{{ $t('dashboard.userRegistrationChannelStatistics') }}</div>
          <div class="whiteCard">
            <div v-if="showRegisterChannelChartMask" class="maskLayer">
              <span>{{ $t('dashboard.noData') }}</span>
            </div>
            <div id="registerChannelChart" class="pieChart" style="width: 40%"></div>
            <div class="sorts2" style="width: 57%; margin-right: 6px;">
              <div class="part1">
                <el-row class="grayFontStyle">
                  <el-col :span="10" class="flexLayout1">
                    <div class="dotIconSmall IconColor4"></div>
                    <div style="display: inline-block; width: calc(100% - 20px)">{{ $t('dashboard.totalRegisteredUsers') }}</div>
                  </el-col>
                  <el-col :span="2">{{ userRegisterChannel.userRegisterTotal }}</el-col>
                  <el-col :span="10" class="flexLayout1">
                    <div style="visibility: hidden" class="dotIconSmall IconColor4"></div>
                    <div style="display: inline-block; width: calc(100% - 20px)">{{ $t('dashboard.leaseConversionRate') }}</div>
                  </el-col>
                  <el-col :span="2">{{ (userRegisterChannel.borrowRatioTotal * 100).toFixed(0) }}%</el-col>
                </el-row>
                <div v-for="item in userRegisterChannel.userRegisterList">
                  <el-row class="grayFontStyle">
                    <el-row>
                      <el-col :span="10" class="flexLayout1">
                        <div class="dotIconSmall IconColor4"></div>
                        <div style="display: inline-block; width: calc(100% - 20px)">{{ item.thirdType }}</div>
                      </el-col>
                      <el-col :span="2">{{ item.userRegisterNum }}</el-col>
                      <el-col :span="10" class="flexLayout1">
                        <div style="visibility: hidden" class="dotIconSmall IconColor4"></div>
                        <div style="display: inline-block; width: calc(100% - 20px)">{{ $t('dashboard.registrationRatio') }}</div>
                      </el-col>
                      <el-col :span="2">{{ (item.userRegisterRatio * 100).toFixed(0) }}%</el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="10" class="flexLayout1">
                        <div style="visibility: hidden" class="dotIconSmall IconColor4"></div>
                        <div style="display: inline-block; width: calc(100% - 20px)">{{ $t('dashboard.leaseConversionRate') }}</div>
                      </el-col>
                      <el-col :span="2">{{ (item.borrowRatio * 100).toFixed(0) }}%</el-col>
                    </el-row>
                  </el-row>
                </div>
              </div>
              <el-row>
                <el-col :span="8" v-for="(item, index) in userRegisterChannel.userRegisterList">
                  <div :class="{ dotIcon: true, dotColor0: index === 0, dotColor1: index === 1, dotColor2: index === 2, dotColor3: index === 3, dotColor4: index === 4, dotColor5: index === 5, dotColor6: index === 6, dotColor7: index === 7, dotColor8: index === 8, dotColor9: index === 9,}"></div>
                  <span class="grayFontStyle">{{ item.thirdType }}</span>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
        <div class="chartItem" v-if="isShowArr.includes(7)">
          <div class="chartTitle">{{ $t('dashboard.orderProportionStatistics') }}</div>
          <div class="whiteCard">
            <div v-if="showOrderRatioChartMask" class="maskLayer">
              <span>{{ $t('dashboard.noData') }}</span>
            </div>
            <div id="orderRatioChart" class="pieChart"></div>
            <div class="sorts2">
              <el-row>
                <el-col :span="24">
                  <el-radio-group v-model="radioOfOrderRatio" @change="changeOrderRatioChart" size="mini" style="margin-bottom: 40px;">
                    <el-radio-button :label="1">{{ $t('dashboard.byLeaseTime') }}</el-radio-button>
                    <el-radio-button :label="2">{{ $t('dashboard.byLeaseAmount') }}</el-radio-button>
                  </el-radio-group>
                </el-col>
              </el-row>
              <el-row v-if="radioOfOrderRatio === 1" style="min-height: 110px">
                <el-row class="grayFontStyle" v-for="(item, index) in orderRatioByTime.orderList">
                  <el-col :span="18">
                    <div :class="{ dotIcon: true, dotColor0: index === 0, dotColor1: index === 1, dotColor2: index === 2, dotColor3: index === 3, dotColor4: index === 4, dotColor5: index === 5, dotColor6: index === 6, dotColor7: index === 7, dotColor8: index === 8, dotColor9: index === 9,}"></div>
                    {{ item.timeRange }}
                  </el-col>
                  <el-col :span="6">{{ item.orderNum }}</el-col>
                </el-row>
              </el-row>
              <el-row v-if="radioOfOrderRatio === 2" style="min-height: 110px">
                <el-row class="grayFontStyle" v-for="(item, index) in orderRatioByMoney.orderList">
                  <el-col :span="18">
                    <div :class="{ dotIcon: true, dotColor0: index === 0, dotColor1: index === 1, dotColor2: index === 2, dotColor3: index === 3, dotColor4: index === 4, dotColor5: index === 5, dotColor6: index === 6, dotColor7: index === 7, dotColor8: index === 8, dotColor9: index === 9,}"></div>
                    {{ item.moneyRange }}
                  </el-col>
                  <el-col :span="6">{{ item.orderNum }}</el-col>
                </el-row>
              </el-row>
            </div>
          </div>
        </div>
        <div class="chartItem" v-if="isShowArr.includes(8)">
          <div class="chartTitle">{{ $t('dashboard.orderPaymentChannelAnalysis') }}</div>
          <div class="whiteCard">
            <div v-if="showOrderChannelChartMask" class="maskLayer">
              <span>{{ $t('dashboard.noData') }}</span>
            </div>
            <div id="orderChannelChart" class="pieChart"></div>
            <div class="sorts2">
              <el-row>
                <el-row class="grayFontStyle" v-for="(item, index) in orderChannel.orderList">
                  <el-col :span="18">
                    <div :class="{ dotIcon: true, dotColor0: index === 0, dotColor1: index === 1, dotColor2: index === 2, dotColor3: index === 3, dotColor4: index === 4, dotColor5: index === 5, dotColor6: index === 6, dotColor7: index === 7, dotColor8: index === 8, dotColor9: index === 9,}"></div>
                    {{ item.payChannel }}
                  </el-col>
                  <el-col :span="6">{{ item.orderNum }}</el-col>
                </el-row>
              </el-row>
            </div>
          </div>
        </div>
      </div>
      <div class="line">
        <div class="chartItem" v-if="isShowArr.includes(9)">
          <div>
            <div class="chartTitle">{{ $t('dashboard.revenueFlowTrend') }}</div>
            <div style="float: right;">
              <el-select v-model="statisticWay1" @change="getRevenueStream(true)" style="margin-right: 30px;">
                <el-option
                  :key="1"
                  :label="$t('dashboard.dailyStatistics')"
                  :value="1">
                </el-option>
                <el-option
                  :key="2"
                  :label="$t('dashboard.monthlyStatistics')"
                  :value="2">
                </el-option>
              </el-select>
              <el-date-picker
                :class="{ displayNone: statisticWay1 !== 1 }"
                v-model="dateRangeDay1"
                @change="getRevenueStream(true)"
                type="daterange"
                :range-separator="$t('dashboard.to')"
                :start-placeholder="$t('dashboard.startDate')"
                :end-placeholder="$t('dashboard.endDate')"
                value-format="yyyy-MM-dd"
                :picker-options="pickerOptions1">
              </el-date-picker>
              <el-date-picker
                :class="{ displayNone: statisticWay1 !== 2 }"
                v-model="dateRangeMonth1"
                @change="getRevenueStream(true)"
                type="monthrange"
                :range-separator="$t('dashboard.to')"
                :start-placeholder="$t('dashboard.startMonth')"
                :end-placeholder="$t('dashboard.endMonth')"
                value-format="yyyy-MM"
                :picker-options="pickerOptions2">
              </el-date-picker>
            </div>
          </div>
          <div class="whiteCard">
            <div id="revenueStreamChart" class="lineChart"></div>
            <div class="sorts">
              <el-row class="part1">
                <el-col :span="11">
                  <el-row class="grayFontStyle">
                    <el-col :span="18">
                      <div class="dotIconSmall IconColor4"></div>
                      {{ $t('dashboard.totalFlow') }}
                    </el-col>
                    <el-col :span="6">{{ incomePledge.totalpledge.sum }}</el-col>
                  </el-row>
                  <el-row class="grayFontStyle">
                    <el-col :span="18">
                      <div class="dotIconSmall IconColor4"></div>
                      {{ $t('dashboard.highest') }}
                    </el-col>
                    <el-col :span="6">{{ incomePledge.totalpledge.max }}</el-col>
                  </el-row>
                  <el-row class="grayFontStyle">
                    <el-col :span="18">
                      <div class="dotIconSmall IconColor4"></div>
                      {{ $t('dashboard.lowest') }}
                    </el-col>
                    <el-col :span="6">{{ incomePledge.totalpledge.min }}</el-col>
                  </el-row>
                </el-col>
                <el-col :span="11" :offset="2">
                  <el-row class="grayFontStyle">
                    <el-col :span="18">
                      <div class="dotIconSmall IconColor4"></div>
                      {{ $t('dashboard.totalIncome') }}
                    </el-col>
                    <el-col :span="6">{{ incomePledge.totalMoney.sum }}</el-col>
                  </el-row>
                  <el-row class="grayFontStyle">
                    <el-col :span="18">
                      <div class="dotIconSmall IconColor4"></div>
                      {{ $t('dashboard.highest') }}
                    </el-col>
                    <el-col :span="6">{{ incomePledge.totalMoney.max }}</el-col>
                  </el-row>
                  <el-row class="grayFontStyle">
                    <el-col :span="18">
                      <div class="dotIconSmall IconColor4"></div>
                      {{ $t('dashboard.lowest') }}
                    </el-col>
                    <el-col :span="6">{{ incomePledge.totalMoney.min }}</el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="11">
                  <el-row class="grayFontStyle">
                    <el-col :span="18">
                      <div class="dotIconSmall IconColor4"></div>
                      {{ $t('dashboard.totalDeposit') }}
                    </el-col>
                    <el-col :span="6">{{ incomePledge.deposit.sum }}</el-col>
                  </el-row>
                  <el-row class="grayFontStyle">
                    <el-col :span="18">
                      <div class="dotIconSmall IconColor4"></div>
                      {{ $t('dashboard.highest') }}
                    </el-col>
                    <el-col :span="6">{{ incomePledge.deposit.max }}</el-col>
                  </el-row>
                  <el-row class="grayFontStyle">
                    <el-col :span="18">
                      <div class="dotIconSmall IconColor4"></div>
                      {{ $t('dashboard.lowest') }}
                    </el-col>
                    <el-col :span="6">{{ incomePledge.deposit.min }}</el-col>
                  </el-row>
                </el-col>
                <el-col :span="11" :offset="2">
                  <el-row class="grayFontStyle">
                    <el-col :span="18">
                      <div class="dotIconSmall IconColor4"></div>
                      {{ $t('dashboard.totalBalance') }}
                    </el-col>
                    <el-col :span="6">{{ incomePledge.recharge.sum }}</el-col>
                  </el-row>
                  <el-row class="grayFontStyle">
                    <el-col :span="18">
                      <div class="dotIconSmall IconColor4"></div>
                      {{ $t('dashboard.highest') }}
                    </el-col>
                    <el-col :span="6">{{ incomePledge.recharge.max }}</el-col>
                  </el-row>
                  <el-row class="grayFontStyle">
                    <el-col :span="18">
                      <div class="dotIconSmall IconColor4"></div>
                      {{ $t('dashboard.lowest') }}
                    </el-col>
                    <el-col :span="6">{{ incomePledge.recharge.min }}</el-col>
                  </el-row>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </div>
      <div class="bar">
        <div class="chartItem" v-if="isShowArr.includes(10)">
          <div>
            <div class="chartTitle">{{ $t('dashboard.growthStatisticsOfRevenueTB') }}</div>
            <div style="float: right;">
              <div style="display: inline-block; margin-right: 30px;">
                <div style="display: inline-block; margin-right: 8px;">{{ $t('dashboard.compareStatisticsByDayOfTheWeek') }}</div>
                <el-select v-model="statisticWay2" @change="getIncomeCompare(statisticWay2, true)">
                  <el-option
                    v-for="(item, index) in week"
                    :key="index"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div style="display: inline-block">
                <div style="display: inline-block; margin-right: 8px;">{{ $t('dashboard.statisticalDate') }}</div>
                <el-date-picker
                  @change="getIncomeCompare(statisticWay2, true)"
                  v-model="dateRange2"
                  type="daterange"
                  :range-separator="$t('dashboard.to')"
                  :start-placeholder="$t('dashboard.startDate')"
                  :end-placeholder="$t('dashboard.endDate')"
                  value-format="yyyy-MM-dd"
                  :picker-options="pickerOptions1">
                </el-date-picker>
              </div>
            </div>
          </div>
          <div class="whiteCard">
            <div id="growthStatistics1" class="barChart"></div>
            <div class="sorts">
              <el-row style="margin-bottom: 10px; text-align: center;">
                <el-col :span="24">
                  <div>{{ $t('dashboard.growthOrDecreaseComparisonTableTB') }}</div>
                </el-col>
              </el-row>
              <el-row style="display: flex; justify-content: center">
                  <el-button size="mini" :class="{ buttonActive: tableShow1 === 0 }" @click="changeTableShow1(0)">{{ $t('dashboard.orderRevenue') }}
                  </el-button>
                  <el-button size="mini" :class="{ buttonActive: tableShow1 === 1 }" @click="changeTableShow1(1)">{{ $t('dashboard.quantityOfOrder') }}
                  </el-button>
                  <el-button size="mini" :class="{ buttonActive: tableShow1 === 2 }" @click="changeTableShow1(2)">{{ $t('dashboard.paidOrder') }}
                  </el-button>
                  <el-button size="mini" :class="{ buttonActive: tableShow1 === 3 }" @click="changeTableShow1(3)">{{ $t('dashboard.freeOrder') }}
                  </el-button>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-table
                    :data="tableDataSliced1"
                    border
                    style="width: 375px; margin: 10px auto;">
                    <el-table-column
                      prop="date"
                      :label="$t('dashboard.date')"
                      align="center"
                      width="125">
                    </el-table-column>
                    <el-table-column
                      prop="value"
                      :label="tableColumn1"
                      align="center"
                      width="125">
                    </el-table-column>
                    <el-table-column
                      prop="rate"
                      :label="$t('dashboard.growthOrDecreaseRateTB')"
                      align="center"
                      width="125">
                    </el-table-column>
                  </el-table>
                  <el-pagination
                    @current-change="handleCurrentChange1"
                    small
                    layout="prev, pager, next"
                    :current-page.sync="currentPage1"
                    :page-size="pageSizeTable1"
                    :total="tableData1.length"
                    style="text-align: center">
                  </el-pagination>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
        <div class="chartItem" v-if="isShowArr.includes(11)">
          <div>
            <div class="chartTitle">{{ $t('dashboard.revenueGrowthStatisticsHB') }}</div>
            <div style="float: right;">
              <el-select v-model="statisticWay3" @change="getIncomeCompare(statisticWay3, true)" style="margin-right: 30px;">
                <el-option
                  :key="1"
                  :label="$t('dashboard.dailyStatistics')"
                  :value="1">
                </el-option>
                <el-option
                  :key="2"
                  :label="$t('dashboard.monthlyStatistics')"
                  :value="2">
                </el-option>
              </el-select>
              <el-date-picker
                :class="{ displayNone: statisticWay3 !== 1 }"
                v-model="dateRangeDay3"
                @change="getIncomeCompare(statisticWay3, true)"
                type="daterange"
                :range-separator="$t('dashboard.to')"
                :start-placeholder="$t('dashboard.startDate')"
                :end-placeholder="$t('dashboard.endDate')"
                value-format="yyyy-MM-dd"
                :picker-options="pickerOptions1">
              </el-date-picker>
              <el-date-picker
                :class="{ displayNone: statisticWay3 !== 2 }"
                v-model="dateRangeMonth3"
                @change="getIncomeCompare(statisticWay3, true)"
                type="monthrange"
                :range-separator="$t('dashboard.to')"
                :start-placeholder="$t('dashboard.startMonth')"
                :end-placeholder="$t('dashboard.endMonth')"
                value-format="yyyy-MM"
                :picker-options="pickerOptions2">
              </el-date-picker>
            </div>
          </div>
          <div class="whiteCard">
            <div id="growthStatistics2" class="barChart"></div>
            <div class="sorts">
              <el-row style="margin-bottom: 10px; text-align: center;">
                <el-col :span="24">
                  <div>{{ $t('dashboard.growthOrDecreaseComparisonTableHB') }}</div>
                </el-col>
              </el-row>
              <el-row style="display: flex; justify-content: center">
                  <el-button size="mini" :class="{ buttonActive: tableShow2 === 0 }" @click="changeTableShow2(0)">{{ $t('dashboard.orderRevenue') }}
                  </el-button>
                  <el-button size="mini" :class="{ buttonActive: tableShow2 === 1 }" @click="changeTableShow2(1)">{{ $t('dashboard.quantityOfOrder') }}</el-button>
                  <el-button size="mini" :class="{ buttonActive: tableShow2 === 2 }" @click="changeTableShow2(2)">{{ $t('dashboard.paidOrder') }}
                  </el-button>
                  <el-button size="mini" :class="{ buttonActive: tableShow2 === 3 }" @click="changeTableShow2(3)">{{ $t('dashboard.freeOrder') }}
                  </el-button>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-table
                    :data="tableDataSliced2"
                    border
                    style="width: 375px; margin: 10px auto;">
                    <el-table-column
                      prop="date"
                      :label="$t('dashboard.date')"
                      align="center"
                      width="125">
                    </el-table-column>
                    <el-table-column
                      prop="value"
                      :label="tableColumn2"
                      align="center"
                      width="125">
                    </el-table-column>
                    <el-table-column
                      prop="rate"
                      :label="$t('dashboard.growthOrDecreaseRateHB')"
                      align="center"
                      width="125">
                    </el-table-column>
                  </el-table>
                  <el-pagination
                    @current-change="handleCurrentChange2"
                    small
                    layout="prev, pager, next"
                    :current-page.sync="currentPage2"
                    :page-size="pageSizeTable2"
                    :total="tableData2.length"
                    style="text-align: center">
                  </el-pagination>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
  import {formatTime} from '../../utils/common'
  import echarts from 'echarts'
  import qs from 'qs'
  import {getToken} from '@/utils/auth'
  import i18n from '@/i18n/index'

  export default {
    name: 'Dashboard',
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
        // 导航栏数据对象
        navObj: {},
        // 柱状图表格
        tableColumn1: '',
        tableColumn2: '',
        tableShow1: 0,
        tableShow2: 0,
        currentPage1: 1,
        currentPage2: 1,
        tableData1: [],
        tableData2: [],
        tableDataSliced1: [],
        tableDataSliced2: [],
        pageSizeTable1: 5,
        pageSizeTable2: 5,
        allTableData1: [],
        allTableData2: [],
        // 第一行数据
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
        // 根据窗口大小重新渲染图片
        resizeList: [],
        // 统计范围
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
        statisticWay1: 1,
        statisticWay2: '星期一',
        statisticWay3: 1,
        dateRangeDay1: [],
        dateRangeMonth1: [],
        dateRange2: [],
        dateRangeDay3: [],
        dateRangeMonth3: [],
        curDate: '',
        pickerOptions1: {
          shortcuts: [{
            text: i18n.t('dashboard.lastWeek'),
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: i18n.t('dashboard.lastMonth'),
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: i18n.t('dashboard.lastThreeMonths'),
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }],
          onPick: ({maxDate, minDate}) => {
            this.curDate = minDate.getTime()
            if (maxDate) {
              this.curDate = ''
            }
          },
          disabledDate: (time) => {
            if (this.curDate.length !== 0) {
              const threeMonth = 90 * 24 * 3600 * 1000
              const minTime = this.curDate - threeMonth
              const maxTime = this.curDate + threeMonth
              return time.getTime() < minTime || time.getTime() > maxTime
            }
          },
        },
        pickerOptions2: {
          shortcuts: [{
            text: i18n.t('dashboard.lastSixMonths'),
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setMonth(start.getMonth() - 6);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: i18n.t('dashboard.lastYear'),
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setMonth(start.getMonth() - 12);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
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
      }
    },
    computed: {
      navbarDoQuery() {
        return this.$store.state.app.navbarDoQuery
      },
    },
    watch: {
      navbarDoQuery: {
        handler(newValue, oldValue) {
          this.clickedQuery()
        },
      },
    },
    async created() {
      let that = this
      await this.getMenuList()
      let a = this.$store.state.app.navbarObj
      if (a.dateRange !== undefined) {
        this.$store.dispatch('app/initNavbarQuery')
      }
      this.$store.dispatch('app/resizeChart', this.resizeList)
      window.onresize = function() {
        for (let i = 0; i < that.resizeList.length; i++) {
          that.resizeList[i].resize()
        }
      }
    },
    destroyed() {
      window.onresize = null;
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
          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => {
          console.log('err', err)
        })
      },
      // 进入页面时立即调用的方法
      clickedQuery() {
        let a = this.$store.state.app.navbarObj
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
        this.getIncomeCompare(this.statisticWay2, true)
        this.getIncomeCompare(this.statisticWay3, true)
        // this.$store.dispatch('app/isLoading', false)
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
      getRevenueStream(drawChart) {
        let statTime
        let endTime
        if (this.statisticWay1 === 1) {
          statTime = this.dateRangeDay1[0]
          endTime = this.dateRangeDay1[1]
        } else if (this.statisticWay1 === 2) {
          statTime = this.dateRangeMonth1[0]
          endTime = this.dateRangeMonth1[1]
        }
        let obj = {
          type: this.statisticWay1,
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
          type: statisticWay,
          smartStartTime: '',
          smartEndTime: '',
          orgId: this.navObj.orgId,
          countryId: this.navObj.countryId,
        }
        // statisticWay是 星期一到星期日(字符串) 时 obj 为同比参数
        if (typeof statisticWay === 'string') {
          obj.type = 3
          obj.week = statisticWay
          obj.smartStartTime = this.dateRange2[0]
          obj.smartEndTime = this.dateRange2[1]
        } else {
          if (statisticWay === 1) {
            obj.smartStartTime = this.dateRangeDay3[0]
            obj.smartEndTime = this.dateRangeDay3[1]
          } else if (statisticWay === 2) {
            obj.smartStartTime = this.dateRangeMonth3[0]
            obj.smartEndTime = this.dateRangeMonth3[1]
          }
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
                this.changeTableShow1()
                this.GrowthStatisticsChart1() // 画图需要在 getAllTableData 得到数据后
              } else {
                this.getAllTableData('incomeCompare2', 'allTableData2')
                this.changeTableShow2()
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
        let startDay1 = formatTime(new Date().getTime() - 3600 * 1000 * 24 * 30, 'yyyy-MM-dd')
        let startDay2 = formatTime(new Date().getTime() - 3600 * 1000 * 24 * 30 * 3, 'yyyy-MM-dd')
        let endDay = formatTime(new Date().getTime(), 'yyyy-MM-dd')
        let startMonth = formatTime(new Date().getTime() - 3600 * 1000 * 24 * 30 * 12, 'yyyy-MM')
        let endMonth = formatTime(new Date().getTime(), 'yyyy-MM')
        this.dateRangeDay1 = [startDay1, endDay]
        this.dateRangeMonth1 = [startMonth, endMonth]
        this.dateRange2 = [startDay2, endDay]
        this.dateRangeDay3 = [startDay1, endDay]
        this.dateRangeMonth3 = [startMonth, endMonth]
      },
      // 修改表格统计维度
      changeTableShow1(index) {
        if (index === undefined) {
          this.tableShow1 = 0
          this.tableColumn1 = i18n.t('dashboard.revenue')
        } else {
          this.tableShow1 = index
          this.tableColumn1 = (index === 0 ? i18n.t('dashboard.revenue') : i18n.t('dashboard.quantity'))
        }
        this.currentPage1 = 1
        this.tableData1 = this.allTableData1[this.tableShow1].slice(0)
        this.tableDataSliced1 = this.tableData1.slice(0, this.pageSizeTable1)
      },
      changeTableShow2(index) {
        if (index === undefined) {
          this.tableShow2 = 0
          this.tableColumn2 = i18n.t('dashboard.revenue')
        } else {
          this.tableShow2 = index
          this.tableColumn2 = (index === 0 ? i18n.t('dashboard.revenue') : i18n.t('dashboard.quantity'))
        }
        this.currentPage2 = 1
        this.tableData2 = this.allTableData2[this.tableShow2].slice(0)
        this.tableDataSliced2 = this.tableData2.slice(0, this.pageSizeTable2)
      },
      // 修改表格页数
      handleCurrentChange1(val) {
        this.tableDataSliced1 = this.tableData1.slice((val - 1) * this.pageSizeTable1, val * this.pageSizeTable1)
      },
      handleCurrentChange2(val) {
        this.tableDataSliced2 = this.tableData2.slice((val - 1) * this.pageSizeTable2, val * this.pageSizeTable2)
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
          tooltip: {
            trigger: 'item',
            formatter(params) {
              return `${params.data.name}
                      <br/>${i18n.t('dashboard.numberOfNetworkPoints')}${params.data.value}
                      <br/>${i18n.t('dashboard.numberOfDevices')}${params.data.terminalNum}
                      <br/>${i18n.t('dashboard.proportionOfOutletScenes')}${params.data.shopRatio}`
            }
          },
          series: [
            {
              name: 'ShopChart',
              type: 'pie',
              radius: [0, '70%'],
              center: ['50%', '50%'],
              selectedMode: 'single',
              label: {
                show: true,
              },
              data: data,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
        shopChart.setOption(option, true)
        if (this.resizeList.includes(shopChart) === false) {
          this.resizeList.push(shopChart)
        }
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
          tooltip: {
            trigger: 'item',
            formatter(params) {
              return `${params.data.name}
                      <br/>${i18n.t('dashboard.quantityOfOrder1')}${params.data.value}
                      <br/>${i18n.t('dashboard.freeOrder1')}${params.data.freeOrderNum}
                      <br/>${i18n.t('dashboard.paidOrderNum1')}${params.data.payOrderNum}
                      <br/>${i18n.t('dashboard.orderSceneRatio')}${params.data.orderRatio}`
            }
          },
          series: [
            {
              name: 'OrderChart',
              type: 'pie',
              radius: [0, '70%'],
              center: ['50%', '50%'],
              selectedMode: 'single',
              label: {
                show: true,
              },
              data: data,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
        orderChart.setOption(option, true)
        if (this.resizeList.includes(orderChart) === false) {
          this.resizeList.push(orderChart)
        }
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
          tooltip: {
            trigger: 'item',
            formatter(params) {
              return `${params.data.name}
                      <br/>${i18n.t('dashboard.revenue1')}${params.data.value}
                      <br/>${i18n.t('dashboard.sceneProportionByRevenue')}${params.data.incomeRatio}`
            }
          },
          series: [
            {
              name: 'IncomeChart',
              type: 'pie',
              radius: [0, '70%'],
              center: ['50%', '50%'],
              selectedMode: 'single',
              label: {
                show: true,
              },
              data: data,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
        IncomeChart.setOption(option, true)
        if (this.resizeList.includes(IncomeChart) === false) {
          this.resizeList.push(IncomeChart)
        }
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
          tooltip: {
            trigger: 'item',
            formatter(params) {
              return `${params.data.name}
                      <br/>${i18n.t('dashboard.userRegistrations')}${params.data.value}
                      <br/>${i18n.t('dashboard.rentalConversionRate')}${params.data.borrowRatio}`
            }
          },
          series: [
            {
              name: 'RegisterChannelChart',
              type: 'pie',
              radius: ['55%', '70%'],
              center: ['50%', '50%'],
              label: {
                normal: {
                  show: true,
                  position: 'center',
                  formatter: [
                    `{a|${i18n.t('dashboard.totalRegisteredUsers')}}`,
                    `{b|${userRegisterTotal}}`,
                  ].join('\n'),
                  rich: {
                    a: {
                      fontSize: 14,
                      fontFamily: 'PingFangSC-Regular,PingFang SC',
                      fontWeight: 400,
                      color: '#818D8A',
                      lineHeight: 22,
                    },
                    b: {
                      fontSize: 34,
                      fontFamily: 'PingFangSC-Light,PingFang SC',
                      fontWeight: 300,
                      color: '#2A2F2B',
                      lineHeight: 47,
                    },
                  }
                },
              },
              data: data,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
        registerChannelChart.setOption(option, true)
        if (this.resizeList.includes(registerChannelChart) === false) {
          this.resizeList.push(registerChannelChart)
        }
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
            tooltip: {
              trigger: 'item',
              formatter(params) {
                return `${params.data.name}
                      <br/>${i18n.t('dashboard.numberOfOrder')}${params.data.value}
                      <br/>${i18n.t('dashboard.proportion')}${params.data.orderRatio}`
              }
            },
            series: [
              {
                name: 'OrderRatioChart',
                type: 'pie',
                radius: ['55%', '70%'],
                center: ['50%', '50%'],
                label: {
                  normal: {
                    show: true,
                    position: 'center',
                    formatter: [
                      `{a|${i18n.t('dashboard.totalOrders')}}`,
                      `{b|${that.orderRatioByTime.totalOrder}}`,
                    ].join('\n'),
                    rich: {
                      a: {
                        fontSize: 14,
                        fontFamily: 'PingFangSC-Regular,PingFang SC',
                        fontWeight: 400,
                        color: '#818D8A',
                        lineHeight: 22,
                      },
                      b: {
                        fontSize: 45,
                        fontFamily: 'PingFangSC-Light,PingFang SC',
                        fontWeight: 300,
                        color: '#2A2F2B',
                        lineHeight: 47,
                      },
                    }
                  },
                },
                data: data,
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
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
            tooltip: {
              trigger: 'item',
              formatter(params) {
                return `${params.data.name}
                      <br/>${i18n.t('dashboard.numberOfOrder')}${params.data.value}
                      <br/>${i18n.t('dashboard.proportion')}${params.data.orderRatio}`
              }
            },
            series: [
              {
                name: 'OrderRatioChart',
                type: 'pie',
                radius: ['55%', '70%'],
                center: ['50%', '50%'],
                label: {
                  normal: {
                    show: true,
                    position: 'center',
                    formatter: [
                      `{a|${i18n.t('dashboard.totalOrders')}}`,
                      `{b|${that.orderRatioByMoney.totalOrder}}`,
                    ].join('\n'),
                    rich: {
                      a: {
                        fontSize: 14,
                        fontFamily: 'PingFangSC-Regular,PingFang SC',
                        fontWeight: 400,
                        color: '#818D8A',
                        lineHeight: 22,
                      },
                      b: {
                        fontSize: 45,
                        fontFamily: 'PingFangSC-Light,PingFang SC',
                        fontWeight: 300,
                        color: '#2A2F2B',
                        lineHeight: 47,
                      },
                    }
                  },
                },
                data: data,
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          }
        }
        orderRatioChart.setOption(option, true)
        if (this.resizeList.includes(orderRatioChart) === false) {
          this.resizeList.push(orderRatioChart)
        }
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
          tooltip: {
            trigger: 'item',
            formatter(params) {
              return `${params.data.name}
                      <br/>${i18n.t('dashboard.numberOfOrder')}${params.data.value}
                      <br/>${i18n.t('dashboard.proportion')}${params.data.orderRatio}`
            }
          },
          series: [
            {
              name: 'OrderChannelChart',
              type: 'pie',
              radius: ['55%', '70%'],
              center: ['50%', '50%'],
              label: {
                normal: {
                  show: true,
                  position: 'center',
                  formatter: [
                    `{a|${i18n.t('dashboard.totalOrders')}}`,
                    `{b|${that.orderChannel.totalOrder}}`,
                  ].join('\n'),
                  rich: {
                    a: {
                      fontSize: 14,
                      fontFamily: 'PingFangSC-Regular,PingFang SC',
                      fontWeight: 400,
                      color: '#818D8A',
                      lineHeight: 22,
                    },
                    b: {
                      fontSize: 45,
                      fontFamily: 'PingFangSC-Light,PingFang SC',
                      fontWeight: 300,
                      color: '#2A2F2B',
                      lineHeight: 47,
                    },
                  }
                },
              },
              data: data,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
        orderChannelChart.setOption(option, true)
        if (this.resizeList.includes(orderChannelChart) === false) {
          this.resizeList.push(orderChannelChart)
        }
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
            top: '15%',
            bottom: '10%',
            containLabel: true,
          },
          dataZoom: [
            {
              type: 'slider',
              show: true,
              xAxisIndex: [0],
              start: 77,
              end: 100
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
            top: 24,
            right: '5%',
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
        if (this.resizeList.includes(revenueStreamChart) === false) {
          this.resizeList.push(revenueStreamChart)
        }
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
          if (this.week[i].value === this.statisticWay2) {
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
            top: 24,
            right: '5%',
          },
          grid: {
            left: '3%',
            right: '3%',
            top: '15%',
            bottom: '10%',
            containLabel: true,
          },
          dataZoom: [
            {
              type: 'slider',
              show: true,
              xAxisIndex: [0],
              start: 0,
              end: 100
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
        if (this.resizeList.includes(growthStatistics1) === false) {
          this.resizeList.push(growthStatistics1)
        }
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
            top: 24,
            right: '5%',
          },
          grid: {
            left: '3%',
            right: '3%',
            top: '15%',
            bottom: '10%',
            containLabel: true,
          },
          dataZoom: [
            {
              type: 'slider',
              show: true,
              xAxisIndex: [0],
              start: 77,
              end: 100
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
        if (this.resizeList.includes(growthStatistics2) === false) {
          this.resizeList.push(growthStatistics2)
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .dashboard-container {
    .flexLayout1 {
      display: flex;
      align-items: baseline;
    }

    .displayNone {
      display: none;
    }

    .headPart {
      padding: 24px 24px 0px 24px;
      background: rgba(243, 243, 247, 1);
    }

    .chartContainer {
      min-width: 1115px;
      background: rgba(243, 243, 247, 1);
      padding: 0px 24px 24px 24px;

      /deep/ .el-radio-button--mini .el-radio-button__inner {
        padding: 7px 10px;
      }

      .maskLayer {
        position: absolute;
        height: 100%;
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

      .sceneItem {
        display: flex;
        align-items: baseline;
        line-height: 18px;
        min-height: 36px;
        &:nth-child(odd) {
          margin-right: 10px;
        }
      }

      .whiteCard {
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 6px 12px -4px rgba(225, 225, 235, 0.24);
        border-radius: 8px;
        position: relative;
      }

      .chartTitle {
        display: inline-block;
        margin-bottom: 10px;
        font-size: 24px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(42, 47, 43, 1);
        line-height: 36px;
      }

      .pie {
        .chartItem {
          width: 49%;
          display: inline-block;
          margin-top: 32px;

          &:nth-child(odd) {
            margin-right: 16px;
          }

          .pieChart {
            display: inline-block;
            width: 67%;
            height: 300px;
            margin: 5px 0px 5px 10px;
          }

          .sorts1 {
            display: flex;
            float: right;
            flex-direction: column;
            justify-content: center;
            height: 310px;
            width: 30%;
          }

          .sorts2 {
            display: flex;
            float: right;
            flex-direction: column;
            justify-content: center;
            height: 310px;
            width: 30%;
          }

          .part1 {
            margin-bottom: 20px;
          }
        }
      }

      .line {
        .chartItem {
          margin-top: 32px;
          width: 100%;

          .lineChart {
            display: inline-block;
            width: 70%;
            height: 460px;
            margin-left: 10px;
          }

          .sorts {
            display: inline-block;
            margin-bottom: 50px;
            width: 28%;

            .part1 {
              margin-bottom: 30px;
            }
          }
        }
      }

      .bar {
        .buttonActive {
          color: #fff;
          background-color: #67c23a;
          border-color: #67c23a;
        }

        .chartItem {
          margin-top: 32px;
          width: 100%;

          .barChart {
            display: inline-block;
            width: 65%;
            height: 460px;
            margin-left: 10px;
          }

          .sorts {
            float: right;
            display: inline-block;
            width: 33%;
            margin-top: 16px;
          }
        }
      }
    }

    .newIncreasePart {
      float: right;
      padding: 5px 0px 5px 24px;
      border-left: 1px solid rgba(243, 243, 247, 1);
    }

    .grayFontStyle {
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(129, 141, 138, 1);
      line-height: 22px;
    }

    .titleBox {
      text-align: center;
      margin-bottom: 16px;
      padding-bottom: 8px;
      border-bottom: 1px solid rgba(243, 243, 247, 1);
    }

    .bigNumber {
      width: calc(100% - 235px);
      display: inline-block;
      text-align: center;
      font-size: 50px;
      font-family: PingFangSC-Light, PingFang SC;
      font-weight: 300;
      color: rgba(42, 47, 43, 1);
      line-height: 72px;
    }

    .headLineCard {
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 6px 12px -4px rgba(225, 225, 235, 0.24);
      border-radius: 8px;
      height: 149px;
      margin-bottom: 20px;
      padding: 8px 20px 22px 20px;
    }

    .IconColor0 {
      background: rgba(135, 215, 33, 1);
      box-shadow: 0px 4px 6px -1px rgba(18, 183, 52, 0.5);
    }

    .IconColor1 {
      background: rgba(255, 216, 48, 1);
      box-shadow: 0px 4px 6px -1px rgba(255, 216, 48, 0.5);
    }

    .IconColor2 {
      background: rgba(255, 135, 32, 1);
      box-shadow: 0px 4px 6px -1px rgba(255, 135, 32, 0.5);
    }

    .IconColor3 {
      background: rgba(241, 78, 69, 1);
      box-shadow: 0px 4px 6px -1px rgba(241, 78, 69, 0.5);
    }

    .IconColor4 {
      background-color: #D8DDD9;
    }

    .cardTitle {
      display: inline-block;
      font-size: 18px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(42, 47, 43, 1);
      line-height: 28px;
    }

    .headerField {
      padding-bottom: 10px;
      font-size: 24px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: rgba(42, 47, 43, 1);
      line-height: 36px;
    }
  }
</style>
