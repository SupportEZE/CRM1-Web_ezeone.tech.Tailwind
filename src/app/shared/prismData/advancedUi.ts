export let accordionTS1 = 
` <div class="hs-accordion-group">
<div class="hs-accordion accordion-item overflow-hidden !border-b-0" id="hs-basic-heading-one">
  <button class="hs-accordion-toggle accordion-button hs-accordion-active:text-primary hs-accordion-active:pb-3 group py-0 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-primary dark:text-gray-200 dark:hover:text-white/80"
    aria-controls="hs-basic-collapse-one" type="button">
    Accordion #1
  </button>

  <div id="hs-basic-collapse-one"
    class="hs-accordion-content w-full overflow-hidden hidden transition-[height] duration-300"
    aria-labelledby="hs-basic-heading-one">
    <div class="accordion-body">
        <strong>This is the first item's accordion body.</strong> It is shown by
        default, until the collapse plugin adds the appropriate classes that we
        use
        to
        style each element. These classes control the overall appearance, as
        well as
        the
        showing and hiding via CSS transitions. You can modify any of this with
        custom
        CSS or overriding our default variables. It's also worth noting that
        just
        about
        any HTML can go within the <code>.accordion-body</code>, though the
        transition
        does limit overflow.
    </div>
  </div>
</div>

<div class="hs-accordion accordion-item !border-b-0" id="hs-basic-heading-two">
  <button
    class="hs-accordion-toggle accordion-button hs-accordion-active:text-primary hs-accordion-active:pb-3 group pb-0 pt-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-primary dark:text-gray-200 dark:hover:text-white/80"
    aria-controls="hs-basic-collapse-two" type="button">
    Accordion #2
  </button>
  <div id="hs-basic-collapse-two"
    class="hs-accordion-content hidden overflow-hidden w-full transition-[height] duration-300"
    aria-labelledby="hs-basic-heading-two">
    <div class="accordion-body">
        <strong>This is the second item's accordion body.</strong> It is shown by
        default, until the collapse plugin adds the appropriate classes that we
        use
        to
        style each element. These classes control the overall appearance, as
        well as
        the
        showing and hiding via CSS transitions. You can modify any of this with
        custom
        CSS or overriding our default variables. It's also worth noting that
        just
        about
        any HTML can go within the <code>.accordion-body</code>, though the
        transition
        does limit overflow.
    </div>
  </div>
</div>

<div class="hs-accordion accordion-item overflow-hidden" id="hs-basic-heading-three">
  <button
    class="hs-accordion-toggle accordion-button hs-accordion-active:text-primary hs-accordion-active:pb-3 group pb-0 pt-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-primary dark:text-gray-200 dark:hover:text-white/80"
    aria-controls="hs-basic-collapse-three" type="button">
    Accordion #3
  </button>
  <div id="hs-basic-collapse-three"
    class="hs-accordion-content  overflow-hidden  w-full hidden transition-[height] duration-300"
    aria-labelledby="hs-basic-heading-three">
    <div class="accordion-body">
        <strong>This is the third item's accordion body.</strong> It is shown by
        default, until the collapse plugin adds the appropriate classes that we
        use
        to
        style each element. These classes control the overall appearance, as
        well as
        the
        showing and hiding via CSS transitions. You can modify any of this with
        custom
        CSS or overriding our default variables. It's also worth noting that
        just
        about
        any HTML can go within the <code>.accordion-body</code>, though the
        transition
        does limit overflow.
    </div>
  </div>
</div>
</div>`
export let accordionTS2 = 
` <div class="hs-accordion-group">
<div class="hs-accordion accordion-item  overflow-hidden !border-b-0" id="hs-basic-with-arrow-heading-one">
  <button
    class="hs-accordion-toggle accordion-button hs-accordion-active:text-primary hs-accordion-active:pb-3 group py-0 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-primary dark:text-gray-200 dark:hover:text-white/80"
    aria-controls="hs-basic-with-arrow-collapse-one" type="button">
    <svg
      class="hs-accordion-active:hidden hs-accordion-active:text-primary hs-accordion-active:group-hover:text-primary block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
      width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
    <svg
      class="hs-accordion-active:block hs-accordion-active:text-primary hs-accordion-active:group-hover:text-primary hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
      width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
    Accordion #1
  </button>
  <div id="hs-basic-with-arrow-collapse-one"
    class="hs-accordion-content w-full hidden overflow-hidden transition-[height] duration-300"
    aria-labelledby="hs-basic-with-arrow-heading-one">
    <div class="accordion-body">
        <strong>This is the first item's accordion body.</strong> It is shown by
        default, until the collapse plugin adds the appropriate classes that we
        use
        to
        style each element. These classes control the overall appearance, as
        well as
        the
        showing and hiding via CSS transitions. You can modify any of this with
        custom
        CSS or overriding our default variables. It's also worth noting that
        just
        about
        any HTML can go within the <code>.accordion-body</code>, though the
        transition
        does limit overflow.
    </div>
  </div>
</div>
<div class="hs-accordion accordion-item !border-b-0" id="hs-basic-with-arrow-heading-two">
  <button
    class="hs-accordion-toggle accordion-button hs-accordion-active:text-primary hs-accordion-active:pb-3 group pb-0 pt-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-primary dark:text-gray-200 dark:hover:text-white/80"
    aria-controls="hs-basic-with-arrow-collapse-two" type="button">
    <svg
      class="hs-accordion-active:hidden hs-accordion-active:text-primary hs-accordion-active:group-hover:text-primary block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
      width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
    <svg
      class="hs-accordion-active:block hs-accordion-active:text-primary hs-accordion-active:group-hover:text-primary hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
      width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
    Accordion #2
  </button>
  <div id="hs-basic-with-arrow-collapse-two"
    class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
    aria-labelledby="hs-basic-with-arrow-heading-two">
    <div class="accordion-body">
        <strong>This is the first item's accordion body.</strong> It is shown by
        default, until the collapse plugin adds the appropriate classes that we
        use
        to
        style each element. These classes control the overall appearance, as
        well as
        the
        showing and hiding via CSS transitions. You can modify any of this with
        custom
        CSS or overriding our default variables. It's also worth noting that
        just
        about
        any HTML can go within the <code>.accordion-body</code>, though the
        transition
        does limit overflow.
    </div>
  </div>
</div>
<div class="hs-accordion accordion-item  overflow-hidden" id="hs-basic-with-arrow-heading-three">
  <button
    class="hs-accordion-toggle accordion-button hs-accordion-active:text-primary hs-accordion-active:pb-3 group pb-0 pt-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-primary dark:text-gray-200 dark:hover:text-white/80"
    aria-controls="hs-basic-with-arrow-collapse-three" type="button">
    <svg
      class="hs-accordion-active:hidden hs-accordion-active:text-primary hs-accordion-active:group-hover:text-primary block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
      width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
    <svg
      class="hs-accordion-active:block hs-accordion-active:text-primary hs-accordion-active:group-hover:text-primary hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
      width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
    Accordion #3
  </button>
  <div id="hs-basic-with-arrow-collapse-three"
    class="hs-accordion-content hidden overflow-hidden w-full transition-[height] duration-300"
    aria-labelledby="hs-basic-with-arrow-heading-three">
    <div class="accordion-body">
        <strong>This is the third item's accordion body.</strong> It is hidden
        by
        default, until the collapse plugin adds the appropriate classes that we
        use
        to
        style each element. These classes control the overall appearance, as
        well as
        the
        showing and hiding via CSS transitions. You can modify any of this with
        custom
        CSS or overriding our default variables. It's also worth noting that
        just
        about
        any HTML can go within the <code>.accordion-body</code>, though the
        transition
        does limit overflow.
    </div>
  </div>
</div>
</div>`
export let accordionTS3 = 
`<div class="hs-accordion-group">
<div class="hs-accordion accordion-item  overflow-hidden !border-b-0" id="hs-basic-with-title-and-arrow-stretched-heading-one">
  <button
    class="hs-accordion-toggle accordion-button hs-accordion-active:text-primary hs-accordion-active:pb-3 group py-0 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-primary dark:text-gray-200 dark:hover:text-white/80"
    aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-one" type="button">
    Accordion #1
    <svg
      class="hs-accordion-active:hidden hs-accordion-active:text-primary hs-accordion-active:group-hover:text-primary block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
      width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
    <svg
      class="hs-accordion-active:block hs-accordion-active:text-primary hs-accordion-active:group-hover:text-primary hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
      width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
  </button>
  <div id="hs-basic-with-title-and-arrow-stretched-collapse-one"
    class="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
    aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-one">
    <p class="text-gray-800 !py-3 !px-4 dark:text-gray-200">
      <em>This is the third item's accordion body.</em> It is hidden by default, until the collapse
      plugin adds the appropriate classes that we use to style each element. These classes control the
      overall appearance, as well as the showing and hiding via CSS transitions.
    </p>
  </div>
</div>
<div class="hs-accordion accordion-item !border-b-0" id="hs-basic-with-title-and-arrow-stretched-heading-two">
  <button
    class="hs-accordion-toggle accordion-button hs-accordion-active:text-primary hs-accordion-active:pb-3 group pb-0 pt-3 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-primary dark:text-gray-200 dark:hover:text-white/80"
    aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-two" type="button">
    Accordion #2
    <svg
      class="hs-accordion-active:hidden hs-accordion-active:text-primary hs-accordion-active:group-hover:text-primary block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
      width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
    <svg
      class="hs-accordion-active:block hs-accordion-active:text-primary hs-accordion-active:group-hover:text-primary hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
      width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
  </button>
  <div id="hs-basic-with-title-and-arrow-stretched-collapse-two"
    class="hs-accordion-content accordion-body hidden w-full overflow-hidden transition-[height] duration-300"
    aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-two">
    <p class="text-gray-800 dark:text-gray-200">
      <em>This is the third item's accordion body.</em> It is hidden by default, until the collapse
      plugin adds the appropriate classes that we use to style each element. These classes control the
      overall appearance, as well as the showing and hiding via CSS transitions.
    </p>
  </div>
</div>
<div class="hs-accordion accordion-item  overflow-hidden" id="hs-basic-with-title-and-arrow-stretched-heading-three">
  <button
    class="hs-accordion-toggle accordion-button hs-accordion-active:text-primary hs-accordion-active:pb-3 group pb-0 pt-3 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-primary dark:text-gray-200 dark:hover:text-white/80"
    aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-three" type="button">
    Accordion #3
    <svg
      class="hs-accordion-active:hidden hs-accordion-active:text-primary hs-accordion-active:group-hover:text-primary block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
      width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
    <svg
      class="hs-accordion-active:block hs-accordion-active:text-primary hs-accordion-active:group-hover:text-primary hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
      width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
  </button>
  <div id="hs-basic-with-title-and-arrow-stretched-collapse-three"
    class="hs-accordion-content accordion-body hidden w-full overflow-hidden transition-[height] duration-300"
    aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-three">
    <p class="text-gray-800 dark:text-gray-200">
      <em>This is the third item's accordion body.</em> It is hidden by default, until the collapse
      plugin adds the appropriate classes that we use to style each element. These classes control the
      overall appearance, as well as the showing and hiding via CSS transitions.
    </p>
  </div>
</div>
</div>`
export let accordionTS4 =
`      <div class="hs-accordion-group">
<div class="hs-accordion active overflow-hidden bg-white dark:bg-bodybg border -mt-px first:rounded-t-sm last:rounded-b-sm dark:bg-bgdark dark:border-white/10" id="hs-accordion-heading-1">
  <button
    class="hs-accordion-toggle hs-accordion-active:text-primary hs-accordion-active:bg-primary/10 group py-4 px-5 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-primary dark:text-gray-200 dark:hover:text-white/80"
    aria-controls="hs-accordion-collapse-1" type="button">
    Accordion #1
    <svg
      class="hs-accordion-active:hidden hs-accordion-active:text-primary hs-accordion-active:group-hover:text-primary block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
      width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
    <svg
      class="hs-accordion-active:block hs-accordion-active:text-primary hs-accordion-active:group-hover:text-primary hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
      width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
  </button>
  <div id="hs-accordion-collapse-1"
    class="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
    aria-labelledby="hs-accordion-heading-1">
    <p class="text-gray-800 dark:text-gray-200 py-4 px-5">
      <em>This is the third item's accordion body.</em> It is hidden by default, until the collapse
      plugin adds the appropriate classes that we use to style each element. These classes control the
      overall appearance, as well as the showing and hiding via CSS transitions.
    </p>
  </div>
</div>
<div class="hs-accordion overflow-hidden bg-white dark:bg-bodybg border -mt-px first:rounded-t-sm last:rounded-b-sm dark:bg-bgdark dark:border-white/10" id="hs-accordion-heading-2">
  <button
    class="hs-accordion-toggle hs-accordion-active:text-primary hs-accordion-active:bg-primary/10 group py-4 px-5 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-primary dark:text-gray-200 dark:hover:text-white/80"
    aria-controls="hs-accordion-collapse-2" type="button">
    Accordion #2
    <svg
      class="hs-accordion-active:hidden hs-accordion-active:text-primary hs-accordion-active:group-hover:text-primary block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
      width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
    <svg
      class="hs-accordion-active:block hs-accordion-active:text-primary hs-accordion-active:group-hover:text-primary hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
      width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
  </button>
  <div id="hs-accordion-collapse-2"
    class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
    aria-labelledby="hs-accordion-heading-2">
    <p class="text-gray-800 dark:text-gray-200 py-4 px-5">
      <em>This is the third item's accordion body.</em> It is hidden by default, until the collapse
      plugin adds the appropriate classes that we use to style each element. These classes control the
      overall appearance, as well as the showing and hiding via CSS transitions.
    </p>
  </div>
</div>
<div class="hs-accordion overflow-hidden bg-white dark:bg-bodybg border -mt-px first:rounded-t-sm last:rounded-b-sm dark:bg-bgdark dark:border-white/10" id="hs-accordion-heading-3">
  <button
    class="hs-accordion-toggle hs-accordion-active:text-primary hs-accordion-active:bg-primary/10 group py-4 px-5 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-primary dark:text-gray-200 dark:hover:text-white/80"
    aria-controls="hs-accordion-collapse-3" type="button">
    Accordion #3
    <svg
      class="hs-accordion-active:hidden hs-accordion-active:text-primary hs-accordion-active:group-hover:text-primary block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
      width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
    <svg
      class="hs-accordion-active:block hs-accordion-active:text-primary hs-accordion-active:group-hover:text-primary hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
      width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
  </button>
  <div id="hs-accordion-collapse-3"
    class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
    aria-labelledby="hs-accordion-heading-3">
    <p class="text-gray-800 dark:text-gray-200 py-4 px-5">
      <em>This is the third item's accordion body.</em> It is hidden by default, until the collapse
      plugin adds the appropriate classes that we use to style each element. These classes control the
      overall appearance, as well as the showing and hiding via CSS transitions.
    </p>
  </div>
</div>
</div>
`
export let accordionTS5 =
` <div class="hs-accordion-group">
<div class="hs-accordion active overflow-hidden bg-white dark:bg-bodybg border -mt-px first:rounded-t-sm last:rounded-b-sm dark:bg-bgdark dark:border-white/10" id="hs-accordion-heading-1-primary">
  <button
    class="hs-accordion-toggle hs-accordion-active:text-secondary hs-accordion-active:bg-secondary/10 group py-4 px-5 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-secondary dark:text-gray-200 dark:hover:text-white/80"
    aria-controls="hs-accordion-collapse-1-primary" type="button">
    Accordion #1
    <svg
      class="hs-accordion-active:hidden hs-accordion-active:text-secondary hs-accordion-active:group-hover:text-secondary block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
      width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
    <svg
      class="hs-accordion-active:block hs-accordion-active:text-secondary hs-accordion-active:group-hover:text-secondary hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
      width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
  </button>
  <div id="hs-accordion-collapse-1-primary"
    class="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
    aria-labelledby="hs-accordion-heading-1-primary">
    <p class="text-gray-800 dark:text-gray-200 py-4 px-5">
      <em>This is the third item's accordion body.</em> It is hidden by default, until the collapse
      plugin adds the appropriate classes that we use to style each element. These classes control the
      overall appearance, as well as the showing and hiding via CSS transitions.
    </p>
  </div>
</div>
<div class="hs-accordion overflow-hidden bg-white dark:bg-bodybg border -mt-px first:rounded-t-sm last:rounded-b-sm dark:bg-bgdark dark:border-white/10" id="hs-accordion-heading-2-primary">
  <button
  class="hs-accordion-toggle hs-accordion-active:text-secondary hs-accordion-active:bg-secondary/10 group py-4 px-5 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-secondary dark:text-gray-200 dark:hover:text-white/80"
  aria-controls="hs-accordion-collapse-1-primary" type="button">
  Accordion #2
  <svg
    class="hs-accordion-active:hidden hs-accordion-active:text-secondary hs-accordion-active:group-hover:text-secondary block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
    width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
      stroke="currentColor" stroke-width="2" stroke-linecap="round" />
  </svg>
  <svg
    class="hs-accordion-active:block hs-accordion-active:text-secondary hs-accordion-active:group-hover:text-secondary hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
    width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
      stroke="currentColor" stroke-width="2" stroke-linecap="round" />
  </svg>
</button>
  <div id="hs-accordion-collapse-2-primary"
    class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
    aria-labelledby="hs-accordion-heading-2-primary">
    <p class="text-gray-800 dark:text-gray-200 py-4 px-5">
      <em>This is the third item's accordion body.</em> It is hidden by default, until the collapse
      plugin adds the appropriate classes that we use to style each element. These classes control the
      overall appearance, as well as the showing and hiding via CSS transitions.
    </p>
  </div>
</div>
<div class="hs-accordion overflow-hidden bg-white dark:bg-bodybg border -mt-px first:rounded-t-sm last:rounded-b-sm dark:bg-bgdark dark:border-white/10" id="hs-accordion-heading-3-primary">
  <button
    class="hs-accordion-toggle hs-accordion-active:text-secondary hs-accordion-active:bg-secondary/10 group py-4 px-5 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-secondary dark:text-gray-200 dark:hover:text-white/80"
    aria-controls="hs-accordion-collapse-1-primary" type="button">
    Accordion #3
    <svg
      class="hs-accordion-active:hidden hs-accordion-active:text-secondary hs-accordion-active:group-hover:text-secondary block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
      width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
    <svg
      class="hs-accordion-active:block hs-accordion-active:text-secondary hs-accordion-active:group-hover:text-secondary hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
      width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
  </button>
  <div id="hs-accordion-collapse-3-primary"
    class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
    aria-labelledby="hs-accordion-heading-3-primary">
    <p class="text-gray-800 dark:text-gray-200 py-4 px-5">
      <em>This is the third item's accordion body.</em> It is hidden by default, until the collapse
      plugin adds the appropriate classes that we use to style each element. These classes control the
      overall appearance, as well as the showing and hiding via CSS transitions.
    </p>
  </div>
</div>
</div>`
export let accordionTS6 =
`    <div class="hs-accordion-group">
<div class="hs-accordion active overflow-hidden bg-white dark:bg-bodybg border -mt-px first:rounded-t-sm last:rounded-b-sm dark:bg-bgdark dark:border-white/10" id="hs-primary-heading-1">
  <button
    class="hs-accordion-toggle hs-accordion-active:text-white hs-accordion-active:bg-primary group py-4 px-5 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-white dark:text-gray-200 dark:hover:text-white/80"
    aria-controls="hs-primary-collapse-1" type="button">
    Accordion #1
    <svg
      class="hs-accordion-active:hidden hs-accordion-active:text-white hs-accordion-active:group-hover:text-white block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
      width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
    <svg
      class="hs-accordion-active:block hs-accordion-active:text-white hs-accordion-active:group-hover:text-white hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
      width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
  </button>
  <div id="hs-primary-collapse-1"
    class="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
    aria-labelledby="hs-primary-heading-1">
    <p class="text-gray-800 dark:text-gray-200 py-4 px-5">
      <em>This is the third item's accordion body.</em> It is hidden by default, until the collapse
      plugin adds the appropriate classes that we use to style each element. These classes control the
      overall appearance, as well as the showing and hiding via CSS transitions.
    </p>
  </div>
</div>
<div class="hs-accordion overflow-hidden bg-white dark:bg-bodybg border -mt-px first:rounded-t-sm last:rounded-b-sm dark:bg-bgdark dark:border-white/10" id="hs-primary-heading-2">
  <button
    class="hs-accordion-toggle hs-accordion-active:text-white hs-accordion-active:bg-primary group py-4 px-5 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-white dark:text-gray-200 dark:hover:text-white/80"
    aria-controls="hs-primary-collapse-2" type="button">
    Accordion #2
    <svg
      class="hs-accordion-active:hidden hs-accordion-active:text-white hs-accordion-active:group-hover:text-white block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
      width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
    <svg
      class="hs-accordion-active:block hs-accordion-active:text-white hs-accordion-active:group-hover:text-white hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
      width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
  </button>
  <div id="hs-primary-collapse-2"
    class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
    aria-labelledby="hs-primary-heading-2">
    <p class="text-gray-800 dark:text-gray-200 py-4 px-5">
      <em>This is the third item's accordion body.</em> It is hidden by default, until the collapse
      plugin adds the appropriate classes that we use to style each element. These classes control the
      overall appearance, as well as the showing and hiding via CSS transitions.
    </p>
  </div>
</div>
<div class="hs-accordion overflow-hidden bg-white dark:bg-bodybg border -mt-px first:rounded-t-sm last:rounded-b-sm dark:bg-bgdark dark:border-white/10" id="hs-primary-heading-3">
  <button
    class="hs-accordion-toggle hs-accordion-active:text-white hs-accordion-active:bg-primary group py-4 px-5 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-white dark:text-gray-200 dark:hover:text-white/80"
    aria-controls="hs-primary-collapse-3" type="button">
    Accordion #3
    <svg
      class="hs-accordion-active:hidden hs-accordion-active:text-white hs-accordion-active:group-hover:text-white block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
      width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
    <svg
      class="hs-accordion-active:block hs-accordion-active:text-white hs-accordion-active:group-hover:text-white hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
      width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
  </button>
  <div id="hs-primary-collapse-3"
    class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
    aria-labelledby="hs-primary-heading-3">
    <p class="text-gray-800 dark:text-gray-200 py-4 px-5">
      <em>This is the third item's accordion body.</em> It is hidden by default, until the collapse
      plugin adds the appropriate classes that we use to style each element. These classes control the
      overall appearance, as well as the showing and hiding via CSS transitions.
    </p>
  </div>
</div>
</div>`
export let accordionTS7 =
`  <div class="hs-accordion-group">
<div class="hs-accordion active overflow-hidden bg-white dark:bg-bodybg border -mt-px first:rounded-t-sm last:rounded-b-sm dark:bg-bgdark dark:border-white/10" id="hs-secondary-heading-1">
  <button
    class="hs-accordion-toggle hs-accordion-active:text-white hs-accordion-active:bg-secondary group py-4 px-5 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-white dark:text-gray-200 dark:hover:text-white/80"
    aria-controls="hs-secondary-collapse-1" type="button">
    Accordion #1
    <svg
      class="hs-accordion-active:hidden hs-accordion-active:text-white hs-accordion-active:group-hover:text-white block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
      width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
    <svg
      class="hs-accordion-active:block hs-accordion-active:text-white hs-accordion-active:group-hover:text-white hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
      width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
  </button>
  <div id="hs-secondary-collapse-1"
    class="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
    aria-labelledby="hs-secondary-heading-1">
    <p class="text-gray-800 dark:text-gray-200 py-4 px-5">
      <em>This is the third item's accordion body.</em> It is hidden by default, until the collapse
      plugin adds the appropriate classes that we use to style each element. These classes control the
      overall appearance, as well as the showing and hiding via CSS transitions.
    </p>
  </div>
</div>
<div class="hs-accordion overflow-hidden bg-white dark:bg-bodybg border -mt-px first:rounded-t-sm last:rounded-b-sm dark:bg-bgdark dark:border-white/10" id="hs-secondary-heading-2">
  <button
    class="hs-accordion-toggle hs-accordion-active:text-white hs-accordion-active:bg-secondary group py-4 px-5 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-white dark:text-gray-200 dark:hover:text-white/80"
    aria-controls="hs-secondary-collapse-2" type="button">
    Accordion #2
    <svg
      class="hs-accordion-active:hidden hs-accordion-active:text-white hs-accordion-active:group-hover:text-white block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
      width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
    <svg
      class="hs-accordion-active:block hs-accordion-active:text-white hs-accordion-active:group-hover:text-white hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
      width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
  </button>
  <div id="hs-secondary-collapse-2"
    class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
    aria-labelledby="hs-secondary-heading-2">
    <p class="text-gray-800 dark:text-gray-200 py-4 px-5">
      <em>This is the third item's accordion body.</em> It is hidden by default, until the collapse
      plugin adds the appropriate classes that we use to style each element. These classes control the
      overall appearance, as well as the showing and hiding via CSS transitions.
    </p>
  </div>
</div>
<div class="hs-accordion overflow-hidden bg-white dark:bg-bodybg border -mt-px first:rounded-t-sm last:rounded-b-sm dark:bg-bgdark dark:border-white/10" id="hs-secondary-heading-3">
  <button
    class="hs-accordion-toggle hs-accordion-active:text-white hs-accordion-active:bg-secondary group py-4 px-5 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-white dark:text-gray-200 dark:hover:text-white/80"
    aria-controls="hs-secondary-collapse-3" type="button">
    Accordion #3
    <svg
      class="hs-accordion-active:hidden hs-accordion-active:text-white hs-accordion-active:group-hover:text-white block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
      width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
    <svg
      class="hs-accordion-active:block hs-accordion-active:text-white hs-accordion-active:group-hover:text-white hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
      width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
  </button>
  <div id="hs-secondary-collapse-3"
    class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
    aria-labelledby="hs-secondary-heading-3">
    <p class="text-gray-800 dark:text-gray-200 py-4 px-5">
      <em>This is the third item's accordion body.</em> It is hidden by default, until the collapse
      plugin adds the appropriate classes that we use to style each element. These classes control the
      overall appearance, as well as the showing and hiding via CSS transitions.
    </p>
  </div>
</div>
</div>`
export let accordionTS8 =
`   <div class="accordion accordion-border-primary accordions-items-seperate"
id="accordionprimaryborderExample">
<div class="hs-accordion-group">
    <div class="hs-accordion  accordion-item" id="hs-basic-heading1">
        <button
            class="hs-accordion-toggle accordion-button  hs-accordion-active:pb-3 group py-0 inline-flex items-center justify-between  gap-x-3 w-full font-semibold text-start  transition"
            aria-controls="hs-basic-collapse1" type="button">
            Accordion Item #1
            <svg
            class="hs-accordion-active:hidden hs-accordion-active:text-primary hs-accordion-active:group-hover:text-primary block w-3 h-3 text-primary group-hover:text-primary dark:text-primary"
            width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
          <svg
            class="hs-accordion-active:block hs-accordion-active:text-primary hs-accordion-active:group-hover:text-primary hidden w-3 h-3 text-primary group-hover:text-primary dark:text-primary"
            width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
        </button>
        <div id="hs-basic-collapse1"
            class="hs-accordion-content accordion-collapse w-full hidde transition-[height] duration-300"
            aria-labelledby="hs-basic-heading1">
            <div class="accordion-body">
                <strong>This is the first item's accordion body.</strong> It is shown by
                default, until the collapse plugin adds the appropriate classes that we
                use to style each element. These classes control the overall appearance,
                as well as the showing and hiding via CSS transitions. You can modify
                any of this with custom CSS or overriding our default variables. It's
                also worth noting that just about any HTML can go within the
                <code>.accordion-body</code>, though the transition does limit overflow.
            </div>
        </div>
    </div>
    <div class="hs-accordion  accordion-item" id="hs-basic-heading2">
        <button
            class="hs-accordion-toggle accordion-button  hs-accordion-active:pb-3 group py-0 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start  transition"
            aria-controls="hs-basic-collapse2" type="button">
            Accordion Item #2
            <svg
            class="hs-accordion-active:hidden hs-accordion-active:text-primary hs-accordion-active:group-hover:text-primary block w-3 h-3 text-primary group-hover:text-primary dark:text-primary"
            width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
          <svg
            class="hs-accordion-active:block hs-accordion-active:text-primary hs-accordion-active:group-hover:text-primary hidden w-3 h-3 text-primary group-hover:text-primary dark:text-primary"
            width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
        </button>
        <div id="hs-basic-collapse2"
            class="hs-accordion-content accordion-collapse w-full hidde transition-[height] duration-300 hidden"
            aria-labelledby="hs-basic-heading2">
            <div class="accordion-body">
                <strong>This is the first item's accordion body.</strong> It is shown by
                default, until the collapse plugin adds the appropriate classes that we
                use to style each element. These classes control the overall appearance,
                as well as the showing and hiding via CSS transitions. You can modify
                any of this with custom CSS or overriding our default variables. It's
                also worth noting that just about any HTML can go within the
                <code>.accordion-body</code>, though the transition does limit overflow.
            </div>
        </div>
    </div>
    <div class="hs-accordion  accordion-item" id="hs-basic-heading-tree">
        <button
            class="hs-accordion-toggle accordion-button  hs-accordion-active:pb-3 group py-0 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start  transition"
            aria-controls="hs-basic-collapse-tree" type="button">
            Accordion Item #3
            <svg
            class="hs-accordion-active:hidden hs-accordion-active:text-primary hs-accordion-active:group-hover:text-primary block w-3 h-3 text-primary group-hover:text-primary dark:text-primary"
            width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
          <svg
            class="hs-accordion-active:block hs-accordion-active:text-primary hs-accordion-active:group-hover:text-primary hidden w-3 h-3 text-primary group-hover:text-primary dark:text-primary"
            width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
        </button>
        <div id="hs-basic-collapse-tree"
            class="hs-accordion-content accordion-collapse w-full hidden transition-[height] duration-300"
            aria-labelledby="hs-basic-heading-two">
            <div class="accordion-body">
                <strong>This is the first item's accordion body.</strong> It is shown by
                default, until the collapse plugin adds the appropriate classes that we
                use to style each element. These classes control the overall appearance,
                as well as the showing and hiding via CSS transitions. You can modify
                any of this with custom CSS or overriding our default variables. It's
                also worth noting that just about any HTML can go within the
                <code>.accordion-body</code>, though the transition does limit overflow.
            </div>
        </div>
    </div>
</div>
</div>`
export let accordionTS9 =
`       <div class="hs-accordion-group">
<div class="hs-accordion  accordion-item" id="hs-basic-heading11">
    <button
        class="hs-accordion-toggle accordion-button  hs-accordion-active:pb-3 group py-0 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start  transition"
        aria-controls="hs-basic-collapse11" type="button">
        Accordion Item #1
        <svg
        class="hs-accordion-active:hidden hs-accordion-active:text-secondary hs-accordion-active:group-hover:text-success block w-3 h-3 text-success group-hover:text-success dark:text-success"
        width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      </svg>
      <svg
        class="hs-accordion-active:block hs-accordion-active:text-success hs-accordion-active:group-hover:text-success hidden w-3 h-3 text-success group-hover:text-success dark:text-success"
        width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      </svg>
    </button>
    <div id="hs-basic-collapse11"
        class="hs-accordion-content accordion-collapse w-full hidde transition-[height] duration-300"
        aria-labelledby="hs-basic-heading11">
        <div class="accordion-body">
            <strong>This is the first item's accordion body.</strong> It is shown by
            default, until the collapse plugin adds the appropriate classes that we
            use to style each element. These classes control the overall appearance,
            as well as the showing and hiding via CSS transitions. You can modify
            any of this with custom CSS or overriding our default variables. It's
            also worth noting that just about any HTML can go within the
            <code>.accordion-body</code>, though the transition does limit overflow.
        </div>
    </div>
</div>
<div class="hs-accordion  accordion-item" id="hs-basic-heading12">
    <button
        class="hs-accordion-toggle accordion-button  hs-accordion-active:pb-3 group py-0 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start  transition"
        aria-controls="hs-basic-collapse12" type="button">
        Accordion Item #2
        <svg
        class="hs-accordion-active:hidden hs-accordion-active:text-secondary hs-accordion-active:group-hover:text-success block w-3 h-3 text-success group-hover:text-success dark:text-success"
        width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      </svg>
      <svg
        class="hs-accordion-active:block hs-accordion-active:text-success hs-accordion-active:group-hover:text-success hidden w-3 h-3 text-success group-hover:text-success dark:text-success"
        width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      </svg>
    </button>
    <div id="hs-basic-collapse12"
        class="hs-accordion-content accordion-collapse w-full hidde transition-[height] duration-300 hidden"
        aria-labelledby="hs-basic-heading12">
        <div class="accordion-body">
            <strong>This is the first item's accordion body.</strong> It is shown by
            default, until the collapse plugin adds the appropriate classes that we
            use to style each element. These classes control the overall appearance,
            as well as the showing and hiding via CSS transitions. You can modify
            any of this with custom CSS or overriding our default variables. It's
            also worth noting that just about any HTML can go within the
            <code>.accordion-body</code>, though the transition does limit overflow.
        </div>
    </div>
</div>
<div class="hs-accordion accordion-item" id="hs-basic-heading13">
    <button
        class="hs-accordion-toggle accordion-button  hs-accordion-active:pb-3 group py-0 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start  transition"
        aria-controls="hs-basic-collapse13" type="button">
        Accordion Item #3
        <svg
        class="hs-accordion-active:hidden hs-accordion-active:text-secondary hs-accordion-active:group-hover:text-success block w-3 h-3 text-success group-hover:text-success dark:text-success"
        width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      </svg>
      <svg
        class="hs-accordion-active:block hs-accordion-active:text-success hs-accordion-active:group-hover:text-success hidden w-3 h-3 text-success group-hover:text-success dark:text-success"
        width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      </svg>
    </button>
    <div id="hs-basic-collapse13"
        class="hs-accordion-content accordion-collapse w-full hidden transition-[height] duration-300"
        aria-labelledby="hs-basic-heading13">
        <div class="accordion-body">
            <strong>This is the first item's accordion body.</strong> It is shown by
            default, until the collapse plugin adds the appropriate classes that we
            use to style each element. These classes control the overall appearance,
            as well as the showing and hiding via CSS transitions. You can modify
            any of this with custom CSS or overriding our default variables. It's
            also worth noting that just about any HTML can go within the
            <code>.accordion-body</code>, though the transition does limit overflow.
        </div>
    </div>
</div>
</div>`
export let accordionTS10 =
`     <div class="hs-accordion-group">
<div class="hs-accordion  accordion-item" id="hs-basic-heading21">
    <button
        class="hs-accordion-toggle accordion-button  hs-accordion-active:pb-3 group py-0 inline-flex items-center gap-x-3 w-full font-semibold text-start  transition"
        aria-controls="hs-basic-collapse21" type="button">
<svg
  class="hs-accordion-active:hidden hs-accordion-active:text-gray-600 hs-accordion-active:group-hover:text-gray-600 block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
  width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
    stroke="currentColor" stroke-width="2" stroke-linecap="round" />
</svg>
<svg
  class="hs-accordion-active:block hs-accordion-active:text-gray-600 hs-accordion-active:group-hover:text-gray-600 hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
  width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
    stroke="currentColor" stroke-width="2" stroke-linecap="round" />
</svg>
        Accordion Item #1
    </button>
    <div id="hs-basic-collapse21"
        class="hs-accordion-content accordion-collapse w-full hidden transition-[height] duration-300"
        aria-labelledby="hs-basic-heading21">
        <div class="accordion-body">
            <strong>This is the first item's accordion body.</strong> It is shown by
            default, until the collapse plugin adds the appropriate classes that we
            use to style each element. These classes control the overall appearance,
            as well as the showing and hiding via CSS transitions. You can modify
            any of this with custom CSS or overriding our default variables. It's
            also worth noting that just about any HTML can go within the
            <code>.accordion-body</code>, though the transition does limit overflow.
        </div>
    </div>
</div>
<div class="hs-accordion  accordion-item" id="hs-basic-heading22">
    <button
        class="hs-accordion-toggle accordion-button  hs-accordion-active:pb-3 group py-0 inline-flex items-center gap-x-3 w-full font-semibold text-start  transition"
        aria-controls="hs-basic-collapse22" type="button">
        <svg
  class="hs-accordion-active:hidden hs-accordion-active:text-gray-600 hs-accordion-active:group-hover:text-gray-600 block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
  width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
    stroke="currentColor" stroke-width="2" stroke-linecap="round" />
</svg>
<svg
  class="hs-accordion-active:block hs-accordion-active:text-gray-600 hs-accordion-active:group-hover:text-gray-600 hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
  width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
    stroke="currentColor" stroke-width="2" stroke-linecap="round" />
</svg>
        Accordion Item #2
    </button>
    <div id="hs-basic-collapse22"
        class="hs-accordion-content accordion-collapse w-full hidde transition-[height] duration-300 hidden"
        aria-labelledby="hs-basic-heading22">
        <div class="accordion-body">
            <strong>This is the first item's accordion body.</strong> It is shown by
            default, until the collapse plugin adds the appropriate classes that we
            use to style each element. These classes control the overall appearance,
            as well as the showing and hiding via CSS transitions. You can modify
            any of this with custom CSS or overriding our default variables. It's
            also worth noting that just about any HTML can go within the
            <code>.accordion-body</code>, though the transition does limit overflow.
        </div>
    </div>
</div>
<div class="hs-accordion  accordion-item" id="hs-basic-heading23">
    <button
        class="hs-accordion-toggle accordion-button  hs-accordion-active:pb-3 group py-0 inline-flex items-center gap-x-3 w-full font-semibold text-start  transition"
        aria-controls="hs-basic-collapse23" type="button">
        <svg
  class="hs-accordion-active:hidden hs-accordion-active:text-gray-600 hs-accordion-active:group-hover:text-gray-600 block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
  width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
    stroke="currentColor" stroke-width="2" stroke-linecap="round" />
</svg>
<svg
  class="hs-accordion-active:block hs-accordion-active:text-gray-600 hs-accordion-active:group-hover:text-gray-600 hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
  width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
    stroke="currentColor" stroke-width="2" stroke-linecap="round" />
</svg>
        Accordion Item #3
    </button>
    <div id="hs-basic-collapse23"
        class="hs-accordion-content accordion-collapse w-full hidden transition-[height] duration-300"
        aria-labelledby="hs-basic-heading23">
        <div class="accordion-body">
            <strong>This is the first item's accordion body.</strong> It is shown by
            default, until the collapse plugin adds the appropriate classes that we
            use to style each element. These classes control the overall appearance,
            as well as the showing and hiding via CSS transitions. You can modify
            any of this with custom CSS or overriding our default variables. It's
            also worth noting that just about any HTML can go within the
            <code>.accordion-body</code>, though the transition does limit overflow.
        </div>
    </div>
</div>
</div>`
export let accordionTS11 =
`  <div class="hs-accordion-group">
<div class="hs-accordion  accordion-item custom-accordion-primary" id="hs-basic-heading31">
    <button
        class="hs-accordion-toggle accordion-button  hs-accordion-active:pb-3 group py-0 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start  transition"
        aria-controls="hs-basic-collapse31" type="button">
        Accordion Item #1
        <svg
  class="hs-accordion-active:hidden hs-accordion-active:text-gray-600 hs-accordion-active:group-hover:text-gray-600 block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
  width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
    stroke="currentColor" stroke-width="2" stroke-linecap="round" />
</svg>
<svg
  class="hs-accordion-active:block hs-accordion-active:text-gray-600 hs-accordion-active:group-hover:text-gray-600 hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
  width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
    stroke="currentColor" stroke-width="2" stroke-linecap="round" />
</svg>
    </button>
    <div id="hs-basic-collapse31"
        class="hs-accordion-content accordion-collapse w-full hidden transition-[height] duration-300"
        aria-labelledby="hs-basic-heading31">
        <div class="accordion-body">
            <strong>This is the first item's accordion body.</strong> It is shown by
            default, until the collapse plugin adds the appropriate classes that we
            use to style each element. These classes control the overall appearance,
            as well as the showing and hiding via CSS transitions. You can modify
            any of this with custom CSS or overriding our default variables. It's
            also worth noting that just about any HTML can go within the
            <code>.accordion-body</code>, though the transition does limit overflow.
        </div>
    </div>
</div>
<div class="hs-accordion  accordion-item custom-accordion-secondary" id="hs-basic-heading32">
    <button
        class="hs-accordion-toggle accordion-button  hs-accordion-active:pb-3 group py-0 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start  transition"
        aria-controls="hs-basic-collapse32" type="button">
        Accordion Item #2
        <svg
  class="hs-accordion-active:hidden hs-accordion-active:text-gray-600 hs-accordion-active:group-hover:text-gray-600 block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
  width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
    stroke="currentColor" stroke-width="2" stroke-linecap="round" />
</svg>
<svg
  class="hs-accordion-active:block hs-accordion-active:text-gray-600 hs-accordion-active:group-hover:text-gray-600 hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
  width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
    stroke="currentColor" stroke-width="2" stroke-linecap="round" />
</svg>
    </button>
    <div id="hs-basic-collapse32"
        class="hs-accordion-content accordion-collapse w-full hidde transition-[height] duration-300 hidden"
        aria-labelledby="hs-basic-heading32">
        <div class="accordion-body">
            <strong>This is the first item's accordion body.</strong> It is shown by
            default, until the collapse plugin adds the appropriate classes that we
            use to style each element. These classes control the overall appearance,
            as well as the showing and hiding via CSS transitions. You can modify
            any of this with custom CSS or overriding our default variables. It's
            also worth noting that just about any HTML can go within the
            <code>.accordion-body</code>, though the transition does limit overflow.
        </div>
    </div>
</div>
<div class="hs-accordion  accordion-item custom-accordion-danger" id="hs-basic-heading33">
    <button
        class="hs-accordion-toggle accordion-button  hs-accordion-active:pb-3 group py-0 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start  transition"
        aria-controls="hs-basic-collapse33" type="button">
        Accordion Item #3
        <svg
  class="hs-accordion-active:hidden hs-accordion-active:text-gray-600 hs-accordion-active:group-hover:text-gray-600 block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
  width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
    stroke="currentColor" stroke-width="2" stroke-linecap="round" />
</svg>
<svg
  class="hs-accordion-active:block hs-accordion-active:text-gray-600 hs-accordion-active:group-hover:text-gray-600 hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50"
  width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
    stroke="currentColor" stroke-width="2" stroke-linecap="round" />
</svg>
    </button>
    <div id="hs-basic-collapse33"
        class="hs-accordion-content accordion-collapse w-full hidden transition-[height] duration-300"
        aria-labelledby="hs-basic-heading33">
        <div class="accordion-body">
            <strong>This is the first item's accordion body.</strong> It is shown by
            default, until the collapse plugin adds the appropriate classes that we
            use to style each element. These classes control the overall appearance,
            as well as the showing and hiding via CSS transitions. You can modify
            any of this with custom CSS or overriding our default variables. It's
            also worth noting that just about any HTML can go within the
            <code>.accordion-body</code>, though the transition does limit overflow.
        </div>
    </div>
</div>
</div>`
export let accordionTS12 =
`    <div class="hs-accordion-group" data-hs-accordion-always-open>
<div class="hs-accordion active" id="hs-basic-always-open-heading-one">
  <button class="hs-accordion-toggle hs-accordion-active:text-primary py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400" aria-controls="hs-basic-always-open-collapse-one">
    <svg class="hs-accordion-active:hidden block size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
    <svg class="hs-accordion-active:block hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>
    Accordion #1
  </button>
  <div id="hs-basic-always-open-collapse-one" class="hs-accordion-content w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-basic-always-open-heading-one">
    <p class="text-gray-800 dark:text-gray-200">
      <em>This is the third item's accordion body.</em> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.
    </p>
  </div>
</div>

<div class="hs-accordion" id="hs-basic-always-open-heading-two">
  <button class="hs-accordion-toggle hs-accordion-active:text-primary py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400" aria-controls="hs-basic-always-open-collapse-two">
    <svg class="hs-accordion-active:hidden block size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
    <svg class="hs-accordion-active:block hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>
    Accordion #2
  </button>
  <div id="hs-basic-always-open-collapse-two" class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-basic-always-open-heading-two">
    <p class="text-gray-800 dark:text-gray-200">
      <em>This is the second item's accordion body.</em> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.
    </p>
  </div>
</div>

<div class="hs-accordion" id="hs-basic-always-open-heading-three">
  <button class="hs-accordion-toggle hs-accordion-active:text-primary py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400" aria-controls="hs-basic-always-open-collapse-three">
    <svg class="hs-accordion-active:hidden block size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
    <svg class="hs-accordion-active:block hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>
    Accordion #3
  </button>
  <div id="hs-basic-always-open-collapse-three" class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-basic-always-open-heading-three">
    <p class="text-gray-800 dark:text-gray-200">
      <em>This is the first item's accordion body.</em> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.
    </p>
  </div>
</div>
</div>`
export let accordionTS13 =
`   <div class="hs-accordion-group">
<div class="hs-accordion active" id="hs-basic-nested-heading-one">
  <button class="hs-accordion-toggle hs-accordion-active:text-primary py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400" aria-controls="hs-basic-nested-collapse-one">
    <svg class="hs-accordion-active:hidden block size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
    <svg class="hs-accordion-active:block hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>
    Accordion #1
  </button>
  <div id="hs-basic-nested-collapse-one" class="hs-accordion-content w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-basic-nested-heading-one">
    <div class="hs-accordion-group ps-6">
      <div class="hs-accordion active" id="hs-basic-nested-sub-heading-one">
        <button class="hs-accordion-toggle hs-accordion-active:text-primary py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400" aria-controls="hs-basic-nested-sub-collapse-one">
          <svg class="hs-accordion-active:hidden block size-3" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.62421 7.86L13.6242 7.85999" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <path d="M8.12421 13.36V2.35999" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <svg class="hs-accordion-active:block hidden size-3" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.62421 7.86L13.6242 7.85999" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
          Sub accordion #1
        </button>
        <div id="hs-basic-nested-sub-collapse-one" class="hs-accordion-content w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-basic-nested-sub-heading-one">
          <p class="text-gray-800 dark:text-gray-200">
            <em>This is the third item's accordion body.</em> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.
          </p>
        </div>
      </div>

      <div class="hs-accordion" id="hs-basic-nested-sub-heading-two">
        <button class="hs-accordion-toggle hs-accordion-active:text-primary py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400" aria-controls="hs-basic-nested-sub-collapse-two">
          <svg class="hs-accordion-active:hidden block size-3" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.62421 7.86L13.6242 7.85999" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <path d="M8.12421 13.36V2.35999" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <svg class="hs-accordion-active:block hidden size-3" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.62421 7.86L13.6242 7.85999" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
          Sub accordion #2
        </button>
        <div id="hs-basic-nested-sub-collapse-two" class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-basic-nested-sub-heading-two">
          <p class="text-gray-800 dark:text-gray-200">
            <em>This is the second item's accordion body.</em> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.
          </p>
        </div>
      </div>

      <div class="hs-accordion" id="hs-basic-nested-sub-heading-three">
        <button class="hs-accordion-toggle hs-accordion-active:text-primary py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400" aria-controls="hs-basic-nested-sub-collapse-three">
          <svg class="hs-accordion-active:hidden block size-3" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.62421 7.86L13.6242 7.85999" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <path d="M8.12421 13.36V2.35999" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <svg class="hs-accordion-active:block hidden size-3" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.62421 7.86L13.6242 7.85999" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
          Sub accordion #3
        </button>
        <div id="hs-basic-nested-sub-collapse-three" class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-basic-nested-sub-heading-three">
          <p class="text-gray-800 dark:text-gray-200">
            <em>This is the first item's accordion body.</em> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="hs-accordion" id="hs-basic-nested-heading-two">
  <button class="hs-accordion-toggle hs-accordion-active:text-primary py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400" aria-controls="hs-basic-nested-collapse-two">
    <svg class="hs-accordion-active:hidden block size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
    <svg class="hs-accordion-active:block hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>
    Accordion #2
  </button>
  <div id="hs-basic-nested-collapse-two" class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-basic-nested-heading-two">
    <p class="text-gray-800 dark:text-gray-200">
      <em>This is the second item's accordion body.</em> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.
    </p>
  </div>
</div>

<div class="hs-accordion" id="hs-basic-nested-heading-three">
  <button class="hs-accordion-toggle hs-accordion-active:text-primary py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400" aria-controls="hs-basic-nested-collapse-three">
    <svg class="hs-accordion-active:hidden block size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
    <svg class="hs-accordion-active:block hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>
    Accordion #3
  </button>
  <div id="hs-basic-nested-collapse-three" class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-basic-nested-heading-three">
    <p class="text-gray-800 dark:text-gray-200">
      <em>This is the first item's accordion body.</em> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.
    </p>
  </div>
</div>
</div>`
export let accordionTS14 =
`   <div class="hs-accordion-group">
<div class="hs-accordion active" id="hs-basic-no-arrow-heading-one">
  <button class="hs-accordion-toggle hs-accordion-active:text-primary py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400" aria-controls="hs-basic-no-arrow-collapse-one">
    Accordion #1
  </button>
  <div id="hs-basic-no-arrow-collapse-one" class="hs-accordion-content w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-basic-no-arrow-heading-one">
    <p class="text-gray-800 dark:text-gray-200">
      <em>This is the third item's accordion body.</em> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.
    </p>
  </div>
</div>

<div class="hs-accordion" id="hs-basic-no-arrow-heading-two">
  <button class="hs-accordion-toggle hs-accordion-active:text-primary py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400" aria-controls="hs-basic-no-arrow-collapse-two">
    Accordion #2
  </button>
  <div id="hs-basic-no-arrow-collapse-two" class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-basic-no-arrow-heading-two">
    <p class="text-gray-800 dark:text-gray-200">
      <em>This is the third item's accordion body.</em> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.
    </p>
  </div>
</div>

<div class="hs-accordion" id="hs-basic-no-arrow-heading-three">
  <button class="hs-accordion-toggle hs-accordion-active:text-primary py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400" aria-controls="hs-basic-no-arrow-collapse-three">
    Accordion #3
  </button>
  <div id="hs-basic-no-arrow-collapse-three" class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-basic-no-arrow-heading-three">
    <p class="text-gray-800 dark:text-gray-200">
      <em>This is the third item's accordion body.</em> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.
    </p>
  </div>
</div>

<div class="hs-accordion" id="hs-basic-no-arrow-heading-four">
  <button class="hs-accordion-toggle hs-accordion-active:text-primary py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400" aria-controls="hs-basic-no-arrow-collapse-three">
    Accordion #4
  </button>
  <div id="hs-basic-no-arrow-collapse-four" class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-basic-no-arrow-heading-three">
    <p class="text-gray-800 dark:text-gray-200">
      <em>This is the third item's accordion body.</em> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.
    </p>
  </div>
</div>

<div class="hs-accordion" id="hs-basic-no-arrow-heading-five">
  <button class="hs-accordion-toggle hs-accordion-active:text-primary py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400" aria-controls="hs-basic-no-arrow-collapse-three">
    Accordion #5
  </button>
  <div id="hs-basic-no-arrow-collapse-five" class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-basic-no-arrow-heading-three">
    <p class="text-gray-800 dark:text-gray-200">
      <em>This is the third item's accordion body.</em> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.
    </p>
  </div>
</div>

<div class="hs-accordion" id="hs-basic-no-arrow-heading-six">
  <button class="hs-accordion-toggle hs-accordion-active:text-primary py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400" aria-controls="hs-basic-no-arrow-collapse-three">
    Accordion #6
  </button>
  <div id="hs-basic-no-arrow-collapse-six" class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-basic-no-arrow-heading-three">
    <p class="text-gray-800 dark:text-gray-200">
      <em>This is the third item's accordion body.</em> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.
    </p>
  </div>
</div>
</div>`
export let accordionTS15 =
`    <div class="hs-accordion-group">
<div class="hs-accordion active" id="hs-basic-with-arrow-heading-one">
  <button class="hs-accordion-toggle hs-accordion-active:text-primary py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400" aria-controls="hs-basic-with-arrow-collapse-one">
    <svg class="hs-accordion-active:hidden block size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
    <svg class="hs-accordion-active:block hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>
    Accordion #1
  </button>
  <div id="hs-basic-with-arrow-collapse-one" class="hs-accordion-content w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-basic-with-arrow-heading-one">
    <p class="text-gray-800 dark:text-gray-200">
      <em>This is the third item's accordion body.</em> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.
    </p>
  </div>
</div>

<div class="hs-accordion" id="hs-basic-with-arrow-heading-two">
  <button class="hs-accordion-toggle hs-accordion-active:text-primary py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400" aria-controls="hs-basic-with-arrow-collapse-two">
    <svg class="hs-accordion-active:hidden block size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
    <svg class="hs-accordion-active:block hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>
    Accordion #2
  </button>
  <div id="hs-basic-with-arrow-collapse-two" class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-basic-with-arrow-heading-two">
    <p class="text-gray-800 dark:text-gray-200">
      <em>This is the third item's accordion body.</em> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.
    </p>
  </div>
</div>

<div class="hs-accordion" id="hs-basic-with-arrow-heading-three">
  <button class="hs-accordion-toggle hs-accordion-active:text-primary py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400" aria-controls="hs-basic-with-arrow-collapse-three">
    <svg class="hs-accordion-active:hidden block size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
    <svg class="hs-accordion-active:block hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>
    Accordion #3
  </button>
  <div id="hs-basic-with-arrow-collapse-three" class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-basic-with-arrow-heading-three">
    <p class="text-gray-800 dark:text-gray-200">
      <em>This is the third item's accordion body.</em> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.
    </p>
  </div>
</div>
</div>`
export let accordionTS16 =
`    <div class="hs-accordion-group">
<div class="hs-accordion active" id="hs-basic-with-title-and-arrow-stretched-heading-one">
  <button class="hs-accordion-toggle hs-accordion-active:text-primary py-3 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400" aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-one">
    Accordion #1
    <svg class="hs-accordion-active:hidden block size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
    <svg class="hs-accordion-active:block hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>
  </button>
  <div id="hs-basic-with-title-and-arrow-stretched-collapse-one" class="hs-accordion-content w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-one">
    <p class="text-gray-800 dark:text-gray-200">
      <em>This is the third item's accordion body.</em> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.
    </p>
  </div>
</div>

<div class="hs-accordion" id="hs-basic-with-title-and-arrow-stretched-heading-two">
  <button class="hs-accordion-toggle hs-accordion-active:text-primary py-3 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400" aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-two">
    Accordion #2
    <svg class="hs-accordion-active:block hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>
    <svg class="hs-accordion-active:hidden block size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
  </button>
  <div id="hs-basic-with-title-and-arrow-stretched-collapse-two" class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-two">
    <p class="text-gray-800 dark:text-gray-200">
      <em>This is the third item's accordion body.</em> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.
    </p>
  </div>
</div>

<div class="hs-accordion" id="hs-basic-with-title-and-arrow-stretched-heading-three">
  <button class="hs-accordion-toggle hs-accordion-active:text-primary py-3 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400" aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-three">
    Accordion #3
    <svg class="hs-accordion-active:hidden block size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
    <svg class="hs-accordion-active:block hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>
  </button>
  <div id="hs-basic-with-title-and-arrow-stretched-collapse-three" class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-three">
    <p class="text-gray-800 dark:text-gray-200">
      <em>This is the third item's accordion body.</em> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.
    </p>
  </div>
</div>
</div>`
export let accordionTS17 =
`       <div class="hs-accordion-group">
<div class="hs-accordion active bg-white border -mt-px first:rounded-t-lg last:rounded-b-lg dark:bg-bodybg dark:border-white/10" id="hs-bordered-heading-one">
  <button class="hs-accordion-toggle dark:bg-bodybg dark:border-white/10 hs-accordion-active:text-primary inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 py-4 px-5 hover:text-gray-500 disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400" aria-controls="hs-basic-bordered-collapse-one">
    <svg class="hs-accordion-active:hidden block size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
    <svg class="hs-accordion-active:block hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>
    Accordion #1
  </button>
  <div id="hs-basic-bordered-collapse-one" class="hs-accordion-content w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-bordered-heading-one">
    <div class="pb-4 px-5 dark:bg-bodybg">
      <p class="text-gray-800 dark:text-gray-200">
        <em>This is the third item's accordion body.</em> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.
      </p>
    </div>
  </div>
</div>

<div class="hs-accordion bg-white border -mt-px first:rounded-t-lg last:rounded-b-lg dark:bg-bodybg dark:border-white/10" id="hs-bordered-heading-two">
  <button class="hs-accordion-toggle dark:bg-bodybg hs-accordion-active:text-primary inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 py-4 px-5 hover:text-gray-500 disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400" aria-controls="hs-basic-bordered-collapse-two">
    <svg class="hs-accordion-active:hidden block size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
    <svg class="hs-accordion-active:block hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>
    Accordion #2
  </button>
  <div id="hs-basic-bordered-collapse-two" class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-bordered-heading-two">
    <div class="pb-4 px-5 dark:bg-bodybg">
      <p class="text-gray-800 dark:text-gray-200">
        <em>This is the second item's accordion body.</em> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.
      </p>
    </div>
  </div>
</div>

<div class="hs-accordion bg-white border -mt-px first:rounded-t-lg last:rounded-b-lg dark:bg-bodybg dark:border-white/10" id="hs-bordered-heading-three">
  <button class="hs-accordion-toggle dark:bg-bodybg hs-accordion-active:text-primary inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 py-4 px-5 hover:text-gray-500 disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400" aria-controls="hs-basic-bordered-collapse-three">
    <svg class="hs-accordion-active:hidden block size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
    <svg class="hs-accordion-active:block hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>
    Accordion #3
  </button>
  <div id="hs-basic-bordered-collapse-three" class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-bordered-heading-three">
    <div class="pb-4 px-5 dark:bg-bodybg">
      <p class="text-gray-800 dark:text-gray-200">
        <em>This is the first item's accordion body.</em> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.
      </p>
    </div>
  </div>
</div>
</div>`
export let accordionTS18 =
`     <div class="hs-accordion-group">
<div class="hs-accordion hs-accordion-active:border-gray-200 bg-white border border-transparent rounded-xl dark:hs-accordion-active:border-white/10 dark:bg-bodybg dark:border-transparent" id="hs-active-bordered-heading-one">
  <button class="hs-accordion-toggle hs-accordion-active:text-blue-600 inline-flex justify-between items-center gap-x-3 w-full font-semibold text-start text-gray-800 py-4 px-5 hover:text-gray-500 disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400" aria-controls="hs-basic-active-bordered-collapse-one">
    Accordion #1
    <svg class="hs-accordion-active:hidden block size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
    <svg class="hs-accordion-active:block hidden size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>
  </button>
  <div id="hs-basic-active-bordered-collapse-one" class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-active-bordered-heading-one">
    <div class="pb-4 px-5">
      <p class="text-gray-800 dark:text-gray-200">
        <em>This is the third item's accordion body.</em> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.
      </p>
    </div>
  </div>
</div>

<div class="hs-accordion hs-accordion-active:border-gray-200 active bg-white border border-transparent rounded-xl dark:hs-accordion-active:border-white/10 dark:bg-bodybg dark:border-transparent" id="hs-active-bordered-heading-two">
  <button class="hs-accordion-toggle hs-accordion-active:text-blue-600 inline-flex justify-between items-center gap-x-3 w-full font-semibold text-start text-gray-800 py-4 px-5 hover:text-gray-500 disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400" aria-controls="hs-basic-active-bordered-collapse-two">
    Accordion #2
    <svg class="hs-accordion-active:hidden block size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
    <svg class="hs-accordion-active:block hidden size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>
  </button>
  <div id="hs-basic-active-bordered-collapse-two" class="hs-accordion-content w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-active-bordered-heading-two">
    <div class="pb-4 px-5">
      <p class="text-gray-800 dark:text-gray-200">
        <em>This is the second item's accordion body.</em> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.
      </p>
    </div>
  </div>
</div>

<div class="hs-accordion hs-accordion-active:border-gray-200 bg-white border border-transparent rounded-xl dark:hs-accordion-active:border-white/10 dark:bg-bodybg dark:border-transparent" id="hs-active-bordered-heading-three">
  <button class="hs-accordion-toggle hs-accordion-active:text-blue-600 inline-flex justify-between items-center gap-x-3 w-full font-semibold text-start text-gray-800 py-4 px-5 hover:text-gray-500 disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400" aria-controls="hs-basic-active-bordered-collapse-three">
    Accordion #3
    <svg class="hs-accordion-active:hidden block size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
    <svg class="hs-accordion-active:block hidden size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>
  </button>
  <div id="hs-basic-active-bordered-collapse-three" class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-active-bordered-heading-three">
    <div class="pb-4 px-5">
      <p class="text-gray-800 dark:text-gray-200">
        <em>This is the first item's accordion body.</em> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.
      </p>
    </div>
  </div>
</div>
</div>`
export let accordionTS19 =
`       <div class="hs-accordion-group">
<div class="hs-accordion accordion-item overflow-hidden !border-b-0" id="hs-basic-heading-custom-one">
  <button class="hs-accordion-toggle accordion-button hs-accordion-active:text-primary hs-accordion-active:pb-3 group inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-primary dark:text-gray-200 dark:hover:text-white/80"
    aria-controls="hs-basic-collapse-custom-one" type="button">
    Accordion #1
  </button>

  <div id="hs-basic-collapse-custom-one"
    class="hs-accordion-content w-full overflow-hidden hidden transition-[height] duration-300"
    aria-labelledby="hs-basic-heading-custom-one">
    <div class="accordion-body">
        <strong>This is the first item's accordion body.</strong> It is shown by
        default, until the collapse plugin adds the appropriate classes that we
        use
        to
        style each element. These classes control the overall appearance, as
        well as
        the
        showing and hiding via CSS transitions. You can modify any of this with
        custom
        CSS or overriding our default variables. It's also worth noting that
        just
        about
        any HTML can go within the <code>.accordion-body</code>, though the
        transition
        does limit overflow.
    </div>
  </div>
</div>

<div class="hs-accordion accordion-item !border-b-0" id="hs-basic-heading-custom-two">
  <button
    class="hs-accordion-toggle accordion-button hs-accordion-active:text-primary hs-accordion-active:pb-3 group pt-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-primary dark:text-gray-200 dark:hover:text-white/80"
    aria-controls="hs-basic-collapse-custom-two" type="button">
    Accordion #2
  </button>
  <div id="hs-basic-collapse-custom-two"
    class="hs-accordion-content hidden overflow-hidden w-full transition-[height] duration-300"
    aria-labelledby="hs-basic-heading-custom-two">
    <div class="accordion-body">
        <strong>This is the second item's accordion body.</strong> It is shown by
        default, until the collapse plugin adds the appropriate classes that we
        use
        to
        style each element. These classes control the overall appearance, as
        well as
        the
        showing and hiding via CSS transitions. You can modify any of this with
        custom
        CSS or overriding our default variables. It's also worth noting that
        just
        about
        any HTML can go within the <code>.accordion-body</code>, though the
        transition
        does limit overflow.
    </div>
  </div>
</div>

<div class="hs-accordion accordion-item overflow-hidden" id="hs-basic-heading-custom-three">
  <button
    class="hs-accordion-toggle accordion-button hs-accordion-active:text-primary hs-accordion-active:pb-3 group pt-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-primary dark:text-gray-200 dark:hover:text-white/80"
    aria-controls="hs-basic-collapse-custom-three" type="button">
    Accordion #3
  </button>
  <div id="hs-basic-collapse-custom-three"
    class="hs-accordion-content  overflow-hidden  w-full hidden transition-[height] duration-300"
    aria-labelledby="hs-basic-heading-custom-three">
    <div class="accordion-body">
        <strong>This is the third item's accordion body.</strong> It is shown by
        default, until the collapse plugin adds the appropriate classes that we
        use
        to
        style each element. These classes control the overall appearance, as
        well as
        the
        showing and hiding via CSS transitions. You can modify any of this with
        custom
        CSS or overriding our default variables. It's also worth noting that
        just
        about
        any HTML can go within the <code>.accordion-body</code>, though the
        transition
        does limit overflow.
    </div>
  </div>
</div>
</div>`
//Modals & Closes

