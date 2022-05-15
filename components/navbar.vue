<template>
  <header class="header">
    <div class="header__container">
      <div>
        <Link href="/">Ahmed Kamal</Link>
      </div>
      <nav>
        <Link href="/blog">Blog</Link>
      </nav>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  @apply flex justify-center w-full;
}
.header__container {
  @apply flex flex-1 items-center justify-between container px-12 py-6;
}
</style>
