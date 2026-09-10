<template>
  <div class="relative min-h-screen bg-slate-50 text-slate-800 antialiased">
    <PublicHeader />

    <!-- Loading State -->
    <main v-if="loading" class="mx-auto max-w-5xl px-4 py-20">
      <LoadingState label="Retrieving archival record…" />
    </main>

    <!-- Not Found State -->
    <main v-else-if="notFound || !asset" class="mx-auto max-w-3xl px-4 py-20 text-center">
      <div class="rounded-3xl border border-slate-200 bg-white p-10 shadow-xl">
        <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
          <Icon name="Archive" :size="32" />
        </div>
        <h2 class="mt-4 text-2xl font-bold tracking-tight text-slate-900">Archival Resource Not Found</h2>
        <p class="mt-2 text-sm text-slate-500 max-w-md mx-auto">
          The requested record may have been relocated, restricted, or is temporarily unavailable in the public catalogue.
        </p>
        <div class="mt-6">
          <router-link
            to="/repository-search"
            class="inline-flex items-center gap-2 rounded-xl bg-brand-800 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-brand-900 transition"
          >
            <Icon name="ArrowLeft" :size="16" /> Back to Resource Catalogue
          </router-link>
        </div>
      </div>
    </main>

    <!-- Restricted State -->
    <main v-else-if="asset.status !== 'Published'" class="mx-auto max-w-3xl px-4 py-20 text-center">
      <div class="rounded-3xl border border-slate-200 bg-white p-10 shadow-xl">
        <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
          <Icon name="Lock" :size="32" />
        </div>
        <h2 class="mt-4 text-2xl font-bold tracking-tight text-slate-900">Restricted Institutional Access</h2>
        <p class="mt-2 text-sm text-slate-500 max-w-md mx-auto">
          This record is categorized under restricted institutional governance and requires authenticated authorization to view.
        </p>
        <div class="mt-6 flex justify-center gap-3">
          <router-link
            to="/repository-search"
            class="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            ← Back to Catalogue
          </router-link>
          <router-link
            to="/login"
            class="inline-flex items-center gap-2 rounded-xl bg-brand-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-900 transition"
          >
            Sign In to Request Access
          </router-link>
        </div>
      </div>
    </main>

    <!-- Masterpiece Detail View -->
    <template v-else>
      <!-- Hero Section -->
      <section class="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-brand-950 text-white">
        <!-- Ambient Decorative Lighting -->
        <div class="pointer-events-none absolute -top-40 right-0 h-[450px] w-[450px] rounded-full bg-amber-500/10 blur-[120px]"></div>
        <div class="pointer-events-none absolute -bottom-40 left-10 h-[450px] w-[450px] rounded-full bg-brand-500/15 blur-[120px]"></div>

        <div class="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <!-- Top Navigation & Breadcrumbs -->
          <div class="flex flex-wrap items-center justify-between gap-4 text-xs font-medium text-slate-400">
            <nav class="flex items-center gap-2">
              <router-link to="/repository-search" class="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-slate-300 hover:bg-white/10 hover:text-white transition">
                <Icon name="ArrowLeft" :size="13" />
                <span>Resource Catalogue</span>
              </router-link>
              <span>/</span>
              <router-link v-if="primaryCategory" :to="{ path: '/repository-search', query: { category: primaryCategory } }" class="text-slate-400 hover:text-amber-300 transition">
                {{ categoryLabel }}
              </router-link>
              <span v-if="primaryCategory">/</span>
              <span class="text-slate-300 truncate max-w-[200px] sm:max-w-xs">{{ asset.title }}</span>
            </nav>

            <!-- Permanent Handle / Code -->
            <div class="flex items-center gap-2 font-mono text-[11px] text-slate-400 bg-white/5 px-3 py-1 rounded-full border border-white/10 max-w-full">
              <span class="shrink-0">REF:</span>
              <span class="max-w-[220px] truncate text-slate-200">{{ asset.resource_code || asset.name }}</span>
            </div>
          </div>

          <!-- Media Badges & Title Block -->
          <div class="mt-6 max-w-4xl">
            <!-- Badges Row -->
            <div class="flex flex-wrap items-center gap-2.5">
              <!-- Collection Link -->
              <router-link
                v-if="asset.collection"
                :to="{ path: '/repository-search', query: { collection: asset.collection } }"
                class="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-slate-200 border border-white/15 hover:bg-white/20 hover:text-white transition"
              >
                <Icon name="Folder" :size="13" class="text-amber-400" />
                <span>{{ asset.collection }}</span>
              </router-link>
            </div>

            <!-- Imposing Archive Title -->
            <h1 class="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight font-serif sm:leading-tight break-words">
              {{ asset.title }}
            </h1>

            <!-- Author / Provenance Meta Line -->
            <div class="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-300">
              <div v-if="asset.author?.length" class="flex items-center gap-1.5 font-medium flex-wrap">
                <Icon name="Users" :size="15" class="text-amber-400" />
                <template v-for="(name, i) in asset.author" :key="name">
                  <router-link
                    :to="{ path: '/repository-search', query: { author: name } }"
                    class="text-white hover:text-amber-300 underline decoration-white/30 hover:decoration-amber-300 transition"
                  >{{ name }}</router-link><span v-if="i < asset.author.length - 1" class="text-slate-400">,</span>
                </template>
              </div>
              <div v-if="asset.publication_date" class="flex items-center gap-1.5 text-slate-300">
                <Icon name="Calendar" :size="15" class="text-slate-400" />
                <span>Published {{ formatDate(asset.publication_date) }}</span>
              </div>
              <div v-if="languageLabel" class="flex items-center gap-1.5 text-slate-300">
                <Icon name="Globe" :size="15" class="text-slate-400" />
                <span>{{ languageLabel }}</span>
              </div>
            </div>

            <!-- Header Action Buttons -->
            <div class="mt-8 flex flex-wrap items-center gap-3">
              <button
                v-if="hasAudio || hasVideo"
                @click="scrollToMedia"
                class="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 px-5 py-2.5 text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/20 hover:brightness-110 active:scale-95 transition"
              >
                <Icon :name="hasAudio ? 'Play' : 'Video'" :size="16" class="fill-current" />
                <span>{{ hasAudio && hasVideo ? 'Play & Watch' : hasAudio ? 'Play Recording' : 'Watch Video' }}</span>
              </button>

              <a
                v-if="downloadableFiles.length"
                :href="downloadableFiles[0].url"
                download
                class="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/20 transition"
              >
                <Icon name="Download" :size="15" />
                <span>Download ({{ downloadableFiles.length }})</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Key Metadata Highlight Cards Ribbon -->
      <section class="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 -mt-6">
        <div class="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          <div class="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5 shadow-lg shadow-slate-900/5 transition hover:shadow-xl">
            <span class="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Icon name="Archive" :size="13" class="text-brand-600" /> Category
            </span>
            <div class="mt-1.5 truncate text-sm sm:text-base font-bold text-slate-900">
              {{ categoryLabel || 'General Heritage' }}
            </div>
          </div>

          <div class="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5 shadow-lg shadow-slate-900/5 transition hover:shadow-xl">
            <span class="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Icon name="Folder" :size="13" class="text-amber-500" /> Collection
            </span>
            <div class="mt-1.5 truncate text-sm sm:text-base font-bold text-slate-900">
              {{ asset.collection || 'General Archives' }}
            </div>
          </div>

          <div class="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5 shadow-lg shadow-slate-900/5 transition hover:shadow-xl">
            <span class="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Icon name="Globe" :size="13" class="text-teal-600" /> Canonical Language
            </span>
            <div class="mt-1.5 truncate text-sm sm:text-base font-bold text-slate-900">
              {{ languageLabel || 'Multilingual' }}
            </div>
          </div>

          <div class="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5 shadow-lg shadow-slate-900/5 transition hover:shadow-xl">
            <span class="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Icon name="Calendar" :size="13" class="text-sky-600" /> Publication Date
            </span>
            <div class="mt-1.5 truncate text-sm sm:text-base font-bold text-slate-900">
              {{ formatDate(asset.publication_date) }}
            </div>
          </div>
        </div>
      </section>

      <!-- Main Layout: 2 Columns (Content 2/3, Authority Sidebar 1/3) -->
      <main class="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div class="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          <!-- Left Column (8 cols): Primary Content & Media Deck -->
          <article class="space-y-8 lg:col-span-8">
            <!-- 1. Featured Media Showcase -->
            <div id="media-deck" class="space-y-6">
              <!-- Bespoke Audio Suite -->
              <div v-if="hasAudio" class="space-y-4">
                <AudioPlayer
                  :tracks="audioItems"
                  :cover-image="cover.url"
                  :title="asset.title"
                  :author="authorLabel"
                />
              </div>

              <!-- Video Resource Player / Embed -->
              <div v-if="videoItems.length" class="space-y-4">
                <div
                  v-for="(v, i) in videoItems"
                  :key="'video-' + i"
                  class="overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-md"
                >
                  <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <span class="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-700">
                      <Icon name="Video" :size="15" /> Video Archive {{ v.categories ? `• ${v.categories}` : '' }}
                    </span>
                    <div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400">
                      <span v-if="v.date">{{ v.date }}</span>
                      <span v-if="v.reference_period">Period: {{ v.reference_period }}</span>
                      <span v-if="v.reference_institution">Origin: {{ v.reference_institution }}</span>
                    </div>
                  </div>

                  <div class="mt-4 space-y-3">
                    <!-- Uploaded video file: play it directly in the portal -->
                    <div v-if="v.video" class="aspect-video w-full overflow-hidden rounded-2xl bg-black">
                      <video :src="v.video" controls preload="metadata" class="h-full w-full"></video>
                    </div>

                    <!-- Embeddable link (YouTube/Vimeo): show inline player -->
                    <div v-else-if="isEmbeddable(v.video_link)" class="aspect-video w-full overflow-hidden rounded-2xl bg-black">
                      <iframe
                        :src="getEmbedUrl(v.video_link)"
                        class="h-full w-full border-0"
                        allowfullscreen
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      ></iframe>
                    </div>

                    <!-- Neither an upload nor an embeddable link: fall back to a placeholder -->
                    <div v-else-if="!v.video_link" class="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">
                      <Icon name="Video" :size="40" class="mx-auto text-slate-400" />
                      <p class="mt-2 text-sm font-semibold text-slate-800">No video file or link attached</p>
                    </div>

                    <!-- Always offer a direct link button — the embed above can fail (blocked, private,
                         moved, restricted by uploader) even when the URL looks embeddable, so this is
                         the reliable way to actually reach the video. -->
                    <a
                      v-if="v.video_link"
                      :href="v.video_link"
                      target="_blank"
                      rel="noreferrer"
                      class="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-800 hover:bg-brand-100 transition"
                    >
                      <Icon name="ExternalLink" :size="13" />
                      <span>Open Video Link</span>
                    </a>
                  </div>
                </div>
              </div>

              <!-- High-Resolution Cover / Imagery (When not purely audio, or as archival visual) -->
              <figure v-if="showCoverFigure" class="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-md">
                <div class="relative max-h-[480px] w-full overflow-hidden bg-slate-950 flex items-center justify-center">
                  <img
                    :src="cover.url"
                    :alt="asset.title"
                    class="w-full h-full max-h-[480px] object-cover sm:object-contain transition-all duration-500"
                    loading="eager"
                  />
                </div>
                <figcaption class="flex flex-wrap items-center justify-between gap-3 bg-slate-900 px-5 py-3 text-xs text-slate-300">
                  <span class="font-medium text-white">{{ asset.title }}</span>
                  <a
                    v-if="cover.credit"
                    :href="cover.sourceUrl"
                    target="_blank"
                    rel="noreferrer"
                    class="text-slate-400 hover:text-amber-300 transition flex items-center gap-1"
                  >
                    <span>Provenance: {{ cover.credit }}</span>
                    <Icon name="ExternalLink" :size="12" />
                  </a>
                </figcaption>
              </figure>

              <!-- Image Gallery / Photographic Records -->
              <div v-if="imageItems.length" class="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-md">
                <div class="flex items-center gap-2.5 border-b border-slate-100 pb-4">
                  <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <Icon name="Image" :size="18" />
                  </div>
                  <h3 class="text-lg font-bold text-slate-900">Archival Photographs & Illustrations</h3>
                </div>
                <div class="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <figure
                    v-for="(img, idx) in imageItems"
                    :key="'img-' + idx"
                    class="group overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 transition hover:shadow-lg"
                  >
                    <div class="relative h-48 w-full overflow-hidden bg-slate-900">
                      <img :src="img.image" :alt="img.description || asset.title" class="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                    </div>
                    <figcaption class="p-4 space-y-1.5 text-xs text-slate-600">
                      <p v-if="img.description" class="font-semibold text-slate-800 text-sm">{{ img.description }}</p>
                      <div class="flex flex-wrap gap-2 text-[11px] text-slate-500">
                        <span v-if="img.category" class="rounded-full bg-slate-200/80 px-2 py-0.5 font-medium text-slate-700">{{ img.category }}</span>
                        <span v-if="img.year_of_creation">Year: {{ img.year_of_creation }}</span>
                        <span v-if="img.technique">Technique: {{ img.technique }}</span>
                        <span v-if="img.location">Location: {{ img.location }}</span>
                        <span v-if="img.reference_period">Period: {{ img.reference_period }}</span>
                        <span v-if="img.reference_institution">Origin: {{ img.reference_institution }}</span>
                      </div>
                    </figcaption>
                  </figure>
                </div>
              </div>

              <!-- Archival Documents & Manuscripts -->
              <div v-if="documentItems.length" class="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-md">
                <div class="flex items-center gap-2.5 border-b border-slate-100 pb-4">
                  <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                    <Icon name="FileText" :size="18" />
                  </div>
                  <h3 class="text-lg font-bold text-slate-900">Documentary Records & Texts</h3>
                </div>
                <div class="mt-6 divide-y divide-slate-100">
                  <div
                    v-for="(doc, idx) in documentItems"
                    :key="'doc-' + idx"
                    class="flex flex-wrap items-start gap-4 py-4 first:pt-0 last:pb-0"
                  >
                    <div v-if="doc.cover_image" class="h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                      <img :src="doc.cover_image" :alt="doc.description || 'Cover image'" class="h-full w-full object-cover" loading="lazy" />
                    </div>

                    <div class="min-w-0 flex-1">
                      <div class="flex flex-wrap items-center gap-2">
                        <span v-if="doc.index" class="shrink-0 font-mono text-[10px] font-bold text-slate-400">No. {{ doc.index }}</span>
                        <span class="shrink-0 rounded-md bg-sky-100 px-2 py-0.5 text-[10px] font-bold text-sky-800 uppercase">{{ doc.category || 'Document' }}</span>
                        <h4 class="min-w-0 flex-1 truncate text-sm font-bold text-slate-900">{{ doc.description || doc.category || 'Archival File' }}</h4>
                      </div>
                      <p v-if="doc.bibliographic_reference" class="mt-1 text-xs text-slate-500 italic">
                        {{ doc.bibliographic_reference }}
                      </p>
                      <div class="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
                        <span v-if="doc.reference_period">Period: {{ doc.reference_period }}</span>
                        <span v-if="doc.reference_institution">Origin: {{ doc.reference_institution }}</span>
                      </div>
                    </div>

                    <a
                      v-if="doc.file"
                      :href="doc.file"
                      download
                      class="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition shrink-0"
                    >
                      <Icon name="Download" :size="13" /> Download Text
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <!-- 2. Scholarly Overview & Description -->
            <div class="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-md">
              <div class="flex items-center gap-2.5 border-b border-slate-100 pb-4">
                <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <Icon name="BookOpen" :size="18" />
                </div>
                <h3 class="text-lg font-bold text-slate-900">Archival Overview & Summary</h3>
              </div>

              <!-- Formatted Description -->
              <div class="mt-6 prose prose-slate max-w-none text-slate-700 leading-relaxed text-base sm:text-lg">
                <div v-if="asset.description" class="space-y-4">
                  <div
                    class="border-l-4 border-amber-400 pl-4 py-1 text-slate-800 font-medium italic bg-amber-50/40 rounded-r-xl [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-lg [&_img]:not-italic [&_img]:my-3 [&_p]:my-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_a]:text-brand-700 [&_a]:underline"
                    v-html="asset.description"
                  ></div>
                </div>
                <p v-else class="text-slate-400 italic text-sm">
                  No textual abstract provided for this archival record.
                </p>
              </div>

              <!-- Subject Categories (two-level: top-level category, with its child categories) -->
              <div v-if="categoryGroups.length" class="mt-8 border-t border-slate-100 pt-6">
                <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Icon name="Layers" :size="13" /> Subject Categories
                </h4>
                <ul class="mt-3 space-y-2.5 text-sm">
                  <li v-for="group in categoryGroups" :key="group.category">
                    <div class="flex items-center gap-2">
                      <span class="h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400"></span>
                      <router-link
                        :to="{ path: '/repository-search', query: { category: group.category } }"
                        class="font-semibold text-slate-800 hover:text-brand-700 hover:underline"
                      >
                        {{ group.category }}
                      </router-link>
                    </div>
                    <ul v-if="group.children.length" class="mt-1.5 ml-1 space-y-1.5 border-l border-slate-200 pl-4">
                      <li v-for="child in group.children" :key="child" class="flex items-center gap-2">
                        <span class="h-1 w-1 shrink-0 rounded-full border border-brand-400"></span>
                        <router-link
                          :to="{ path: '/repository-search', query: { category: child } }"
                          class="text-brand-700 hover:text-brand-900 hover:underline"
                        >
                          {{ child }}
                        </router-link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>

              <!-- Controlled Subject Headings & Tags -->
              <div v-if="asset.tags?.length" class="mt-8 border-t border-slate-100 pt-6">
                <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Icon name="Filter" :size="13" /> Controlled Subject Headings
                </h4>
                <div class="mt-3 flex flex-wrap gap-2">
                  <router-link
                    v-for="tag in asset.tags"
                    :key="tag"
                    :to="{ path: '/repository-search', query: { tag } }"
                    class="rounded-full bg-slate-100 px-3.5 py-1 text-xs font-semibold text-slate-700 hover:bg-brand-50 hover:text-brand-800 border border-slate-200 hover:border-brand-200 transition"
                  >
                    #{{ tag }}
                  </router-link>
                </div>
              </div>
            </div>
          </article>

          <!-- Right Column (4 cols): Authority, Rights & Preservation Sidebar -->
          <aside class="space-y-6 lg:col-span-4">
            <!-- Card 1: Curated Archival Metadata -->
            <div class="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-md">
              <div class="flex items-center gap-2 border-b border-slate-100 pb-3.5">
                <Icon name="FileText" :size="16" class="text-brand-700" />
                <h3 class="text-sm font-bold uppercase tracking-wider text-slate-900">Record Specification</h3>
              </div>

              <dl class="mt-4 divide-y divide-slate-100 text-xs sm:text-sm">
                <div class="flex justify-between py-2.5">
                  <dt class="text-slate-400">Canonical Identifier</dt>
                  <dd class="font-mono font-semibold text-slate-800">{{ asset.resource_code || asset.name }}</dd>
                </div>
                <div class="flex justify-between py-2.5">
                  <dt class="text-slate-400">Media Category</dt>
                  <dd class="font-semibold text-slate-800">{{ resourceTypeLabel || 'Archive' }}</dd>
                </div>
                <div class="flex justify-between py-2.5">
                  <dt class="text-slate-400">Subject Class</dt>
                  <dd class="font-semibold text-slate-800">{{ categoryLabel || '—' }}</dd>
                </div>
                <div class="flex justify-between py-2.5">
                  <dt class="text-slate-400">Curated Collection</dt>
                  <dd class="font-semibold text-brand-700">
                    <router-link v-if="asset.collection" :to="{ path: '/repository-search', query: { collection: asset.collection } }" class="hover:underline">
                      {{ asset.collection }}
                    </router-link>
                    <span v-else>—</span>
                  </dd>
                </div>
                <div class="flex justify-between py-2.5">
                  <dt class="text-slate-400">Publication Date</dt>
                  <dd class="font-semibold text-slate-800">{{ formatDate(asset.publication_date) }}</dd>
                </div>
                <div class="flex justify-between py-2.5">
                  <dt class="text-slate-400">Language(s)</dt>
                  <dd class="font-semibold text-slate-800">{{ languageLabel || '—' }}</dd>
                </div>
                <div class="flex justify-between py-2.5">
                  <dt class="text-slate-400">Governance Level</dt>
                  <dd class="font-semibold text-emerald-700">Congregational Archive</dd>
                </div>
              </dl>
            </div>

            <!-- Card 3: Download & Preservation Files Center -->
            <div class="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-md">
              <div class="flex items-center justify-between border-b border-slate-100 pb-3.5">
                <div class="flex items-center gap-2">
                  <Icon name="Download" :size="16" class="text-sky-600" />
                  <h3 class="text-sm font-bold uppercase tracking-wider text-slate-900">Download Center</h3>
                </div>
                <span class="text-xs font-bold text-slate-400 font-mono">{{ downloadableFiles.length }} Files</span>
              </div>

              <div v-if="downloadableFiles.length" class="mt-4 space-y-2.5">
                <div
                  v-for="(file, idx) in downloadableFiles"
                  :key="'dl-item-' + idx"
                  class="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50/60 p-3 hover:bg-slate-100/80 transition"
                >
                  <div class="min-w-0 flex items-center gap-2.5">
                    <span
                      class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold uppercase"
                      :class="getFileBadgeClass(file.label)"
                    >
                      {{ getFileExtension(file.url, file.label) }}
                    </span>
                    <div class="min-w-0">
                      <p class="truncate text-xs sm:text-sm font-semibold text-slate-800" :title="file.label">
                        {{ file.label }}
                      </p>
                    </div>
                  </div>

                  <div class="flex shrink-0 items-center gap-1.5">
                    <a
                      :href="file.url"
                      target="_blank"
                      rel="noreferrer"
                      class="rounded-lg p-1.5 text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition"
                      title="Preview in browser"
                    >
                      <Icon name="ExternalLink" :size="14" />
                    </a>
                    <a
                      :href="file.url"
                      download
                      class="flex items-center gap-1 rounded-xl bg-brand-800 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-brand-900 transition"
                      title="Download to device"
                    >
                      <Icon name="Download" :size="13" />
                      <span class="hidden sm:inline">Save</span>
                    </a>
                  </div>
                </div>
              </div>
              <p v-else class="mt-4 text-center text-xs text-slate-400 py-4 italic">
                No external preservation media files attached to this record.
              </p>
            </div>

          </aside>
        </div>

        <!-- Related Archival Resources Section -->
        <section class="mt-16 border-t border-slate-200/80 pt-12">
          <div class="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span class="text-xs font-bold uppercase tracking-wider text-amber-600">Digital Archive Explorer</span>
              <h2 class="mt-1 text-2xl font-extrabold tracking-tight text-slate-900">
                More Resources in this Field
              </h2>
            </div>
            <router-link
              to="/repository-search"
              class="inline-flex items-center gap-1.5 text-sm font-bold text-brand-700 hover:text-brand-900 transition"
            >
              <span>Explore Complete Catalogue</span>
              <Icon name="ChevronLeft" :size="14" class="rotate-180" />
            </router-link>
          </div>

          <div v-if="!asset.related?.length" class="mt-6 rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-400">
            No related archival entries recorded under this specific category.
          </div>

          <div v-else class="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <router-link
              v-for="r in asset.related"
              :key="r.name"
              :to="`/assets/${r.name}`"
              class="group flex flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-xl"
            >
              <div class="relative h-44 w-full overflow-hidden bg-slate-900">
                <PlaceholderImage
                  :title="r.title"
                  :src="r.cover_image"
                  :asset-type="getPrimaryResourceType(r.resource_type)"
                  class-name="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div class="absolute top-3 left-3">
                  <span class="rounded-full bg-slate-900/80 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                    {{ formatResourceTypeBadge(r.resource_type) }}
                  </span>
                </div>
              </div>

              <div class="flex flex-1 flex-col p-5">
                <span class="text-[10px] font-bold uppercase tracking-wider text-amber-600">
                  {{ r.category || 'Heritage' }}
                </span>
                <h3 class="mt-1.5 line-clamp-2 text-base font-bold text-slate-900 group-hover:text-brand-800 transition">
                  {{ r.title }}
                </h3>
                <p v-if="r.author?.length" class="mt-1 line-clamp-1 text-xs text-slate-500">
                  {{ joinMultiSelect(r.author) }}
                </p>

                <div class="mt-auto pt-4 flex items-center justify-between text-xs text-slate-400 border-t border-slate-100">
                  <span>{{ formatDate(r.publication_date) }}</span>
                  <span class="font-semibold text-brand-700 group-hover:translate-x-0.5 transition flex items-center gap-1">
                    Read <Icon name="ChevronLeft" :size="12" class="rotate-180" />
                  </span>
                </div>
              </div>
            </router-link>
          </div>
        </section>
      </main>
    </template>

    <PublicFooter />
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import PublicHeader from '@/components/public/PublicHeader.vue';
import PublicFooter from '@/components/public/PublicFooter.vue';
import AudioPlayer from '@/components/public/AudioPlayer.vue';
import PlaceholderImage from '@/components/public/PlaceholderImage.vue';
import LoadingState from '@/components/public/LoadingState.vue';
import Icon from '@/components/icons/Icon.vue';
import { getAsset } from '@/api/repository.js';
import { coverImageForAssetType } from '@/data/repositoryImages.js';
import { getPrimaryResourceType, formatResourceTypeBadge } from '@/utils/resourceType.js';