export const modal1 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<a href="#"  className="hs-dropdown-toggle ti-btn ti-btn-primary-full" data-hs-overlay="#todo-compose">Launch demo modal
</a>
<div id="todo-compose" className="hs-overlay hidden ti-modal">
    <div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out">
      <div className="ti-modal-content">
        <div className="ti-modal-header">
            <h6 className="modal-title text-[1rem] font-semibold" id="mail-ComposeLabel">Modal title</h6>
              <button type="button" className="hs-dropdown-toggle !text-[1rem] !font-semibold !text-defaulttextcolor" data-hs-overlay="#todo-compose">
                <span className="sr-only">Close</span>
                <i className="ri-close-line"></i>
              </button>
        </div>
        <div className="ti-modal-body px-4">
            ...
        </div>
        <div className="ti-modal-footer">
            <button type="button"
            className="hs-dropdown-toggle ti-btn  ti-btn-secondary-full align-middle"
            data-hs-overlay="#todo-compose">
            Close
          </button>
            <button type="button" className="ti-btn bg-primary text-white !font-medium">Save Changes</button>
        </div>
      </div>
    </div>
</div>
// End Prism Code//`;

export const modal2 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
 <a href="#"  className="hs-dropdown-toggle ti-btn ti-btn-primary-full " data-hs-overlay="#staticBackdrop">Launch static backdrop modal
