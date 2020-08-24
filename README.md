<p align="center">
<img width="100px" height="100px" alt="Reactive css logo" src="docs/assets/vue-reactive-css-logo.svg"/>
<h1 align="center">Vue Reactive CSS Properties</h1>
<p>Vue flavour of <a href="https://github.com/adam-cyclones/reactive-css-properties">Reactive CSS Properties</a> - A tiny library to supercharge your styling workflow. With Reactive CSS Properties (re.css) you can set css custom properties and react to changes in realtime from JavaScript</p>
</p>

##Experimental
The Plugin is functional but no release exists yet, or instructions or tests. check back in soon.

Design notes
``` Vue
<!-- declare a prop -->
<script>
{
    props: {
        themeTextColor: {
          type: CSSProp,
          validator: CSSProp.validator,
          default: () => new CSSProp()
        }
    }
}
</script>

<!-- update a property -->
<script>
{
    methods: {
        handleColorChange(e) {
          const value = e.target.value;
          this.themeTextColor(value);
        },
        handleClick() {
          this.themeTextColor("blue");
        }
    }
}
</script>

<!-- watch css property in realtime -->
<script>
{
    watch: {
        themeTextColor(color, oldValue) {
            console.log("change", color, "was", oldValue);
            this.msg = `Hello Reactive CSS!, the color is now ${color}`;
        }
    }
}
</script>
```
