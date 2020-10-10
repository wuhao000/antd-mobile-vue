import {inject, provide, ref, Ref, reactive, nextTick, PropType, defineComponent} from 'vue';
import Vue from 'vue';
import Component from 'vue-class-component';
import './demo1.less';

export default defineComponent({
  name: 'TabBarExample',
  props: {},
  setup(props, {emit, slots}) {
    const state = reactive({
      selectedTab: 0,
      hidden: false,
      fullScreen: false
    });


    const renderContent = (pageText) => {
      return (
        <div style={{backgroundColor: 'white', height: '100%', textAlign: 'center'}}>
          <div style={{paddingTop: '60px'}}>Clicked “{pageText}” tab， show “{pageText}” information</div>
          <a style={{display: 'block', marginTop: '40px', marginBottom: '20px', color: '#108ee9'}}
             onClick={(e) => {
               e.preventDefault();
               state.hidden = !state.hidden;
             }}
          >
            Click to show/hide tab-bar
          </a>
          <a style={{display: 'block', marginBottom: '600px', color: '#108ee9'}}
             onClick={(e) => {
               e.preventDefault();
               state.fullScreen = !state.fullScreen;
             }}>
            Click to switch fullscreen
          </a>
        </div>
      );
    }


    return {
      state,
      renderContent
    };
  },
  render() {
    return (
      <div
        style={this.state.fullScreen ? {position: 'fixed', height: '100%', width: '100%', top: 0} : {height: '400px'}}>
        <m-tab-bar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          tabBarPosition="top"
          vModel={this.state.selectedTab}
          barTintColor="white"
          hidden={this.state.hidden}>
          <m-tab-bar-item
            title="Life"
            key="Life"
            icon={<div style={{
              width: '22px',
              height: '22px',
              background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat'
            }}
            />
            }
            selectedIcon={<div style={{
              width: '22px',
              height: '22px',
              background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat'
            }}
            />
            }
            badge={1}
          >
            {this.renderContent('Life')}
          </m-tab-bar-item>
          <m-tab-bar-item
            icon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat'
              }}
              />
            }
            selectedIcon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat'
              }}
              />
            }
            title="Koubei"
            key="Koubei"
            badge={'new'}
          >
            {this.renderContent('Koubei')}
          </m-tab-bar-item>
          <m-tab-bar-item
            icon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat'
              }}
              />
            }
            selectedIcon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat'
              }}
              />
            }
            title="Friend"
            key="Friend"
            dot={true}
          >
            {this.renderContent('Friend')}
          </m-tab-bar-item>
          <m-tab-bar-item
            icon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg) center center /  21px 21px no-repeat'
              }}/>
            }
            selectedIcon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg) center center /  21px 21px no-repeat'
              }}/>
            }
            title="My"
            key="my"
          >
            {this.renderContent('My')}
          </m-tab-bar-item>
        </m-tab-bar>
      </div>
    );
  }
})