</a>
<div id="staticBackdrop" className="hs-overlay hidden ti-modal  [--overlay-backdrop:static]">
    <div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out">
      <div className="ti-modal-content">
        <div className="ti-modal-header">
            <h6 className="modal-title text-[1rem] font-semibold">Modal title</h6>
              <button type="button" className="hs-dropdown-toggle !text-[1rem] !font-semibold !text-defaulttextcolor" data-hs-overlay="#staticBackdrop">
                <span className="sr-only">Close</span>
                <i className="ri-close-line"></i>
              </button>
        </div>
        <div className="ti-modal-body px-4">
            <p>I will not close if you click outside me. Don't even try to
                press
                escape key.</p>
        </div>
        <div className="ti-modal-footer">
            <button type="button"
            className="hs-dropdown-toggle ti-btn  ti-btn-secondary-full align-middle"
            data-hs-overlay="#staticBackdrop
            
            ">
            Close
          </button>
            <button type="button" className="ti-btn bg-primary text-white !font-medium">Understood</button>
        </div>
      </div>
    </div>
</div>
// End Prism Code//`;

export const modal3 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<a href="#"  className="hs-dropdown-toggle ti-btn ti-btn-primary-full" data-hs-overlay="#exampleModalScrollable"> Scrolling long content
</a>
<div id="exampleModalScrollable" className="hs-overlay hidden ti-modal">
    <div className="hs-overlay-open:mt-7  ti-modal-box mt-0 ease-out">
      <div className="ti-modal-content">
        <div className="ti-modal-header">
            <h6 className="modal-title text-[1rem] font-semibold">Modal title</h6>
              <button type="button" className="hs-dropdown-toggle !text-[1rem] !font-semibold !text-defaulttextcolor" data-hs-overlay="#exampleModalScrollable">
                <span className="sr-only">Close</span>
                <i className="ri-close-line"></i>
              </button>
        </div>
        <div className="ti-modal-body px-4">
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Libero
                ipsum quasi, error quibusdam debitis maiores hic eum? Vitae
                nisi
                ipsa maiores fugiat deleniti quis reiciendis veritatis.</p>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea
                voluptatibus, ipsam quo est rerum modi quos expedita facere,
                ex
                tempore fuga similique ipsa blanditiis et accusamus
                temporibus
                commodi voluptas! Nobis veniam illo architecto expedita quam
                ratione quaerat omnis. In, recusandae eos! Pariatur,
                deleniti
                quis ad nemo ipsam officia temporibus, doloribus fuga
                asperiores
                ratione distinctio velit alias hic modi praesentium aperiam
                officiis eaque, accusamus aut. Accusantium assumenda,
                commodi
                nulla provident asperiores fugit inventore iste amet aut
                placeat
                consequatur reprehenderit. Ratione tenetur eligendi, quis
                aperiam dolores magni iusto distinctio voluptatibus minus a
                unde
                at! Consequatur voluptatum in eaque obcaecati, impedit
                accusantium ea soluta, excepturi, quasi quia commodi
                blanditiis?
                Qui blanditiis iusto corrupti necessitatibus dolorem fugiat
                consequuntur quod quo veniam? Labore dignissimos reiciendis
                accusamus recusandae est consequuntur iure.</p>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <p>Lorem ipsum dolor sit amet.</p>
        </div>
        <div className="ti-modal-footer">
            <button type="button"
            className="hs-dropdown-toggle ti-btn  ti-btn-secondary-full align-middle"
            data-hs-overlay="#exampleModalScrollable
            
            ">
            Close
          </button>
            <button type="button" className="ti-btn bg-primary text-white !font-medium">Save Changes</button>
        </div>
      </div>
    </div>
