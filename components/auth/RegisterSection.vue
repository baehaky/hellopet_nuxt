<template>
  <div className="lg:flex w-1/2 hidden bg-teal-400  items-center">
    <div className="w-full px-10 text-white">
      <h1 className="text-5xl font-bold text-left tracking-wide">
        Daftarkan segera akun kamu
      </h1>
      <NuxtLink to="/">
        <button
          className="group relative mt-5 h-12 w-48 overflow-hidden rounded-lg bg-white text-lg shadow"
        >
          <div
            className="absolute inset-0 w-3 bg-amber-400 transition-all duration-[250ms] ease-out group-hover:w-full"
          ></div>
          <span className="relative text-teal-600 group-hover:text-white">
            Kembali
          </span>
        </button>
      </NuxtLink>
    </div>
  </div>
</template>
