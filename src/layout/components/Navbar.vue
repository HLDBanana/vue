<template>
  <div class="navbar">
    <div v-if="isPC" class="pc-head">
      <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar"/>
      <div>
        <div class="inlineBlock" style="line-height: 46px">
          <div
            style="vertical-align: middle; display: inline-block; height: 24px; width: 1px; background-color: #D8DDD9"></div>
        </div>
        <!--    <breadcrumb class="breadcrumb-container" />-->
        <div class="inlineBlock navMarginSet">{{ $t('navbar.country') }}
          <el-select class="inlineBlock countrySelector" v-model="country" @change="getUserOrg('pc')" placeholder="请选择国家">
            <!--        :disabled="server === 'japan'"-->
            <el-option
              v-for="item in countries"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              <!--          :disabled="item.value === 1 && server === 'asia'"-->
            </el-option>
          </el-select>
        </div>
        <div class="inlineBlock navMarginSet">{{ $t('navbar.organization') }}
          <el-button @click="dialogVisible = true" style="min-width: 98px; min-height: 40px">{{ orgName }}</el-button>
          <el-dialog
            :title="$t('navbar.organizationList')"
            :visible.sync="dialogVisible"
            :modal-append-to-body="false"
            width="40%">
            <el-tree
              :data="orgStructure"
              :props="defaultProps"
              node-key="value"
              ref="tree"
              @check="handleCheck"
              :default-checked-keys="defaultOrgStructureValue"
              show-checkbox
              :default-expand-all="true"
              :check-strictly="true">
            </el-tree>
            <div slot="footer">
              <el-button @click="treeCancel('pc')">{{ $t('navbar.cancel') }}</el-button>
              <el-button type="primary" @click="treeConfirm('pc')">{{ $t('navbar.confirm') }}</el-button>
            </div>
          </el-dialog>
        </div>
        <div class="inlineBlock navMarginSet">{{ $t('navbar.statisticalDate') }}
          <el-date-picker
            class="datePicker"
            v-model="dateRange"
            type="daterange"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd"
            :range-separator="$t('navbar.to')"
            :start-placeholder="$t('navbar.startDate')"
            :nd-placeholder="$t('navbar.endDate')">
          </el-date-picker>
        </div>
        <el-button class="button-search navMarginSet" @click="queryData('pc')">{{ $t('navbar.search') }}</el-button>
        <div style="float: right; margin-right: 20px; line-height: 46px;">
          <div class="inlineBlock">{{ $t('navbar.position') }}
            <el-input class="inlineBlock class-position" v-model="position" :readonly="true"></el-input>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!isPC" class="mobile-head">
      <svg-icon @click="toggleSideBar" icon-class="menu" class="mobile-menu"/>
      <van-icon @click="showSettingDialog" name="setting" size="24"/>
      <div class="mobile-title">{{ $t(`${$route.meta.title}`) }}</div>
      <van-popup
        v-model="isShowSettingDialog"
        :close-on-popstate="true"
        round
        style="width: 90%; padding: 24px;"
        @close="cancelSettingDialog">
        <el-form ref="settingForm" :model="settingForm" label-width="80px">
          <el-form-item label="国家">
            <el-input v-model="settingForm.country.label" readonly @click.native="isShowCountrySelector = true"></el-input>
          </el-form-item>
          <el-form-item label="选择组织">
            <!-- 组织部分 pc 和 mobile 共用 -->
            <el-input v-model="orgName" readonly @click.native="isShowOrganizationSelector = true"></el-input>
          </el-form-item>
          <el-form-item label="统计时间">
            <el-input v-model="settingForm.dateRangeLabel" readonly @click.native="showCalendar = true"></el-input>
          </el-form-item>
        </el-form>
        <div class="dialog-footPart" style="margin-top: 24px">
          <div class="cancelButton" @click="isShowSettingDialog = false">取消</div>
          <div class="confirmButton" @click="confirmSettingDialog">确认</div>
        </div>
      </van-popup>
      <van-popup
        v-model="isShowCountrySelector"
        :close-on-popstate="true"
        position="bottom">
        <van-picker
          show-toolbar
          value-key="label"
          :columns="countries"
          @cancel="countryOnCancel"
          @confirm="countryOnConfirm"
        />
      </van-popup>
      <van-popup
        v-model="isShowOrganizationSelector"
        :close-on-popstate="true"
        position="bottom"
        :safe-area-inset-bottom="true"
        style="padding: 24px">
        <el-tree
          :data="orgStructure"
          :props="defaultProps"
          node-key="value"
          ref="tree"
          @check="handleCheck"
          :default-checked-keys="defaultOrgStructureValue"
          show-checkbox
          :default-expand-all="true"
          :check-strictly="true">
        </el-tree>
        <div style="display: flex; justify-content: space-around; margin-top: 24px;">
          <el-button @click="treeCancel('mobile')">{{ $t('navbar.cancel') }}</el-button>
          <el-button type="primary" @click="treeConfirm('mobile')">{{ $t('navbar.confirm') }}</el-button>
        </div>
      </van-popup>
      <van-calendar v-model="showCalendar" :default-date="calendarDefaultDate" :min-date="new Date(2018, 0, 1)" :close-on-popstate="true" color="#409eff" type="range" @confirm="dateOnConfirm"/>
    </div>
  </div>