</div>
// End Prism Code//`;

export const modal4 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
  <button type="button" className="hs-dropdown-toggle ti-btn ti-btn-primary-full" data-hs-overlay="#hs-vertically-centered-modal">
Vertically centered modal
</button>
<div id="hs-vertically-centered-modal" className="hs-overlay hidden ti-modal">
<div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out min-h-[calc(100%-3.5rem)] flex items-center">
  <div className="ti-modal-content">
    <div className="ti-modal-header">
        <h6 className="modal-title text-[1rem] font-semibold" id="staticBackdropLabel2">Modal title
        </h6>
      <button type="button" className="hs-dropdown-toggle ti-modal-close-btn" data-hs-overlay="#hs-vertically-centered-modal">
        <span className="sr-only">Close</span>
        <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor"/>
        </svg>
      </button>
    </div>
    <div className="ti-modal-body">
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Libero
            ipsum quasi, error quibusdam debitis maiores hic eum? Vitae
            nisi
            ipsa maiores fugiat deleniti quis reiciendis veritatis.</p>
    </div>
    <div className="ti-modal-footer">
      <button type="button" className="hs-dropdown-toggle ti-btn ti-btn-secondary-full" data-hs-overlay="#hs-vertically-centered-modal">
        Close
      </button>
      <a className="ti-btn ti-btn-primary-full" href="#" >
        Save changes
      </a>
    </div>
  </div>
</div>
</div>
// End Prism Code//`;

export const modal5 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<button type="button" className="hs-dropdown-toggle ti-btn ti-btn-primary-full" data-hs-overlay="#hs-vertically-centered-scrollable-modal">
Vertically centered scrollable modal
</button>
<div id="hs-vertically-centered-scrollable-modal" className="hs-overlay hidden ti-modal">
<div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out h-[calc(100%-3.5rem)] min-h-[calc(100%-3.5rem)] flex items-center">
  <div className="max-h-full overflow-hidden ti-modal-content">
    <div className="ti-modal-header">
        <h6 className="modal-title text-[1rem] font-semiboldmodal-title" id="staticBackdropLabel3">Modal title
        </h6>
      <button type="button" className="hs-dropdown-toggle ti-modal-close-btn" data-hs-overlay="#hs-vertically-centered-scrollable-modal">
        <span className="sr-only">Close</span>
        <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor"/>
        </svg>
      </button>
    </div>
    <div className="ti-modal-body overflow-y-auto">
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea
            voluptatibus, ipsam quo est rerum modi quos expedita facere,
            ex
            tempore fuga similique ipsa blanditiis et accusamus
            temporibus
            commodi voluptas! Nobis veniam illo architecto expedita quam
            ratione quaerat omnis. In, recusandae eos! Pariatur,
            deleniti
            quis ad nemo ipsam officia temporibus, doloribus fuga
            asperiores
            ratione distinctio velit alias hic modi praesentium aperiam
            officiis eaque, accusamus aut. Accusantium assumenda,
            commodi
            nulla provident asperiores fugit inventore iste amet aut
            placeat
            consequatur reprehenderit. Ratione tenetur eligendi, quis
            aperiam dolores magni iusto distinctio voluptatibus minus a
            unde
            at! Consequatur voluptatum in eaque obcaecati, impedit
            accusantium ea soluta, excepturi, quasi quia commodi
            blanditiis?
            Qui blanditiis iusto corrupti necessitatibus dolorem fugiat
            consequuntur quod quo veniam? Labore dignissimos reiciendis
            accusamus recusandae est consequuntur iure.</p>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <p>Lorem ipsum dolor sit amet.</p>
    </div>
    <div className="ti-modal-footer">
      <button type="button" className="hs-dropdown-toggle ti-btn ti-btn-secondary-full" data-hs-overlay="#hs-vertically-centered-scrollable-modal">
        Close
      </button>
      <a className="ti-btn ti-btn-primary-full" href="#" >
        Save changes
      </a>
    </div>
  </div>
</div>
</div>
// End Prism Code//`;

export const modal6 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<button type="button" className="hs-dropdown-toggle ti-btn ti-btn-primary-full" data-hs-overlay="#exampleModalScrollable4">
Launch demo modal
</button>
<div id="exampleModalScrollable4" className="hs-overlay hidden ti-modal">
<div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out min-h-[calc(100%-3.5rem)] flex items-center">
  <div className="ti-modal-content w-full">
    <div className="ti-modal-header">
        <h6 className="modal-title text-[1rem] font-semibold" id="staticBackdropLabel4">Modal title
        </h6>
      <button type="button" className="hs-dropdown-toggle ti-modal-close-btn" data-hs-overlay="#exampleModalScrollable4">
        <span className="sr-only">Close</span>
        <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor"/>
        </svg>
      </button>
    </div>
    <div className="ti-modal-body">
        <h5>Popover in a modal</h5>
        <div className="mb-2">This
          <div className="hs-tooltip ti-main-tooltip [--trigger:click] [--placement:right]">
              <a className="hs-tooltip-toggle ti-main-tooltip-toggle ti-btn ti-btn-secondary me-2" href="#" >button
                  <div className="hs-tooltip-content ti-main-tooltip-content dark:bg-bodybg !p-0 !max-w-[276px]" role="tooltip">
                      <div  className="!border-b !border-solid dark:border-defaultborder/10 !rounded-t-md !py-2  !px-4 text-defaulttextcolor border-defaultborder text-start w-full text-[1rem]">
                      <h6>Popover Title</h6>
                      </div>
                      <p className="!text-defaulttextcolor !text-[0.8rem] !py-4 !px-4 text-start">Popover body content is set in this attribute.</p>
                  </div>
                </a>
            </div>
            triggers a popover on click.</div>
        <hr className="my-2"/>
        <h5>Tooltips in a modal</h5>
        <div>
          <div className="hs-tooltip ti-main-tooltip [--placement:top]">
            <p className="text-muted mb-0">
                <a href="#" >
                  <span className="hs-tooltip-toggle !text-primary">
                    This link
                      <span
                          className="hs-tooltip-content ti-main-tooltip-content py-1 px-2 !bg-black !text-xs !font-medium !text-white shadow-sm"
                          role="tooltip">
                          Tooltip
                      </span>
                  </span>
                </a>
            </p>
          </div> and
          <div className="hs-tooltip ti-main-tooltip [--placement:top]">
            <p className="text-muted mb-0"> <a href="#" >
                  <span className="hs-tooltip-toggle !text-primary">
                    That link
                      <span
                          className="hs-tooltip-content ti-main-tooltip-content py-1 px-2 !bg-black !text-xs !font-medium !text-white shadow-sm"
                          role="tooltip">
                          Tooltip
                      </span>
                  </span>
                </a>
            </p>
          </div>
          have tooltips on hover.
        </div>
    </div>
    <div className="ti-modal-footer">
      <button type="button" className="hs-dropdown-toggle ti-btn ti-btn-secondary-full" data-hs-overlay="#exampleModalScrollable4">
        Close
      </button>
      <a className="ti-btn ti-btn-primary-full" href="#" >
        Save changes
      </a>
    </div>
  </div>
</div>
</div>
// End Prism Code//`;

export const modal7 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<button type="button" className="hs-dropdown-toggle ti-btn ti-btn-primary-full" data-hs-overlay="#exampleModalgrid">
Launch demo modal
</button>
<div id="exampleModalgrid" className="hs-overlay hidden ti-modal">
<div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out min-h-[calc(100%-3.5rem)] flex items-center">
  <div className="ti-modal-content w-full">
    <div className="ti-modal-header">
        <h6 className="modal-title text-[1rem] font-semibold">Modal title
        </h6>
      <button type="button" className="hs-dropdown-toggle ti-modal-close-btn" data-hs-overlay="#exampleModalgrid">
        <span className="sr-only">Close</span>
        <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor"/>
        </svg>
      </button>
    </div>
    <div className="ti-modal-body">
        <div className="container-fluid">
            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-sm bg-light border border-defaultborder dark:border-defaultborder/20 p-4">01</div>
              <div className="rounded-sm bg-light border border-defaultborder dark:border-defaultborder/20 p-4">02</div>
              <div className="rounded-sm bg-light border border-defaultborder dark:border-defaultborder/20 p-4">03</div>
              <div className="col-span-2 rounded-sm bg-light border border-defaultborder dark:border-defaultborder/20 p-4">04</div>
              <div className="rounded-sm bg-light border border-defaultborder dark:border-defaultborder/20 p-4">05</div>
              <div className="rounded-sm bg-light border border-defaultborder dark:border-defaultborder/20 p-4">06</div>
              <div className="col-span-2 rounded-sm bg-light border border-defaultborder dark:border-defaultborder/20 p-4">07</div>
            </div>
        </div>
    </div>
    <div className="ti-modal-footer">
      <button type="button" className="hs-dropdown-toggle ti-btn ti-btn-secondary-full" data-hs-overlay="#exampleModalgrid">
        Close
      </button>
      <a className="ti-btn ti-btn-primary-full" href="#" >
        Save changes
      </a>
    </div>
  </div>
