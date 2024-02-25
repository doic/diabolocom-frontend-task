# Using the components

You can use the components differents ways:

## 1. Vue CounterComponent

This is a wrapper component, allowing passing the props only once.

```vue
<script setup lang="ts">
import CounterComponent from './components/CounterComponent.ce.vue'
</script>
<template>
<CounterComponent counterid="1" min="-100" max="100" value="30" lg="fr" color="primary" />
    </div>
  </div>
</template>
```

## 2. Vue Components

You can also use the 4 Vue components directly. In the example below, we don't pass any props, so everything is set to default values.

```vue
<script setup lang="ts">
import CounterComponent from './components/CounterComponent.ce.vue'
</script>
<template>
  <CounterDisplay />
  <CounterButtons />
  <CounterReset />
  <LocaleSwitcher />
</template>
```

## 3. Web Components Wrapper

After you built the web components (`dist-wc` directory), you can use them in an HTML page. The wrapper is `dbl-counter`:

```html
<html>
  <head>
    <script type="module" crossorigin src="/index.js"></script>
    <link rel="modulepreload" crossorigin href="/main.js" />
    <link rel="stylesheet" crossorigin href="/style.css" />
  </head>

  <body>
    <dbl-counter
      counterid="1"
      min="-100"
      max="100"
      value="30"
      lg="fr"
      color="secondary"
    ></dbl-counter>
  </body>
</html>
```

## 4. Web Components Wrapper

```html
<html>
  <head>
    <script type="module" crossorigin src="/index.js"></script>
    <link rel="modulepreload" crossorigin href="/main.js" />
    <link rel="stylesheet" crossorigin href="/style.css" />
  </head>

  <body>
    <dbl-display></dbl-display>
    <dbl-buttons></dbl-buttons>
    <dbl-reset></dbl-reset>
    <dbl-locale></dbl-locale>
  </body>
</html>
```