</template>

<script>
  import {Icon, Popup, Calendar, Picker} from 'vant'
  import {mapGetters} from 'vuex'
  import Breadcrumb from '@/components/Breadcrumb'
  import Hamburger from '@/components/Hamburger'
  import {getUserOrg, getCountry,} from '../../services'
  import {formatTime} from '../../utils/common'
  import {isPC} from '@/utils/common'

  export default {
    components: {
      [Icon.name]: Icon,
      [Popup.name]: Popup,
      [Calendar.name]: Calendar,
      [Picker.name]: Picker,
      Breadcrumb,
      Hamburger
    },
    data() {
      return {
        isPC: '',
        // mobile 用到的 data
        isShowSettingDialog: false,
        isShowCountrySelector: false,
        isShowOrganizationSelector: false,
        showCalendar: false,
        calendarDefaultDate: [],
        // 组件层数据
        settingForm: {
          country: {
            label: '',
            value: '',
          },
          dateRange: '',
          dateRangeLabel: '',
        },
        // 弹窗层数据
        mobileSetting: {
          settingForm: {
            country: {
              label: '',
              value: '',
            },
            dateRange: [],
            dateRangeLabel: '',
          },
          organization: {
            orgName: '',
            orgStructureValue: [],
            partnerType: '',
          },
        },
        // mobile 和 pc 端相同的 data
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        dialogVisible: false,
        server: '',
        country: '',
        countries: [],
        orgStructure: [],
        orgStructureValue: [],
        defaultOrgStructureValue: [],
        orgName: '',
        partnerType: '',
        dateRange: [],
        position: '',
        pickerOptions: {
          shortcuts: [{
            text: this.$t('navbar.today'),
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime());
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: this.$t('navbar.lastWeek'),
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: this.$t('navbar.lastMonth'),
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: this.$t('navbar.lastHalfAYear'),
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 183);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: this.$t('navbar.lastYear'),
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
              picker.$emit('pick', [start, end]);
            }
          },]
        },
      }
    },
    computed: {
      ...mapGetters([
        'sidebar',
      ]),
      initNavbar() {
        return this.$store.state.app.initNavbar
      },
    },
    watch: {
      // pc 端监听是否初始化导航栏
      initNavbar: {
        handler(newValue, oldValue) {
          this.main()
        },
      },
    },
    created() {
      this.isPC = isPC()
      if (this.isPC === true) {
        this.main()
      } else if (this.isPC === false) {
        this.mobile_main()
      }
    },
    mounted() {},
    methods: {
      // 获取服务器地址
      getServer() {
        if (window.location.host === 'maintain.powernow.jp') {
          this.server = 'japan'
          // localhost:9528
        } else if (window.location.host === 'maintain.powernow.asia') {
          this.server = 'asia'
        } else {
          this.server = 'asia'
        }
      },
      async getCountry(platform) {
        await getCountry().then(res => {
          let a = res.data.map(e => {
            return {value: e.id, label: e.countryName}
          })
          if (this.server === 'japan') {
            this.countries = a.filter(e => {
              return e.value === 1 // 1 是日本id
            })
          } else if (this.server === 'asia') {
            this.countries = a.filter(e => {
              return e.value !== 1 // 1 是日本id
            })
          }
          if (platform === 'mobile') {
            this.settingForm.country = Object.assign({}, this.settingForm.country, this.countries[0])
            this.mobileSetting.settingForm.country = Object.assign({}, this.mobileSetting.settingForm.country, this.countries[0])
          } else if (platform === 'pc') {
            this.country = this.countries[0].value
          }
        }).catch(err => {
          console.log(err)
        })
      },
      // 获取默认时间范围
      getDefaultDateRange(platform) {
        let thirtyDaysBefore = new Date().getTime() - 3600 * 1000 * 24 * 30
        let today = new Date().getTime()
        let start = formatTime(thirtyDaysBefore, 'yyyy-MM-dd')
        let end = formatTime(today, 'yyyy-MM-dd')
        if (platform === 'mobile') {
          let defaultDateBegin = new Date(new Date(thirtyDaysBefore).getFullYear(), new Date(thirtyDaysBefore).getMonth(), new Date(thirtyDaysBefore).getDate())
          let defaultDateEnd = new Date(new Date(today).getFullYear(), new Date(today).getMonth(), new Date(today).getDate())
          this.calendarDefaultDate = [defaultDateBegin, defaultDateEnd]
          this.settingForm.dateRange = [start, end]
          this.mobileSetting.settingForm.dateRange = [start, end]
          this.settingForm.dateRangeLabel = `${start} - ${end}`
          this.mobileSetting.settingForm.dateRangeLabel = `${start} - ${end}`
        } else if (platform === 'pc') {
          this.dateRange = [start, end]
        }
      },
      // 组织
      //
      // 转换格式 组织架构(并给职位赋值)
      listToTree(array) {
        let arr = array.slice(0)
        let topNodeLevel = arr[0].level
        for (let i = 0; i < arr.length; i++) {
          let n = arr[i].level
          if (n < topNodeLevel) {
            topNodeLevel = n
          }
        }
        arr.forEach(ele => {
          let orgId = ele.orgId
          arr.forEach(e => {
            if (e.parentId === orgId) {
              if (!ele.children) {
                ele.children = []
              }
              ele.children.push(e)
            }
          })
        })
        arr = arr.filter(e => e.level === topNodeLevel)
        let result = JSON.parse(JSON.stringify(arr).replace(/orgId/g, "value").replace(/name/g, "label"));
        return result;
      },
      async getUserOrg(platform) {
        let country
        if (platform === 'mobile') {
          country = this.settingForm.country.value
        } else if (platform === 'pc') {
          country = this.country
        }
        let obj = {
          countryId: country,
        }
        await getUserOrg(obj).then(res => {
          if (res.code === 1) {
            let r = res.data
            this.position = r.roleName
            this.orgStructure = this.listToTree(r.orgList).slice(0)
            this.defaultOrgStructureValue = [this.orgStructure[0].value] // 默认选择的组织（因为是单选，所以数组只有一个元素）
            this.orgStructureValue = this.defaultOrgStructureValue.slice(0) // 拿到组织对应的值
            this.orgName = this.orgStructure[0].label // 拿到组织对应的名字
            this.partnerType = this.orgStructure[0].partnerType // 经营模式（null：全部，0：直营，1：一级代理，2：二级代理）
            //
            if (platform === 'mobile') {
              this.mobileSetting.organization.orgStructureValue = this.defaultOrgStructureValue.slice(0)
              this.mobileSetting.organization.orgName = this.orgStructure[0].label
              this.mobileSetting.organization.partnerType = this.orgStructure[0].partnerType
            }
          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      // 选择
      handleCheck(data) {
        // 单选
        this.$refs.tree.setCheckedKeys([data.value])
      },
      // 取消
      treeCancel(platform) {
        if (platform === 'mobile') {
          this.isShowOrganizationSelector = false
        } else if (platform === 'pc') {
          this.dialogVisible = false
        }
        this.$refs.tree.setCheckedKeys(this.orgStructureValue)
      },
      // 确认
      treeConfirm(platform) {
        let checkedNode = this.$refs.tree.getCheckedNodes()
        this.orgName = checkedNode[0].label
        this.partnerType = checkedNode[0].partnerType
        this.orgStructureValue = this.$refs.tree.getCheckedKeys().slice(0)
        if (platform === 'mobile') {
          this.isShowOrganizationSelector = false
        } else if (platform === 'pc') {
          this.dialogVisible = false
        }
      },
      //
      // 查询
      queryData(platform) {
        let country
        let dateRange
        if (platform === 'mobile') {
          country = this.mobileSetting.settingForm.country.value
          dateRange = this.mobileSetting.settingForm.dateRange.slice(0)
        } else if (platform === 'pc') {
          country = this.country
          dateRange = this.dateRange
        }
        let queryObj = {
          orgStructureValue: this.orgStructureValue[0], // orgStructureValue 为只有一个元素的数组
          dateRange: dateRange,
          country: country,
          partnerType: this.partnerType,
        }
        if (platform === 'mobile') {
          this.$store.dispatch('app/mobileQueryData', queryObj)
        } else if (platform === 'pc') {
          this.$store.dispatch('app/queryData', queryObj)
        }
        // this.$store.dispatch('app/isLoading', true)
      },
      async main() {
        let platform = 'pc'
        this.getServer()
        await this.getCountry(platform)
        await this.getUserOrg(platform) // 要在 getServerAndCountry 获取默认值后调用
        this.getDefaultDateRange(platform)
        this.queryData(platform)
      },
      async mobile_main() {
        let platform = 'mobile'
        this.getServer()
        await this.getCountry(platform)
        await this.getUserOrg(platform) // 要在 getServerAndCountry 获取默认值后调用
        this.getDefaultDateRange(platform)
        this.queryData(platform)
      },
      // mobile
      // 导航设置
      showSettingDialog() {
        this.isShowSettingDialog = true
      },
      // 选择国家
      countryOnConfirm(value, index) {
        this.isShowCountrySelector = false
        this.settingForm.country = Object.assign({}, this.settingForm.country, value)
      },
      countryOnCancel() {
        this.isShowCountrySelector = false
      },
      // 选择日期
      dateOnConfirm(date) {
        let [start, end] = date;
        let a = formatTime(start.getTime(), 'yyyy-MM-dd')
        let b = formatTime(end.getTime(), 'yyyy-MM-dd')
        this.settingForm = Object.assign({}, this.settingForm, {
          dateRange: [a, b],
          dateRangeLabel: `${a} - ${b}`,
        })
        this.showCalendar = false;
      },
      // 设置检索条件
      cancelSettingDialog() {
        // dialog 消失时间是300ms
        let that = this
        setTimeout(() => {
          // 点击取消后，恢复之前的检索值
          let a = that.mobileSetting.settingForm
          let b = that.mobileSetting.organization
          // 国家
          that.settingForm.country = Object.assign({}, that.settingForm.country, a.country)
          // 日期
          that.settingForm = Object.assign({}, that.settingForm, {
            dateRange: a.dateRange.slice(0),
            dateRangeLabel: a.dateRangeLabel,
          })
          // 组织
          that.orgName = b.orgName
          that.orgStructureValue = b.orgStructureValue.slice(0)
          that.partnerType = b.partnerType
          if (that.$refs.tree !== undefined) {
            that.$refs.tree.setCheckedKeys(that.orgStructureValue)
          }
        }, 300)
      },
      confirmSettingDialog() {
        this.isShowSettingDialog = false
        // 点击取消后，恢复之前的检索值
        let a = this.mobileSetting.settingForm
        let b = this.mobileSetting.organization
        // 国家
        a.country = Object.assign({}, a.country, this.settingForm.country)
        // 日期
        a = Object.assign({}, a, {
          dateRange: this.settingForm.dateRange.slice(0),
          dateRangeLabel: this.settingForm.dateRangeLabel,
        })
        // 组织
        b.orgName = this.orgName
        b.orgStructureValue = this.orgStructureValue.slice(0)
        b.partnerType = this.partnerType
        this.queryData('mobile')
      },
      // vue-element-admin
      toggleSideBar() {
        this.$store.dispatch('app/toggleSideBar')
        setTimeout(() => {
          let a = this.$store.state.app.resizeChartList.slice(0)
          for (let i = 0; i < a.length; i++) {
            a[i].resize()
          }
        }, 300)
      },
    }
  }
</script>

<style lang="scss" scoped>
  .navbar {
    height: 50px;
    white-space: nowrap;
    overflow: hidden;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

    .datePicker {
      width: 310px;
    }

    .class-position {
      width: 120px;
    }

    .countrySelector {
      width: 150px;
    }

    .inlineBlock {
      display: inline-block;
    }

    .navMarginSet {
      margin-left: 14px;
    }

    .button-search.el-button {
      margin-right: 0px;
      padding: 5px 18px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 22px;
      background: #67c23a;
      box-shadow: 0px 6px 12px -4px rgba(103, 194, 58, 0.5);
      border-radius: 4px;
    }

    .hamburger-container {
      display: inline-block;
      line-height: 46px;
      height: 100%;
      float: left;
      cursor: pointer;
      transition: .3s;
      -webkit-tap-highlight-color: transparent;

      &:hover {
        background: rgba(0, 0, 0, .025)
      }
    }

    .breadcrumb-container {
      float: left;
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

    .settingPopup {
      min-height: 30%;
      width: calc(100% - 32px);
      padding: 24px;
    }

    .popupBottom {
      display: flex;
      justify-content: space-between;
    }

    .pc-head {
      height: 100%;
      overflow: hidden;
      position: relative;
    }

    .mobile-head {
      height: 100%;
      display: flex;
      align-items: center;
    }

    .mobile-menu {
      height: 24px;
      width: 24px;
      margin: 0px 8px;
    }

    .dialog-footPart {
      display: flex;
      justify-content: space-around;
    }
  }
</style>