</div>
</div>
// End Prism Code//`;

export const modal8 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<button type="button" className="hs-dropdown-toggle ti-btn ti-btn-primary-full" data-hs-overlay="#hs-toggle-between-modals-first-modal">
Open first modal
</button>
<div id="hs-toggle-between-modals-first-modal" className="hs-overlay hidden ti-modal">
<div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out">
  <div className="ti-modal-content">
    <div className="ti-modal-header">
      <h6 className="ti-modal-title">
        Modal 1
      </h6>
      <button type="button" className="hs-dropdown-toggle ti-modal-close-btn" data-hs-overlay="#hs-toggle-between-modals-first-modal" data-hs-overlay-close>
        <span className="sr-only">Close</span>
        <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor"/>
        </svg>
      </button>
    </div>
    <div className="ti-modal-body">
      <p className="mt-1 text-gray-800 dark:text-[#8c9097] dark:text-white/50">
        Show a second modal and hide this one with the button below.
      </p>
    </div>
    <div className="ti-modal-footer">
      <button type="button" className="ti-btn ti-btn-primary-full" data-hs-overlay="#hs-toggle-between-modals-second-modal">
        Open second modal
      </button>
    </div>
  </div>
</div>
</div>
<div id="hs-toggle-between-modals-second-modal" className="hs-overlay hidden ti-modal">
<div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out">
  <div className="ti-modal-content">
    <div className="ti-modal-header">
      <h6 className="ti-modal-title">
        Modal 2
      </h6>
      <button type="button" className="hs-dropdown-toggle ti-modal-close-btn" data-hs-overlay="#hs-toggle-between-modals-second-modal" data-hs-overlay-close>
        <span className="sr-only">Close</span>
        <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor"/>
        </svg>
      </button>
    </div>
    <div className="ti-modal-body">
      <p className="mt-1 text-gray-800 dark:text-[#8c9097] dark:text-white/50">
        Hide this modal and show the first with the button below.
      </p>
    </div>
    <div className="ti-modal-footer">
      <button type="button" className="ti-btn ti-btn-primary-full" data-hs-overlay="#hs-toggle-between-modals-first-modal">
        Back to first
      </button>
    </div>
  </div>
</div>
</div>
// End Prism Code//`;

export const modal9 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<button type="button" className="hs-dropdown-toggle ti-btn ti-btn-primary-full" data-hs-overlay="#hs-extralarge-modal">
Extra Large modal
</button>
<div id="hs-extralarge-modal" className="hs-overlay hidden ti-modal">
<div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out lg:!max-w-4xl lg:w-full m-3 lg:!mx-auto">
  <div className="ti-modal-content">
    <div className="ti-modal-header">
      <h6 className="ti-modal-title">
        Modal title
      </h6>
      <button type="button" className="hs-dropdown-toggle ti-modal-close-btn"
        data-hs-overlay="#hs-extralarge-modal">
        <span className="sr-only">Close</span>
        <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z"
            fill="currentColor" />
        </svg>
      </button>
    </div>
    <div className="ti-modal-body">
      <p className="mt-1 text-gray-800 dark:text-[#8c9097] dark:text-white/50">
       ...
      </p>
    </div>
  </div>
</div>
</div>
<button type="button" className="hs-dropdown-toggle ti-btn ti-btn-primary-full" data-hs-overlay="#hs-large-modal">
Large modal
</button>
<div id="hs-large-modal" className="hs-overlay hidden ti-modal">
<div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out md:!max-w-2xl md:w-full m-3 md:mx-auto">
  <div className="ti-modal-content">
    <div className="ti-modal-header">
      <h6 className="ti-modal-title">
        Modal title
      </h6>
      <button type="button" className="hs-dropdown-toggle ti-modal-close-btn"
        data-hs-overlay="#hs-large-modal">
        <span className="sr-only">Close</span>
        <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z"
            fill="currentColor" />
        </svg>
      </button>
    </div>
    <div className="ti-modal-body">
      <p className="mt-1 text-gray-800 dark:text-[#8c9097] dark:text-white/50">
       ...
      </p>
    </div>
  </div>
</div>
</div>
<button type="button" className="hs-dropdown-toggle ti-btn ti-btn-primary-full" data-hs-overlay="#hs-small-modal">
small modal
</button>
<div id="hs-small-modal" className="hs-overlay hidden ti-modal">
<div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out">
  <div className="ti-modal-content">
    <div className="ti-modal-header">
      <h6 className="ti-modal-title">
        Modal title
      </h6>
      <button type="button" className="hs-dropdown-toggle ti-modal-close-btn"
        data-hs-overlay="#hs-small-modal">
        <span className="sr-only">Close</span>
        <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z"
            fill="currentColor" />
        </svg>
      </button>
    </div>
    <div className="ti-modal-body">
      <p className="mt-1 text-gray-800 dark:text-[#8c9097] dark:text-white/50">
        ...
      </p>
    </div>
  </div>
</div>
</div>
// End Prism Code//`;

export const modal10 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<button type="button" className="hs-dropdown-toggle ti-btn ti-btn-primary-full" data-hs-overlay="#hs-slide-down-animation-modal">
Open modal
</button>
<div id="hs-slide-down-animation-modal" className="hs-overlay hidden ti-modal">
<div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out">
  <div className="ti-modal-content">
    <div className="ti-modal-header">
      <h6 className="ti-modal-title">
        Modal title
      </h6>
      <button type="button" className="hs-dropdown-toggle ti-modal-close-btn" data-hs-overlay="#hs-slide-down-animation-modal">
        <span className="sr-only">Close</span>
        <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor"></path>
        </svg>
      </button>
    </div>
    <div className="ti-modal-body">
      <p className="mt-1 text-gray-800 dark:text-white/70">
        This is a wider card with supporting text below as a natural lead-in to additional content.
      </p>
    </div>
    <div className="ti-modal-footer">
      <button type="button" className="hs-dropdown-toggle ti-btn ti-btn-secondary-full" data-hs-overlay="#hs-slide-down-animation-modal">
        Close
      </button>
      <a className="ti-btn ti-btn-primary-full" href="#" >
        Save changes
      </a>
    </div>
  </div>
</div>
</div>
// End Prism Code//`;

export const modal11 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<button type="button" className="hs-dropdown-toggle ti-btn ti-btn-primary-full" data-hs-overlay="#hs-slide-up-animation-modal">
Open modal
</button>

<div id="hs-slide-up-animation-modal" className="hs-overlay hidden ti-modal">
<div className="hs-overlay-open:!mt-7 !mt-14 ease-out ti-modal-box">
  <div className="ti-modal-content">
    <div className="ti-modal-header">
      <h6 className="ti-modal-title">
        Modal title
      </h6>
      <button type="button" className="hs-dropdown-toggle ti-modal-close-btn" data-hs-overlay="#hs-slide-up-animation-modal">
        <span className="sr-only">Close</span>
        <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor"></path>
        </svg>
      </button>
    </div>
    <div className="ti-modal-body">
      <p className="mt-1 text-gray-800 dark:text-white/70">
        This is a wider card with supporting text below as a natural lead-in to additional content.
      </p>
    </div>
    <div className="ti-modal-footer">
      <button type="button" className="hs-dropdown-toggle ti-btn ti-btn-secondary-full" data-hs-overlay="#hs-slide-up-animation-modal">
        Close
      </button>
      <a className="ti-btn ti-btn-primary-full" href="#" >
        Save changes
      </a>
    </div>
  </div>
</div>
</div>
// End Prism Code//`;

export const modal12 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<button type="button" className="hs-dropdown-toggle ti-btn ti-btn-primary-full" data-hs-overlay="#hs-focus-management-modal">
Open modal
</button>
<div id="hs-focus-management-modal" className="hs-overlay hidden ti-modal">
<div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out">
  <div className="ti-modal-content">
    <div className="ti-modal-header">
      <h6 className="ti-modal-title">
        Modal title
      </h6>
      <button type="button" className="hs-dropdown-toggle ti-modal-close-btn" data-hs-overlay="#hs-focus-management-modal">
        <span className="sr-only">Close</span>
        <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor"></path>
        </svg>
      </button>
    </div>
    <div className="ti-modal-body">
      <label htmlFor="input-label" className="ti-form-label">Email</label>
      <input type="email" id="input-label" className="ti-form-input" placeholder="you@site.com" autoFocus />
    </div>
    <div className="ti-modal-footer">
      <button type="button" className="hs-dropdown-toggle ti-btn ti-btn-secondary-full" data-hs-overlay="#hs-focus-management-modal">
        Close
      </button>
      <a className="ti-btn ti-btn-primary-full" href="#" >
        Save changes
      </a>
    </div>
  </div>
</div>
</div>
// End Prism Code//`;

export const modal13 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<button type="button" className="ti-btn ti-btn-primary-full" data-hs-overlay="#hs-stacked-overlays">
Open modal
</button>

<div id="hs-stacked-overlays" className="hs-overlay hidden ti-modal pointer-events-none">
<div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out">
  <div className="ti-modal-content pointer-events-auto">
    <div className="ti-modal-header">
      <h6 className="ti-modal-title">
        Modal title (level 1)
      </h6>
      <button type="button" className="ti-modal-close-btn" data-hs-overlay="#hs-stacked-overlays">
        <span className="sr-only">Close</span>
        <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
      </button>
    </div>

    <div className="ti-modal-body">
      <p className="mt-1 mb-2 text-gray-800 dark:text-white/70">
        Stacked Overlays modals are a user interface design concept where multiple overlay windows, or modals, are displayed on top of each other, typically in a web or app interface. These modals are often used to present additional information, confirm actions, or to guide users through multi-step processes. The key characteristic of Stacked Overlays is their layered appearance, where each new modal partially covers the previous one, creating a stack effect. This stacking can provide a visual cue to users about the depth of their interaction or the sequence of tasks. To maintain usability, these modals are designed with careful attention to transparency, size, and the ability to easily return to previous layers. They often incorporate animations for smooth transitions between layers and may include features like dimming the background to focus user attention on the active modal.
      </p>

      <button type="button" className="ti-btn ti-btn-primary-full" data-hs-overlay="#hs-stacked-overlays-2" data-hs-overlay-options="{
        &quot;isClosePrev&quot;: false
      }">
        Open modal
      </button>
    </div>

    <div className="ti-modal-footer">
      <button type="button" className="hs-dropdown-toggle ti-btn ti-btn-secondary-full" data-hs-overlay="#hs-stacked-overlays">
        Close
      </button>
      <button type="button" className="ti-btn ti-btn-primary-full">
        Save changes
      </button>
    </div>
  </div>
</div>
</div>

<div id="hs-stacked-overlays-2" className="hs-overlay hs-overlay-backdrop-open:bg-gray-900/70 hidden ti-modal z-[70] pointer-events-none">
<div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out">
  <div className="ti-modal-content pointer-events-auto">
    <div className="ti-modal-header">
      <h6 className="ti-modal-title">
        Modal title (level 2)
      </h6>
      <button type="button" className="flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-bodybg dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-white/10" data-hs-overlay="#hs-stacked-overlays-2" data-hs-overlay-options="{
        &quot;isClosePrev&quot;: false
      }">
        <span className="sr-only">Close</span>
        <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
      </button>
    </div>

    <div className="ti-modal-body">
      <p className="mt-1 mb-2 text-gray-800 dark:text-white/70">
        Stacked Overlays modals represent a design approach in user interfaces, where several overlay windows, known as modals, are layered on top of one another. This is commonly seen in web or mobile application interfaces.
      </p>

      <button type="button" className="ti-btn ti-btn-primary-full" data-hs-overlay="#hs-stacked-overlays-3" data-hs-overlay-options="{
        &quot;isClosePrev&quot;: false
      }">
        Open modal
      </button>
    </div>

    <div className="ti-modal-footer">
      <button type="button" className="hs-dropdown-toggle ti-btn ti-btn-secondary-full" data-hs-overlay="#hs-stacked-overlays-2" data-hs-overlay-options="{
        &quot;isClosePrev&quot;: false
      }">
        Close
      </button>
      <button type="button" className="ti-btn ti-btn-primary-full">
        Save changes
      </button>
    </div>
  </div>
</div>
</div>
<div id="hs-stacked-overlays-3" className="hs-overlay hs-overlay-backdrop-open:bg-gray-900/80 hidden ti-modal z-[80] pointer-events-none">
<div className="hs-overlay-open:mt-7 ti-modal-box ease-out">
  <div className="ti-modal-content pointer-events-auto ">
    <div className="ti-modal-header">
      <h6
       className="ti-modal-title">
        Modal title (level 3)
      </h6>
      <button type="button" className="flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-bodybg dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-white/10" data-hs-overlay="#hs-stacked-overlays-3" data-hs-overlay-options="{
        &quot;isClosePrev&quot;: false
      }">
        <span className="sr-only">Close</span>
        <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
      </button>
    </div>

    <div className="ti-modal-body">
      <p className="mt-1 text-gray-800 dark:text-white/70">
        Stacked Overlays: UI design with layered modals, often in web/apps, where each window overlays the previous one.
      </p>
    </div>

    <div className="ti-modal-footer">
      <button type="button" className="hs-dropdown-toggle ti-btn ti-btn-secondary-full" data-hs-overlay="#hs-stacked-overlays-3" data-hs-overlay-options="{
        &quot;isClosePrev&quot;: false
      }">
        Close
      </button>
      <button type="button" className="ti-btn ti-btn-primary-full">
        Save changes
      </button>
    </div>
  </div>
</div>
</div>
// End Prism Code//`;

export const modal14 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<button type="button" className="ti-btn ti-btn-primary-full" data-hs-overlay="#hs-custom-backdrop-modal">
Open modal
</button>
<div id="hs-custom-backdrop-modal" className="hs-overlay hs-overlay-backdrop-open:bg-primary/50 hidden ti-modal z-[80] pointer-events-none">
<div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out">
  <div className="ti-modal-content pointer-events-auto">
    <div className="ti-modal-header">
      <h6 className="ti-modal-title">
        Modal title
      </h6>
      <button type="button" className="flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-overlay="#hs-custom-backdrop-modal">
        <span className="sr-only">Close</span>
        <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
      </button>
    </div>
    <div className="ti-modal-body">
      <p className="mt-1 text-gray-800 dark:text-white/70">
        This is a wider card with supporting text below as a natural lead-in to additional content.
      </p>
    </div>
    <div className="ti-modal-footer">
      <button type="button" className="hs-dropdown-toggle hs-dropdown-toggle ti-btn ti-btn-secondary-full" data-hs-overlay="#hs-custom-backdrop-modal">
        Close
      </button>
      <a className="ti-btn ti-btn-primary-full" href="#" >
        Save changes
      </a>
    </div>
  </div>
</div>
</div>
// End Prism Code//`;

export const modal15 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<button type="button" className="m-1 ms-0 ti-btn ti-btn-primary-full" data-hs-overlay="#hs-full-screen-modal">
Full screen
</button>
<div id="hs-full-screen-modal" className="hs-overlay hidden ti-modal">
<div className="hs-overlay-open:mt-0 ti-modal-box mt-10 !m-0 !max-w-full !w-full">
  <div className="ti-modal-content !rounded-none">
    <div className="ti-modal-header">
      <h6 className="ti-modal-title">
        Full screen Modal
      </h6>
      <button type="button" className="hs-dropdown-toggle ti-modal-close-btn" data-hs-overlay="#hs-full-screen-modal">
        <span className="sr-only">Close</span>
        <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor"/>
        </svg>
      </button>
    </div>
    <div className="ti-modal-body">
      <p className="mt-1 text-gray-800 dark:text-[#8c9097] dark:text-white/50">
        ...
      </p>
    </div>
    <div className="ti-modal-footer">
      <button type="button" className="hs-dropdown-toggle ti-btn ti-btn-secondary-full" data-hs-overlay="#hs-full-screen-modal">
        Close
      </button>
    </div>
  </div>
</div>
</div>
<button type="button" className="m-1 ms-0 ti-btn ti-btn-secondary-full"  data-hs-overlay="#hs-full-screen-modal-below-sm">
Full screen below sm
</button>
<div id="hs-full-screen-modal-below-sm" className="hs-overlay hidden ti-modal">
<div className="hs-overlay-open:mt-0 ti-modal-box mt-10 max-w-full w-full !m-0 sm:hs-overlay-open:!mt-10 sm:!mt-0 sm:max-w-lg sm:!mx-auto">
  <div className="ti-modal-content sm:border sm:rounded-sm sm:shadow-sm dark:bg-bodybg sm:dark:border-white/10">
    <div className="ti-modal-header">
      <h6 className="ti-modal-title">
        Full screen below sm
      </h6>
      <button type="button" className="hs-dropdown-toggle ti-modal-close-btn"  data-hs-overlay="#hs-full-screen-modal-below-sm">
        <span className="sr-only">Close</span>
        <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor"/>
        </svg>
      </button>
    </div>
    <div className="ti-modal-body">
      <p className="mt-1 text-gray-800 dark:text-[#8c9097] dark:text-white/50">
        ...
      </p>
    </div>
    <div className="ti-modal-footer">
      <button type="button" className="hs-dropdown-toggle ti-btn ti-btn-secondary-full" data-hs-overlay="#hs-full-screen-modal">
          Close
        </button>
    </div>
  </div>
</div>
</div>
<button type="button" className="m-1 ms-0 ti-btn ti-btn-warning-full" data-hs-overlay="#hs-full-screen-modal-below-md">
Full screen below md
</button>
<div id="hs-full-screen-modal-below-md" className="hs-overlay hidden ti-modal">
<div className="hs-overlay-open:mt-0 ti-modal-box mt-10 !max-w-full w-full !m-0 md:hs-overlay-open:!mt-10 md:!mt-0 md:!max-w-lg md:!mx-auto">
  <div className="ti-modal-content md:border md:rounded-sm md:shadow-sm md:dark:border-white/10">
    <div className="ti-modal-header">
      <h6 className="ti-modal-title">
        Full screen below md
      </h6>
      <button type="button" className="hs-dropdown-toggle ti-modal-close-btn" data-hs-overlay="#hs-full-screen-modal-below-md">
        <span className="sr-only">Close</span>
        <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor"/>
        </svg>
      </button>
    </div>
    <div className="ti-modal-body">
      <p className="mt-1 text-gray-800 dark:text-[#8c9097] dark:text-white/50">
        ...
      </p>
    </div>
    <div className="ti-modal-footer">
      <button type="button" className="hs-dropdown-toggle ti-btn ti-btn-secondary-full" data-hs-overlay="#hs-full-screen-modal">
          Close
        </button>
    </div>
  </div>
