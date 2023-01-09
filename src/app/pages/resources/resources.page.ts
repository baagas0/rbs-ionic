import { Location } from '@angular/common';
import { Component, Inject, LOCALE_ID, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IonContent } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { StorageService } from 'src/app/services/storage.service';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-resources',
  templateUrl: 'resources.page.html',
  styleUrls: ['resources.page.scss'],
})
export class Resources {
  @ViewChild(IonContent, { read: IonContent }) myContent: IonContent;
  @ViewChild('resourceSlider') resourceSlider;

  tab: string = 'equipment';

  dataEquipment: any = [];
  dataDriver: any = [];
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
    private storageService: StorageService
  ) {}

  ngAfterViewInit() {
    // this.resourceSlider.autoHeight = true;
  }

  // async ngOnInit() {
  async ionViewDidEnter() {
    let tabActive = await this.storageService.get('tab-resource');
    if (tabActive) {
      this.selectTab(tabActive);
    }
    this.getData();
  }

  onSlide(event) {
    this.resourceSlider.getActiveIndex().then(async (index) => {
      let realIndex = index;
      console.log(index);
      if (index == 0) {
        await this.selectTab('equipment', false);
      } else if (index == 1) {
        await this.selectTab('driver', false);
      }
      // this.resourceSlider.updateAutoHeight(400);
    });
  }

  handleRefresh(event) {
    this.getData(event);
  }

  getData(eventPullRefresh = null) {
    if (this.tab == 'equipment') {
      let uri = 'list/equipments';

      this.restService.getting(uri, {}).then((res) => {
        this.dataEquipment = res.data;
        console.log(this.dataEquipment);


        if (eventPullRefresh) {
          eventPullRefresh.target.complete();
        }
        // this.resourceSlider.updateAutoHeight(400);
      });
    } else if (this.tab == 'driver') {
      let uri = 'list/drivers';

      this.restService.getting(uri, {}).then((res) => {
        this.dataDriver = res.data;

        if (eventPullRefresh) {
          eventPullRefresh.target.complete();
        }
        // this.resourceSlider.updateAutoHeight(400);
      });
    }

    // this.resourceSlider.updateAutoHeight(400);
  }

  async selectTab(tab, updateSlider = true) {
    console.log(tab + ' as');
    this.tab = tab;
    if (updateSlider) {
    if (tab == 'equipment') {
      this.resourceSlider.slideTo(0);
    } else if (tab == 'driver') {
      this.resourceSlider.slideTo(1);
    }
  }else {
    this.myContent.scrollToTop(400);
  }

    await this.storageService.set('tab-resource', tab);
    this.getData();
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
    this.location.go(to);
  }
}
