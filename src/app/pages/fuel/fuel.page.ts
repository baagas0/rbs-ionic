import { Location } from '@angular/common';
import { Component, Inject, LOCALE_ID, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IonContent, NavController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { RestService } from 'src/app/services/rest.service';
import { StorageService } from 'src/app/services/storage.service';
import { TestService } from 'src/app/services/test.service';
// import { TabInterface } from '../pages.page';

@Component({
  selector: 'app-fuel',
  templateUrl: 'fuel.page.html',
  styleUrls: ['fuel.page.scss'],
})
export class Fuel {
  @ViewChild(IonContent, { read: IonContent }) myContent: IonContent;
  @ViewChild('fuelSlider') fuelSlider;
  tab: string = 'usage';
  addPage: string = '/pages/fuel/form/usage';

  dataLimit: any = 10;
  currentPageUsage: any = 0;
  countDataUsage: any = 1;
  currentPageIncome: any = 0;
  countDataIncome: any = 1;

  dataUsage: any = [];
  dataIncome: any = [];
  slideOpts: any = {
    initialSlide: 0,
    speed: 400,
    autoHeight: true,
    on: {
      beforeInit() {
        const swiper = this;
        swiper.classNames.push(`${swiper.params.containerModifierClass}fade`);
        const overwriteParams = {
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          spaceBetween: 0,
          virtualTranslate: true,
        };
        swiper.params = Object.assign(swiper.params, overwriteParams);
        swiper.params = Object.assign(swiper.originalParams, overwriteParams);
      },
      setTranslate() {
        const swiper = this;
        const { slides } = swiper;
        for (let i = 0; i < slides.length; i += 1) {
          const $slideEl = swiper.slides.eq(i);
          const offset$$1 = $slideEl[0].swiperSlideOffset;
          let tx = -offset$$1;
          if (!swiper.params.virtualTranslate) tx -= swiper.translate;
          let ty = 0;
          if (!swiper.isHorizontal()) {
            ty = tx;
            tx = 0;
          }
          const slideOpacity = swiper.params.fadeEffect.crossFade
            ? Math.max(1 - Math.abs($slideEl[0].progress), 0)
            : 1 + Math.min(Math.max($slideEl[0].progress, -1), 0);
          $slideEl
            .css({
              opacity: slideOpacity,
            })
            .transform(`translate3d(${tx}px, ${ty}px, 0px)`);
        }
      },
      setTransition(duration) {
        const swiper = this;
        const { slides, $wrapperEl } = swiper;
        slides.transition(duration);
        if (swiper.params.virtualTranslate && duration !== 0) {
          let eventTriggered = false;
          slides.transitionEnd(() => {
            if (eventTriggered) return;
            if (!swiper || swiper.destroyed) return;
            eventTriggered = true;
            swiper.animating = false;
            const triggerEvents = ['webkitTransitionEnd', 'transitionend'];
            for (let i = 0; i < triggerEvents.length; i += 1) {
              $wrapperEl.trigger(triggerEvents[i]);
            }
          });
        }
      },
    },
  };

  constructor(
    @Inject(LOCALE_ID) locale: string,
    private restService: RestService,
    private location: Location,
    private navCtrl: NavController,
    private storageService: StorageService,
    private alertService: AlertService
  ) {}

  handleRefresh(event) {
    this.getData(true, '', event);
  }

  getMoreData(event) {
    this.getData(false, event);
  }

  async ngOnInit() {
    // this.tabActived()
  }
  async ionViewDidEnter() {
    let tabActive = await this.storageService.get('tab-fuel');
    console.log('tabActive', tabActive);
    // this.alertService.show('debug', 'ionViewDidEnter trigger');
    if (tabActive) {
      this.tab = tabActive;
      if (tabActive == 'usage') {
        this.fuelSlider.slideTo(0);
      } else if (tabActive == 'income') {
        this.fuelSlider.slideTo(1);
      } else {
        this.alertService.show('Peringatan', 'Tab tidak valid');
      }
      this.getData(true, '');
    } else {
      this.getData(true, '');
    }
  }

  onSlide(event) {
    this.fuelSlider.getActiveIndex().then(async (index) => {
      let realIndex = index;
      // this.alertService.show('debug', 'slide trigger');
      if (realIndex == 0) {
        await this.selectTab('usage', false);
      } else if (realIndex == 1) {
        await this.selectTab('income', false);
      } else {
        this.alertService.show('Peringatan', 'Slider tidak valid');
      }
      this.fuelSlider.updateAutoHeight(400);
    });
  }

  async selectTab(tab, updateSlider = true) {
    this.tab = tab;
    this.addPage = `/pages/fuel/form/${this.tab}`;

    if (updateSlider) {
      if (tab == 'usage') {
        this.fuelSlider.slideTo(0);
      } else if (tab == 'income') {
        this.fuelSlider.slideTo(1);
      }
    } else {
      this.myContent.scrollToTop(400);
    }

    await this.storageService.set('tab-fuel', tab);
    this.getData(true, '');
  }

  getData(isFirstLoad, event, eventPullRefresh = null) {
    if (isFirstLoad) {
      if (this.tab == 'usage') {
        this.currentPageUsage = 0;
      } else if (this.tab == 'income') {
        this.currentPageIncome = 0;
      }
    }

    let currentPage =
      this.tab == 'income' ? this.currentPageIncome : this.currentPageUsage;
    let countData =
      this.tab == 'income' ? this.countDataIncome : this.countDataUsage;
    
    console.log('cok');
    if (currentPage * this.dataLimit >= countData) {
      console.log('masuk sini');
      console.log(`${currentPage * this.dataLimit} >= ${countData}`);
      event?.target?.complete();
      return;
    }

    if (this.tab == 'usage') {
      this.currentPageUsage++;
    } else if (this.tab == 'income') {
      this.currentPageIncome++;
    } else {
      this.alertService.show('Debug', 'Tab tidak valid');
    }

    let uri = `list/fuel-${this.tab}s`;
    let params = {
      order: 'created_at',
      sort: 'desc',
      limit: this.dataLimit,
      offset: currentPage*this.dataLimit,
    };
    this.restService.getting(uri, params).then((res) => {
      if (isFirstLoad) {
        if (this.tab == 'usage') {
          this.dataUsage = res.data.data;
          this.countDataUsage = res.data.record;

          /** Reset data income */
          this.dataIncome = [];
        } else if (this.tab == 'income') {
          this.dataIncome = res.data.data;
          this.countDataIncome = res.data.record;

          /** Reset data usage */
          this.dataUsage = [];
        }
        this.myContent.scrollToTop(400);
      } else {
        if (this.tab == 'usage') {
          let data = this.dataUsage.concat(res.data.data);
          this.dataUsage = data;
          this.countDataUsage = res.data.record;

          /** Reset data income */
          this.dataIncome = [];
        } else if (this.tab == 'income') {
          let data = this.dataIncome.concat(res.data.data);
          this.dataIncome = data;
          this.countDataIncome = res.data.record;

          /** Reset data usage */
          this.dataUsage = [];
        }
      }

      // if (this.tab == 'usage') {
      //   let data = this.dataUsage.concat(res.data.data);
      //   this.dataUsage = data;

      //   this.countDataUsage = res.data.record;
      // } else if (this.tab == 'income') {
      //   let data = this.dataIncome.concat(res.data.data);
      //   this.dataIncome = data;

      //   this.countDataIncome = res.data.record;
      // }

      if (isFirstLoad == false) {
        event?.target?.complete();
      }

      if (eventPullRefresh) {
        eventPullRefresh.target.complete();
      }

      console.log(this.dataIncome);
    });
  }

  statusColor(status_code) {
    switch (status_code) {
      case 'PENDING':
        return 'danger';
        break;
      case 'PROGRESS':
        return 'warning';
        break;
      case 'SUCCESS':
        return 'success';
        break;

      default:
        return 'warning';
        break;
    }
  }

  go(to) {
    this.navCtrl.navigateForward(to);
    // this.navCtrl.nai
  }
}