</div>
</div>
<button type="button" className="m-1 ms-0 ti-btn ti-btn-secondary-full" data-hs-overlay="#hs-full-screen-modal-below-lg">
Full screen below lg
</button>
<div id="hs-full-screen-modal-below-lg" className="hs-overlay hidden ti-modal">
<div className="hs-overlay-open:mt-0 ti-modal-box mt-10 !max-w-full w-full !m-0 lg:hs-overlay-open:!mt-10 lg:!mt-0 lg:!max-w-lg lg:!mx-auto">
  <div className="ti-modal-content lg:border lg:rounded-sm lg:shadow-sm lg:dark:border-white/10">
    <div className="ti-modal-header">
      <h6 className="ti-modal-title">
        Full screen below lg
      </h6>
      <button type="button" className="hs-dropdown-toggle ti-modal-close-btn" data-hs-overlay="#hs-full-screen-modal-below-lg">
        <span className="sr-only">Close</span>
        <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor"/>
        </svg>
      </button>
    </div>
    <div className="ti-modal-body">
      <p className="mt-1 text-gray-800 dark:text-[#8c9097] dark:text-white/50">
        ...
      </p>
    </div>
    <div className="ti-modal-footer">
      <button type="button" className="hs-dropdown-toggle ti-btn ti-btn-secondary-full" data-hs-overlay="#hs-full-screen-modal">
          Close
        </button>
    </div>
  </div>
</div>
</div>
<button type="button" className="m-1 ms-0 ti-btn ti-btn-success-full" data-hs-overlay="#hs-full-screen-modal-below-xl">
Full screen below xl
</button>
<div id="hs-full-screen-modal-below-xl" className="hs-overlay hidden ti-modal">
<div className="hs-overlay-open:mt-0 ti-modal-box mt-10 !max-w-full w-full !m-0  xl:hs-overlay-open:!mt-10 xl:!mt-0 xl:!max-w-xl xl:!mx-auto">
  <div className="ti-modal-content xl:border xl:rounded-sm xl:shadow-sm xl:dark:border-white/10">
    <div className="ti-modal-header">
      <h6 className="ti-modal-title">
        Full screen below xl
      </h6>
      <button type="button" className="hs-dropdown-toggle ti-modal-close-btn" data-hs-overlay="#hs-full-screen-modal-below-xl">
        <span className="sr-only">Close</span>
        <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor"/>
        </svg>
      </button>
    </div>
    <div className="ti-modal-body">
      <p className="mt-1 text-gray-800 dark:text-[#8c9097] dark:text-white/50">
        ...
      </p>
    </div>
    <div className="ti-modal-footer">
      <button type="button" className="hs-dropdown-toggle ti-btn ti-btn-secondary-full" data-hs-overlay="#hs-full-screen-modal">
          Close
        </button>
    </div>
  </div>
</div>
</div>
<button type="button" className="m-1 ms-0 ti-btn ti-btn-danger-full" data-hs-overlay="#hs-full-screen-modal-below-xxl">
  Full screen below xxl
</button>
<div id="hs-full-screen-modal-below-xxl" className="hs-overlay hidden ti-modal">
<div className="hs-overlay-open:mt-0 ti-modal-box mt-10 !max-w-full w-full !m-0  xxl:hs-overlay-open:!mt-10 xxl:!mt-0 xxl:!max-w-xl xxl:!mx-auto">
  <div className="ti-modal-content xxl:border xxl:rounded-sm xxl:shadow-sm xxl:dark:border-white/10">
    <div className="ti-modal-header">
      <h6 className="ti-modal-title">
        Full screen below xxl
      </h6>
      <button type="button" className="hs-dropdown-toggle ti-modal-close-btn" data-hs-overlay="#hs-full-screen-modal-below-xl">
        <span className="sr-only">Close</span>
        <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor"/>
        </svg>
      </button>
    </div>
    <div className="ti-modal-body">
      <p className="mt-1 text-gray-800 dark:text-[#8c9097] dark:text-white/50">
        ...
      </p>
    </div>
    <div className="ti-modal-footer">
      <button type="button" className="hs-dropdown-toggle ti-btn ti-btn-secondary-full" data-hs-overlay="#hs-full-screen-modal">
          Close
        </button>
    </div>
  </div>
</div>
</div>
// End Prism Code//`;

export const modal16 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<button type="button" className="hs-dropdown-toggle !text-[1.5rem] !font-medium text-[#8c9097] dark:text-white/50 hover:text-defaulttextcolor" data-hs-overlay="#formmodalmdo">
<span className="sr-only">Close</span>
<i className="ri-close-line"></i>
</button>
// End Prism Code//`;

export const modal17 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<button type="button" className="hs-dropdown-toggle !text-[1.5rem] !font-medium text-[#8c9097] dark:text-white/50/25 pointer-events-none" data-hs-overlay="#formmodalmdo">
<span className="sr-only">Close</span>
<i className="ri-close-line"></i>
</button>
// End Prism Code//`;

export const modal18 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<button type="button" className="hs-dropdown-toggle !text-[1.5rem] !font-medium text-[#8c9097] dark:text-white/50 hover:text-[#8c9097]" data-hs-overlay="#formmodalmdo">
<span className="sr-only">Close</span>
<i className="ri-close-line"></i>
</button>
<button type="button" className="hs-dropdown-toggle !text-[1.5rem] !font-medium text-[#8c9097] dark:text-white/50/25 pointer-events-none" data-hs-overlay="#formmodalmdo">
<span className="sr-only">Close</span>
<i className="ri-close-line"></i>
</button>
// End Prism Code//`;

 //OffCanvas

export const offcanvas1 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<<button type="button" className="ti-btn ti-btn-primary-full" data-hs-overlay="#hs-overlay-example">
Button
</button>
<div id="hs-overlay-example" className="hs-overlay hidden ti-offcanvas ti-offcanvas-left !z-[105]" tabIndex={-1}>
<div className="ti-offcanvas-header">
    <h6 className="ti-offcanvas-title">
      Notifications
    </h6>
    <button type="button" className="ti-btn flex-shrink-0 p-0 transition-none text-gray-500 hover:text-gray-700 focus:ring-gray-400 focus:ring-offset-white dark:text-[#8c9097] dark:text-white/50 dark:hover:text-white/80 dark:focus:ring-white/10 dark:focus:ring-offset-white/10" data-hs-overlay="#hs-overlay-example">
        <span className="sr-only">Close modal</span>
        <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor"></path>
        </svg>
    </button>
</div>
<div className="ti-offcanvas-body !h-[90%] !p-0">
    <div>
        <ul className="list-group list-group-flush mb-0">
            <li className="list-group-item !border-t-0">
              <div className="flex items-center">
                  <div className="me-2">
                      <span className="avatar avatar-md bg-primary !rounded-full text-white">
                          NW
                      </span>
                  </div>
                  <div className="flex-grow">
                      <p className="font-semibold mb-0">New Website Created<span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">20 Nov 2022</span></p>
                      <span className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i className="ri-time-line align-middle me-1 inline-block"></i>30 mins ago</span>
                  </div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="flex items-center">
                  <div className="me-2">
                      <span className="avatar avatar-md bg-danger !rounded-full text-white">
                          CH
                      </span>
                  </div>
                  <div className="flex-grow">
                      <p className="font-semibold mb-0">Prepare for the new project<span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">3 Jan 2023</span></p>
                      <span className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i className="ri-time-line align-middle me-1 inline-block"></i>2 hrs ago</span>
                  </div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="flex items-center">
                  <div className="me-2">
                      <span className="avatar avatar-md bg-info !rounded-full text-white">
                          S
                      </span>
                  </div>
                  <div className="flex-grow">
                      <p className="font-semibold mb-0">Decide the live discussion<span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">17 Feb 2023</span></p>
                      <span className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i className="ri-time-line align-middle me-1 inline-block"></i>3 hrs ago</span>
                  </div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="flex items-center">
                  <div className="me-2">
                      <span className="avatar avatar-md !rounded-full">
                          <img src={face12} alt="" className="!rounded-full"/>
                      </span>
                  </div>
                  <div className="flex-grow">
                      <p className="font-semibold mb-0">Meeting at 3:00 pm<span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">29 Dec 2022</span></p>
                      <span className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i className="ri-time-line align-middle me-1 inline-block"></i>4 hrs ago</span>
                  </div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="flex items-center">
                  <div className="me-2">
                      <span className="avatar avatar-md bg-success text-white !rounded-full">
                          RC
                      </span>
                  </div>
                  <div className="flex-grow">
                      <p className="font-semibold mb-0">Prepare for presentation<span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">31 Dec 2022</span></p>
                      <span className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i className="ri-time-line align-middle me-1 inline-block"></i>4 hrs ago</span>
                  </div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="flex items-center">
                  <div className="me-2">
                      <span className="avatar avatar-md !rounded-full">
                          <img src={face1} alt="" className="!rounded-full"/>
                      </span>
                  </div>
                  <div className="flex-grow">
                      <p className="font-semibold mb-0">Brenda New product launching<span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">1 Jan 2023</span></p>
                      <span className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i className="ri-time-line align-middle me-1 inline-block"></i>7 hrs ago</span>
                  </div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="flex items-center">
                  <div className="me-2">
                      <span className="avatar avatar-md bg-secondary text-white !rounded-full">
                          M
                      </span>
                  </div>
                  <div className="flex-grow">
                      <p className="font-semibold mb-0">Medeleine Hey! there i'm available<span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">5 Jan 2023</span></p>
                      <span className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i className="ri-time-line align-middle me-1 inline-block"></i>3 hrs ago</span>
                  </div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="flex items-center">
                  <div className="me-2">
                      <span className="avatar avatar-md bg-info !rounded-full text-white">
                          OL
                      </span>
                  </div>
                  <div className="flex-grow">
                      <p className="font-semibold mb-0">Olivia New schedule release<span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">6 Jan 2023</span></p>
                      <span className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i className="ri-time-line align-middle me-1 inline-block"></i>45 mins ago</span>
                  </div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="flex items-center">
                  <div className="me-2">
                      <span className="avatar avatar-md bg-warning text-white !rounded-full">
                          A
                      </span>
                  </div>
                  <div className="flex-grow">
                      <p className="font-semibold mb-0">Kamala Preparing for new admin launch<span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">7 Jan 2023</span></p>
                      <span className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i className="ri-time-line align-middle me-1 inline-block"></i>28 mins ago</span>
                  </div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="flex items-center">
                  <div className="me-2">
                      <span className="avatar avatar-md !rounded-full">
                          <img src={face6} alt="" className="!rounded-full"/>
                      </span>
                  </div>
                  <div className="flex-grow">
                      <p className="font-semibold mb-0">Oisha Meeting with clinet for dinner<span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">10 Jan 2023</span></p>
                      <span className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i className="ri-time-line align-middle me-1 inline-block"></i>14 hrs ago</span>
                  </div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="flex items-center">
                  <div className="me-2">
                      <span className="avatar avatar-md bg-danger !rounded-full text-white">
                          CH
                      </span>
                  </div>
                  <div className="flex-grow">
                      <p className="font-semibold mb-0">Prepare for the new project<span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">3 Jan 2023</span></p>
                      <span className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i className="ri-time-line align-middle me-1 inline-block"></i>2 hrs ago</span>
                  </div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="flex items-center">
                  <div className="me-2">
                      <span className="avatar avatar-md bg-info !rounded-full text-white">
                          S
                      </span>
                  </div>
                  <div className="flex-grow">
                      <p className="font-semibold mb-0">Decide the live discussion<span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">17 Feb 2023</span></p>
                      <span className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i className="ri-time-line align-middle me-1 inline-block"></i>3 hrs ago</span>
                  </div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="flex items-center">
                  <div className="me-2">
                      <span className="avatar avatar-md !rounded-full">
                          <img src={face14} alt="" className="!rounded-full"/>
                      </span>
                  </div>
                  <div className="flex-grow">
                      <p className="font-semibold mb-0">Meeting at 3:00 pm<span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">29 Dec 2022</span></p>
                      <span className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i className="ri-time-line align-middle me-1 inline-block"></i>4 hrs ago</span>
                  </div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="flex items-center">
                  <div className="me-2">
                      <span className="avatar avatar-md bg-success text-white !rounded-full">
                          RC
                      </span>
                  </div>
                  <div className="flex-grow">
                      <p className="font-semibold mb-0">Prepare for presentation<span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">31 Dec 2022</span></p>
                      <span className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i className="ri-time-line align-middle me-1 inline-block"></i>4 hrs ago</span>
                  </div>
              </div>
            </li>
        </ul>
      </div>
</div>
</div>
// End Prism Code//`;

export const offcanvas2 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<button type="button" className="m-1 ms-0 ti-btn ti-btn-primary-full" data-hs-overlay="#hs-overlay-body-scrolling">
Enable body scrolling
</button>
<div id="hs-overlay-body-scrolling" className="hs-overlay ti-offcanvas ti-offcanvas-left hidden [--body-scroll:true] [--overlay-backdrop:false] !z-[105]"  tabIndex={-1}>
<div className="ti-offcanvas-header">
  <h6 className="ti-offcanvas-title">
    Notifications
  </h6>
  <button type="button" className="ti-btn flex-shrink-0 p-0 transition-none text-gray-500 hover:text-gray-700 focus:ring-gray-400 focus:ring-offset-white dark:text-[#8c9097] dark:text-white/50 dark:hover:text-white/80 dark:focus:ring-white/10 dark:focus:ring-offset-white/10" data-hs-overlay="#hs-overlay-body-scrolling">
      <span className="sr-only">Close modal</span>
      <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor"></path>
      </svg>
  </button>
</div>
<div className="ti-offcanvas-body !h-[90%] !p-0">
<div>
    <ul className="list-group list-group-flush mb-0">
        <li className="list-group-item !border-t-0">
          <div className="flex items-center">
              <div className="me-2">
                  <span className="avatar avatar-md bg-primary !rounded-full text-white">
                      NW
                  </span>
              </div>
              <div className="flex-grow">
                  <p className="font-semibold mb-0">New Website Created<span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">20 Nov 2022</span></p>
                  <span className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i className="ri-time-line align-middle me-1 inline-block"></i>30 mins ago</span>
              </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="flex items-center">
              <div className="me-2">
                  <span className="avatar avatar-md bg-danger !rounded-full text-white">
                      CH
                  </span>
              </div>
              <div className="flex-grow">
                  <p className="font-semibold mb-0">Prepare for the new project<span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">3 Jan 2023</span></p>
                  <span className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i className="ri-time-line align-middle me-1 inline-block"></i>2 hrs ago</span>
              </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="flex items-center">
              <div className="me-2">
                  <span className="avatar avatar-md bg-info !rounded-full text-white">
                      S
                  </span>
              </div>
              <div className="flex-grow">
                  <p className="font-semibold mb-0">Decide the live discussion<span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">17 Feb 2023</span></p>
                  <span className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i className="ri-time-line align-middle me-1 inline-block"></i>3 hrs ago</span>
              </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="flex items-center">
              <div className="me-2">
                  <span className="avatar avatar-md !rounded-full">
                      <img src={face12} alt="" className="!rounded-full"/>
                  </span>
              </div>
              <div className="flex-grow">
                  <p className="font-semibold mb-0">Meeting at 3:00 pm<span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">29 Dec 2022</span></p>
                  <span className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i className="ri-time-line align-middle me-1 inline-block"></i>4 hrs ago</span>
              </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="flex items-center">
              <div className="me-2">
                  <span className="avatar avatar-md bg-success text-white !rounded-full">
                      RC
                  </span>
              </div>
              <div className="flex-grow">
                  <p className="font-semibold mb-0">Prepare for presentation<span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">31 Dec 2022</span></p>
                  <span className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i className="ri-time-line align-middle me-1 inline-block"></i>4 hrs ago</span>
              </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="flex items-center">
              <div className="me-2">
                  <span className="avatar avatar-md !rounded-full">
                      <img src={face1} alt="" className="!rounded-full"/>
                  </span>
              </div>
              <div className="flex-grow">
                  <p className="font-semibold mb-0">Brenda New product launching<span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">1 Jan 2023</span></p>
                  <span className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i className="ri-time-line align-middle me-1 inline-block"></i>7 hrs ago</span>
              </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="flex items-center">
              <div className="me-2">
                  <span className="avatar avatar-md bg-secondary text-white !rounded-full">
                      M
                  </span>
              </div>
              <div className="flex-grow">
                  <p className="font-semibold mb-0">Medeleine Hey! there i'm available<span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">5 Jan 2023</span></p>
                  <span className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i className="ri-time-line align-middle me-1 inline-block"></i>3 hrs ago</span>
              </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="flex items-center">
              <div className="me-2">
                  <span className="avatar avatar-md bg-info !rounded-full text-white">
                      OL
                  </span>
              </div>
              <div className="flex-grow">
                  <p className="font-semibold mb-0">Olivia New schedule release<span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">6 Jan 2023</span></p>
                  <span className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i className="ri-time-line align-middle me-1 inline-block"></i>45 mins ago</span>
              </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="flex items-center">
              <div className="me-2">
                  <span className="avatar avatar-md bg-warning text-white !rounded-full">
                      A
                  </span>
              </div>
              <div className="flex-grow">
                  <p className="font-semibold mb-0">Kamala Preparing for new admin launch<span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">7 Jan 2023</span></p>
                  <span className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i className="ri-time-line align-middle me-1 inline-block"></i>28 mins ago</span>
              </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="flex items-center">
              <div className="me-2">
                  <span className="avatar avatar-md !rounded-full">
                      <img src={face6} alt="" className="!rounded-full"/>
                  </span>
              </div>
              <div className="flex-grow">
                  <p className="font-semibold mb-0">Oisha Meeting with clinet for dinner<span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">10 Jan 2023</span></p>
                  <span className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i className="ri-time-line align-middle me-1 inline-block"></i>14 hrs ago</span>
              </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="flex items-center">
              <div className="me-2">
                  <span className="avatar avatar-md bg-danger !rounded-full text-white">
                      CH
                  </span>
              </div>
              <div className="flex-grow">
                  <p className="font-semibold mb-0">Prepare for the new project<span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">3 Jan 2023</span></p>
                  <span className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i className="ri-time-line align-middle me-1 inline-block"></i>2 hrs ago</span>
              </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="flex items-center">
              <div className="me-2">
                  <span className="avatar avatar-md bg-info !rounded-full text-white">
                      S
                  </span>
              </div>
              <div className="flex-grow">
                  <p className="font-semibold mb-0">Decide the live discussion<span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">17 Feb 2023</span></p>
                  <span className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i className="ri-time-line align-middle me-1 inline-block"></i>3 hrs ago</span>
              </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="flex items-center">
              <div className="me-2">
                  <span className="avatar avatar-md !rounded-full">
                      <img src={face14} alt="" className="!rounded-full"/>
                  </span>
              </div>
              <div className="flex-grow">
                  <p className="font-semibold mb-0">Meeting at 3:00 pm<span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">29 Dec 2022</span></p>
                  <span className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i className="ri-time-line align-middle me-1 inline-block"></i>4 hrs ago</span>
              </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="flex items-center">
              <div className="me-2">
                  <span className="avatar avatar-md bg-success text-white !rounded-full">
                      RC
                  </span>
              </div>
              <div className="flex-grow">
                  <p className="font-semibold mb-0">Prepare for presentation<span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">31 Dec 2022</span></p>
                  <span className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i className="ri-time-line align-middle me-1 inline-block"></i>4 hrs ago</span>
              </div>
          </div>
        </li>
    </ul>
  </div>
</div>
</div>
// End Prism Code//`;

