// import classnames from 'classnames';
// import Animate from 'rc-animate';
// import createChainedFunction from 'rc-util/lib/createChainedFunction';
// import Vue from 'vue';
// import Component from 'vue-class-component';
// import {Prop} from 'vue-property-decorator';
// import Notice from './notice';
//
// let seed = 0;
// const now = Date.now();
//
// function getUuid() {
//   return `rcNotification_${now}_${seed++}`;
// }
//
// @Component({
//   name: 'Notification'
// })
// class Index extends Vue {
//
//   @Prop({type: String})
//   public prefixCls: string;
//   @Prop({type: String})
//   public transitionName: string;
//   @Prop({type: [String, Object]})
//   public animation: string | object;
//   public notices = [];
//   public static newInstance: (properties, callback) => void;
//
//   public getTransitionName() {
//     let transitionName = this.transitionName;
//     if (!transitionName && this.animation) {
//       transitionName = `${this.prefixCls}-${this.animation}`;
//     }
//     return transitionName;
//   }
//
//   public add(notice) {
//     const key = notice.key = notice.key || getUuid();
//     if (!this.notices.some(it => it.key === key)) {
//       this.notices.push(notice);
//     }
//   }
//
//   public remove(key) {
//     this.notices = this.notices.filter(it => it.key !== key);
//   }
//
//   public render() {
//     const noticeNodes = this.notices.map((notice) => {
//       const onClose = createChainedFunction(this.remove.bind(this).bind(this, notice.key), notice.onClose);
//       return (<Notice
//         prefixCls={this.prefixCls}
//         {...notice}
//         onClose={onClose}
//       >
//         {notice.content}
//       </Notice>);
//     });
//     const className = {
//       [this.prefixCls]: 1
//     };
//     return (
//       <div class={classnames(className)}>
//         <Animate transitionName={this.getTransitionName()}>{noticeNodes}</Animate>
//       </div>
//     );
//   }
// }
//
// Index.newInstance = function newNotificationInstance(properties, callback) {
//   const {getContainer, ...props} = properties || {} as any;
//   let div;
//   if (getContainer) {
//     div = getContainer();
//   } else {
//     div = document.createElement('div');
//     document.body.appendChild(div);
//   }
//   let called = false;
//
//   function ref(notification) {
//     if (called) {
//       return;
//     }
//     called = true;
//     callback({
//       notice(noticeProps) {
//         notification.add(noticeProps);
//       },
//       removeNotice(key) {
//         notification.remove(key);
//       },
//       component: notification,
//       destroy() {
//         div.$destroy && div.$destroy();
//         if (!getContainer) {
//           document.body.removeChild(div);
//         }
//       }
//     });
//   }
//
//   new Vue({
//     el: div,
//     render(h: any) {
//       return <Index {...props}/>
//     },
//     mounted() {
//       ref(this)
//     }
//   } as any);
// };
//
// export default Index;