const route = useRoute();
const loading = ref(true);
const notFound = ref(false);
const asset = ref(null);

async function load(id) {
  loading.value = true;
  notFound.value = false;
  try {
    asset.value = await getAsset(id);
  } catch {
    notFound.value = true;
  } finally {
    loading.value = false;
  }
}

onMounted(() => load(route.params.id));
watch(() => route.params.id, (id) => id && load(id));

const RESOURCE_MEDIA_TYPES = ['Audio', 'Video', 'Image'];

const audioItems = computed(() => (asset.value?.resources || []).filter((r) => r.resource_type === 'Audio'));
const videoItems = computed(() => (asset.value?.resources || []).filter((r) => r.resource_type === 'Video'));
const imageItems = computed(() => (asset.value?.resources || []).filter((r) => r.resource_type === 'Image'));
const documentItems = computed(() =>
  (asset.value?.resources || []).filter((r) => !RESOURCE_MEDIA_TYPES.includes(r.resource_type))
);

// The distinct resource types actually present on this record, for display (a record can carry
// more than one now that all sub-resources live in a single unified child table).
const resourceTypeLabel = computed(() => {
  const types = [...new Set((asset.value?.resources || []).map((r) => r.resource_type).filter(Boolean))];
  return types.join(', ');
});

// The first row's type, used only to pick a sensible fallback cover image.
const primaryResourceType = computed(() => asset.value?.resources?.[0]?.resource_type || '');

