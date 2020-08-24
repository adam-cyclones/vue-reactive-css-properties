import ReactiveCSSProperties from "reactive-css-properties";
import { CSSProp } from "./wrapper";

const VueReactiveCSSProperties = {
  install(Vue: any) {
    Vue.mixin({
      created() {
        const $vm = this;
        if ($vm.$props) {
          const cssProps = ReactiveCSSProperties($vm.$el);

          for (const [key, cssPropInstWrapper] of Object.entries($vm.$props)) {
            if (cssPropInstWrapper instanceof CSSProp) {
              cssPropInstWrapper.commitKey(key);

              const factory = cssProps[key];

              cssPropInstWrapper.commitFactory(factory);

              const findWatcher = this._watchers.find((watcher: any) =>
                watcher.expression.includes(key)
              );
              factory.subscribe(({ value, oldValue }) => {
                cssPropInstWrapper.externalSetValue(value);
                if (findWatcher) {
                  findWatcher.cb.bind($vm)(value, oldValue);
                }
              });
            }
          }
        }
      }
    });
  }
};

export default VueReactiveCSSProperties;

// @ts-ignore
if (typeof window !== "undefined" && window.Vue) {
  // @ts-ignore
  window.Vue.use(VueReactiveCSSProperties);
}

export { CSSProp } from "./wrapper";