export const offcanvas3 = `//<!-- Prism Code: This code is only used for showcode purpose -->//

<button type="button" className="m-1 ms-0 ti-btn ti-btn-primary-full" data-hs-overlay="#hs-overlay-backdrop-default">
Enable backdrop
</button>

<div id="hs-overlay-backdrop-default" className="hs-overlay ti-offcanvas ti-offcanvas-left hidden !z-[105]" tabIndex={-1}>
<div className="ti-offcanvas-header">
   <h6 className="ti-offcanvas-title">
     Notifications
   </h6>
   <button type="button" className="ti-btn flex-shrink-0 p-0 transition-none text-gray-500 hover:text-gray-700 focus:ring-gray-400 focus:ring-offset-white dark:text-[#8c9097] dark:text-white/50 dark:hover:text-white/80 dark:focus:ring-white/10 dark:focus:ring-offset-white/10" data-hs-overlay="#hs-overlay-backdrop-default">
       <span className="sr-only">Close modal</span>
       <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
       <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor"></path>
       </svg>
   </button>
</div>
<div className="ti-offcanvas-body !h-[90%] !p-0">
 <div>
     <ul className="list-group list-group-flush mb-0">
         <li className="list-group-item !border-t-0">
           <div className="flex items-center">
               <div className="me-2">
                   <span className="avatar avatar-md bg-primary !rounded-full text-white">
                       NW
                   </span>
               </div>
               <div className="flex-grow">
                   <p className="font-semibold mb-0">New Website Created<span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">20 Nov 2022</span></p>
                   <span className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i className="ri-time-line align-middle me-1 inline-block"></i>30 mins ago</span>
               </div>
           </div>
         </li>
         <li className="list-group-item">
           <div className="flex items-center">
               <div className="me-2">
                   <span className="avatar avatar-md bg-danger !rounded-full text-white">
                       CH
                   </span>
               </div>
               <div className="flex-grow">
                   <p className="font-semibold mb-0">Prepare for the new project<span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">3 Jan 2023</span></p>
                   <span className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i className="ri-time-line align-middle me-1 inline-block"></i>2 hrs ago</span>
               </div>
           </div>
         </li>
         <li className="list-group-item">
           <div className="flex items-center">
               <div className="me-2">
                   <span className="avatar avatar-md bg-info !rounded-full text-white">
                       S
                   </span>
               </div>
               <div className="flex-grow">
                   <p className="font-semibold mb-0">Decide the live discussion<span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">17 Feb 2023</span></p>
                   <span className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i className="ri-time-line align-middle me-1 inline-block"></i>3 hrs ago</span>
               </div>
           </div>
         </li>
         <li className="list-group-item">
           <div className="flex items-center">
               <div className="me-2">
                   <span className="avatar avatar-md !rounded-full">
                       <img src={face12} alt="" className="!rounded-full"/>
                   </span>
               </div>
               <div className="flex-grow">
                   <p className="font-semibold mb-0">Meeting at 3:00 pm<span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">29 Dec 2022</span></p>
                   <span className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i className="ri-time-line align-middle me-1 inline-block"></i>4 hrs ago</span>
               </div>
           </div>
         </li>
         <li className="list-group-item">
           <div className="flex items-center">
               <div className="me-2">
                   <span className="avatar avatar-md bg-success text-white !rounded-full">
                       RC
                   </span>
               </div>
               <div className="flex-grow">
                   <p className="font-semibold mb-0">Prepare for presentation<span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">31 Dec 2022</span></p>
                   <span className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i className="ri-time-line align-middle me-1 inline-block"></i>4 hrs ago</span>
               </div>
           </div>
         </li>
         <li className="list-group-item">
           <div className="flex items-center">
               <div className="me-2">
                   <span className="avatar avatar-md !rounded-full">
                       <img src={face1} alt="" className="!rounded-full"/>
                   </span>
               </div>
               <div className="flex-grow">
                   <p className="font-semibold mb-0">Brenda New product launching<span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">1 Jan 2023</span></p>
                   <span className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i className="ri-time-line align-middle me-1 inline-block"></i>7 hrs ago</span>
               </div>
           </div>
         </li>
         <li className="list-group-item">
           <div className="flex items-center">
               <div className="me-2">
                   <span className="avatar avatar-md bg-secondary text-white !rounded-full">
                       M
                   </span>
               </div>
               <div className="flex-grow">
                   <p className="font-semibold mb-0">Medeleine Hey! there i'm available<span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">5 Jan 2023</span></p>
                   <span className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i className="ri-time-line align-middle me-1 inline-block"></i>3 hrs ago</span>
               </div>
           </div>
         </li>
         <li className="list-group-item">
           <div className="flex items-center">
               <div className="me-2">
                   <span className="avatar avatar-md bg-info !rounded-full text-white">
                       OL
                   </span>
               </div>
               <div className="flex-grow">
                   <p className="font-semibold mb-0">Olivia New schedule release<span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">6 Jan 2023</span></p>
                   <span className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i className="ri-time-line align-middle me-1 inline-block"></i>45 mins ago</span>
               </div>
           </div>
         </li>
         <li className="list-group-item">
           <div className="flex items-center">
               <div className="me-2">
                   <span className="avatar avatar-md bg-warning text-white !rounded-full">
                       A
                   </span>
               </div>
               <div className="flex-grow">
                   <p className="font-semibold mb-0">Kamala Preparing for new admin launch<span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">7 Jan 2023</span></p>
                   <span className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i className="ri-time-line align-middle me-1 inline-block"></i>28 mins ago</span>
               </div>
           </div>
         </li>
         <li className="list-group-item">
           <div className="flex items-center">
               <div className="me-2">
                   <span className="avatar avatar-md !rounded-full">
                       <img src={face6} alt="" className="!rounded-full"/>
                   </span>
               </div>
               <div className="flex-grow">
                   <p className="font-semibold mb-0">Oisha Meeting with clinet for dinner<span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">10 Jan 2023</span></p>
                   <span className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i className="ri-time-line align-middle me-1 inline-block"></i>14 hrs ago</span>
               </div>
           </div>
         </li>
         <li className="list-group-item">
           <div className="flex items-center">
               <div className="me-2">
                   <span className="avatar avatar-md bg-danger !rounded-full text-white">
                       CH
                   </span>
               </div>
               <div className="flex-grow">
                   <p className="font-semibold mb-0">Prepare for the new project<span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">3 Jan 2023</span></p>
                   <span className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i className="ri-time-line align-middle me-1 inline-block"></i>2 hrs ago</span>
               </div>
           </div>
         </li>
         <li className="list-group-item">
           <div className="flex items-center">
               <div className="me-2">
                   <span className="avatar avatar-md bg-info !rounded-full text-white">
                       S
                   </span>
               </div>
               <div className="flex-grow">
                   <p className="font-semibold mb-0">Decide the live discussion<span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">17 Feb 2023</span></p>
                   <span className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i className="ri-time-line align-middle me-1 inline-block"></i>3 hrs ago</span>
               </div>
           </div>
         </li>
         <li className="list-group-item">
           <div className="flex items-center">
               <div className="me-2">
                   <span className="avatar avatar-md !rounded-full">
                       <img src={face14} alt="" className="!rounded-full"/>
                   </span>
               </div>
               <div className="flex-grow">
                   <p className="font-semibold mb-0">Meeting at 3:00 pm<span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">29 Dec 2022</span></p>
                   <span className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i className="ri-time-line align-middle me-1 inline-block"></i>4 hrs ago</span>
               </div>
           </div>
         </li>
         <li className="list-group-item">
           <div className="flex items-center">
               <div className="me-2">
                   <span className="avatar avatar-md bg-success text-white !rounded-full">
                       RC
                   </span>
               </div>
               <div className="flex-grow">
                   <p className="font-semibold mb-0">Prepare for presentation<span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">31 Dec 2022</span></p>
                   <span className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i className="ri-time-line align-middle me-1 inline-block"></i>4 hrs ago</span>
               </div>
           </div>
         </li>
     </ul>
   </div>
</div>
</div>
// End Prism Code//`;

export const offcanvas4 = `//<!-- Prism Code: This code is only used for showcode purpose -->//

<button type="button" className="m-1 ms-0 ti-btn ti-btn-primary-full" data-hs-overlay="#hs-overlay-backdrop-with-scrolling">
Enable both scrolling &amp; backdrop
</button>

<div id="hs-overlay-backdrop-with-scrolling" className="hs-overlay ti-offcanvas ti-offcanvas-left hidden !z-[105] [--body-scroll:true]" tabIndex={-1} data-hs-overlay-scroll="true">
<div className="ti-offcanvas-header">
  <h6 className="ti-offcanvas-title">
    Notifications
  </h6>
  <button type="button" className="ti-btn flex-shrink-0 p-0 transition-none text-gray-500 hover:text-gray-700 focus:ring-gray-400 focus:ring-offset-white dark:text-[#8c9097] dark:text-white/50 dark:hover:text-white/80 dark:focus:ring-white/10 dark:focus:ring-offset-white/10" data-hs-overlay="#hs-overlay-backdrop-with-scrolling">
      <span className="sr-only">Close modal</span>
      <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor"></path>
      </svg>
  </button>
</div>
<div className="ti-offcanvas-body !h-[90%] !p-0">
<div>
    <ul className="list-group list-group-flush mb-0">
        <li className="list-group-item !border-t-0">
          <div className="flex items-center">
              <div className="me-2">
                  <span className="avatar avatar-md bg-primary !rounded-full text-white">
                      NW
                  </span>
              </div>
              <div className="flex-grow">
                  <p className="font-semibold mb-0">New Website Created<span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">20 Nov 2022</span></p>
                  <span className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i className="ri-time-line align-middle me-1 inline-block"></i>30 mins ago</span>
              </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="flex items-center">
              <div className="me-2">
                  <span className="avatar avatar-md bg-danger !rounded-full text-white">
                      CH
                  </span>
              </div>
              <div className="flex-grow">
                  <p className="font-semibold mb-0">Prepare for the new project<span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">3 Jan 2023</span></p>
                  <span className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i className="ri-time-line align-middle me-1 inline-block"></i>2 hrs ago</span>
              </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="flex items-center">
              <div className="me-2">
                  <span className="avatar avatar-md bg-info !rounded-full text-white">
                      S
                  </span>
              </div>
              <div className="flex-grow">
                  <p className="font-semibold mb-0">Decide the live discussion<span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">17 Feb 2023</span></p>
                  <span className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i className="ri-time-line align-middle me-1 inline-block"></i>3 hrs ago</span>
              </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="flex items-center">
              <div className="me-2">
                  <span className="avatar avatar-md !rounded-full">
                      <img src={face12} alt="" className="!rounded-full"/>
                  </span>
              </div>
              <div className="flex-grow">
                  <p className="font-semibold mb-0">Meeting at 3:00 pm<span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">29 Dec 2022</span></p>
                  <span className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i className="ri-time-line align-middle me-1 inline-block"></i>4 hrs ago</span>
              </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="flex items-center">
              <div className="me-2">
                  <span className="avatar avatar-md bg-success text-white !rounded-full">
                      RC
                  </span>
              </div>
              <div className="flex-grow">
                  <p className="font-semibold mb-0">Prepare for presentation<span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">31 Dec 2022</span></p>
                  <span className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i className="ri-time-line align-middle me-1 inline-block"></i>4 hrs ago</span>
              </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="flex items-center">
              <div className="me-2">
                  <span className="avatar avatar-md !rounded-full">
                      <img src={face1} alt="" className="!rounded-full"/>
                  </span>
              </div>
              <div className="flex-grow">
                  <p className="font-semibold mb-0">Brenda New product launching<span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">1 Jan 2023</span></p>
                  <span className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i className="ri-time-line align-middle me-1 inline-block"></i>7 hrs ago</span>
              </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="flex items-center">
              <div className="me-2">
                  <span className="avatar avatar-md bg-secondary text-white !rounded-full">
                      M
                  </span>
              </div>
              <div className="flex-grow">
                  <p className="font-semibold mb-0">Medeleine Hey! there i'm available<span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">5 Jan 2023</span></p>
                  <span className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i className="ri-time-line align-middle me-1 inline-block"></i>3 hrs ago</span>
              </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="flex items-center">
              <div className="me-2">
                  <span className="avatar avatar-md bg-info !rounded-full text-white">
                      OL
                  </span>
              </div>
              <div className="flex-grow">
                  <p className="font-semibold mb-0">Olivia New schedule release<span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">6 Jan 2023</span></p>
                  <span className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i className="ri-time-line align-middle me-1 inline-block"></i>45 mins ago</span>
              </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="flex items-center">
              <div className="me-2">
                  <span className="avatar avatar-md bg-warning text-white !rounded-full">
                      A
                  </span>
              </div>
              <div className="flex-grow">
                  <p className="font-semibold mb-0">Kamala Preparing for new admin launch<span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">7 Jan 2023</span></p>
                  <span className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i className="ri-time-line align-middle me-1 inline-block"></i>28 mins ago</span>
              </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="flex items-center">
              <div className="me-2">
                  <span className="avatar avatar-md !rounded-full">
                      <img src={face6} alt="" className="!rounded-full"/>
                  </span>
              </div>
              <div className="flex-grow">
                  <p className="font-semibold mb-0">Oisha Meeting with clinet for dinner<span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">10 Jan 2023</span></p>
                  <span className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i className="ri-time-line align-middle me-1 inline-block"></i>14 hrs ago</span>
              </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="flex items-center">
              <div className="me-2">
                  <span className="avatar avatar-md bg-danger !rounded-full text-white">
                      CH
                  </span>
              </div>
              <div className="flex-grow">
                  <p className="font-semibold mb-0">Prepare for the new project<span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">3 Jan 2023</span></p>
                  <span className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i className="ri-time-line align-middle me-1 inline-block"></i>2 hrs ago</span>
              </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="flex items-center">
              <div className="me-2">
                  <span className="avatar avatar-md bg-info !rounded-full text-white">
                      S
                  </span>
              </div>
              <div className="flex-grow">
                  <p className="font-semibold mb-0">Decide the live discussion<span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">17 Feb 2023</span></p>
                  <span className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i className="ri-time-line align-middle me-1 inline-block"></i>3 hrs ago</span>
              </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="flex items-center">
              <div className="me-2">
                  <span className="avatar avatar-md !rounded-full">
                      <img src={face14} alt="" className="!rounded-full"/>
                  </span>
              </div>
              <div className="flex-grow">
                  <p className="font-semibold mb-0">Meeting at 3:00 pm<span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">29 Dec 2022</span></p>
                  <span className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i className="ri-time-line align-middle me-1 inline-block"></i>4 hrs ago</span>
              </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="flex items-center">
              <div className="me-2">
                  <span className="avatar avatar-md bg-success text-white !rounded-full">
                      RC
                  </span>
              </div>
              <div className="flex-grow">
                  <p className="font-semibold mb-0">Prepare for presentation<span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">31 Dec 2022</span></p>
                  <span className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i className="ri-time-line align-middle me-1 inline-block"></i>4 hrs ago</span>
              </div>
          </div>
        </li>
    </ul>
  </div>
</div>
</div>
// End Prism Code//`;

export const offcanvas5 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<button type="button" className="m-1 ms-0 ti-btn ti-btn-primary-full" data-hs-overlay="#hs-custom-backdrop-offcanvas">
Open offcanvas
</button>

<div id="hs-custom-backdrop-offcanvas" className="hs-overlay-backdrop-open:bg-primary/50 hs-overlay ti-offcanvas ti-offcanvas-left hidden">
<div className="ti-offcanvas-header">
  <h6 className="ti-offcanvas-title">
    Notifications
  </h6>
  <button type="button" className="ti-btn flex-shrink-0 p-0 transition-none text-gray-500 hover:text-gray-700 focus:ring-gray-400 focus:ring-offset-white dark:text-[#8c9097] dark:text-white/50 dark:hover:text-white/80 dark:focus:ring-white/10 dark:focus:ring-offset-white/10" data-hs-overlay="#hs-overlay-backdrop-with-scrolling">
    <span className="sr-only">Close modal</span>
    <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor"></path>
    </svg>