// `category` is a two-level tree — [{ category, children: [...] }] — built server-side from the
// admin's ordered Resource Category rows (an unchecked row starts a new top-level category,
// checked rows under it are its children). categoryGroups renders that nested list; categoryLabel
// is a flat, comma-joined summary of just the top-level categories for compact spots (breadcrumb,
// metadata cards) that only have room for a single line.
const categoryGroups = computed(() => asset.value?.category || []);
const categoryLabel = computed(() => categoryGroups.value.map((g) => g.category).join(', '));
const primaryCategory = computed(() => categoryGroups.value[0]?.category || '');

function joinMultiSelect(value) {
  if (Array.isArray(value)) return value.filter(Boolean).join(', ');
  return value || '';
}

const authorLabel = computed(() => joinMultiSelect(asset.value?.author));
const languageLabel = computed(() => joinMultiSelect(asset.value?.language));

const hasAudio = computed(() => audioItems.value.length > 0);
const hasVideo = computed(() => videoItems.value.length > 0);

const showCoverFigure = computed(() => {
  // If this is an audio record and we have the bespoke AudioPlayer, don't awkwardly repeat the photo
  if (hasAudio.value) return false;
  // Video records already show their own video player/embed above — no need for a separate cover image.
  if (hasVideo.value) return false;
  return true;
});

