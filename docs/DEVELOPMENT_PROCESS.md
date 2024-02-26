# Development Process

I started developing `CounterButtons` and `CounterDisplay` components with Vue3 and TailwindCSS, testing them with Vitest (see Tests in the [README file](README.md)).

Since each 'group' of components is supposed to be independent from the other one(s), I created a simple store to allow:

- each component to communicate together
- each 'group' of component to use a different store

I decided not to use Pinia or VueX to get lighter web components later.

Once the basic logic for these 2 components was working, I added the `CounterReset` component, and started working on the `LocaleSwitcher`.

Again, to avoid more dependencies, I created a simple [`translations`](src/lib/translations.ts) object. For more complex projects (with more strings to translate, more languages, right to left, SSR, etc...) the use of a dedicated i18n package would be smarter.

As the 4 components were working, I realized a few things could be improved or added to them:

- optional limits to the Counter: we could limit the range of the Counter in the logic, and disable the +/- buttons when one of the limits has been reached.
- disabled `CounterReset` button when value is already 0.
- graphic representation of the value when the Counter has min and max limits.
- ability to long click (long touch on touch screens) to increase or decrease the counter.
- create a main component that wraps the 4 required ones. Although the 4 components can be used directly, having a main component makes it easier to use (both in Vue Components and Web Components cases)

The graphic representation is generated with a simple svg element. No extra library involved, to limit the web components weight.

# Web Components Development

Less familiar with web components, I had to see different ways to build the components, integrate them in an html page directly from the build commands.

I created a different [Vite config file](vite.wc.config.ts) and specific build commands.

TailwindCSS had to be built apart to be injected in each component (web components are using [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM) not allowing them to access the main DOM styles).

Vue has an easy way of inlining css into web components, we just need to rename each target component to `ComponentName.ce.vue`.

# Tests

After setting up unit tests with [Vitest](https://vitest.dev/), and E2E with [Playwright](https://playwright.dev), I added [Axe](https://github.com/dequelabs/axe-core) to the unit tests to enforce accessibility.