</button>
</div>
<div className="ti-offcanvas-body !p-0">
<ul className="flex flex-col">
  <li className="ti-list-group bg-white text-gray-800 py-[0.75rem] px-[1rem] dark:bg-bodybg dark:border-white/10 dark:text-white !border-t-0 !border-x-0 !rounded-none">
    <div className="flex items-center w-full">
        <div className="me-2">
          <span className="inline-flex items-center justify-center avatar avatar-sm bg-primary text-white rounded-full">
            NW
          </span>
        </div>
        <div className="flex-auto">
            <p className="font-semibold mb-0">New Website Created<span className="badge bg-gray-100 text-gray-500 dark:text-white/70 dark:bg-bodybg float-end px-2 py-1 leading-none text-[10px]">20 Nov 2022</span></p>
            <span className="text-xs text-gray-500 dark:text-white/70 inline-flex"><i className="ri-time-line align-middle me-1"></i>30 mins ago</span>
        </div>
    </div>
  </li>
  <li className="ti-list-group bg-white text-gray-800 dark:bg-bodybg dark:border-white/10 dark:text-white !border-x-0 py-[0.75rem] px-[1rem] !rounded-none !border-t-0">
    <div className="flex items-center w-full">
        <div className="me-2">
            <span className="inline-flex items-center justify-center avatar avatar-sm bg-danger text-white rounded-full">
                CH
            </span>
        </div>
        <div className="flex-auto">
            <p className="font-semibold mb-0">Prepare for the new project<span className="badge bg-gray-100 text-gray-500 dark:text-white/70 dark:bg-bodybg float-end px-2 py-1 leading-none text-[10px]">3 Jan 2023</span></p>
            <span className="text-xs text-gray-500 dark:text-white/70 inline-flex"><i className="ri-time-line align-middle me-1"></i>2 hrs ago</span>
        </div>
    </div>
  </li>
  <li className="ti-list-group bg-white text-gray-800 dark:bg-bodybg dark:border-white/10 dark:text-white !border-x-0 py-[0.75rem] px-[1rem] !rounded-none !border-t-0">
    <div className="flex items-center w-full">
        <div className="me-2">
            <span className="inline-flex items-center justify-center avatar avatar-sm bg-info text-white rounded-full">
                SA
            </span>
        </div>
        <div className="flex-auto">
            <p className="font-semibold mb-0">Decide the live discussion<span className="badge bg-gray-100 text-gray-500 dark:text-white/70 dark:bg-bodybg float-end px-2 py-1 leading-none text-[10px]">17 Feb 2023</span></p>
            <span className="text-xs text-gray-500 dark:text-white/70 inline-flex"><i className="ri-time-line align-middle me-1"></i>3 hrs ago</span>
        </div>
    </div>
  </li>
  <li className="ti-list-group bg-white text-gray-800 dark:bg-bodybg dark:border-white/10 dark:text-white !border-x-0 py-[0.75rem] px-[1rem] !rounded-none !border-t-0">
    <div className="flex items-center w-full">
        <div className="me-2">
          <img src={face12} alt="" className="avatar avatar-sm rounded-full"/>
        </div>
        <div className="flex-auto">
            <p className="font-semibold mb-0">Meeting at 3:00 pm<span className="badge bg-gray-100 text-gray-500 dark:text-white/70 dark:bg-bodybg float-end px-2 py-1 leading-none text-[10px]">29 Dec 2022</span></p>
            <span className="text-xs text-gray-500 dark:text-white/70 inline-flex"><i className="ri-time-line align-middle me-1"></i>4 hrs ago</span>
        </div>
    </div>
  </li>
  <li className="ti-list-group bg-white text-gray-800 dark:bg-bodybg dark:border-white/10 dark:text-white !border-x-0 py-[0.75rem] px-[1rem] !rounded-none !border-t-0">
    <div className="flex items-center w-full">
        <div className="me-2">
            <span className="inline-flex items-center justify-center avatar avatar-sm bg-success  text-white rounded-full">
                RC
            </span>
        </div>
        <div className="flex-auto">
            <p className="font-semibold mb-0">Prepare for presentation<span className="badge bg-gray-100 text-gray-500 dark:text-white/70 dark:bg-bodybg float-end px-2 py-1 leading-none text-[10px]">31 Dec 2022</span></p>
            <span className="text-xs text-gray-500 dark:text-white/70 inline-flex"><i className="ri-time-line align-middle me-1"></i>4 hrs ago</span>
        </div>
    </div>
  </li>
  <li className="ti-list-group bg-white text-gray-800 dark:bg-bodybg dark:border-white/10 dark:text-white !border-x-0 py-[0.75rem] px-[1rem] !rounded-none !border-t-0">
    <div className="flex items-center w-full">
        <div className="me-2">
          <img src={face1} alt="" className="avatar avatar-sm rounded-full"/>
        </div>
        <div className="flex-auto">
            <p className="font-semibold mb-0">Brenda New product launching<span className="badge bg-gray-100 text-gray-500 dark:text-white/70 dark:bg-bodybg float-end px-2 py-1 leading-none text-[10px]">1 Jan 2023</span></p>
            <span className="text-xs text-gray-500 dark:text-white/70 inline-flex"><i className="ri-time-line align-middle me-1"></i>7 hrs ago</span>
        </div>
    </div>
  </li>
  <li className="ti-list-group bg-white text-gray-800 dark:bg-bodybg dark:border-white/10 dark:text-white !border-x-0 py-[0.75rem] px-[1rem] !rounded-none !border-t-0">
    <div className="flex items-center w-full">
        <div className="me-2">
          <span className="inline-flex items-center justify-center avatar avatar-sm bg-secondary text-white rounded-full">
             MB
          </span>
        </div>
        <div className="flex-auto">
            <p className="font-semibold mb-0">Medeleine Hey! there i'm available<span className="badge bg-gray-100 text-gray-500 dark:text-white/70 dark:bg-bodybg float-end px-2 py-1 leading-none text-[10px]">5 Jan 2023</span></p>
            <span className="text-xs text-gray-500 dark:text-white/70 inline-flex"><i className="ri-time-line align-middle me-1"></i>3 hrs ago</span>
        </div>
    </div>
  </li>
  <li className="ti-list-group bg-white text-gray-800 dark:bg-bodybg dark:border-white/10 dark:text-white !border-x-0 py-[0.75rem] px-[1rem] !rounded-none !border-t-0">
    <div className="flex items-center w-full">
        <div className="me-2">
          <span className="inline-flex items-center justify-center avatar avatar-sm bg-info  text-white rounded-full">
            OL
          </span>
        </div>
        <div className="flex-auto">
            <p className="font-semibold mb-0">Olivia New schedule release<span className="badge bg-gray-100 text-gray-500 dark:text-white/70 dark:bg-bodybg float-end px-2 py-1 leading-none text-[10px]">6 Jan 2023</span></p>
            <span className="text-xs text-gray-500 dark:text-white/70 inline-flex"><i className="ri-time-line align-middle me-1"></i>45 mins ago</span>
        </div>
    </div>
  </li>
  <li className="ti-list-group bg-white text-gray-800 dark:bg-bodybg dark:border-white/10 dark:text-white !border-x-0 py-[0.75rem] px-[1rem] !rounded-none !border-t-0">
    <div className="flex items-center w-full">
        <div className="me-2">
          <span className="inline-flex items-center justify-center avatar avatar-sm bg-warning  text-white rounded-full">
           A
          </span>
        </div>
        <div className="flex-auto">
            <p className="font-semibold mb-0">Kamala Preparing for new admin launch<span className="badge bg-gray-100 text-gray-500 dark:text-white/70 dark:bg-bodybg float-end px-2 py-1 leading-none text-[10px]">7 Jan 2023</span></p>
            <span className="text-xs text-gray-500 dark:text-white/70 inline-flex"><i className="ri-time-line align-middle me-1"></i>28 mins ago</span>
        </div>
    </div>
  </li>
  <li className="ti-list-group bg-white text-gray-800 dark:bg-bodybg dark:border-white/10 dark:text-white !border-x-0 py-[0.75rem] px-[1rem] !rounded-none !border-t-0">
    <div className="flex items-center w-full">
        <div className="me-2">
          <img src={face6} alt="" className="avatar avatar-sm rounded-full"/>
        </div>
        <div className="flex-auto">
            <p className="font-semibold mb-0">Oisha Meeting with clinet for dinner<span className="badge bg-gray-100 text-gray-500 dark:text-white/70 dark:bg-bodybg float-end px-2 py-1 leading-none text-[10px]">10 Jan 2023</span></p>
            <span className="text-xs text-gray-500 dark:text-white/70 inline-flex"><i className="ri-time-line align-middle me-1"></i>14 hrs ago</span>
        </div>
    </div>
  </li>
  <li className="ti-list-group bg-white text-gray-800 dark:bg-bodybg dark:border-white/10 dark:text-white !border-x-0 py-[0.75rem] px-[1rem] !rounded-none !border-t-0">
    <div className="flex items-center w-full">
        <div className="me-2">
            <span className="inline-flex items-center justify-center avatar avatar-sm bg-danger text-white rounded-full">
                CH
            </span>
        </div>
        <div className="flex-auto">
            <p className="font-semibold mb-0">Prepare for the new project<span className="badge bg-gray-100 text-gray-500 dark:text-white/70 dark:bg-bodybg float-end px-2 py-1 leading-none text-[10px]">3 Jan 2023</span></p>
            <span className="text-xs text-gray-500 dark:text-white/70 inline-flex"><i className="ri-time-line align-middle me-1"></i>2 hrs ago</span>
        </div>
    </div>
  </li>
  <li className="ti-list-group bg-white text-gray-800 dark:bg-bodybg dark:border-white/10 dark:text-white !border-x-0 py-[0.75rem] px-[1rem] !rounded-none !border-t-0">
    <div className="flex items-center w-full">
        <div className="me-2">
            <span className="inline-flex items-center justify-center avatar avatar-sm bg-info text-white rounded-full">
                SA
            </span>
        </div>
        <div className="flex-auto">
            <p className="font-semibold mb-0">Decide the live discussion<span className="badge bg-gray-100 text-gray-500 dark:text-white/70 dark:bg-bodybg float-end px-2 py-1 leading-none text-[10px]">17 Feb 2023</span></p>
            <span className="text-xs text-gray-500 dark:text-white/70 inline-flex"><i className="ri-time-line align-middle me-1"></i>3 hrs ago</span>
        </div>
    </div>
  </li>
  <li className="ti-list-group bg-white text-gray-800 dark:bg-bodybg dark:border-white/10 dark:text-white !border-x-0 py-[0.75rem] px-[1rem] !rounded-none !border-t-0">
    <div className="flex items-center w-full">
        <div className="me-2">
          <img src={face14} alt="" className="avatar avatar-sm rounded-full"/>
        </div>
        <div className="flex-auto">
            <p className="font-semibold mb-0">Meeting at 3:00 pm<span className="badge bg-gray-100 text-gray-500 dark:text-white/70 dark:bg-bodybg float-end px-2 py-1 leading-none text-[10px]">29 Dec 2022</span></p>
            <span className="text-xs text-gray-500 dark:text-white/70 inline-flex"><i className="ri-time-line align-middle me-1"></i>4 hrs ago</span>
        </div>
    </div>
  </li>
  <li className="ti-list-group bg-white text-gray-800 dark:bg-bodybg dark:border-white/10 dark:text-white !border-x-0 py-[0.75rem] px-[1rem] !rounded-none !border-t-0">
    <div className="flex items-center w-full">
        <div className="me-2">
            <span className="inline-flex items-center justify-center avatar avatar-sm bg-success  text-white rounded-full">
                RC
            </span>
        </div>
        <div className="flex-auto">
            <p className="font-semibold mb-0">Prepare for presentation<span className="badge bg-gray-100 text-gray-500 dark:text-white/70 dark:bg-bodybg float-end px-2 py-1 leading-none text-[10px]">31 Dec 2022</span></p>
            <span className="text-xs text-gray-500 dark:text-white/70 inline-flex"><i className="ri-time-line align-middle me-1"></i>4 hrs ago</span>
        </div>
    </div>
  </li>
</ul>
</div>
</div>
// End Prism Code//`;

export const offcanvas6 = `//<!-- Prism Code: This code is only used for showcode purpose -->//
<button type="button" className="ti-btn ti-btn-primary-full" data-hs-overlay="#hs-overlay-top">
Toggle top offcanvas
</button>


<div id="hs-overlay-top" className="hs-overlay hidden ti-offcanvas ti-offcanvas-top !z-[105]" tabIndex={-1}>
<div className="ti-offcanvas-header">
  <h5 className="ti-offcanvas-title">
    Offcanvas top
  </h5>
  <button type="button" className="ti-btn flex-shrink-0 p-0 transition-none text-gray-500 hover:text-gray-700 focus:ring-gray-400 focus:ring-offset-white dark:text-[#8c9097] dark:text-white/50 dark:hover:text-white/80 dark:focus:ring-white/10 dark:focus:ring-offset-white/10" data-hs-overlay="#hs-overlay-top">
    <span className="sr-only">Close modal</span>
    <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor"/>
    </svg>
  </button>
</div>
<div className="ti-offcanvas-body !h-[90%]">
  <p className="text-gray-800 dark:text-[#8c9097] dark:text-white/50">
    ...
  </p>
</div>
</div>
<button type="button" className="ti-btn ti-btn-primary-full" data-hs-overlay="#hs-overlay-right">
Toggle right offcanvas
</button>
<div id="hs-overlay-right" className="hs-overlay hidden ti-offcanvas ti-offcanvas-right" tabIndex={-1}>
<div className="ti-offcanvas-header">
    <h5 className="ti-offcanvas-title">
      Notifications
    </h5>
    <button type="button" className="ti-btn flex-shrink-0 p-0 transition-none text-gray-500 hover:text-gray-700 focus:ring-gray-400 focus:ring-offset-white dark:text-[#8c9097] dark:text-white/50 dark:hover:text-white/80 dark:focus:ring-white/10 dark:focus:ring-offset-white/10" data-hs-overlay="#hs-overlay-right">
        <span className="sr-only">Close modal</span>
        <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor"></path>
        </svg>
    </button>
</div>
<div className="ti-offcanvas-body !h-[90%] !p-0">
    <div>
        <ul className="list-group list-group-flush mb-0">
            <li className="list-group-item !border-t-0">
              <div className="flex items-center">
                  <div className="me-2">
                      <span className="avatar avatar-md bg-primary !rounded-full text-white">
                          NW
                      </span>
                  </div>
                  <div className="flex-grow">
                      <p className="font-semibold mb-0">New Website Created<span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">20 Nov 2022</span></p>
                      <span className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i className="ri-time-line align-middle me-1 inline-block"></i>30 mins ago</span>
                  </div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="flex items-center">
                  <div className="me-2">
                      <span className="avatar avatar-md bg-danger !rounded-full text-white">
                          CH
                      </span>
                  </div>
                  <div className="flex-grow">
                      <p className="font-semibold mb-0">Prepare for the new project<span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">3 Jan 2023</span></p>
                      <span className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i className="ri-time-line align-middle me-1 inline-block"></i>2 hrs ago</span>
                  </div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="flex items-center">
                  <div className="me-2">
                      <span className="avatar avatar-md bg-info !rounded-full text-white">
                          S
                      </span>
                  </div>
                  <div className="flex-grow">
                      <p className="font-semibold mb-0">Decide the live discussion<span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">17 Feb 2023</span></p>
                      <span className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i className="ri-time-line align-middle me-1 inline-block"></i>3 hrs ago</span>
                  </div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="flex items-center">
                  <div className="me-2">
                      <span className="avatar avatar-md !rounded-full">
                          <img src={face12} alt="" className="!rounded-full"/>
                      </span>
                  </div>
                  <div className="flex-grow">
                      <p className="font-semibold mb-0">Meeting at 3:00 pm<span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">29 Dec 2022</span></p>
                      <span className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i className="ri-time-line align-middle me-1 inline-block"></i>4 hrs ago</span>
                  </div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="flex items-center">
                  <div className="me-2">
                      <span className="avatar avatar-md bg-success text-white !rounded-full">
                          RC
                      </span>
                  </div>
                  <div className="flex-grow">
                      <p className="font-semibold mb-0">Prepare for presentation<span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">31 Dec 2022</span></p>
                      <span className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i className="ri-time-line align-middle me-1 inline-block"></i>4 hrs ago</span>
                  </div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="flex items-center">
                  <div className="me-2">
                      <span className="avatar avatar-md !rounded-full">
                          <img src={face1} alt="" className="!rounded-full"/>
                      </span>
                  </div>
                  <div className="flex-grow">
                      <p className="font-semibold mb-0">Brenda New product launching<span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">1 Jan 2023</span></p>
                      <span className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i className="ri-time-line align-middle me-1 inline-block"></i>7 hrs ago</span>
                  </div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="flex items-center">
                  <div className="me-2">
                      <span className="avatar avatar-md bg-secondary text-white !rounded-full">
                          M
                      </span>
                  </div>
                  <div className="flex-grow">
                      <p className="font-semibold mb-0">Medeleine Hey! there i'm available<span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">5 Jan 2023</span></p>
                      <span className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i className="ri-time-line align-middle me-1 inline-block"></i>3 hrs ago</span>
                  </div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="flex items-center">
                  <div className="me-2">
                      <span className="avatar avatar-md bg-info !rounded-full text-white">
                          OL
                      </span>
                  </div>
                  <div className="flex-grow">
                      <p className="font-semibold mb-0">Olivia New schedule release<span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">6 Jan 2023</span></p>
                      <span className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i className="ri-time-line align-middle me-1 inline-block"></i>45 mins ago</span>
                  </div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="flex items-center">
                  <div className="me-2">
                      <span className="avatar avatar-md bg-warning text-white !rounded-full">
                          A
                      </span>
                  </div>
                  <div className="flex-grow">
                      <p className="font-semibold mb-0">Kamala Preparing for new admin launch<span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">7 Jan 2023</span></p>
                      <span className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i className="ri-time-line align-middle me-1 inline-block"></i>28 mins ago</span>
                  </div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="flex items-center">
                  <div className="me-2">
                      <span className="avatar avatar-md !rounded-full">
                          <img src={face6} alt="" className="!rounded-full"/>
                      </span>
                  </div>
                  <div className="flex-grow">
                      <p className="font-semibold mb-0">Oisha Meeting with clinet for dinner<span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">10 Jan 2023</span></p>
                      <span className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i className="ri-time-line align-middle me-1 inline-block"></i>14 hrs ago</span>
                  </div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="flex items-center">
                  <div className="me-2">
                      <span className="avatar avatar-md bg-danger !rounded-full text-white">
                          CH
                      </span>
                  </div>
                  <div className="flex-grow">
                      <p className="font-semibold mb-0">Prepare for the new project<span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">3 Jan 2023</span></p>
                      <span className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i className="ri-time-line align-middle me-1 inline-block"></i>2 hrs ago</span>
                  </div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="flex items-center">
                  <div className="me-2">
                      <span className="avatar avatar-md bg-info !rounded-full text-white">
                          S
                      </span>
                  </div>
                  <div className="flex-grow">
                      <p className="font-semibold mb-0">Decide the live discussion<span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">17 Feb 2023</span></p>
                      <span className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i className="ri-time-line align-middle me-1 inline-block"></i>3 hrs ago</span>
                  </div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="flex items-center">
                  <div className="me-2">
                      <span className="avatar avatar-md !rounded-full">
                          <img src={face14} alt="" className="!rounded-full"/>
                      </span>
                  </div>
                  <div className="flex-grow">
                      <p className="font-semibold mb-0">Meeting at 3:00 pm<span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">29 Dec 2022</span></p>
                      <span className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i className="ri-time-line align-middle me-1 inline-block"></i>4 hrs ago</span>
                  </div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="flex items-center">
                  <div className="me-2">
                      <span className="avatar avatar-md bg-success text-white !rounded-full">
                          RC
                      </span>
                  </div>
                  <div className="flex-grow">
                      <p className="font-semibold mb-0">Prepare for presentation<span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">31 Dec 2022</span></p>
                      <span className="text-[0.75rem] text-[#8c9097] dark:text-white/50"><i className="ri-time-line align-middle me-1 inline-block"></i>4 hrs ago</span>
                  </div>
              </div>
            </li>
        </ul>
      </div>
</div>
</div>
<button type="button" className="ti-btn ti-btn-primary-full" data-hs-overlay="#hs-overlay-bottom">
Toggle bottom offcanvas
</button>

<div id="hs-overlay-bottom" className="hs-overlay hidden ti-offcanvas ti-offcanvas-bottom !z-[105]" tabIndex={-1}>
<div className="ti-offcanvas-header">
  <h5 className="ti-offcanvas-title">
    Offcanvas title
  </h5>
  <button type="button" className="ti-btn flex-shrink-0 p-0 transition-none text-gray-500 hover:text-gray-700 focus:ring-gray-400 focus:ring-offset-white dark:text-[#8c9097] dark:text-white/50 dark:hover:text-white/80 dark:focus:ring-white/10 dark:focus:ring-offset-white/10" data-hs-overlay="#hs-overlay-bottom">
    <span className="sr-only">Close modal</span>
    <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor"/>
    </svg>
  </button>
</div>
<div className="ti-offcanvas-body !h-[90%]">
  <p className="text-gray-800 dark:text-[#8c9097] dark:text-white/50">
    ...
  </p>
</div>
</div>
// End Prism Code//`;

//Skeleton

export let skeleton1 = 
`   <div class="flex animate-pulse">
<div class="flex-shrink-0">
  <span class="size-12 block bg-gray-200 rounded-full dark:bg-light"></span>
</div>

<div class="ms-4 mt-2 w-full">
  <p class="h-4 bg-gray-200 rounded-full dark:bg-light" style="width: 40%;"></p>

  <ul class="mt-5 space-y-3">
    <li class="w-full h-4 bg-gray-200 rounded-full dark:bg-light"></li>
    <li class="w-full h-4 bg-gray-200 rounded-full dark:bg-light"></li>
    <li class="w-full h-4 bg-gray-200 rounded-full dark:bg-light"></li>
    <li class="w-full h-4 bg-gray-200 rounded-full dark:bg-light"></li>
  </ul>
</div>
</div>`
export let skeleton2 = 
`  <ul class="mt-5 space-y-3">
<li class="w-full h-10 bg-gray-200 rounded-full dark:bg-light"></li>
<li class="w-full h-6 bg-gray-200 rounded-full dark:bg-light"></li>
<li class="w-full h-4 bg-gray-200 rounded-full dark:bg-light"></li>
<li class="w-full h-2 bg-gray-200 rounded-full dark:bg-light"></li>
</ul>`
export let skeleton3 = 
` <ul class="mt-5 space-y-3">
<li class="w-full h-4 bg-primary/50 rounded-full"></li>
<li class="w-full h-4 bg-secondary/50 rounded-full"></li>
<li class="w-full h-4 bg-success/50 rounded-full"></li>
<li class="w-full h-4 bg-orangemain/50 rounded-full"></li>
<li class="w-full h-4 bg-warning/50 rounded-full"></li>
</ul>`
export let skeleton4 = 
`<ul class="mt-5 space-y-3">
<li class="w-[25%] h-4 bg-gray-200 rounded-full dark:bg-light"></li>
<li class="w-[50%] h-4 bg-gray-200 rounded-full dark:bg-light"></li>
<li class="w-[75%] h-4 bg-gray-200 rounded-full dark:bg-light"></li>
<li class="w-full h-4 bg-gray-200 rounded-full dark:bg-light"></li>
</ul>`