const cover = computed(() => {
  if (asset.value?.cover_image) return { url: asset.value.cover_image };
  return coverImageForAssetType(primaryResourceType.value);
});

const downloadableFiles = computed(() => {
  const a = asset.value;
  if (!a) return [];
  const files = [];

  for (const row of a.resources || []) {
    if (row.resource_type === 'Audio' && row.audio_file) {
      files.push({
        label: row.categories ? `Audio — ${row.categories}` : 'Audio recording',
        url: row.audio_file,
      });
    } else if (row.resource_type === 'Video' && row.video) {
      files.push({
        label: row.categories ? `Video — ${row.categories}` : 'Video recording',
        url: row.video,
      });
    } else if (row.resource_type === 'Image' && row.image) {
      files.push({
        label: row.description || 'Archival image photograph',
        url: row.image,
      });
    } else if (row.file) {
      files.push({
        label: row.description || row.category || 'Attached manuscript file',
        url: row.file,
      });
    }
  }

  for (const f of a.files || []) {
    if (f.file) {
      files.push({
        label: f.file_name || 'Archival preservation file',
        url: f.file,
      });
    }
  }

  return files;
});

function formatDate(val) {
  if (!val) return 'Undated';
  try {
    const d = new Date(val);
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch {
    return val;
  }
}

function getFileExtension(url, label) {
  if (label?.toLowerCase().includes('audio')) return 'MP3';
  if (label?.toLowerCase().includes('image') || label?.toLowerCase().includes('photo')) return 'JPG';
  if (!url) return 'FILE';
  const parts = url.split('.');
  if (parts.length > 1) {
    const ext = parts.pop().split('?')[0].toUpperCase();
    if (ext.length <= 4) return ext;
  }
  return 'PDF';
}

function getFileBadgeClass(label) {
  const l = (label || '').toLowerCase();
  if (l.includes('audio')) return 'bg-amber-100 text-amber-800';
  if (l.includes('image') || l.includes('photo')) return 'bg-emerald-100 text-emerald-800';
  if (l.includes('video')) return 'bg-rose-100 text-rose-800';
  return 'bg-sky-100 text-sky-800';
}

function scrollToMedia() {
  const el = document.getElementById('media-deck');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function isEmbeddable(url) {
  if (!url) return false;
  return url.includes('youtube.com') || url.includes('youtu.be') || url.includes('vimeo.com');
}

function getEmbedUrl(url) {
  if (!url) return '';
  if (url.includes('youtube.com/watch?v=')) {
    return url.replace('watch?v=', 'embed/');
  }
  if (url.includes('youtu.be/')) {
    return url.replace('youtu.be/', 'www.youtube.com/embed/');
  }
  return url;
}

</script>
